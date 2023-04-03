package com.ssafy.voicescout.controller;

import com.ssafy.voicescout.dto.InteractionDto;
import com.ssafy.voicescout.service.AiServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AiController {
  private final SimpMessagingTemplate simpMessagingTemplate;
  private final AiServiceImpl aiService;
  int count = 0;
  //    채팅
  @MessageMapping("/ai")
  public void sendAi(@Payload byte[] message, @RequestBody InteractionDto interactionDto, SimpMessageHeaderAccessor accessor) {
    String content = new String(message, StandardCharsets.UTF_8);
    log.info("[sendAi] : 메세시 수신, message : {}", message );
    log.info("[sendAi] : 채널아이디 수신, ChannelId : {}", interactionDto.getLink() );
    Integer result = aiService.checkMessage(content);
    System.out.println(result);
    testAi(content);
    simpMessagingTemplate.convertAndSend("/ai/" + interactionDto.getLink(), interactionDto);
  }

  @GetMapping("/testAi")
  public ResponseEntity<String> testAi(String msg) {
    // Process the GET request as needed

    // Return a response with some JSON data
    String jsonData = "{\"name\": \"John\", \"age\": 30}";
    Integer result = aiService.checkMessage("돈 주세요");
    if (result == 1){
      jsonData = "yes";
    }
    System.out.println(result);
    return new ResponseEntity<>(jsonData, HttpStatus.OK);
  }
}
