// Some general UI pack related JS

$(document).ready(function() {
  // Move some elements around when viewing from a "mobile" container
  updateContainer();
  $(window).resize(function() {
    updateContainer();
  });
  // Disable link click not scroll top
  $("a[href='#']").click(function(e) {
    e.preventDefault();
  });
  NavBarHandler.init();
});

var NavBarHandler = {

  init: function() {
    NavBarHandler.navbar = $('#title-banner .navbar');
    NavBarHandler.container = $('#main');
    NavBarHandler.origOffset = NavBarHandler.navbar.offset().top;
    $(document).scroll(NavBarHandler.stickToTop);
  },

  navbar: undefined,

  origOffset: undefined,

  stickToTop: function() {
    if ($(window).scrollTop() >= NavBarHandler.origOffset) {
      NavBarHandler.navbar.addClass('sticky');
      NavBarHandler.container.addClass('menu-padding');
    } else {
      NavBarHandler.navbar.removeClass('sticky');
      NavBarHandler.container.removeClass('menu-padding');
    }
  },
}

function updateContainer() {
  var $containerWidth = $(window).width();
  if ($containerWidth <= 767) {
    swapPlaces(".post-meta", ".post-container");
    moveDatetime(true);
  } else {
    swapPlaces(".post-container", ".post-meta");
    moveDatetime(false);
  }
}

function swapPlaces(currentlyBefore, currentlyAfter) {
  $(currentlyBefore).each(function() {
    var $sibling = $(this).siblings(currentlyAfter);
    $(this).insertAfter($sibling);
  });
}

function moveDatetime(underTitle) {
  if (underTitle == true) {
    $(".date-time").each(function() {
      var $title = $(this).closest(".row-fluid").find(".link");
      $(this).insertAfter($title);
    });
  } else {
    $(".date-time").each(function() {
      var $firstItemInPostMeta = $(this).closest(".row-fluid").find(".post-meta").children().first();
      $(this).insertBefore($firstItemInPostMeta);
    });
  }
}
