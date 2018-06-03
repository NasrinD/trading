package org.jhipster.tradingsystem.repository;

import org.jhipster.tradingsystem.domain.CardReader;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CardReader entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CardReaderRepository extends JpaRepository<CardReader, Long> {

}
