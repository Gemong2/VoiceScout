package com.ssafy.voicescout.controller;


import com.ssafy.voicescout.repository.RoomRepository;
import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;

import java.util.Map;
import javax.annotation.PostConstruct;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class OpenviduController {

  @Value("${OPENVIDU_URL}")
  private String OPENVIDU_URL;

  @Value("${OPENVIDU_SECRET}")
  private String OPENVIDU_SECRET;

  private OpenVidu openvidu;
  private final RoomRepository roomRepository;

  @PostConstruct
  public void init() {
    this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
  }

  /**
   * @param params The Session properties
   * @return The Session ID
   */
  @PostMapping("/sessions")
  public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
      throws OpenViduJavaClientException, OpenViduHttpException {
//    SessionProperties properties = SessionProperties.fromJson(params).build();
    SessionProperties properties = new SessionProperties.Builder()
        .customSessionId((String) params.get("customSessionId"))
        .build();

    Session session = openvidu.createSession(properties);
    log.info("[initializeSession] : 세션초기화, customSessionId : {}", (String) params.get("customSessionId"));
    return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
  }

  /**
   * @param sessionId The Session in which to create the Connection
   * @param params    The Connection properties
   * @return The Token associated to the Connection
   */
  @PostMapping("/sessions/{sessionId}/connections")
  public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
      @RequestBody(required = false) Map<String, Object> params)
      throws OpenViduJavaClientException, OpenViduHttpException {
    Session session = openvidu.getActiveSession(sessionId);
    if (session == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
    Connection connection = session.createConnection(properties);
    log.info("[initializeSession] : 커넥션 생성 완료, 연결 수 : {}", session.getConnections().size());
    return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
  }

}
