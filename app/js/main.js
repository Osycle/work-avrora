"use strict";

(function() {
  $(function() {
  

    
    // AOS
    AOS.init({
      offset: 100,
      once: true,
      duration: 1100,
      delay: 150
    });

    setTimeout(function() {
      AOS.refresh();
    }, 1);

    panaAccordion.init({
      id: 'accordion',
      expandWidth: 650,
      //itemWidth: 100,
      extpand: 2,
      autoPlay: !true,
      delay: 2500,
      animateTime: 500,
      borderWidth: 0,
      //deviator: 10,
      bounce:"-50px"
    });
  
    $("#min-menu").mmenu(
      {
        extensions: [
          "pagedim-black", // wrapper-bg black
          "theme-dark",
          //"fullscreen",
          //"listview-50",
          //"fx-panels-slide-up",
          //"fx-listitems-drop",
          "border-offset",
          "position-front",
          "position-right"
        ],
        navbar: {
          title: "Меню"
        },
        navbars: [
          {
            height: 2,
            content: [
              '<div class="close-btn close-content bar">' +
                '<a  href="#page" ><span class="icon-bar"></span><span class="icon-bar"></span></a>' +
                "</div>"
            ]
          },
          {
            content: ["prev", "title"]
          }
        ]
      },
      {}
    );

    // Flikity Carousel
    function flickityPrevNext(className) {
      var carouselWrapper = $(className);
      var carousel = carouselWrapper.find(".carousel-items");
      var carouselPrevNext = carouselWrapper.find(".carousel-prev-next");
      var btnNext = carouselPrevNext.find(".next");
      var btnPrev = carouselPrevNext.find(".prev");
      var flkty = carousel.data("flickity");
      var selected;
      btnNext.on("click", function() {
        carousel.flickity("next", true);
      });

      btnPrev.on("click", function() {
        carousel.flickity("previous", true);
      });
      carousel.on("select.flickity", function() {
        selected = $(flkty.selectedElement);
        //console.log( $(selected).addBack() )
        selected
          .siblings()
          .addBack()
          .removeClass("is-next is-prev");
        selected.next().addClass("is-next");
        selected.prev().addClass("is-prev");
        //console.log( $(flkty.selectedElement).next() )
      });
    }

    var arrowStyle = {
      x0: 10,
      x1: 60,
      y1: 50,
      x2: 70,
      y2: 40,
      x3: 30
    };

    if( $(".short-partners-carousel .carousel-items figure").length > 3 )
      $('.short-partners-carousel .carousel-items').flickity({
        imagesLoaded: true,
        autoPlay: false,
        pauseAutoPlayOnHover: true,
        arrowShape: arrowStyle,
        initialIndex: 2,
        prevNextButtons: true,
        draggable: true,
        wrapAround: true,	
        pageDots: false,
        contain: false,
        percentPosition: true,
        cellAlign: 'center'
      });

    // FANCYBOX
    if ($("[data-fancybox='gallery']").length != 0)
      $("[data-fancybox='gallery']").fancybox({
        afterShow: function(instance, current) {},
        transitionEffect: "zoom-in-out"
      });
    //if( $("[data-fancybox='journal']").length != 0 )
    $("[data-fancybox]").fancybox({
      afterShow: function(instance, current) {
        jarticleCarousel.flickity("resize");
      }
    });

    //$.fancybox.open('');
    if ($(".short-advert-carousel .carousel-items figure").length > 1)
      var carouselAdvert = $(".short-advert-carousel .carousel-items").flickity(
        {
          imagesLoaded: true,
          autoPlay: false,
          pauseAutoPlayOnHover: true,
          arrowShape: arrowStyle,
          initialIndex: 1,
          prevNextButtons: false,
          draggable: true,
          wrapAround: false,
          pageDots: true,
          contain: false,
          percentPosition: true,
          cellAlign: "center"
        }
      );

    var carouselJournal = $(".short-journal-carousel .carousel-items").flickity(
      {
        imagesLoaded: true,
        autoPlay: false,
        pauseAutoPlayOnHover: true,
        arrowShape: arrowStyle,
        initialIndex: 1,
        prevNextButtons: true,
        draggable: false,
        wrapAround: true,
        pageDots: !true,
        contain: false,
        percentPosition: true,
        cellAlign: "center"
      }
    );

    window.carouselArticle = function() {
      if ($(".carousel-article").length >= 0) {
        var carouselMain = $(".carousel-article .carousel-main"),
          carouselNav = $(".carousel-article .carousel-nav");

        for (var i = 0; i < carouselMain.length; i++) {
          var crs = $(carouselMain)
            .eq(i)
            .flickity({
              imagesLoaded: true,
              prevNextButtons: false,
              cellAlign: "center",
              bgLazyLoad: 1,
              //friction: 1,
              //selectedAttraction: 1,
              initialIndex: 0,
              draggable: true,
              contain: true,
              pageDots: false
            });
          var flkty = crs.data("flickity");

          $(carouselNav)
            .eq(i)
            .flickity({
              imagesLoaded: true,
              initialIndex: 0,
              asNavFor: $(carouselMain)[i],
              prevNextButtons: true,
              draggable: true,
              cellAlign: "center",
              adaptiveHeight: true,
              contain: true,
              pageDots: false
            });
        }
      }
    };
    carouselArticle();

    function onLoaded() {
      //MASONRY
      if ($(".grid-img").length != 0) {
        var $grid = $(".grid-img").masonry({
          itemSelector: ".grid-img-item",
          columnWidth: ".grid-img-sizer",
          percentPosition: true
        });
      }
    }
    var index = $(".rev-slider:not(.banner-slider)").length || null;
    if (!index) $(".header-scroll").addClass("header-pages");

    //SCROLL
    var minMenu = $(".header-scroll") || null;
    var headerRange = false;
    $(window).on("scroll", function(e) {
      if ($(window).scrollTop() > 80 && headerRange == false) {
        headerRange = true;
        if (minMenu) minMenu.addClass("scrolled").addClass("down");
      } else if ($(window).scrollTop() < 80 && headerRange == true) {
        headerRange = !true;
        if (minMenu) minMenu.removeClass("scrolled");
      } //.originalEvent.wheelDelta
    });

    $(window).on("mousewheel", function(event) {
      if (!headerRange) return;
      if (event.originalEvent.wheelDelta >= 0) {
        minMenu.removeClass("up");
      } else {
        minMenu.addClass("up");
      }
    });

    window.preLoader = {
      preBox: ".pre-box",
      enter: false,
      status: $(".pre-box").hasClass("in"),

      preToggle: function(bool, func) {
        var endtime = 600;
        if (!this.enter) return;
        if (typeof func === "function")
          setTimeout(function() {
            func();
          }, endtime);
        var preBox = $(this.preBox);

        bool || this.status
          ? preBox.removeClass("in").setTimeout(function() {
              $(preBox).hide();
            }, endtime)
          : preBox
              .show()
              .addClass("in")
              .find(".box-content");

        return (this.status = !this.status);
      },

      preImg: function(img) {
        var images = img || document.images,
          imagesTotalCount = images.length,
          imagesLoadedCount = 0,
          preloadPercent = $(".percent").text("0 %");

        if (imagesTotalCount == 0) {
          preOnload();
          $(preloadPercent).text("100 %");
        }

        for (var i = 0; i < imagesTotalCount; i++) {
          var image_clone = new Image();
          image_clone.onload = image_loaded;
          image_clone.onerror = image_loaded;
          image_clone.src = images[i].src;
        }

        function preOnload() {
          onLoaded();
        }

        function image_loaded() {
          imagesLoadedCount++;

          var per = (100 / imagesTotalCount * imagesLoadedCount) << 0;

          setTimeout(function() {
            //console.log(per);
            $(preloadPercent).text(per + "%");
          }, 1);

          if (imagesLoadedCount >= imagesTotalCount) preOnload();
        }
      }
    };

    preLoader.preImg();

  
  });
})(jQuery);

var isWebkit = /Webkit/i.test(navigator.userAgent),
  isChrome = /Chrome/i.test(navigator.userAgent),
  isMac = /Mac/i.test(navigator.userAgent),
  isMobile = !!("ontouchstart" in window),
  isAndroid = /Android/i.test(navigator.userAgent);

// COMMON FUNCTION

setTimeout(function() {
  //jQuery FUNCITON
  $.fn.onResized = function() {
    onResized(function() {
      this;
    });
    return this;
  };
}, 10);

function checkSm() {
  return $(document).width() <= 991;
}
function checkMd() {
  return $(document).width() < 1199 && !checkSm();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntFloat(min, max) {
  return Math.random() * (max - min) + min;
}
function onResized(f) {
  if (typeof f === "function") f();
  $(window).on("resize", function(e) {
    if (typeof f === "function") f();
  });
  return this;
}
function scrolledDiv(el) {
  try {
    var docViewTop = $(window).scrollTop(),
      docViewBottom = docViewTop + $(window).height(),
      elTop = $(el).offset().top,
      elBottom = elTop + $(el).height() / 1.8;
  } catch (err) {
    console.error();
  }

  return elBottom <= docViewBottom && elTop >= docViewTop;
}
