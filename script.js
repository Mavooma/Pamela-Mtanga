// Loader

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const video = document.getElementById('loaderVideo');

  // Wait until the video finishes playing
  video.addEventListener('ended', () => {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  });

  // In case the video is short, remove loader after page load just to be safe
  setTimeout(() => {
    if(loader.style.display !== 'none'){
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 500);
    }
  }, 5000); // 5 seconds max fallback
});

const tabs = document.querySelectorAll('.tab-button');
const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');

let currentIndex = 1; // Start at 1 because we have a cloned slide at index 0
let isTransitioning = false;


// Store slides for each tab
const slidesData = {
  brand: [
    { title: 'Adidas', img: 'images/Adidas.jpg', desc: '' },
    { title: 'Sprite', img: 'images/Sprite.jpg', desc: '' },
    { title: 'Kylie Cosmetics', img: 'images/Kylie.jpg', desc: '' },
    { title: 'Mr Price', img: 'images/wondabra.jpg', desc: '' },
  ],
  media: [
    { title: 'Hennessy XO Experience', img: 'images/Henny.jpg', desc: '' },
    { title: 'TikTok Awards', img: 'images/TikTok.jpg', desc: '' },
    { title: 'Nivea Launch', img: 'images/Nivea.jpg', desc: '' },
    { title: 'Brutal Fruit Brunch', img: 'images/Brutal.jpg', desc: '' },
  ],
  creative: [
    { title: 'Honey Comb Hair', img: 'images/HoneyComb.jpg', desc: '' },
    { title: 'Glamour Woman of the Year', img: 'images/GlamourAward.jpg', desc: '' },
    { title: 'Audio journal', img: 'images/AudioJournal.jpg', desc: '' },
    { title: 'Glamours Most Glamorous', img: 'images/Award.jpg', desc: '' },
  ],
};

// Function to load slides based on tab
function loadSlides(tabName) {
  slider.innerHTML = '';
  slidesData[tabName].forEach(slide => {
    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slider-item');
    slideDiv.innerHTML = `
      <h3>${slide.title}</h3>
      <img src="${slide.img}" alt="${slide.title}">
      <p>${slide.desc}</p>
    `;
    slider.appendChild(slideDiv);
  });
  currentIndex = 0;
  updateSliderPosition();
}

// Tab click event
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    loadSlides(tab.dataset.tab);
  });
});

// Update slider position
function updateSliderPosition() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Previous & Next Buttons with infinite loop
prevBtn.addEventListener('click', () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = slider.children.length - 1; // loop to last slide
  }
  updateSliderPosition();
});

nextBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= slider.children.length) {
    currentIndex = 0; // loop back to first slide
  }
  updateSliderPosition();
});

// Initialize first tab
loadSlides('brand');

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => response.text())
      .then(result => {
        if(result.trim() === 'success'){
            formMessage.textContent = "Message sent successfully!";
            formMessage.style.color = "#b38b59";
            contactForm.reset();
        } else {
            formMessage.textContent = "Oops! Something went wrong.";
            formMessage.style.color = "red";
        }
    }).catch(error => {
        formMessage.textContent = "Oops! Something went wrong.";
        formMessage.style.color = "red";
    });
});

