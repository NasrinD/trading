package org.jhipster.tradingsystem.repository;

import org.jhipster.tradingsystem.domain.CashDesk;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CashDesk entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CashDeskRepository extends JpaRepository<CashDesk, Long> {

}
