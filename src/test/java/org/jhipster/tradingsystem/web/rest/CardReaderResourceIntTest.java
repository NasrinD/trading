package org.jhipster.tradingsystem.web.rest;

import org.jhipster.tradingsystem.TradingsystemEmApp;

import org.jhipster.tradingsystem.domain.CardReader;
import org.jhipster.tradingsystem.repository.CardReaderRepository;
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
 * Test class for the CardReaderResource REST controller.
 *
 * @see CardReaderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TradingsystemEmApp.class)
public class CardReaderResourceIntTest {

    private static final String DEFAULT_MODEL = "AAAAAAAAAA";
    private static final String UPDATED_MODEL = "BBBBBBBBBB";

    @Autowired
    private CardReaderRepository cardReaderRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCardReaderMockMvc;

    private CardReader cardReader;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CardReaderResource cardReaderResource = new CardReaderResource(cardReaderRepository);
        this.restCardReaderMockMvc = MockMvcBuilders.standaloneSetup(cardReaderResource)
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
    public static CardReader createEntity(EntityManager em) {
        CardReader cardReader = new CardReader()
            .model(DEFAULT_MODEL);
        return cardReader;
    }

    @Before
    public void initTest() {
        cardReader = createEntity(em);
    }

    @Test
    @Transactional
    public void createCardReader() throws Exception {
        int databaseSizeBeforeCreate = cardReaderRepository.findAll().size();

        // Create the CardReader
        restCardReaderMockMvc.perform(post("/api/card-readers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardReader)))
            .andExpect(status().isCreated());

        // Validate the CardReader in the database
        List<CardReader> cardReaderList = cardReaderRepository.findAll();
        assertThat(cardReaderList).hasSize(databaseSizeBeforeCreate + 1);
        CardReader testCardReader = cardReaderList.get(cardReaderList.size() - 1);
        assertThat(testCardReader.getModel()).isEqualTo(DEFAULT_MODEL);
    }

    @Test
    @Transactional
    public void createCardReaderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cardReaderRepository.findAll().size();

        // Create the CardReader with an existing ID
        cardReader.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCardReaderMockMvc.perform(post("/api/card-readers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardReader)))
            .andExpect(status().isBadRequest());

        // Validate the CardReader in the database
        List<CardReader> cardReaderList = cardReaderRepository.findAll();
        assertThat(cardReaderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkModelIsRequired() throws Exception {
        int databaseSizeBeforeTest = cardReaderRepository.findAll().size();
        // set the field null
        cardReader.setModel(null);

        // Create the CardReader, which fails.

        restCardReaderMockMvc.perform(post("/api/card-readers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardReader)))
            .andExpect(status().isBadRequest());

        List<CardReader> cardReaderList = cardReaderRepository.findAll();
        assertThat(cardReaderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCardReaders() throws Exception {
        // Initialize the database
        cardReaderRepository.saveAndFlush(cardReader);

        // Get all the cardReaderList
        restCardReaderMockMvc.perform(get("/api/card-readers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cardReader.getId().intValue())))
            .andExpect(jsonPath("$.[*].model").value(hasItem(DEFAULT_MODEL.toString())));
    }

    @Test
    @Transactional
    public void getCardReader() throws Exception {
        // Initialize the database
        cardReaderRepository.saveAndFlush(cardReader);

        // Get the cardReader
        restCardReaderMockMvc.perform(get("/api/card-readers/{id}", cardReader.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cardReader.getId().intValue()))
            .andExpect(jsonPath("$.model").value(DEFAULT_MODEL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCardReader() throws Exception {
        // Get the cardReader
        restCardReaderMockMvc.perform(get("/api/card-readers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCardReader() throws Exception {
        // Initialize the database
        cardReaderRepository.saveAndFlush(cardReader);
        int databaseSizeBeforeUpdate = cardReaderRepository.findAll().size();

        // Update the cardReader
        CardReader updatedCardReader = cardReaderRepository.findOne(cardReader.getId());
        // Disconnect from session so that the updates on updatedCardReader are not directly saved in db
        em.detach(updatedCardReader);
        updatedCardReader
            .model(UPDATED_MODEL);

        restCardReaderMockMvc.perform(put("/api/card-readers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCardReader)))
            .andExpect(status().isOk());

        // Validate the CardReader in the database
        List<CardReader> cardReaderList = cardReaderRepository.findAll();
        assertThat(cardReaderList).hasSize(databaseSizeBeforeUpdate);
        CardReader testCardReader = cardReaderList.get(cardReaderList.size() - 1);
        assertThat(testCardReader.getModel()).isEqualTo(UPDATED_MODEL);
    }

    @Test
    @Transactional
    public void updateNonExistingCardReader() throws Exception {
        int databaseSizeBeforeUpdate = cardReaderRepository.findAll().size();

        // Create the CardReader

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCardReaderMockMvc.perform(put("/api/card-readers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardReader)))
            .andExpect(status().isCreated());

        // Validate the CardReader in the database
        List<CardReader> cardReaderList = cardReaderRepository.findAll();
        assertThat(cardReaderList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCardReader() throws Exception {
        // Initialize the database
        cardReaderRepository.saveAndFlush(cardReader);
        int databaseSizeBeforeDelete = cardReaderRepository.findAll().size();

        // Get the cardReader
        restCardReaderMockMvc.perform(delete("/api/card-readers/{id}", cardReader.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CardReader> cardReaderList = cardReaderRepository.findAll();
        assertThat(cardReaderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CardReader.class);
        CardReader cardReader1 = new CardReader();
        cardReader1.setId(1L);
        CardReader cardReader2 = new CardReader();
        cardReader2.setId(cardReader1.getId());
        assertThat(cardReader1).isEqualTo(cardReader2);
        cardReader2.setId(2L);
        assertThat(cardReader1).isNotEqualTo(cardReader2);
        cardReader1.setId(null);
        assertThat(cardReader1).isNotEqualTo(cardReader2);
    }
}
