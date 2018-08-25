package org.jhipster.tradingsystem.repository;

import org.jhipster.tradingsystem.domain.Product;
import org.jhipster.tradingsystem.domain.StockItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the StockItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StockItemRepository extends JpaRepository<StockItem, Long> {
	public StockItem findByProduct(Product product);
}
