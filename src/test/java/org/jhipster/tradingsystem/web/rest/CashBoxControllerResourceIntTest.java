package org.jhipster.tradingsystem.web.rest;

import org.jhipster.tradingsystem.TradingsystemEmApp;

import org.jhipster.tradingsystem.domain.CashBoxController;
import org.jhipster.tradingsystem.repository.CashBoxControllerRepository;
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
 * Test class for the CashBoxControllerResource REST controller.
 *
 * @see CashBoxControllerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TradingsystemEmApp.class)
public class CashBoxControllerResourceIntTest {

    @Autowired
    private CashBoxControllerRepository cashBoxControllerRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCashBoxControllerMockMvc;

    private CashBoxController cashBoxController;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CashBoxControllerResource cashBoxControllerResource = new CashBoxControllerResource(cashBoxControllerRepository);
        this.restCashBoxControllerMockMvc = MockMvcBuilders.standaloneSetup(cashBoxControllerResource)
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
    public static CashBoxController createEntity(EntityManager em) {
        CashBoxController cashBoxController = new CashBoxController();
        return cashBoxController;
    }

    @Before
    public void initTest() {
        cashBoxController = createEntity(em);
    }

    @Test
    @Transactional
    public void createCashBoxController() throws Exception {
        int databaseSizeBeforeCreate = cashBoxControllerRepository.findAll().size();

        // Create the CashBoxController
        restCashBoxControllerMockMvc.perform(post("/api/cash-box-controllers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashBoxController)))
            .andExpect(status().isCreated());

        // Validate the CashBoxController in the database
        List<CashBoxController> cashBoxControllerList = cashBoxControllerRepository.findAll();
        assertThat(cashBoxControllerList).hasSize(databaseSizeBeforeCreate + 1);
        CashBoxController testCashBoxController = cashBoxControllerList.get(cashBoxControllerList.size() - 1);
    }

    @Test
    @Transactional
    public void createCashBoxControllerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cashBoxControllerRepository.findAll().size();

        // Create the CashBoxController with an existing ID
        cashBoxController.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCashBoxControllerMockMvc.perform(post("/api/cash-box-controllers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashBoxController)))
            .andExpect(status().isBadRequest());

        // Validate the CashBoxController in the database
        List<CashBoxController> cashBoxControllerList = cashBoxControllerRepository.findAll();
        assertThat(cashBoxControllerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCashBoxControllers() throws Exception {
        // Initialize the database
        cashBoxControllerRepository.saveAndFlush(cashBoxController);

        // Get all the cashBoxControllerList
        restCashBoxControllerMockMvc.perform(get("/api/cash-box-controllers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cashBoxController.getId().intValue())));
    }

    @Test
    @Transactional
    public void getCashBoxController() throws Exception {
        // Initialize the database
        cashBoxControllerRepository.saveAndFlush(cashBoxController);

        // Get the cashBoxController
        restCashBoxControllerMockMvc.perform(get("/api/cash-box-controllers/{id}", cashBoxController.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cashBoxController.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCashBoxController() throws Exception {
        // Get the cashBoxController
        restCashBoxControllerMockMvc.perform(get("/api/cash-box-controllers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCashBoxController() throws Exception {
        // Initialize the database
        cashBoxControllerRepository.saveAndFlush(cashBoxController);
        int databaseSizeBeforeUpdate = cashBoxControllerRepository.findAll().size();

        // Update the cashBoxController
        CashBoxController updatedCashBoxController = cashBoxControllerRepository.findOne(cashBoxController.getId());
        // Disconnect from session so that the updates on updatedCashBoxController are not directly saved in db
        em.detach(updatedCashBoxController);

        restCashBoxControllerMockMvc.perform(put("/api/cash-box-controllers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCashBoxController)))
            .andExpect(status().isOk());

        // Validate the CashBoxController in the database
        List<CashBoxController> cashBoxControllerList = cashBoxControllerRepository.findAll();
        assertThat(cashBoxControllerList).hasSize(databaseSizeBeforeUpdate);
        CashBoxController testCashBoxController = cashBoxControllerList.get(cashBoxControllerList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingCashBoxController() throws Exception {
        int databaseSizeBeforeUpdate = cashBoxControllerRepository.findAll().size();

        // Create the CashBoxController

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCashBoxControllerMockMvc.perform(put("/api/cash-box-controllers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashBoxController)))
            .andExpect(status().isCreated());

        // Validate the CashBoxController in the database
        List<CashBoxController> cashBoxControllerList = cashBoxControllerRepository.findAll();
        assertThat(cashBoxControllerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCashBoxController() throws Exception {
        // Initialize the database
        cashBoxControllerRepository.saveAndFlush(cashBoxController);
        int databaseSizeBeforeDelete = cashBoxControllerRepository.findAll().size();

        // Get the cashBoxController
        restCashBoxControllerMockMvc.perform(delete("/api/cash-box-controllers/{id}", cashBoxController.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CashBoxController> cashBoxControllerList = cashBoxControllerRepository.findAll();
        assertThat(cashBoxControllerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CashBoxController.class);
        CashBoxController cashBoxController1 = new CashBoxController();
        cashBoxController1.setId(1L);
        CashBoxController cashBoxController2 = new CashBoxController();
        cashBoxController2.setId(cashBoxController1.getId());
        assertThat(cashBoxController1).isEqualTo(cashBoxController2);
        cashBoxController2.setId(2L);
        assertThat(cashBoxController1).isNotEqualTo(cashBoxController2);
        cashBoxController1.setId(null);
        assertThat(cashBoxController1).isNotEqualTo(cashBoxController2);
    }
}
