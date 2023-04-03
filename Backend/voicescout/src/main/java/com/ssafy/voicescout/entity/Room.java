package com.ssafy.voicescout.entity;

import com.ssafy.voicescout.dto.RoomDto;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
@Table(name = "room")
public class Room {
  @Id
  @GeneratedValue
  private long seq;
  private String title;
  private boolean locked;
  private String password;
  private int participant;
  private String link; //세션 아이디
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
  private LocalDateTime registDate;

  private int typeId;

  public void updateRoom(RoomDto roomDto) {
    this.title = roomDto.getTitle();
    this.participant = roomDto.getParticipant();
    this.link = roomDto.getLink();
    this.password = roomDto.getPassword();
    this.locked = roomDto.isLocked();
    this.typeId = roomDto.getTypeId();
  }


}
