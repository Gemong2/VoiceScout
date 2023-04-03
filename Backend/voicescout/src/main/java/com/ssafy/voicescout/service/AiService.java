package com.ssafy.voicescout.service;

import org.springframework.stereotype.Service;

@Service
public interface AiService {

    Integer checkMessage(String msg);

}
