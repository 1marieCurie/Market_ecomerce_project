// ProductRequest.java
package org.projet.dto.product;

import lombok.Data;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Min;

import java.math.BigDecimal;

// I added the validation here, it's necessary
// we avoid products without a price, or a negative stock, or a product without a category
@Data

public class ProductRequest {

    @NotBlank
    private String name;

    private String description;

    @NotNull
    @Positive
    private BigDecimal price;

    private BigDecimal oldPrice;

    @Min(0)
    private Integer stock;

    @NotBlank
    private String sku;

    private String imageUrl;
    private String brand;

    @NotNull
    private Long categoryId;
}
