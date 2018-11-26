package org.jhipster.tradingsystem.repository;

import org.jhipster.tradingsystem.domain.IssuingBank;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the IssuingBank entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IssuingBankRepository extends JpaRepository<IssuingBank, Long> {

}
