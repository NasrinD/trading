package org.jhipster.tradingsystem.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.tradingsystem.domain.BarCodeScanner;

import org.jhipster.tradingsystem.repository.BarCodeScannerRepository;
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
 * REST controller for managing BarCodeScanner.
 */
@RestController
@RequestMapping("/api")
public class BarCodeScannerResource {

    private final Logger log = LoggerFactory.getLogger(BarCodeScannerResource.class);

    private static final String ENTITY_NAME = "barCodeScanner";

    private final BarCodeScannerRepository barCodeScannerRepository;

    public BarCodeScannerResource(BarCodeScannerRepository barCodeScannerRepository) {
        this.barCodeScannerRepository = barCodeScannerRepository;
    }

    /**
     * POST  /bar-code-scanners : Create a new barCodeScanner.
     *
     * @param barCodeScanner the barCodeScanner to create
     * @return the ResponseEntity with status 201 (Created) and with body the new barCodeScanner, or with status 400 (Bad Request) if the barCodeScanner has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bar-code-scanners")
    @Timed
    public ResponseEntity<BarCodeScanner> createBarCodeScanner(@Valid @RequestBody BarCodeScanner barCodeScanner) throws URISyntaxException {
        log.debug("REST request to save BarCodeScanner : {}", barCodeScanner);
        if (barCodeScanner.getId() != null) {
            throw new BadRequestAlertException("A new barCodeScanner cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BarCodeScanner result = barCodeScannerRepository.save(barCodeScanner);
        return ResponseEntity.created(new URI("/api/bar-code-scanners/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bar-code-scanners : Updates an existing barCodeScanner.
     *
     * @param barCodeScanner the barCodeScanner to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated barCodeScanner,
     * or with status 400 (Bad Request) if the barCodeScanner is not valid,
     * or with status 500 (Internal Server Error) if the barCodeScanner couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bar-code-scanners")
    @Timed
    public ResponseEntity<BarCodeScanner> updateBarCodeScanner(@Valid @RequestBody BarCodeScanner barCodeScanner) throws URISyntaxException {
        log.debug("REST request to update BarCodeScanner : {}", barCodeScanner);
        if (barCodeScanner.getId() == null) {
            return createBarCodeScanner(barCodeScanner);
        }
        BarCodeScanner result = barCodeScannerRepository.save(barCodeScanner);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, barCodeScanner.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bar-code-scanners : get all the barCodeScanners.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of barCodeScanners in body
     */
    @GetMapping("/bar-code-scanners")
    @Timed
    public List<BarCodeScanner> getAllBarCodeScanners(@RequestParam(required = false) String filter) {
        if ("cashdesk-is-null".equals(filter)) {
            log.debug("REST request to get all BarCodeScanners where cashDesk is null");
            return StreamSupport
                .stream(barCodeScannerRepository.findAll().spliterator(), false)
                .filter(barCodeScanner -> barCodeScanner.getCashDesk() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all BarCodeScanners");
        return barCodeScannerRepository.findAll();
        }

    /**
     * GET  /bar-code-scanners/:id : get the "id" barCodeScanner.
     *
     * @param id the id of the barCodeScanner to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the barCodeScanner, or with status 404 (Not Found)
     */
    @GetMapping("/bar-code-scanners/{id}")
    @Timed
    public ResponseEntity<BarCodeScanner> getBarCodeScanner(@PathVariable Long id) {
        log.debug("REST request to get BarCodeScanner : {}", id);
        BarCodeScanner barCodeScanner = barCodeScannerRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(barCodeScanner));
    }

    /**
     * DELETE  /bar-code-scanners/:id : delete the "id" barCodeScanner.
     *
     * @param id the id of the barCodeScanner to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bar-code-scanners/{id}")
    @Timed
    public ResponseEntity<Void> deleteBarCodeScanner(@PathVariable Long id) {
        log.debug("REST request to delete BarCodeScanner : {}", id);
        barCodeScannerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
