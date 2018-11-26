package org.jhipster.tradingsystem.repository;

import org.jhipster.tradingsystem.domain.CashDeskApplication;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CashDeskApplication entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CashDeskApplicationRepository extends JpaRepository<CashDeskApplication, Long> {

}
