package com.fieldtraining.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // "/uploads/**" 경로를 "C:/proofData/uploads/" 폴더로 매핑
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:/C:/proofData/uploads/");
    }
}
