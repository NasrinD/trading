package org.jhipster.tradingsystem.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.tradingsystem.domain.CardReaderController;

import org.jhipster.tradingsystem.repository.CardReaderControllerRepository;
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
 * REST controller for managing CardReaderController.
 */
@RestController
@RequestMapping("/api")
public class CardReaderControllerResource {

    private final Logger log = LoggerFactory.getLogger(CardReaderControllerResource.class);

    private static final String ENTITY_NAME = "cardReaderController";

    private final CardReaderControllerRepository cardReaderControllerRepository;

    public CardReaderControllerResource(CardReaderControllerRepository cardReaderControllerRepository) {
        this.cardReaderControllerRepository = cardReaderControllerRepository;
    }

    /**
     * POST  /card-reader-controllers : Create a new cardReaderController.
     *
     * @param cardReaderController the cardReaderController to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cardReaderController, or with status 400 (Bad Request) if the cardReaderController has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/card-reader-controllers")
    @Timed
    public ResponseEntity<CardReaderController> createCardReaderController(@RequestBody CardReaderController cardReaderController) throws URISyntaxException {
        log.debug("REST request to save CardReaderController : {}", cardReaderController);
        if (cardReaderController.getId() != null) {
            throw new BadRequestAlertException("A new cardReaderController cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CardReaderController result = cardReaderControllerRepository.save(cardReaderController);
        return ResponseEntity.created(new URI("/api/card-reader-controllers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /card-reader-controllers : Updates an existing cardReaderController.
     *
     * @param cardReaderController the cardReaderController to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cardReaderController,
     * or with status 400 (Bad Request) if the cardReaderController is not valid,
     * or with status 500 (Internal Server Error) if the cardReaderController couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/card-reader-controllers")
    @Timed
    public ResponseEntity<CardReaderController> updateCardReaderController(@RequestBody CardReaderController cardReaderController) throws URISyntaxException {
        log.debug("REST request to update CardReaderController : {}", cardReaderController);
        if (cardReaderController.getId() == null) {
            return createCardReaderController(cardReaderController);
        }
        CardReaderController result = cardReaderControllerRepository.save(cardReaderController);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cardReaderController.getId().toString()))
            .body(result);
    }

    /**
     * GET  /card-reader-controllers : get all the cardReaderControllers.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of cardReaderControllers in body
     */
    @GetMapping("/card-reader-controllers")
    @Timed
    public List<CardReaderController> getAllCardReaderControllers(@RequestParam(required = false) String filter) {
        if ("cardreader-is-null".equals(filter)) {
            log.debug("REST request to get all CardReaderControllers where cardReader is null");
            return StreamSupport
                .stream(cardReaderControllerRepository.findAll().spliterator(), false)
                .filter(cardReaderController -> cardReaderController.getCardReader() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all CardReaderControllers");
        return cardReaderControllerRepository.findAll();
        }

    /**
     * GET  /card-reader-controllers/:id : get the "id" cardReaderController.
     *
     * @param id the id of the cardReaderController to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cardReaderController, or with status 404 (Not Found)
     */
    @GetMapping("/card-reader-controllers/{id}")
    @Timed
    public ResponseEntity<CardReaderController> getCardReaderController(@PathVariable Long id) {
        log.debug("REST request to get CardReaderController : {}", id);
        CardReaderController cardReaderController = cardReaderControllerRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cardReaderController));
    }

    /**
     * DELETE  /card-reader-controllers/:id : delete the "id" cardReaderController.
     *
     * @param id the id of the cardReaderController to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/card-reader-controllers/{id}")
    @Timed
    public ResponseEntity<Void> deleteCardReaderController(@PathVariable Long id) {
        log.debug("REST request to delete CardReaderController : {}", id);
        cardReaderControllerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
