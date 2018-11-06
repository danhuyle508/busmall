var productsArray=[];

  function product(name, src, count, shown){
      this.name = name;
			this.src = src;
			this.count = count;
			this.shown = shown;
     
      productsArray.push(this);
  }
function generateRandomSource() {
	var randNum = Math.floor(Math.random() * 19);
	while(productsArray[randNum]['shown']) {
		randNum = Math.floor(Math.random() * 19);
	}
	productsArray[randNum]['shown'] = true;
	return productsArray[randNum]['src'];
}

 new product('bag','bag.jpg', 0, false);
 new product('banana','banana.jpg', 0, false);
 new product('bathroom','bathroom.jpg', 0, false);
 new product('boots','boots.jpg', 0, false);
 new product('breakfast','breakfast.jpg', 0, false);
 new product('bubblegum','bubblegum.jpg', 0, false);
 new product('chair','chair.jpg', 0, false);
 new product('cthulhu','cthulhu.jpg', 0, false);
 new product('dog-duck','dog-duck.jpg', 0, false);
 new product('dragon','dragon.jpg', 0, false);
 new product('pen','pen.jpg', 0, false);
 new product('pet-sweep','pet-sweep.jpg', 0, false);
 new product('scissors','scissors.jpg', 0, false);
 new product('bag','bag.jpg', 0, false);
 new product('shark','shark.jpg', 0, false);
 new product('sweep','sweep.png', 0, false);
 new product('tauntaun','tauntaun.jpg', 0, false);
 new product('unicorn','unicorn.jpg', 0, false);
 new product('usb','usb.gif', 0, false);
 new product('water-can','water-can.jpg', 0, false);
 new product('wine-glass','wine-glass.jpg', 0, false);

function generateRandomPicture(){
	var mainContent = document.getElementById('main-content');
	var  imgEl = document.createElement('img');
	imgEl.classList.add('image');
	var divOne = document.createElement('div');
	imgEl.src = generateRandomSource();
	divOne.appendChild(imgEl);
	mainContent.appendChild(divOne);
}
function changeToFalse(){
	for(var i = 0; i < productsArray.length; i++){
		productsArray[i]['shown'] = false;
	}
}
generateRandomPicture();
generateRandomPicture();
generateRandomPicture();

document.addEventListener('DOMContentLoaded', function() {
	document.addEventListener('click', function(e){
		if(e.target.classList.contains('image')){
			changeToFalse();
			var images = document.getElementsByTagName('img');
			for(var i = 0; i < images.length; i++){
				images[i].src = generateRandomSource();
			}	
		}
		else{
			alert("Click on the damn image.");
		}
	});
});