package org.projet.service.impl;

import lombok.RequiredArgsConstructor;
import org.projet.dto.product.ProductAdminResponseDTO;
import org.projet.dto.product.ProductRequest;
import org.projet.entity.Category;
import org.projet.entity.Product;
import org.projet.repository.CategoryRepository;
import org.projet.repository.ProductRepository;
import org.projet.service.ProductService;
import org.springframework.stereotype.Service;
import org.projet.mapper.ProductMapper;

import java.time.LocalDateTime;
import java.util.List;

import org.projet.exception.ProductNotFoundException;
import org.projet.exception.ProductAlreadyExistsException;
import org.projet.exception.CategoryNotFoundException;


@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    @Override
    public ProductAdminResponseDTO create(ProductRequest request) {

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException(request.getCategoryId()));

        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setOldPrice(request.getOldPrice());
        product.setStock(request.getStock());
        product.setSku(request.getSku());
        product.setImageUrl(request.getImageUrl());
        product.setBrand(request.getBrand());
        product.setCategory(category);
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());

        //before saving make sure that the same product doesnt have a duplicated sku
        if (productRepository.existsBySku(request.getSku())) {
            throw new ProductAlreadyExistsException(request.getSku());
        }


        Product saved = productRepository.save(product);
        return productMapper.toAdminDTO(saved);
    }

    @Override
    public ProductAdminResponseDTO update(Long id, ProductRequest request) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException("Category Not Found."));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setOldPrice(request.getOldPrice());
        product.setStock(request.getStock());
        product.setSku(request.getSku());
        product.setImageUrl(request.getImageUrl());
        product.setBrand(request.getBrand());
        product.setCategory(category);
        product.setUpdatedAt(LocalDateTime.now());

        return productMapper.toAdminDTO(productRepository.save(product));
    }

        //Partial update added
    @Override
    public ProductAdminResponseDTO updatePartial(Long id, ProductRequest request) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        // Only update fields that are not null
        if (request.getName() != null) product.setName(request.getName());
        if (request.getDescription() != null) product.setDescription(request.getDescription());
        if (request.getPrice() != null) product.setPrice(request.getPrice());
        if (request.getOldPrice() != null) product.setOldPrice(request.getOldPrice());
        if (request.getStock() != null) product.setStock(request.getStock());
        if (request.getSku() != null) {
            // Check for duplicate SKU
            if (productRepository.existsBySkuAndIdNot(request.getSku(), id)) {
                throw new ProductAlreadyExistsException(request.getSku());
            }
            product.setSku(request.getSku());
        }
        if (request.getImageUrl() != null) product.setImageUrl(request.getImageUrl());
        if (request.getBrand() != null) product.setBrand(request.getBrand());
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new CategoryNotFoundException(request.getCategoryId()));
            product.setCategory(category);
        }

        product.setUpdatedAt(LocalDateTime.now());

        return productMapper.toAdminDTO(productRepository.save(product));
    }


    @Override
    public ProductAdminResponseDTO getById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product Not Found"));
        return productMapper.toAdminDTO(product);
    }

    @Override
    public List<ProductAdminResponseDTO> getAll() {
        return productRepository.findAll()
                .stream()
                .map(productMapper::toAdminDTO)
                .toList();
    }

    @Override
    public void delete(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product Not Found"));
        productRepository.delete(product);
    }

    // public endpoints
    @Override
    public List<ProductAdminResponseDTO> searchByName(String name) {
        List<Product> products = productRepository.findByNameContainingIgnoreCase(name);
        return products.stream()
                .map(productMapper::toAdminDTO)
                .toList();
    }

    @Override
    public List<ProductAdminResponseDTO> getByCategory(Long categoryId) {
        List<Product> products = productRepository.findByCategoryId(categoryId);
        return products.stream()
                .map(productMapper::toAdminDTO)
                .toList();
    }



    
}
