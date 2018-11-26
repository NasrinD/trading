package org.jhipster.tradingsystem.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A ReceiptItem.
 */
@Entity
@Table(name = "receipt_item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ReceiptItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "product_bar_code", nullable = false)
    private Long productBarCode;

    @NotNull
    @Column(name = "product_price", precision=10, scale=2, nullable = false)
    private BigDecimal productPrice;

    @NotNull
    @Column(name = "product_name", nullable = false)
    private String productName;

    @ManyToOne
    private Receipt receipt;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductBarCode() {
        return productBarCode;
    }

    public ReceiptItem productBarCode(Long productBarCode) {
        this.productBarCode = productBarCode;
        return this;
    }

    public void setProductBarCode(Long productBarCode) {
        this.productBarCode = productBarCode;
    }

    public BigDecimal getProductPrice() {
        return productPrice;
    }

    public ReceiptItem productPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
        return this;
    }

    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductName() {
        return productName;
    }

    public ReceiptItem productName(String productName) {
        this.productName = productName;
        return this;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Receipt getReceipt() {
        return receipt;
    }

    public ReceiptItem receipt(Receipt receipt) {
        this.receipt = receipt;
        return this;
    }

    public void setReceipt(Receipt receipt) {
        this.receipt = receipt;
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
        ReceiptItem receiptItem = (ReceiptItem) o;
        if (receiptItem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), receiptItem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReceiptItem{" +
            "id=" + getId() +
            ", productBarCode=" + getProductBarCode() +
            ", productPrice=" + getProductPrice() +
            ", productName='" + getProductName() + "'" +
            "}";
    }
}
