package org.jhipster.tradingsystem.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.tradingsystem.domain.CashBoxController;

import org.jhipster.tradingsystem.repository.CashBoxControllerRepository;
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
 * REST controller for managing CashBoxController.
 */
@RestController
@RequestMapping("/api")
public class CashBoxControllerResource {

    private final Logger log = LoggerFactory.getLogger(CashBoxControllerResource.class);

    private static final String ENTITY_NAME = "cashBoxController";

    private final CashBoxControllerRepository cashBoxControllerRepository;

    public CashBoxControllerResource(CashBoxControllerRepository cashBoxControllerRepository) {
        this.cashBoxControllerRepository = cashBoxControllerRepository;
    }

    /**
     * POST  /cash-box-controllers : Create a new cashBoxController.
     *
     * @param cashBoxController the cashBoxController to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cashBoxController, or with status 400 (Bad Request) if the cashBoxController has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cash-box-controllers")
    @Timed
    public ResponseEntity<CashBoxController> createCashBoxController(@RequestBody CashBoxController cashBoxController) throws URISyntaxException {
        log.debug("REST request to save CashBoxController : {}", cashBoxController);
        if (cashBoxController.getId() != null) {
            throw new BadRequestAlertException("A new cashBoxController cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CashBoxController result = cashBoxControllerRepository.save(cashBoxController);
        return ResponseEntity.created(new URI("/api/cash-box-controllers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cash-box-controllers : Updates an existing cashBoxController.
     *
     * @param cashBoxController the cashBoxController to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cashBoxController,
     * or with status 400 (Bad Request) if the cashBoxController is not valid,
     * or with status 500 (Internal Server Error) if the cashBoxController couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cash-box-controllers")
    @Timed
    public ResponseEntity<CashBoxController> updateCashBoxController(@RequestBody CashBoxController cashBoxController) throws URISyntaxException {
        log.debug("REST request to update CashBoxController : {}", cashBoxController);
        if (cashBoxController.getId() == null) {
            return createCashBoxController(cashBoxController);
        }
        CashBoxController result = cashBoxControllerRepository.save(cashBoxController);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cashBoxController.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cash-box-controllers : get all the cashBoxControllers.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of cashBoxControllers in body
     */
    @GetMapping("/cash-box-controllers")
    @Timed
    public List<CashBoxController> getAllCashBoxControllers(@RequestParam(required = false) String filter) {
        if ("printer-is-null".equals(filter)) {
            log.debug("REST request to get all CashBoxControllers where printer is null");
            return StreamSupport
                .stream(cashBoxControllerRepository.findAll().spliterator(), false)
                .filter(cashBoxController -> cashBoxController.getPrinter() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all CashBoxControllers");
        return cashBoxControllerRepository.findAll();
        }

    /**
     * GET  /cash-box-controllers/:id : get the "id" cashBoxController.
     *
     * @param id the id of the cashBoxController to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cashBoxController, or with status 404 (Not Found)
     */
    @GetMapping("/cash-box-controllers/{id}")
    @Timed
    public ResponseEntity<CashBoxController> getCashBoxController(@PathVariable Long id) {
        log.debug("REST request to get CashBoxController : {}", id);
        CashBoxController cashBoxController = cashBoxControllerRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cashBoxController));
    }

    /**
     * DELETE  /cash-box-controllers/:id : delete the "id" cashBoxController.
     *
     * @param id the id of the cashBoxController to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cash-box-controllers/{id}")
    @Timed
    public ResponseEntity<Void> deleteCashBoxController(@PathVariable Long id) {
        log.debug("REST request to delete CashBoxController : {}", id);
        cashBoxControllerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
