package org.projet.controller.admin;

import lombok.RequiredArgsConstructor;
import org.projet.dto.product.ProductAdminResponseDTO;
import org.projet.dto.product.ProductRequest;
import org.projet.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;



import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
@Validated
public class ProductAdminController {

    private final ProductService productService;

    // Create a product
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductAdminResponseDTO> create(@RequestBody @Validated ProductRequest request) {
        ProductAdminResponseDTO created = productService.create(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // Update a product
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductAdminResponseDTO> update(@PathVariable Long id,
                                                          @RequestBody @Validated ProductRequest request) {
        ProductAdminResponseDTO updated = productService.update(id, request);
        return ResponseEntity.ok(updated);
    }

    // Get a product by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductAdminResponseDTO> getById(@PathVariable Long id) {
        ProductAdminResponseDTO product = productService.getById(id);
        return ResponseEntity.ok(product);
    }

    // Get all products
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ProductAdminResponseDTO>> getAll() {
        List<ProductAdminResponseDTO> products = productService.getAll();
        return ResponseEntity.ok(products);
    }

    // Delete a product
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
