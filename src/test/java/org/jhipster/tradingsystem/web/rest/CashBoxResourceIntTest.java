package org.jhipster.tradingsystem.web.rest;

import org.jhipster.tradingsystem.TradingsystemMoApp;

import org.jhipster.tradingsystem.domain.CashBox;
import org.jhipster.tradingsystem.repository.CashBoxRepository;
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
 * Test class for the CashBoxResource REST controller.
 *
 * @see CashBoxResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TradingsystemMoApp.class)
public class CashBoxResourceIntTest {

    private static final String DEFAULT_MODEL = "AAAAAAAAAA";
    private static final String UPDATED_MODEL = "BBBBBBBBBB";

    @Autowired
    private CashBoxRepository cashBoxRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCashBoxMockMvc;

    private CashBox cashBox;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CashBoxResource cashBoxResource = new CashBoxResource(cashBoxRepository);
        this.restCashBoxMockMvc = MockMvcBuilders.standaloneSetup(cashBoxResource)
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
    public static CashBox createEntity(EntityManager em) {
        CashBox cashBox = new CashBox()
            .model(DEFAULT_MODEL);
        return cashBox;
    }

    @Before
    public void initTest() {
        cashBox = createEntity(em);
    }

    @Test
    @Transactional
    public void createCashBox() throws Exception {
        int databaseSizeBeforeCreate = cashBoxRepository.findAll().size();

        // Create the CashBox
        restCashBoxMockMvc.perform(post("/api/cash-boxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashBox)))
            .andExpect(status().isCreated());

        // Validate the CashBox in the database
        List<CashBox> cashBoxList = cashBoxRepository.findAll();
        assertThat(cashBoxList).hasSize(databaseSizeBeforeCreate + 1);
        CashBox testCashBox = cashBoxList.get(cashBoxList.size() - 1);
        assertThat(testCashBox.getModel()).isEqualTo(DEFAULT_MODEL);
    }

    @Test
    @Transactional
    public void createCashBoxWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cashBoxRepository.findAll().size();

        // Create the CashBox with an existing ID
        cashBox.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCashBoxMockMvc.perform(post("/api/cash-boxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashBox)))
            .andExpect(status().isBadRequest());

        // Validate the CashBox in the database
        List<CashBox> cashBoxList = cashBoxRepository.findAll();
        assertThat(cashBoxList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkModelIsRequired() throws Exception {
        int databaseSizeBeforeTest = cashBoxRepository.findAll().size();
        // set the field null
        cashBox.setModel(null);

        // Create the CashBox, which fails.

        restCashBoxMockMvc.perform(post("/api/cash-boxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashBox)))
            .andExpect(status().isBadRequest());

        List<CashBox> cashBoxList = cashBoxRepository.findAll();
        assertThat(cashBoxList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCashBoxes() throws Exception {
        // Initialize the database
        cashBoxRepository.saveAndFlush(cashBox);

        // Get all the cashBoxList
        restCashBoxMockMvc.perform(get("/api/cash-boxes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cashBox.getId().intValue())))
            .andExpect(jsonPath("$.[*].model").value(hasItem(DEFAULT_MODEL.toString())));
    }

    @Test
    @Transactional
    public void getCashBox() throws Exception {
        // Initialize the database
        cashBoxRepository.saveAndFlush(cashBox);

        // Get the cashBox
        restCashBoxMockMvc.perform(get("/api/cash-boxes/{id}", cashBox.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cashBox.getId().intValue()))
            .andExpect(jsonPath("$.model").value(DEFAULT_MODEL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCashBox() throws Exception {
        // Get the cashBox
        restCashBoxMockMvc.perform(get("/api/cash-boxes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCashBox() throws Exception {
        // Initialize the database
        cashBoxRepository.saveAndFlush(cashBox);
        int databaseSizeBeforeUpdate = cashBoxRepository.findAll().size();

        // Update the cashBox
        CashBox updatedCashBox = cashBoxRepository.findOne(cashBox.getId());
        // Disconnect from session so that the updates on updatedCashBox are not directly saved in db
        em.detach(updatedCashBox);
        updatedCashBox
            .model(UPDATED_MODEL);

        restCashBoxMockMvc.perform(put("/api/cash-boxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCashBox)))
            .andExpect(status().isOk());

        // Validate the CashBox in the database
        List<CashBox> cashBoxList = cashBoxRepository.findAll();
        assertThat(cashBoxList).hasSize(databaseSizeBeforeUpdate);
        CashBox testCashBox = cashBoxList.get(cashBoxList.size() - 1);
        assertThat(testCashBox.getModel()).isEqualTo(UPDATED_MODEL);
    }

    @Test
    @Transactional
    public void updateNonExistingCashBox() throws Exception {
        int databaseSizeBeforeUpdate = cashBoxRepository.findAll().size();

        // Create the CashBox

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCashBoxMockMvc.perform(put("/api/cash-boxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashBox)))
            .andExpect(status().isCreated());

        // Validate the CashBox in the database
        List<CashBox> cashBoxList = cashBoxRepository.findAll();
        assertThat(cashBoxList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCashBox() throws Exception {
        // Initialize the database
        cashBoxRepository.saveAndFlush(cashBox);
        int databaseSizeBeforeDelete = cashBoxRepository.findAll().size();

        // Get the cashBox
        restCashBoxMockMvc.perform(delete("/api/cash-boxes/{id}", cashBox.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CashBox> cashBoxList = cashBoxRepository.findAll();
        assertThat(cashBoxList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CashBox.class);
        CashBox cashBox1 = new CashBox();
        cashBox1.setId(1L);
        CashBox cashBox2 = new CashBox();
        cashBox2.setId(cashBox1.getId());
        assertThat(cashBox1).isEqualTo(cashBox2);
        cashBox2.setId(2L);
        assertThat(cashBox1).isNotEqualTo(cashBox2);
        cashBox1.setId(null);
        assertThat(cashBox1).isNotEqualTo(cashBox2);
    }
}
