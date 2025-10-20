/* === LÓGICA DO MENU HAMBÚRGUER === */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav a');

// Abrir/Fechar com o botão
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('is-active');
  navToggle.classList.toggle('is-active');
  document.body.style.overflow = navMenu.classList.contains('is-active') ? 'hidden' : 'auto';
});

// Fechar o menu ao clicar em um link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('is-active')) { // Só executa se o menu estiver aberto
      navMenu.classList.remove('is-active');
      navToggle.classList.remove('is-active');
      document.body.style.overflow = 'auto'; 
    }
  });
});


/* === OBSERVER (Animação de Scroll) === */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, {
  threshold: 0.1 
});
document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});


/* === HEADER HIDE ON SCROLL === */
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');
const themeBtn = document.getElementById('toggleTheme');

window.addEventListener('scroll', () => {
  if (navMenu.classList.contains('is-active')) return;

  // Ajuste para o botão de tema não sumir no mobile
  let themeBtnRight = window.innerWidth <= 768 ? '70px' : '30px';
  let themeBtnTop = '15px';

  if (window.scrollY > lastScrollY && window.scrollY > 150) {
    header.classList.add('is-hidden');
    themeBtnTop = '-100px'; // Esconde o botão de tema
  } else {
    header.classList.remove('is-hidden');
    themeBtnTop = '15px'; // Traz de volta o botão de tema
  }
  
  themeBtn.style.top = themeBtnTop;
  themeBtn.style.right = themeBtnRight; // Garante que ele pule para o lado certo no mobile
  
  lastScrollY = window.scrollY;
});


/* === Carrossel de frases === */
const phrases = document.querySelectorAll('.hero-carousel .phrase');
let current = 0;
function showPhrase(index){
  phrases.forEach((p,i)=>p.classList.toggle('active', i===index));
}
setInterval(()=>{ current=(current+1)%phrases.length; showPhrase(current); }, 3500);
showPhrase(current);


/* === Swiper Gallery (COVERFLOW) === */
const swiper = new Swiper('.mySwiper', {
  effect: 'coverflow', 
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: true,
  coverflowEffect: {
    rotate: 50, stretch: 0,
    depth: 100, modifier: 1,
    slideShadows: true,
  },
  pagination:{el:'.swiper-pagination', clickable:true},
  navigation:{nextEl:'.swiper-button-next', prevEl:'.swiper-button-prev'}
});


/* === Contador do Amor === */
function updateCounter() {
  const startDate = new Date("2024-07-19T00:00:00");
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  let hours = now.getHours() - startDate.getHours();
  let minutes = now.getMinutes() - startDate.getMinutes();
  let seconds = now.getSeconds() - startDate.getSeconds();

  if (seconds < 0) { seconds += 60; minutes -= 1; }
  if (minutes < 0) { minutes += 60; hours -= 1; }
  if (hours < 0) { hours += 24; days -= 1; }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }
  if (months < 0) { months += 12; years -= 1; }

  // Verifica se os elementos existem antes de atualizar
  if(document.getElementById("years")) document.getElementById("years").textContent = years;
  if(document.getElementById("months")) document.getElementById("months").textContent = months;
  if(document.getElementById("days")) document.getElementById("days").textContent = days;
  if(document.getElementById("hours")) document.getElementById("hours").textContent = hours;
  if(document.getElementById("minutes")) document.getElementById("minutes").textContent = minutes;
  if(document.getElementById("seconds")) document.getElementById("seconds").textContent = seconds;
}
updateCounter();
setInterval(updateCounter, 1000);


/* === EFEITO TYPEWRITER === */
const typewriterElement = document.getElementById('typewriter');
// (COLOQUE AQUI SEU TEXTO ROMÂNTICO)
const textToType = "Meu amor, Marocas... Achei que seria legal fazer algo diferente esse ano, de tarde tive essa ideia e resolvi colocar em prática. Cada linha desse código, cada animação, foi pensando em você e na história linda que estamos construindo, eu ainda sou aquele mesmo cara completamente apaixonado, maluco e possessivo, nós ainda podemos fazer textinhos um para o outro como uma verdadeira demonstração de afeto, eu vou manter a minha palavra de não deixar passar totalmente em branco ou apenas com um simples eu te amo, nós sempre fizemos mais do que isso e não ser diferente só pq a rotina tem sido puxada, me desculpa se nos últimos dias eu fui uma pessoa extremamente difícil com vc, com nós, eu penso tanto em acertar que acabo me esquecendo de prestar atenção nas mínimas frases e palavras, que representam os 20% de feito que trarão 80% das suas reações, como uma prova de que eu ainda vivo o mesmo amor intenso e cuidadoso por vc e com vc, eu, juntamente com meu fiel escudeiro chat gpt kkkk, codei esse pequeno site, nosso site, simples mas feito com muito amor, e me desculpa por ter sumido por horas kkkk agr tem uma mensagem sua ali perguntando se estou bem, sim eu estou kkk. Feliz nosso dia Mara Letícia meu amor! Eu te amo mais do que tudo nesse mundo, do seu queridíssimo, Xoxonho. 💖";
let charIndex = 0;

function typeWriter() {
  if (charIndex < textToType.length) {
    typewriterElement.innerHTML += textToType.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 50); 
  }
}
const typeObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && charIndex === 0) { // Só digita se não tiver digitado ainda
    typeWriter();
    typeObserver.disconnect(); 
  }
}, { threshold: 0.8 });
if (typewriterElement) typeObserver.observe(typewriterElement);


/* === Memory Game === */
const grid=document.getElementById('memoryGrid');
if (grid) { // Verifica se o grid existe
  const images=["img/foto1.png","img/foto2.png","img/foto3.png","img/foto4.png","img/foto5.png","img/foto6.png"];
  let memoryImages=[...images,...images];
  memoryImages.sort(()=>0.5-Math.random());
  let firstCard=null, secondCard=null, lock=false;
  
  memoryImages.forEach(src=>{
    const card=document.createElement('div'); card.classList.add('card');
    const inner=document.createElement('div'); inner.classList.add('card-inner');
    const front=document.createElement('div'); front.classList.add('card-front'); front.textContent='💖';
    const back=document.createElement('div'); back.classList.add('card-back'); back.style.backgroundImage=`url(${src})`;
    inner.appendChild(front); inner.appendChild(back); card.appendChild(inner); grid.appendChild(card);
    
    card.addEventListener('click',()=>{
      if(lock || card.classList.contains('is-matched') || card === firstCard) return; 
      card.classList.add('flipped');
      if(!firstCard){ firstCard=card; return; }
      secondCard=card; lock=true;
      if(firstCard.querySelector('.card-back').style.backgroundImage === secondCard.querySelector('.card-back').style.backgroundImage){
        firstCard.classList.add('is-matched');
        secondCard.classList.add('is-matched');
        firstCard=null; secondCard=null; lock=false;
      } else {
        firstCard.classList.add('is-mismatched');
        secondCard.classList.add('is-mismatched');
        setTimeout(()=>{ 
          firstCard.classList.remove('flipped', 'is-mismatched'); 
          secondCard.classList.remove('flipped', 'is-mismatched'); 
          firstCard=null; secondCard=null; lock=false; 
        }, 1000); 
      }
    });
  });
}


/* === Corações ao clicar === */
document.addEventListener("click",(e)=>{
  if (e.target.closest('.nav-toggle') || e.target.closest('.nav') || e.target.closest('.theme-btn') || e.target.closest('button') || e.target.closest('a')) return;

  const heart=document.createElement("div"); heart.textContent="💖"; heart.className="heart";
  heart.style.left=e.clientX+"px"; heart.style.top=e.clientY+"px";
  document.body.appendChild(heart);
  setTimeout(()=>heart.remove(),2000);
});
const style=document.createElement("style");
style.textContent=".heart{position:fixed;font-size:24px;animation:float 2s ease-out;pointer-events:none;z-index:999;}@keyframes float{0%{opacity:1;transform:translateY(0);}100%{opacity:0;transform:translateY(-100px);}}";
document.head.appendChild(style);


/* === Partículas (Corações) === */
const canvas=document.getElementById("particleCanvas");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth; canvas.height=window.innerHeight;
let particles=[];
function createParticles() {
  particles = [];
  let numParticles = window.innerWidth < 768 ? 30 : 50; 
  for(let i=0;i<numParticles;i++){ 
    particles.push({
      x:Math.random()*canvas.width, y:Math.random()*canvas.height,
      r:Math.random()*10+10, dx:(Math.random()-0.5)*0.5, 
      dy:(Math.random()-0.5)*0.5, opacity: Math.random() * 0.5 + 0.2
    }); 
  }
}
createParticles();
function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{ 
    p.x+=p.dx; p.y+=p.dy; 
    if(p.x>canvas.width+p.r)p.x=-p.r; if(p.x<-p.r)p.x=canvas.width+p.r; 
    if(p.y>canvas.height+p.r)p.y=-p.r; if(p.y<-p.r)p.y=canvas.height+p.r; 
    ctx.save();
    ctx.globalAlpha = p.opacity; ctx.font = `${p.r}px Quicksand`;
    ctx.fillStyle = 'rgba(255, 77, 109, 0.7)';
    ctx.fillText('💖', p.x, p.y);
    ctx.restore();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles(); 
window.addEventListener('resize',()=>{ 
  canvas.width=window.innerWidth; canvas.height=window.innerHeight; 
  createParticles(); 
});

/* === Toggle Dark/Light Mode === */
const toggleBtn=document.getElementById('toggleTheme');
toggleBtn.addEventListener('click',()=>{
  document.body.classList.toggle('dark-mode');
  toggleBtn.textContent=document.body.classList.contains('dark-mode')?"🌙":"☀️";
});

/* =================================== */
/* ==== NOVOS SCRIPTS COMEÇAM AQUI ==== */
/* =================================== */

/* === 4. CONTAGEM REGRESSIVA === */
function updateCountdown() {
  // (COLOQUE AQUI A SUA DATA FUTURA)
  // Formato: Ano, Mês (0=Jan, 1=Fev...), Dia, Hora, Minuto, Segundo
  const futureDate = new Date(2026, 6, 19, 0, 0, 0); // Ex: 19 de Julho de 2026
  
  const now = new Date();
  const diff = futureDate - now;

  if (diff < 0) {
    // Se a data já passou
    if(document.getElementById("countdown-box")) document.getElementById("countdown-box").innerHTML = "<h3 class='quiz-result'>A contagem terminou! 🎉</h3>";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if(document.getElementById("c_days")) document.getElementById("c_days").textContent = days;
  if(document.getElementById("c_hours")) document.getElementById("c_hours").textContent = hours;
  if(document.getElementById("c_minutes")) document.getElementById("c_minutes").textContent = minutes;
  if(document.getElementById("c_seconds")) document.getElementById("c_seconds").textContent = seconds;
}
// Inicia a contagem apenas se o elemento existir
if(document.getElementById("countdown-box")) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* === 5. QUIZ DO CASAL === */

// (COLOQUE AQUI SUAS PERGUNTAS E RESPOSTAS)
const quizQuestions = [
  {
    question: "Onde foi nosso primeiro encontro 'oficial'?",
    answers: [
      { text: "No cinema", correct: false },
      { text: "No shopping", correct: false },
      { text: "Na igreja", correct: true },
      { text: "Na sua casa", correct: false }
    ]
  },
  {
    question: "Qual o nome do primeiro filme que vimos juntos?",
    answers: [
      { text: "Um filme romântico qualquer", correct: false },
      { text: "Acompanhante Perfeita", correct: false },
      { text: "Bridget Jones: Louca pelo Garoto", correct: true },
      { text: "A gente dormiu e não viu", correct: false }
    ]
  },
  {
    question: "O que aconteceu quando tentamos pegar os ursos na máquina do shopping?",
    answers: [
      { text: "Eu perdi a chave ", correct: false },
      { text: "Você perdeu o brinco", correct: false },
      { text: "Perdemos as fichas", correct: true },
      { text: "nenhuma das anteriores", correct: false }
    ]
  }
];

const quizContainer = document.getElementById('quizContainer');
const quizQuestionEl = document.getElementById('quizQuestion');
const quizAnswersEl = document.getElementById('quizAnswers');
const quizNextBtn = document.getElementById('quizNextBtn');
const quizResultEl = document.getElementById('quizResult');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizResultEl.innerHTML = "";
  quizNextBtn.innerHTML = "Próxima";
  quizNextBtn.style.display = "none";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = quizQuestions[currentQuestionIndex];
  quizQuestionEl.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("quiz-answer-btn");
    quizAnswersEl.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  quizNextBtn.style.display = "none";
  while (quizAnswersEl.firstChild) {
    quizAnswersEl.removeChild(quizAnswersEl.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  // Mostra a resposta correta
  Array.from(quizAnswersEl.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true; // Desabilita todos os botões
  });

  quizNextBtn.style.display = "block";
}

function showResults() {
  resetState();
  quizQuestionEl.innerHTML = "";
  quizResultEl.innerHTML = `Você acertou ${score} de ${quizQuestions.length}!<br>Não importa o placar, você já ganhou meu coração 💖`;
  quizNextBtn.innerHTML = "Jogar Novamente";
  quizNextBtn.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

// Inicia o Quiz apenas se o container existir
if (quizContainer) {
  quizNextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < quizQuestions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });
  startQuiz();
}