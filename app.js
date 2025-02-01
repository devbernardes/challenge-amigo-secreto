// 🎵 Música de fundo
document.addEventListener('click', function () {
    const audio = document.getElementById("background-music");
    audio.play();
    audio.volume = 0.03;
});

// 🎭 Animação do botão "Sortear"
document.addEventListener('DOMContentLoaded', function () {
    lottie.loadAnimation({
        container: document.getElementById("play-animation"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "assets/play-animation.json",
        rendererSettings: { preserveAspectRatio: 'xMidYMid meet' }
    });
});

// 🎁 Animação do presente
const presentAnimation = lottie.loadAnimation({
    container: document.getElementById('lottie-container'),
    renderer: 'svg',
    loop: false, // Presente só anima quando um nome toca nele
    autoplay: false,
    path: 'assets/animacao.json'
});

// 🎅 Animação do Papai Noel
document.addEventListener('DOMContentLoaded', function () {
    lottie.loadAnimation({
        container: document.getElementById('santa'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/santa-animation.json'
    });
});

// ❄️ Efeito de neve
document.addEventListener('DOMContentLoaded', function () {
    setInterval(() => {
        const snowflake = document.createElement('div');
        const isFast = Math.random() > 0.5;
        snowflake.classList.add("snowflake", isFast ? 'fast' : 'slow');
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = (isFast ? (Math.random() * 2 + 3) : (Math.random() * 5 + 7)) + 's';
        document.querySelector('.snow-container').appendChild(snowflake);
        setTimeout(() => snowflake.remove(), isFast ? 5000 : 8000);
    }, 200);
});

// 📌 Referências dos elementos
const inputName = document.getElementById('amigo');
const buttonAdd = document.querySelector('.button-add');
const originalPlaceholder = inputName.placeholder;
let listaDeAmigos = []; // Altere de const para let


// ✅ Evento de clique no botão "Adicionar"
buttonAdd.addEventListener('click', () => {
    const inputValue = inputName.value.trim();

    if (inputValue === "") {
        handleInvalidInput();
    } else {
        handleValidInput(inputValue);
        inputName.value = ""; // 🔥 Agora limpa o input imediatamente!
    }
});

// ✅ Restaura o estado original quando o input recebe foco
inputName.addEventListener('focus', resetInputState);

// 🚫 Input inválido: feedback visual
function handleInvalidInput() {
    inputName.value = '';
    inputName.placeholder = 'Por favor, preencha o campo corretamente!';
    inputName.classList.add('invalid');
    buttonAdd.classList.add('invalid');
    buttonAdd.classList.remove('valid');
}

// ✅ Input válido: adiciona à lista e faz a animação
function handleValidInput(name) {
    inputName.placeholder = originalPlaceholder;
    inputName.classList.remove('invalid');
    buttonAdd.classList.remove('invalid');
    buttonAdd.classList.add('valid');

    // Adiciona nome à lista
    listaDeAmigos.push(name);
    console.log("Lista de amigos:", listaDeAmigos);

    // ✨ Faz o TEXTO do input subir para o presente
    animateTextEntry(name);
}

// 🔄 Restaura estado do input ao focar
function resetInputState() {
    inputName.placeholder = originalPlaceholder;
    inputName.classList.remove('invalid');
    buttonAdd.classList.remove('invalid');
}

// ✅ Captura evento "Enter" no teclado
document.addEventListener('keydown', (event) => {
    if (event.key === "Enter" && document.activeElement === inputName) {
        event.preventDefault();
        buttonAdd.click();
    }
    setTimeout(() => {
        buttonAdd.classList.remove('valid', 'invalid');
    }, 1150);
});

// 🏆 Faz o TEXTO do input se mover para o presente
function animateTextEntry(name) {
    const inputBox = inputName.getBoundingClientRect();
    const inputTextX = inputBox.left + inputBox.width / 2;
    const inputTextY = inputBox.top + inputBox.height / 2;

    let tempText = document.createElement('span');
    tempText.innerText = name;
    tempText.classList.add('moving-text');

    tempText.style.position = 'absolute';
    tempText.style.left = `${inputTextX}px`;
    tempText.style.top = `${inputTextY}px`;
    tempText.style.fontSize = '20px';
    tempText.style.fontWeight = 'bold';
    tempText.style.color = 'black';

    document.body.appendChild(tempText);

    // 🎭 Animação do texto subindo e ativando o presente
    tempText.animate([
        { transform: 'translate(-50%, 0)', opacity: 1 },
        { transform: `translate(-50%, -200px) scale(1.5)`, opacity: 1, offset: 0.7 },
        { transform: `translate(-50%, -220px) scale(0)`, opacity: 0 }
    ], {
        duration: 2500,
        easing: 'ease-out'
    });

    // 🎁 Ativa a animação do presente
    setTimeout(() => {
        presentAnimation.goToAndPlay(0, true);
    }, 1800);

    setTimeout(() => {
        tempText.remove();
        presentAnimation.stop();
    }, 2500);
}

// 🌟 Efeito de clique do botão "Adicionar"
buttonAdd.addEventListener('mouseup', () => {
    setTimeout(() => {
        buttonAdd.classList.remove('valid', 'invalid');
    }, 1000);
});

// Adicione estas funções no final do arquivo
document.getElementById('mostrarLista').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('listaModal').style.display = 'block';
    atualizarListaModal();
});

window.addEventListener('click', (e) => {
    if (e.target.id === 'listaModal') {
        document.getElementById('listaModal').style.display = 'none';
    }
});

function atualizarListaModal() {
    const lista = document.getElementById('listaNomes');
    lista.innerHTML = '';

    if (listaDeAmigos.length === 0) {
        lista.innerHTML = '<li style="text-align:center; color:#666">Nenhum nome adicionado ainda</li>';
        return;
    }

    const ordenados = [...listaDeAmigos].sort((a, b) => a.localeCompare(b));

    ordenados.forEach(nome => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${nome}</span>
            <span class="lixeira" onclick="removerNome('${nome}')">🗑️</span>
        `;
        lista.appendChild(li);
    });
}

function removerNome(nome) {
    // Encontra o PRIMEIRO índice do nome (remove apenas uma ocorrência)
    const index = listaDeAmigos.indexOf(nome);

    if (index !== -1) {
        listaDeAmigos.splice(index, 1); // Remove apenas 1 elemento na posição encontrada
        atualizarListaModal();

        // Atualiza a lista principal (remove o elemento correto)
        const listaPrincipal = document.getElementById('listaAmigos');
        if (listaPrincipal) {
            const items = listaPrincipal.querySelectorAll('li');
            if (items[index]) {
                items[index].remove();
            }
        }
    }
}