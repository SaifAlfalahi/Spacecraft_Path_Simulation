document.addEventListener("DOMContentLoaded", function() {
    const playPauseBtn = document.getElementById("playPauseBtn");
    const dateInput = document.getElementById("start-date");
    const dateDisplay = document.getElementById("dateDisplay");

    let animationInterval;
    let isPlaying = true; // Start with the animation playing
    let currentDate = new Date();

    const referenceDate = new Date("2024-07-09"); // Reference date

    const planets = {
        Mercury: { period: 88, initialAngle: 230 },   
        Venus: { period: 224.7, initialAngle: 315 }, 
        Earth: { period: 365.25, initialAngle: 160 },
        Mars: { period: 687, initialAngle: 70 },
        Jupiter: { period: 4331, initialAngle: 22 },
        Saturn: { period: 10747, initialAngle: 100 },
        Uranus: { period: 30589, initialAngle: 35 },
        Neptune: { period: 59800, initialAngle: 95 }
    };

    function updatePlanetPositions(date) {
        const daysElapsed = (date - referenceDate) / (1000 * 60 * 60 * 24);

        for (let key in planets) {
            const planet = planets[key];
            const degrees = (planet.initialAngle - (360 * daysElapsed / planet.period)) % 360;
            const orbitElement = document.querySelector(`.${key.toLowerCase()}-orbit`);
            if (orbitElement) {
                orbitElement.style.transform = `rotate(${degrees}deg)`;
            }
        }
    }

    function playPauseAnimation() {
        if (isPlaying) {
            clearInterval(animationInterval);
            playPauseBtn.textContent = "Play";
        } else {
            animationInterval = setInterval(() => {
                currentDate.setDate(currentDate.getDate() + 1);
                dateDisplay.textContent = `Date: ${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
                updatePlanetPositions(currentDate);
            }, 100);
            playPauseBtn.textContent = "Pause";
        }
        isPlaying = !isPlaying;
    }

    playPauseBtn.addEventListener("click", playPauseAnimation);

    dateInput.addEventListener("change", function() {
        currentDate = new Date(this.value);
        dateDisplay.textContent = `Date: ${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
        updatePlanetPositions(currentDate);
    });

    // Set initial date input value to current date
    dateInput.value = currentDate.toISOString().slice(0, 10);
    dateDisplay.textContent = `Date: ${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
    playPauseBtn.textContent = "Pause";

    // Initialize positions and start the animation
    updatePlanetPositions(currentDate);
    animationInterval = setInterval(() => {
        currentDate.setDate(currentDate.getDate() + 1);
        dateDisplay.textContent = `Date: ${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
        updatePlanetPositions(currentDate);
    }, 100);
});