"use strict";

// declare elements
const fireBtn = document.getElementById("fire");
const resetBtn = document.getElementById("reset");

// ALien ship count
let count = 6;
let playing = true;

class Ship {
  constructor(hull, firepower, accuracy) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
}

const generateShip = () => {
  if (count > 0) {
    // Math.trunc(Math.random() * Max - min) + min;
    const hull = Math.trunc(Math.random() * 3) + 3;
    const firepower = Math.trunc(Math.random() * 3) + 2;
    const accuracy = parseFloat(Math.random() * (0.8 - 0.6) + 0.6).toFixed(1);
    const alienGenShip = new Ship(hull, firepower, accuracy);
    count--;
    return alienGenShip;
  } else {
    //call elements
    const mainWrapper = document.querySelector(".main-wrapper");
    // create elements
    const div = document.createElement("div");

    // append elements
    mainWrapper.appendChild(div);

    // add class to elements
    div.className = "game-status you-won";

    console.log("You won!");
    div.textContent = "You won!";

    playing = false;
  }
};

// Alien fire
const alienFire = () => {
  if (playing) {
    //call elements
    const mainWrapper = document.querySelector(".main-wrapper");
    // create elements
    const div1 = document.createElement("div");

    // append elements
    mainWrapper.appendChild(div1);

    // add class to elements
    div1.className = "game-status alien-fire";
    if (ussHelloWorld.hull > 0) {
      if (Math.random() < alienShip.accuracy) {
        console.log("USS Hello World has been hit!");
        ussHelloWorld.hull -= alienShip.firepower;
        div1.textContent = `USS Hello World has been hit! Hull: ${ussHelloWorld.hull}`;
        if (ussHelloWorld.hull <= 0) {
          console.log("You loose!");
          const div2 = document.createElement("div");
          mainWrapper.appendChild(div2);
          div2.className = "game-status you-loose";
          div2.textContent = "You loose!";
          playing = false;
        }
      } else {
        console.log("Missed USS Hello World target!");
        div1.textContent = "Missed USS Hello World target!";
      }
    }
  }
};

// retreat button function
const retreat = () => {
  // declare elements
  if (playing) {
    const mainWrapper = document.querySelector(".main-wrapper");
    const div = document.createElement("div");

    // add class names
    div.className = "game-status retreat";

    //append elements
    mainWrapper.appendChild(div);
    div.textContent = "RETREAT!!!";
    playing = false;
  }
};

// USS fire
const ussFire = () => {
  if (playing) {
    //call elements
    const mainWrapper = document.querySelector(".main-wrapper");
    // create elements
    const div1 = document.createElement("div");

    // append elements
    mainWrapper.appendChild(div1);

    // add class to elements
    div1.className = "game-status uss-fire";
    if (Math.random() < ussHelloWorld.accuracy) {
      console.log("Alien has been hit!");
      alienShip.hull -= ussHelloWorld.firepower;
      div1.textContent = `Alien has been hit! Hull: ${alienShip.hull}`;
      if (alienShip.hull <= 0) {
        // create element
        const div2 = document.createElement("div");
        const retreatBtn = document.createElement("button");

        // append element
        mainWrapper.appendChild(div2);
        mainWrapper.appendChild(retreatBtn);

        // add class
        div2.className = "game-status generate-ship";
        retreatBtn.className = "game-status retreat";
        retreatBtn.textContent = "RETREAT!!";
        retreatBtn.addEventListener("click", retreat);

        console.log("Ship has gone down!");
        div2.textContent = "Ship has gone down!";

        alienShip = generateShip();
        alienFire();
      }
    } else {
      console.log("Missed alien target!");
      div1.textContent = "Missed alien target!";
      alienFire();
    }
  }
};

const reset = () => {
  const divs = document.querySelectorAll(".game-status");

  divs.forEach((div) => {
    div.remove();
  });

  playing = true;
  count = 6;
  alienShip = generateShip();
  ussHelloWorld = new Ship(20, 5, 0.7);
};

// alien ship count
let alienShip = generateShip();
let ussHelloWorld = new Ship(20, 5, 0.7);

//apply text to buttons
fireBtn.textContent = "FIRE!";
resetBtn.textContent = "RESET";

fireBtn.addEventListener("click", ussFire);

resetBtn.addEventListener("click", reset);
