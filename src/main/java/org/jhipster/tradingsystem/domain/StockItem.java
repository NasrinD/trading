package org.jhipster.tradingsystem.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A StockItem.
 */
@Entity
@Table(name = "stock_item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class StockItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "sales_price", precision=10, scale=2, nullable = false)
    private BigDecimal salesPrice;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Long amount;

    @NotNull
    @Column(name = "min_stock", nullable = false)
    private Long minStock;

    @NotNull
    @Column(name = "max_stock", nullable = false)
    private Long maxStock;

    @OneToOne
    @JoinColumn(unique = true)
    private Product product;

    @ManyToOne
    private Inventory inventory;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getSalesPrice() {
        return salesPrice;
    }

    public StockItem salesPrice(BigDecimal salesPrice) {
        this.salesPrice = salesPrice;
        return this;
    }

    public void setSalesPrice(BigDecimal salesPrice) {
        this.salesPrice = salesPrice;
    }

    public Long getAmount() {
        return amount;
    }

    public StockItem amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Long getMinStock() {
        return minStock;
    }

    public StockItem minStock(Long minStock) {
        this.minStock = minStock;
        return this;
    }

    public void setMinStock(Long minStock) {
        this.minStock = minStock;
    }

    public Long getMaxStock() {
        return maxStock;
    }

    public StockItem maxStock(Long maxStock) {
        this.maxStock = maxStock;
        return this;
    }

    public void setMaxStock(Long maxStock) {
        this.maxStock = maxStock;
    }

    public Product getProduct() {
        return product;
    }

    public StockItem product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public StockItem inventory(Inventory inventory) {
        this.inventory = inventory;
        return this;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        StockItem stockItem = (StockItem) o;
        if (stockItem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stockItem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StockItem{" +
            "id=" + getId() +
            ", salesPrice=" + getSalesPrice() +
            ", amount=" + getAmount() +
            ", minStock=" + getMinStock() +
            ", maxStock=" + getMaxStock() +
            "}";
    }
}
