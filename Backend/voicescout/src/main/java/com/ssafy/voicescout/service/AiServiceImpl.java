package com.ssafy.voicescout.service;

import com.ssafy.voicescout.dto.AiDtoRequest;
import com.ssafy.voicescout.dto.AiDtoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class AiServiceImpl implements AiService {

    @Autowired
    private final RestTemplate restTemplate;


    @Override
    public AiDtoResponse checkMessage(AiDtoRequest msg) {
        String apiUrl = "http://localhost:8000/classification/";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String jsonString = "{\"msg\":\"" + msg + "\"}";
        HttpEntity<String> requestBody = new HttpEntity<>(jsonString, headers);
        ResponseEntity<AiDtoResponse> response = restTemplate.postForEntity(apiUrl, requestBody, AiDtoResponse.class);
        if (response.getStatusCodeValue() == 200){
            return response.getBody();
        }
        return null;
    }
}
