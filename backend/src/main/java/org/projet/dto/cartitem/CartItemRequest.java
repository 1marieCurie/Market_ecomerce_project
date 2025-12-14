package org.projet.dto.cartitem;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemRequest {
    private Long productId;
    private Integer quantity;
    // no need to add user_id , it comes from securityContexte (from local storage
    // in front)
}
