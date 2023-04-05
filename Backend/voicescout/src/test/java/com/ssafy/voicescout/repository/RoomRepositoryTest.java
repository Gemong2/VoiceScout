package com.ssafy.voicescout.repository;

import com.ssafy.voicescout.entity.Room;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class RoomRepositoryTest {
    @Autowired
    private RoomRepository roomRepository;

    @Test
    void createRoom() {
        //given
        Room room = Room.builder()
            .title("들어오세요")
            .participant(1)
            .link("q1w2e3r4")
            .locked(true)
            .typeId(1)
            .password("1234")
            .build();

        //when
        Room savedRoom = roomRepository.save(room);

        //then
        Assertions.assertEquals(room.getTitle(), savedRoom.getTitle());
        Assertions.assertEquals(room.getPassword(), savedRoom.getPassword());
        Assertions.assertEquals(room.getLink(), savedRoom.getLink());
    }

    @Test
    void getRoom() {
        //given
        Room room = Room.builder()
            .title("들어오세요")
            .participant(1)
            .link("q1w2e3r4")
            .locked(true)
            .typeId(1)
            .password("1234")
            .build();

        Room savedRoom = roomRepository.saveAndFlush(room);

        //when
        Room foundRoom = roomRepository.findById(savedRoom.getSeq()).get();

        //then
        Assertions.assertEquals(foundRoom.getSeq(), savedRoom.getSeq());
        Assertions.assertEquals(foundRoom.getTitle(), savedRoom.getTitle());
        Assertions.assertEquals(foundRoom.getPassword(), savedRoom.getPassword());
        Assertions.assertEquals(foundRoom.getLink(), savedRoom.getLink());
    }
}
