package org.jhipster.tradingsystem.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.tradingsystem.domain.BarCodeScannerController;

import org.jhipster.tradingsystem.repository.BarCodeScannerControllerRepository;
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
 * REST controller for managing BarCodeScannerController.
 */
@RestController
@RequestMapping("/api")
public class BarCodeScannerControllerResource {

    private final Logger log = LoggerFactory.getLogger(BarCodeScannerControllerResource.class);

    private static final String ENTITY_NAME = "barCodeScannerController";

    private final BarCodeScannerControllerRepository barCodeScannerControllerRepository;

    public BarCodeScannerControllerResource(BarCodeScannerControllerRepository barCodeScannerControllerRepository) {
        this.barCodeScannerControllerRepository = barCodeScannerControllerRepository;
    }

    /**
     * POST  /bar-code-scanner-controllers : Create a new barCodeScannerController.
     *
     * @param barCodeScannerController the barCodeScannerController to create
     * @return the ResponseEntity with status 201 (Created) and with body the new barCodeScannerController, or with status 400 (Bad Request) if the barCodeScannerController has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bar-code-scanner-controllers")
    @Timed
    public ResponseEntity<BarCodeScannerController> createBarCodeScannerController(@RequestBody BarCodeScannerController barCodeScannerController) throws URISyntaxException {
        log.debug("REST request to save BarCodeScannerController : {}", barCodeScannerController);
        if (barCodeScannerController.getId() != null) {
            throw new BadRequestAlertException("A new barCodeScannerController cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BarCodeScannerController result = barCodeScannerControllerRepository.save(barCodeScannerController);
        return ResponseEntity.created(new URI("/api/bar-code-scanner-controllers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bar-code-scanner-controllers : Updates an existing barCodeScannerController.
     *
     * @param barCodeScannerController the barCodeScannerController to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated barCodeScannerController,
     * or with status 400 (Bad Request) if the barCodeScannerController is not valid,
     * or with status 500 (Internal Server Error) if the barCodeScannerController couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bar-code-scanner-controllers")
    @Timed
    public ResponseEntity<BarCodeScannerController> updateBarCodeScannerController(@RequestBody BarCodeScannerController barCodeScannerController) throws URISyntaxException {
        log.debug("REST request to update BarCodeScannerController : {}", barCodeScannerController);
        if (barCodeScannerController.getId() == null) {
            return createBarCodeScannerController(barCodeScannerController);
        }
        BarCodeScannerController result = barCodeScannerControllerRepository.save(barCodeScannerController);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, barCodeScannerController.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bar-code-scanner-controllers : get all the barCodeScannerControllers.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of barCodeScannerControllers in body
     */
    @GetMapping("/bar-code-scanner-controllers")
    @Timed
    public List<BarCodeScannerController> getAllBarCodeScannerControllers(@RequestParam(required = false) String filter) {
        if ("barcodescanner-is-null".equals(filter)) {
            log.debug("REST request to get all BarCodeScannerControllers where barCodeScanner is null");
            return StreamSupport
                .stream(barCodeScannerControllerRepository.findAll().spliterator(), false)
                .filter(barCodeScannerController -> barCodeScannerController.getBarCodeScanner() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all BarCodeScannerControllers");
        return barCodeScannerControllerRepository.findAll();
        }

    /**
     * GET  /bar-code-scanner-controllers/:id : get the "id" barCodeScannerController.
     *
     * @param id the id of the barCodeScannerController to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the barCodeScannerController, or with status 404 (Not Found)
     */
    @GetMapping("/bar-code-scanner-controllers/{id}")
    @Timed
    public ResponseEntity<BarCodeScannerController> getBarCodeScannerController(@PathVariable Long id) {
        log.debug("REST request to get BarCodeScannerController : {}", id);
        BarCodeScannerController barCodeScannerController = barCodeScannerControllerRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(barCodeScannerController));
    }

    /**
     * DELETE  /bar-code-scanner-controllers/:id : delete the "id" barCodeScannerController.
     *
     * @param id the id of the barCodeScannerController to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bar-code-scanner-controllers/{id}")
    @Timed
    public ResponseEntity<Void> deleteBarCodeScannerController(@PathVariable Long id) {
        log.debug("REST request to delete BarCodeScannerController : {}", id);
        barCodeScannerControllerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
