package com.ssafy.voicescout.service;

import com.ssafy.voicescout.dto.RoomDto;
import com.ssafy.voicescout.entity.Room;
import com.ssafy.voicescout.repository.RoomRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.AdditionalAnswers.returnsFirstArg;
import static org.mockito.Mockito.verify;

public class RoomServiceTest {

    private RoomRepository roomRepository = Mockito.mock(RoomRepository.class);
    private RoomServiceImpl roomService;

    @BeforeEach
    public void setUpTest() {
        roomService = new RoomServiceImpl(roomRepository);
    }

    @Test
    void createRoomTest() {
        //given
        Mockito.when(roomRepository.save(any(Room.class)))
            .then(returnsFirstArg());   //들어간 첫번째 가짜 객체를 반환

        //when
        RoomDto roomReqDto = RoomDto.builder()
            .title("당해보실 분 입장요")
            .password("1234")
            .participant(1)
            .link("q1w2e3r4")
            .locked(true)
            .typeId(1)
            .build();

        RoomDto roomResDto = roomService.createRoom(
            roomReqDto
        );

        //then
        Assertions.assertEquals(roomResDto.getTitle(), "당해보실 분 입장요");
        Assertions.assertEquals(roomResDto.getPassword(), "1234");
        Assertions.assertEquals(roomResDto.getLink(), "q1w2e3r4");

        verify(roomRepository).save(any());
    }

    @Test
    void getRoomsTest() {
        //given
        List<Room> givenRooms = new ArrayList<>();

        Mockito.when(roomRepository.findAll())
            .thenReturn(givenRooms);

        //when
        List<RoomDto> roomList = roomService.getRooms();

        //then
        Assertions.assertEquals(givenRooms.size(), roomList.size());
    }

    @Test
    void getRoomTest() {
        //given
        Room givenRoom = Room.builder()
            .seq(123L)
            .title("들어오세요")
            .participant(1)
            .link("q1w2e3r4")
            .locked(true)
            .typeId(1)
            .password("1234")
            .build();

        Mockito.when(roomRepository.findById(123L))
            .thenReturn(Optional.of(givenRoom));

        //when
        RoomDto roomResDto = roomService.getRoom(123L);

        //then
        Assertions.assertEquals(roomResDto.getSeq(), givenRoom.getSeq());
        Assertions.assertEquals(roomResDto.getTitle(), givenRoom.getTitle());
        Assertions.assertEquals(roomResDto.getPassword(), givenRoom.getPassword());
        Assertions.assertEquals(roomResDto.getLink(), givenRoom.getLink());

        verify(roomRepository).findById(123L);
    }
//    @Test
//    void updateRoomTest() {
//        //given
//        Mockito.when(roomRepository.save(any(Room.class)))
//            .then(returnsFirstArg());   //들어간 첫번째 가짜 객체를 반환
//
//        //when
//        RoomDto roomReqDto = RoomDto.builder()
//            .seq(123L)
//            .title("당해보실 분 입장요")
//            .password("1234")
//            .participant(1)
//            .link("q1w2e3r4")
//            .locked(true)
//            .typeId(1)
//            .build();
//
//        RoomDto roomResDto = roomService.updateRoom(
//            roomReqDto
//        );
//
//        //then
//        Assertions.assertEquals(roomResDto.getTitle(), "당해보실 분 입장요");
//        Assertions.assertEquals(roomResDto.getPassword(), "1234");
//        Assertions.assertEquals(roomResDto.getLink(), "q1w2e3r4");
//
//        verify(roomRepository).save(any());
//    }
    @Test
    void deleteRoomsTest() {
        //given
        Mockito.doNothing().when(roomRepository).deleteById(123L);

        //when
        roomService.deleteRoom(123L);

        //then
        Mockito.verify(roomRepository).deleteById(123L);
    }
}
