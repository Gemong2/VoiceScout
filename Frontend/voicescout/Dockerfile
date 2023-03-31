FROM nginx

# 빌드된 React 애플리케이션 파일을 작업 폴더에 복사
COPY build/ /usr/share/nginx/html

# Nginx 서버를 실행
CMD ["nginx", "-g", "daemon off;"]
