const navbar = document.getElementById('header');
  const pagina2 = document.getElementById('2');

  window.addEventListener('scroll', () => {
    const pagina2Top = pagina2.getBoundingClientRect().top;

    if (pagina2Top <= 55) {
      navbar.classList.add('fixed');
    } else {
      navbar.classList.remove('fixed');
    }
  });




const swiper = document.getElementById('mySwiper');
const swiper2 = document.getElementById('mySwiper2');
const swiper3 = document.getElementById('mySwiper3');

    Object.assign(swiper, {
      
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 6,
      navigation: 'true',
      loop: true,
      initialSlide: 4,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }
    });

    Object.assign(swiper2, {
      
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 6,
      navigation: 'true',
      loop: true,
      initialSlide: 4,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }
    });

    Object.assign(swiper3, {
      
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 6,
      navigation: 'true',
      loop: true,
      initialSlide: 4,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }
    });