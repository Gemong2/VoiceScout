package com.ssafy.voicescout.controller;

import com.ssafy.voicescout.dto.InteractionDto;
import java.nio.charset.StandardCharsets;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AiController {
  private final SimpMessagingTemplate simpMessagingTemplate;

  //    채팅
  @MessageMapping("/ai")
  //@SendTo("topic") 구독자들에게 보내기
  public void sendAi(@Payload byte[] message, @RequestBody InteractionDto interactionDto, SimpMessageHeaderAccessor accessor) {
    String content = new String(message, StandardCharsets.UTF_8);
    log.info("[sendAi] : 메세시 수신, message : {}", message );
    log.info("[sendAi] : 채널아이디 수신, ChannelId : {}", interactionDto.getLink() );
    simpMessagingTemplate.convertAndSend("/ai/" + interactionDto.getLink(), interactionDto);
//    simpMessagingTemplate.convertAndSend("/ai/" + interactionReqDto.getChannelId(), interactionReqDto);
//    simpMessagingTemplate.convertAndSend("/topic/roomId" + interactionReqDto.getChannelId(), interactionReqDto);
  }
}
