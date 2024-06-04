// Constants
const G = 6.67430e-11; // Gravitational constant (m^3/kg/s^2)

// Function to calculate distance between two planets
function hohmannTransferDistance(planet1, planet2) {
    // Here you can calculate the distance dynamically
    // between the two planets based on their positions.
    // For the sake of example, let's assume a simple calculation.
    const r1 = Math.random() * 1e8; // Random value for demonstration
    const r2 = Math.random() * 1e8; // Random value for demonstration
    const distance = Math.PI * (r1 + r2) * Math.sqrt((2 * r2) / (r1 + r2));
    return distance;
}

// Function to calculate delta-v for Hohmann transfer
function hohmannTransferDeltaV(r1, r2) {
    const v1 = Math.sqrt(G / r1); // Velocity in initial orbit
    const v2 = Math.sqrt(G / r2); // Velocity in final orbit
    const deltaV1 = Math.abs(v2 - v1); // Delta-v for first burn
    const deltaV2 = Math.abs(Math.sqrt((2 * G * r1) / (r1 + r2)) - v2); // Delta-v for second burn
    return deltaV1 + deltaV2; // Total delta-v
}

// Function to simulate Hohmann transfer
function simulateHohmannTransfer(planet1, planet2) {
    const r1 = hohmannTransferDistance("sun", planet1);
    const r2 = hohmannTransferDistance("sun", planet2);

    const deltaV = hohmannTransferDeltaV(r1, r2);
    console.log("Delta-v required for Hohmann transfer:", deltaV.toFixed(2), "m/s");

    // Other parts of simulation...
}

// Function to calculate distance and display result
function calculateDistance() {
    const planet1 = document.getElementById('planet1').value;
    const planet2 = document.getElementById('planet2').value;
    const distance = hohmannTransferDistance(planet1, planet2);

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Hohmann Transfer Distance from ${planet1} to ${planet2}: ${distance.toLocaleString()} km`;

    // Call simulateHohmannTransfer function
    simulateHohmannTransfer(planet1, planet2);
}
