document.addEventListener('DOMContentLoaded', function () {
  const dateSlider = document.getElementById('date-slider');
  const dateDisplay = document.getElementById('dateDisplay');

  // List of accepted launch windows (month is 0-indexed, so October is 9, January is 0)
  const launchWindows = {
      2024: [9], // October and November
      2026: [10, 11], // November and December
      2028: [11], // December
      2029: [0], // January
      2031: [2, 3], // October and November
  };

  function updateSliderColor() {
      const dateText = dateDisplay.innerText;
      const [day, month, year] = dateText.split('-').map(Number);
      const adjustedMonth = month - 1; // Adjust month from 1-indexed to 0-indexed

      if (launchWindows[year] && launchWindows[year].includes(adjustedMonth)) {
          dateSlider.style.setProperty('--c', 'rgb(0, 255, 21)');
          dateSlider.style.setProperty('--c', 'hsl(123, 100%, 50%)');
      } else {
          dateSlider.style.setProperty('--c', 'rgb(255, 0, 0)');
          dateSlider.style.setProperty('--c', 'hsl(0, 100%, 50%)');
      }
  }

  // Initial update
  updateSliderColor();

  // Create a MutationObserver to watch for changes in the dateDisplay element
  const observer = new MutationObserver(updateSliderColor);

  // Configure the observer to watch for changes in the text content of the dateDisplay element
  observer.observe(dateDisplay, { childList: true, characterData: true, subtree: true });
});

document.addEventListener("DOMContentLoaded", function () {
  const playPauseBtn = document.getElementById("playPauseBtn");
  const dateInput = document.getElementById("start-date");
  const dateDisplay = document.getElementById("dateDisplay");
  const dateSlider = document.getElementById("date-slider");
  const planetvid = document.getElementsByClassName("planetvid");



  let animationInterval;
  let isPlaying = true; // Start with the animation playing
  let currentDate = new Date();

  const referenceDate = new Date("2024-07-09"); // Reference date

  const planets = {
    Mercury: { period: 88, initialAngle: 230 },
    Venus: { period: 224.7, initialAngle: 315 },
    Earth: { period: 365.25, initialAngle: 160 },
    Mars: { period: 687, initialAngle: 70 },
    Future_Mars: { period: 687, initialAngle: 290 },
    Jupiter: { period: 4331, initialAngle: 22 },
    Saturn: { period: 10747, initialAngle: 100 },
    Uranus: { period: 30589, initialAngle: 35 },
    Neptune: { period: 59800, initialAngle: 95 },
  };

  function updatePlanetPositions(date) {
    const daysElapsed = (date - referenceDate) / (1000 * 60 * 60 * 24);

    for (let key in planets) {
      const planet = planets[key];
      const degrees =
        (planet.initialAngle - (360 * daysElapsed) / planet.period) % 360;
      const orbitElement = document.querySelector(
        `.${key.toLowerCase()}-orbit`
      );
      if (orbitElement) {
        orbitElement.style.transform = `rotate(${degrees}deg)`;
      }
    }
  }
  

  function playPauseAnimation() {
    if (isPlaying) {
      clearInterval(animationInterval);
      playPauseBtn.innerHTML = "<img src='Assets/images/play.png' alt='play'>";
      for(let i=0 ; i < planetvid.length ; i++){
        planetvid[i].playbackRate = 0; 
      }
    } else {
      animationInterval = setInterval(() => {
        currentDate.setDate(currentDate.getDate() + 1);
        dateDisplay.textContent = `${currentDate
          .getDate()
          .toString()
          .padStart(2, "0")}-${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${currentDate.getFullYear()}`;
        updatePlanetPositions(currentDate);
        for(let i=0 ; i < planetvid.length ; i++){

            planetvid[i].playbackRate = 1; 
          }

      }, 100);
      playPauseBtn.innerHTML = "<img src='Assets/images/pause.png' alt='pause'>";
    }
    isPlaying = !isPlaying;
  }

  playPauseBtn.addEventListener("click", playPauseAnimation);

  dateInput.addEventListener("change", function () {
    currentDate = new Date(this.value);
    dateDisplay.textContent = `Date: ${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${currentDate.getFullYear()}`;
    updatePlanetPositions(currentDate);
  });

  dateSlider.addEventListener("input", function () {
    const startDate = new Date("2024-07-09");
    const monthsToAdd = this.value;
    const newDate = new Date(
      startDate.setMonth(startDate.getMonth() + parseInt(monthsToAdd))
    );
    currentDate = newDate;
    dateDisplay.textContent = `${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${currentDate.getFullYear()}`;
    updatePlanetPositions(currentDate);
  });

  // Set initial date input value to current date
  dateInput.value = currentDate.toISOString().slice(0, 10);
  dateDisplay.textContent = `${currentDate
    .getDate()
    .toString()
    .padStart(2, "0")}-${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${currentDate.getFullYear()}`;
  playPauseBtn.innerHTML = "<img src='Assets/images/pause.png' alt='pause'>";

  // Initialize positions and start the animation
  updatePlanetPositions(currentDate);
  animationInterval = setInterval(() => {
    currentDate.setDate(currentDate.getDate() + 1);
    dateDisplay.textContent = `${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${currentDate.getFullYear()}`;
    updatePlanetPositions(currentDate);
  }, 100);
});

document.addEventListener('DOMContentLoaded', function () {
  const zoomSlider = document.getElementById('zoom-slider');

  // Initial scale value
  let initialScaleValue = zoomSlider.value / 10;
  document.querySelector(".solar-system").style.transform = `scale(${initialScaleValue})`;

  // Function to update the scale value
  function updateScale() {
    let scaleValue = zoomSlider.value / 10;
    document.querySelector(".solar-system").style.transform = `scale(${scaleValue})`;

    if (scaleValue >= 2.6) {
      // Max zoom value
      document.querySelectorAll(".jupiter, .saturn, .uranus, .neptune, .venus, .mercury")
        .forEach(el => el.style.opacity = '0');
      document.querySelectorAll(".jupiter-orbit, .saturn-orbit, .uranus-orbit, .neptune-orbit, .venus-orbit, .mercury-orbit")
        .forEach(el => el.style.opacity = '0');
    } else {
      document.querySelectorAll(".jupiter, .saturn, .uranus, .neptune, .venus, .mercury")
        .forEach(el => el.style.opacity = '1');
      document.querySelectorAll(".jupiter-orbit, .saturn-orbit, .uranus-orbit, .neptune-orbit, .venus-orbit, .mercury-orbit")
        .forEach(el => el.style.opacity = '1');
    }
  }

  // Update scale on slider input
  zoomSlider.addEventListener('input', updateScale);

  // Update scale on mouse wheel scroll
  document.addEventListener('wheel', function (event) {
    event.preventDefault();
    let delta = event.deltaY;
    let newValue = parseInt(zoomSlider.value, 10) - Math.sign(delta);

    if (newValue >= zoomSlider.min && newValue <= zoomSlider.max) {
      zoomSlider.value = newValue;
      updateScale();
    }
  });
});
