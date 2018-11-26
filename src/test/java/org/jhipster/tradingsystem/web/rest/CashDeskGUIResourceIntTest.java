package org.jhipster.tradingsystem.web.rest;

import org.jhipster.tradingsystem.TradingsystemMoApp;

import org.jhipster.tradingsystem.domain.CashDeskGUI;
import org.jhipster.tradingsystem.repository.CashDeskGUIRepository;
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
 * Test class for the CashDeskGUIResource REST controller.
 *
 * @see CashDeskGUIResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TradingsystemMoApp.class)
public class CashDeskGUIResourceIntTest {

    @Autowired
    private CashDeskGUIRepository cashDeskGUIRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCashDeskGUIMockMvc;

    private CashDeskGUI cashDeskGUI;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CashDeskGUIResource cashDeskGUIResource = new CashDeskGUIResource(cashDeskGUIRepository);
        this.restCashDeskGUIMockMvc = MockMvcBuilders.standaloneSetup(cashDeskGUIResource)
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
    public static CashDeskGUI createEntity(EntityManager em) {
        CashDeskGUI cashDeskGUI = new CashDeskGUI();
        return cashDeskGUI;
    }

    @Before
    public void initTest() {
        cashDeskGUI = createEntity(em);
    }

    @Test
    @Transactional
    public void createCashDeskGUI() throws Exception {
        int databaseSizeBeforeCreate = cashDeskGUIRepository.findAll().size();

        // Create the CashDeskGUI
        restCashDeskGUIMockMvc.perform(post("/api/cash-desk-guis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashDeskGUI)))
            .andExpect(status().isCreated());

        // Validate the CashDeskGUI in the database
        List<CashDeskGUI> cashDeskGUIList = cashDeskGUIRepository.findAll();
        assertThat(cashDeskGUIList).hasSize(databaseSizeBeforeCreate + 1);
        CashDeskGUI testCashDeskGUI = cashDeskGUIList.get(cashDeskGUIList.size() - 1);
    }

    @Test
    @Transactional
    public void createCashDeskGUIWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cashDeskGUIRepository.findAll().size();

        // Create the CashDeskGUI with an existing ID
        cashDeskGUI.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCashDeskGUIMockMvc.perform(post("/api/cash-desk-guis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashDeskGUI)))
            .andExpect(status().isBadRequest());

        // Validate the CashDeskGUI in the database
        List<CashDeskGUI> cashDeskGUIList = cashDeskGUIRepository.findAll();
        assertThat(cashDeskGUIList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCashDeskGUIS() throws Exception {
        // Initialize the database
        cashDeskGUIRepository.saveAndFlush(cashDeskGUI);

        // Get all the cashDeskGUIList
        restCashDeskGUIMockMvc.perform(get("/api/cash-desk-guis?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cashDeskGUI.getId().intValue())));
    }

    @Test
    @Transactional
    public void getCashDeskGUI() throws Exception {
        // Initialize the database
        cashDeskGUIRepository.saveAndFlush(cashDeskGUI);

        // Get the cashDeskGUI
        restCashDeskGUIMockMvc.perform(get("/api/cash-desk-guis/{id}", cashDeskGUI.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cashDeskGUI.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCashDeskGUI() throws Exception {
        // Get the cashDeskGUI
        restCashDeskGUIMockMvc.perform(get("/api/cash-desk-guis/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCashDeskGUI() throws Exception {
        // Initialize the database
        cashDeskGUIRepository.saveAndFlush(cashDeskGUI);
        int databaseSizeBeforeUpdate = cashDeskGUIRepository.findAll().size();

        // Update the cashDeskGUI
        CashDeskGUI updatedCashDeskGUI = cashDeskGUIRepository.findOne(cashDeskGUI.getId());
        // Disconnect from session so that the updates on updatedCashDeskGUI are not directly saved in db
        em.detach(updatedCashDeskGUI);

        restCashDeskGUIMockMvc.perform(put("/api/cash-desk-guis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCashDeskGUI)))
            .andExpect(status().isOk());

        // Validate the CashDeskGUI in the database
        List<CashDeskGUI> cashDeskGUIList = cashDeskGUIRepository.findAll();
        assertThat(cashDeskGUIList).hasSize(databaseSizeBeforeUpdate);
        CashDeskGUI testCashDeskGUI = cashDeskGUIList.get(cashDeskGUIList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingCashDeskGUI() throws Exception {
        int databaseSizeBeforeUpdate = cashDeskGUIRepository.findAll().size();

        // Create the CashDeskGUI

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCashDeskGUIMockMvc.perform(put("/api/cash-desk-guis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashDeskGUI)))
            .andExpect(status().isCreated());

        // Validate the CashDeskGUI in the database
        List<CashDeskGUI> cashDeskGUIList = cashDeskGUIRepository.findAll();
        assertThat(cashDeskGUIList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCashDeskGUI() throws Exception {
        // Initialize the database
        cashDeskGUIRepository.saveAndFlush(cashDeskGUI);
        int databaseSizeBeforeDelete = cashDeskGUIRepository.findAll().size();

        // Get the cashDeskGUI
        restCashDeskGUIMockMvc.perform(delete("/api/cash-desk-guis/{id}", cashDeskGUI.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CashDeskGUI> cashDeskGUIList = cashDeskGUIRepository.findAll();
        assertThat(cashDeskGUIList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CashDeskGUI.class);
        CashDeskGUI cashDeskGUI1 = new CashDeskGUI();
        cashDeskGUI1.setId(1L);
        CashDeskGUI cashDeskGUI2 = new CashDeskGUI();
        cashDeskGUI2.setId(cashDeskGUI1.getId());
        assertThat(cashDeskGUI1).isEqualTo(cashDeskGUI2);
        cashDeskGUI2.setId(2L);
        assertThat(cashDeskGUI1).isNotEqualTo(cashDeskGUI2);
        cashDeskGUI1.setId(null);
        assertThat(cashDeskGUI1).isNotEqualTo(cashDeskGUI2);
    }
}
