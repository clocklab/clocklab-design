var cat = [
        "Web-production",
        "Услуги дизайна",
        "Маркетинг",
        "SEO",
        "Комплексные решения"
    ],
    subСat = [
        "Landing page <br> Интернет магазин <br> Корпоративный сайт <br> Сайт визитка",
        "UI / UX дизайн <br> Разработка Brand Book",
        "Разработка маркетинговой стратегии <br> Интернет маркетинг",
        "SEO-аудит <br> SEO на этапе создания сайта <br> Снятие санкций поисковых систем",
        ""
    ];

function secondPlay() {
    $("body").removeClass("play");
    var aa = $("ul.secondPlay li.active");

    if (aa.html() == undefined) {
        aa = $("ul.secondPlay li").eq(0);
        aa.addClass("before")
            .removeClass("active")
            .next("li")
            .addClass("active")
            .closest("body")
            .addClass("play");

    }
    else if (aa.is(":last-child")) {
        $("ul.secondPlay li").removeClass("before");
        aa.addClass("before").removeClass("active");
        aa = $("ul.secondPlay li").eq(0);
        aa.addClass("active")
            .closest("body")
            .addClass("play");
    }
    else {
        $("ul.secondPlay li").removeClass("before");
        aa.addClass("before")
            .removeClass("active")
            .next("li")
            .addClass("active")
            .closest("body")
            .addClass("play");
    }
}

function minutePlay() {
    $("body").removeClass("play");
    var aa = $("ul.minutePlay li.active");

    if (aa.html() == undefined) {
        aa = $("ul.minutePlay li").eq(0);
        aa.addClass("before")
            .removeClass("active")
            .next("li")
            .addClass("active")
            .closest("body")
            .addClass("play");

    }
    else if (aa.is(":last-child")) {
        $("ul.minutePlay li").removeClass("before");
        aa.addClass("before").removeClass("active");
        aa = $("ul.minutePlay li").eq(0);
        aa.addClass("active")
            .closest("body")
            .addClass("play");
    }
    else {
        $("ul.minutePlay li").removeClass("before");
        aa.addClass("before")
            .removeClass("active")
            .next("li")
            .addClass("active")
            .closest("body")
            .addClass("play");
    }
}

(function recurse(counter) {
    var catMsg = cat[counter],
        subСatMsg = subСat[counter],
        timer = setTimeout(function() {
            recurse(counter + 1);
            secondPlay();
            minutePlay();
        }, 4000);

    $('#category').html(catMsg).fadeIn(500).delay(3250).fadeOut(250);
    $('#subcategory').html(subСatMsg).fadeIn(500).delay(3250).fadeOut(250);
    
    delete cat[counter];
    delete subСat[counter];
    
    cat.push(catMsg);
    subСat.push(subСatMsg);

    $(".clock-mobile").click(function() {
        recurse(counter + 1);
        clearTimeout(timer);
        secondPlay();
        minutePlay();
    });
})(0);