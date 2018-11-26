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
 * A AcquiringBank.
 */
@Entity
@Table(name = "acquiring_bank")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AcquiringBank implements Serializable {

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

    @OneToMany(mappedBy = "acquiringBank")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CardReader> cardReaders = new HashSet<>();

    @ManyToOne
    private Network network;

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

    public AcquiringBank name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public AcquiringBank address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Set<CardReader> getCardReaders() {
        return cardReaders;
    }

    public AcquiringBank cardReaders(Set<CardReader> cardReaders) {
        this.cardReaders = cardReaders;
        return this;
    }

    public AcquiringBank addCardReaders(CardReader cardReader) {
        this.cardReaders.add(cardReader);
        cardReader.setAcquiringBank(this);
        return this;
    }

    public AcquiringBank removeCardReaders(CardReader cardReader) {
        this.cardReaders.remove(cardReader);
        cardReader.setAcquiringBank(null);
        return this;
    }

    public void setCardReaders(Set<CardReader> cardReaders) {
        this.cardReaders = cardReaders;
    }

    public Network getNetwork() {
        return network;
    }

    public AcquiringBank network(Network network) {
        this.network = network;
        return this;
    }

    public void setNetwork(Network network) {
        this.network = network;
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
        AcquiringBank acquiringBank = (AcquiringBank) o;
        if (acquiringBank.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), acquiringBank.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AcquiringBank{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            "}";
    }
}
