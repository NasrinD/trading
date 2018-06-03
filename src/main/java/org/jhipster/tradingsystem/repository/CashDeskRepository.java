package org.jhipster.tradingsystem.repository;

import org.jhipster.tradingsystem.domain.CashDesk;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the CashDesk entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CashDeskRepository extends JpaRepository<CashDesk, Long> {
    @Query("select distinct cash_desk from CashDesk cash_desk left join fetch cash_desk.cashiers")
    List<CashDesk> findAllWithEagerRelationships();

    @Query("select cash_desk from CashDesk cash_desk left join fetch cash_desk.cashiers where cash_desk.id =:id")
    CashDesk findOneWithEagerRelationships(@Param("id") Long id);

}
