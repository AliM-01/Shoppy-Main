window.onload = function () {
    document.addEventListener("DOMContentLoaded", init(), false);

function init() {
    
}
    // /*-----------------
    //     Menu Stick
    // -----------------*/
    var header = document.getElementsByClassName("sticky-bar")[0];
    var scrollUpBtn = document.getElementById("scrollUp");
    var win = $(window);
    win.on('scroll', function () {
        var scroll = win.scrollTop();

        if (scroll > 20 || scroll > 20) {
            scrollUpBtn.style.display = "block";
        } else {
            scrollUpBtn.style.display = "none";
        }

        if (scroll < 200) {
            header.classList.remove('stick');
        } else {
            header.classList.add('stick');
        }
    });

    scrollUpBtn.addEventListener("click", () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });


    /*====== Sidebar menu Active ======*/
    var navbarTrigger = document.getElementById('burger_icon');
    var endTrigger = document.getElementById('mobile_menu_close');
    var container = document.getElementsByClassName("mobile-header-active")[0];
    var wrapper4 = document.getElementsByTagName('body')[0];

    let body_overlay = document.createElement('div');
    body_overlay.classList.add("body-overlay-1")
    wrapper4.prepend(body_overlay);

    navbarTrigger.addEventListener('click', function (e) {
        e.preventDefault();
        container.classList.add('sidebar-visible');
        wrapper4.classList.add('mobile-menu-active');
    });

    endTrigger.addEventListener('click', () => {
        container.classList.remove('sidebar-visible');
        wrapper4.classList.remove('mobile-menu-active');
    });

    $('.body-overlay-1').on('click', function () {
        container.classList.remove('sidebar-visible');
        wrapper4.classList.remove('mobile-menu-active');
    });

    new WOW().init();


    /*---------------------
         Mobile menu active
     ------------------------ */
    var $offCanvasNav = $('.mobile-menu'),
        $offCanvasNavSubMenu = $offCanvasNav.find('.dropdown');

    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i class="far fa-angle-down"></i></span>');

    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();

    /*Category Sub Menu Toggle*/
    $offCanvasNav.on('click', 'li a, li .menu-expand', function (e) {
        var $this = $(this);
        if (($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand'))) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length) {
                $this.parent('li').removeClass('active');
                $this.siblings('ul').slideUp();
            } else {
                $this.parent('li').addClass('active');
                $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                $this.closest('li').siblings('li').find('ul:visible').slideUp();
                $this.siblings('ul').slideDown();
            }
        }
    });

    /*------ SVG img active ----*/
    SVGInject(document.querySelectorAll('img.injectable'), {});


    /*----------------------------
        Category toggle function
    ------------------------------*/
    var searchToggle = $('.categori-button-active');
    searchToggle.on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).siblings('.categori-dropdown-active-large').removeClass('open');
        } else {
            $(this).addClass('open');
            $(this).siblings('.categori-dropdown-active-large').addClass('open');
        }
    })


    /*-------------------------------
        Sort by active
    -----------------------------------*/
    if ($('.sort-by-product-area').length) {
        var $body = $('body'),
            $cartWrap = $('.sort-by-product-area'),
            $cartContent = $cartWrap.find('.sort-by-dropdown');
        $cartWrap.on('click', '.sort-by-product-wrap', function (e) {
            e.preventDefault();
            var $this = $(this);
            if (!$this.parent().hasClass('show')) {
                $this.siblings('.sort-by-dropdown').addClass('show').parent().addClass('show');
            } else {
                $this.siblings('.sort-by-dropdown').removeClass('show').parent().removeClass('show');
            }
        });
        /*Close When Click Outside*/
        $body.on('click', function (e) {
            var $target = e.target;
            if (!$($target).is('.sort-by-product-area') && !$($target).parents().is('.sort-by-product-area') && $cartWrap.hasClass('show')) {
                $cartWrap.removeClass('show');
                $cartContent.removeClass('show');
            }
        });
    }

    /*-----------------------
        Shop filter active 
    ------------------------- */
    $('.shop-filter-active').on('click', function (e) {
        e.preventDefault();
        $('.product-filter-wrapper').slideToggle();
    })
    var shopFiltericon = $('.shop-filter-active');
    shopFiltericon.on('click', function () {
        $('.shop-filter-active').toggleClass('active');
    })

    /*-----------------------
        Magnific Popup
    ------------------------*/
    $('.img-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    /*----------------------------
       Cart Plus Minus Button
   ------------------------------ */
    $(".product-quality").append('<div class="dec qtybutton">-</i></div><div class="inc qtybutton">+</div>');
    $(".qtybutton").on("click", function () {
        var $button = $(this),
            oldValue = $button.parent().find("input").val(),
            maxValue = $('.cart-plus-minus-box').data('limit'),
            newVal;
        if ($button.text() == "+") {
            if (maxValue >= parseFloat(oldValue) + 1) {
                newVal = parseFloat(oldValue) + 1;
            } else {
                newVal = 6
            }
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 1) {
                newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        $button.parent().find("input").val(newVal);
    });

    /*---------------------
        Select active
    --------------------- */
    $('.select-active').select2();

    /*--- Checkout toggle function ----*/
    $('.checkout-click1').on('click', function (e) {
        e.preventDefault();
        $('.checkout-login-info').slideToggle(900);
    });

    /*--- Checkout toggle function ----*/
    $('.checkout-click3').on('click', function (e) {
        e.preventDefault();
        $('.checkout-login-info3').slideToggle(1000);
    });

    /*-------------------------
        Create an account toggle
    --------------------------*/
    $('.checkout-toggle2').on('click', function () {
        $('.open-toggle2').slideToggle(1000);
    });

    $('.checkout-toggle').on('click', function () {
        $('.open-toggle').slideToggle(1000);
    });


    /*-------------------------------------
        Checkout one click toggle function
    ---------------------------------------*/
    var checked = $('.sin-payment input:checked')
    if (checked) {
        $(checked).siblings('.payment-box').slideDown(900);
    };
    $('.sin-payment input').on('change', function () {
        $('.payment-box').slideUp(900);
        $(this).siblings('.payment-box').slideToggle(900);
    });

    /*-------------------------------------
        Checkout paymentMethod function
    ---------------------------------------*/
    paymentMethodChanged();
    function paymentMethodChanged() {
        var $order_review = $('.payment-method');

        $order_review.on('click', 'input[name="payment_method"]', function () {
            var selectedClass = 'payment-selected';
            var parent = $(this).parents('.sin-payment').first();
            parent.addClass(selectedClass).siblings().removeClass(selectedClass);
        });
    }

    /*------------------------
        Clipboar Active
    -------------------------*/
    $('.cbtn').on('click', function () {
        var $this = $(this);
        var clipboard = new ClipboardJS('.cbtn');
        clipboard.on('success', function (e) {
            $this.text('Copied!');
            setTimeout(function () {
                $this.text('Copy');
            }, 2000);
        });
    });

    /*----------------------------------------
        SVG Inject With Vivus(After Inject) 
    ------------------------------------------*/
    SVGInject(document.querySelectorAll("img.svgInject"), {
        makeIdsUnique: true,
        afterInject: function (img, svg) {
            new Vivus(svg, {
                duration: 80
            });
        }
    });

    /* Vivus On Hover */
    $('[data-vivus-hover]').hover(function () {
        var svg = $(this).find('svg')[0];
        new Vivus(svg, {
            duration: 50
        });
    })

    /*---- CounterUp ----*/
    $('.count').counterUp({
        delay: 10,
        time: 2000
    });

    // Isotope active
    $('.grid').imagesLoaded(function () {
        // init Isotope
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            layoutMode: 'masonry',
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: '.grid-item',
            }
        });
    });

    /*====== SidebarSearch ======*/
    function sidebarSearch() {
        var searchTrigger = $('.search-active'),
            endTriggersearch = $('.search-close'),
            container = $('.main-search-active');

        searchTrigger.on('click', function (e) {
            e.preventDefault();
            container.addClass('search-visible');
        });

        endTriggersearch.on('click', function () {
            container.removeClass('search-visible');
        });

    };
    sidebarSearch();


    /*--- language currency active ----*/
    $('.mobile-language-active').on('click', function (e) {
        e.preventDefault();
        $('.lang-dropdown-active').slideToggle(900);
    });

    /*--- Categori-button-active-2 ----*/
    $('.categori-button-active-2').on('click', function (e) {
        e.preventDefault();
        $('.categori-dropdown-active-small').slideToggle(900);
    });

    /*--- Mobile demo active ----*/
    var demo = $('.tm-demo-options-wrapper');
    $('.view-demo-btn-active').on('click', function (e) {
        e.preventDefault();
        demo.toggleClass('demo-open');
    });

}
