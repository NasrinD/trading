package org.jhipster.tradingsystem.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Printer.
 */
@Entity
@Table(name = "printer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Printer implements Serializable {

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
    private PrinterController controller;

    @OneToOne(mappedBy = "printer")
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

    public Printer model(String model) {
        this.model = model;
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public PrinterController getController() {
        return controller;
    }

    public Printer controller(PrinterController printerController) {
        this.controller = printerController;
        return this;
    }

    public void setController(PrinterController printerController) {
        this.controller = printerController;
    }

    public CashDesk getCashDesk() {
        return cashDesk;
    }

    public Printer cashDesk(CashDesk cashDesk) {
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
        Printer printer = (Printer) o;
        if (printer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), printer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Printer{" +
            "id=" + getId() +
            ", model='" + getModel() + "'" +
            "}";
    }
}
