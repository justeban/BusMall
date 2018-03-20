'use strict';

var beginRandomIndex1 = 0;
var beginRandomIndex2 = 0;
var beginRandomIndex3 = 0;

var randomIndex = [];
var numberOfQuestions = 20;
var questionsAsked = 0;

// Variable where we will store each image in an array
imgObject.allImages =[];

// determine where images will be displayed
var imgPlace1 = document.getElementById('img1');
var imgPlace2 = document.getElementById('img2');
var imgPlace3 = document.getElementById('img3');

var surveyResults = document.getElementById('survey-results');
// Creating an event Listener and Callback function

imgPlace1.addEventListener('click', imgClicked);
imgPlace2.addEventListener('click', imgClicked);
imgPlace3.addEventListener('click', imgClicked);

// Creting the constructor function that will create our images
function imgObject(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.timesShown = 0;
  this.timesClicked = 0;
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

function imgClicked(event) {

  questionsAsked += 1;

  if(event.target.id === 'img1') {
    imgObject.allImages[randomIndex[0]].timesClicked++;
  } else if (event.target.id === 'img2') {
    imgObject.allImages[randomIndex[1]].timesClicked++;
  } else if (event.target.id === 'img3') {
    imgObject.allImages[randomIndex[2]].timesClicked++;
  }
  if (questionsAsked < numberOfQuestions) {
    randomMasterIndex();
  } else {
    document.getElementById('survey-images').innerHTML = '';
    displayResults();
  }
}

function randomMasterIndex() {

  function randomIndexArray() {
    randomIndex[0] = Math.floor(Math.random() * imgObject.allImages.length);
    randomIndex[1] = Math.floor(Math.random() * imgObject.allImages.length);
    randomIndex[2] = Math.floor(Math.random() * imgObject.allImages.length);
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

function displayResults() {
  var ulElement = document.createElement('ul');

  for (var i in imgObject.allImages) {
    var liElement = document.createElement('li');
    liElement.textContent = 'The ' + imgObject.allImages[i].name + ' was shown ' + imgObject.allImages[i].timesShown + ' and was clicked on ' + imgObject.allImages[i].timesClicked + ' times.';

    console.log(liElement);
    ulElement.appendChild(liElement);
    console.log(ulElement);
  }
  surveyResults.appendChild(ulElement);
  document.getElementById('survey-title').style.display = 'inherit';
}

randomMasterIndex();

