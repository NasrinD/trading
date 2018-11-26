package org.jhipster.tradingsystem.web.rest;

import org.jhipster.tradingsystem.TradingsystemMoApp;

import org.jhipster.tradingsystem.domain.CardReaderController;
import org.jhipster.tradingsystem.repository.CardReaderControllerRepository;
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
 * Test class for the CardReaderControllerResource REST controller.
 *
 * @see CardReaderControllerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TradingsystemMoApp.class)
public class CardReaderControllerResourceIntTest {

    @Autowired
    private CardReaderControllerRepository cardReaderControllerRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCardReaderControllerMockMvc;

    private CardReaderController cardReaderController;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CardReaderControllerResource cardReaderControllerResource = new CardReaderControllerResource(cardReaderControllerRepository);
        this.restCardReaderControllerMockMvc = MockMvcBuilders.standaloneSetup(cardReaderControllerResource)
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
    public static CardReaderController createEntity(EntityManager em) {
        CardReaderController cardReaderController = new CardReaderController();
        return cardReaderController;
    }

    @Before
    public void initTest() {
        cardReaderController = createEntity(em);
    }

    @Test
    @Transactional
    public void createCardReaderController() throws Exception {
        int databaseSizeBeforeCreate = cardReaderControllerRepository.findAll().size();

        // Create the CardReaderController
        restCardReaderControllerMockMvc.perform(post("/api/card-reader-controllers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardReaderController)))
            .andExpect(status().isCreated());

        // Validate the CardReaderController in the database
        List<CardReaderController> cardReaderControllerList = cardReaderControllerRepository.findAll();
        assertThat(cardReaderControllerList).hasSize(databaseSizeBeforeCreate + 1);
        CardReaderController testCardReaderController = cardReaderControllerList.get(cardReaderControllerList.size() - 1);
    }

    @Test
    @Transactional
    public void createCardReaderControllerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cardReaderControllerRepository.findAll().size();

        // Create the CardReaderController with an existing ID
        cardReaderController.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCardReaderControllerMockMvc.perform(post("/api/card-reader-controllers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardReaderController)))
            .andExpect(status().isBadRequest());

        // Validate the CardReaderController in the database
        List<CardReaderController> cardReaderControllerList = cardReaderControllerRepository.findAll();
        assertThat(cardReaderControllerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCardReaderControllers() throws Exception {
        // Initialize the database
        cardReaderControllerRepository.saveAndFlush(cardReaderController);

        // Get all the cardReaderControllerList
        restCardReaderControllerMockMvc.perform(get("/api/card-reader-controllers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cardReaderController.getId().intValue())));
    }

    @Test
    @Transactional
    public void getCardReaderController() throws Exception {
        // Initialize the database
        cardReaderControllerRepository.saveAndFlush(cardReaderController);

        // Get the cardReaderController
        restCardReaderControllerMockMvc.perform(get("/api/card-reader-controllers/{id}", cardReaderController.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cardReaderController.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCardReaderController() throws Exception {
        // Get the cardReaderController
        restCardReaderControllerMockMvc.perform(get("/api/card-reader-controllers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCardReaderController() throws Exception {
        // Initialize the database
        cardReaderControllerRepository.saveAndFlush(cardReaderController);
        int databaseSizeBeforeUpdate = cardReaderControllerRepository.findAll().size();

        // Update the cardReaderController
        CardReaderController updatedCardReaderController = cardReaderControllerRepository.findOne(cardReaderController.getId());
        // Disconnect from session so that the updates on updatedCardReaderController are not directly saved in db
        em.detach(updatedCardReaderController);

        restCardReaderControllerMockMvc.perform(put("/api/card-reader-controllers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCardReaderController)))
            .andExpect(status().isOk());

        // Validate the CardReaderController in the database
        List<CardReaderController> cardReaderControllerList = cardReaderControllerRepository.findAll();
        assertThat(cardReaderControllerList).hasSize(databaseSizeBeforeUpdate);
        CardReaderController testCardReaderController = cardReaderControllerList.get(cardReaderControllerList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingCardReaderController() throws Exception {
        int databaseSizeBeforeUpdate = cardReaderControllerRepository.findAll().size();

        // Create the CardReaderController

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCardReaderControllerMockMvc.perform(put("/api/card-reader-controllers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardReaderController)))
            .andExpect(status().isCreated());

        // Validate the CardReaderController in the database
        List<CardReaderController> cardReaderControllerList = cardReaderControllerRepository.findAll();
        assertThat(cardReaderControllerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCardReaderController() throws Exception {
        // Initialize the database
        cardReaderControllerRepository.saveAndFlush(cardReaderController);
        int databaseSizeBeforeDelete = cardReaderControllerRepository.findAll().size();

        // Get the cardReaderController
        restCardReaderControllerMockMvc.perform(delete("/api/card-reader-controllers/{id}", cardReaderController.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CardReaderController> cardReaderControllerList = cardReaderControllerRepository.findAll();
        assertThat(cardReaderControllerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CardReaderController.class);
        CardReaderController cardReaderController1 = new CardReaderController();
        cardReaderController1.setId(1L);
        CardReaderController cardReaderController2 = new CardReaderController();
        cardReaderController2.setId(cardReaderController1.getId());
        assertThat(cardReaderController1).isEqualTo(cardReaderController2);
        cardReaderController2.setId(2L);
        assertThat(cardReaderController1).isNotEqualTo(cardReaderController2);
        cardReaderController1.setId(null);
        assertThat(cardReaderController1).isNotEqualTo(cardReaderController2);
    }
}
