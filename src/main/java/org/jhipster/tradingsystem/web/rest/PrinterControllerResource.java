package org.jhipster.tradingsystem.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.tradingsystem.domain.PrinterController;

import org.jhipster.tradingsystem.repository.PrinterControllerRepository;
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
 * REST controller for managing PrinterController.
 */
@RestController
@RequestMapping("/api")
public class PrinterControllerResource {

    private final Logger log = LoggerFactory.getLogger(PrinterControllerResource.class);

    private static final String ENTITY_NAME = "printerController";

    private final PrinterControllerRepository printerControllerRepository;

    public PrinterControllerResource(PrinterControllerRepository printerControllerRepository) {
        this.printerControllerRepository = printerControllerRepository;
    }

    /**
     * POST  /printer-controllers : Create a new printerController.
     *
     * @param printerController the printerController to create
     * @return the ResponseEntity with status 201 (Created) and with body the new printerController, or with status 400 (Bad Request) if the printerController has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/printer-controllers")
    @Timed
    public ResponseEntity<PrinterController> createPrinterController(@RequestBody PrinterController printerController) throws URISyntaxException {
        log.debug("REST request to save PrinterController : {}", printerController);
        if (printerController.getId() != null) {
            throw new BadRequestAlertException("A new printerController cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrinterController result = printerControllerRepository.save(printerController);
        return ResponseEntity.created(new URI("/api/printer-controllers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /printer-controllers : Updates an existing printerController.
     *
     * @param printerController the printerController to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated printerController,
     * or with status 400 (Bad Request) if the printerController is not valid,
     * or with status 500 (Internal Server Error) if the printerController couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/printer-controllers")
    @Timed
    public ResponseEntity<PrinterController> updatePrinterController(@RequestBody PrinterController printerController) throws URISyntaxException {
        log.debug("REST request to update PrinterController : {}", printerController);
        if (printerController.getId() == null) {
            return createPrinterController(printerController);
        }
        PrinterController result = printerControllerRepository.save(printerController);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, printerController.getId().toString()))
            .body(result);
    }

    /**
     * GET  /printer-controllers : get all the printerControllers.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of printerControllers in body
     */
    @GetMapping("/printer-controllers")
    @Timed
    public List<PrinterController> getAllPrinterControllers(@RequestParam(required = false) String filter) {
        if ("printer-is-null".equals(filter)) {
            log.debug("REST request to get all PrinterControllers where printer is null");
            return StreamSupport
                .stream(printerControllerRepository.findAll().spliterator(), false)
                .filter(printerController -> printerController.getPrinter() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all PrinterControllers");
        return printerControllerRepository.findAll();
        }

    /**
     * GET  /printer-controllers/:id : get the "id" printerController.
     *
     * @param id the id of the printerController to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the printerController, or with status 404 (Not Found)
     */
    @GetMapping("/printer-controllers/{id}")
    @Timed
    public ResponseEntity<PrinterController> getPrinterController(@PathVariable Long id) {
        log.debug("REST request to get PrinterController : {}", id);
        PrinterController printerController = printerControllerRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(printerController));
    }

    /**
     * DELETE  /printer-controllers/:id : delete the "id" printerController.
     *
     * @param id the id of the printerController to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/printer-controllers/{id}")
    @Timed
    public ResponseEntity<Void> deletePrinterController(@PathVariable Long id) {
        log.debug("REST request to delete PrinterController : {}", id);
        printerControllerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
