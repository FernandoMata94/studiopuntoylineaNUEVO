$('.slider').slick({
  infinite: true,
  dots: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  fade: true,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: false,
 
  prevArrow: $('.prev-slide'),
  nextArrow: $('.next-slide'),
  responsive: [
    {
      breakpoint: 580,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true
      },
    },
  ],
});



$('.burguer').click(function () {
  $('.sidemenu').toggleClass('active');
  $('.burguer').toggleClass('active');
});

//funcion para cambiar de color el nav cuando pasa la clase "ancla"
var lastScrollTop = 0;
$(window).scroll(function (e) {
  $altoportada = $('.ancla').height();
  var st = $(this).scrollTop();
  if (st > $altoportada) {
    $('nav').addClass('activo')
  } else {
    $('nav').removeClass('activo')
  }
  if ($(".responsive-menu").hasClass("activo")) {
    $('nav').addClass('scrolldown')
  }
  lastScrollTop = st;

});

/***** empieza timeline para los iconos ******/

let tmline = gsap.timeline({
  scrollTrigger: {
    trigger: ".objetivos",
    toggleActions: "play none none none",
    start: "top center"
    //markers: true
  }
});

tmline.from(".icon", {
  opacity: 0,
  scale: 0,
  duration: .8
});

tmline.from(".puntos", {
  rotation: "360",
  transformOrigin: '50% 50%',
  repeat: -1,
  duration: 15,
  ease: "linear"
});

/***** ANIMACION PARA TODa la pagina ******/

const textos = gsap.utils.toArray('.text');
textos.forEach(text => {
  gsap.from(text, {
    opacity: 0,
    y: 50,
    delay: .8,
    ease: Expo.easeOut,
    duration: 2,
    scrollTrigger: {
      trigger: text,
      toggleActions: "play none none reverse",
      start: "top 80%",
      /*start: "top 80%",*/
      //markers:true
    }
  })
});


const underlines = gsap.utils.toArray('.underlineChild');
underlines.forEach(underline => {
  gsap.to(underline, {
    width:"95%",
    ease: Power4.easeOut,
    duration: 2,
    delay:.6,
    scrollTrigger: {
      trigger: underline,
      toggleActions: "restart none none reverse",
      start: "top 80%",
      //markers:true
    }
  })
});


//////////////////background color

gsap.utils.toArray(".color").forEach(function(elem) {

  var color = elem.getAttribute('data-color');

  ScrollTrigger.create({
    trigger: elem,
    start:'top 50%',
    end:'bottom 50%',
    onEnter: () => gsap.to('body', {backgroundColor:color}),
    onLeave: () => gsap.to('body', {backgroundColor:'white'}),
    onLeaveBack: () => gsap.to('body', {backgroundColor:'white'}),
    onEnterBack: () => gsap.to('body', {backgroundColor:color}),
    //markers:true
  });

});

//////////////////


/////////////////


let masks = document.querySelectorAll('.mask');

masks.forEach(mask => {
  let image = mask.querySelector('img');

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: mask,
      toggleActions: "restart none none reset",
      start: "top 80%",
      //markers:true
    }
  });

  tl.set(mask, { autoAlpha: 1 });


  tl.fromTo(mask, 1, {
    clipPath: "inset(100% 0% 0% 0%)"
  }, {
    clipPath: "inset(0% 0% 0% 0%)", //hay que usar porcentajes en los ceros también
    duration: 1,
    ease: Power3.easeOut,
  });

  tl.from(image, 3, {
    scale: 1.4,
    delay: -1.5,
    ease: Power2.out
  });

})