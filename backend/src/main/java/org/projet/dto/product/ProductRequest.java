// ProductRequest.java
package org.projet.dto.product;

import java.math.BigDecimal;

public class ProductRequest {
    private String name;
    private String description;
    private BigDecimal price;
    private BigDecimal oldPrice;
    private Integer stock;
    private String sku;
    private String imageUrl;
    private String brand;
    private Long categoryId;
}