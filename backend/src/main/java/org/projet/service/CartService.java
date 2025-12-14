package org.projet.service;

import org.projet.dto.cartitem.CartItemRequest;
import org.projet.dto.cartitem.CartItemResponseDTO;

import java.util.List;

public interface CartService {

    void addProduct(CartItemRequest request); 

    void removeProduct(Long productId);

    List<CartItemResponseDTO> getCart();

    void clearCart();
}
