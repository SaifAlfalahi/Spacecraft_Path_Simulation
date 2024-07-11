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
    Future_Mars: { period: 687, initialAngle: 297 },
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
      playPauseBtn.innerHTML = "<img src='images/play.png' alt='play'>";
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
      playPauseBtn.innerHTML = "<img src='images/pause.png' alt='pause'>";
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
  playPauseBtn.innerHTML = "<img src='images/pause.png' alt='pause'>";

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

//Slider script
var initialScaleValue = $("#zoom-slider").val() / 10;
$(".solar-system").css("transform", "scale(" + initialScaleValue + ")");
// Slider script to scale the solar system
$("#zoom-slider").on("input change", function () {
  var scaleValue = $(this).val() / 10;
  $(".solar-system").css("transform", "scale(" + scaleValue + ")");

  if (scaleValue >= 2.6) {
    // Max zoom value
    $(".jupiter, .saturn, .uranus, .neptune, .venus, .mercury").css(
      "opacity",
      "0"
    );
    $(
      ".jupiter-orbit, .saturn-orbit, .uranus-orbit, .neptune-orbit, .venus-orbit, .mercury-orbit"
    ).css("opacity", "0");
  } else {
    $(".jupiter, .saturn, .uranus, .neptune, .venus, .mercury").css(
      "opacity",
      "1"
    );
    $(
      ".jupiter-orbit, .saturn-orbit, .uranus-orbit, .neptune-orbit, .venus-orbit, .mercury-orbit"
    ).css("opacity", "1");
  }
});
