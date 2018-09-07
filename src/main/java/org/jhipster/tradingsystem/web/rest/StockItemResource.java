package org.jhipster.tradingsystem.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.jhipster.tradingsystem.domain.StockItem;
import org.jhipster.tradingsystem.repository.StockItemRepository;
import org.jhipster.tradingsystem.web.rest.errors.BadRequestAlertException;
import org.jhipster.tradingsystem.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing StockItem.
 */
@RestController
@RequestMapping("/api")
public class StockItemResource {

    private final Logger log = LoggerFactory.getLogger(StockItemResource.class);

    private static final String ENTITY_NAME = "stockItem";

    private final StockItemRepository stockItemRepository;

    public StockItemResource(StockItemRepository stockItemRepository) {
        this.stockItemRepository = stockItemRepository;
    }

    /**
     * POST  /stock-items : Create a new stockItem.
     *
     * @param stockItem the stockItem to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stockItem, or with status 400 (Bad Request) if the stockItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stock-items")
    @Timed
    public ResponseEntity<StockItem> createStockItem(@Valid @RequestBody StockItem stockItem) throws URISyntaxException {
        log.debug("REST request to save StockItem : {}", stockItem);
        if (stockItem.getId() != null) {
            throw new BadRequestAlertException("A new stockItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StockItem result = stockItemRepository.save(stockItem);
        return ResponseEntity.created(new URI("/api/stock-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stock-items : Updates an existing stockItem.
     *
     * @param stockItem the stockItem to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stockItem,
     * or with status 400 (Bad Request) if the stockItem is not valid,
     * or with status 500 (Internal Server Error) if the stockItem couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stock-items")
    @Timed
    public ResponseEntity<StockItem> updateStockItem(@Valid @RequestBody StockItem stockItem) throws URISyntaxException {
        log.debug("REST request to update StockItem : {}", stockItem);
        if (stockItem.getId() == null) {
            return createStockItem(stockItem);
        }
        StockItem result = stockItemRepository.save(stockItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stockItem.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stock-items : get all the stockItems.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of stockItems in body
     */
    @GetMapping("/stock-items")
    @Timed
    public List<StockItem> getAllStockItems() {
        log.debug("REST request to get all StockItems");
        return stockItemRepository.findAll();
        }

    /**
     * GET  /stock-items/:id : get the "id" stockItem.
     *
     * @param id the id of the stockItem to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stockItem, or with status 404 (Not Found)
     */
    @GetMapping("/stock-items/{id}")
    @Timed
    public ResponseEntity<StockItem> getStockItem(@PathVariable Long id) {
        log.debug("REST request to get StockItem : {}", id);
        StockItem stockItem = stockItemRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(stockItem));
    }
    
    /**
     * DELETE  /stock-items/:id : delete the "id" stockItem.
     *
     * @param id the id of the stockItem to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stock-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteStockItem(@PathVariable Long id) {
        log.debug("REST request to delete StockItem : {}", id);
        stockItemRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
