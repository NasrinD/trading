package org.jhipster.tradingsystem.web.rest;

import org.jhipster.tradingsystem.TradingsystemMoApp;

import org.jhipster.tradingsystem.domain.AcquiringBank;
import org.jhipster.tradingsystem.repository.AcquiringBankRepository;
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
 * Test class for the AcquiringBankResource REST controller.
 *
 * @see AcquiringBankResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TradingsystemMoApp.class)
public class AcquiringBankResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    @Autowired
    private AcquiringBankRepository acquiringBankRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAcquiringBankMockMvc;

    private AcquiringBank acquiringBank;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AcquiringBankResource acquiringBankResource = new AcquiringBankResource(acquiringBankRepository);
        this.restAcquiringBankMockMvc = MockMvcBuilders.standaloneSetup(acquiringBankResource)
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
    public static AcquiringBank createEntity(EntityManager em) {
        AcquiringBank acquiringBank = new AcquiringBank()
            .name(DEFAULT_NAME)
            .address(DEFAULT_ADDRESS);
        return acquiringBank;
    }

    @Before
    public void initTest() {
        acquiringBank = createEntity(em);
    }

    @Test
    @Transactional
    public void createAcquiringBank() throws Exception {
        int databaseSizeBeforeCreate = acquiringBankRepository.findAll().size();

        // Create the AcquiringBank
        restAcquiringBankMockMvc.perform(post("/api/acquiring-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acquiringBank)))
            .andExpect(status().isCreated());

        // Validate the AcquiringBank in the database
        List<AcquiringBank> acquiringBankList = acquiringBankRepository.findAll();
        assertThat(acquiringBankList).hasSize(databaseSizeBeforeCreate + 1);
        AcquiringBank testAcquiringBank = acquiringBankList.get(acquiringBankList.size() - 1);
        assertThat(testAcquiringBank.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAcquiringBank.getAddress()).isEqualTo(DEFAULT_ADDRESS);
    }

    @Test
    @Transactional
    public void createAcquiringBankWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = acquiringBankRepository.findAll().size();

        // Create the AcquiringBank with an existing ID
        acquiringBank.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAcquiringBankMockMvc.perform(post("/api/acquiring-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acquiringBank)))
            .andExpect(status().isBadRequest());

        // Validate the AcquiringBank in the database
        List<AcquiringBank> acquiringBankList = acquiringBankRepository.findAll();
        assertThat(acquiringBankList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = acquiringBankRepository.findAll().size();
        // set the field null
        acquiringBank.setName(null);

        // Create the AcquiringBank, which fails.

        restAcquiringBankMockMvc.perform(post("/api/acquiring-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acquiringBank)))
            .andExpect(status().isBadRequest());

        List<AcquiringBank> acquiringBankList = acquiringBankRepository.findAll();
        assertThat(acquiringBankList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAcquiringBanks() throws Exception {
        // Initialize the database
        acquiringBankRepository.saveAndFlush(acquiringBank);

        // Get all the acquiringBankList
        restAcquiringBankMockMvc.perform(get("/api/acquiring-banks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(acquiringBank.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())));
    }

    @Test
    @Transactional
    public void getAcquiringBank() throws Exception {
        // Initialize the database
        acquiringBankRepository.saveAndFlush(acquiringBank);

        // Get the acquiringBank
        restAcquiringBankMockMvc.perform(get("/api/acquiring-banks/{id}", acquiringBank.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(acquiringBank.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAcquiringBank() throws Exception {
        // Get the acquiringBank
        restAcquiringBankMockMvc.perform(get("/api/acquiring-banks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAcquiringBank() throws Exception {
        // Initialize the database
        acquiringBankRepository.saveAndFlush(acquiringBank);
        int databaseSizeBeforeUpdate = acquiringBankRepository.findAll().size();

        // Update the acquiringBank
        AcquiringBank updatedAcquiringBank = acquiringBankRepository.findOne(acquiringBank.getId());
        // Disconnect from session so that the updates on updatedAcquiringBank are not directly saved in db
        em.detach(updatedAcquiringBank);
        updatedAcquiringBank
            .name(UPDATED_NAME)
            .address(UPDATED_ADDRESS);

        restAcquiringBankMockMvc.perform(put("/api/acquiring-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAcquiringBank)))
            .andExpect(status().isOk());

        // Validate the AcquiringBank in the database
        List<AcquiringBank> acquiringBankList = acquiringBankRepository.findAll();
        assertThat(acquiringBankList).hasSize(databaseSizeBeforeUpdate);
        AcquiringBank testAcquiringBank = acquiringBankList.get(acquiringBankList.size() - 1);
        assertThat(testAcquiringBank.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAcquiringBank.getAddress()).isEqualTo(UPDATED_ADDRESS);
    }

    @Test
    @Transactional
    public void updateNonExistingAcquiringBank() throws Exception {
        int databaseSizeBeforeUpdate = acquiringBankRepository.findAll().size();

        // Create the AcquiringBank

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAcquiringBankMockMvc.perform(put("/api/acquiring-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acquiringBank)))
            .andExpect(status().isCreated());

        // Validate the AcquiringBank in the database
        List<AcquiringBank> acquiringBankList = acquiringBankRepository.findAll();
        assertThat(acquiringBankList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAcquiringBank() throws Exception {
        // Initialize the database
        acquiringBankRepository.saveAndFlush(acquiringBank);
        int databaseSizeBeforeDelete = acquiringBankRepository.findAll().size();

        // Get the acquiringBank
        restAcquiringBankMockMvc.perform(delete("/api/acquiring-banks/{id}", acquiringBank.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AcquiringBank> acquiringBankList = acquiringBankRepository.findAll();
        assertThat(acquiringBankList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AcquiringBank.class);
        AcquiringBank acquiringBank1 = new AcquiringBank();
        acquiringBank1.setId(1L);
        AcquiringBank acquiringBank2 = new AcquiringBank();
        acquiringBank2.setId(acquiringBank1.getId());
        assertThat(acquiringBank1).isEqualTo(acquiringBank2);
        acquiringBank2.setId(2L);
        assertThat(acquiringBank1).isNotEqualTo(acquiringBank2);
        acquiringBank1.setId(null);
        assertThat(acquiringBank1).isNotEqualTo(acquiringBank2);
    }
}
