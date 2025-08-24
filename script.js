// Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const video = document.getElementById('loaderVideo');

  video.addEventListener('ended', () => {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  });

  setTimeout(() => {
    if (loader.style.display !== 'none') {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 500);
    }
  }, 5000); // fallback
});

const toggleButton = document.querySelector('.navbar-toggle');
const menu = document.querySelector('.navbar-menu');

toggleButton.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// Tabs & Slider
const tabs = document.querySelectorAll('.tab-button');
const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');

let currentIndex = 0;

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

// Load slides for a given tab (no carousel)
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
}

// Tab click event
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    loadSlides(tab.dataset.tab);
  });
});

// Initialize first tab
loadSlides('brand');

// Contact Form
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(contactForm);

  fetch(contactForm.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
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
