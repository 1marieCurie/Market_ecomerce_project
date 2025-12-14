package org.projet.exception;

public class CartItemNotFoundException extends RuntimeException {
    public CartItemNotFoundException(String message) {
        super(message);
    }

    public CartItemNotFoundException(Long productId) {
        super("CartItem not found for product id: " + productId);
    }
}
