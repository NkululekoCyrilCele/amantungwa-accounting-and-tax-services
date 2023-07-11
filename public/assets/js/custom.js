jQuery( document ).ready(function( $ ) {


	"use strict";


    
        $(function() {
            $( "#tabs" ).tabs();
        });


        // Page loading animation

        $("#preloader").animate({
            'opacity': '0'
        }, 600, function(){
            setTimeout(function(){
                $("#preloader").css("visibility", "hidden").fadeOut();
            }, 300);
        });       

        $(window).scroll(function() {
          var scroll = $(window).scrollTop();
          var box = $('.header-text').height();
          var header = $('header').height();

          if (scroll >= box - header) {
            $("header").addClass("background-header");
          } else {
            $("header").removeClass("background-header");
          }
        });

        /*$('.owl-testimonials').owlCarousel({
            items: 2, // Number of items to show at a time
            loop: true, // Enable infinite loop
            autoplay: true, // Enable automatic sliding
            smartSpeed: 900,
            autoplayTimeout: 3000, // Slide duration in milliseconds
            autoplayHoverPause: true, // Pause on hover
            nav: false, // Hide navigation buttons
            dots: true // Show navigation dots
          });*/

		if ($('.owl-testimonials').length) {
            $('.owl-testimonials').owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                items: 1,
                margin: 30,
                autoplay: true,
                smartSpeed: 700,
                autoplayHoverPause: true,
                autoplayTimeout: 3000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    460: {
                        items: 1,
                        margin: 0
                    },
                    576: {
                        items: 2,
                        margin: 20
                    },
                    992: {
                        items: 2,
                        margin: 30
                    }
                }
            });
        }

        /*if ($('.owl-partners').length) {
            $('.owl-partners').owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                items: 1,
                margin: 30,
                autoplay: false,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    460: {
                        items: 1,
                        margin: 0
                    },
                    576: {
                        items: 2,
                        margin: 20
                    },
                    992: {
                        items: 4,
                        margin: 30
                    }
                }
            });
        }

        $(".Modern-Slider").slick({
            autoplay:true,
            autoplaySpeed:10000,
            speed:600,
            slidesToShow:1,
            slidesToScroll:1,
            pauseOnHover:false,
            dots:true,
            pauseOnDotsHover:true,
            cssEase:'linear',
           // fade:true,
            draggable:false,
            prevArrow:'<button class="PrevArrow"></button>',
            nextArrow:'<button class="NextArrow"></button>', 
        });

        function visible(partial) {
            var $t = partial,
                $w = jQuery(window),
                viewTop = $w.scrollTop(),
                viewBottom = viewTop + $w.height(),
                _top = $t.offset().top,
                _bottom = _top + $t.height(),
                compareTop = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom;

            return ((compareBottom <= viewBottom) && (compareTop >= viewTop) && $t.is(':visible'));

        }

        $(window).scroll(function(){

          if(visible($('.count-digit')))
            {
              if($('.count-digit').hasClass('counter-loaded')) return;
              $('.count-digit').addClass('counter-loaded');
              
        $('.count-digit').each(function () {
          var $this = $(this);
          jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
            duration: 3000,
            easing: 'swing',
            step: function () {
              $this.text(Math.ceil(this.Counter));
            }
          });
        });
        }
    })*/

    // Operating hours display

    // Get the current date
    const currentDate = new Date();

    // Get the current day of the week
    const currentDay = currentDate.getDay();

    // Define operating hours for each day of the week (1 = Monday, etc.)
    const operatingHours = {
        0: "Closed",
        1: "08:00-17:00",
        2: "08:00-17:00",
        3: "08:00-17:00",
        4: "08:00-17:00",
        5: "08:00-17:00",
        6: "08:00-13:00"
    }

    // Check if it's a Sunday
    const isSunday = currentDay === 0;

    // Check if it's a public holiday
    const isHoliday = isPublicHoliday(currentDate);

    // Function to check if a given date is a public holiday
    function isPublicHoliday(date) {
        const year = date.getFullYear();
        const month = formatTwoDigits(date.getMonth() + 1);
        const day = formatTwoDigits(date.getDate());

        // Fixed-date public holidays
        const fixedHolidays = [
            "01-01", // New Year's Day
            "03-21", // Human Rights Day
            "04-27", // Freedom Day
            "05-01", // Worker's Day
            "06-16", // Youth Day
            "08-09", // National Women's Day
            "09-25", // Heritage Day
            "12-16", // Day of Reconciliation
            "12-25", // Christmas Day
            "12-26"  // Boxing Day
        ];

        // Calculate Easter Sunday
        const a = year % 19;
        const b = Math.floor(year / 100);
        const c = year % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * 1) / 451);
        const n0 = h + l + 7 * m + 114;
        const n = Math.floor(n0 / 31) - 1;
        const p = n0 % 31 + 1;
        const easterSunday = new Date(year, n, p);

        // Dynamic holidays based on Easter Sunday
        const dynamicHolidays = [-2, 0, 1]; // Good Friday, Easter Sunday, Family Day

        // Format date parts as two-digit strings
        function formatTwoDigits(value) {
            return value.toString().padStart(2, "0");
        }

        // Check if the given date matches any of the public holidays
        function matchPublicHoliday(holiday) {
            const [holidayMonth, holidayDay] = holiday.split("-");
            return month === holidayMonth && day === holidayDay;
        }

        // Check if the given date is a fixed-date public holiday
        if (fixedHolidays.some(matchPublicHoliday)) {
            return true;
        }

        // Check if the given date is a dynamic holiday based on Easter Sunday
        for (const dynamicHoliday of dynamicHolidays) {
            const holidayDate = new Date(easterSunday);
            holidayDate.setDate(holidayDate.getDate() + dynamicHoliday);
            if (
                month === formatTwoDigits(holidayDate.getMonth() + 1) &&
                day === formatTwoDigits(holidayDate.getDate())
            ) {
                return true;
            }
        }
        return false;
    }

    // Update the operating hours display
    const operatingHoursElement = $("#operating-hours");

    let workDays = [];

    for (const workDay in operatingHours) {
        if (workDay !== "0") {
            workDays.push(workDay);
        }
    }

    let weekHours = new Set();
    const weekendHours = [];

    for (const oneDay in operatingHours) {
        const workTime = operatingHours[oneDay];

        if (workTime === "08:00-17:00") {
            weekHours.add(workTime);
        } else if (workTime === "08:00-13:00") {
            weekendHours.push(workTime);
        }
    }

    weekHours = Array.from(weekHours);
    workDays = workDays.map(Number);

    if (isSunday || isHoliday) {
        operatingHoursElement.text("Closed");
    } else if (workDays.includes(currentDay)) {
        if (currentDay >= 1 && currentDay <= 5) {
            if (
                !weekHours.includes("08:00-17:00") &&
                !isWithinOperatingHours("08:00-17:00")
            ) {
                operatingHoursElement.text("Closed now");
            } else {
                operatingHoursElement.text(`Open: ${weekHours}`);
            }
        } else if (currentDay === 6) {
            if (
                !weekendHours.includes("08:00-13:00") &&
                !isWithinOperatingHours("08:00-13:00")
            ) {
                operatingHoursElement.text("Closed now");
            } else {
                operatingHoursElement.text(`Open: ${weekendHours}`);
            }
        }
    }

    // Check if the current time is within the specified operating hours
    function isWithinOperatingHours(hours) {
        const [start, end] = hours.split("-");
        const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
        return currentTime >= start && currentTime <= end;
    }

    // Function to start the carousel auto slide
    function startCarouselAutoSlide() {
        // Set the interval time in milliseconds
        const intervalTime = 5000;

        // Trigger the next slide action at the specified interval
        setInterval(() => {
            $('#carouselExampleIndicators').carousel('next');
        }, intervalTime);
    }

    // Start the carousel auto slide
    startCarouselAutoSlide();
});