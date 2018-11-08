'use-strict';
var productsArray=[];
var currentlyDisplayed = [];
var futureDisplayed = [];
var countArray =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

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
		productsArray.push(new product(names[i],('assets/' + names[i] + '.jpg'), 0, 0));
	}
}
createNewProduct();

function generateRandomPicture(){
  var randomImage = generateRandomSource();
	var mainContent = document.getElementById('main-content');
	var  imgEl = document.createElement('img');
	imgEl.classList.add('image');
	imgEl.dataset.index = randomImage.id;
	imgEl.src = randomImage.src;
	mainContent.appendChild(imgEl);
}

var turnCounter = 0;

function genereateInitialPictues(){
	generateRandomPicture();
	generateRandomPicture();
	generateRandomPicture();
	currentlyDisplayed = futureDisplayed;
	futureDisplayed = [];
}	
function fillCountArray(){
	for(var i = 0; i < 20; i++){
		console.log('products array count', productsArray[i].count);
		countArray[i] += productsArray[i].count;
	}
}

document.addEventListener('DOMContentLoaded', function() {
	countArray = JSON.parse(localStorage.getItem("count")) || countArray;
	genereateInitialPictues();
	var storeCount = [];
	document.addEventListener('click', function(e){
		if(e.target.classList.contains('image') && turnCounter < 25){
			productsArray[e.target.dataset.index].count++;
			countArray[e.target.dataset.index]++;
			turnCounter++;
			var images = document.getElementsByTagName('img');
			for(var i = 0; i < images.length; i++){
				var randomImage = generateRandomSource();
				images[i].src = randomImage.src;
				images[i].dataset.index = randomImage.id;

			}
			localStorage.setItem("count", JSON.stringify(countArray));

			currentlyDisplayed = futureDisplayed;
			futureDisplayed = [];
			createChart();
		}
	});
	document.getElementById('reset').addEventListener('click',function(){
		window.location.reload();
	});
});
createChart();
function createChart(){
	var ctx = document.getElementById('myChart').getContext('2d');
		var chart = new Chart(ctx, {
		type: 'horizontalBar',
		data: {
			labels: ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'],
			datasets: [{
					label: "Count",
					backgroundColor: 'rgb(25, 199, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: countArray,
			}]
			},
			options: {}
		});
	}		