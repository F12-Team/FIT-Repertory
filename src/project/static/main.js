window.onload = function () {
    $(document).scroll(function () {
        $('.navbar').toggleClass('scrolled', $(this).scrollTop() > $('.navbar').height());
      });
}