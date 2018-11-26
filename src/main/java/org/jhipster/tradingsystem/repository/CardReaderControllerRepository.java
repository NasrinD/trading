package org.jhipster.tradingsystem.repository;

import org.jhipster.tradingsystem.domain.CardReaderController;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CardReaderController entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CardReaderControllerRepository extends JpaRepository<CardReaderController, Long> {

}
