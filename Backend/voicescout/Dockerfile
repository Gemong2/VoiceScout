FROM azul/zulu-openjdk:11.0.18

# 작업 디렉토리 생성
RUN mkdir /app

# 작업할 위치로 이동
WORKDIR /app

# 빌드된 jar 파일 복사
COPY build/libs/*.jar /app/

# 실행 명령어
CMD ["java", "-jar", "/app/back.jar"]
