$(".dropdown").hover(
    function () {
        // over
        $(this).addClass("open");
    },
    function () {
        // out
        $(this).removeClass("open");
    }
);
$('#gallery img').click(function () {
    //console.log(this.getAttribute('value'));
    var ID = this.getAttribute('value');
    console.log($('#' + ID));
    $('#' + ID).css('display', 'block')
    $('#' + ID).find('a').click(function () {
        $('#' + ID).css('display', 'none')
    })
})

// 吸顶导航
// window.onscroll = function () {
//     var num = $('.vnavbar').outerHeight()
//     //console.log(num)
//     var top = document.documentElement.scrollTop || document.body.scrollTop;
//     if (top >= num) {
//         $('.vnavbar').css({ position: 'fixed', top: 0, width: 100 + '%', 'z-index': 1000, background: 'white' })
//         $('#about').css('paddingTop', num + 'px')
//         $('#services').css('paddingTop', num + 'px')
//         $('#blog').css('paddingTop', num + 'px')
//         $('#gallery').css('paddingTop', num + 'px')
//         $('#newsletter').css('paddingTop', num + 'px')
//         $('#contact').css('paddingTop', num + 'px')
//     } else {
//         $('.vnavbar').css({ position: 'static', top: 0 })
//         $('#about').css('paddingTop', '0px')
//         $('#services').css('paddingTop', '0px')
//         $('#blog').css('paddingTop', '0px')
//         $('#gallery').css('paddingTop', '0px')
//         $('#newsletter').css('paddingTop', '0px')
//         $('#contact').css('paddingTop', '0px')
//     }
// }

