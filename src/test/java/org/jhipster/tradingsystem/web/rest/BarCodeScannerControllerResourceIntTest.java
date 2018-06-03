package org.jhipster.tradingsystem.web.rest;

import org.jhipster.tradingsystem.TradingsystemEmApp;

import org.jhipster.tradingsystem.domain.BarCodeScannerController;
import org.jhipster.tradingsystem.repository.BarCodeScannerControllerRepository;
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
 * Test class for the BarCodeScannerControllerResource REST controller.
 *
 * @see BarCodeScannerControllerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TradingsystemEmApp.class)
public class BarCodeScannerControllerResourceIntTest {

    @Autowired
    private BarCodeScannerControllerRepository barCodeScannerControllerRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBarCodeScannerControllerMockMvc;

    private BarCodeScannerController barCodeScannerController;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BarCodeScannerControllerResource barCodeScannerControllerResource = new BarCodeScannerControllerResource(barCodeScannerControllerRepository);
        this.restBarCodeScannerControllerMockMvc = MockMvcBuilders.standaloneSetup(barCodeScannerControllerResource)
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
    public static BarCodeScannerController createEntity(EntityManager em) {
        BarCodeScannerController barCodeScannerController = new BarCodeScannerController();
        return barCodeScannerController;
    }

    @Before
    public void initTest() {
        barCodeScannerController = createEntity(em);
    }

    @Test
    @Transactional
    public void createBarCodeScannerController() throws Exception {
        int databaseSizeBeforeCreate = barCodeScannerControllerRepository.findAll().size();

        // Create the BarCodeScannerController
        restBarCodeScannerControllerMockMvc.perform(post("/api/bar-code-scanner-controllers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barCodeScannerController)))
            .andExpect(status().isCreated());

        // Validate the BarCodeScannerController in the database
        List<BarCodeScannerController> barCodeScannerControllerList = barCodeScannerControllerRepository.findAll();
        assertThat(barCodeScannerControllerList).hasSize(databaseSizeBeforeCreate + 1);
        BarCodeScannerController testBarCodeScannerController = barCodeScannerControllerList.get(barCodeScannerControllerList.size() - 1);
    }

    @Test
    @Transactional
    public void createBarCodeScannerControllerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = barCodeScannerControllerRepository.findAll().size();

        // Create the BarCodeScannerController with an existing ID
        barCodeScannerController.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBarCodeScannerControllerMockMvc.perform(post("/api/bar-code-scanner-controllers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barCodeScannerController)))
            .andExpect(status().isBadRequest());

        // Validate the BarCodeScannerController in the database
        List<BarCodeScannerController> barCodeScannerControllerList = barCodeScannerControllerRepository.findAll();
        assertThat(barCodeScannerControllerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBarCodeScannerControllers() throws Exception {
        // Initialize the database
        barCodeScannerControllerRepository.saveAndFlush(barCodeScannerController);

        // Get all the barCodeScannerControllerList
        restBarCodeScannerControllerMockMvc.perform(get("/api/bar-code-scanner-controllers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(barCodeScannerController.getId().intValue())));
    }

    @Test
    @Transactional
    public void getBarCodeScannerController() throws Exception {
        // Initialize the database
        barCodeScannerControllerRepository.saveAndFlush(barCodeScannerController);

        // Get the barCodeScannerController
        restBarCodeScannerControllerMockMvc.perform(get("/api/bar-code-scanner-controllers/{id}", barCodeScannerController.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(barCodeScannerController.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBarCodeScannerController() throws Exception {
        // Get the barCodeScannerController
        restBarCodeScannerControllerMockMvc.perform(get("/api/bar-code-scanner-controllers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBarCodeScannerController() throws Exception {
        // Initialize the database
        barCodeScannerControllerRepository.saveAndFlush(barCodeScannerController);
        int databaseSizeBeforeUpdate = barCodeScannerControllerRepository.findAll().size();

        // Update the barCodeScannerController
        BarCodeScannerController updatedBarCodeScannerController = barCodeScannerControllerRepository.findOne(barCodeScannerController.getId());
        // Disconnect from session so that the updates on updatedBarCodeScannerController are not directly saved in db
        em.detach(updatedBarCodeScannerController);

        restBarCodeScannerControllerMockMvc.perform(put("/api/bar-code-scanner-controllers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBarCodeScannerController)))
            .andExpect(status().isOk());

        // Validate the BarCodeScannerController in the database
        List<BarCodeScannerController> barCodeScannerControllerList = barCodeScannerControllerRepository.findAll();
        assertThat(barCodeScannerControllerList).hasSize(databaseSizeBeforeUpdate);
        BarCodeScannerController testBarCodeScannerController = barCodeScannerControllerList.get(barCodeScannerControllerList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingBarCodeScannerController() throws Exception {
        int databaseSizeBeforeUpdate = barCodeScannerControllerRepository.findAll().size();

        // Create the BarCodeScannerController

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBarCodeScannerControllerMockMvc.perform(put("/api/bar-code-scanner-controllers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barCodeScannerController)))
            .andExpect(status().isCreated());

        // Validate the BarCodeScannerController in the database
        List<BarCodeScannerController> barCodeScannerControllerList = barCodeScannerControllerRepository.findAll();
        assertThat(barCodeScannerControllerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBarCodeScannerController() throws Exception {
        // Initialize the database
        barCodeScannerControllerRepository.saveAndFlush(barCodeScannerController);
        int databaseSizeBeforeDelete = barCodeScannerControllerRepository.findAll().size();

        // Get the barCodeScannerController
        restBarCodeScannerControllerMockMvc.perform(delete("/api/bar-code-scanner-controllers/{id}", barCodeScannerController.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BarCodeScannerController> barCodeScannerControllerList = barCodeScannerControllerRepository.findAll();
        assertThat(barCodeScannerControllerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BarCodeScannerController.class);
        BarCodeScannerController barCodeScannerController1 = new BarCodeScannerController();
        barCodeScannerController1.setId(1L);
        BarCodeScannerController barCodeScannerController2 = new BarCodeScannerController();
        barCodeScannerController2.setId(barCodeScannerController1.getId());
        assertThat(barCodeScannerController1).isEqualTo(barCodeScannerController2);
        barCodeScannerController2.setId(2L);
        assertThat(barCodeScannerController1).isNotEqualTo(barCodeScannerController2);
        barCodeScannerController1.setId(null);
        assertThat(barCodeScannerController1).isNotEqualTo(barCodeScannerController2);
    }
}
