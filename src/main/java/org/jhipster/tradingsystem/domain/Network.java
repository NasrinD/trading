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
 * A Network.
 */
@Entity
@Table(name = "network")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Network implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "network")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AcquiringBank> acquiringBanks = new HashSet<>();

    @OneToMany(mappedBy = "network")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<IssuingBank> issuingBanks = new HashSet<>();

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

    public Network name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<AcquiringBank> getAcquiringBanks() {
        return acquiringBanks;
    }

    public Network acquiringBanks(Set<AcquiringBank> acquiringBanks) {
        this.acquiringBanks = acquiringBanks;
        return this;
    }

    public Network addAcquiringBanks(AcquiringBank acquiringBank) {
        this.acquiringBanks.add(acquiringBank);
        acquiringBank.setNetwork(this);
        return this;
    }

    public Network removeAcquiringBanks(AcquiringBank acquiringBank) {
        this.acquiringBanks.remove(acquiringBank);
        acquiringBank.setNetwork(null);
        return this;
    }

    public void setAcquiringBanks(Set<AcquiringBank> acquiringBanks) {
        this.acquiringBanks = acquiringBanks;
    }

    public Set<IssuingBank> getIssuingBanks() {
        return issuingBanks;
    }

    public Network issuingBanks(Set<IssuingBank> issuingBanks) {
        this.issuingBanks = issuingBanks;
        return this;
    }

    public Network addIssuingBanks(IssuingBank issuingBank) {
        this.issuingBanks.add(issuingBank);
        issuingBank.setNetwork(this);
        return this;
    }

    public Network removeIssuingBanks(IssuingBank issuingBank) {
        this.issuingBanks.remove(issuingBank);
        issuingBank.setNetwork(null);
        return this;
    }

    public void setIssuingBanks(Set<IssuingBank> issuingBanks) {
        this.issuingBanks = issuingBanks;
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
        Network network = (Network) o;
        if (network.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), network.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Network{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
