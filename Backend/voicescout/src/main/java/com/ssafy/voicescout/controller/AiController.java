package com.ssafy.voicescout.controller;

import com.ssafy.voicescout.dto.AiReqDto;
import com.ssafy.voicescout.dto.AiResDto;
import com.ssafy.voicescout.dto.InteractionDto;

import com.ssafy.voicescout.service.AiServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AiController {
  private final SimpMessagingTemplate simpMessagingTemplate;
  private final AiServiceImpl aiService;
  private static final String OUT_KEY = "get-out";
  private static final String UPDATE_KEY = "update-room";
  private static final String START_KEY = "start-call";

  @MessageMapping("/ai")
  public void sendAi(@RequestBody InteractionDto interactionDto, SimpMessageHeaderAccessor accessor) {
    if(interactionDto.getButton()==3) {
      AiReqDto aiReqDto = AiReqDto.builder()
              .msg(interactionDto.getMessage())
              .build();
      AiResDto aiResDto;
      log.info("[sendAi] : 메세시 수신 성공, message : {}, link : {}", interactionDto.getMessage(), interactionDto.getLink());
      if(OUT_KEY.equals(aiReqDto.getMsg())) {
        aiResDto = AiResDto.builder().prediction(2).build();
        log.info("[sendAi] : 방삭제 수신, prediction : {}", aiResDto.getPrediction());
      } else if(UPDATE_KEY.equals(aiReqDto.getMsg())){
        aiResDto = AiResDto.builder().prediction(3).build();
        log.info("[sendAi] : 방수정 수신, prediction : {}", aiResDto.getPrediction());
      } else if(START_KEY.equals(aiReqDto.getMsg())) {
        aiResDto = AiResDto.builder().prediction(4).build();
        log.info("[sendAi] : 통화시작 수신, prediction : {}", aiResDto.getPrediction());
      }else {
        aiResDto = aiService.checkMessage(aiReqDto);
        log.info("[sendAi] : prediction 수신 성공, prediction : {}", aiResDto.getPrediction());
      }
      simpMessagingTemplate.convertAndSend("/ai/" + interactionDto.getLink(), aiResDto);
    } else {
      log.info("[sendAi] : 버튼 수신 성공, button : {}, userType : {}", interactionDto.getButton(), interactionDto.getUserType());
      simpMessagingTemplate.convertAndSend("/ai/" + interactionDto.getLink(), interactionDto);
    }
  }
//  @MessageMapping("/button")
//  public void sendButton(@RequestBody ButtonDto buttonDto, SimpMessageHeaderAccessor accessor) {
//    log.info("[sendButton] : 버튼 수신 성공, button : {}, link : {}", buttonDto.getButton(), buttonDto.getLink());
//    simpMessagingTemplate.convertAndSend("/button/" + buttonDto.getLink(), buttonDto);
//  }
}
