# 한국항공대학교 Capstone Design(종합 설계)
## + 수정(2022.06)
캡스톤 디자인은 2021년 12월에 마무리가 되었지만, 서버와 관련해서 아쉬움이 남았다.
아파치로 웹 서버를 구축했으나, 우리 규모의 프로젝트에 따로 서버용 컴퓨터가 있는것은 아니기에 컴퓨터를 꺼도 서버가 돌아가고 싶게 만들고 싶었다.
이럴때 클라우드 서비스를 이용하는것이 가장 손쉬운 방법이다.
그렇기에 AWS의 EC2와 RDS를 이용해보았다.

Vpc안에 Public Subnet, Private Subnet으로 구성하였다.
Ec2 인스턴스 퍼블릭 서브넷에 연결하고, 프라이빗 서브넷에는 RDS를 연결하였다. 



## 개요
![1](https://user-images.githubusercontent.com/55667589/198886994-8b6c2bf9-9f16-4c79-a645-498d76a6993b.jpg)

## 시연화면

### 웹페이지 메인 화면
![image](https://user-images.githubusercontent.com/55667589/146503819-25191981-f4b1-4c9d-a8a9-5370e9d69eff.png)

### 자세히 알아보기 버튼 클릭시 이동
![image](https://user-images.githubusercontent.com/55667589/146503901-1bb46c95-96d3-4375-af7e-9b7585525fc8.png)

### 스크롤 내릴 시 – 해당 날짜와 전전날까지의 상위 TOP10 키워드 
![image](https://user-images.githubusercontent.com/55667589/146504031-39adb9c3-8e1b-4a70-b0cb-1fcd20018900.png)

### 원하는 키워드 클릭시 – 화면 넘어감
![image](https://user-images.githubusercontent.com/55667589/146503819-25191981-f4b1-4c9d-a8a9-5370e9d69eff.png)

### 카테고리 별 TOP5 키워드 및 키워드의 기사 댓글 반응 확인 가능
![image](https://user-images.githubusercontent.com/55667589/146504080-2843c6d3-7ca7-4c05-906e-5b8a06211e16.png)
