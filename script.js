// Se estamos na index.html → capturar e salvar os dados
const form = document.getElementById("love-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name1 = document.getElementById("name1").value;
    const name2 = document.getElementById("name2").value;
    const game = document.getElementById("game").value;
    const duration = document.getElementById("duration").value;
    const file = document.getElementById("photo").files[0];

    if (!file) {
      console.warn("⚠️ Nenhuma imagem foi selecionada.");
      return;
    }

    const reader = new FileReader();

    reader.onload = function () {
      const imageBase64 = reader.result;

      const data = { name1, name2, game, duration, imageBase64 };
      console.log("✅ Dados salvos no localStorage:", data); // LOG importante

      localStorage.setItem("bitloveData", JSON.stringify(data));
      window.location.href = "card.html";
    };

    reader.onerror = function (error) {
      console.error("❌ Erro ao ler a imagem:", error);
    };

    reader.readAsDataURL(file);
  });
}

// Se estamos na card.html → carregar os dados e exibir tudo
if (window.location.pathname.includes("card.html")) {
  const data = JSON.parse(localStorage.getItem("bitloveData"));

  console.log("📦 Dados carregados do localStorage:", data); // LOG importante

  function gerarPoemaSimulado() {
    const poemas = [
      `${data.name1} e ${data.name2}, unidos no coração,\nVivem juntos sua melhor missão.\nNo jogo da vida, com ${data.duration} de paixão,\nZeraram a fase da solidão.\nCom o poder do ${data.game} na mão,\nDerrotam chefões na mesma direção.\nCada nível, uma nova emoção,\nUm amor com alta resolução.`,

      `De mãos dadas no mundo em pixel,\n${data.name1} e ${data.name2}, casal incrível.\nJogam ${data.game} com dedicação,\nE acumulam XP da paixão.\nCom ${data.duration} de parceria total,\nSão o casal final!`,

      `Em pixels e paixão, eles são perfeição,\n${data.name1} e ${data.name2} zeraram a solidão.\nNo universo de ${data.game}, um só coração,\n${data.duration} de jogo, uma linda conexão.`
    ];

    return poemas[Math.floor(Math.random() * poemas.length)];
  }

  function gerarConteudoLocal() {
    if (!data || !data.imageBase64) {
      console.warn("⚠️ Nenhum dado ou imagem encontrada no localStorage.");
      return;
    }

    // Exibe imagens
    const original = document.getElementById("original-photo");
    const generated = document.getElementById("generated-photo");

    original.src = data.imageBase64;
    generated.src = "lovebit.jpeg";

    console.log("🖼️ Imagem original definida como:", original.src);
    console.log("❤️ Imagem decorativa (lovebit.jpeg) definida como:", generated.src);

    // Exibe informações
    document.getElementById("game-theme").textContent = data.game;
    document.getElementById("time-together").textContent = data.duration;

    // Exibe poema simulado
    document.getElementById("poem-output").textContent = gerarPoemaSimulado();
  }

  gerarConteudoLocal();
}


function gerarChuvaDeCoracoes() {
    const container = document.querySelector("#heart-container");
    const heartImage = "bitlove.png"; // Substitua pelo nome correto do coração (de preferência PNG pequeno)
  
    setInterval(() => {
      const heart = document.createElement("img");
      heart.src = heartImage;
      heart.classList.add("heart-drop");
  
      // posição horizontal aleatória dentro da largura da .card-content
      heart.style.left = `${Math.random() * 90}%`;
  
      // tamanho aleatório (opcional)
      const scale = 0.8 + Math.random() * 0.5;
      heart.style.transform = `scale(${scale})`;
  
      container.appendChild(heart);
  
      // remove do DOM depois da animação
      setTimeout(() => heart.remove(), 4000);
    }, 200); // intervalo entre corações – pode ajustar
  }
  
  if (window.location.pathname.includes("card.html")) {
    gerarChuvaDeCoracoes();
  }
  
  fetch('/api/saveData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(result => {
    console.log('✅ Backend respondeu:', result);
  })
  .catch(error => {
    console.error('❌ Erro ao enviar para o backend:', error);
  });
  