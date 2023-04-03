package com.ssafy.voicescout.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class RoomDto {
  private long seq;
  private int typeId;
  private String title;
  private String password;
  private int participant;
  private boolean locked;
  private String link;

}
