package com.ssafy.voicescout.service;

import com.ssafy.voicescout.dto.AiDtoRequest;
import com.ssafy.voicescout.dto.AiDtoResponse;
import org.springframework.stereotype.Service;

@Service
public interface AiService {

    AiDtoResponse checkMessage(AiDtoRequest msg);

}
