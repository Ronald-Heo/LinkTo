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



## gulp 기능

gulp에는 4가지의 기능이 있다.

1. gulp.task
2. gulp.scr
3. gulp.dest
4. gulp.watch

먼저 task는 gulp가 처리해야될 작업들을 정의한다.
두번째로 scr는 어떤 파일을 읽을지 정한다.
세번째로 dest는 어디에 저장할지를 정한다.
마지막으로 watch는 전달된 glob에 해당하는 파일이 있는지 보고있다가 변동이 있을 때 task를 실행한다.


해당 프로젝트에서 사용할 gulp의 플러그인들은 다음과 같다.
- gulp-uglify
- gulp-clean-css
- gulp-htmlmin
- gulp-imagemin




