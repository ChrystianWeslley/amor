const introScreen = document.getElementById("introScreen");
const content = document.getElementById("content");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const startBtn = document.getElementById("startBtn");

let index = 0;
const images = document.querySelectorAll(".carousel img");

function changeImage() {
    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
}

setInterval(changeImage, 4000);

function startExperience() {
    introScreen.classList.add("hidden");
    content.classList.remove("hidden");
    explodeHearts(); // 💥 Corações explodem aqui
    playMusic();
}

function playMusic() {
    if (audio.paused) {
        audio.currentTime = 25;
        audio.play()
            .then(() => {
                playBtn.innerHTML = '<i class="fa fa-pause"></i>';
            })
            .catch(err => console.log("Erro ao iniciar áudio:", err));
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fa fa-play"></i>';
    }
}

startBtn.addEventListener("click", startExperience);
playBtn.addEventListener("click", playMusic);

const inicioNamoro = new Date("2024-04-06T00:00:00");

function atualizarContador() {
    const agora = new Date();
    let diff = agora - inicioNamoro;

    const segundosTotais = Math.floor(diff / 1000);
    const segundos = segundosTotais % 60;
    const minutos = Math.floor((segundosTotais / 60) % 60);
    const horas = Math.floor((segundosTotais / 3600) % 24);

    const dataInicio = new Date(inicioNamoro.getFullYear(), inicioNamoro.getMonth(), inicioNamoro.getDate());
    const dataAtual = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());

    let anos = dataAtual.getFullYear() - dataInicio.getFullYear();
    let meses = dataAtual.getMonth() - dataInicio.getMonth();
    let dias = dataAtual.getDate() - dataInicio.getDate();

    if (dias < 0) {
        meses--;
        dias += new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
    }
    if (meses < 0) {
        anos--;
        meses += 12;
    }

    document.getElementById("anos").innerText = anos;
    document.getElementById("meses").innerText = meses;
    document.getElementById("dias").innerText = dias;
    document.getElementById("horas").innerText = horas;
    document.getElementById("minutos").innerText = minutos;
    document.getElementById("segundos").innerText = segundos;
}

setInterval(atualizarContador, 1000);

function explodeHearts() {
    const container = document.getElementById("heartContainer");

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement("div");
        heart.classList.add("heart");

        const size = Math.random() * 20 + 30; // Tamanho entre 30px e 50px
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;

        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;

        heart.style.animationDuration = `${Math.random() * 1.5 + 2.5}s`; // 2.5s a 4s

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 4000); // Tempo máximo da animação
    }
}