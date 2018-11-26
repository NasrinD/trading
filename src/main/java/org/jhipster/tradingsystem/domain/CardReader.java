package org.jhipster.tradingsystem.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CardReader.
 */
@Entity
@Table(name = "card_reader")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CardReader implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "model", nullable = false)
    private String model;

    @OneToOne
    @JoinColumn(unique = true)
    private CardReaderController controller;

    @OneToOne(mappedBy = "cardReader")
    @JsonIgnore
    private CashDesk cashDesk;

    @ManyToOne
    private AcquiringBank acquiringBank;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public CardReader model(String model) {
        this.model = model;
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public CardReaderController getController() {
        return controller;
    }

    public CardReader controller(CardReaderController cardReaderController) {
        this.controller = cardReaderController;
        return this;
    }

    public void setController(CardReaderController cardReaderController) {
        this.controller = cardReaderController;
    }

    public CashDesk getCashDesk() {
        return cashDesk;
    }

    public CardReader cashDesk(CashDesk cashDesk) {
        this.cashDesk = cashDesk;
        return this;
    }

    public void setCashDesk(CashDesk cashDesk) {
        this.cashDesk = cashDesk;
    }

    public AcquiringBank getAcquiringBank() {
        return acquiringBank;
    }

    public CardReader acquiringBank(AcquiringBank acquiringBank) {
        this.acquiringBank = acquiringBank;
        return this;
    }

    public void setAcquiringBank(AcquiringBank acquiringBank) {
        this.acquiringBank = acquiringBank;
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
        CardReader cardReader = (CardReader) o;
        if (cardReader.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cardReader.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CardReader{" +
            "id=" + getId() +
            ", model='" + getModel() + "'" +
            "}";
    }
}
