package org.jhipster.tradingsystem.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.tradingsystem.domain.CardReader;

import org.jhipster.tradingsystem.repository.CardReaderRepository;
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
 * REST controller for managing CardReader.
 */
@RestController
@RequestMapping("/api")
public class CardReaderResource {

    private final Logger log = LoggerFactory.getLogger(CardReaderResource.class);

    private static final String ENTITY_NAME = "cardReader";

    private final CardReaderRepository cardReaderRepository;

    public CardReaderResource(CardReaderRepository cardReaderRepository) {
        this.cardReaderRepository = cardReaderRepository;
    }

    /**
     * POST  /card-readers : Create a new cardReader.
     *
     * @param cardReader the cardReader to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cardReader, or with status 400 (Bad Request) if the cardReader has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/card-readers")
    @Timed
    public ResponseEntity<CardReader> createCardReader(@Valid @RequestBody CardReader cardReader) throws URISyntaxException {
        log.debug("REST request to save CardReader : {}", cardReader);
        if (cardReader.getId() != null) {
            throw new BadRequestAlertException("A new cardReader cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CardReader result = cardReaderRepository.save(cardReader);
        return ResponseEntity.created(new URI("/api/card-readers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /card-readers : Updates an existing cardReader.
     *
     * @param cardReader the cardReader to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cardReader,
     * or with status 400 (Bad Request) if the cardReader is not valid,
     * or with status 500 (Internal Server Error) if the cardReader couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/card-readers")
    @Timed
    public ResponseEntity<CardReader> updateCardReader(@Valid @RequestBody CardReader cardReader) throws URISyntaxException {
        log.debug("REST request to update CardReader : {}", cardReader);
        if (cardReader.getId() == null) {
            return createCardReader(cardReader);
        }
        CardReader result = cardReaderRepository.save(cardReader);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cardReader.getId().toString()))
            .body(result);
    }

    /**
     * GET  /card-readers : get all the cardReaders.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of cardReaders in body
     */
    @GetMapping("/card-readers")
    @Timed
    public List<CardReader> getAllCardReaders(@RequestParam(required = false) String filter) {
        if ("cashdesk-is-null".equals(filter)) {
            log.debug("REST request to get all CardReaders where cashDesk is null");
            return StreamSupport
                .stream(cardReaderRepository.findAll().spliterator(), false)
                .filter(cardReader -> cardReader.getCashDesk() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all CardReaders");
        return cardReaderRepository.findAll();
        }

    /**
     * GET  /card-readers/:id : get the "id" cardReader.
     *
     * @param id the id of the cardReader to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cardReader, or with status 404 (Not Found)
     */
    @GetMapping("/card-readers/{id}")
    @Timed
    public ResponseEntity<CardReader> getCardReader(@PathVariable Long id) {
        log.debug("REST request to get CardReader : {}", id);
        CardReader cardReader = cardReaderRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cardReader));
    }

    /**
     * DELETE  /card-readers/:id : delete the "id" cardReader.
     *
     * @param id the id of the cardReader to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/card-readers/{id}")
    @Timed
    public ResponseEntity<Void> deleteCardReader(@PathVariable Long id) {
        log.debug("REST request to delete CardReader : {}", id);
        cardReaderRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
