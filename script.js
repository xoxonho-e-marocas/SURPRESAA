/* === LÓGICA DO MENU HAMBÚRGUER === */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav a');

if (navToggle && navMenu) { // Verifica se os elementos existem
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('is-active');
        navToggle.classList.toggle('is-active');
        document.body.style.overflow = navMenu.classList.contains('is-active') ? 'hidden' : 'auto';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.getComputedStyle(navMenu).getPropertyValue('opacity') === '1' || navMenu.classList.contains('is-active') ) {
                navMenu.classList.remove('is-active');
                navToggle.classList.remove('is-active');
                document.body.style.overflow = 'auto';
            }
        });
    });
}

/* === OBSERVER (Animação de Scroll) === */
try {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => { revealObserver.observe(el); });
} catch (e) { console.error("Erro no IntersectionObserver:", e); }


/* === HEADER HIDE ON SCROLL === */
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');

if(header) { // Verifica se header existe
    window.addEventListener('scroll', () => {
      const currentNavMenu = document.getElementById('navMenu');
      if (currentNavMenu && currentNavMenu.classList.contains('is-active')) return;

      const headerHidden = header.classList.contains('is-hidden');

      if (window.scrollY > lastScrollY && window.scrollY > 150) {
          if (!headerHidden) header.classList.add('is-hidden');
      } else {
          if (headerHidden) header.classList.remove('is-hidden');
      }
      lastScrollY = window.scrollY;
    });
}


/* === Carrossel de frases === */
const phrases = document.querySelectorAll('.hero-carousel .phrase');
let currentPhraseIndex = 0;
function showPhrase(index){ if(phrases.length > 0) phrases.forEach((p,i)=>p.classList.toggle('active', i===index)); }
if (phrases.length > 0) {
    setInterval(()=>{ currentPhraseIndex=(currentPhraseIndex+1)%phrases.length; showPhrase(currentPhraseIndex); }, 3500);
    showPhrase(currentPhraseIndex);
}


/* === Swiper Gallery (COVERFLOW) === */
try {
    const swiper = new Swiper('.mySwiper', {
      effect: 'coverflow', grabCursor: true, centeredSlides: true, slidesPerView: 'auto', loop: true,
      coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true, },
      pagination:{el:'.swiper-pagination', clickable:true},
      navigation:{nextEl:'.swiper-button-next', prevEl:'.swiper-button-prev'}
    });
} catch(e) { console.error("Erro ao inicializar Swiper:", e); }


/* === Contador do Amor === */
function updateCounter() {
  try {
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
      if (days < 0) { const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0); days += prevMonth.getDate(); months -= 1; }
      if (months < 0) { months += 12; years -= 1; }

      const yearsEl = document.getElementById("years");
      const monthsEl = document.getElementById("months");
      const daysEl = document.getElementById("days");
      const hoursEl = document.getElementById("hours");
      const minutesEl = document.getElementById("minutes");
      const secondsEl = document.getElementById("seconds");

      if(yearsEl) yearsEl.textContent = years;
      if(monthsEl) monthsEl.textContent = months;
      if(daysEl) daysEl.textContent = days;
      if(hoursEl) hoursEl.textContent = hours;
      if(minutesEl) minutesEl.textContent = minutes;
      if(secondsEl) secondsEl.textContent = seconds;
  } catch(e) { console.error("Erro no updateCounter:", e); }
}
if (document.getElementById('counter')) { updateCounter(); setInterval(updateCounter, 1000); }


/* === EFEITO TYPEWRITER === */
const typewriterElement = document.getElementById('typewriter');
if (typewriterElement) {
    const textToType = "Meu amor, Marocas... Achei que seria legal fazer algo diferente esse ano, de tarde tive essa ideia e resolvi colocar em prática. Cada linha desse código, cada animação, foi pensando em você e na história linda que estamos construindo, eu ainda sou aquele mesmo cara completamente apaixonado, maluco e possessivo, nós ainda podemos fazer textinhos um para o outro como uma verdadeira demonstração de afeto, eu vou manter a minha palavra de não deixar passar totalmente em branco ou apenas com um simples eu te amo, nós sempre fizemos mais do que isso e não ser diferente só pq a rotina tem sido puxada, me desculpa se nos últimos dias eu fui uma pessoa extremamente difícil com vc, com nós, eu penso tanto em acertar que acabo me esquecendo de prestar atenção nas mínimas frases e palavras, que representam os 20% de feito que trarão 80% das suas reações, como uma prova de que eu ainda vivo o mesmo amor intenso e cuidadoso por vc e com vc, eu, juntamente com meu fiel escudeiro chat gpt kkkk, codei esse pequeno site, nosso site, simples mas feito com muito amor, e me desculpa por ter sumido por horas kkkk agr tem uma mensagem sua ali perguntando se estou bem, sim eu estou kkk. Feliz nosso dia Mara Letícia meu amor! Eu te amo mais do que tudo nesse mundo, do seu queridíssimo, Xoxonho. 💖";
    let charIndex = 0;
    function typeWriter() { if (charIndex < textToType.length) { typewriterElement.innerHTML += textToType.charAt(charIndex); charIndex++; setTimeout(typeWriter, 50); } }
    const typeObserver = new IntersectionObserver((entries) => { if (entries[0].isIntersecting && charIndex === 0) { typeWriter(); typeObserver.disconnect(); } }, { threshold: 0.8 });
    typeObserver.observe(typewriterElement);
}


/* === Memory Game === */
const grid=document.getElementById('memoryGrid');
if (grid) {
  try {
      const images=["img/foto1.png","img/foto2.png","img/foto3.png","img/foto4.png","img/foto5.png","img/foto6.png"];
      let memoryImages=[...images,...images]; memoryImages.sort(()=>0.5-Math.random());
      let firstCard=null, secondCard=null, lock=false;
      grid.innerHTML = '';
      memoryImages.forEach(src=>{
        const card=document.createElement('div'); card.classList.add('card');
        const inner=document.createElement('div'); inner.classList.add('card-inner');
        const front=document.createElement('div'); front.classList.add('card-front'); front.textContent='💖';
        const back=document.createElement('div'); back.classList.add('card-back'); back.style.backgroundImage=`url(${src})`;
        inner.appendChild(front); inner.appendChild(back); card.appendChild(inner); grid.appendChild(card);
        card.addEventListener('click',()=>{
          if(lock || card.classList.contains('is-matched') || card === firstCard) return; card.classList.add('flipped');
          if(!firstCard){ firstCard=card; return; }
          secondCard=card; lock=true;
          if(firstCard.querySelector('.card-back').style.backgroundImage === secondCard.querySelector('.card-back').style.backgroundImage){
            firstCard.classList.add('is-matched'); secondCard.classList.add('is-matched');
            firstCard=null; secondCard=null; lock=false;
          } else {
            firstCard.classList.add('is-mismatched'); secondCard.classList.add('is-mismatched');
            setTimeout(()=>{ if(firstCard) firstCard.classList.remove('flipped', 'is-mismatched'); if(secondCard) secondCard.classList.remove('flipped', 'is-mismatched'); firstCard=null; secondCard=null; lock=false; }, 1000);
          }
        });
      });
  } catch (e) { console.error("Erro no Jogo da Memória:", e); }
}


/* === Corações ao clicar === */
try {
    document.addEventListener("click",(e)=>{
      if (e.target.closest('button, a, .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet, .card, .quiz-answer-btn, input, textarea, .nav, .nav-toggle, .theme-btn, iframe')) return;
      const heart=document.createElement("div"); heart.textContent="💖"; heart.className="heart";
      heart.style.left=e.clientX+"px"; heart.style.top=e.clientY+"px";
      document.body.appendChild(heart);
      setTimeout(()=>heart.remove(),2000);
    });
    const style=document.createElement("style");
    style.textContent=".heart{position:fixed;font-size:24px;animation:float 2s ease-out;pointer-events:none;z-index:999;}@keyframes float{0%{opacity:1;transform:translateY(0);}100%{opacity:0;transform:translateY(-100px);}}";
    if(!document.head.querySelector('style[data-heart-style]')) { style.setAttribute('data-heart-style', 'true'); document.head.appendChild(style); }
} catch(e) { console.error("Erro nos corações ao clicar:", e); }


/* === Partículas (Corações) === */
const canvas=document.getElementById("particleCanvas");
if (canvas) {
    const ctx=canvas.getContext("2d");
    let particles=[]; let animationFrameId = null;
    function setupCanvas() {
        if(animationFrameId) cancelAnimationFrame(animationFrameId);
        canvas.width=window.innerWidth; canvas.height=window.innerHeight;
        createParticles();
        animateParticles();
    }
    function createParticles() {
      particles = []; let numParticles = window.innerWidth < 768 ? 25 : 40;
      for(let i=0;i<numParticles;i++){ particles.push({ x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*8+8, dx:(Math.random()-0.5)*0.3, dy:(Math.random()-0.5)*0.3, opacity: Math.random() * 0.4 + 0.15 }); }
    }
    function animateParticles(){
      if(!ctx) return;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.forEach(p=>{ p.x+=p.dx; p.y+=p.dy; if(p.x>canvas.width+p.r)p.x=-p.r; if(p.x<-p.r)p.x=canvas.width+p.r; if(p.y>canvas.height+p.r)p.y=-p.r; if(p.y<-p.r)p.y=canvas.height+p.r; ctx.save(); ctx.globalAlpha = p.opacity; ctx.font = `${p.r}px Quicksand`; ctx.fillStyle = 'rgba(255, 77, 109, 0.6)'; ctx.fillText('💖', p.x, p.y); ctx.restore(); });
      animationFrameId = requestAnimationFrame(animateParticles);
    }
    setupCanvas();
    window.addEventListener('resize', setupCanvas);
}

// --- Executar código que depende do DOM após o carregamento ---
document.addEventListener('DOMContentLoaded', () => {

    /* === Toggle Dark/Light Mode === */
    const toggleBtn=document.getElementById('toggleTheme');
    if (toggleBtn) {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');
        let currentModeIsDark = document.body.classList.contains('dark-mode'); // Check initial class just in case

        if (savedTheme) {
            currentModeIsDark = savedTheme === 'dark';
        } else {
             currentModeIsDark = prefersDark; // Default to system preference if no saved theme
        }

        if (currentModeIsDark) {
            document.body.classList.add('dark-mode');
            toggleBtn.textContent = "🌙";
        } else {
            document.body.classList.remove('dark-mode');
            toggleBtn.textContent = "☀️";
        }

        toggleBtn.addEventListener('click',()=>{
          document.body.classList.toggle('dark-mode');
          const isDark = document.body.classList.contains('dark-mode');
          toggleBtn.textContent = isDark ? "🌙" : "☀️";
          localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        if (header) {
            const isMobile = window.innerWidth <= 768;
            // Adjust right position based on current CSS in media query
             toggleBtn.style.right = isMobile ? '70px' : '30px'; // Usa 70px que definimos no CSS mobile
            toggleBtn.style.top = (window.scrollY > 150 && header.classList.contains('is-hidden')) ? '-100px' : '15px';
        }

    } else { console.error("Botão de tema #toggleTheme não encontrado!"); }

    /* === CONTAGEM REGRESSIVA === */
    const countdownBox = document.getElementById("countdown-box");
    let countdownInterval = null;
    if(countdownBox) {
        function updateCountdown() {
          try {
              const futureDate = new Date(2026, 6, 19, 0, 0, 0); // 19 de Julho de 2026
              const now = new Date(); const diff = futureDate - now;
              if (diff < 0) { countdownBox.innerHTML = "<h3 class='quiz-result'>A contagem terminou! 🎉</h3>"; if (countdownInterval) clearInterval(countdownInterval); return; }
              const days = Math.floor(diff / (1000 * 60 * 60 * 24));
              const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((diff % (1000 * 60)) / 1000);
              const cDaysEl = document.getElementById("c_days");
              const cHoursEl = document.getElementById("c_hours");
              const cMinutesEl = document.getElementById("c_minutes");
              const cSecondsEl = document.getElementById("c_seconds");
              if(cDaysEl) cDaysEl.textContent = days;
              if(cHoursEl) cHoursEl.textContent = hours;
              if(cMinutesEl) cMinutesEl.textContent = minutes;
              if(cSecondsEl) cSecondsEl.textContent = seconds;
          } catch (e) { console.error("Erro no updateCountdown:", e); if(countdownInterval) clearInterval(countdownInterval); }
        }
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    /* === QUIZ DO CASAL === */
    const quizContainer = document.getElementById('quizContainer');
    if (quizContainer) {
        const quizQuestions = [ { question: "Onde foi nosso primeiro encontro 'oficial'?", answers: [ { text: "No cinema", correct: false }, { text: "No shopping", correct: false }, { text: "Na igreja", correct: true }, { text: "Na sua casa", correct: false } ] }, { question: "Qual o nome do primeiro filme que vimos juntos?", answers: [ { text: "Um filme romântico qualquer", correct: false }, { text: "Acompanhante Perfeita", correct: false }, { text: "Bridget Jones: Louca pelo Garoto", correct: true }, { text: "A gente dormiu e não viu", correct: false } ] }, { question: "O que aconteceu quando tentamos pegar os ursos na máquina do shopping?", answers: [ { text: "Eu perdi a chave ", correct: false }, { text: "Você perdeu o brinco", correct: false }, { text: "Perdemos as fichas", correct: true }, { text: "nenhuma das anteriores", correct: false } ] } ];
        const quizQuestionEl = document.getElementById('quizQuestion');
        const quizAnswersEl = document.getElementById('quizAnswers');
        const quizNextBtn = document.getElementById('quizNextBtn');
        const quizResultEl = document.getElementById('quizResult');
        let currentQuestionIndex = 0; let score = 0;

        function startQuiz() { try { currentQuestionIndex = 0; score = 0; if(quizResultEl) quizResultEl.innerHTML = ""; if(quizNextBtn) { quizNextBtn.innerHTML = "Próxima"; quizNextBtn.style.display = "none";} showQuestion(); } catch(e) {console.error("Erro startQuiz:", e);} }
        function showQuestion() { try { resetState(); let currentQuestion = quizQuestions[currentQuestionIndex]; if(quizQuestionEl) quizQuestionEl.innerHTML = currentQuestion.question; if(quizAnswersEl) { currentQuestion.answers.forEach(answer => { const button = document.createElement("button"); button.innerHTML = answer.text; button.classList.add("quiz-answer-btn"); quizAnswersEl.appendChild(button); if (answer.correct) { button.dataset.correct = answer.correct; } button.addEventListener("click", selectAnswer); }); }} catch(e) {console.error("Erro showQuestion:", e);} }
        function resetState() { try { if(quizNextBtn) quizNextBtn.style.display = "none"; if(quizAnswersEl) while (quizAnswersEl.firstChild) { quizAnswersEl.removeChild(quizAnswersEl.firstChild); }} catch(e) {console.error("Erro resetState:", e);} }
        function selectAnswer(e) { try { const selectedBtn = e.target; const isCorrect = selectedBtn.dataset.correct === "true"; if (isCorrect) { selectedBtn.classList.add("correct"); score++; } else { selectedBtn.classList.add("wrong"); } if(quizAnswersEl) { Array.from(quizAnswersEl.children).forEach(button => { if (button.dataset.correct === "true") { button.classList.add("correct"); } button.disabled = true; }); } if(quizNextBtn) quizNextBtn.style.display = "block"; } catch(e) {console.error("Erro selectAnswer:", e);} }
        function showResults() { try { resetState(); if(quizQuestionEl) quizQuestionEl.innerHTML = ""; if(quizResultEl) quizResultEl.innerHTML = `Você acertou ${score} de ${quizQuestions.length}!<br>Não importa o placar, você já ganhou meu coração 💖`; if(quizNextBtn) { quizNextBtn.innerHTML = "Jogar Novamente"; quizNextBtn.style.display = "block"; }} catch(e) {console.error("Erro showResults:", e);} }
        function handleNextButton() { try { currentQuestionIndex++; if (currentQuestionIndex < quizQuestions.length) { showQuestion(); } else { showResults(); }} catch(e) {console.error("Erro handleNextButton:", e);} }

        if (quizNextBtn) { quizNextBtn.addEventListener("click", () => { if (currentQuestionIndex < quizQuestions.length) { handleNextButton(); } else { startQuiz(); } }); }
        startQuiz();
    }

    /* =================================== */
    /* ==== LÓGICA MURAL/CHAT ESTILO ZAP ==== */
    /* =================================== */

    if (typeof firebase === 'undefined' || typeof firebase.firestore === 'undefined') {
        console.error("Firebase ou Firestore não carregados! Verifique os scripts no HTML.");
        const chatDisplay = document.getElementById('messageDisplay');
        if (chatDisplay) { chatDisplay.innerHTML = '<p class="loading-message" style="color: red;">Erro ao carregar o chat. Verifique a conexão ou tente mais tarde.</p>'; }
    } else {
        try {
            const firebaseConfig = {
              apiKey: "AIzaSyD8XrvtIzQojVcWmHuIySEbyVYDPcqY8GA",
              authDomain: "chat-desculpas.firebaseapp.com",
              projectId: "chat-desculpas",
              storageBucket: "chat-desculpas.appspot.com",
              messagingSenderId: "908898765055",
              appId: "1:908898765055:web:ca96c4c4d5e7a8c70624ca",
              measurementId: "G-46EPQN6RNT"
            };

            let app;
            if (!firebase.apps.length) { app = firebase.initializeApp(firebaseConfig); }
            else { app = firebase.app(); }
            const db = firebase.firestore(app);

            const messageDisplay = document.getElementById('messageDisplay');
            const nameInput = document.getElementById('nameInput');
            const messageInput = document.getElementById('messageInput');
            const sendMessageBtn = document.getElementById('sendMessageBtn');

            // 👇👇👇 MUDE "Xoxo" para o apelido EXATO que você vai digitar no campo "nome" 👇👇👇
            const myName = "xoxonho"; // <-- AJUSTADO PARA 'xoxonho' (minúsculo)

            function formatTimestamp(timestamp) {
                if (!timestamp || !timestamp.toDate) return '';
                const date = timestamp.toDate();
                const options = { hour: '2-digit', minute: '2-digit' };
                return date.toLocaleTimeString('pt-BR', options);
            }

            // *** FUNÇÃO displayMessage ATUALIZADA PARA MOSTRAR O NOME ***
            function displayMessage(data, append = true) {
              const messageDiv = document.createElement('div');
              messageDiv.classList.add('message-item');
              const senderName = data.name || 'Anônimo';
              if (senderName.toLowerCase() === myName.toLowerCase()) { messageDiv.classList.add('sent-by-me'); }
              else { messageDiv.classList.add('sent-by-other'); }
              const messageText = (data.text || '').replace(/</g, "<").replace(/>/g, ">");
              
              // Adiciona o nome (tag <strong>) ANTES do parágrafo da mensagem
              messageDiv.innerHTML = `
                <strong>${senderName}</strong> 
                <p>${messageText}</p>
                <span>${formatTimestamp(data.timestamp)}</span>
              `;

              if (messageDisplay) {
                   if (append) { messageDisplay.appendChild(messageDiv); } // Adiciona no fim
                   else { messageDisplay.insertBefore(messageDiv, messageDisplay.firstChild); } // Adiciona no início
              }
            }

             let isFirstLoad = true;
             let unsubscribe = null;

            function loadMessages() {
              if(!db || !messageDisplay) return;
              if (isFirstLoad) { messageDisplay.innerHTML = '<p class="loading-message">Carregando recados...</p>'; }
              if (unsubscribe) { unsubscribe(); } // Cancela listener anterior

              unsubscribe = db.collection("messages")
                .orderBy("timestamp", "asc") // Mais antigas primeiro
                .limitToLast(50)
                .onSnapshot((snapshot) => {
                   let shouldScroll = isFirstLoad || (messageDisplay.scrollHeight - messageDisplay.scrollTop - messageDisplay.clientHeight < 100); // Verifica se estava perto do fim

                   messageDisplay.innerHTML = ''; // Limpa sempre

                  if (snapshot.empty) {
                    messageDisplay.innerHTML = '<p class="loading-message">Nenhum recado ainda. Seja o primeiro!</p>';
                  } else {
                      snapshot.forEach(doc => { displayMessage(doc.data(), true); }); // AppendChild
                  }

                   if (shouldScroll) { // Rola se for primeira carga OU se já estava perto do fim
                       messageDisplay.scrollTop = messageDisplay.scrollHeight;
                   }
                   isFirstLoad = false; // Marca que a primeira carga foi feita

                }, (error) => {
                   console.error("Erro ao carregar mensagens: ", error);
                   messageDisplay.innerHTML = '<p class="loading-message" style="color: red;">Erro ao carregar recados.</p>';
                   isFirstLoad = false;
                });
            }

            function sendMessage() {
              if(!db) return;
              let name = '';
              const isMobile = window.innerWidth <= 768;
              const nameFieldVisible = nameInput && window.getComputedStyle(nameInput).display !== 'none';
              if (nameFieldVisible) {
                  name = nameInput.value.trim();
                  if (name === "") { alert("Por favor, preencha seu apelido!"); nameInput.focus(); return; }
                  localStorage.setItem('chatUserName', name);
              } else { name = localStorage.getItem('chatUserName') || myName; }
              if (!name) name = myName;

              const text = messageInput ? messageInput.value.trim() : '';
              if (text === "") { if (messageInput) messageInput.focus(); return; }

              db.collection("messages").add({
                name: name, text: text,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
              }).then(() => {
                if (messageInput) { messageInput.value = ''; messageInput.style.height = 'auto'; messageInput.focus(); }
                console.log("Mensagem enviada!");
                 // Rola para o final APÓS enviar uma mensagem
                 if(messageDisplay) messageDisplay.scrollTop = messageDisplay.scrollHeight;
              }).catch((error) => {
                console.error("Erro ao enviar mensagem: ", error);
                alert("Ocorreu um erro ao enviar seu recado. Tente novamente.");
              });
            }

            // --- Inicialização e Event Listeners do Chat ---
            if (nameInput && window.getComputedStyle(nameInput).display !== 'none') {
                const savedName = localStorage.getItem('chatUserName');
                if (savedName) { nameInput.value = savedName; }
            }
            if (sendMessageBtn) { sendMessageBtn.addEventListener('click', sendMessage); }
            if (messageInput) {
                messageInput.addEventListener('keypress', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });
                messageInput.addEventListener('input', () => { messageInput.style.height = 'auto'; messageInput.style.height = (messageInput.scrollHeight) + 'px'; });
                // Define altura inicial após o DOM estar pronto
                 setTimeout(() => { 
                     if(messageInput) { 
                         messageInput.style.height = 'auto'; 
                         messageInput.style.height = (messageInput.scrollHeight) + 'px'; 
                     }
                 }, 0);
            }
            if (messageDisplay) { loadMessages(); }

        } catch (e) {
            console.error("Erro geral ao inicializar Firebase ou Chat:", e);
             const chatDisplay = document.getElementById('messageDisplay');
             if (chatDisplay) { chatDisplay.innerHTML = '<p class="loading-message" style="color: red;">Ocorreu um erro ao iniciar o chat.</p>'; }
        }
    }

}); // Fim do DOMContentLoaded