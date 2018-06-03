package org.jhipster.tradingsystem.web.rest;

import org.jhipster.tradingsystem.TradingsystemEmApp;

import org.jhipster.tradingsystem.domain.BarCodeScanner;
import org.jhipster.tradingsystem.repository.BarCodeScannerRepository;
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
 * Test class for the BarCodeScannerResource REST controller.
 *
 * @see BarCodeScannerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TradingsystemEmApp.class)
public class BarCodeScannerResourceIntTest {

    private static final String DEFAULT_MODEL = "AAAAAAAAAA";
    private static final String UPDATED_MODEL = "BBBBBBBBBB";

    @Autowired
    private BarCodeScannerRepository barCodeScannerRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBarCodeScannerMockMvc;

    private BarCodeScanner barCodeScanner;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BarCodeScannerResource barCodeScannerResource = new BarCodeScannerResource(barCodeScannerRepository);
        this.restBarCodeScannerMockMvc = MockMvcBuilders.standaloneSetup(barCodeScannerResource)
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
    public static BarCodeScanner createEntity(EntityManager em) {
        BarCodeScanner barCodeScanner = new BarCodeScanner()
            .model(DEFAULT_MODEL);
        return barCodeScanner;
    }

    @Before
    public void initTest() {
        barCodeScanner = createEntity(em);
    }

    @Test
    @Transactional
    public void createBarCodeScanner() throws Exception {
        int databaseSizeBeforeCreate = barCodeScannerRepository.findAll().size();

        // Create the BarCodeScanner
        restBarCodeScannerMockMvc.perform(post("/api/bar-code-scanners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barCodeScanner)))
            .andExpect(status().isCreated());

        // Validate the BarCodeScanner in the database
        List<BarCodeScanner> barCodeScannerList = barCodeScannerRepository.findAll();
        assertThat(barCodeScannerList).hasSize(databaseSizeBeforeCreate + 1);
        BarCodeScanner testBarCodeScanner = barCodeScannerList.get(barCodeScannerList.size() - 1);
        assertThat(testBarCodeScanner.getModel()).isEqualTo(DEFAULT_MODEL);
    }

    @Test
    @Transactional
    public void createBarCodeScannerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = barCodeScannerRepository.findAll().size();

        // Create the BarCodeScanner with an existing ID
        barCodeScanner.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBarCodeScannerMockMvc.perform(post("/api/bar-code-scanners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barCodeScanner)))
            .andExpect(status().isBadRequest());

        // Validate the BarCodeScanner in the database
        List<BarCodeScanner> barCodeScannerList = barCodeScannerRepository.findAll();
        assertThat(barCodeScannerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkModelIsRequired() throws Exception {
        int databaseSizeBeforeTest = barCodeScannerRepository.findAll().size();
        // set the field null
        barCodeScanner.setModel(null);

        // Create the BarCodeScanner, which fails.

        restBarCodeScannerMockMvc.perform(post("/api/bar-code-scanners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barCodeScanner)))
            .andExpect(status().isBadRequest());

        List<BarCodeScanner> barCodeScannerList = barCodeScannerRepository.findAll();
        assertThat(barCodeScannerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBarCodeScanners() throws Exception {
        // Initialize the database
        barCodeScannerRepository.saveAndFlush(barCodeScanner);

        // Get all the barCodeScannerList
        restBarCodeScannerMockMvc.perform(get("/api/bar-code-scanners?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(barCodeScanner.getId().intValue())))
            .andExpect(jsonPath("$.[*].model").value(hasItem(DEFAULT_MODEL.toString())));
    }

    @Test
    @Transactional
    public void getBarCodeScanner() throws Exception {
        // Initialize the database
        barCodeScannerRepository.saveAndFlush(barCodeScanner);

        // Get the barCodeScanner
        restBarCodeScannerMockMvc.perform(get("/api/bar-code-scanners/{id}", barCodeScanner.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(barCodeScanner.getId().intValue()))
            .andExpect(jsonPath("$.model").value(DEFAULT_MODEL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBarCodeScanner() throws Exception {
        // Get the barCodeScanner
        restBarCodeScannerMockMvc.perform(get("/api/bar-code-scanners/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBarCodeScanner() throws Exception {
        // Initialize the database
        barCodeScannerRepository.saveAndFlush(barCodeScanner);
        int databaseSizeBeforeUpdate = barCodeScannerRepository.findAll().size();

        // Update the barCodeScanner
        BarCodeScanner updatedBarCodeScanner = barCodeScannerRepository.findOne(barCodeScanner.getId());
        // Disconnect from session so that the updates on updatedBarCodeScanner are not directly saved in db
        em.detach(updatedBarCodeScanner);
        updatedBarCodeScanner
            .model(UPDATED_MODEL);

        restBarCodeScannerMockMvc.perform(put("/api/bar-code-scanners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBarCodeScanner)))
            .andExpect(status().isOk());

        // Validate the BarCodeScanner in the database
        List<BarCodeScanner> barCodeScannerList = barCodeScannerRepository.findAll();
        assertThat(barCodeScannerList).hasSize(databaseSizeBeforeUpdate);
        BarCodeScanner testBarCodeScanner = barCodeScannerList.get(barCodeScannerList.size() - 1);
        assertThat(testBarCodeScanner.getModel()).isEqualTo(UPDATED_MODEL);
    }

    @Test
    @Transactional
    public void updateNonExistingBarCodeScanner() throws Exception {
        int databaseSizeBeforeUpdate = barCodeScannerRepository.findAll().size();

        // Create the BarCodeScanner

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBarCodeScannerMockMvc.perform(put("/api/bar-code-scanners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barCodeScanner)))
            .andExpect(status().isCreated());

        // Validate the BarCodeScanner in the database
        List<BarCodeScanner> barCodeScannerList = barCodeScannerRepository.findAll();
        assertThat(barCodeScannerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBarCodeScanner() throws Exception {
        // Initialize the database
        barCodeScannerRepository.saveAndFlush(barCodeScanner);
        int databaseSizeBeforeDelete = barCodeScannerRepository.findAll().size();

        // Get the barCodeScanner
        restBarCodeScannerMockMvc.perform(delete("/api/bar-code-scanners/{id}", barCodeScanner.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BarCodeScanner> barCodeScannerList = barCodeScannerRepository.findAll();
        assertThat(barCodeScannerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BarCodeScanner.class);
        BarCodeScanner barCodeScanner1 = new BarCodeScanner();
        barCodeScanner1.setId(1L);
        BarCodeScanner barCodeScanner2 = new BarCodeScanner();
        barCodeScanner2.setId(barCodeScanner1.getId());
        assertThat(barCodeScanner1).isEqualTo(barCodeScanner2);
        barCodeScanner2.setId(2L);
        assertThat(barCodeScanner1).isNotEqualTo(barCodeScanner2);
        barCodeScanner1.setId(null);
        assertThat(barCodeScanner1).isNotEqualTo(barCodeScanner2);
    }
}
