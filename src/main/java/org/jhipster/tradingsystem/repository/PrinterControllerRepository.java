package org.jhipster.tradingsystem.repository;

import org.jhipster.tradingsystem.domain.PrinterController;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PrinterController entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrinterControllerRepository extends JpaRepository<PrinterController, Long> {

}
