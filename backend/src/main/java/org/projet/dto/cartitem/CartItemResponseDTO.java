package org.projet.dto.cartitem;

import java.math.BigDecimal;

public record CartItemResponseDTO(
                Long productId,
                String productName,
                String imageUrl,
                BigDecimal unitPrice,
                int quantity,
                BigDecimal totalPrice) {
}
