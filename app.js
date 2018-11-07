'use-strict';
var productsArray=[];
var currentlyDisplayed = [];
var futureDisplayed = [];
var countArray =[];
var names=['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
  function product(name, src, count, views){
      this.name = name;
			this.src = src;
			this.count = count;
			this.views = views;
  }
function generateRandomSource() {
	var randNum = Math.floor(Math.random() * 19);
	while(futureDisplayed.includes(randNum) || currentlyDisplayed.includes(randNum) ) {
		randNum = Math.floor(Math.random() * 19);
	}
	productsArray[randNum]['views']++;
	futureDisplayed.push(randNum);
	console.log('current', currentlyDisplayed);
	console.log('future', futureDisplayed);
	return {src: productsArray[randNum].src, id: randNum};
}

function createNewProduct(){
	for(var i= 0; i < 20; i++){
		productsArray.push(new product(names[i],(names[i] + '.jpg'), 0, 0));
	}
}
createNewProduct();

function generateRandomPicture(){
  var randomImage = generateRandomSource();
	var mainContent = document.getElementById('main-content');
	var  imgEl = document.createElement('img');
	imgEl.classList.add('image');
	imgEl.dataset.index = randomImage.id;
	var divOne = document.createElement('div');
	imgEl.src = randomImage.src;
	divOne.appendChild(imgEl);
	mainContent.appendChild(divOne);
}

var turnCounter = 0;

function genereateInitialPictues(){
	var imageOne = generateRandomPicture();
	var imageTwo = generateRandomPicture();
	var imageThree = generateRandomPicture();
	currentlyDisplayed = futureDisplayed;
	futureDisplayed = [];
}	
function fillCountArray(){
	for(var i = 0; i < 20; i++){
		countArray[i] = productsArray[i].count;
	}
}

document.addEventListener('DOMContentLoaded', function() {
	genereateInitialPictues();
	document.addEventListener('click', function(e){
		if(e.target.classList.contains('image') && turnCounter < 25){
			e.target.dataset.index;
			productsArray[e.target.dataset.index].count++;
			console.log('count',productsArray[e.target.dataset.index].count)
			console.log('index', e.target.dataset.index);
			turnCounter++;
			console.log('turncounter',turnCounter);
			var images = document.getElementsByTagName('img');
			for(var i = 0; i < images.length; i++){
				var randomImage = generateRandomSource();
				images[i].src = randomImage.src;
				images[i].dataset.index = randomImage.id;
			}	
			currentlyDisplayed = futureDisplayed;
			futureDisplayed = [];
			fillCountArray();
		}
	});
	
	var ctx = document.getElementById('myChart').getContext('2d');
	var chart = new Chart(ctx, {
			// The type of chart we want to create
			type: 'bar',

			// The data for our dataset
			data: {
					labels: ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'],
					datasets: [{
							label: "Count",
							backgroundColor: 'rgb(25, 199, 132)',
							borderColor: 'rgb(255, 99, 132)',
							data: countArray,
					}]
			},

			// Configuration options go here
			options: {}
	});
});


