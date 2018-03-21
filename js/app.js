'use strict';

// Variable where we will store each image in an array
ImgObject.allImages = [];

// Hold my random indexes
var randomIndex = [];

// array to store image names
var imgNames = [];

// array to store image votes
var imgVotes = [];

// array to store # of times shown
var timesShown = [];

// Holding three arrays to display top scored products
var topVoteNum = [];
var topVoteNames = [];
var topVoteTimesShown = [];
var topVoteFilePath = [];

// Storing previous indexes
var prevRandomIndex1 = 0;
var prevRandomIndex2 = 0;
var prevRandomIndex3 = 0;

// The nummber of times user will select an image
var numberOfQuestions = 25;

// Keeping track of how many questions asked
var questionsAsked = 0;

// determine where images will be displayed
var imgPlace1 = document.getElementById('img1');
var imgPlace2 = document.getElementById('img2');
var imgPlace3 = document.getElementById('img3');

// Create ID for event listener
var surveyImages = document.getElementById('survey-images');
// where survey results will be displayed
var surveyResults = document.getElementById('survey-results');

// Creating an event Listener and Callback function
surveyImages.addEventListener('click', imgClicked);

// Creting the constructor function that will create our images
function ImgObject(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.timesShown = 0;
  this.votes = 0;
  ImgObject.allImages.push(this);
  imgNames.push(this.name);
}

function fetchImgsFromStorage() {

  var storedImgObject = JSON.parse(localStorage.getItem('storedImgObject'));

  if (storedImgObject && storedImgObject.length) {
    ImgObject.allImages = storedImgObject;
    updateNames();
    updateVotes();
    return;
  }

  // Creating instances of Images
  new ImgObject('R2D2 Travel Luggage', 'img/bag.jpg');
  new ImgObject('Banana Slicer', 'img/banana.jpg');
  new ImgObject('Ipad Toliet Paper Holder', 'img/bathroom.jpg');
  new ImgObject('Open Toed Rain Boots', 'img/boots.jpg');
  new ImgObject('The Ultimate Breakfast Making Machine', 'img/breakfast.jpg');
  new ImgObject('Meatball Bubble Gum', 'img/bubblegum.jpg');
  new ImgObject('Convex Bottom Chair', 'img/chair.jpg');
  new ImgObject('Alien Action Figure', 'img/cthulhu.jpg');
  new ImgObject('A Duck-Billed Dog', 'img/dog-duck.jpg');
  new ImgObject('Dragon Meat', 'img/dragon.jpg');
  new ImgObject('Cutlery Pen', 'img/pen.jpg');
  new ImgObject('Pet Sweeper', 'img/pet-sweep.jpg');
  new ImgObject('Pizza Scissors', 'img/scissors.jpg');
  new ImgObject('Shark Sleeping Bag', 'img/shark.jpg');
  new ImgObject('A Baby Sweep', 'img/sweep.png');
  new ImgObject('TaunTaun Sleeping Bag', 'img/tauntaun.jpg');
  new ImgObject('Unicorn Meat', 'img/unicorn.jpg');
  new ImgObject('Dragon USB', 'img/usb.gif');
  new ImgObject('Never Ending Water Can', 'img/water-can.jpg');
  new ImgObject('Egg Wine Glass', 'img/wine-glass.jpg');

}

fetchImgsFromStorage();

function imgClicked(event) {

  if(event.target.id === 'img1') {
    ImgObject.allImages[randomIndex[0]].votes++;
  } else if (event.target.id === 'img2') {
    ImgObject.allImages[randomIndex[1]].votes++;
  } else if (event.target.id === 'img3') {
    ImgObject.allImages[randomIndex[2]].votes++;
  } else {
    return; // If they click on the container rather than the image
  }

  questionsAsked += 1;

  if (questionsAsked < numberOfQuestions) {
    finalRandomIndex();
  } else {
    document.getElementById('survey-images').innerHTML = '';

    updateVotes();

    createTimesShownArray();

    // function to save to local storage
    imgsToStorage();

    displayChart();
  }
}

function finalRandomIndex() {

  function preRandomIndex() {
    randomIndex[0] = Math.floor(Math.random() * ImgObject.allImages.length);
    randomIndex[1] = Math.floor(Math.random() * ImgObject.allImages.length);
    randomIndex[2] = Math.floor(Math.random() * ImgObject.allImages.length);
  }

  preRandomIndex();

  while (randomIndex[0] === randomIndex[1] || randomIndex[0] === randomIndex[2] || randomIndex[1] === randomIndex[2] || randomIndex.includes(prevRandomIndex1) || randomIndex.includes(prevRandomIndex2) || randomIndex.includes(prevRandomIndex3)){
    preRandomIndex();
  }

  prevRandomIndex1 = randomIndex[0];
  prevRandomIndex2 = randomIndex[1];
  prevRandomIndex3 = randomIndex[2];

  displayImgs();

}

function displayImgs() {

  imgPlace1.src = ImgObject.allImages[randomIndex[0]].filePath;
  imgPlace1.alt = ImgObject.allImages[randomIndex[0]].name;
  ImgObject.allImages[randomIndex[0]].timesShown++;

  imgPlace2.src = ImgObject.allImages[randomIndex[1]].filePath;
  imgPlace2.alt = ImgObject.allImages[randomIndex[1]].name;
  ImgObject.allImages[randomIndex[1]].timesShown++;

  imgPlace3.src = ImgObject.allImages[randomIndex[2]].filePath;
  imgPlace3.alt = ImgObject.allImages[randomIndex[2]].name;
  ImgObject.allImages[randomIndex[2]].timesShown++;

}
function updateNames() {
  for (var i in ImgObject.allImages) {
    imgNames[i] = ImgObject.allImages[i].name;
  }
}
function updateVotes() {
  for (var i in ImgObject.allImages){
    imgVotes[i] = ImgObject.allImages[i].votes;
  }
}

function createTimesShownArray(){
  for (var i in ImgObject.allImages){
    timesShown[i] = ImgObject.allImages[i].timesShown;

  }
}

function imgsToStorage() {
  var storedImgObject = JSON.stringify(ImgObject.allImages);
  localStorage.setItem('storedImgObject', storedImgObject);
}

finalRandomIndex();

function displayChart() {
  document.getElementById('survey-title').style.display = 'inherit';

  var ctx = surveyResults.getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: imgNames,
      datasets: [{
        label: 'No. of Votes',
        data: imgVotes,
        backgroundColor: 'rgba(230,45, 60, .4)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1
      },
      {
        label: 'No. of Times Shown',
        data: timesShown,
        backgroundColor: 'rgba(102,102,255,.5)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// want to create function to display top 3 results
// sort imgVotes array from highest to lowest
function displayHighScores() {
  var sortedVotesArray = imgVotes.sort(function (a, b) { return b - a; });

  // I want top three scores
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < ImgObject.allImages.length; j++){
      if (sortedVotesArray[i] === ImgObject.allImages[j].votes && ImgObject.allImages[j].name !== topVoteNames[i-1]){
        topVoteNum[i] = ImgObject.allImages[j].votes;
        console.log(topVoteNum[i]);
        topVoteNames[i] = ImgObject.allImages[j].name;
        console.log(topVoteNames[i]);
        topVoteTimesShown[i] = ImgObject.allImages[j].timesShown;
        console.log(topVoteTimesShown[i]);
        topVoteFilePath[i] = ImgObject.allImages[j].filePath;
        console.log(topVoteFilePath[i]);
        break;
      }
    }

  }

}
//create a for loop that will match the 3 highest numbers to the images, their names and times shown
// write html to display these three images in the DOM