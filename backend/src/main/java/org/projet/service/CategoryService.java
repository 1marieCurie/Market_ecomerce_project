package org.projet.service;

import org.projet.dto.category.CategoryRequestDTO;
import org.projet.dto.category.CategoryResponseDTO;

import java.util.List;

public interface CategoryService {

    CategoryResponseDTO create(CategoryRequestDTO dto);

    List<CategoryResponseDTO> getAll();

    CategoryResponseDTO getById(Long id);

    CategoryResponseDTO update(Long id, CategoryRequestDTO dto);
    
    CategoryResponseDTO updatePartial(Long id, CategoryRequestDTO dto);

    void delete(Long id);
}
