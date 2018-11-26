package org.jhipster.tradingsystem.repository;

import org.jhipster.tradingsystem.domain.Store;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Store entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
    @Query("select distinct store from Store store left join fetch store.cashiers")
    List<Store> findAllWithEagerRelationships();

    @Query("select store from Store store left join fetch store.cashiers where store.id =:id")
    Store findOneWithEagerRelationships(@Param("id") Long id);

}
