// ProductResponse.java
package org.projet.dto.product;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ProductResponse {
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
    private String categoryName; // pour affichage
}