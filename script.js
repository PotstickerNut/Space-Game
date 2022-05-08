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
  //call elements
  const mainWrapper = document.querySelector(".main-wrapper");
  // create elements
  const div = document.createElement("div");

  // append elements
  mainWrapper.appendChild(div);

  // add class to elements
  div.className = "game-status";
  if (count > 0) {
    const hull = Math.trunc(Math.random() * 3) + 3;
    const firepower = Math.trunc(Math.random() * 3) + 2;
    const accuracy = parseFloat(Math.random() * (0.8 - 0.6) + 0.6).toFixed(1);
    const alienGenShip = new Ship(hull, firepower, accuracy);
    count--;
    return alienGenShip;
  } else {
    console.log("You won!");
    div.textContent = "You won!";

    playing = false;
  }
};

// Alien fire
const alienFire = () => {
  //call elements
  const mainWrapper = document.querySelector(".main-wrapper");
  // create elements
  const div = document.createElement("div");

  // append elements
  mainWrapper.appendChild(div);

  // add class to elements
  div.className = "game-status";

  if (playing) {
    if (ussHelloWorld.hull > 0) {
      if (Math.random() < alienShip.accuracy) {
        console.log("USS Hello World has been hit!");
        div.textContent = "USS Hello World has been hit!";
        ussHelloWorld.hull -= alienShip.firepower;
      } else {
        console.log("Missed USS Hello World target!");
        div.textContent = "Missed USS Hello World target!";
      }
    } else {
      console.log("You loose!");
      div.textContent = "You loose!";
      playing = false;
    }
  }
};

// USS fire
const ussFire = () => {
  //call elements
  const mainWrapper = document.querySelector(".main-wrapper");
  // create elements
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");

  // append elements
  mainWrapper.appendChild(div1);
  mainWrapper.appendChild(div2);

  // add class to elements
  div1.className = "game-status";
  div2.className = "game-status";
  if (playing) {
    if (Math.random() < ussHelloWorld.accuracy) {
      console.log("Alien has been hit!");
      div1.textContent = "Alien has been hit!";
      alienShip.hull -= ussHelloWorld.firepower;
      if (alienShip.hull <= 0) {
        console.log("Ship has gone down!");
        div2.textContent = "Ship has gone down!";
        alienShip = generateShip();
      } else {
        console.log("Missed alien target!");
        div1.textContent = "Missed alien target!";
      }
      alienFire();
    }
  }
};

const reset = () => {
  const divs = document.querySelectorAll(".game-status");
  console.log(divs);
  divs.forEach((div) => {
    div.remove();
  });
  playing = true;
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
