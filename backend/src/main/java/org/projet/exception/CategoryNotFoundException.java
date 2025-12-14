
package org.projet.exception;


public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException(String message) {
        super(message);
    }

    // ID-based constructor
    public CategoryNotFoundException(Long id) {
        super("Category not found with id: " + id);
    }
}
