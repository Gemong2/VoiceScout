package com.ssafy.voicescout.controller;

import static org.mockito.ArgumentMatchers.refEq;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.google.gson.Gson;
import com.ssafy.voicescout.dto.RoomDto;
import com.ssafy.voicescout.entity.Room;
import com.ssafy.voicescout.service.RoomServiceImpl;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@WebMvcTest(RoomController.class)
public class RoomControllerTest {
  @Autowired
  private MockMvc mockMvc;
  @MockBean
  private RoomServiceImpl roomService;

  @Test
  @DisplayName("방생성 테스트")
  void createRoomTest() throws Exception {
    //given
    RoomDto roomReqDto = RoomDto.builder()
        .title("당해보실 분 입장요")
        .password("1234")
        .participant(1)
        .link("q1w2e3r4")
        .locked(true)
        .typeId(1)
        .build();
    RoomDto roomResDto = RoomDto.builder()
        .seq(12L)
        .title("당해보실 분 입장요")
        .password("1234")
        .participant(1)
        .link("q1w2e3r4")
        .locked(true)
        .typeId(1)
        .build();


    given(roomService.createRoom(roomReqDto)).willReturn(
        roomResDto
    );

    //when - then
    Gson gson = new Gson();
    String content = gson.toJson(roomReqDto);

    mockMvc.perform(
        post("/rooms")
            .content(content)
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isCreated())
//        .andExpect(jsonPath("$.seq").exists()) //$는 json의 루트를 의미
//        .andExpect(jsonPath("$.title").exists())
//        .andExpect(jsonPath("$.password").exists())
//        .andExpect(jsonPath("$.link").exists())
        .andDo(print());

//    verify(roomService).createRoom(refEq(roomReqDto));
  }

}
