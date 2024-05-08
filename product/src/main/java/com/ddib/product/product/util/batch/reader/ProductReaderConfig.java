package com.ddib.product.product.util.batch.reader;

import com.ddib.product.product.domain.FavoriteProduct;
import com.ddib.product.product.domain.Product;
import com.ddib.product.product.util.batch.job.ProductJobConfig;
import jakarta.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class ProductReaderConfig {

    private final EntityManagerFactory emf;

    @StepScope
    @Bean
    public JpaPagingItemReader<FavoriteProduct> productAlarmReader(){
        // TODO : 24시간, 1시간 각각에 따라 구분해주는 칼럼 추가 필요
        String query = ("select fp from FavoriteProduct fp where (day(fp.product.eventStartDate) - day(now()) = 1 and hour(fp.product.eventStartDate) = hour(now())) OR (day(fp.product.eventStartDate) - day(now()) = 0 and fp.product.eventStartTime - hour(now()) = 1 )");
        return new JpaPagingItemReaderBuilder<FavoriteProduct>()
                .entityManagerFactory(emf)
                .queryString(query)
                .pageSize(ProductJobConfig.CHUNK_SIZE)
                .name("productAlarmReader")
                .build();
    }

}
