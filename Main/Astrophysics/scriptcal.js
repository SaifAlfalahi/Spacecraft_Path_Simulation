
function convertValues() 
{
    // Get the input values
    let a = 1;
    let b = document.getElementById('b').value;


    // Convert the values to a1 and b1
    let a1 = a * 149600000;
    let b1 = b * 149600000;


    // Display the results
    document.getElementById('result').innerText = `a = ${a} Au, b = ${b} Au 
    a1 = ${a1} km, b1 = ${b1} km`;


    //find hohman transfer orbit in km and Au - semi major axis
    let h_km = (a1 + b1)/2.0;
    let h_au = h_km/a1;


    //Display the results of hohman transfer orbit
    document.getElementById('result1').innerText = `H(Transfer Orbit) in km = ${h_km} Km, H in Au = ${h_au} Au`;


    //orbital period of hohman transfer
    let p_years = Math.sqrt(h_au * h_au * h_au);
    let p_days = p_years * 365.25;


    //Display the results of orbital period
    document.getElementById('result2').innerText = `Orbital Period = ${p_years} Years and ${p_days} Days`;


    //travel time of spacecraft to mars
    let T = Math.round(p_days)/2;
    let T_r = Math.round(T);


    //Display the results of T
    document.getElementById('result3').innerText = `Spacecraft T = ${T}, approx = ${T_r} Days`;


    //Degrees mars travels everyday
    let D = 360/687;


    //Display Degrees mars travels everyday
    document.getElementById('result4').innerText = `Degrees mars travels everyday = ${D}`;


    //mars rotation around the sun in degrees in T
    let  deg = D * T_r;
    let deg_r = Math.round(deg);


    //Display mars rotation around the sun in degrees in T
    document.getElementById('result5').innerText = `Degrees mars rotation around sun = ${deg_r} deg`;


    //position of mars at the time of next lunch
    let Pn= 180 - deg_r;


    //Display position of mars at the time of next lunch
    document.getElementById('result6').innerText = `Position of mars at next lunch Pn = ${Pn} deg`;


    //Day 2
    const GM = 1.33e11;

    //To find mechanical energy of space craft in earth's parking orbit 
    let MEnergy_PO = (GM/((-2)*a1));

    document.getElementById('result9').innerText = `Mechanical energy of the earth's parking orbit = ${MEnergy_PO} Km^2/s^2`;

    //To find velocity in earth's parking orbit
    let Velocity_PO = (Math.sqrt(((GM/a1) + MEnergy_PO)*2));

    document.getElementById('result7').innerText = `Velocity of the earth's parking orbit = ${Velocity_PO} Km/s`;

    //To find mechanical energy of space craft in hohmann tranfer
    let MEnergy_HT = (GM/((-2)*h_km));

    document.getElementById('result10').innerText = `Mechanical energy of the tranfer orbit = ${MEnergy_HT} Km^2/s^2`;

    //To find velocity in earth's parking orbit
    let Velocity_HT = (Math.sqrt(((GM/a1) + (MEnergy_HT))*2));

    document.getElementById('result8').innerText = `Velocity of the tranfer orbit = ${Velocity_HT} Km/s`;

    //To find delta velocity to go from orbit 1 to transfer orbit
    let delta_vel = Math.abs(Velocity_PO-Velocity_HT);

    document.getElementById('result11').innerText = `\nVelocity change from orbit 1 to tranfer orbit = ${delta_vel} Km/s`;


    //Day 3

    //To find mechanical energy of orbit 2
    let MEnergy_O2 = (GM/((-2)*h_km));

    document.getElementById('result12').innerText = `Mechanical energy of orbit 2 = ${MEnergy_O2} Km^2/s^2`;

    //To find velocity in orbit 2
    let Velocity_O2 = (Math.sqrt(((GM/h_km) + MEnergy_O2)*2));

    document.getElementById('result13').innerText = `Velocity of the orbit 2 = ${Velocity_O2} Km/s`;

    //To find mechanical energy of orbit 2 to hohman
    let MEnergy_O2H = (GM/((-2)*b1));

    document.getElementById('result14').innerText = `Mechanical energy of tranfer orbit(hohman to orbit 2) = ${MEnergy_O2H} Km^2/s^2`;

    //To find velocity of orbit 2 to hohman
    let Velocity_O2H = (Math.sqrt(((GM/b1) + (MEnergy_O2H))*2));

    document.getElementById('result15').innerText = `Velocity of tranfer orbit(hohman to orbit 2) = ${Velocity_O2H} Km/s`;

    //To find delta velocity to go from orbit 1 to transfer orbit
    let delta_vel2 = Math.abs(Velocity_O2-Velocity_O2H);

    document.getElementById('result16').innerText = `\nVelocity change from orbit 2 to tranfer orbit = ${delta_vel2} Km/s`;

    //Calculate the total ∆V needed for the trip from orbit 1 to orbit 2
    let delta_total = delta_vel+delta_vel2;

    document.getElementById('result17').innerText = `\nCalculate the total ∆V needed for the trip from orbit 1 to orbit 2 = ${delta_total} Km/s`;
   
}

function goBack() {
    window.location.href = 'index.html'; // Adjust the path if the main page is in a different directory
}