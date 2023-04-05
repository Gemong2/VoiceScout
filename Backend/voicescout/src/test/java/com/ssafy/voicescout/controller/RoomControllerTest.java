package com.ssafy.voicescout.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
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
import com.ssafy.voicescout.service.RoomServiceImpl;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(RoomController.class)
public class RoomControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private RoomServiceImpl roomService;

    @Test
    @DisplayName("방생성 성공")
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

        given(roomService.createRoom(any())).willReturn(
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
            .andExpect(jsonPath("$.seq").exists()) //$는 json의 루트를 의미
            .andExpect(jsonPath("$.title").exists())
            .andExpect(jsonPath("$.password").exists())
            .andExpect(jsonPath("$.link").exists())
            .andExpect(jsonPath("$.participant").exists())
            .andExpect(jsonPath("$.locked").exists())
            .andExpect(jsonPath("$.typeId").exists())
            .andDo(print());

        verify(roomService).createRoom(any());
    }

    @Test
    @DisplayName("방 목록조회 성공")
    void getRoomTest() throws Exception {
        //given

        List<RoomDto> list = new ArrayList<>();
        given(roomService.getRooms()).willReturn(
            list);

        String roomSeq = "123";

        //when -then
        mockMvc.perform(
                get("/rooms"))
            .andExpect(status().isOk())
            .andDo(print());  //요청과 응답 출려

        // verify : 해당 객체의 메소드가 실행되었는지 체크해줌
        verify(roomService).getRooms();
    }

    @Test
    @DisplayName("방 조회 성공")
    void getRoomsTest() throws Exception {
        //given
        RoomDto roomReqDto = RoomDto.builder()
            .seq(12L)
            .title("당해보실 분 입장요")
            .password("1234")
            .participant(1)
            .link("q1w2e3r4")
            .locked(true)
            .typeId(1)
            .build();
        RoomDto roomResDto = roomReqDto;

        given(roomService.getRoom(123L)).willReturn(
            roomResDto);

        String roomSeq = "123";

        //when -then
        mockMvc.perform(
                get("/rooms/" + roomSeq))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.seq").exists()) //$는 json의 루트를 의미
            .andExpect(jsonPath("$.title").exists())
            .andExpect(jsonPath("$.password").exists())
            .andExpect(jsonPath("$.link").exists())
            .andExpect(jsonPath("$.participant").exists())
            .andExpect(jsonPath("$.locked").exists())
            .andExpect(jsonPath("$.typeId").exists())
            .andDo(print());  //요청과 응답 출려

        // verify : 해당 객체의 메소드가 실행되었는지 체크해줌
        verify(roomService).getRoom(123L);
    }

    @Test
    @DisplayName("방 수정 성공")
    void updateRoomTest() throws Exception {
        //given
        RoomDto roomReqDto = RoomDto.builder()
            .seq(12L)
            .title("당해보실 분 입장요")
            .password("1234")
            .participant(1)
            .link("q1w2e3r4")
            .locked(true)
            .typeId(1)
            .build();
        RoomDto roomResDto = roomReqDto;
        given(roomService.updateRoom(any())).willReturn(
            roomResDto);

        //when -then
        Gson gson = new Gson();
        String content = gson.toJson(roomReqDto);

        mockMvc.perform(
                put("/rooms")
                    .content(content)
                    .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.seq").exists()) //$는 json의 루트를 의미
            .andExpect(jsonPath("$.title").exists())
            .andExpect(jsonPath("$.password").exists())
            .andExpect(jsonPath("$.link").exists())
            .andExpect(jsonPath("$.participant").exists())
            .andExpect(jsonPath("$.locked").exists())
            .andExpect(jsonPath("$.typeId").exists())
            .andDo(print());  //요청과 응답 출려

        // verify : 해당 객체의 메소드가 실행되었는지 체크해줌
        verify(roomService).updateRoom(any());
    }

    @Test
    @DisplayName("방 삭제 성공")
    void deleteRoomsTest() throws Exception {
        //given
        doNothing().when(roomService).deleteRoom(123L);

        //when -then
        String roomSeq = "123";

        mockMvc.perform(
                delete("/rooms/" + roomSeq))
            .andExpect(status().isOk())
            .andDo(print());  //요청과 응답 출려

        // verify : 해당 객체의 메소드가 실행되었는지 체크해줌
        verify(roomService).deleteRoom(123L);
    }
}
