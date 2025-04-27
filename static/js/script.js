let btnMenu = document.getElementById("btn-menu");
let menu = document.getElementById("menu-mobile");
let overlay = document.getElementById("overlay-menu");

btnMenu.addEventListener("click", () => {
    menu.classList.add("abrir-menu"); // Corrigido para a classe correta
});

menu.addEventListener("click", () => {
    menu.classList.remove("abrir-menu");
});

overlay.addEventListener("click", () => {
    menu.classList.remove("abrir-menu");
});
let currentIndex = 0;
const scrollContainer = document.getElementById("portfolio-scroll");
const projects = document.querySelectorAll(".projeto-box");
const dots = document.querySelectorAll(".dot");
const projectWidth = projects[0].offsetWidth + 20;
const totalProjects = projects.length;

// Clonar primeiros projetos para efeito de looping
for (let i = 0; i < 3; i++) {
    let clone = projects[i].cloneNode(true);
    scrollContainer.appendChild(clone);
}

function updatePagination() {
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentIndex % totalProjects].classList.add("active");
}

function scrollToProject(index) {
    scrollContainer.style.transition = "transform 0.3s ease-in-out";
    scrollContainer.style.transform = `translateX(${-index * projectWidth}px)`;
    currentIndex = index;
    updatePagination();
}
function autoScroll() {
    currentIndex++;
    scrollToProject(currentIndex);

    if (currentIndex === totalProjects) {
        setTimeout(() => {
            scrollContainer.style.transition = "none";
            scrollContainer.style.transform = `translateX(0px)`;
            currentIndex = 0;
            updatePagination();
        }, 500);
    }
}
setInterval(autoScroll, 9000);
updatePagination();

// --- CORREÇÃO PARA PARTÍCULAS DE FUNDO ---
document.addEventListener("DOMContentLoaded", () => {
    // Verificar se o elemento particles-js existe
    const particlesContainer = document.getElementById("particles-js");
    
    if (particlesContainer && typeof tsParticles !== 'undefined') {
        // Inicializar as partículas apenas se a biblioteca e o elemento estiverem disponíveis
        tsParticles.load("particles-js", {
            fullScreen: { enable: false },
            particles: {
                number: { value: 50 },
                color: { value: "#7f5af0" },
                shape: { type: "circle" },
                opacity: { value: 0.5 },
                size: { value: { min: 1, max: 5 } },
                move: { 
                    enable: true, 
                    speed: 2,
                    direction: "none",
                    random: true,
                    outMode: "bounce"
                },
            },
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "repulse" },
                    onClick: { enable: true, mode: "push" },
                },
                modes: {
                    repulse: { distance: 100 },
                    push: { quantity: 4 },
                },
            },
            detectRetina: true,
            background: {
                color: "transparent"
            }
        }).then(() => {
            console.log("Partículas carregadas com sucesso!");
        }).catch(err => {
            console.error("Erro ao carregar partículas:", err);
        });
    } else {
        console.error("Elemento particles-js não encontrado ou biblioteca tsParticles não carregada");
    }
document.addEventListener("DOMContentLoaded", () => {
    const flipCards = document.querySelectorAll(".flip-card");
    let currentlyFlippedCard = null; // Guarda o card atualmente virado

    if (!("ontouchstart" in window)) {
        // Em desktops: virar no mouseover
        flipCards.forEach((card) => {
            const inner = card.querySelector(".flip-card-inner");
            card.addEventListener("mouseenter", () => {
                inner.style.transform = "rotateY(180deg)";
            });
            card.addEventListener("mouseleave", () => {
                inner.style.transform = "rotateY(0deg)";
            });
        });
    } else {
        // Em mobile: virar no clique
        flipCards.forEach((card) => {
            const inner = card.querySelector(".flip-card-inner");
            card.addEventListener("click", () => {
                if (currentlyFlippedCard && currentlyFlippedCard !== inner) {
                    currentlyFlippedCard.style.transform = "rotateY(0deg)";
                }

                if (currentlyFlippedCard === inner) {
                    // Se clicar no mesmo card aberto, fecha
                    inner.style.transform = "rotateY(0deg)";
                    currentlyFlippedCard = null;
                } else {
                    // Se clicar em outro card, abre o novo
                    inner.style.transform = "rotateY(180deg)";
                    currentlyFlippedCard = inner;
                }
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const formularioContato = document.getElementById("form-contato");

    formularioContato.addEventListener("submit", function (e) {
        e.preventDefault(); // Impede o envio padrão do formulário

        const nome = this.querySelector('input[name="nome"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const telefone = this.querySelector('input[name="telefone"]').value;
        const mensagem = this.querySelector('textarea[name="mensagem"]').value;

        // Verificação de campos obrigatórios
        if (!nome || !email || !mensagem) {
            mostrarNotificacao(
                "Por favor, preencha todos os campos obrigatórios",
                "erro"
            );
            return;
        }

        // FormData para enviar os dados
        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("email", email);
        formData.append("telefone", telefone);
        formData.append("mensagem", mensagem);

        // Envia os dados com AJAX
        fetch("https://formspree.io/f/mjkgnqjq", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    mostrarNotificacao(
                        "Mensagem enviada com sucesso!",
                        "sucesso"
                    );
                    formularioContato.reset(); // Reseta o formulário após envio
                } else {
                    mostrarNotificacao(
                        "Erro ao enviar a mensagem. Tente novamente.",
                        "erro"
                    );
                }
            })
            .catch(() => {
                mostrarNotificacao(
                    "Erro ao enviar a mensagem. Tente novamente.",
                    "erro"
                );
            });
    });

    function mostrarNotificacao(mensagem, tipo = "info") {
        const notificacao = document.createElement("div");
        notificacao.className = `notificacao ${tipo}`;
        notificacao.textContent = mensagem;

        document.body.appendChild(notificacao);

        setTimeout(() => {
            notificacao.classList.add("mostrar");
        }, 10);

        setTimeout(() => {
            notificacao.classList.remove("mostrar");
            setTimeout(() => {
                document.body.removeChild(notificacao);
            }, 300);
        }, 3000);
    }
});
