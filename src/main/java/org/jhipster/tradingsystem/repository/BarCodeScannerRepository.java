package org.jhipster.tradingsystem.repository;

import org.jhipster.tradingsystem.domain.BarCodeScanner;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the BarCodeScanner entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BarCodeScannerRepository extends JpaRepository<BarCodeScanner, Long> {

}
