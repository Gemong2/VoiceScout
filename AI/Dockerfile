# 공식 Python 이미지를 기반으로 함
FROM python:3.9.16-slim

# 환경 변수 설정
ENV PYTHONUNBUFFERED 1

# 작업 디렉토리 생성 및 설정
RUN mkdir /app
WORKDIR /app

# 프로젝트의 requirements.txt를 이미지에 복사
COPY requirements.txt /app/

# 필요한 패키지 설치
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# 프로젝트 파일들을 이미지에 복사
COPY . /app/

# manage.py 파일 권한 변경
RUN chmod +x /app/manage.py

# Django 애플리케이션 실행
CMD ["/app/manage.py", "runserver", "0.0.0.0:8000"]
