package org.projet.controller;

import lombok.RequiredArgsConstructor;

import org.projet.dto.cartitem.CartItemRequest;
import org.projet.dto.cartitem.CartItemResponseDTO;
import org.projet.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<Void> addToCart(@RequestBody CartItemRequest request) {
        cartService.addProduct(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/remove/{productId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long productId) {
        cartService.removeProduct(productId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<CartItemResponseDTO>> getCart() {
        return ResponseEntity.ok(cartService.getCart());
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart() {
        cartService.clearCart();
        return ResponseEntity.ok().build();
    }
}
