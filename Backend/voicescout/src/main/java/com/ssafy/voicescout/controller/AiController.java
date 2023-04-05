package com.ssafy.voicescout.controller;

import com.ssafy.voicescout.dto.AiReqDto;
import com.ssafy.voicescout.dto.AiResDto;
import com.ssafy.voicescout.dto.InteractionDto;

import com.ssafy.voicescout.service.AiServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AiController {
  private final SimpMessagingTemplate simpMessagingTemplate;
  private final AiServiceImpl aiService;
  private static String OUT_KEY = "get-out";

  @MessageMapping("/ai")
  //@SendTo("topic") 구독자들에게 보내기
  public void sendAi(@RequestBody InteractionDto interactionDto, SimpMessageHeaderAccessor accessor) {
    log.info("[sendAi] : 메세시 수신 성공, message : {}, link : {}", interactionDto.getMessage(), interactionDto.getLink());
    AiReqDto aiReqDto = AiReqDto.builder()
        .msg(interactionDto.getMessage())
        .build();
    if(OUT_KEY.equals(aiReqDto.getMsg())) {
      AiResDto aiResDto = AiResDto.builder().prediction(2).build();
      log.info("[sendAi] : 방삭제 수신, predition : {}", aiResDto.getPrediction());
      simpMessagingTemplate.convertAndSend("/ai/" + interactionDto.getLink(), aiResDto);
    } else {
      AiResDto aiResDto = aiService.checkMessage(aiReqDto);
      log.info("[sendAi] : predition 수신 성공, predition : {}", aiResDto.getPrediction());
      simpMessagingTemplate.convertAndSend("/ai/" + interactionDto.getLink(), aiResDto);
    }
  }
}
