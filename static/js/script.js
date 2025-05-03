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
