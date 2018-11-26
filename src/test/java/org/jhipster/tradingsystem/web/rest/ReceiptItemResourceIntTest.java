package org.jhipster.tradingsystem.web.rest;

import org.jhipster.tradingsystem.TradingsystemMoApp;

import org.jhipster.tradingsystem.domain.ReceiptItem;
import org.jhipster.tradingsystem.repository.ReceiptItemRepository;
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
import java.math.BigDecimal;
import java.util.List;

import static org.jhipster.tradingsystem.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ReceiptItemResource REST controller.
 *
 * @see ReceiptItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TradingsystemMoApp.class)
public class ReceiptItemResourceIntTest {

    private static final Long DEFAULT_PRODUCT_BAR_CODE = 1L;
    private static final Long UPDATED_PRODUCT_BAR_CODE = 2L;

    private static final BigDecimal DEFAULT_PRODUCT_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRODUCT_PRICE = new BigDecimal(2);

    private static final String DEFAULT_PRODUCT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCT_NAME = "BBBBBBBBBB";

    @Autowired
    private ReceiptItemRepository receiptItemRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReceiptItemMockMvc;

    private ReceiptItem receiptItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReceiptItemResource receiptItemResource = new ReceiptItemResource(receiptItemRepository);
        this.restReceiptItemMockMvc = MockMvcBuilders.standaloneSetup(receiptItemResource)
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
    public static ReceiptItem createEntity(EntityManager em) {
        ReceiptItem receiptItem = new ReceiptItem()
            .productBarCode(DEFAULT_PRODUCT_BAR_CODE)
            .productPrice(DEFAULT_PRODUCT_PRICE)
            .productName(DEFAULT_PRODUCT_NAME);
        return receiptItem;
    }

    @Before
    public void initTest() {
        receiptItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createReceiptItem() throws Exception {
        int databaseSizeBeforeCreate = receiptItemRepository.findAll().size();

        // Create the ReceiptItem
        restReceiptItemMockMvc.perform(post("/api/receipt-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receiptItem)))
            .andExpect(status().isCreated());

        // Validate the ReceiptItem in the database
        List<ReceiptItem> receiptItemList = receiptItemRepository.findAll();
        assertThat(receiptItemList).hasSize(databaseSizeBeforeCreate + 1);
        ReceiptItem testReceiptItem = receiptItemList.get(receiptItemList.size() - 1);
        assertThat(testReceiptItem.getProductBarCode()).isEqualTo(DEFAULT_PRODUCT_BAR_CODE);
        assertThat(testReceiptItem.getProductPrice()).isEqualTo(DEFAULT_PRODUCT_PRICE);
        assertThat(testReceiptItem.getProductName()).isEqualTo(DEFAULT_PRODUCT_NAME);
    }

    @Test
    @Transactional
    public void createReceiptItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = receiptItemRepository.findAll().size();

        // Create the ReceiptItem with an existing ID
        receiptItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReceiptItemMockMvc.perform(post("/api/receipt-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receiptItem)))
            .andExpect(status().isBadRequest());

        // Validate the ReceiptItem in the database
        List<ReceiptItem> receiptItemList = receiptItemRepository.findAll();
        assertThat(receiptItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkProductBarCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = receiptItemRepository.findAll().size();
        // set the field null
        receiptItem.setProductBarCode(null);

        // Create the ReceiptItem, which fails.

        restReceiptItemMockMvc.perform(post("/api/receipt-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receiptItem)))
            .andExpect(status().isBadRequest());

        List<ReceiptItem> receiptItemList = receiptItemRepository.findAll();
        assertThat(receiptItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkProductPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = receiptItemRepository.findAll().size();
        // set the field null
        receiptItem.setProductPrice(null);

        // Create the ReceiptItem, which fails.

        restReceiptItemMockMvc.perform(post("/api/receipt-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receiptItem)))
            .andExpect(status().isBadRequest());

        List<ReceiptItem> receiptItemList = receiptItemRepository.findAll();
        assertThat(receiptItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkProductNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = receiptItemRepository.findAll().size();
        // set the field null
        receiptItem.setProductName(null);

        // Create the ReceiptItem, which fails.

        restReceiptItemMockMvc.perform(post("/api/receipt-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receiptItem)))
            .andExpect(status().isBadRequest());

        List<ReceiptItem> receiptItemList = receiptItemRepository.findAll();
        assertThat(receiptItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReceiptItems() throws Exception {
        // Initialize the database
        receiptItemRepository.saveAndFlush(receiptItem);

        // Get all the receiptItemList
        restReceiptItemMockMvc.perform(get("/api/receipt-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(receiptItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].productBarCode").value(hasItem(DEFAULT_PRODUCT_BAR_CODE.intValue())))
            .andExpect(jsonPath("$.[*].productPrice").value(hasItem(DEFAULT_PRODUCT_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].productName").value(hasItem(DEFAULT_PRODUCT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getReceiptItem() throws Exception {
        // Initialize the database
        receiptItemRepository.saveAndFlush(receiptItem);

        // Get the receiptItem
        restReceiptItemMockMvc.perform(get("/api/receipt-items/{id}", receiptItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(receiptItem.getId().intValue()))
            .andExpect(jsonPath("$.productBarCode").value(DEFAULT_PRODUCT_BAR_CODE.intValue()))
            .andExpect(jsonPath("$.productPrice").value(DEFAULT_PRODUCT_PRICE.intValue()))
            .andExpect(jsonPath("$.productName").value(DEFAULT_PRODUCT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReceiptItem() throws Exception {
        // Get the receiptItem
        restReceiptItemMockMvc.perform(get("/api/receipt-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReceiptItem() throws Exception {
        // Initialize the database
        receiptItemRepository.saveAndFlush(receiptItem);
        int databaseSizeBeforeUpdate = receiptItemRepository.findAll().size();

        // Update the receiptItem
        ReceiptItem updatedReceiptItem = receiptItemRepository.findOne(receiptItem.getId());
        // Disconnect from session so that the updates on updatedReceiptItem are not directly saved in db
        em.detach(updatedReceiptItem);
        updatedReceiptItem
            .productBarCode(UPDATED_PRODUCT_BAR_CODE)
            .productPrice(UPDATED_PRODUCT_PRICE)
            .productName(UPDATED_PRODUCT_NAME);

        restReceiptItemMockMvc.perform(put("/api/receipt-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReceiptItem)))
            .andExpect(status().isOk());

        // Validate the ReceiptItem in the database
        List<ReceiptItem> receiptItemList = receiptItemRepository.findAll();
        assertThat(receiptItemList).hasSize(databaseSizeBeforeUpdate);
        ReceiptItem testReceiptItem = receiptItemList.get(receiptItemList.size() - 1);
        assertThat(testReceiptItem.getProductBarCode()).isEqualTo(UPDATED_PRODUCT_BAR_CODE);
        assertThat(testReceiptItem.getProductPrice()).isEqualTo(UPDATED_PRODUCT_PRICE);
        assertThat(testReceiptItem.getProductName()).isEqualTo(UPDATED_PRODUCT_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingReceiptItem() throws Exception {
        int databaseSizeBeforeUpdate = receiptItemRepository.findAll().size();

        // Create the ReceiptItem

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restReceiptItemMockMvc.perform(put("/api/receipt-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receiptItem)))
            .andExpect(status().isCreated());

        // Validate the ReceiptItem in the database
        List<ReceiptItem> receiptItemList = receiptItemRepository.findAll();
        assertThat(receiptItemList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteReceiptItem() throws Exception {
        // Initialize the database
        receiptItemRepository.saveAndFlush(receiptItem);
        int databaseSizeBeforeDelete = receiptItemRepository.findAll().size();

        // Get the receiptItem
        restReceiptItemMockMvc.perform(delete("/api/receipt-items/{id}", receiptItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ReceiptItem> receiptItemList = receiptItemRepository.findAll();
        assertThat(receiptItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReceiptItem.class);
        ReceiptItem receiptItem1 = new ReceiptItem();
        receiptItem1.setId(1L);
        ReceiptItem receiptItem2 = new ReceiptItem();
        receiptItem2.setId(receiptItem1.getId());
        assertThat(receiptItem1).isEqualTo(receiptItem2);
        receiptItem2.setId(2L);
        assertThat(receiptItem1).isNotEqualTo(receiptItem2);
        receiptItem1.setId(null);
        assertThat(receiptItem1).isNotEqualTo(receiptItem2);
    }
}
