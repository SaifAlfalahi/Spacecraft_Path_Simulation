const resultDiv = document.getElementById('result');

function showDistance(planetName, distanceInAU) {
    resultDiv.innerHTML = `${planetName} = ${distanceInAU} AU from Sun`;
}

const planetButtons = document.querySelectorAll('.planet-buttons button');
planetButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        const planetName = button.textContent;
        let distanceInAU;
        switch (planetName) {
            case 'Mercury':
                distanceInAU = 0.39;
                break;
            case 'Venus':
                distanceInAU = 0.72;
                break;
            case 'Earth':
                distanceInAU = 1;
                break;
            case 'Mars':
                distanceInAU = 1.5;
                break;
            case 'Jupiter':
                distanceInAU = 5.2;
                break;
            case 'Saturn':
                distanceInAU = 9.538;
                break;
            case 'Uranus':
                distanceInAU = 19;
                break;
            case 'Neptune':
                distanceInAU = 30;
                break;
        }
        showDistance(planetName, distanceInAU);
    });
});

let planetDistances = {
    mercury: 0.39,
    venus: 0.72,
    earth: 1,
    mars: 1.5,
    jupiter: 5.2,
    saturn: 9.538,
    uranus: 19,
    neptune: 30
};

function selectPlanet(planet) {
    let distance = planetDistances[planet];
    document.getElementById('result').innerText = `Selected Planet: ${planet.charAt(0).toUpperCase() + planet.slice(1)}, Distance from Sun: ${distance} AU`;
}

function convertValues() {
    let planetB = document.getElementById('b').value;
    let planetA = planetDistances['earth']; // Earth is the reference point

    // Convert the values to a1 and b1
    let a1 = planetA * 149600000;
    let b1 = planetB * 149600000;

    //find hohman transfer orbit in km and Au - semi major axis
    let h_km = (a1 + b1)/2.0;
    let h_au = h_km/a1;

    //To find mechanical energy of space craft in earth's parking orbit
    const GM = 1.33e11;
    let MEnergy_PO = (GM/((-2)*a1));

    //To find velocity in earth's parking orbit
    let Velocity_PO = (Math.sqrt(((GM/a1) + MEnergy_PO)*2));

    //To find mechanical energy of space craft in hohmann tranfer
    let MEnergy_HT = (GM/((-2)*h_km));

    //To find velocity in earth's parking orbit
    let Velocity_HT = (Math.sqrt(((GM/a1) + (MEnergy_HT))*2));

    //To find delta velocity to go from orbit 1 to transfer orbit
    let delta_vel = Math.abs(Velocity_PO-Velocity_HT);

    //To find mechanical energy of orbit 2
    let MEnergy_O2 = (GM/((-2)*h_km));

    //To find velocity in orbit 2
    let Velocity_O2 = (Math.sqrt(((GM/h_km) + MEnergy_O2)*2));

    //To find mechanical energy of orbit 2 to hohman
    let MEnergy_O2H = (GM/((-2)*b1));

    //To find velocity of orbit 2 to hohman
    let Velocity_O2H = (Math.sqrt(((GM/b1) + (MEnergy_O2H))*2));

    //To find delta velocity to go from orbit 1 to transfer orbit
    let delta_vel2 = Math.abs(Velocity_O2-Velocity_O2H);

    //Calculate the total ∆V needed for the trip from orbit 1 to orbit 2
    let delta_total = delta_vel+delta_vel2;

    document.getElementById('result1').innerText = `Planet A Distance: ${planetA} AU`;
    document.getElementById('result2').innerText = `Planet B Distance: ${planetB} AU`;

    document.getElementById('result3').innerText = `Hohmann Transfer Orbit: ${h_au} AU`;

    document.getElementById('result4').innerText = `∆V1: ${delta_vel} AU`;
    document.getElementById('result5').innerText = `∆V2: ${delta_vel2} AU`;
    document.getElementById('result6').innerText = `Total ∆V: ${delta_total} AU`;

}

const planets = {
    Mars: { period: 687, synodicPeriod: 780, lastLaunch: new Date('2022-09-01') },
    Mercury: { period: 88 },
    Venus: { period: 224.7 },
    Earth: { period: 365.25 },
    Jupiter: { period: 4331 },
    Saturn: { period: 10747 },
    Uranus: { period: 30589 },
    Neptune: { period: 59800 }
};


function updatePlanetPositions(date) {
    const startDate = new Date("2024-01-01");
    const elapsedDays = (date - startDate) / (1000 * 60 * 60 * 24);

    for (let key in planets) {
        const planet = planets[key];
        const orbitElement = document.querySelector(`.${key.toLowerCase()}-orbit`);
        const degrees = (elapsedDays / planet.period * 360) % 360;
        orbitElement.style.transform = `rotate(${degrees}deg)`;
    }
}


document.getElementById("start-date").addEventListener("change", function() {
    updatePlanetPositions(new Date(this.value));
});


//launch windown calculator
document.addEventListener("DOMContentLoaded", function() {
    const planets = [
        { name: "Mars", synodicPeriod: 780, lastLaunch: new Date('2022-09-01') }
    ];

    function calculateLaunchWindows() {
        const startDate = new Date(document.getElementById("start-date").value);
        if (!startDate) {
            alert("Please select a start date.");
            return;
        }
    
        const tableBody = document.getElementById("launchWindowTable");
        tableBody.innerHTML = "";
    
        for (let key in planets) {
            if (planets[key].synodicPeriod) {
                const { synodicPeriod, lastLaunch } = planets[key];
                let nextLaunchWindow = new Date(lastLaunch.getTime());
                while (nextLaunchWindow <= startDate) {
                    nextLaunchWindow = new Date(nextLaunchWindow.getTime() + synodicPeriod * 24 * 60 * 60 * 1000);
                }
    
                const formattedLaunchWindow = nextLaunchWindow.toLocaleDateString(undefined, {year: 'numeric', month: 'short' });
    
                const row = document.createElement("tr");
                row.innerHTML = `<td>${formattedLaunchWindow}</td>`;
                tableBody.appendChild(row);
            }
        }
    }
    
    window.calculateLaunchWindows = calculateLaunchWindows;
});