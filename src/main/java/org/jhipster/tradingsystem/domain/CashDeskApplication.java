package org.jhipster.tradingsystem.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A CashDeskApplication.
 */
@Entity
@Table(name = "cash_desk_application")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CashDeskApplication implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Inventory inventory;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "cash_desk_application_banks",
               joinColumns = @JoinColumn(name="cash_desk_applications_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="banks_id", referencedColumnName="id"))
    private Set<Bank> banks = new HashSet<>();

    @OneToOne(mappedBy = "cashDeskApplication")
    @JsonIgnore
    private CashDesk cashDesk;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public CashDeskApplication inventory(Inventory inventory) {
        this.inventory = inventory;
        return this;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }

    public Set<Bank> getBanks() {
        return banks;
    }

    public CashDeskApplication banks(Set<Bank> banks) {
        this.banks = banks;
        return this;
    }

    public CashDeskApplication addBanks(Bank bank) {
        this.banks.add(bank);
        bank.getCashDeskApplications().add(this);
        return this;
    }

    public CashDeskApplication removeBanks(Bank bank) {
        this.banks.remove(bank);
        bank.getCashDeskApplications().remove(this);
        return this;
    }

    public void setBanks(Set<Bank> banks) {
        this.banks = banks;
    }

    public CashDesk getCashDesk() {
        return cashDesk;
    }

    public CashDeskApplication cashDesk(CashDesk cashDesk) {
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
        CashDeskApplication cashDeskApplication = (CashDeskApplication) o;
        if (cashDeskApplication.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cashDeskApplication.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CashDeskApplication{" +
            "id=" + getId() +
            "}";
    }
}
