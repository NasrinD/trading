package org.jhipster.tradingsystem.repository;

import org.jhipster.tradingsystem.domain.Printer;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Printer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrinterRepository extends JpaRepository<Printer, Long> {

}
