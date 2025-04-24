const img = document.getElementById('animacao');
let boneco = 1;
const totalFrames = 3; // ajuste com o total de imagens que você tem

setInterval(() => {
  img.src = `./img/boneco${boneco}.png`;
  boneco = (boneco % totalFrames) + 1;
}, 150);