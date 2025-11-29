package com.example.demoapi.config; // Đổi theo package của bạn

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        // 1. Cho phép tất cả các domain (hoặc bạn có thể chỉ định cụ thể domain frontend)
        // Dùng Pattern thay vì "*" để hoạt động được với setAllowCredentials(true)
        corsConfiguration.setAllowedOriginPatterns(List.of("*"));

        // 2. Cho phép các method
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));

        // 3. Cho phép các header (Authorization, Content-Type...)
        corsConfiguration.setAllowedHeaders(Arrays.asList("*"));

        // 4. Cho phép gửi Cookie/Credentials (QUAN TRỌNG cho AuthController của bạn)
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return new CorsFilter(source);
    }
}