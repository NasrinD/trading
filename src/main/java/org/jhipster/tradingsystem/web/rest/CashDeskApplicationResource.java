package org.jhipster.tradingsystem.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.tradingsystem.domain.CashDeskApplication;

import org.jhipster.tradingsystem.repository.CashDeskApplicationRepository;
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

/**
 * REST controller for managing CashDeskApplication.
 */
@RestController
@RequestMapping("/api")
public class CashDeskApplicationResource {

    private final Logger log = LoggerFactory.getLogger(CashDeskApplicationResource.class);

    private static final String ENTITY_NAME = "cashDeskApplication";

    private final CashDeskApplicationRepository cashDeskApplicationRepository;

    public CashDeskApplicationResource(CashDeskApplicationRepository cashDeskApplicationRepository) {
        this.cashDeskApplicationRepository = cashDeskApplicationRepository;
    }

    /**
     * POST  /cash-desk-applications : Create a new cashDeskApplication.
     *
     * @param cashDeskApplication the cashDeskApplication to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cashDeskApplication, or with status 400 (Bad Request) if the cashDeskApplication has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cash-desk-applications")
    @Timed
    public ResponseEntity<CashDeskApplication> createCashDeskApplication(@RequestBody CashDeskApplication cashDeskApplication) throws URISyntaxException {
        log.debug("REST request to save CashDeskApplication : {}", cashDeskApplication);
        if (cashDeskApplication.getId() != null) {
            throw new BadRequestAlertException("A new cashDeskApplication cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CashDeskApplication result = cashDeskApplicationRepository.save(cashDeskApplication);
        return ResponseEntity.created(new URI("/api/cash-desk-applications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cash-desk-applications : Updates an existing cashDeskApplication.
     *
     * @param cashDeskApplication the cashDeskApplication to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cashDeskApplication,
     * or with status 400 (Bad Request) if the cashDeskApplication is not valid,
     * or with status 500 (Internal Server Error) if the cashDeskApplication couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cash-desk-applications")
    @Timed
    public ResponseEntity<CashDeskApplication> updateCashDeskApplication(@RequestBody CashDeskApplication cashDeskApplication) throws URISyntaxException {
        log.debug("REST request to update CashDeskApplication : {}", cashDeskApplication);
        if (cashDeskApplication.getId() == null) {
            return createCashDeskApplication(cashDeskApplication);
        }
        CashDeskApplication result = cashDeskApplicationRepository.save(cashDeskApplication);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cashDeskApplication.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cash-desk-applications : get all the cashDeskApplications.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cashDeskApplications in body
     */
    @GetMapping("/cash-desk-applications")
    @Timed
    public List<CashDeskApplication> getAllCashDeskApplications() {
        log.debug("REST request to get all CashDeskApplications");
        return cashDeskApplicationRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /cash-desk-applications/:id : get the "id" cashDeskApplication.
     *
     * @param id the id of the cashDeskApplication to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cashDeskApplication, or with status 404 (Not Found)
     */
    @GetMapping("/cash-desk-applications/{id}")
    @Timed
    public ResponseEntity<CashDeskApplication> getCashDeskApplication(@PathVariable Long id) {
        log.debug("REST request to get CashDeskApplication : {}", id);
        CashDeskApplication cashDeskApplication = cashDeskApplicationRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cashDeskApplication));
    }

    /**
     * DELETE  /cash-desk-applications/:id : delete the "id" cashDeskApplication.
     *
     * @param id the id of the cashDeskApplication to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cash-desk-applications/{id}")
    @Timed
    public ResponseEntity<Void> deleteCashDeskApplication(@PathVariable Long id) {
        log.debug("REST request to delete CashDeskApplication : {}", id);
        cashDeskApplicationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
