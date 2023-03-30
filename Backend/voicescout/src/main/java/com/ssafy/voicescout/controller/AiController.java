package com.ssafy.voicescout.controller;

import com.ssafy.voicescout.dto.InteractionReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AiController {
  private final SimpMessagingTemplate simpMessagingTemplate;

  //    채팅
  @MessageMapping("/ai")
  //@SendTo("topic") 구독자들에게 보내기
  public void sendChat(@RequestBody InteractionReqDto interactionReqDto, SimpMessageHeaderAccessor accessor) {
    System.out.println("--------------------");
    System.out.println(interactionReqDto.getContent());
    System.out.println("/ai/" + interactionReqDto.getChannelId());
    simpMessagingTemplate.convertAndSend("/ai/" + interactionReqDto.getChannelId(), interactionReqDto);
//        simpMessagingTemplate.convertAndSend("/topic/roomId" + interactionReqDto.getChannelId(), interactionReqDto);
  }
}
