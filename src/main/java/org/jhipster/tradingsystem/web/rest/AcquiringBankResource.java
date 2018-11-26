package org.jhipster.tradingsystem.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.tradingsystem.domain.AcquiringBank;

import org.jhipster.tradingsystem.repository.AcquiringBankRepository;
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
 * REST controller for managing AcquiringBank.
 */
@RestController
@RequestMapping("/api")
public class AcquiringBankResource {

    private final Logger log = LoggerFactory.getLogger(AcquiringBankResource.class);

    private static final String ENTITY_NAME = "acquiringBank";

    private final AcquiringBankRepository acquiringBankRepository;

    public AcquiringBankResource(AcquiringBankRepository acquiringBankRepository) {
        this.acquiringBankRepository = acquiringBankRepository;
    }

    /**
     * POST  /acquiring-banks : Create a new acquiringBank.
     *
     * @param acquiringBank the acquiringBank to create
     * @return the ResponseEntity with status 201 (Created) and with body the new acquiringBank, or with status 400 (Bad Request) if the acquiringBank has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/acquiring-banks")
    @Timed
    public ResponseEntity<AcquiringBank> createAcquiringBank(@Valid @RequestBody AcquiringBank acquiringBank) throws URISyntaxException {
        log.debug("REST request to save AcquiringBank : {}", acquiringBank);
        if (acquiringBank.getId() != null) {
            throw new BadRequestAlertException("A new acquiringBank cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AcquiringBank result = acquiringBankRepository.save(acquiringBank);
        return ResponseEntity.created(new URI("/api/acquiring-banks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /acquiring-banks : Updates an existing acquiringBank.
     *
     * @param acquiringBank the acquiringBank to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated acquiringBank,
     * or with status 400 (Bad Request) if the acquiringBank is not valid,
     * or with status 500 (Internal Server Error) if the acquiringBank couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/acquiring-banks")
    @Timed
    public ResponseEntity<AcquiringBank> updateAcquiringBank(@Valid @RequestBody AcquiringBank acquiringBank) throws URISyntaxException {
        log.debug("REST request to update AcquiringBank : {}", acquiringBank);
        if (acquiringBank.getId() == null) {
            return createAcquiringBank(acquiringBank);
        }
        AcquiringBank result = acquiringBankRepository.save(acquiringBank);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, acquiringBank.getId().toString()))
            .body(result);
    }

    /**
     * GET  /acquiring-banks : get all the acquiringBanks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of acquiringBanks in body
     */
    @GetMapping("/acquiring-banks")
    @Timed
    public List<AcquiringBank> getAllAcquiringBanks() {
        log.debug("REST request to get all AcquiringBanks");
        return acquiringBankRepository.findAll();
        }

    /**
     * GET  /acquiring-banks/:id : get the "id" acquiringBank.
     *
     * @param id the id of the acquiringBank to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the acquiringBank, or with status 404 (Not Found)
     */
    @GetMapping("/acquiring-banks/{id}")
    @Timed
    public ResponseEntity<AcquiringBank> getAcquiringBank(@PathVariable Long id) {
        log.debug("REST request to get AcquiringBank : {}", id);
        AcquiringBank acquiringBank = acquiringBankRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(acquiringBank));
    }

    /**
     * DELETE  /acquiring-banks/:id : delete the "id" acquiringBank.
     *
     * @param id the id of the acquiringBank to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/acquiring-banks/{id}")
    @Timed
    public ResponseEntity<Void> deleteAcquiringBank(@PathVariable Long id) {
        log.debug("REST request to delete AcquiringBank : {}", id);
        acquiringBankRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
