package org.projet.controller;

import lombok.RequiredArgsConstructor;
import org.projet.dto.product.ProductResponse;
import org.projet.dto.product.ProductAdminResponseDTO;
import org.projet.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.projet.dto.product.ProductResponse;


import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // Get all products
    @GetMapping
    public ResponseEntity<List<ProductAdminResponseDTO>> getAll() {
        List<ProductAdminResponseDTO> products = productService.getAll();
        return ResponseEntity.ok(products);
    }

    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductAdminResponseDTO> getById(@PathVariable Long id) {
        ProductAdminResponseDTO product = productService.getById(id);
        return ResponseEntity.ok(product);
    }

    // Search products by name (partial match)
    @GetMapping("/search")
    public ResponseEntity<List<ProductAdminResponseDTO>> searchByName(@RequestParam("name") String name) {
        List<ProductAdminResponseDTO> results = productService.searchByName(name);
        return ResponseEntity.ok(results);
    }

    // Get products by category ID
    @GetMapping("/categories/{categoryId}")
    public ResponseEntity<List<ProductAdminResponseDTO>> getByCategory(@PathVariable Long categoryId) {
        List<ProductAdminResponseDTO> results = productService.getByCategory(categoryId);
        return ResponseEntity.ok(results);
    }
}
