FROM azul/zulu-openjdk:11.0.18

# 소스 코드를 복사하여 Docker 이미지 내부에 넣음
COPY . /app

# 작업할 위치로 이동
WORKDIR /app

# 빌드 수행
RUN ./gradlew clean build

# 실행 명령어
CMD ["java", "-jar", "/app/build/libs/voicescout.jar"]
