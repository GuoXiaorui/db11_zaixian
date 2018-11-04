
resize(750);
$(function () {
    var loadding = document.getElementById("loadding");
    loadding.className = '';
    preload(CONFIG.resouce, function () {
        loadding.className = 'hide';
        $("#loadding").addClass("hide").siblings().removeClass("hide");
        runPage();
    })
})

function runPage() {
    var initKey = "xiaoxue";
    var qiu = $(".qiu-btn");
    var iis = new IScroll(".r", {
        click: function () {
            return true;
        }
    });
    iis.on("scrollStart", function (o) {
        qiu.removeClass("show hidden").addClass("hidden")
    })
    iis.on("scrollEnd", function (o) {
        qiu.removeClass("show hidden").addClass("show")
    })
    $(".nav1").on("touchstart click", function (e) {
        var tis = $(this);
        if (tis.is(".act")) return;
        tis.addClass("act").siblings().removeClass("act");
        initKey = tis.attr("data-key");
        var _html = renderL(getDataL(initKey));
        $(".nav2").html(_html);
        $(".p2").removeClass("xiaoxue chuzhong").addClass(initKey);
        $(".nav2").find('li').eq(0).click();
        e.preventDefault()
    })
    $(".nav2").on("touchstart click", "li", function (e) {
        var tis = $(this);
        if (tis.is(".active")) return false;
        var key2 = tis.attr("data-key");
        var _html = renderR(getDataR(initKey, key2));
        tis.addClass("active").siblings().removeClass("active");
        $(".nav3").html(_html);
        iis.refresh()
        iis.scrollTo(0, 0);
        e.preventDefault()
    })
    $(".nav1").eq(0).click();
    $(".p1-wuzi .btn").on("touchstart", gogo);
    $(".qiu-btn").on("touchstart", gogo);
    function gogo() {
        var isDraw = localStorage.HAS_DRAW;
        if (!isDraw) {
            localStorage.HAS_DRAW = true;
            window.location.href = decodeURIComponent(CONFIG.goDraw);
            localStorage.DRAW_COUNT = 0;
        } else {
            var count = localStorage.DRAW_COUNT;
            if (!count <= 0) {
                msg("您当前可抽奖次数为0，点击右上角分享给朋友或者朋友圈可增加抽奖次数喔！")
            } else {
                localStorage.DRAW_COUNT--;
                if (localStorage.DRAW_COUNT < 0) localStorage.DRAW_COUNT = 0;
                window.location.href = decodeURIComponent(CONFIG.goDraw);
            }
        }
    }
    $(window).resize(function () {
        iis.refresh()
    })
    function getDataL(key) {
        var r = CONFIG.classy[key];
        return r ? r : {};
    }
    function getDataR(key1, key2) {
        var r = CONFIG[key1][key2];
        return r ? r : [];
    }

    function renderL(data) {
        var r = [];
        for (var i in data) {
            r.push('<li data-key="' + i + '">' + data[i] + '</li>')
        }
        return r.join('');
    }
    function renderR(data) {
        var r = [];
        for (var i in data) {
            var d = data[i];
            r.push(([
                '<li class="' + d.type + '">',
                '<div class="d"><div class="t">',
                '<p class="title">' + d.title + '</p>',
                '<p class="time"><span>' + d.time + '</span>&nbsp;开课</p>',
                '<p class="total">共' + d.total + '讲</p>',
                '</div><div class="b">',
                '<p class="oPrice">原价:¥&nbsp;' + d.oPrice + '</p>',
                '<p class="price">活动价:&nbsp;<span>' + d.price + '</span></p>',
                '<a href="' + d.link + '"></a>',
                '</div></div></li>'
            ]).join(''))
        }
        return r.join('');
    }

}
function preload(images, complete) {
    var total = new Array();
    for (var i = 0; i < images.length; i++) {
        var _img = new Image();
        _img.onload = function () {
            total.push(this);
            total.length === images.length && complete && complete();
        };
        _img.src = 'data/img/' + images[i];
    };
}
function resize(W) {
    var resize = function () {
        var ww = $(window).width(), wh = $(window).height();
        var _w = Math.min(ww, wh);
        var _h = Math.max(ww, wh);
        var ml = ww >= wh ? (ww - wh) / 2 : 0;
        var mt = ww >= wh ? -(ww - wh) / 2 : 0;
        $("html").css({ fontSize: (ww / W) * 625 + "%" });
    };
    resize();
    $(window).resize(resize);
}
function msg(d) {
    var scope = this;
    if (d == -1) {
        setTimeout(function () {
            $(".alert").removeClass("in");
            setTimeout(function () {
                $(".alert,.alert-layer").remove();
            }, 600);
        }, 2000);
        return false;
    }
    $("body").append([
        "<div class='alert-layer'></div>",
        "<div class='alert'>",
        d,
        "</div>"
    ].join(""));
    setTimeout(function () {
        $(".alert").addClass("in");
        scope.msg(-1);
    }, 0);
}