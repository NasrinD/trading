package org.jhipster.tradingsystem.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.tradingsystem.domain.CashBox;

import org.jhipster.tradingsystem.repository.CashBoxRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing CashBox.
 */
@RestController
@RequestMapping("/api")
public class CashBoxResource {

    private final Logger log = LoggerFactory.getLogger(CashBoxResource.class);

    private static final String ENTITY_NAME = "cashBox";

    private final CashBoxRepository cashBoxRepository;

    public CashBoxResource(CashBoxRepository cashBoxRepository) {
        this.cashBoxRepository = cashBoxRepository;
    }

    /**
     * POST  /cash-boxes : Create a new cashBox.
     *
     * @param cashBox the cashBox to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cashBox, or with status 400 (Bad Request) if the cashBox has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cash-boxes")
    @Timed
    public ResponseEntity<CashBox> createCashBox(@Valid @RequestBody CashBox cashBox) throws URISyntaxException {
        log.debug("REST request to save CashBox : {}", cashBox);
        if (cashBox.getId() != null) {
            throw new BadRequestAlertException("A new cashBox cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CashBox result = cashBoxRepository.save(cashBox);
        return ResponseEntity.created(new URI("/api/cash-boxes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cash-boxes : Updates an existing cashBox.
     *
     * @param cashBox the cashBox to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cashBox,
     * or with status 400 (Bad Request) if the cashBox is not valid,
     * or with status 500 (Internal Server Error) if the cashBox couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cash-boxes")
    @Timed
    public ResponseEntity<CashBox> updateCashBox(@Valid @RequestBody CashBox cashBox) throws URISyntaxException {
        log.debug("REST request to update CashBox : {}", cashBox);
        if (cashBox.getId() == null) {
            return createCashBox(cashBox);
        }
        CashBox result = cashBoxRepository.save(cashBox);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cashBox.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cash-boxes : get all the cashBoxes.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of cashBoxes in body
     */
    @GetMapping("/cash-boxes")
    @Timed
    public List<CashBox> getAllCashBoxes(@RequestParam(required = false) String filter) {
        if ("cashdesk-is-null".equals(filter)) {
            log.debug("REST request to get all CashBoxs where cashDesk is null");
            return StreamSupport
                .stream(cashBoxRepository.findAll().spliterator(), false)
                .filter(cashBox -> cashBox.getCashDesk() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all CashBoxes");
        return cashBoxRepository.findAll();
        }

    /**
     * GET  /cash-boxes/:id : get the "id" cashBox.
     *
     * @param id the id of the cashBox to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cashBox, or with status 404 (Not Found)
     */
    @GetMapping("/cash-boxes/{id}")
    @Timed
    public ResponseEntity<CashBox> getCashBox(@PathVariable Long id) {
        log.debug("REST request to get CashBox : {}", id);
        CashBox cashBox = cashBoxRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cashBox));
    }

    /**
     * DELETE  /cash-boxes/:id : delete the "id" cashBox.
     *
     * @param id the id of the cashBox to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cash-boxes/{id}")
    @Timed
    public ResponseEntity<Void> deleteCashBox(@PathVariable Long id) {
        log.debug("REST request to delete CashBox : {}", id);
        cashBoxRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
