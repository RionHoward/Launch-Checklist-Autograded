// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById('missionTarget');
    missionTarget.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name} </li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons} </li>
                 </ol>
                 <img src='${imageUrl}'>
                 `

}

function validateInput(testInput) {
    if (testInput === "" || testInput === null) {
        return "Empty"
    } else if ((!isNaN(testInput))) {
        return "Is a Number"
    } else {
        return "Not a Number"
    }

}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");
    if (validateInput(pilot) === `Empty` || validateInput(copilot) === `Empty` || validateInput(fuelLevel) === `Empty` || validateInput(cargoLevel) === `Empty`) {
        alert("All fields are required.")
    } else if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Please enter numbers for fuel and cargo");

    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        alert("Please only enter letters for pilot and copilot.");

    } else {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;


        if (Number(fuelLevel) < 10000) {
            fuelStatus.innerHTML = `Fuel level too low for launch`;
            list.style.visibility = `visible`;
            launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
            launchStatus.style.color = `red`;
        }
        if (Number(cargoLevel) > 10000) {
            cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
            list.style.visibility = `visible`;
            launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
            launchStatus.style.color = `red`;
        }
        if (Number(cargoLevel) <= 10000){
            cargoStatus.innerHTML = `Cargo mass low enough for launch`;
            list.style.visibility = `visible`;
            launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
            launchStatus.style.color = `red`;
        }
        if (Number(fuelLevel) >= 10000) {
            fuelStatus.innerHTML = `Fuel level high enough for launch`;
            list.style.visiblity = `visible`;
            launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
            launchStatus.style.color = `red`;
        } 
        // else {
        //     list.style.visiblity = `visible`
        //     launchStatus.innerHTML =`Shuttle is Ready for Launch`;
        //     launchStatus.style.color =`green`
        // }

        // }
        if (Number(cargoLevel) > 10000 && Number(fuelLevel) < 10000) {
            list.style.visibility = `visible`
            fuelStatus.innerHTML = `Fuel level too low for launch`;
            cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
            launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
            launchStatus.style.color = `red`;


        } else if (Number(cargoLevel) <= 10000 && Number(fuelLevel) >= 10000) {
            list.style.visibility = `visible`
            fuelStatus.innerHTML = `Fuel level high enough for launch`;
            cargoStatus.innerHTML = `Cargo mass low enough for launch`;
            launchStatus.innerHTML = `Shuttle is Ready for Launch`;
            launchStatus.style.color = `green`;
        }

    }
}





async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json()
    });


    return planetsReturned;
}

function pickPlanet(planets) {
    let randomPlanet = Math.floor(Math.random() * planets.length);
    return planets[randomPlanet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;