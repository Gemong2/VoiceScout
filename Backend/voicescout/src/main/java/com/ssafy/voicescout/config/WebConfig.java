package com.ssafy.voicescout.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedOrigins("http://localhost:3000")
//        .allowedOrigins("https://i8a304.p.ssafy.io/*")
        .allowedMethods("*")
        .allowCredentials(true) // 자격증명 허용
        .exposedHeaders("*");
  }
}
