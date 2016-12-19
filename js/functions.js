function smoothScroll() {
    var a = $(window);
    a.on("mousewheel DOMMouseScroll", function(b) {
        b.preventDefault();
        b = b.originalEvent.wheelDelta / 120 || -b.originalEvent.detail / 3;
        b = a.scrollTop() - parseInt(280 * b);
        TweenMax.to(a, 1.1, {
            scrollTo: {
                y: b,
                autoKill: !0
            },
            ease: Power1.easeOut,
            overwrite: 5
        })
    })
}


/* Set navigation dots to an active state as the user scrolls */
function redrawDotNav(){
    var section1Top =  0;
    // The top of each section is offset by half the distance to the previous section.
    var section2Top =  $('#about1').offset().top - (($('#contact').offset().top - $('#about1').offset().top) / 2);
    var section3Top =  $('#contact').offset().top - (($(document).height() - $('#contact').offset().top) / 2);
    $('nav#primary a').removeClass('active');
    if($(document).scrollTop() >= section1Top && $(document).scrollTop() < section2Top){
        $('nav#primary a.home').addClass('active');
    } else if ($(document).scrollTop() >= section2Top && $(document).scrollTop() < section3Top){
        $('nav#primary a.about1').addClass('active');
    } else if ($(document).scrollTop() >= section3Top){
        $('nav#primary a.contact').addClass('active');
    }
    
}

        var moveItItem = function(el){
            this.el = $(el);
            this.speed = parseInt(this.el.attr('data-scroll-speed'));
        };

        moveItItem.prototype.update = function(scrollTop){
            var pos = scrollTop / this.speed;
            this.el.css('transform', 'translateY(' + -pos + 'px)');
        };

                $.fn.moveIt = function(){
            var $window = $(window);
            var instances = [];

            $(this).each(function(){
                instances.push(new moveItItem($(this)));
            });

            window.onscroll = function(){
                var scrollTop = $window.scrollTop();
                instances.forEach(function(inst){
                inst.update(scrollTop);
                });
            }
        }



function setScrollIcon() {
    setTimeout(function() {
        $(".scrollDown").hasClass("on") ? $(".scrollDown").removeClass("on") : $(".scrollDown").addClass("on");
        setScrollIcon()
    }, 4E3)
}

function detectDevicesandScreens() {
    $ifLargeScreen = function() {
        return 1600 < $(window).width() ? !0 : !1
    }
}

function adapt_mainPic_height() {
    var a = $(window).height();
    $(".mainPicture").height(a)
}

function rotateH1() {
    $(".rotateH1").each(function(a) {
        $(this).prepend('<h1 class="rotateXh1"><span>' + $(this).text() + "</span></h1>")
    });
    (new ScrollScene({
        triggerElement: ".rotateH1FR",
        triggerHook: .85,
        duration: 500
    })).addTo($controller).setTween([TweenMax.fromTo($(".rotateH1FR"), 1, {
        rotationX: -110
    }, {
        rotationX: 0,
        ease: Linear.easeNone
    }), TweenMax.fromTo($(".rotateH1FR").children(".rotateXh1"), 1, {
        backgroundColor: "#dcdbdc"
    }, {
        backgroundColor: "#868586",
        ease: Linear.easeNone
    })]);
    (new ScrollScene({
        triggerElement: ".rotateH1BE",
        triggerHook: 1,
        duration: 500
    })).addTo($controller).setTween([TweenMax.fromTo(".rotateH1BE", 1, {
        rotationX: -110
    }, {
        rotationX: 0,
        ease: Linear.easeNone
    }), TweenMax.fromTo($(".rotateH1BE").children(".rotateXh1"),
        1, {
            backgroundColor: "#DCDBDC"
        }, {
            backgroundColor: "#868586",
            ease: Linear.easeNone
        })])
}

function subnav(a, b, c) {
    var d = a.find("li").length;
    $(".subnav");
    switch (b) {
        case "hover":
            a.find(".subnav").width(177).css({
                overflow: "visible"
            });
            TweenMax.to(a, .35, {
                backgroundColor: "#fff",
                ease: "Expo.easeOut"
            });
            TweenMax.to(a.children("a"), .35, {
                backgroundPosition: "center 0px",
                ease: "Expo.easeOut"
            });
            for ($i = 0; $i <= d; $i++) TweenMax.fromTo(a.find("li").eq($i), .35, {
                rotationX: 89,
                height: 0
            }, {
                delay: .15 * $i,
                rotationX: 0,
                height: c,
                ease: "Expo.easeOut"
            }), TweenMax.to(a.find("li").eq($i).children(".after"), .35, {
                delay: .15 * $i,
                opacity: 0
            });
            categorizr.isDesktop && (a.find("li").on($mouseEventHover, function() {
                subnavLi($(this), "hover")
            }), a.find("li").on($mouseEventOut, function() {
                subnavLi($(this), "out")
            }), a.find("li").on($mouseEventClick, function() {
                var a = $(this).attr("class"),
                    b = 300;
                "home" == a && (b = 500);
                TweenMax.to($(window), 1.3, {
                    scrollTo: {
                        y: $("#" + a).position().top + b
                    },
                    ease: Expo.easeInOut
                })
            }));
            break;
        case "out":
            TweenMax.to(a, .35, {
                backgroundColor: "#01474f",
                ease: "Back.easeOut"
            }), TweenMax.to(a.children("a"), .35, {
                backgroundPosition: "center -22px",
                ease: "Back.easeOut"
            }), a.find(".subnav").width(0).css({
                overflow: "hidden"
            }), TweenMax.to(a.find("li"), 0, {
                height: 0,
                rotationX: 90
            }), TweenMax.to(a.find("li").children(".after"), 0, {
                opacity: 1
            })
    }
}

function subnavLi(a, b) {
    switch (b) {
        case "hover":
            TweenMax.to(a, .3, {
                borderWidth: 2,
                x: 25,
                rotationY: 0,
                ease: "Back.easeInOut"
            });
            TweenMax.fromTo(a.find(".logorub"), .7, {
                rotationY: 0
            }, {
                rotationY: 360,
                ease: Back.easeOut
            });
            break;
        case "out":
            TweenMax.to(a, .3, {
                borderWidth: 0,
                x: 0,
                rotationY: 0,
                ease: "Back.easeInOut"
            })
    }
}

$increment = 0;