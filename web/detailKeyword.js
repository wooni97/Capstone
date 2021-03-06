var cur, now, section
// 배너 사이트 이름 클릭
function btnsiteNameClick(){
    location.href = "/web/main.html"
}

// 날짜를 string으로 바꿔주는 함수
function dateToString(curDate){
    var year = curDate.getFullYear()
    var month = curDate.getMonth()+1
    var date = curDate.getDate()

    month = month >=10 ? month : "0" + month
    date  = date  >= 10 ? date : "0" + date
    return today = "" + year + "-" + month + "-" + date
}

// 오늘 하루 전으로 기본 세팅
function setNow(){
    var now = new Date()
    now.setDate(now.getDate()-1)
    now = dateToString(now)
    return now
}

// 버튼 width, height 맞추기
function setYesTom(){
    var width = $("#yes").width()
    var height = $("#yes").height()

    if(height > width){
        $("#yes").css("width", height)
        $("#tom").css("width", height)
    }
    else if(height < width){
        $("#yes").css("height", width)
        $("#tom").css("height", width)
    }
}

function showKeywords(){
    var dateChange = cur.replace(/-/gi, '.')
    $.ajax({
        url: "keywords.php",
        type: "post",
        data: {date : dateChange,
                section : section},
    }).done(function(data) {
        data = $.parseJSON(data)
        var idx = 1, keyword = sessionStorage.getItem('keyword')

        if(data != null){
            var keys = Object.keys(data)
            for(var i = 0; i < keys.length; i++){
                var key = keys[i]
                $(".result.keyword" + (i + 1)).html(data[key])
                if(data[key] == keyword){
                    idx = i + 1
                }
            }
            ClickKeyword($(".result.keyword" + idx))
        }
        else{
            for(var i = 0; i < 5; i++){
                $(".result.keyword" + (i + 1)).html("키워드" + (i + 1))
            }
        }
    })
}

// 키워드 클릭했을 때 색 바꾸고 결과 띄우는 함수
function ClickKeyword(target){
    var keyword = $(target).text()
    sessionStorage.setItem('keyword', keyword) // 키워드 바뀔 때마다 storage 갱신
    $(".result").css("color", "black")
    // $(target).css("color", "red")
    $(target).css("color", "#5271FF")
    $("#DBKeyword").text(keyword)
    showNewsLink()

    dateChange = $("#currentDate").text().replace(/-/gi, '.')

    $.ajax({
        url: "relatedWords.php",
        type: "post",
        data: {date : dateChange,
            keyword : keyword,
            section : section },
        }).done(function(data) {
        data = $.parseJSON(data)
        // console.log(data)

        if(data != null){
            var keys = Object.keys(data)
            var arr = []
            for(var i = 0; i < keys.length; i++){
                var key = keys[i]
                var d = data[key]

                if(key.includes('frequency')){
                    key = key.substr(0, 1)
                    var dataset = {"x" : data[key], "value" : d}
                    arr.push(dataset)
                }
            }
            wordCloud(arr)
        }
    })
    setPosNeg()
    setComments(1)
}

// 날짜 변경 버튼 활성화 / 비활성화 함수
function btnActive(){ $("#tom").removeAttr("disabled");}
function btnInActive(){ $("#tom").attr("disabled", "disabled");}

function toEnglish(str){
    if(str == "정치"){
        return "#politic"
    }
    else if(str == "경제"){
        return "#economy"
    }
    else if(str == "사회"){
        return "#social"
    }
    else if(str == "생활/문화"){
        return "#lifeCulture"
    }
    else if(str == "세계"){
        return "#global"
    }
    else if(str == "IT/과학"){
        return "#science"
    }
}

// 카테고리 버튼 활성화/비활성화 색 변경 함수
function activateButton(){
    btn = toEnglish(section)
    $(btn).css("background-color", "#5271FF") // 주황 #F4B183
}
function inactivateButton(){
    btn = toEnglish(section)
    $(btn).css("background-color", "") //#8497B0
}

function setPosition(){
    // #detail 위치 가운데로
    var width = $(".category").width()
    var padding = $(".category").css("padding-left").replace(/[^-\d\.]/g, '')
    width = width + padding * 2
    $("#detail").css("margin-left", width + "px")
    $("#yes").css("margin-left", width + "px")

    // 메달을 wrapper 정 가운데에 위치시키기
    width = ($(".wrapper").width() - 70) / 2
    $(".medal").css("margin-left", width)

    // 1차 키워드 높이 80%만큼으로 지정하기
    var height = $(window).height() * 0.8
    $(".result1").css("height", height)

    // 단상 아래로 내리기
    $(".wrapper").css("margin-top", height * 0.15)

    // top banner만큼 result1 내리기
    height = $("#date").innerHeight() - 46.4
    $(".main").css("margin-top", height + "px")

    height = $("#date").height()
    $("#selectedKeyword").css("height", height)
}

// <, > 버튼 클릭했을 때 날짜 바꾸는 코드
function moveDate(str){
    cur = new Date(cur)
    if(str == '+'){ cur.setDate(cur.getDate() + 1)}
    else{ cur.setDate(cur.getDate() - 1)}
    cur = dateToString(cur)
    if(cur == now){ btnInActive()}
        
    $("#currentDate").text(cur)
    $('#datePicker').datepicker().datepicker("setDate", cur)
    sessionStorage.setItem('date', cur) // 날짜 바뀔 때마다 storage 갱신
    sessionStorage.setItem('section', '정치')

    inactivateButton()
    section = '정치'
    activateButton()

    showKeywords()
    sessionStorage.setItem('keyword', '')
}

function categoryClick(str){
    inactivateButton()
    section = str
    sessionStorage.setItem('section', section) // 분야 바뀔 때마다 storage 갱신

    activateButton()
    showKeywords()
}

function setComments(react){
    if(react == 1){ // 긍정일 때
        $(".bar.pos").css({'transform':'scale(1.05)'})
        $(".bar.pos").css("color", "white")

        $(".bar.neg").css({'transform':''})
        $(".bar.neg").css("color", "")
    }
    else{ // 부정일 때
        $(".bar.neg").css({'transform':'scale(1.05)'})
        $(".bar.neg").css("color", "white")
        
        $(".bar.pos").css({'transform':''})
        $(".bar.pos").css("color", "")
    }

    dateChange = $("#currentDate").text().replace(/-/gi, '.')
    $.ajax({
        url: "getComments.php",
        type: "post",
        data: {date : dateChange,
            keyword : keyword,
            section : section,
            react : react},
        }).done(function(data) {
            $('#comments').html(data);
    })
}

function setPosNeg(){
    dateChange = $("#currentDate").text().replace(/-/gi, '.')
    keyword = sessionStorage.getItem('keyword')
    $.ajax({
        url: "setPosNeg.php",
        type: "post",
        data: {date : dateChange,
            keyword : keyword,
            section : section },
    }).done(function(data) {
        data = $.parseJSON(data)

        var pos = data["pos"]
        var neg = data["neg"]
        var width = $("#chart").width() * 0.9

        posWidth = (pos / (pos + neg) * 100).toFixed(1)
        negWidth = (neg / (pos + neg) * 100).toFixed(1)

        $(".bar.pos").css("width", width * pos / (pos + neg))
        $(".bar.neg").css("width", width * neg / (pos + neg))

        $(".bar.pos").text(posWidth + "%")
        $(".bar.neg").text(negWidth + "%")

        if(posWidth <= 10){ // 부정 100%
            $(".bar.pos").css("width", width * 0.1)
            $(".bar.neg").css("width", width * 0.9)
        }
        else if(negWidth <= 10){ // 긍정 100%
            $(".bar.pos").css("width", width * 0.9)
            $(".bar.neg").css("width", width * 0.1)
        }
    })
}

function wordCloud(data){
    $("#container").html('')

    var chart = anychart.tagCloud(data)
    chart.angles([0])
    chart.container("container")
    chart.normal().fontWeight(600)
    chart.draw()
    $(".anychart-credits").css("display", "none")
}

function showNewsLink(){
    var keyword = sessionStorage.getItem('keyword')
    var dateChange = cur.replace(/-/gi, '.')
    $.ajax({
        url: "newsLink.php",
        type: "post",
        data: {date: dateChange,
            section: section,
            keyword: keyword},
    }).done(function(data) {
        data = $.parseJSON(data)
    //    console.log(data)
       var keys = Object.keys(data)
       var str = "<a href='"
       for(var i = 0; i < keys.length; i++){
           var key = keys[i]
           var d = data[key]
           var index = key.substr(0, 1)

           if(key.includes('url')){
            str = str + d + "' target='_blank'>"
           }
           else{
            str = str + d + "</a>"
            $("#links li").eq(index).html(str)
            str = "<a href='"
           }
       }
    })
}

$.datepicker.setDefaults({
    showOn: 'button',
    buttonImage: "image/calender.png",
    maxDate : -1,

    dateFormat: 'yy-mm-dd',
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    showMonthAfterYear: true,
    yearSuffix: '년'
})

// top 버튼 클릭
function btnTopClick(){
    $("html, body").animate({scrollTop: 0}, 500)
}

$(document).ready(function(){
    setPosition()
    setYesTom()
    // setChartSize()
    now = setNow()
    cur = now // now = 오늘 날짜, cur = 현재 선택된 날짜

    section = sessionStorage.getItem('section')
    cur = sessionStorage.getItem('date')
    keyword = sessionStorage.getItem('keyword')

    $("#currentDate").text(cur)
    // btnInActive();
    showKeywords()
    activateButton()
    setComments(1)

    $('#datePicker').datepicker().datepicker("setDate", cur)

    $('#datePicker').change(function(){
        cur = dateToString($('#datePicker').datepicker("getDate"))
        $("#currentDate").text(cur)
        sessionStorage.setItem('date', cur) // 날짜 바뀔 때마다 storage 갱신
        showKeywords()
    })

    $(window).scroll(function(){
        if($(this).scrollTop() > 400){
            $('#Top').fadeIn()
        }
        else {
            $('#Top').fadeOut()
        }
    })
})

$(window).resize(function(){
    setPosition()
    setPosNeg()
    setYesTom()
})