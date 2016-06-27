#LinkTo

###### 데이터 시각화 프로젝트

## 기능


## API


## 설치
```
cd linkto
npm install
```

## 데이터베이스 설정
```
use mysql

create user linkto;
create user linkto@localhost identified by '[PASSWORD]';

create database linkto;
grant all privileges on linkto.* to linkto@localhost;
flush privileges;


```

## 실행
설정 예시 파일을 복사하여 설정 파일을 만들고, 세부 내용을 수정한다.

```
cp config.example.json config.json
vi config.json
```

## 테스트
