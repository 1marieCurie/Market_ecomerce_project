package org.projet.exception;

public class ProductAlreadyExistsException extends RuntimeException {

    public ProductAlreadyExistsException(String sku) {
        super("Produit avec SKU " + sku + " existe déjà");
    }
}
