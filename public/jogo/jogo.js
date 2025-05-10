
const bonecoDayz = document.querySelector('.bonecoDayz');
const plataforma = document.querySelector('.plataforma');
var posicao = 0;
var w = false;
var d = false;
var a = false;
var s = false;
var boneco = 1;
const totalFrames = 3;
const teclasPressionadas = new Set();
var intervaloFrente;
var intervaloTras;
var estaAgachado = false;
var pode = false


//  const loop = setInterval(() => {
//    console.log(plataforma.getBoundingClientRect());
   
//  },10000)

const frente = () => {
  const img = document.getElementById('bonecoDayz');
  img.src = `./img/boneco${boneco}.png`;
  boneco = (boneco % totalFrames) + 1;
};

const tras = () => {
  const img = document.getElementById('bonecoDayz');
  img.src = `./img/boneco${boneco}-t.png`;
  boneco = (boneco % totalFrames) + 1;
};

const agachado = () => {
  const img = document.getElementById('bonecoDayz');
  img.src = `./img/bonecoAgachado.png`;
  estaAgachado = true;
};

const agachadoTras = () => {
  const img = document.getElementById('bonecoDayz');
  img.src = `./img/bonecoAgachado-t.png`;
  estaAgachado = true;
};


const parado = () => {
  const img = document.getElementById('bonecoDayz');
  img.src = `./img/boneco1.png`;
  estaAgachado = false;
};

const pulo = () => {
  w = true;
  bonecoDayz.classList.add('pulo');
  const img = document.getElementById('bonecoDayz');
  img.src = `./img/boneco1.png`;
  setTimeout(() => {
    bonecoDayz.classList.remove('pulo');
    w = false;
  }, 500);

};

const atualizarMovimento = () => {
  if (pode == true) {
    if (s) {
      if (d) {
        agachado();
      } else if (a) {
        agachadoTras();
      } else {
        agachado();
      }
    } else if (d) {
      if (bonecoDayz.offsetLeft <= 1430) {
        posicao += 4;
        bonecoDayz.style.left = posicao + 'px';
      } else if(bonecoDayz.offsetLeft <= 1430) {

      }else{

      }
    }
    else if (a) {
      if (bonecoDayz.offsetLeft >= -30) {
        posicao -= 4;
        bonecoDayz.style.left = posicao + 'px';
      } else { }
    }
  }

  requestAnimationFrame(atualizarMovimento);
};

atualizarMovimento();

document.addEventListener('keydown', (e) => {
  teclasPressionadas.add(e.key.toLowerCase());

  if (e.key.toLowerCase() === 'd') {
    if (!d) {
      d = true;
      intervaloFrente = setInterval(frente, 100);
    }
  }

  if (e.key.toLowerCase() === 'a') {
    if (!a) {
      a = true;
      intervaloTras = setInterval(tras, 100);
    }
  }
  if (e.key.toLowerCase() === 's' && !s) {
    s = true;
  }


  if (e.key.toLowerCase() === 'w' && !w) {
    if (estaAgachado == true) {
      parado()
    } else {
      pulo();
    }
  }
});

document.addEventListener('keyup', (e) => {
  teclasPressionadas.delete(e.key.toLowerCase());

  if (e.key.toLowerCase() === 'd') {
    d = false;
    clearInterval(intervaloFrente);
  }
  if (e.key.toLowerCase() === 'a') {
    a = false;
    clearInterval(intervaloTras);
  }

  if (e.key.toLowerCase() === 's') {
    s = false;
  }

});



function jogar() {
  pode = true;
  document.getElementById('jogar').classList.remove('fundo-desfocado')
  document.getElementById('btn-jogar').classList.add('remover-btn')
}