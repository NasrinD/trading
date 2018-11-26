package org.jhipster.tradingsystem.web.rest;

import org.jhipster.tradingsystem.TradingsystemMoApp;

import org.jhipster.tradingsystem.domain.Debit;
import org.jhipster.tradingsystem.repository.DebitRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.jhipster.tradingsystem.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DebitResource REST controller.
 *
 * @see DebitResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TradingsystemMoApp.class)
public class DebitResourceIntTest {

    private static final Long DEFAULT_PIN = 1L;
    private static final Long UPDATED_PIN = 2L;

    private static final Long DEFAULT_CARD_NUMBER = 1L;
    private static final Long UPDATED_CARD_NUMBER = 2L;

    private static final Instant DEFAULT_VALIDITY_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_VALIDITY_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private DebitRepository debitRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDebitMockMvc;

    private Debit debit;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DebitResource debitResource = new DebitResource(debitRepository);
        this.restDebitMockMvc = MockMvcBuilders.standaloneSetup(debitResource)
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
    public static Debit createEntity(EntityManager em) {
        Debit debit = new Debit()
            .pin(DEFAULT_PIN)
            .cardNumber(DEFAULT_CARD_NUMBER)
            .validityDate(DEFAULT_VALIDITY_DATE);
        return debit;
    }

    @Before
    public void initTest() {
        debit = createEntity(em);
    }

    @Test
    @Transactional
    public void createDebit() throws Exception {
        int databaseSizeBeforeCreate = debitRepository.findAll().size();

        // Create the Debit
        restDebitMockMvc.perform(post("/api/debits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(debit)))
            .andExpect(status().isCreated());

        // Validate the Debit in the database
        List<Debit> debitList = debitRepository.findAll();
        assertThat(debitList).hasSize(databaseSizeBeforeCreate + 1);
        Debit testDebit = debitList.get(debitList.size() - 1);
        assertThat(testDebit.getPin()).isEqualTo(DEFAULT_PIN);
        assertThat(testDebit.getCardNumber()).isEqualTo(DEFAULT_CARD_NUMBER);
        assertThat(testDebit.getValidityDate()).isEqualTo(DEFAULT_VALIDITY_DATE);
    }

    @Test
    @Transactional
    public void createDebitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = debitRepository.findAll().size();

        // Create the Debit with an existing ID
        debit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDebitMockMvc.perform(post("/api/debits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(debit)))
            .andExpect(status().isBadRequest());

        // Validate the Debit in the database
        List<Debit> debitList = debitRepository.findAll();
        assertThat(debitList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPinIsRequired() throws Exception {
        int databaseSizeBeforeTest = debitRepository.findAll().size();
        // set the field null
        debit.setPin(null);

        // Create the Debit, which fails.

        restDebitMockMvc.perform(post("/api/debits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(debit)))
            .andExpect(status().isBadRequest());

        List<Debit> debitList = debitRepository.findAll();
        assertThat(debitList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCardNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = debitRepository.findAll().size();
        // set the field null
        debit.setCardNumber(null);

        // Create the Debit, which fails.

        restDebitMockMvc.perform(post("/api/debits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(debit)))
            .andExpect(status().isBadRequest());

        List<Debit> debitList = debitRepository.findAll();
        assertThat(debitList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkValidityDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = debitRepository.findAll().size();
        // set the field null
        debit.setValidityDate(null);

        // Create the Debit, which fails.

        restDebitMockMvc.perform(post("/api/debits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(debit)))
            .andExpect(status().isBadRequest());

        List<Debit> debitList = debitRepository.findAll();
        assertThat(debitList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDebits() throws Exception {
        // Initialize the database
        debitRepository.saveAndFlush(debit);

        // Get all the debitList
        restDebitMockMvc.perform(get("/api/debits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(debit.getId().intValue())))
            .andExpect(jsonPath("$.[*].pin").value(hasItem(DEFAULT_PIN.intValue())))
            .andExpect(jsonPath("$.[*].cardNumber").value(hasItem(DEFAULT_CARD_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].validityDate").value(hasItem(DEFAULT_VALIDITY_DATE.toString())));
    }

    @Test
    @Transactional
    public void getDebit() throws Exception {
        // Initialize the database
        debitRepository.saveAndFlush(debit);

        // Get the debit
        restDebitMockMvc.perform(get("/api/debits/{id}", debit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(debit.getId().intValue()))
            .andExpect(jsonPath("$.pin").value(DEFAULT_PIN.intValue()))
            .andExpect(jsonPath("$.cardNumber").value(DEFAULT_CARD_NUMBER.intValue()))
            .andExpect(jsonPath("$.validityDate").value(DEFAULT_VALIDITY_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDebit() throws Exception {
        // Get the debit
        restDebitMockMvc.perform(get("/api/debits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDebit() throws Exception {
        // Initialize the database
        debitRepository.saveAndFlush(debit);
        int databaseSizeBeforeUpdate = debitRepository.findAll().size();

        // Update the debit
        Debit updatedDebit = debitRepository.findOne(debit.getId());
        // Disconnect from session so that the updates on updatedDebit are not directly saved in db
        em.detach(updatedDebit);
        updatedDebit
            .pin(UPDATED_PIN)
            .cardNumber(UPDATED_CARD_NUMBER)
            .validityDate(UPDATED_VALIDITY_DATE);

        restDebitMockMvc.perform(put("/api/debits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDebit)))
            .andExpect(status().isOk());

        // Validate the Debit in the database
        List<Debit> debitList = debitRepository.findAll();
        assertThat(debitList).hasSize(databaseSizeBeforeUpdate);
        Debit testDebit = debitList.get(debitList.size() - 1);
        assertThat(testDebit.getPin()).isEqualTo(UPDATED_PIN);
        assertThat(testDebit.getCardNumber()).isEqualTo(UPDATED_CARD_NUMBER);
        assertThat(testDebit.getValidityDate()).isEqualTo(UPDATED_VALIDITY_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingDebit() throws Exception {
        int databaseSizeBeforeUpdate = debitRepository.findAll().size();

        // Create the Debit

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDebitMockMvc.perform(put("/api/debits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(debit)))
            .andExpect(status().isCreated());

        // Validate the Debit in the database
        List<Debit> debitList = debitRepository.findAll();
        assertThat(debitList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDebit() throws Exception {
        // Initialize the database
        debitRepository.saveAndFlush(debit);
        int databaseSizeBeforeDelete = debitRepository.findAll().size();

        // Get the debit
        restDebitMockMvc.perform(delete("/api/debits/{id}", debit.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Debit> debitList = debitRepository.findAll();
        assertThat(debitList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Debit.class);
        Debit debit1 = new Debit();
        debit1.setId(1L);
        Debit debit2 = new Debit();
        debit2.setId(debit1.getId());
        assertThat(debit1).isEqualTo(debit2);
        debit2.setId(2L);
        assertThat(debit1).isNotEqualTo(debit2);
        debit1.setId(null);
        assertThat(debit1).isNotEqualTo(debit2);
    }
}
