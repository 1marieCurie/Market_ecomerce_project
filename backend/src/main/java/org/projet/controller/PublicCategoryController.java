package org.projet.controller;

import lombok.RequiredArgsConstructor;
import org.projet.dto.category.CategoryResponseDTO;
import org.projet.service.CategoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories") // public endpoint
@RequiredArgsConstructor
public class PublicCategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public List<CategoryResponseDTO> getAllCategories() {
        // Only return minimal info needed by frontend (id + name)
        return categoryService.getAll();
    }
}
