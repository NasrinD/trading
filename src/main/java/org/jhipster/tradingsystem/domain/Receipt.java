package org.jhipster.tradingsystem.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import org.jhipster.tradingsystem.domain.enumeration.PaymentMode;

/**
 * A Receipt.
 */
@Entity
@Table(name = "receipt")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Receipt implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "jhi_date", nullable = false)
    private Instant date;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_mode", nullable = false)
    private PaymentMode paymentMode;

    @NotNull
    @Column(name = "running_total", precision=10, scale=2, nullable = false)
    private BigDecimal runningTotal;

    @OneToMany(mappedBy = "receipt")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ReceiptItem> receiptItems = new HashSet<>();

    @ManyToOne
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public Receipt date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public PaymentMode getPaymentMode() {
        return paymentMode;
    }

    public Receipt paymentMode(PaymentMode paymentMode) {
        this.paymentMode = paymentMode;
        return this;
    }

    public void setPaymentMode(PaymentMode paymentMode) {
        this.paymentMode = paymentMode;
    }

    public BigDecimal getRunningTotal() {
        return runningTotal;
    }

    public Receipt runningTotal(BigDecimal runningTotal) {
        this.runningTotal = runningTotal;
        return this;
    }

    public void setRunningTotal(BigDecimal runningTotal) {
        this.runningTotal = runningTotal;
    }

    public Set<ReceiptItem> getReceiptItems() {
        return receiptItems;
    }

    public Receipt receiptItems(Set<ReceiptItem> receiptItems) {
        this.receiptItems = receiptItems;
        return this;
    }

    public Receipt addReceiptItems(ReceiptItem receiptItem) {
        this.receiptItems.add(receiptItem);
        receiptItem.setReceipt(this);
        return this;
    }

    public Receipt removeReceiptItems(ReceiptItem receiptItem) {
        this.receiptItems.remove(receiptItem);
        receiptItem.setReceipt(null);
        return this;
    }

    public void setReceiptItems(Set<ReceiptItem> receiptItems) {
        this.receiptItems = receiptItems;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Receipt customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
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
        Receipt receipt = (Receipt) o;
        if (receipt.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), receipt.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Receipt{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", paymentMode='" + getPaymentMode() + "'" +
            ", runningTotal=" + getRunningTotal() +
            "}";
    }
}
