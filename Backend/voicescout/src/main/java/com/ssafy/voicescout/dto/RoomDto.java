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
  private String title;
  private String password;
  private int typeId;
  private String link;
  private int participant;
  private boolean locked;
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
  private LocalDateTime registDate;

}
