// this is only for an admin

// the admin is in need to see :
// stock, sku, category id, dates and all what allow to manage the catalog
// this dtois never exposed to the final user
package org.projet.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductAdminResponseDTO {

    private Long id;
    private String name;
    private String description;

    private BigDecimal price;
    private BigDecimal oldPrice;

    private Integer stock;
    private String sku;

    private String imageUrl;
    private String brand;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Long categoryId;

    // getters & setters
}
