package org.jhipster.tradingsystem.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CashBoxController.
 */
@Entity
@Table(name = "cash_box_controller")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CashBoxController implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne(mappedBy = "controller")
    @JsonIgnore
    private CashBox printer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CashBox getPrinter() {
        return printer;
    }

    public CashBoxController printer(CashBox cashBox) {
        this.printer = cashBox;
        return this;
    }

    public void setPrinter(CashBox cashBox) {
        this.printer = cashBox;
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
        CashBoxController cashBoxController = (CashBoxController) o;
        if (cashBoxController.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cashBoxController.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CashBoxController{" +
            "id=" + getId() +
            "}";
    }
}
