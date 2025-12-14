package org.projet.exception;

public class ProductNotFoundException extends RuntimeException {

    public ProductNotFoundException(Long id) {
        super("Produit avec id " + id + " introuvable");
    }
    public ProductNotFoundException(String message) {
        super(message);
    }

}
