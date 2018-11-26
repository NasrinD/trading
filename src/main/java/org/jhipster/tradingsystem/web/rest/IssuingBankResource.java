package org.jhipster.tradingsystem.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.tradingsystem.domain.IssuingBank;

import org.jhipster.tradingsystem.repository.IssuingBankRepository;
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
 * REST controller for managing IssuingBank.
 */
@RestController
@RequestMapping("/api")
public class IssuingBankResource {

    private final Logger log = LoggerFactory.getLogger(IssuingBankResource.class);

    private static final String ENTITY_NAME = "issuingBank";

    private final IssuingBankRepository issuingBankRepository;

    public IssuingBankResource(IssuingBankRepository issuingBankRepository) {
        this.issuingBankRepository = issuingBankRepository;
    }

    /**
     * POST  /issuing-banks : Create a new issuingBank.
     *
     * @param issuingBank the issuingBank to create
     * @return the ResponseEntity with status 201 (Created) and with body the new issuingBank, or with status 400 (Bad Request) if the issuingBank has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/issuing-banks")
    @Timed
    public ResponseEntity<IssuingBank> createIssuingBank(@Valid @RequestBody IssuingBank issuingBank) throws URISyntaxException {
        log.debug("REST request to save IssuingBank : {}", issuingBank);
        if (issuingBank.getId() != null) {
            throw new BadRequestAlertException("A new issuingBank cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IssuingBank result = issuingBankRepository.save(issuingBank);
        return ResponseEntity.created(new URI("/api/issuing-banks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /issuing-banks : Updates an existing issuingBank.
     *
     * @param issuingBank the issuingBank to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated issuingBank,
     * or with status 400 (Bad Request) if the issuingBank is not valid,
     * or with status 500 (Internal Server Error) if the issuingBank couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/issuing-banks")
    @Timed
    public ResponseEntity<IssuingBank> updateIssuingBank(@Valid @RequestBody IssuingBank issuingBank) throws URISyntaxException {
        log.debug("REST request to update IssuingBank : {}", issuingBank);
        if (issuingBank.getId() == null) {
            return createIssuingBank(issuingBank);
        }
        IssuingBank result = issuingBankRepository.save(issuingBank);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, issuingBank.getId().toString()))
            .body(result);
    }

    /**
     * GET  /issuing-banks : get all the issuingBanks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of issuingBanks in body
     */
    @GetMapping("/issuing-banks")
    @Timed
    public List<IssuingBank> getAllIssuingBanks() {
        log.debug("REST request to get all IssuingBanks");
        return issuingBankRepository.findAll();
        }

    /**
     * GET  /issuing-banks/:id : get the "id" issuingBank.
     *
     * @param id the id of the issuingBank to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the issuingBank, or with status 404 (Not Found)
     */
    @GetMapping("/issuing-banks/{id}")
    @Timed
    public ResponseEntity<IssuingBank> getIssuingBank(@PathVariable Long id) {
        log.debug("REST request to get IssuingBank : {}", id);
        IssuingBank issuingBank = issuingBankRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(issuingBank));
    }

    /**
     * DELETE  /issuing-banks/:id : delete the "id" issuingBank.
     *
     * @param id the id of the issuingBank to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/issuing-banks/{id}")
    @Timed
    public ResponseEntity<Void> deleteIssuingBank(@PathVariable Long id) {
        log.debug("REST request to delete IssuingBank : {}", id);
        issuingBankRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
