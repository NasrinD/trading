package org.jhipster.tradingsystem.repository;

import org.jhipster.tradingsystem.domain.Debit;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Debit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DebitRepository extends JpaRepository<Debit, Long> {

}
