const infos = {
  2: "Parabéns Ratão, ganhou 50 reaus!!!",
  14: "Parabéns Lagartixa, ganhou 50 pratas!!!"
};

const roda = new Winwheel({
  canvasId: 'roda',
  numSegments: 20,
  outerRadius: 200,
  textFontSize: 18,
  segments: Array.from({ length: 20 }, (_, i) => ({
    fillStyle: i % 2 === 0 ? '#1E90FF' : '#FF4C4C',
    text: (i + 1).toString()
  })),
  animation: {
    type: 'spinToStop',
    duration: 5,
    spins: 8,
    callbackFinished: onSorteioFinalizado
  }
});

function girarRoda() {
  const botao = document.querySelector('.btn');
  botao.disabled = true;

  roda.stopAnimation(false);
  roda.rotationAngle = 0;
  roda.draw();
  roda.startAnimation();
}

function onSorteioFinalizado(segment) {
  const numero = parseInt(segment.text);
  const mensagem = infos[numero] || 'Sem informações adicionais.';

  document.getElementById('resultado').innerHTML = `<h2>Número sorteado: ${numero}</h2>`;
  document.getElementById('info').innerText = mensagem;

  console.log(`🧪 Número sorteado: ${numero}`);

  // 🎆 Disparar fogos sempre
  const duration = 3000;
  const end = Date.now() + duration;

  const interval = setInterval(() => {
    if (Date.now() >= end) {
      clearInterval(interval);
      return;
    }

    confetti({
      particleCount: 50,
      startVelocity: 30,
      spread: 360,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.4
      }
    });
  }, 200);

  document.querySelector('.btn').disabled = false;
}
