package org.jhipster.tradingsystem.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.tradingsystem.domain.ReceiptItem;

import org.jhipster.tradingsystem.repository.ReceiptItemRepository;
import org.jhipster.tradingsystem.web.rest.errors.BadRequestAlertException;
import org.jhipster.tradingsystem.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ReceiptItem.
 */
@RestController
@RequestMapping("/api")
public class ReceiptItemResource {

    private final Logger log = LoggerFactory.getLogger(ReceiptItemResource.class);

    private static final String ENTITY_NAME = "receiptItem";

    private final ReceiptItemRepository receiptItemRepository;

    public ReceiptItemResource(ReceiptItemRepository receiptItemRepository) {
        this.receiptItemRepository = receiptItemRepository;
    }

    /**
     * POST  /receipt-items : Create a new receiptItem.
     *
     * @param receiptItem the receiptItem to create
     * @return the ResponseEntity with status 201 (Created) and with body the new receiptItem, or with status 400 (Bad Request) if the receiptItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/receipt-items")
    @Timed
    public ResponseEntity<ReceiptItem> createReceiptItem(@Valid @RequestBody ReceiptItem receiptItem) throws URISyntaxException {
        log.debug("REST request to save ReceiptItem : {}", receiptItem);
        if (receiptItem.getId() != null) {
            throw new BadRequestAlertException("A new receiptItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReceiptItem result = receiptItemRepository.save(receiptItem);
        return ResponseEntity.created(new URI("/api/receipt-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /receipt-items : Updates an existing receiptItem.
     *
     * @param receiptItem the receiptItem to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated receiptItem,
     * or with status 400 (Bad Request) if the receiptItem is not valid,
     * or with status 500 (Internal Server Error) if the receiptItem couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/receipt-items")
    @Timed
    public ResponseEntity<ReceiptItem> updateReceiptItem(@Valid @RequestBody ReceiptItem receiptItem) throws URISyntaxException {
        log.debug("REST request to update ReceiptItem : {}", receiptItem);
        if (receiptItem.getId() == null) {
            return createReceiptItem(receiptItem);
        }
        ReceiptItem result = receiptItemRepository.save(receiptItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, receiptItem.getId().toString()))
            .body(result);
    }

    /**
     * GET  /receipt-items : get all the receiptItems.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of receiptItems in body
     */
    @GetMapping("/receipt-items")
    @Timed
    public List<ReceiptItem> getAllReceiptItems() {
        log.debug("REST request to get all ReceiptItems");
        return receiptItemRepository.findAll();
        }

    /**
     * GET  /receipt-items/:id : get the "id" receiptItem.
     *
     * @param id the id of the receiptItem to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the receiptItem, or with status 404 (Not Found)
     */
    @GetMapping("/receipt-items/{id}")
    @Timed
    public ResponseEntity<ReceiptItem> getReceiptItem(@PathVariable Long id) {
        log.debug("REST request to get ReceiptItem : {}", id);
        ReceiptItem receiptItem = receiptItemRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(receiptItem));
    }

    /**
     * DELETE  /receipt-items/:id : delete the "id" receiptItem.
     *
     * @param id the id of the receiptItem to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/receipt-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteReceiptItem(@PathVariable Long id) {
        log.debug("REST request to delete ReceiptItem : {}", id);
        receiptItemRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
