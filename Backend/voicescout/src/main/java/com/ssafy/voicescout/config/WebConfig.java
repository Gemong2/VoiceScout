package com.ssafy.voicescout.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
//        .allowedOrigins("http://localhost:3000", "https://j8a404.p.ssafy.io", "http://localhost:4433")
        .allowedOrigins("http://localhost:3000",  "http://localhost:4433", "https://j8a404.p.ssafy.io")
        .allowedMethods("*")
        .allowCredentials(true) // 자격증명 허용
        .exposedHeaders("*");
  }
}

