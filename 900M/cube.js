/**
 * Create a cube representing a single month.
 * loading information from gui. 
 * cube animation in the scene.
 */

var cube = new function(index, monthYear) {
	  
	this.index = index;
	this.date = monthYear;
	this.info = "";
	this.getInfo = function () {
	};
	this.setInfo = function () {
	};

	this.images = [];
	this.setImages = function (front, back, top, bottom, left, right) {
		// front face for info display
		// ....
		// other faces for images
		var path = [back, top, bottom, left, right];
		for (var i = 1; i < 6; i++) {
			 var img = new Image(600, 600);
			 img.src = path[i];
		 this.images.push(img);
		};
	};

    // when select, the cube comes forward from original position
    // go into the cube, environment mapping display images and info
	this.show = function () {
	}

}