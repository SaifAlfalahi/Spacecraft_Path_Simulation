const canvas = document.getElementById("simulationCanvas");
const ctx = canvas.getContext("2d");
const deltaVSlider = document.getElementById("deltaVSlider");
const deltaVValue = document.getElementById("deltaVValue");
const velocityDisplay = document.getElementById("velocityDisplay");
const deltaVDisplay = document.getElementById("deltaVDisplay");
const timeSpeedSlider = document.getElementById("timeSpeedSlider");
const timeSpeedValue = document.getElementById("timeSpeedValue");
const video = document.getElementById("homepagevid"); // Get the video element

let exercise, launchAngle, launchAltitude, launchSpeed, Magnification;
let atmosphere, friction, stroke_off, timeSpeed, xVel, yVel;
let add_dot, speedFactor, TTS, Engine, deltaV, slow, moveX, moveY, oldTime;
let planetMass, planetRadius, metersPerPixel, pixDiam, centerX, centerY;
let r, gConst, x, y, newTime, dt;
let positions = []; // Array to store positions

// Initialize a counter for reducing speed based on simulation
function initSimulation() {
  exercise = 1;
  launchAngle = 20;
  launchAltitude = 2000; // Set launch altitude to 2000 km (green orbit)
  Magnification = 0.7;
  atmosphere = 0.0157;
  friction = 0;
  stroke_off = 1;
  timeSpeed = mapSliderToTimeSpeed(timeSpeedSlider.value); // Initial timeSpeed from slider
  add_dot = 0;
  speedFactor = 0.01;
  TTS = 200;
  Engine = 0;
  deltaV = parseFloat(deltaVSlider.value); // Initial deltaV from slider
  slow = 0;
  moveX = 0;
  moveY = 0;
  oldTime = Date.now();

  planetMass = 5.00 * Math.pow(10, 24); // kg
  planetRadius = 6371 * Math.pow(10, 3); // m
  metersPerPixel = 21237;
  pixDiam = ((planetRadius * Magnification) / metersPerPixel) * 2;
  centerX = canvas.width / 2 + moveX;
  centerY = canvas.height / 2 + moveY;

  let r = planetRadius + launchAltitude * 1000; // Convert altitude from km to meters and add to planet radius
  gConst = 6.673 * Math.pow(10, -11); // Gravitational constant
  let orbitalVelocity = Math.sqrt((gConst * planetMass) / r); // Calculate orbital velocity for the altitude

  let launchAngleRad = (launchAngle * Math.PI) / 180; // Convert launch angle to radians
  x = r * Math.sin(launchAngleRad); // Calculate initial x position
  y = -r * Math.cos(launchAngleRad); // Calculate initial y position
  xVel = orbitalVelocity * Math.cos(launchAngleRad); // Set initial x velocity for circular orbit
  yVel = orbitalVelocity * Math.sin(launchAngleRad); // Set initial y velocity for circular orbit

  positions = []; // Reset the positions array

  // Display initial values
  deltaVValue.textContent = deltaV.toFixed(3);
  deltaVDisplay.textContent = `Current deltaV: ${deltaV.toFixed(3)}`;
  timeSpeedValue.textContent = `${timeSpeedSlider.value}%`;
}

// Function to map slider value to timeSpeed
function mapSliderToTimeSpeed(value) {
  return 100 + (value - 1) * 2;
}

// Add event listener for the deltaV slider
deltaVSlider.addEventListener("input", () => {
  deltaV = parseFloat(deltaVSlider.value);
  deltaVValue.textContent = deltaV.toFixed(3);
  deltaVDisplay.textContent = `Current deltaV: ${deltaV.toFixed(3)}`;
});

// Add event listener for the timeSpeed slider
timeSpeedSlider.addEventListener("input", () => {
  timeSpeed = mapSliderToTimeSpeed(timeSpeedSlider.value);
  timeSpeedValue.textContent = `${timeSpeedSlider.value}%`;
});
document.addEventListener("keydown", keyPressed);

restartButton.addEventListener("click", () => {
  window.location.reload();
});
document.addEventListener("keydown", keyPressed);

function keyPressed(e) {
  const keyCode = e.keyCode;
  switch (keyCode) {
    case 49: // 1 key
      deltaV = 0.001;
      break;
    case 50: // 2 key
      deltaV = 0.005;
      break;
    case 51: // 3 key
      deltaV = 0.01;
      break;
    case 52: // 4 key
      deltaV = 0.015;
      break;
    case 53: // 5 key
      deltaV = 0.02;
      break;
    case 38: // Up arrow
      xVel += xVel * deltaV;
      yVel += yVel * deltaV;
      add_dot = 1;
      break;
    case 40: // Down arrow
      xVel -= xVel * deltaV;
      yVel -= yVel * deltaV;
      add_dot = 2;
      break;
    case 37: // Left arrow
      console.log("Before" + timeSpeed);
      speedFactor = -1;
      timeSpeed += 100 * speedFactor;
      if(timeSpeed<=18)
        timeSpeed = 100;
      console.log("After" + timeSpeed);
      break;
    case 39: // Right arrow
      speedFactor = 1;
      timeSpeed += 100 * speedFactor;
      if(timeSpeed>=300)
        timeSpeed = 300;
      break;
  }

  // Update slider and display value
  deltaVSlider.value = deltaV;
  deltaVValue.textContent = deltaV.toFixed(3);
  deltaVDisplay.textContent = `Current deltaV: ${deltaV.toFixed(3)}`;

  timeSpeedSlider.value = 100 * 10;
  timeSpeedValue.textContent = `${timeSpeedSlider.value}%`;

  console.log("The velocity is: " + xVel + " on x and " + yVel + " on y");
}

function draw() {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(centerX, centerY);

  // Draw the longitude line first
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, -canvas.height / 2);
  ctx.lineTo(0, canvas.height / 2);
  ctx.stroke();

  // Draw the horizontal line first
  ctx.strokeStyle = "white"; // Set the color of the line
  ctx.lineWidth = 1; // Set the width of the line
  ctx.beginPath();
  ctx.moveTo(-canvas.width / 2, 0); // Start point of the line
  ctx.lineTo(canvas.width / 2, 0); // End point of the line
  ctx.stroke();

  // Drawing the planet and atmosphere layers
  ctx.strokeStyle = "rgb(201, 187, 201)";
  ctx.lineWidth = 1;

  ctx.fillStyle = "rgb(15, 8, 12)";
  ctx.beginPath();
  ctx.arc(0, 0, pixDiam / 2 + pixDiam * atmosphere, 0, Math.PI * 2);
  //ctx.fill();

  ctx.fillStyle = "rgb(23, 12, 19)";
  ctx.beginPath();
  ctx.arc(0, 0, pixDiam / 2 + (pixDiam * atmosphere) / 10, 0, Math.PI * 2);
  //ctx.fill();

  ctx.fillStyle = "rgb(33, 16, 27)";
  ctx.beginPath();
  ctx.arc(0, 0, pixDiam / 2 + (pixDiam * atmosphere) / 100, 0, Math.PI * 2);
  //ctx.fill();

  ctx.fillStyle = "rgb(71, 33, 57)";
  ctx.beginPath();
  ctx.arc(0, 0, pixDiam / 2 + (pixDiam * atmosphere) / 1000, 0, Math.PI * 2);
  //ctx.fill();

  ctx.fillStyle = "rgb(55, 185, 232)";
  ctx.beginPath();
  ctx.arc(0, 0, pixDiam / 2, 0, Math.PI * 2);
  //ctx.fill();

  // Drawing orbits
  ctx.strokeStyle = "rgb(199, 44, 196)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, ((5000 / 6371) * pixDiam) / 2 + pixDiam / 2, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgb(84, 120, 84)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, ((2000 / 6371) * pixDiam) / 2 + pixDiam / 2, 0, Math.PI * 2);
  ctx.stroke();

  // Update the projectile position
  r = Math.sqrt(x * x + y * y);
  if (r >= planetRadius) {
    let rAccel = (-1.0 * gConst * planetMass) / (r * r);
    let xAccel = (rAccel * x) / r;
    let yAccel = (rAccel * y) / r;

    newTime = Date.now();
    dt = ((newTime - oldTime) * timeSpeed) / TTS;
    oldTime = newTime;

    if (r < planetRadius + planetRadius * atmosphere && yVel < 0) {
      xVel -= xVel * friction;
      yVel -= yVel * friction * 1.2;
    }

    let newXVel = xVel + xAccel * dt;
    let newYVel = yVel + yAccel * dt;
    let avgXVel = (xVel + newXVel) / 2;
    let avgYVel = (yVel + newYVel) / 2;

    xVel = newXVel;
    yVel = newYVel;

    x += avgXVel * dt;
    y += avgYVel * dt;



    // Clear positions array to make the trail disappear
    positions = [{ x: x, y: y }];

    if (add_dot === 1) {
      ctx.fillStyle = "yellow";
      add_dot = 0;
    }
    if (add_dot === 2) {
      ctx.fillStyle = "red";
      add_dot = 0;
    }

    // Draw the trail (since positions array is cleared, it will only show the current position)
    ctx.beginPath();
    ctx.moveTo(
      (positions[0].x / metersPerPixel) * Magnification,
      (-positions[0].y / metersPerPixel) * Magnification
    );
    for (let i = 1; i < positions.length; i++) {
      ctx.lineTo(
        (positions[i].x / metersPerPixel) * Magnification,
        (-positions[i].y / metersPerPixel) * Magnification
      );
    }
    ctx.strokeStyle = "white";
    ctx.stroke();

    // Draw the future path
    let futureX = x;
    let futureY = y;
    let futureXVel = xVel;
    let futureYVel = yVel;
    ctx.beginPath();
    ctx.setLineDash([5, 5]); // Set dashed line pattern
    ctx.moveTo(
      (futureX / metersPerPixel) * Magnification,
      (-futureY / metersPerPixel) * Magnification
    );
    for (let i = 0; i < 2000; i++) {
      // Increase iterations for longer path
      let futureR = Math.sqrt(futureX * futureX + futureY * futureY);
      if (futureR >= planetRadius) {
        let futureRAccel = (-1.0 * gConst * planetMass) / (futureR * futureR);
        let futureXAccel = (futureRAccel * futureX) / futureR;
        let futureYAccel = (futureRAccel * futureY) / futureR;

        futureXVel += futureXAccel * dt;
        futureYVel += futureYAccel * dt;

        futureX += futureXVel * dt;
        futureY += futureYVel * dt;

        ctx.lineTo(
          (futureX / metersPerPixel) * Magnification,
          (-futureY / metersPerPixel) * Magnification
        );
      } else {
        break;
      }
    }
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.setLineDash([]); // Reset to solid line

    // Draw a point at the current position
    ctx.beginPath();
    ctx.arc(
      (x / metersPerPixel) * Magnification,
      (-y / metersPerPixel) * Magnification,
      2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Update the velocity display
    let currentVelocity = Math.sqrt(xVel * xVel + yVel * yVel);
    velocityDisplay.textContent = `Current Velocity: ${currentVelocity.toFixed(
      2
    )} m/s`;
  }

  ctx.restore();
  requestAnimationFrame(draw);
}

// Initialize the simulation and start the animation
initSimulation();
requestAnimationFrame(draw);
