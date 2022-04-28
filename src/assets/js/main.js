window.addEventListener('load',
  () => {

    // /*-----------------
    //     Menu Stick
    // -----------------*/
    const header = document.getElementsByClassName("sticky-bar")[0];
    let scrollUpBtn = document.getElementById("scrollUp");

    window.addEventListener("scroll", () => {
      let scroll = window.scrollTop();

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
    const navbarTrigger = document.getElementById('burger_icon');
    const endTrigger = document.getElementById('mobile_menu_close');
    const container = document.getElementsByClassName("mobile-header-active")[0];
    const wrapper4 = document.getElementsByTagName('body')[0];

    const body_overlay = document.createElement('div');
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


    /*---------------------
         Mobile menu active
     ------------------------ */
    let $offCanvasNav = $('.mobile-menu'),
      $offCanvasNavSubMenu = $offCanvasNav.find('.dropdown');

    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i class="down las la-angle-down"></i></span>');

    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();

    /*Category Sub Menu Toggle*/
    $offCanvasNav.on('click', 'li a, li .menu-expand', function (e) {
      let $this = $(this);
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
    const searchToggle = document.querySelector('.categori-button-active');
    searchToggle.addEventListener('click', (e) => {
      e.preventDefault();
      if (searchToggle.classList.contains('open')) {
        searchToggle.classList.remove('open');
        $(this).siblings('.categori-dropdown-active-large').removeClass('open');
      } else {
        searchToggle.classList.add('open');
        $(this).siblings('.categori-dropdown-active-large').addClass('open');
      }
    })


    /*-------------------------------
        Sort by active
    -----------------------------------*/
    if ($('.sort-by-product-area').length) {
      let $body = $('body'),
        $cartWrap = $('.sort-by-product-area'),
        $cartContent = $cartWrap.find('.sort-by-dropdown');
      $cartWrap.on('click', '.sort-by-product-wrap', function (e) {
        e.preventDefault();
        let $this = $(this);
        if (!$this.parent().hasClass('show')) {
          $this.siblings('.sort-by-dropdown').addClass('show').parent().addClass('show');
        } else {
          $this.siblings('.sort-by-dropdown').removeClass('show').parent().removeClass('show');
        }
      });
      /*Close When Click Outside*/
      $body.on('click', function (e) {
        let $target = e.target;
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
    let shopFiltericon = $('.shop-filter-active');
    shopFiltericon.on('click', function () {
      $('.shop-filter-active').toggleClass('active');
    })


    /*----------------------------
       Cart Plus Minus Button
   ------------------------------ */

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
    let checked = $('.sin-payment input:checked')
    if (checked) {
      $(checked).siblings('.payment-box').slideDown(900);
    };
    $('.sin-payment input').on('change', function () {
      $('.payment-box').slideUp(900);
      $(this).siblings('.payment-box').slideToggle(900);
    });

    /*------------------------
        Clipboar Active
    -------------------------*/
    $('.cbtn').on('click', function () {
      let $this = $(this);
      let clipboard = new ClipboardJS('.cbtn');
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
      let svg = $(this).find('svg')[0];
      new Vivus(svg, {
        duration: 50
      });
    })

    // Isotope active
    $('.grid').imagesLoaded(function () {
      // init Isotope
      let $grid = $('.grid').isotope({
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
    const sidebarSearch = () => {

      const searchTrigger = document.querySelector('.search-active');
      const searchTriggerEnd = document.querySelector('.search-close');
      let container = document.querySelector('.search-close');

      searchTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.add('search-visible');
      })

      searchTriggerEnd.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.remove('search-visible');
      })

    };

    sidebarSearch();

    /*--- Categori-button-active-2 ----*/
    $('.categori-button-active-2').on('click', function (e) {
      e.preventDefault();
      $('.categori-dropdown-active-small').slideToggle(900);
    });

  }, false);
