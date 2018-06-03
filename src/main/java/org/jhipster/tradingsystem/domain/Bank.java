package org.jhipster.tradingsystem.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Bank.
 */
@Entity
@Table(name = "bank")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Bank implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address")
    private String address;

    @OneToMany(mappedBy = "bank")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Customer> customers = new HashSet<>();

    @OneToMany(mappedBy = "bank")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Debit> debits = new HashSet<>();

    @ManyToMany(mappedBy = "banks")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CashDeskApplication> cashDeskApplications = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Bank name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public Bank address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Set<Customer> getCustomers() {
        return customers;
    }

    public Bank customers(Set<Customer> customers) {
        this.customers = customers;
        return this;
    }

    public Bank addCustomers(Customer customer) {
        this.customers.add(customer);
        customer.setBank(this);
        return this;
    }

    public Bank removeCustomers(Customer customer) {
        this.customers.remove(customer);
        customer.setBank(null);
        return this;
    }

    public void setCustomers(Set<Customer> customers) {
        this.customers = customers;
    }

    public Set<Debit> getDebits() {
        return debits;
    }

    public Bank debits(Set<Debit> debits) {
        this.debits = debits;
        return this;
    }

    public Bank addDebits(Debit debit) {
        this.debits.add(debit);
        debit.setBank(this);
        return this;
    }

    public Bank removeDebits(Debit debit) {
        this.debits.remove(debit);
        debit.setBank(null);
        return this;
    }

    public void setDebits(Set<Debit> debits) {
        this.debits = debits;
    }

    public Set<CashDeskApplication> getCashDeskApplications() {
        return cashDeskApplications;
    }

    public Bank cashDeskApplications(Set<CashDeskApplication> cashDeskApplications) {
        this.cashDeskApplications = cashDeskApplications;
        return this;
    }

    public Bank addCashDeskApplications(CashDeskApplication cashDeskApplication) {
        this.cashDeskApplications.add(cashDeskApplication);
        cashDeskApplication.getBanks().add(this);
        return this;
    }

    public Bank removeCashDeskApplications(CashDeskApplication cashDeskApplication) {
        this.cashDeskApplications.remove(cashDeskApplication);
        cashDeskApplication.getBanks().remove(this);
        return this;
    }

    public void setCashDeskApplications(Set<CashDeskApplication> cashDeskApplications) {
        this.cashDeskApplications = cashDeskApplications;
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
        Bank bank = (Bank) o;
        if (bank.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bank.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Bank{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            "}";
    }
}
