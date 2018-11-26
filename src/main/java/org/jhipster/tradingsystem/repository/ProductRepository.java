package org.jhipster.tradingsystem.repository;

import org.jhipster.tradingsystem.domain.Product;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	public Product findByBarCode(Long barCode);
}
