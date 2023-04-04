package com.ssafy.voicescout.service;

import com.ssafy.voicescout.dto.RoomDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public interface RoomService {

  RoomDto updateRoom(RoomDto roomDto);

  RoomDto createRoom(RoomDto roomDto);

  void deleteRoom(long roomSeq);

  List<RoomDto> getRooms();

  RoomDto getRoom(long roomSeq);
}
