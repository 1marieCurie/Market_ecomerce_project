package org.projet.service.impl;

import lombok.RequiredArgsConstructor;
import org.projet.dto.category.CategoryRequestDTO;
import org.projet.dto.category.CategoryResponseDTO;
import org.projet.entity.Category;
import org.projet.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.projet.service.CategoryService;


import java.time.LocalDateTime;
import java.util.List;

import org.projet.exception.CategoryAlreadyExistsException;
import org.projet.exception.CategoryNotFoundException;
import org.projet.exception.CategoryDeletionNotAllowedException;


@Service
@RequiredArgsConstructor

public class CategoryServiceImpl implements CategoryService {


    private final CategoryRepository categoryRepository;

    //Create a category
    public CategoryResponseDTO create(CategoryRequestDTO dto) {
        if (categoryRepository.existsByName(dto.getName())) {
            throw new CategoryAlreadyExistsException("Category already exists");
        }

        Category category = new Category();
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
        category.setImageUrl(dto.getImageUrl());
        category.setCreatedAt(LocalDateTime.now());
        category.setUpdatedAt(LocalDateTime.now());

        Category saved = categoryRepository.save(category);
        return mapToResponse(saved);
    }

    public List<CategoryResponseDTO> getAll() {
        return categoryRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public CategoryResponseDTO getById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category Not Found."));
        return mapToResponse(category);
    }

    public CategoryResponseDTO update(Long id, CategoryRequestDTO dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category Not Found."));

        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
        category.setImageUrl(dto.getImageUrl());
        category.setUpdatedAt(LocalDateTime.now());

        return mapToResponse(categoryRepository.save(category));
    }

    public void delete(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category Not Found."));

        if (!category.getProducts().isEmpty()) {
            throw new CategoryDeletionNotAllowedException("Impossible to delete category that has products.");
        }

        categoryRepository.delete(category);
    }

    private CategoryResponseDTO mapToResponse(Category category) {
        CategoryResponseDTO dto = new CategoryResponseDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setDescription(category.getDescription());
        dto.setImageUrl(category.getImageUrl());
        return dto;
    }

}
