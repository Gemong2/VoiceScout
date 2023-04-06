package com.ssafy.voicescout.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
  //첫 웹소켓 핸드쉐이크를 위한 설정
  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/webSocket")
        .setAllowedOriginPatterns("*")
        .withSockJS();
  }

  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
//메시지브로커가 바로 구독자들에게 보냄
// 통상적으로 queue는 일대일 topic은 브로드캐스트
    registry.enableSimpleBroker("/ai", "/button");
//메시지 핸들러로 라우팅됨
    registry.setApplicationDestinationPrefixes("/");
  }
}