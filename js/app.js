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

// Variable where we will store each image in an array
imgObject.allImages =[];

// determine where images will be displayed
var imgPlace1 = document.getElementById('img1');
var imgPlace2 = document.getElementById('img2');
var imgPlace3 = document.getElementById('img3');

// Creting the constructor function that will create our images
function imgObject(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.timesShown;
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
new imgObject('A Duck-Billed Dog', 'img/doc-duck.jpg');
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

