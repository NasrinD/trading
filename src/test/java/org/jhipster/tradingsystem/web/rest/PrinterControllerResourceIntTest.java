package org.jhipster.tradingsystem.web.rest;

import org.jhipster.tradingsystem.TradingsystemMoApp;

import org.jhipster.tradingsystem.domain.PrinterController;
import org.jhipster.tradingsystem.repository.PrinterControllerRepository;
import org.jhipster.tradingsystem.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.jhipster.tradingsystem.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PrinterControllerResource REST controller.
 *
 * @see PrinterControllerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TradingsystemMoApp.class)
public class PrinterControllerResourceIntTest {

    @Autowired
    private PrinterControllerRepository printerControllerRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPrinterControllerMockMvc;

    private PrinterController printerController;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrinterControllerResource printerControllerResource = new PrinterControllerResource(printerControllerRepository);
        this.restPrinterControllerMockMvc = MockMvcBuilders.standaloneSetup(printerControllerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PrinterController createEntity(EntityManager em) {
        PrinterController printerController = new PrinterController();
        return printerController;
    }

    @Before
    public void initTest() {
        printerController = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrinterController() throws Exception {
        int databaseSizeBeforeCreate = printerControllerRepository.findAll().size();

        // Create the PrinterController
        restPrinterControllerMockMvc.perform(post("/api/printer-controllers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(printerController)))
            .andExpect(status().isCreated());

        // Validate the PrinterController in the database
        List<PrinterController> printerControllerList = printerControllerRepository.findAll();
        assertThat(printerControllerList).hasSize(databaseSizeBeforeCreate + 1);
        PrinterController testPrinterController = printerControllerList.get(printerControllerList.size() - 1);
    }

    @Test
    @Transactional
    public void createPrinterControllerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = printerControllerRepository.findAll().size();

        // Create the PrinterController with an existing ID
        printerController.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrinterControllerMockMvc.perform(post("/api/printer-controllers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(printerController)))
            .andExpect(status().isBadRequest());

        // Validate the PrinterController in the database
        List<PrinterController> printerControllerList = printerControllerRepository.findAll();
        assertThat(printerControllerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPrinterControllers() throws Exception {
        // Initialize the database
        printerControllerRepository.saveAndFlush(printerController);

        // Get all the printerControllerList
        restPrinterControllerMockMvc.perform(get("/api/printer-controllers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(printerController.getId().intValue())));
    }

    @Test
    @Transactional
    public void getPrinterController() throws Exception {
        // Initialize the database
        printerControllerRepository.saveAndFlush(printerController);

        // Get the printerController
        restPrinterControllerMockMvc.perform(get("/api/printer-controllers/{id}", printerController.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(printerController.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPrinterController() throws Exception {
        // Get the printerController
        restPrinterControllerMockMvc.perform(get("/api/printer-controllers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrinterController() throws Exception {
        // Initialize the database
        printerControllerRepository.saveAndFlush(printerController);
        int databaseSizeBeforeUpdate = printerControllerRepository.findAll().size();

        // Update the printerController
        PrinterController updatedPrinterController = printerControllerRepository.findOne(printerController.getId());
        // Disconnect from session so that the updates on updatedPrinterController are not directly saved in db
        em.detach(updatedPrinterController);

        restPrinterControllerMockMvc.perform(put("/api/printer-controllers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrinterController)))
            .andExpect(status().isOk());

        // Validate the PrinterController in the database
        List<PrinterController> printerControllerList = printerControllerRepository.findAll();
        assertThat(printerControllerList).hasSize(databaseSizeBeforeUpdate);
        PrinterController testPrinterController = printerControllerList.get(printerControllerList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingPrinterController() throws Exception {
        int databaseSizeBeforeUpdate = printerControllerRepository.findAll().size();

        // Create the PrinterController

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPrinterControllerMockMvc.perform(put("/api/printer-controllers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(printerController)))
            .andExpect(status().isCreated());

        // Validate the PrinterController in the database
        List<PrinterController> printerControllerList = printerControllerRepository.findAll();
        assertThat(printerControllerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePrinterController() throws Exception {
        // Initialize the database
        printerControllerRepository.saveAndFlush(printerController);
        int databaseSizeBeforeDelete = printerControllerRepository.findAll().size();

        // Get the printerController
        restPrinterControllerMockMvc.perform(delete("/api/printer-controllers/{id}", printerController.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PrinterController> printerControllerList = printerControllerRepository.findAll();
        assertThat(printerControllerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrinterController.class);
        PrinterController printerController1 = new PrinterController();
        printerController1.setId(1L);
        PrinterController printerController2 = new PrinterController();
        printerController2.setId(printerController1.getId());
        assertThat(printerController1).isEqualTo(printerController2);
        printerController2.setId(2L);
        assertThat(printerController1).isNotEqualTo(printerController2);
        printerController1.setId(null);
        assertThat(printerController1).isNotEqualTo(printerController2);
    }
}
