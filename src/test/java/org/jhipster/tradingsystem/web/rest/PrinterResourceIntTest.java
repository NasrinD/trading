package org.jhipster.tradingsystem.web.rest;

import org.jhipster.tradingsystem.TradingsystemMoApp;

import org.jhipster.tradingsystem.domain.Printer;
import org.jhipster.tradingsystem.repository.PrinterRepository;
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
 * Test class for the PrinterResource REST controller.
 *
 * @see PrinterResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TradingsystemMoApp.class)
public class PrinterResourceIntTest {

    private static final String DEFAULT_MODEL = "AAAAAAAAAA";
    private static final String UPDATED_MODEL = "BBBBBBBBBB";

    @Autowired
    private PrinterRepository printerRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPrinterMockMvc;

    private Printer printer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrinterResource printerResource = new PrinterResource(printerRepository);
        this.restPrinterMockMvc = MockMvcBuilders.standaloneSetup(printerResource)
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
    public static Printer createEntity(EntityManager em) {
        Printer printer = new Printer()
            .model(DEFAULT_MODEL);
        return printer;
    }

    @Before
    public void initTest() {
        printer = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrinter() throws Exception {
        int databaseSizeBeforeCreate = printerRepository.findAll().size();

        // Create the Printer
        restPrinterMockMvc.perform(post("/api/printers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(printer)))
            .andExpect(status().isCreated());

        // Validate the Printer in the database
        List<Printer> printerList = printerRepository.findAll();
        assertThat(printerList).hasSize(databaseSizeBeforeCreate + 1);
        Printer testPrinter = printerList.get(printerList.size() - 1);
        assertThat(testPrinter.getModel()).isEqualTo(DEFAULT_MODEL);
    }

    @Test
    @Transactional
    public void createPrinterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = printerRepository.findAll().size();

        // Create the Printer with an existing ID
        printer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrinterMockMvc.perform(post("/api/printers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(printer)))
            .andExpect(status().isBadRequest());

        // Validate the Printer in the database
        List<Printer> printerList = printerRepository.findAll();
        assertThat(printerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkModelIsRequired() throws Exception {
        int databaseSizeBeforeTest = printerRepository.findAll().size();
        // set the field null
        printer.setModel(null);

        // Create the Printer, which fails.

        restPrinterMockMvc.perform(post("/api/printers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(printer)))
            .andExpect(status().isBadRequest());

        List<Printer> printerList = printerRepository.findAll();
        assertThat(printerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPrinters() throws Exception {
        // Initialize the database
        printerRepository.saveAndFlush(printer);

        // Get all the printerList
        restPrinterMockMvc.perform(get("/api/printers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(printer.getId().intValue())))
            .andExpect(jsonPath("$.[*].model").value(hasItem(DEFAULT_MODEL.toString())));
    }

    @Test
    @Transactional
    public void getPrinter() throws Exception {
        // Initialize the database
        printerRepository.saveAndFlush(printer);

        // Get the printer
        restPrinterMockMvc.perform(get("/api/printers/{id}", printer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(printer.getId().intValue()))
            .andExpect(jsonPath("$.model").value(DEFAULT_MODEL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPrinter() throws Exception {
        // Get the printer
        restPrinterMockMvc.perform(get("/api/printers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrinter() throws Exception {
        // Initialize the database
        printerRepository.saveAndFlush(printer);
        int databaseSizeBeforeUpdate = printerRepository.findAll().size();

        // Update the printer
        Printer updatedPrinter = printerRepository.findOne(printer.getId());
        // Disconnect from session so that the updates on updatedPrinter are not directly saved in db
        em.detach(updatedPrinter);
        updatedPrinter
            .model(UPDATED_MODEL);

        restPrinterMockMvc.perform(put("/api/printers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrinter)))
            .andExpect(status().isOk());

        // Validate the Printer in the database
        List<Printer> printerList = printerRepository.findAll();
        assertThat(printerList).hasSize(databaseSizeBeforeUpdate);
        Printer testPrinter = printerList.get(printerList.size() - 1);
        assertThat(testPrinter.getModel()).isEqualTo(UPDATED_MODEL);
    }

    @Test
    @Transactional
    public void updateNonExistingPrinter() throws Exception {
        int databaseSizeBeforeUpdate = printerRepository.findAll().size();

        // Create the Printer

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPrinterMockMvc.perform(put("/api/printers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(printer)))
            .andExpect(status().isCreated());

        // Validate the Printer in the database
        List<Printer> printerList = printerRepository.findAll();
        assertThat(printerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePrinter() throws Exception {
        // Initialize the database
        printerRepository.saveAndFlush(printer);
        int databaseSizeBeforeDelete = printerRepository.findAll().size();

        // Get the printer
        restPrinterMockMvc.perform(delete("/api/printers/{id}", printer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Printer> printerList = printerRepository.findAll();
        assertThat(printerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Printer.class);
        Printer printer1 = new Printer();
        printer1.setId(1L);
        Printer printer2 = new Printer();
        printer2.setId(printer1.getId());
        assertThat(printer1).isEqualTo(printer2);
        printer2.setId(2L);
        assertThat(printer1).isNotEqualTo(printer2);
        printer1.setId(null);
        assertThat(printer1).isNotEqualTo(printer2);
    }
}
