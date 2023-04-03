package com.ssafy.voicescout.controller;

import com.ssafy.voicescout.dto.InteractionReqDto;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;
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
  public void sendAi(@Payload byte[] message, SimpMessageHeaderAccessor accessor) {
    String content = new String(message, StandardCharsets.UTF_8);
    log.info("[sendAi] : 메세시 수신, content : {}", content );
    simpMessagingTemplate.convertAndSend("/chat/" + interactionReqDto.getChannelId(), interactionReqDto);
//    System.out.println(interactionReqDto.getContent());
//    System.out.println("/ai/" + interactionReqDto.getChannelId());
//    simpMessagingTemplate.convertAndSend("/ai/" + interactionReqDto.getChannelId(), interactionReqDto);
//        simpMessagingTemplate.convertAndSend("/topic/roomId" + interactionReqDto.getChannelId(), interactionReqDto);
  }
}
