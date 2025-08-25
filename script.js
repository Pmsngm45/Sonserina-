const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');

menuBtn.addEventListener('click', () => {
  sideMenu.classList.toggle('open');
});

const links = sideMenu.querySelectorAll('a');
links.forEach(link => {
  link.addEventListener('click', () => {
    sideMenu.classList.remove('open');
  });
});


  
const startBtn = document.getElementById('start-btn');
const quizSection = document.getElementById('quiz-section');
const resultDiv = document.getElementById('result');
const quizForm = document.getElementById('quiz-form');

startBtn.addEventListener('click', () => {
  startBtn.classList.add('hidden');
  quizSection.classList.remove('hidden');
  resultDiv.classList.add('hidden');
});

quizForm.addEventListener('submit', e => {
  e.preventDefault();

  // Obter respostas e somar pontos
  const formData = new FormData(quizForm);
  const scores = {
    'Lufa-Lufa': 0,
    'Sonserina': 0,
    'Grifinória': 0,
    'Corvinal': 0
  };

  for (let pair of formData.entries()) {
    const resposta = pair[1];
    if (scores.hasOwnProperty(resposta)) {
      scores[resposta]++;
    }
  }

  // Determinar casa com maior pontuação
  let maxPoints = -1;
  let casaVencedora = '';
  for (const casa in scores) {
    if (scores[casa] > maxPoints) {
      maxPoints = scores[casa];
      casaVencedora = casa;
    }
  }

  // Mostrar resultado com mensagens personalizadas
  let mensagem = '';
  let classe = '';

  switch (casaVencedora) {
    case 'Sonserina':
      mensagem = '🟢 Você é da <b>Sonserina</b>! Astúcia e ambição são seus maiores trunfos. Seja bem-vindo à casa mais poderosa de Hogwarts.';
      classe = 'sonserina';
      break;
    case 'Grifinória':
      mensagem = '🔴 Você é da <b>Grifinória</b>... Corajoso demais pra estar aqui, não acha? <i>Sonserina não tolera heróis baratos. Saia antes que vire sapo!</i>';
      classe = 'grifinoria';
      break;
    case 'Lufa-Lufa':
      mensagem = '🟡 Você é da <b>Lufa-Lufa</b>... Que fofo. Mas fofo não sobrevive aqui. <i>Volte pra sua estufa de mandrágoras!</i>';
      classe = 'lufa-lufa';
      break;
    case 'Corvinal':
      mensagem = '🔵 Você é da <b>Corvinal</b>... Inteligente, claro. Mas esperteza sem ambição é desperdício. <i>Este lugar não é para teóricos.</i>';
      classe = 'corvinal';
      break;
    default:
      mensagem = 'Não foi possível determinar sua casa.';
      classe = '';
  }

  resultDiv.innerHTML = mensagem;
  resultDiv.className = classe;
  resultDiv.classList.remove('hidden');

  // Esconder quiz após resultado
  quizSection.classList.add('hidden');
});
  