package org.jhipster.tradingsystem.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Debit.
 */
@Entity
@Table(name = "debit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Debit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "pin", nullable = false)
    private Long pin;

    @NotNull
    @Column(name = "card_number", nullable = false)
    private Long cardNumber;

    @NotNull
    @Column(name = "validity_date", nullable = false)
    private Instant validityDate;

    @ManyToOne
    private Customer owner;

    @ManyToOne
    private Bank bank;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPin() {
        return pin;
    }

    public Debit pin(Long pin) {
        this.pin = pin;
        return this;
    }

    public void setPin(Long pin) {
        this.pin = pin;
    }

    public Long getCardNumber() {
        return cardNumber;
    }

    public Debit cardNumber(Long cardNumber) {
        this.cardNumber = cardNumber;
        return this;
    }

    public void setCardNumber(Long cardNumber) {
        this.cardNumber = cardNumber;
    }

    public Instant getValidityDate() {
        return validityDate;
    }

    public Debit validityDate(Instant validityDate) {
        this.validityDate = validityDate;
        return this;
    }

    public void setValidityDate(Instant validityDate) {
        this.validityDate = validityDate;
    }

    public Customer getOwner() {
        return owner;
    }

    public Debit owner(Customer customer) {
        this.owner = customer;
        return this;
    }

    public void setOwner(Customer customer) {
        this.owner = customer;
    }

    public Bank getBank() {
        return bank;
    }

    public Debit bank(Bank bank) {
        this.bank = bank;
        return this;
    }

    public void setBank(Bank bank) {
        this.bank = bank;
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
        Debit debit = (Debit) o;
        if (debit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), debit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Debit{" +
            "id=" + getId() +
            ", pin=" + getPin() +
            ", cardNumber=" + getCardNumber() +
            ", validityDate='" + getValidityDate() + "'" +
            "}";
    }
}
