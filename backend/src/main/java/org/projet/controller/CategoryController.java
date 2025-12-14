package org.projet.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.projet.dto.category.CategoryRequestDTO;
import org.projet.dto.category.CategoryResponseDTO;
import org.projet.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public CategoryResponseDTO create(@Valid @RequestBody CategoryRequestDTO dto) {
        return categoryService.create(dto);
    }

    @GetMapping
    public List<CategoryResponseDTO> getAll() {
        return categoryService.getAll();
    }

    @GetMapping("/{id}")
    public CategoryResponseDTO getById(@PathVariable Long id) {
        return categoryService.getById(id);
    }

    @PutMapping("/{id}")
    public CategoryResponseDTO update(@PathVariable Long id,
            @Valid @RequestBody CategoryRequestDTO dto) {
        return categoryService.update(id, dto);
    }

    // partial modification
    @PatchMapping("/{id}")
    public CategoryResponseDTO updatePartial(
            @PathVariable Long id,
            @RequestBody CategoryRequestDTO dto) {
        return categoryService.updatePartial(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        categoryService.delete(id);
    }
}
