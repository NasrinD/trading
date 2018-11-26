package org.jhipster.tradingsystem.repository;

import org.jhipster.tradingsystem.domain.CashBox;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CashBox entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CashBoxRepository extends JpaRepository<CashBox, Long> {

}
