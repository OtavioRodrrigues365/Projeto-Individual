
const bonecoDayz = document.querySelector('.bonecoDayz');
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
};

const agachadoTras = () => {
  const img = document.getElementById('bonecoDayz');
  img.src = `./img/bonecoAgachado-t.png`;
};


const atualizarMovimento = () => {
  if (d) {
    posicao += 4;
    bonecoDayz.style.left = posicao + 'px';
  }
  if(a){posicao -= 4;
  bonecoDayz.style.left = posicao + 'px';
  }
  if(s){
    if(d){
    agachado();
    }else if(a){
      agachadoTras();
    }else{
      agachado();
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
  
    if (d) {
      agachado();
    } else if (a) {
      agachadoTras(); }
    }

  if (e.key.toLowerCase() === 'w' && !w) {
    w = true;
    bonecoDayz.classList.add('jump');
    const img = document.getElementById('bonecoDayz');
    img.src = `./img/boneco1.png`;
    setTimeout(() => {
      bonecoDayz.classList.remove('jump');
      w = false;
    }, 500);
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