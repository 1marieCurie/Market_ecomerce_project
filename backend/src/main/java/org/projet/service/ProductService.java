package org.projet.service;

import org.projet.dto.product.ProductAdminResponseDTO;
import org.projet.dto.product.ProductRequest;

import java.util.List;

public interface ProductService {

    ProductAdminResponseDTO create(ProductRequest request);

    ProductAdminResponseDTO update(Long id, ProductRequest request);

    ProductAdminResponseDTO getById(Long id);

    List<ProductAdminResponseDTO> getAll();

    void delete(Long id);

    // Public endpoints
    List<ProductAdminResponseDTO> searchByName(String name);

    List<ProductAdminResponseDTO> getByCategory(Long categoryId);
}
// it takes only dto