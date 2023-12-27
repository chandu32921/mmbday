const picContainer = document.getElementById('pic-container');
const disappearButton = document.getElementById('disappear-button');

const imageUrls = [
  'pic1.png',
  'pic2.jpg',
  'pic3.jpg',
];

const wishes = [
  "Wishing you a day filled with joy and laughter!",
  "May your year be as bright and beautiful as you are.",
  "Happy Birthday! May all your dreams come true.",
];

function calculateImageSize() {
  const screenWidth = document.documentElement.clientWidth;
  const imageWidth = screenWidth * 0.1;
  const numImagesFactor = 2;
  const numImages = Math.ceil(screenWidth / imageWidth) * numImagesFactor + 1;
  return { width: imageWidth, numImages };
}

function getRandomPosition(imageSize) {
  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;
  const randomX = Math.floor(Math.random() * (screenWidth - imageSize.width));
  const randomY = Math.floor(Math.random() * (screenHeight - imageSize.width));
  return { x: randomX, y: randomY };
}

function createAndDisplayImages() {
  const { width: imageSizeWidth, numImages } = calculateImageSize();

  for (let i = 0; i < numImages; i++) {
    for (let j = 0; j < imageUrls.length; j++) {
      const img = new Image();
      img.src = imageUrls[j];
      img.style.width = `${imageSizeWidth}px`;
      img.style.height = 'auto';
      img.style.opacity = 0;
      img.style.position = 'absolute';

      const randomPosition = getRandomPosition({ width: imageSizeWidth });
      img.style.left = `${randomPosition.x}px`;
      img.style.top = `${randomPosition.y}px`;

      const randomScale = Math.random() * (1.5 - 0.5) + 0.5;
      img.style.transform = `translate(-50%, -50%) scale(${randomScale})`;
      img.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

      img.addEventListener('mousedown', (event) => startDragging(event, img));

      // Apply fade-in and random scale animation with delay
      setTimeout(() => {
        picContainer.appendChild(img);
        img.style.opacity = 1;
      }, i * 300 + j * 100);
    }
  }
}

function startDragging(event, element) {
  const offsetX = event.clientX - element.getBoundingClientRect().left;
  const offsetY = event.clientY - element.getBoundingClientRect().top;

  function moveElement(event) {
    const x = event.clientX - offsetX;
    const y = event.clientY - offsetY;

    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  }

  function stopDragging() {
    window.removeEventListener('mousemove', moveElement);
    window.removeEventListener('mouseup', stopDragging);
  }

  window.addEventListener('mousemove', moveElement);
  window.addEventListener('mouseup', stopDragging);
}

function disappearAll() {
  const allImages = document.querySelectorAll('#pic-container img');
  allImages.forEach((img) => {
    img.style.opacity = 0;
    setTimeout(() => {
      picContainer.removeChild(img);
    }, 800);
  });

  displayWishes();
}

function displayWishes() {
  const wishesContainer = document.createElement('div');
  wishesContainer.id = 'wishes-container';
  wishesContainer.style.position = 'absolute';
  wishesContainer.style.top = '50%';
  wishesContainer.style.left = '50%';
  wishesContainer.style.transform = 'translate(-50%, -50%)';
  wishesContainer.style.textAlign = 'center';
  wishesContainer.style.fontFamily = 'cursive';
  wishesContainer.style.fontSize = '24px';
  wishesContainer.style.color = '#333';

  picContainer.appendChild(wishesContainer);

  wishes.forEach((wish, lineIndex) => {
    const lineContainer = document.createElement('p');
    wishesContainer.appendChild(lineContainer);

    for (let charIndex = 0; charIndex < wish.length; charIndex++) {
      setTimeout(() => {
        lineContainer.textContent += wish[charIndex];
      }, charIndex * 50 + lineIndex * 200);
    }
  });
}

createAndDisplayImages();

disappearButton.addEventListener('click', disappearAll);

window.addEventListener('resize', () => {
  picContainer.innerHTML = '';
  createAndDisplayImages();
});
