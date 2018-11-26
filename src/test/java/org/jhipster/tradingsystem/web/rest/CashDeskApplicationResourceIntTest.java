package org.jhipster.tradingsystem.web.rest;

import org.jhipster.tradingsystem.TradingsystemMoApp;

import org.jhipster.tradingsystem.domain.CashDeskApplication;
import org.jhipster.tradingsystem.repository.CashDeskApplicationRepository;
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
 * Test class for the CashDeskApplicationResource REST controller.
 *
 * @see CashDeskApplicationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TradingsystemMoApp.class)
public class CashDeskApplicationResourceIntTest {

    @Autowired
    private CashDeskApplicationRepository cashDeskApplicationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCashDeskApplicationMockMvc;

    private CashDeskApplication cashDeskApplication;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CashDeskApplicationResource cashDeskApplicationResource = new CashDeskApplicationResource(cashDeskApplicationRepository);
        this.restCashDeskApplicationMockMvc = MockMvcBuilders.standaloneSetup(cashDeskApplicationResource)
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
    public static CashDeskApplication createEntity(EntityManager em) {
        CashDeskApplication cashDeskApplication = new CashDeskApplication();
        return cashDeskApplication;
    }

    @Before
    public void initTest() {
        cashDeskApplication = createEntity(em);
    }

    @Test
    @Transactional
    public void createCashDeskApplication() throws Exception {
        int databaseSizeBeforeCreate = cashDeskApplicationRepository.findAll().size();

        // Create the CashDeskApplication
        restCashDeskApplicationMockMvc.perform(post("/api/cash-desk-applications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashDeskApplication)))
            .andExpect(status().isCreated());

        // Validate the CashDeskApplication in the database
        List<CashDeskApplication> cashDeskApplicationList = cashDeskApplicationRepository.findAll();
        assertThat(cashDeskApplicationList).hasSize(databaseSizeBeforeCreate + 1);
        CashDeskApplication testCashDeskApplication = cashDeskApplicationList.get(cashDeskApplicationList.size() - 1);
    }

    @Test
    @Transactional
    public void createCashDeskApplicationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cashDeskApplicationRepository.findAll().size();

        // Create the CashDeskApplication with an existing ID
        cashDeskApplication.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCashDeskApplicationMockMvc.perform(post("/api/cash-desk-applications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashDeskApplication)))
            .andExpect(status().isBadRequest());

        // Validate the CashDeskApplication in the database
        List<CashDeskApplication> cashDeskApplicationList = cashDeskApplicationRepository.findAll();
        assertThat(cashDeskApplicationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCashDeskApplications() throws Exception {
        // Initialize the database
        cashDeskApplicationRepository.saveAndFlush(cashDeskApplication);

        // Get all the cashDeskApplicationList
        restCashDeskApplicationMockMvc.perform(get("/api/cash-desk-applications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cashDeskApplication.getId().intValue())));
    }

    @Test
    @Transactional
    public void getCashDeskApplication() throws Exception {
        // Initialize the database
        cashDeskApplicationRepository.saveAndFlush(cashDeskApplication);

        // Get the cashDeskApplication
        restCashDeskApplicationMockMvc.perform(get("/api/cash-desk-applications/{id}", cashDeskApplication.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cashDeskApplication.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCashDeskApplication() throws Exception {
        // Get the cashDeskApplication
        restCashDeskApplicationMockMvc.perform(get("/api/cash-desk-applications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCashDeskApplication() throws Exception {
        // Initialize the database
        cashDeskApplicationRepository.saveAndFlush(cashDeskApplication);
        int databaseSizeBeforeUpdate = cashDeskApplicationRepository.findAll().size();

        // Update the cashDeskApplication
        CashDeskApplication updatedCashDeskApplication = cashDeskApplicationRepository.findOne(cashDeskApplication.getId());
        // Disconnect from session so that the updates on updatedCashDeskApplication are not directly saved in db
        em.detach(updatedCashDeskApplication);

        restCashDeskApplicationMockMvc.perform(put("/api/cash-desk-applications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCashDeskApplication)))
            .andExpect(status().isOk());

        // Validate the CashDeskApplication in the database
        List<CashDeskApplication> cashDeskApplicationList = cashDeskApplicationRepository.findAll();
        assertThat(cashDeskApplicationList).hasSize(databaseSizeBeforeUpdate);
        CashDeskApplication testCashDeskApplication = cashDeskApplicationList.get(cashDeskApplicationList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingCashDeskApplication() throws Exception {
        int databaseSizeBeforeUpdate = cashDeskApplicationRepository.findAll().size();

        // Create the CashDeskApplication

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCashDeskApplicationMockMvc.perform(put("/api/cash-desk-applications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashDeskApplication)))
            .andExpect(status().isCreated());

        // Validate the CashDeskApplication in the database
        List<CashDeskApplication> cashDeskApplicationList = cashDeskApplicationRepository.findAll();
        assertThat(cashDeskApplicationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCashDeskApplication() throws Exception {
        // Initialize the database
        cashDeskApplicationRepository.saveAndFlush(cashDeskApplication);
        int databaseSizeBeforeDelete = cashDeskApplicationRepository.findAll().size();

        // Get the cashDeskApplication
        restCashDeskApplicationMockMvc.perform(delete("/api/cash-desk-applications/{id}", cashDeskApplication.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CashDeskApplication> cashDeskApplicationList = cashDeskApplicationRepository.findAll();
        assertThat(cashDeskApplicationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CashDeskApplication.class);
        CashDeskApplication cashDeskApplication1 = new CashDeskApplication();
        cashDeskApplication1.setId(1L);
        CashDeskApplication cashDeskApplication2 = new CashDeskApplication();
        cashDeskApplication2.setId(cashDeskApplication1.getId());
        assertThat(cashDeskApplication1).isEqualTo(cashDeskApplication2);
        cashDeskApplication2.setId(2L);
        assertThat(cashDeskApplication1).isNotEqualTo(cashDeskApplication2);
        cashDeskApplication1.setId(null);
        assertThat(cashDeskApplication1).isNotEqualTo(cashDeskApplication2);
    }
}
