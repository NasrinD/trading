package org.jhipster.tradingsystem.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CashBox.
 */
@Entity
@Table(name = "cash_box")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CashBox implements Serializable {

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
    private CashBoxController controller;

    @OneToOne(mappedBy = "cashBox")
    @JsonIgnore
    private CashDesk cashDesk;

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

    public CashBox model(String model) {
        this.model = model;
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public CashBoxController getController() {
        return controller;
    }

    public CashBox controller(CashBoxController cashBoxController) {
        this.controller = cashBoxController;
        return this;
    }

    public void setController(CashBoxController cashBoxController) {
        this.controller = cashBoxController;
    }

    public CashDesk getCashDesk() {
        return cashDesk;
    }

    public CashBox cashDesk(CashDesk cashDesk) {
        this.cashDesk = cashDesk;
        return this;
    }

    public void setCashDesk(CashDesk cashDesk) {
        this.cashDesk = cashDesk;
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
        CashBox cashBox = (CashBox) o;
        if (cashBox.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cashBox.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CashBox{" +
            "id=" + getId() +
            ", model='" + getModel() + "'" +
            "}";
    }
}
