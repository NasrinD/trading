package org.jhipster.tradingsystem.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.tradingsystem.domain.Network;

import org.jhipster.tradingsystem.repository.NetworkRepository;
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
 * REST controller for managing Network.
 */
@RestController
@RequestMapping("/api")
public class NetworkResource {

    private final Logger log = LoggerFactory.getLogger(NetworkResource.class);

    private static final String ENTITY_NAME = "network";

    private final NetworkRepository networkRepository;

    public NetworkResource(NetworkRepository networkRepository) {
        this.networkRepository = networkRepository;
    }

    /**
     * POST  /networks : Create a new network.
     *
     * @param network the network to create
     * @return the ResponseEntity with status 201 (Created) and with body the new network, or with status 400 (Bad Request) if the network has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/networks")
    @Timed
    public ResponseEntity<Network> createNetwork(@Valid @RequestBody Network network) throws URISyntaxException {
        log.debug("REST request to save Network : {}", network);
        if (network.getId() != null) {
            throw new BadRequestAlertException("A new network cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Network result = networkRepository.save(network);
        return ResponseEntity.created(new URI("/api/networks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /networks : Updates an existing network.
     *
     * @param network the network to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated network,
     * or with status 400 (Bad Request) if the network is not valid,
     * or with status 500 (Internal Server Error) if the network couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/networks")
    @Timed
    public ResponseEntity<Network> updateNetwork(@Valid @RequestBody Network network) throws URISyntaxException {
        log.debug("REST request to update Network : {}", network);
        if (network.getId() == null) {
            return createNetwork(network);
        }
        Network result = networkRepository.save(network);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, network.getId().toString()))
            .body(result);
    }

    /**
     * GET  /networks : get all the networks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of networks in body
     */
    @GetMapping("/networks")
    @Timed
    public List<Network> getAllNetworks() {
        log.debug("REST request to get all Networks");
        return networkRepository.findAll();
        }

    /**
     * GET  /networks/:id : get the "id" network.
     *
     * @param id the id of the network to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the network, or with status 404 (Not Found)
     */
    @GetMapping("/networks/{id}")
    @Timed
    public ResponseEntity<Network> getNetwork(@PathVariable Long id) {
        log.debug("REST request to get Network : {}", id);
        Network network = networkRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(network));
    }

    /**
     * DELETE  /networks/:id : delete the "id" network.
     *
     * @param id the id of the network to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/networks/{id}")
    @Timed
    public ResponseEntity<Void> deleteNetwork(@PathVariable Long id) {
        log.debug("REST request to delete Network : {}", id);
        networkRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
