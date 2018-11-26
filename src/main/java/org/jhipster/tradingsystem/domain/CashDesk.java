package org.jhipster.tradingsystem.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CashDesk.
 */
@Entity
@Table(name = "cash_desk")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CashDesk implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Printer printer;

    @OneToOne
    @JoinColumn(unique = true)
    private CashBox cashBox;

    @OneToOne
    @JoinColumn(unique = true)
    private CashDeskGUI cashDeskGui;

    @OneToOne
    @JoinColumn(unique = true)
    private BarCodeScanner barCodeScanner;

    @OneToOne
    @JoinColumn(unique = true)
    private CardReader cardReader;

    @OneToOne
    @JoinColumn(unique = true)
    private CashDeskApplication cashDeskApplication;

    @OneToOne(mappedBy = "cashDesk")
    @JsonIgnore
    private Store store;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Printer getPrinter() {
        return printer;
    }

    public CashDesk printer(Printer printer) {
        this.printer = printer;
        return this;
    }

    public void setPrinter(Printer printer) {
        this.printer = printer;
    }

    public CashBox getCashBox() {
        return cashBox;
    }

    public CashDesk cashBox(CashBox cashBox) {
        this.cashBox = cashBox;
        return this;
    }

    public void setCashBox(CashBox cashBox) {
        this.cashBox = cashBox;
    }

    public CashDeskGUI getCashDeskGui() {
        return cashDeskGui;
    }

    public CashDesk cashDeskGui(CashDeskGUI cashDeskGUI) {
        this.cashDeskGui = cashDeskGUI;
        return this;
    }

    public void setCashDeskGui(CashDeskGUI cashDeskGUI) {
        this.cashDeskGui = cashDeskGUI;
    }

    public BarCodeScanner getBarCodeScanner() {
        return barCodeScanner;
    }

    public CashDesk barCodeScanner(BarCodeScanner barCodeScanner) {
        this.barCodeScanner = barCodeScanner;
        return this;
    }

    public void setBarCodeScanner(BarCodeScanner barCodeScanner) {
        this.barCodeScanner = barCodeScanner;
    }

    public CardReader getCardReader() {
        return cardReader;
    }

    public CashDesk cardReader(CardReader cardReader) {
        this.cardReader = cardReader;
        return this;
    }

    public void setCardReader(CardReader cardReader) {
        this.cardReader = cardReader;
    }

    public CashDeskApplication getCashDeskApplication() {
        return cashDeskApplication;
    }

    public CashDesk cashDeskApplication(CashDeskApplication cashDeskApplication) {
        this.cashDeskApplication = cashDeskApplication;
        return this;
    }

    public void setCashDeskApplication(CashDeskApplication cashDeskApplication) {
        this.cashDeskApplication = cashDeskApplication;
    }

    public Store getStore() {
        return store;
    }

    public CashDesk store(Store store) {
        this.store = store;
        return this;
    }

    public void setStore(Store store) {
        this.store = store;
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
        CashDesk cashDesk = (CashDesk) o;
        if (cashDesk.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cashDesk.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CashDesk{" +
            "id=" + getId() +
            "}";
    }
}
