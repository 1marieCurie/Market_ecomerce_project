package org.projet.service.impl;

import org.projet.repository.CartItemRepository;
import org.projet.repository.ProductRepository;
import org.projet.repository.UserRepository;
import org.projet.entity.User;
import org.projet.exception.CartItemNotFoundException;
import org.projet.exception.ProductNotFoundException;
import org.projet.exception.UserNotFoundException;
import org.projet.entity.Product;
import org.projet.entity.CartItem;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import org.projet.dto.cartitem.CartItemRequest;
import org.projet.dto.cartitem.CartItemResponseDTO;
import org.projet.service.CartService;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
@RequiredArgsConstructor // // crée un constructeur pour tous les "final" automatiquement
public class CartServiceImp implements CartService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;

    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal(); // get user
        String email;
        if (principal instanceof User) {
            email = ((User) principal).getEmail();
        } else {
            email = principal.toString();
        }
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Current user not found"));
    }

    // add product to the cart
    public void addProduct(CartItemRequest request) {
        User user = getCurrentUser(); // <-- récupère le user depuis SecurityContext

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ProductNotFoundException(request.getProductId()));

        CartItem cartItem = cartItemRepository.findByUserAndProduct(user, product)
                .orElseGet(() -> {
                    CartItem newItem = new CartItem();
                    newItem.setUser(user);
                    newItem.setProduct(product);
                    newItem.setQuantity(0);
                    newItem.setAddedAt(LocalDateTime.now());
                    return newItem;
                });

        cartItem.setQuantity(cartItem.getQuantity() + (request.getQuantity() != null ? request.getQuantity() : 1));
        cartItemRepository.save(cartItem);
    }

    // remove product from the cart
    @Override
    public void removeProduct(Long productId) {
        User user = getCurrentUser();
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));

        CartItem cartItem = cartItemRepository.findByUserAndProduct(user, product)
                .orElseThrow(() -> new CartItemNotFoundException(productId));

        if (cartItem.getQuantity() > 1) {
            cartItem.setQuantity(cartItem.getQuantity() - 1);
            cartItemRepository.save(cartItem);
        } else {
            cartItemRepository.delete(cartItem);
        }
    }

    public List<CartItemResponseDTO> getCart() {
        User user = getCurrentUser();
        List<CartItem> cartItems = cartItemRepository.findByUser(user);
        return cartItems.stream()
                .map(item -> new CartItemResponseDTO(
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getProduct().getImageUrl(),
                        item.getProduct().getPrice(),
                        item.getQuantity(),
                        item.getProduct().getPrice()
                                .multiply(java.math.BigDecimal.valueOf(item.getQuantity()))))
                .toList();
    }

    // clear the cart
    @Override
    public void clearCart() {
        User user = getCurrentUser();
        cartItemRepository.deleteByUser(user);
    }
}
