const banner = document.getElementById("cta-1071");
let posX = -500,
  posY = -500;
let targetX = 0,
  targetY = 0;

// Suaviza o movimento (efeito "lerp")
function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

banner.addEventListener("mousemove", (e) => {
  const rect = banner.getBoundingClientRect();
  targetX = e.clientX - rect.left;
  targetY = e.clientY - rect.top;

  if (!banner.classList.contains("light-active")) {
    banner.classList.add("light-active");
  }
});

// // Animação suave (requestAnimationFrame)
// function updateLightPosition() {
//   posX = lerp(posX, targetX, 1);
//   posY = lerp(posY, targetY, 1);

//   banner.style.setProperty("--mouse-x", `${posX}px`);
//   banner.style.setProperty("--mouse-y", `${posY}px`);

//   requestAnimationFrame(updateLightPosition);
// }

// Adicione esta variável global
let isMouseInBanner = false;

// Modifique o event listener do mouseleave
banner.addEventListener("mouseleave", () => {
  isMouseInBanner = false;
  // Força a posição a desaparecer imediatamente
  banner.style.setProperty("--mouse-x", "-100px");
  banner.style.setProperty("--mouse-y", "-100px");
  banner.classList.remove("light-active");
});

// Atualize a função updateLightPosition
function updateLightPosition() {
  if (isMouseInBanner) {
    posX = lerp(posX, targetX, 0.2);
    posY = lerp(posY, targetY, 0.2);
  } else {
    // Reseta imediatamente quando o mouse sai
    posX = -500;
    posY = -500;
  }

  banner.style.setProperty("--mouse-x", `${posX}px`);
  banner.style.setProperty("--mouse-y", `${posY}px`);
  requestAnimationFrame(updateLightPosition);
}

// Modifique o mousemove
banner.addEventListener("mousemove", (e) => {
  isMouseInBanner = true;
  // ... resto do código ...
});

updateLightPosition(); // Inicia a animação
