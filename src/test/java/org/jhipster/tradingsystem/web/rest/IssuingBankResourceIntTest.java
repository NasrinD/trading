package org.jhipster.tradingsystem.web.rest;

import org.jhipster.tradingsystem.TradingsystemMoApp;

import org.jhipster.tradingsystem.domain.IssuingBank;
import org.jhipster.tradingsystem.repository.IssuingBankRepository;
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
 * Test class for the IssuingBankResource REST controller.
 *
 * @see IssuingBankResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TradingsystemMoApp.class)
public class IssuingBankResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    @Autowired
    private IssuingBankRepository issuingBankRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIssuingBankMockMvc;

    private IssuingBank issuingBank;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IssuingBankResource issuingBankResource = new IssuingBankResource(issuingBankRepository);
        this.restIssuingBankMockMvc = MockMvcBuilders.standaloneSetup(issuingBankResource)
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
    public static IssuingBank createEntity(EntityManager em) {
        IssuingBank issuingBank = new IssuingBank()
            .name(DEFAULT_NAME)
            .address(DEFAULT_ADDRESS);
        return issuingBank;
    }

    @Before
    public void initTest() {
        issuingBank = createEntity(em);
    }

    @Test
    @Transactional
    public void createIssuingBank() throws Exception {
        int databaseSizeBeforeCreate = issuingBankRepository.findAll().size();

        // Create the IssuingBank
        restIssuingBankMockMvc.perform(post("/api/issuing-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(issuingBank)))
            .andExpect(status().isCreated());

        // Validate the IssuingBank in the database
        List<IssuingBank> issuingBankList = issuingBankRepository.findAll();
        assertThat(issuingBankList).hasSize(databaseSizeBeforeCreate + 1);
        IssuingBank testIssuingBank = issuingBankList.get(issuingBankList.size() - 1);
        assertThat(testIssuingBank.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testIssuingBank.getAddress()).isEqualTo(DEFAULT_ADDRESS);
    }

    @Test
    @Transactional
    public void createIssuingBankWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = issuingBankRepository.findAll().size();

        // Create the IssuingBank with an existing ID
        issuingBank.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIssuingBankMockMvc.perform(post("/api/issuing-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(issuingBank)))
            .andExpect(status().isBadRequest());

        // Validate the IssuingBank in the database
        List<IssuingBank> issuingBankList = issuingBankRepository.findAll();
        assertThat(issuingBankList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = issuingBankRepository.findAll().size();
        // set the field null
        issuingBank.setName(null);

        // Create the IssuingBank, which fails.

        restIssuingBankMockMvc.perform(post("/api/issuing-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(issuingBank)))
            .andExpect(status().isBadRequest());

        List<IssuingBank> issuingBankList = issuingBankRepository.findAll();
        assertThat(issuingBankList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllIssuingBanks() throws Exception {
        // Initialize the database
        issuingBankRepository.saveAndFlush(issuingBank);

        // Get all the issuingBankList
        restIssuingBankMockMvc.perform(get("/api/issuing-banks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(issuingBank.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())));
    }

    @Test
    @Transactional
    public void getIssuingBank() throws Exception {
        // Initialize the database
        issuingBankRepository.saveAndFlush(issuingBank);

        // Get the issuingBank
        restIssuingBankMockMvc.perform(get("/api/issuing-banks/{id}", issuingBank.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(issuingBank.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIssuingBank() throws Exception {
        // Get the issuingBank
        restIssuingBankMockMvc.perform(get("/api/issuing-banks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIssuingBank() throws Exception {
        // Initialize the database
        issuingBankRepository.saveAndFlush(issuingBank);
        int databaseSizeBeforeUpdate = issuingBankRepository.findAll().size();

        // Update the issuingBank
        IssuingBank updatedIssuingBank = issuingBankRepository.findOne(issuingBank.getId());
        // Disconnect from session so that the updates on updatedIssuingBank are not directly saved in db
        em.detach(updatedIssuingBank);
        updatedIssuingBank
            .name(UPDATED_NAME)
            .address(UPDATED_ADDRESS);

        restIssuingBankMockMvc.perform(put("/api/issuing-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIssuingBank)))
            .andExpect(status().isOk());

        // Validate the IssuingBank in the database
        List<IssuingBank> issuingBankList = issuingBankRepository.findAll();
        assertThat(issuingBankList).hasSize(databaseSizeBeforeUpdate);
        IssuingBank testIssuingBank = issuingBankList.get(issuingBankList.size() - 1);
        assertThat(testIssuingBank.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testIssuingBank.getAddress()).isEqualTo(UPDATED_ADDRESS);
    }

    @Test
    @Transactional
    public void updateNonExistingIssuingBank() throws Exception {
        int databaseSizeBeforeUpdate = issuingBankRepository.findAll().size();

        // Create the IssuingBank

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIssuingBankMockMvc.perform(put("/api/issuing-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(issuingBank)))
            .andExpect(status().isCreated());

        // Validate the IssuingBank in the database
        List<IssuingBank> issuingBankList = issuingBankRepository.findAll();
        assertThat(issuingBankList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIssuingBank() throws Exception {
        // Initialize the database
        issuingBankRepository.saveAndFlush(issuingBank);
        int databaseSizeBeforeDelete = issuingBankRepository.findAll().size();

        // Get the issuingBank
        restIssuingBankMockMvc.perform(delete("/api/issuing-banks/{id}", issuingBank.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IssuingBank> issuingBankList = issuingBankRepository.findAll();
        assertThat(issuingBankList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IssuingBank.class);
        IssuingBank issuingBank1 = new IssuingBank();
        issuingBank1.setId(1L);
        IssuingBank issuingBank2 = new IssuingBank();
        issuingBank2.setId(issuingBank1.getId());
        assertThat(issuingBank1).isEqualTo(issuingBank2);
        issuingBank2.setId(2L);
        assertThat(issuingBank1).isNotEqualTo(issuingBank2);
        issuingBank1.setId(null);
        assertThat(issuingBank1).isNotEqualTo(issuingBank2);
    }
}
