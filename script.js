// Funzione per rigenerare posizioni casuali e salvarle nel localStorage
function regeneratePositions() {
  let positions = [];

  images.forEach(image => {
    const randomX = Math.random() * (window.innerWidth - 600) + 100;
    const randomY = Math.random() * (window.innerHeight - 600) + 100;

    positions.push({ left: randomX, top: randomY });
  });

  localStorage.setItem('imagePositions', JSON.stringify(positions));

  images.forEach((image, index) => {
    image.style.left = `${positions[index].left}px`;
    image.style.top = `${positions[index].top}px`;
  });
}

// Funzione per recuperare o generare posizioni iniziali
function randomizeImagePositions() {
  let savedPositions = localStorage.getItem('imagePositions');

  if (!savedPositions) {
    regeneratePositions();
  } else {
    savedPositions = JSON.parse(savedPositions);
    images.forEach((image, index) => {
      image.style.left = `${savedPositions[index].left}px`;
      image.style.top = `${savedPositions[index].top}px`;
    });
  }
}

// Funzione per rendere le immagini trascinabili
const images = document.querySelectorAll('.draggable');
let isDragging = false;

images.forEach(image => {
  let startX, startY, initialX, initialY;

  image.addEventListener('mousedown', (e) => {
    if (!radioButton.classList.contains('expanded')) { // Blocca il drag se il bottone è espanso
      e.preventDefault();
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialX = image.offsetLeft;
      initialY = image.offsetTop;
      image.style.cursor = 'grabbing';

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });

  function onMouseMove(e) {
    if (isDragging) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      image.style.left = `${initialX + dx}px`;
      image.style.top = `${initialY + dy}px`;
    }
  }

  function onMouseUp() {
    isDragging = false;
    image.style.cursor = 'grab';

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
});

// Esegui la funzione quando la pagina viene caricata
window.addEventListener('load', randomizeImagePositions);

// Blocca il drag delle immagini quando il bottone "Radio" è espanso
const radioButton = document.getElementById('radioButton');
const overlay = document.getElementById('overlay');
const body = document.querySelector('body');
const worksButton = document.getElementById('worksButton'); // Bottone Works
const radioBox = document.getElementById('radioBox'); // Rettangolo espanso per Radio

radioButton.addEventListener('click', () => {
  if (radioButton.classList.contains('expanded')) {
    radioButton.classList.remove('expanded');
    overlay.style.display = 'none';
    body.classList.remove('dimmed');
    radioBox.classList.remove('active'); // Nasconde il rettangolo
    worksButton.style.transform = 'translateX(0)'; // Riporta Works alla posizione originale
  } else {
    radioButton.classList.add('expanded');
    overlay.style.display = 'block';
    body.classList.add('dimmed');
    radioBox.classList.add('active'); // Mostra il rettangolo

    // Sposta il bottone "Works" per far spazio al rettangolo
    worksButton.style.transform = 'translateX(-320px)';
  }
});
