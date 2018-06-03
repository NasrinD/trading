package org.jhipster.tradingsystem.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(org.jhipster.tradingsystem.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.PersistentToken.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.User.class.getName() + ".persistentTokens", jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.Store.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.CashDesk.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.CashDesk.class.getName() + ".cashiers", jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.CashDeskApplication.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.CashDeskApplication.class.getName() + ".banks", jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.CashDeskGUI.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.CashBox.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.CashBoxController.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.Printer.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.PrinterController.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.BarCodeScanner.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.BarCodeScannerController.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.CardReader.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.CardReaderController.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.Bank.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.Bank.class.getName() + ".customers", jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.Bank.class.getName() + ".debits", jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.Bank.class.getName() + ".cashDeskApplications", jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.Customer.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.Customer.class.getName() + ".debits", jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.Customer.class.getName() + ".receipts", jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.Debit.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.Receipt.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.Receipt.class.getName() + ".receiptItems", jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.ReceiptItem.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.Inventory.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.Inventory.class.getName() + ".stockItems", jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.StockItem.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.tradingsystem.domain.Product.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
