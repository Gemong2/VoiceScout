package com.ssafy.voicescout.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class AiServiceImpl implements AiService {

    @Autowired
    private final RestTemplate restTemplate;

    @Override

    public Integer checkMessage(String msg) {
        String apiUrl = "http://localhost:8000/classification/";
        HttpHeaders headers = new HttpHeaders();
        String jsonString = "{\"param1\":\"" + msg + "\"}";
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer myToken"); // optional: set authorization header
        HttpEntity<String> requestBody = new HttpEntity<>(jsonString, headers);
        Integer response = restTemplate.postForObject(apiUrl, requestBody, Integer.class);
        System.out.println(msg);

        return response;
    }
}
