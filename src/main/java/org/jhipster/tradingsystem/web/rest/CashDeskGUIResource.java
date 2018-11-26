package org.jhipster.tradingsystem.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.tradingsystem.domain.CashDeskGUI;

import org.jhipster.tradingsystem.repository.CashDeskGUIRepository;
import org.jhipster.tradingsystem.web.rest.errors.BadRequestAlertException;
import org.jhipster.tradingsystem.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing CashDeskGUI.
 */
@RestController
@RequestMapping("/api")
public class CashDeskGUIResource {

    private final Logger log = LoggerFactory.getLogger(CashDeskGUIResource.class);

    private static final String ENTITY_NAME = "cashDeskGUI";

    private final CashDeskGUIRepository cashDeskGUIRepository;

    public CashDeskGUIResource(CashDeskGUIRepository cashDeskGUIRepository) {
        this.cashDeskGUIRepository = cashDeskGUIRepository;
    }

    /**
     * POST  /cash-desk-guis : Create a new cashDeskGUI.
     *
     * @param cashDeskGUI the cashDeskGUI to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cashDeskGUI, or with status 400 (Bad Request) if the cashDeskGUI has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cash-desk-guis")
    @Timed
    public ResponseEntity<CashDeskGUI> createCashDeskGUI(@RequestBody CashDeskGUI cashDeskGUI) throws URISyntaxException {
        log.debug("REST request to save CashDeskGUI : {}", cashDeskGUI);
        if (cashDeskGUI.getId() != null) {
            throw new BadRequestAlertException("A new cashDeskGUI cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CashDeskGUI result = cashDeskGUIRepository.save(cashDeskGUI);
        return ResponseEntity.created(new URI("/api/cash-desk-guis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cash-desk-guis : Updates an existing cashDeskGUI.
     *
     * @param cashDeskGUI the cashDeskGUI to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cashDeskGUI,
     * or with status 400 (Bad Request) if the cashDeskGUI is not valid,
     * or with status 500 (Internal Server Error) if the cashDeskGUI couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cash-desk-guis")
    @Timed
    public ResponseEntity<CashDeskGUI> updateCashDeskGUI(@RequestBody CashDeskGUI cashDeskGUI) throws URISyntaxException {
        log.debug("REST request to update CashDeskGUI : {}", cashDeskGUI);
        if (cashDeskGUI.getId() == null) {
            return createCashDeskGUI(cashDeskGUI);
        }
        CashDeskGUI result = cashDeskGUIRepository.save(cashDeskGUI);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cashDeskGUI.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cash-desk-guis : get all the cashDeskGUIS.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of cashDeskGUIS in body
     */
    @GetMapping("/cash-desk-guis")
    @Timed
    public List<CashDeskGUI> getAllCashDeskGUIS(@RequestParam(required = false) String filter) {
        if ("cashdesk-is-null".equals(filter)) {
            log.debug("REST request to get all CashDeskGUIs where cashDesk is null");
            return StreamSupport
                .stream(cashDeskGUIRepository.findAll().spliterator(), false)
                .filter(cashDeskGUI -> cashDeskGUI.getCashDesk() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all CashDeskGUIS");
        return cashDeskGUIRepository.findAll();
        }

    /**
     * GET  /cash-desk-guis/:id : get the "id" cashDeskGUI.
     *
     * @param id the id of the cashDeskGUI to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cashDeskGUI, or with status 404 (Not Found)
     */
    @GetMapping("/cash-desk-guis/{id}")
    @Timed
    public ResponseEntity<CashDeskGUI> getCashDeskGUI(@PathVariable Long id) {
        log.debug("REST request to get CashDeskGUI : {}", id);
        CashDeskGUI cashDeskGUI = cashDeskGUIRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cashDeskGUI));
    }

    /**
     * DELETE  /cash-desk-guis/:id : delete the "id" cashDeskGUI.
     *
     * @param id the id of the cashDeskGUI to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cash-desk-guis/{id}")
    @Timed
    public ResponseEntity<Void> deleteCashDeskGUI(@PathVariable Long id) {
        log.debug("REST request to delete CashDeskGUI : {}", id);
        cashDeskGUIRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
