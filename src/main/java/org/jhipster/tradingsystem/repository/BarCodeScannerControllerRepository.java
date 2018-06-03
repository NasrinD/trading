package org.jhipster.tradingsystem.repository;

import org.jhipster.tradingsystem.domain.BarCodeScannerController;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the BarCodeScannerController entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BarCodeScannerControllerRepository extends JpaRepository<BarCodeScannerController, Long> {

}
