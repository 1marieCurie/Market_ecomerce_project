package org.projet.mapper;

import org.springframework.stereotype.Component;
import org.projet.dto.product.ProductAdminResponseDTO;
import org.projet.entity.Product;


@Component
public class ProductMapper {

    public ProductAdminResponseDTO toAdminDTO(Product product) {

        if (product == null) {
        return null;
        }

        ProductAdminResponseDTO dto = new ProductAdminResponseDTO();

        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setOldPrice(product.getOldPrice());
        dto.setStock(product.getStock());
        dto.setSku(product.getSku());
        dto.setImageUrl(product.getImageUrl());
        dto.setBrand(product.getBrand());
        dto.setCreatedAt(product.getCreatedAt());
        dto.setUpdatedAt(product.getUpdatedAt());

        if (product.getCategory() != null) {
            dto.setCategoryId(product.getCategory().getId());
        }

        return dto;
    }
}
