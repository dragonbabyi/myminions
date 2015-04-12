/**
 * gui.js
 **/

var gui;

var AddCat = function() {
		  this.name = 'add a new span to current scene';
  		  this.color = '#ff0000';
  		  this.opacity = 1;
  		  this.label = 'Study';
		  this.info = 'put some story here';
		  this.start = '2012-08-12';
		  this.end = '2012-08-12';
		  // this.displayframe = false;
		  this.AddSpan = function() {  
              // save this span to the new scene
		  };

};  




function buildGui() {      // option, callback

	var addCat = new AddCat();
	
	gui = new dat.GUI();
	
	var spanName = gui.add( addCat, 'name').name('Name').listen();
	spanName.onChange(function(value) {

	});
	
	var spanColor = gui.addColor( addCat, 'color' ).name('Color').listen();
	spanColor.onChange(function(value) { 
		// cube.material.color.setHex( value.replace("#", "0x") ); 
	});

	var spanOpacity = gui.add( addCat, 'opacity' ).min(0).max(1).step(0.01).name('Opacity').listen();
	spanOpacity.onChange(function(value) { 
		// cube.material.opacity = value; 
	});
	
	var spanLabel = gui.add( addCat, 'label', categories ).name('Category').listen();
	spanLabel.onChange(function(value) { 
		// updateCube(); 
	});

    var spanInfo = gui.add(addCat, 'info').name('Info').listen();
    spanInfo.onChange(function(value) {

    });

    var spanStart = gui.add(addCat, 'start');


	var spanEnd = gui.add(addCat, 'end');

	// gui.add(addCat, 'displayframe');

	var addToScene = gui.add(addCat, 'AddSpan');

};




function listenGui (argument) {
	// body...
	gui.add(addCat, 'xxxx', 0, 100).listen();
}


