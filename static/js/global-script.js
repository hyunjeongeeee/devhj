document.addEventListener('DOMContentLoaded', () => {
    const mainWrap = document.getElementsByClassName('main-wrap'); // 여러 요소 선택

    for (let i = 0; i < mainWrap.length; i++) {
        mainWrap[i].classList.add('main-visible'); // 각 요소에 fade-in 효과
    }
    // 네비게이션 링크 클릭 이벤트
    $('nav ul li a').click(function(e) {
        e.preventDefault(); // 기본 동작 방지 (바로 이동하지 않도록)

        // 클릭한 링크의 href 속성 (예: #header, #resume 등) 가져오기
        var targetSection = $(this).attr('href');
        var headerHeight = $('#header').outerHeight(); // 헤더 높이 가져오기

        // 해당 섹션으로 스크롤 애니메이션 적용
        $('html, body').animate({
            scrollTop: $(targetSection).offset().top - headerHeight
        }, 100, 'linear'); // 500ms 동안 스크롤 (원하는 대로 조정 가능)
    });



    $(function(){
        // 	이미지 클릭시 해당 이미지 모달
        $(".imgC").click(function(){
            console.log("이미지 클릭");
            $(".modal").show();
            // 해당 이미지 가겨오기
            var imgSrc = $(this).children("img").attr("src");
            var imgAlt = $(this).children("img").attr("alt");
            $(".modalBox img").attr("src", imgSrc);
            $(".modalBox img").attr("alt", imgAlt);

            // 해당 이미지 텍스트 가져오기
            var imgTit =  $(this).children("p").text();
            $(".modalBox p").text(imgTit);

        });

        //.modal안에 button을 클릭하면 .modal닫기
        $(".modal button").click(function(){
            $(".modal").hide();
        });

        //.modal밖에 클릭시 닫힘
        $(".modal").click(function (e) {
            if (e.target.className != "modal") {
                return false;
            } else {
                $(".modal").hide();
            }
        });
    });

});



