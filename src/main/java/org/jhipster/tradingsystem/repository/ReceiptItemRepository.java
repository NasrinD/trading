package org.jhipster.tradingsystem.repository;

import org.jhipster.tradingsystem.domain.ReceiptItem;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ReceiptItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReceiptItemRepository extends JpaRepository<ReceiptItem, Long> {

}
