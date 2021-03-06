'use strict';

// Variable where we will store each image in an array
ImgObject.allImages = [];

// Hold my random indexes
var randomIndex = [];

// array to store image names
var imgNames = [];

// array to store image votes
var imgVotes = [];

// sorted votes array
var sortedVotesArray = [];

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
    createTimesShownArray();
    displayChart();
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

    // targeting entire card
    var imgPlace1 = document.getElementById('survey-images').getElementsByClassName('card')[0];
    var imgPlace2 = document.getElementById('survey-images').getElementsByClassName('card')[1];
    var imgPlace3 = document.getElementById('survey-images').getElementsByClassName('card')[2];

    imgPlace1.classList.toggle('flip-card');
    imgPlace2.classList.toggle('flip-card');
    imgPlace3.classList.toggle('flip-card');

    setTimeout(function () { finalRandomIndex(); }, 280);

  } else {
    document.getElementById('survey-images').innerHTML = '';

    updateVotes();

    createTimesShownArray();

    imgsToStorage();

    displayHighScores();

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
    sortedVotesArray.push(imgVotes[i]);

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
        backgroundColor: '#EFF6E0',
        borderColor: 'white',
        borderWidth: 1
      },
      {
        label: 'No. of Times Shown',
        data: timesShown,
        backgroundColor: '#124559',
        borderColor: 'white',
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        labels: {
          fontColor: 'white'
        }
      },
      scales: {
        xAxes: [{
          gridLines: {
            color: '#124559'
          },
          stacked: false,
          ticks: {
            fontColor: 'white'
          }
        }],
        yAxes: [{
          gridLines: {
            color: '#124559'
          },
          stacked: true,
          ticks: {
            fontColor: 'white',
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// A function to display top 3 results

function displayHighScores() {

  var storedImgObject = JSON.parse(localStorage.getItem('storedImgObject'));

  if (storedImgObject && storedImgObject.length) {

    var noHighScore = document.getElementById('noHighScore');
    noHighScore.style.display = 'none';

    var highScoreCards = document.getElementById('high-score-card');
    highScoreCards.style.visibility = 'inherit';

    sortedVotesArray.sort(function (a, b) { return b - a; });

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < ImgObject.allImages.length; j++){
        if (sortedVotesArray[i] === ImgObject.allImages[j].votes && ImgObject.allImages[j].name !== topVoteNames[i-1]){
          topVoteNum[i] = ImgObject.allImages[j].votes;
          topVoteNames[i] = ImgObject.allImages[j].name;
          topVoteTimesShown[i] = ImgObject.allImages[j].timesShown;
          topVoteFilePath[i] = ImgObject.allImages[j].filePath;

          break;
        }
      }
    }
    for (i = 0; i < 3; i++){
      var nameID = 'top-product-name' + (i + 1);
      var nameEl = document.getElementById(nameID);
      nameEl.innerHTML = topVoteNames[i];

      var imgID = 'top-product-img' + (i + 1);
      var imgEl = document.getElementById(imgID);
      imgEl.src = topVoteFilePath[i];
      imgEl.alt = topVoteNames[i];

      var topProductChart = document.getElementById('top-product-chart' + (i +1));
      var ctx = topProductChart.getContext('2d');

      var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [topVoteNum[i], topVoteTimesShown[i]],
            backgroundColor: [
              '#EFF6E0',
              '#124559'
            ]
          }],
          labels: [
            'No. Times Voted',
            'No. Times Shown'
          ]
        },
        options: {
          legend: {
            labels: {
              fontColor: 'white' //set your desired color
            }
          }
        }
      });
    }
  } else {

    var noHighScore = document.getElementById('noHighScore');
    noHighScore.style.display = 'inherit';

    highScoreCards = document.getElementById('high-score-card');
    highScoreCards.style.visibility = 'hidden';

  }
}

fetchImgsFromStorage();

finalRandomIndex();

displayHighScores();