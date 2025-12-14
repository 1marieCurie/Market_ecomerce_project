package org.projet.repository;

import org.projet.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ProductRepository extends JpaRepository<Product, Long> {

boolean existsBySkuAndIdNot(String sku, Long id);
boolean existsBySku(String sku);

List<Product> findByNameContainingIgnoreCase(String name); // partial search by name, case-insensitive.

List<Product> findByCategoryId(Long categoryId); // get all products for a given category.

}
