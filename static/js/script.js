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
const projects = document.querySelectorAll(".img-port");
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
    scrollContainer.style.transition = "transform 0.5s ease-in-out";
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

setInterval(autoScroll, 3000);
updatePagination();
