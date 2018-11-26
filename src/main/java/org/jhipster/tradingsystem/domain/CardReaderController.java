package org.jhipster.tradingsystem.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CardReaderController.
 */
@Entity
@Table(name = "card_reader_controller")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CardReaderController implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne(mappedBy = "controller")
    @JsonIgnore
    private CardReader cardReader;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CardReader getCardReader() {
        return cardReader;
    }

    public CardReaderController cardReader(CardReader cardReader) {
        this.cardReader = cardReader;
        return this;
    }

    public void setCardReader(CardReader cardReader) {
        this.cardReader = cardReader;
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
        CardReaderController cardReaderController = (CardReaderController) o;
        if (cardReaderController.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cardReaderController.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CardReaderController{" +
            "id=" + getId() +
            "}";
    }
}
