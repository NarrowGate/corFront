

$(function() {
    $nav = $(".navButton");
    $subnav = $(".subnav");
    $main = $("#main");
    $liHeightMenu = 130;
    $liHeightShare = 97;
    $minHeightSubnav = 10;
    $controller = new ScrollMagic;
    $mouseEventOut = $mouseEventHover = $mouseEventClick = null;

    categorizr.isDesktop && ($main.addClass("on"), $("body").addClass("desktop"), $mouseEventClick = "click", $mouseEventHover = "mouseenter", $mouseEventOut = "mouseleave");
    categorizr.isTablet && ($("body").addClass("tablet"), $mouseEventHover = $mouseEventClick = "tap", $('<script src="WD_SCRIPTS/JS/iscroll/iscroll.js" type="text/javascript">\x3c/script>').appendTo($("head")),
        $('<script src="WD_SCRIPTS/JS/iscroll/iscroll-probe.js" type="text/javascript">\x3c/script>').appendTo($("head")), $main.wrapInner('<div id="slider"></div>'), $controller = new ScrollMagic({
            container: "#main"
        }), $myScroll = new IScroll("#main", {
            scrollX: !1,
            scrollY: !0,
            scrollbars: "clip",
            useTransition: !0,
            probeType: 3
        }), document.addEventListener("touchmove", function(b) {
            b.preventDefault()
        }, !1), $controller.scrollPos(function() {
            return -$myScroll.y
        }), $myScroll.on("scroll", function() {
            $controller.update()
        }));
    categorizr.isMobile &&
        ($("body").addClass("mobile"), $mouseEventHover = $mouseEventClick = "tap", $date = new Date, $("body").html(""), $('<div class="mobileUnderProgress"><h1>Version mobile en construction<br>Mobile version under construction</h1><img src="./WD_IMAGES/GLOBAL/animation-logo-lempens-design.gif?' + $date.getTime() + '" alt="S\u00c3\u00a9bastien Lempens Design - http://www.lempens-design.com"></div>').prependTo("body"));
    setScrollIcon();
    smoothScroll();
    detectDevicesandScreens();
    adapt_mainPic_height();
    rotateH1();
    redrawDotNav();

    /* Scroll event handler */
    $(window).bind('scroll',function(e){
        redrawDotNav();
    });
    
    /* Next/prev and primary nav btn click handlers */
    $('a.home').click(function(){
        $('html, body').animate({
            scrollTop:0
        }, 1000);
        return false;
    });
    $('a.about1').click(function(){
        $('html, body').animate({
            scrollTop:$('#about1').offset().top
        }, 1000);
        return false;
    });
    $('a.contact').click(function(){
        $('html, body').animate({
            scrollTop:$('#contact').offset().top
        }, 1000);
        return false;
    });
    
    /* Show/hide dot lav labels on hover */
    $('nav#primary a').hover(
        function () {
            $(this).prev('h1').show();
        },
        function () {
            $(this).prev('h1').hide();
        }
    );


    (new ScrollScene({
        triggerElement: "#home .mainPicture",
        triggerHook: 0,
        duration: 5
    })).addTo($controller).on("start", function(b) {
        "FORWARD" == b.scrollDirection && (subnav($(".btn-menu"), "out", $liHeightMenu))
    }).on("end", function(b) {
        "REVERSE" == b.scrollDirection && ($increment = 0, setTimeout(function() {
                $("#awards .counter").html("-")
            },
            300))
    });

    categorizr.isDesktop && (new ScrollScene({
        triggerElement: "#home .mainPicture",
        triggerHook: 0,
        duration: $(window).height()
    })).addTo($controller).setTween(TweenMax.fromTo("#home .mainPicture", 1, {
        backgroundPosition: "center 0px"
    }, {
        backgroundPosition: "center 200px",
        ease: Linear.easeNone
    }));
    categorizr.isDesktop && (new ScrollScene({
        triggerElement: "#home .mainPicture > .fadeMainPicture",
        triggerHook: 0,
        duration: $(window).height()
    })).addTo($controller).setTween(TweenMax.to("#home .mainPicture > .fadeMainPicture",
        1, {
            opacity: .4
        }));



    (new ScrollScene({
        triggerElement: $(".apropos-1"),
        triggerHook: .4,
        offset: 50,
        duration: $(window).height() / 2
    })).addTo($controller).on("start end", function(b) {
        "DURING" == b.state && TweenMax.to($(".apropos-1").find(".stickers_next"), .3, {
            scale: 1,
            ease: Back.easeOut
        })
    }).on("leave", function(b) {
        TweenMax.to($(".apropos-1").find(".stickers_next"), .3, {
            scale: 0,
            ease: Back.easeIn
        })
    });



    (new ScrollScene({
        triggerElement: $(".apropos-1"),
        triggerHook: .4,
        offset: 350,
        duration: $(window).height()
    })).addTo($controller).setTween(TweenMax.to($(".animationMetro"),
        1, {
            css: {
                backgroundPosition: "2000px bottom"
            },
            ease: Linear.easeNone
        }));



    (new ScrollScene({
        triggerElement: "#contact .mainPicture",
        triggerHook: 0,
        duration: 200
    })).addTo($controller).on("start", function(b) {
        "FORWARD" == b.scrollDirection
    });

    categorizr.isDesktop && (new ScrollScene({
        triggerElement: "#contact .mainPicture > .fadeMainPicture",
        triggerHook: 0,
        duration: $(window).height()
    })).addTo($controller).setTween(TweenMax.to("#contact .mainPicture > .fadeMainPicture",
        1, {
            opacity: .4
        }));
    categorizr.isDesktop && (new ScrollScene({
        triggerElement: "#contact .mainPicture",
        triggerHook: 1,
        duration: $(window).height() + 500
    })).addTo($controller).setTween(TweenMax.fromTo("#contact .mainPicture", 1, {
        backgroundPosition: "center -180px"
    }, {
        backgroundPosition: "center 50px",
        ease: Linear.easeNone
    }));



    $(window).resize(function() {
        adapt_mainPic_height();
        detectDevicesandScreens()
    });

    categorizr.isDesktop && ($nav.on($mouseEventHover, function() {
        $(this).hasClass("btn-menu") && $(this).find(".subnav").height() < $minHeightSubnav && subnav($(this), "hover", $liHeightMenu);
    }), $nav.on($mouseEventOut, function() {
        $(this).hasClass("btn-menu") && subnav($(this), "out", $liHeightMenu);
    }));
    if (categorizr.isTablet || categorizr.isMobile) $nav.on($mouseEventClick, function() {
        $(this).hasClass("openSubNav") ? (subnav($(this), "out", 0), $(this).removeClass("openSubNav")) : (subnav($(this), "hover", 130), $(this).addClass("openSubNav"))
    }), $nav.find("li").on("tap", function() {
        $(this).closest(".navButton").hasClass("btn-menu") &&
            ($moveTo = $(this).attr("class"), $myScroll.scrollToElement(document.querySelector("section#" + $moveTo + " .welcomeTitle"), 800, null, -200))
    });

    $('[data-scroll-speed]').moveIt();


});

(function(g, c, d) {
    "undefined" != typeof module ? module.exports = d(g, c) : "function" == typeof define && "object" == typeof define.amd ? define(d) : c[g] = d(g, c)
})("categorizr", this, function(g, c) {
    function d() {
        for (var a = k.length; a--;) e["is" + k[a]] = m(k[a].toLowerCase()), n && (c.$["is" + k[a]] = m(k[a].toLowerCase()));
        b && (p.className = p.className.replace(/(^|\s)desktop|tablet|tv|mobile(\s|$)/, "$1$2") + (" " + h));
        q && c.$(c).trigger("deviceChange", [{
            type: h
        }])
    }
    var f, b = null != c && c == c.window,
        l = !b,
        n = b && c.$,
        q = function() {
            var a;
            return n && (a =
                c.$("").trigger), a
        }(),
        p = l ? null : document.documentElement,
        k = ["Tv", "Desktop", "Tablet", "Mobile"],
        l = function(a) {
            return a.match(/GoogleTV|SmartTV|Internet.TV|NetCast|NETTV|AppleTV|boxee|Kylo|Roku|DLNADOC|CE\-HTML/i) ? "tv" : a.match(/Xbox|PLAYSTATION.3|Wii/i) ? "tv" : a.match(/iPad/i) || a.match(/tablet/i) && !a.match(/RX-34/i) && !a.match(/pc/i) || a.match(/FOLIO/i) ? "tablet" : a.match(/Linux/i) && a.match(/Android/i) && !a.match(/Fennec|mobi|HTC.Magic|HTCX06HT|Nexus.One|SC-02B|fone.945/i) ? "tablet" : a.match(/Kindle/i) || a.match(/Mac.OS/i) &&
                a.match(/Silk/i) ? "tablet" : a.match(/GT-P10|SC-01C|SHW-M180S|SGH-T849|SCH-I800|SHW-M180L|SPH-P100|SGH-I987|zt180|HTC(.Flyer|\_Flyer)|Sprint.ATP51|ViewPad7|pandigital(sprnova|nova)|Ideos.S7|Dell.Streak.7|Advent.Vega|A101IT|A70BHT|MID7015|Next2|nook/i) || a.match(/MB511/i) && a.match(/RUTEM/i) ? "tablet" : a.match(/BOLT|Fennec|Iris|Maemo|Minimo|Mobi|mowser|NetFront|Novarra|Prism|RX-34|Skyfire|Tear|XV6875|XV6975|Google.Wireless.Transcoder/i) ? "mobile" : a.match(/Opera/i) && a.match(/Windows.NT.5/i) && a.match(/HTC|Xda|Mini|Vario|SAMSUNG\-GT\-i8000|SAMSUNG\-SGH\-i9/i) ?
                "mobile" : a.match(/Windows.(NT|XP|ME|9)/) && !a.match(/Phone/i) || a.match(/Win(9|.9|NT)/i) ? "desktop" : a.match(/Macintosh|PowerPC/i) && !a.match(/Silk/i) ? "desktop" : a.match(/Linux/i) && a.match(/X11/i) ? "desktop" : a.match(/Solaris|SunOS|BSD/i) ? "desktop" : a.match(/Bot|Crawler|Spider|Yahoo|ia_archiver|Covario-IDS|findlinks|DataparkSearch|larbin|Mediapartners-Google|NG-Search|Snappy|Teoma|Jeeves|TinEye/i) && !a.match(/Mobile/i) ? "desktop" : "mobile"
        },
        h = l(c.navigator ? c.navigator.userAgent : c.request ? c.request.headers["user-agent"] :
            "No User-Agent Provided"),
        m = function(a) {
            return h === a
        },
        e = function() {
            var a = [].slice.call(arguments, 0);
            return 2 === a.length && h === a[0] ? (h = a[1], d()) : 1 === a.length && "string" == typeof a[0] && (h = a[0], d()), h
        };
    e.is = m;
    e.test = l;
    d();
    if (n) {
        for (f in e) Object.hasOwnProperty.call(e, f) && (c.$["test" == f ? "testUserAgent" : "is" == f ? "isDeviceType" : f] = e[f]);
        c.$.categorizr = e
    }
    return e
});