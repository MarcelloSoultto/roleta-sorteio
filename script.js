const infos = {
  2: "Parabéns Ratão, ganhou 50 reaus!!!",
  14: "Parabéns Lagartixa, ganhou 50 pratas!!!",
  19: "Parabéns Pokemon, ganhou um vale-ROBUX"
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

// Função para adicionar um novo segmento em posição aleatória
function adicionarSegmento() {
  const input = document.getElementById('inputTexto');
  const texto = input.value.trim();
  if (!texto) return;

  const novaCor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  const posicaoAleatoria = Math.floor(Math.random() * roda.segments.length) + 1;

  roda.addSegment({
    fillStyle: novaCor,
    text: texto
  }, posicaoAleatoria);

  // Adiciona mensagem padrão para o novo segmento
  infos[texto] = `Parabéns! Você ganhou: ${texto}`;

  roda.draw();

  input.value = '';
  input.focus();
}

function onSorteioFinalizado(segment) {
  const texto = segment.text;
  const mensagem = infos[texto] || infos[parseInt(texto)] || 'Sem informações adicionais.';

  document.getElementById('resultado').innerHTML = `<h2>Prêmio sorteado: ${texto}</h2>`;
  document.getElementById('info').innerText = mensagem;

  console.log(`🧪 Prêmio sorteado: ${texto}`);

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

  // Tocar som de palmas
  const somPalmas = document.getElementById('somPalmas');
  somPalmas.currentTime = 0;
  somPalmas.play();

  document.querySelector('.btn').disabled = false;
}