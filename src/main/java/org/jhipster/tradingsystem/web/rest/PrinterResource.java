package org.jhipster.tradingsystem.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.tradingsystem.domain.Printer;

import org.jhipster.tradingsystem.repository.PrinterRepository;
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
 * REST controller for managing Printer.
 */
@RestController
@RequestMapping("/api")
public class PrinterResource {

    private final Logger log = LoggerFactory.getLogger(PrinterResource.class);

    private static final String ENTITY_NAME = "printer";

    private final PrinterRepository printerRepository;

    public PrinterResource(PrinterRepository printerRepository) {
        this.printerRepository = printerRepository;
    }

    /**
     * POST  /printers : Create a new printer.
     *
     * @param printer the printer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new printer, or with status 400 (Bad Request) if the printer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/printers")
    @Timed
    public ResponseEntity<Printer> createPrinter(@Valid @RequestBody Printer printer) throws URISyntaxException {
        log.debug("REST request to save Printer : {}", printer);
        if (printer.getId() != null) {
            throw new BadRequestAlertException("A new printer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Printer result = printerRepository.save(printer);
        return ResponseEntity.created(new URI("/api/printers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /printers : Updates an existing printer.
     *
     * @param printer the printer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated printer,
     * or with status 400 (Bad Request) if the printer is not valid,
     * or with status 500 (Internal Server Error) if the printer couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/printers")
    @Timed
    public ResponseEntity<Printer> updatePrinter(@Valid @RequestBody Printer printer) throws URISyntaxException {
        log.debug("REST request to update Printer : {}", printer);
        if (printer.getId() == null) {
            return createPrinter(printer);
        }
        Printer result = printerRepository.save(printer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, printer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /printers : get all the printers.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of printers in body
     */
    @GetMapping("/printers")
    @Timed
    public List<Printer> getAllPrinters(@RequestParam(required = false) String filter) {
        if ("cashdesk-is-null".equals(filter)) {
            log.debug("REST request to get all Printers where cashDesk is null");
            return StreamSupport
                .stream(printerRepository.findAll().spliterator(), false)
                .filter(printer -> printer.getCashDesk() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Printers");
        return printerRepository.findAll();
        }

    /**
     * GET  /printers/:id : get the "id" printer.
     *
     * @param id the id of the printer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the printer, or with status 404 (Not Found)
     */
    @GetMapping("/printers/{id}")
    @Timed
    public ResponseEntity<Printer> getPrinter(@PathVariable Long id) {
        log.debug("REST request to get Printer : {}", id);
        Printer printer = printerRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(printer));
    }

    /**
     * DELETE  /printers/:id : delete the "id" printer.
     *
     * @param id the id of the printer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/printers/{id}")
    @Timed
    public ResponseEntity<Void> deletePrinter(@PathVariable Long id) {
        log.debug("REST request to delete Printer : {}", id);
        printerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
