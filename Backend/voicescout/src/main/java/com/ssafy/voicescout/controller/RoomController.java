package com.ssafy.voicescout.controller;

import com.ssafy.voicescout.dto.RoomDto;
import com.ssafy.voicescout.service.RoomService;
import com.ssafy.voicescout.service.RoomServiceImpl;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("rooms")
public class RoomController {
  private final RoomServiceImpl roomService;

  @PostMapping(value = "")
  public ResponseEntity<?> createRoom(@RequestBody RoomDto roomReqDto) {
    RoomDto roomResDto = roomService.createRoom(roomReqDto);
    return new ResponseEntity<RoomDto>(roomResDto, HttpStatus.CREATED);
  }
  @PutMapping(value = "")
  public ResponseEntity<?> updateRoom(@RequestBody RoomDto roomReqDto) {
    RoomDto roomResDto = roomService.updateRoom(roomReqDto);
    return new ResponseEntity<RoomDto>(roomResDto, HttpStatus.CREATED);
  }
  @DeleteMapping("/{roomSeq}")
  public void deleteRoom(@PathVariable Long roomSeq) {
    roomService.deleteRoom(roomSeq);
  }

  @GetMapping("")
  public List<RoomDto> getRooms() {
    return roomService.getRooms();
  }
}


