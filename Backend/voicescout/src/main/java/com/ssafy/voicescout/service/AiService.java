package com.ssafy.voicescout.service;

import com.ssafy.voicescout.dto.AiReqDto;
import com.ssafy.voicescout.dto.AiResDto;
import org.springframework.stereotype.Service;

@Service
public interface AiService {

    AiResDto checkMessage(AiReqDto msg);

}
