package org.jhipster.tradingsystem.repository;

import org.jhipster.tradingsystem.domain.CashDeskApplication;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the CashDeskApplication entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CashDeskApplicationRepository extends JpaRepository<CashDeskApplication, Long> {
    @Query("select distinct cash_desk_application from CashDeskApplication cash_desk_application left join fetch cash_desk_application.banks")
    List<CashDeskApplication> findAllWithEagerRelationships();

    @Query("select cash_desk_application from CashDeskApplication cash_desk_application left join fetch cash_desk_application.banks where cash_desk_application.id =:id")
    CashDeskApplication findOneWithEagerRelationships(@Param("id") Long id);

}
