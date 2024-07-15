document.addEventListener("DOMContentLoaded", function () {
  setupGlassContainer3ClickHandler();
  setupGlassContainer2ClickHandler();
  setupDocumentClickHandler();
});
function setupGlassContainer3ClickHandler() {
  const glassContainer3 = document.getElementById("glassContainer3");
  const solar = document.querySelector('.solar-system');
  const glassContainer2 = document.getElementById("glassContainer2");
  const vert = document.querySelector('.vert');
  const vert2 = document.querySelector('.vert2');

  if (glassContainer3) {
    glassContainer3.addEventListener("click", function (event) {
      event.stopPropagation();  // Prevent the event from bubbling up
      glassContainer3.style.left = "-2vh";
      glassContainer2.style.right = "-31vw";
      solar.style.left = "10vw";
      vert.style.opacity = "0";
      vert2.style.opacity = "1";

    });
  } else {
    console.error("Element with id 'glassContainer3' not found");
  }
}

function setupGlassContainer2ClickHandler() {
  const glassContainer2 = document.getElementById("glassContainer2");
  const solar = document.querySelector('.solar-system');
  const glassContainer3 = document.getElementById("glassContainer3");
  const vert = document.querySelector('.vert');
  const vert2 = document.querySelector('.vert2');
  if (glassContainer2) {
    glassContainer2.addEventListener("click", function (event) {
      event.stopPropagation();  // Prevent the event from bubbling up
      glassContainer2.style.right = "-2vh";
      glassContainer3.style.left = "-31vw";
      solar.style.left = "-10vw";
      vert2.style.opacity = "0";
      vert.style.opacity = "1";

    });
  } else {
    console.error("Element with id 'glassContainer2' not found");
  }
}
function setupDocumentClickHandler() {
  const solar = document.querySelector('.solar-system');
  const glassContainer3 = document.getElementById("glassContainer3");
  const glassContainer2 = document.getElementById("glassContainer2");
  const vert = document.querySelector('.vert');
  const vert2 = document.querySelector('.vert2');
  document.addEventListener("click", function (event) {
    // Check if the click happened outside both glassContainer3 and glassContainer2
    if (!glassContainer3.contains(event.target) && !glassContainer2.contains(event.target)) {
      solar.style.left = "0vw";
      glassContainer2.style.right = "-31vw";
      glassContainer3.style.left = "-31vw";
      vert2.style.opacity = "1";
      vert.style.opacity = "1";

    }
  });
}

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
        playPauseBtn.innerHTML = "<img  style='margin-top:-1.0vh' src='Assets/images/play.png' alt='play'>";
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
          updateSliderValue();
          for(let i=0 ; i < planetvid.length ; i++){
            planetvid[i].playbackRate = 1; 
          }
        }, 100);
        playPauseBtn.innerHTML = "<img  style='margin-top:-1.0vh' src='Assets/images/pause.png' alt='pause'>";
      }
      isPlaying = !isPlaying;
    }
  
    function updateSliderValue() {
      dateSlider.style.setProperty('--val', dateSlider.value); // Update --val CSS variable
      const startDate = new Date("2024-07-09");
      const differenceInMonths = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth());
  
      dateSlider.value = differenceInMonths;
    }
  
    playPauseBtn.addEventListener("click", playPauseAnimation);
  
    dateInput.addEventListener("change", function () {
      currentDate = new Date(this.value);
      dateDisplay.textContent = `${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${currentDate.getFullYear()}`;
      updatePlanetPositions(currentDate);
      updateSliderValue();
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
    playPauseBtn.innerHTML = "<img style='margin-top:-1.0vh' src='Assets/images/pause.png' alt='pause'>";
  
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
      updateSliderValue();
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
  
