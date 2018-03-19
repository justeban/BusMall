'use strict';

//PSUEDO CODE ELEMENTS

// select 3 random photos from the director and display them side by side
// recieve clicks on the images and track how many times the image is clicked
// also track how many times the image is displayed
// On click 3 non-duplicating images are placed on the screen

// Create  a constructor function that creates object for each image
// function will include (nameOfImage, Filepath, number of times it has been shown, number of times clicked)

//create text string property that can be used as html ID

// after 25 selections turn off event listener to images

// display list of products and how many times voted and displayed " banana was 3 times and clicked 2 times"
var beginRandomIndex1 = 0;
var beginRandomIndex2 = 0;
var beginRandomIndex3 = 0;

// Variable where we will store each image in an array
imgObject.allImages =[];

// determine where images will be displayed
var imgPlace1 = document.getElementById('img1');
var imgPlace2 = document.getElementById('img2');
var imgPlace3 = document.getElementById('img3');

// Creating an event Listener and Callback function

imgPlace1.addEventListener('click', randomMasterIndex);
imgPlace2.addEventListener('click', randomMasterIndex);
imgPlace3.addEventListener('click', randomMasterIndex);

// Creting the constructor function that will create our images
function imgObject(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.timesShown = 0;
  this.timesClicked;
  imgObject.allImages.push(this);
}

// Creating instances of Images
new imgObject('R2D2 Travel Luggage', 'img/bag.jpg');
new imgObject('Banana Slicer', 'img/banana.jpg');
new imgObject('Ipad Toliet Paper Holder', 'img/bathroom.jpg');
new imgObject('Open Toed Rain Boots', 'img/boots.jpg');
new imgObject('The Ultimate Breakfast Making Machine', 'img/breakfast.jpg');
new imgObject('Meatball Bubble Gum', 'img/bubblegum.jpg');
new imgObject('Convex Bottom Chair', 'img/chair.jpg');
new imgObject('Alien Action Figure', 'img/cthulhu.jpg');
new imgObject('A Duck-Billed Dog', 'img/dog-duck.jpg');
new imgObject('Dragon Meat', 'img/dragon.jpg');
new imgObject('Cutlery Pen', 'img/pen.jpg');
new imgObject('Pet Sweeper', 'img/pet-sweep.jpg');
new imgObject('Pizza Scissors', 'img/scissors.jpg');
new imgObject('Shark Sleeping Bag', 'img/shark.jpg');
new imgObject('A Baby Sweep', 'img/sweep.png');
new imgObject('TaunTaun Sleeping Bag', 'img/tauntaun.jpg');
new imgObject('Unicorn Meat', 'img/unicorn.jpg');
new imgObject('Dragon USB', 'img/usb.gif');
new imgObject('Never Ending Water Can', 'img/water-can.jpg');
new imgObject('Egg Wine Glass', 'img/wine-glass.jpg');

// Create random number function between 1 and 20

function randomMasterIndex() {
  var randomIndex = [];

  function randomIndexArray() {
    randomIndex[0] = Math.floor(Math.random() * 20);
    randomIndex[1] = Math.floor(Math.random() * 20);
    randomIndex[2] = Math.floor(Math.random() * 20);
  }

  randomIndexArray();

  while (randomIndex[0] === randomIndex[1] || randomIndex[0] === randomIndex[2] || randomIndex[1] === randomIndex[2] || randomIndex.includes(beginRandomIndex1) || randomIndex.includes(beginRandomIndex2) || randomIndex.includes(beginRandomIndex3)){
    randomIndexArray();
  }

  beginRandomIndex1 = randomIndex[0];
  beginRandomIndex2 = randomIndex[1];
  beginRandomIndex3 = randomIndex[2];

  imgPlace1.src = imgObject.allImages[randomIndex[0]].filePath;
  imgPlace1.alt = imgObject.allImages[randomIndex[0]].name;
  imgObject.allImages[randomIndex[0]].timesShown ++;

  imgPlace2.src = imgObject.allImages[randomIndex[1]].filePath;
  imgPlace2.alt = imgObject.allImages[randomIndex[1]].name;
  imgObject.allImages[randomIndex[1]].timesShown ++;

  imgPlace3.src = imgObject.allImages[randomIndex[2]].filePath;
  imgPlace3.alt = imgObject.allImages[randomIndex[2]].name;
  imgObject.allImages[randomIndex[2]].timesShown ++;

}

randomMasterIndex();

