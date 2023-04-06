package com.ssafy.voicescout.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ButtonDto {
    private int button;
    private int userType;
//    String link;
}
