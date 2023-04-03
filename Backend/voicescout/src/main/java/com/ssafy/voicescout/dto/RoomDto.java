package com.ssafy.voicescout.dto;

import java.time.LocalDateTime;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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
  private boolean locked;
  private String password;
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
  private LocalDateTime registDate;

}
