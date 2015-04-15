/**
 * gui.js
 **/

var gui;

var AddScene = function() {
	this.name = 'New scene name';
	this.info = 'what is it about';
	this.doneEditingScene = function() {

		// push to cateSceneObj
		cateSceneObj[currSceneIndex] = objects;

		updateStr( this );
	};
};

function getcubeIndex(timeStr) {

	var d = new Date(timeStr);
	var y = d.getFullYear() - bday.getFullYear();
	var m = d.getMonth() - bday.getMonth();
	var len = y * 12 + m;
	if (len < 0) {
		alert("Hm... looks like you haven't born at that time!!");
	} else if (len > 900) {
		alert("Oops... that's outside of box!!");
	};
	len = len < 0 ? 0 : len;
	len = len > 900 ? 900 : len;
	return len;
}

var AddSpan = function() {
	this.name = 'New span';
	this.color = '#ff0000';
	this.label = 'Study';
	this.info = 'put some story here';
	this.start = "2012-08-12";
	this.end = "2013-08-12";
	// this.displayframe = false;
	this.AddNewSpan = function() {  
		// save this span to the new scene
		// add box to objects
		var startIndex = getcubeIndex(this.start);
		var endIndex = getcubeIndex(this.end);
		for (var i = startIndex; i <= endIndex; i++) {

			var newcube = new THREE.BoxGeometry(20, 20, 20);
			// var mats = [];
			// mats.push(new THREE.MeshBasicMaterial({ color: CC[0] }));
			// mats.push(new THREE.MeshBasicMaterial({ color: CC[1] }));
			// mats.push(new THREE.MeshBasicMaterial({ color: CC[2] }));
			// mats.push(new THREE.MeshBasicMaterial({ color: CC[3] }));
			// mats.push(new THREE.MeshBasicMaterial({ color: CC[4] }));  
			// mats.push(new THREE.MeshBasicMaterial({ color: CC[5] }));
			// var faceMaterial = new THREE.MeshFaceMaterial(mats); 
			var faceMaterial = new THREE.MeshBasicMaterial( { color: this.color } );
			var mesh = new THREE.Mesh(newcube, faceMaterial); 
			var cubeyear = Math.floor(i / 12) + bday.getFullYear();    	
			var cubemonth = Math.floor(i % 12) + bday.getMonth() + 1;
			mesh.info = cubeyear.toString() + "-" + cubemonth.toString() + ": " + this.info; 
			mesh.mcolor =  new THREE.Color( CC[4] );
			mesh.label = this.label;

			mesh.applyMatrix( new THREE.Matrix4().makeTranslation(Math.floor(i%30)*20 - 290, 290 - Math.floor(i/30)*20, 10) ); 
			mesh.pos = new THREE.Vector3( mesh.position.x, mesh.position.y, mesh.position.z );
 
			scene.add(mesh);
			objects.push(mesh);
			
		}
	}
}

function buildGui() {      
    // create these scene and span objects to pass values
    var newScene = new AddScene();
	var newSpan = new AddSpan();

	gui = new dat.GUI();

	var sceneName = gui.add( newScene, 'name').name('Scene').listen();

	var sceneInfo = gui.add( newScene, 'info').name('Info').listen();
	
	// add span folder
    var spanfolder = gui.addFolder('Span');

	var spanName = spanfolder.add( newSpan, 'name').name('Name').listen();
	
	var spanColor = spanfolder.addColor( newSpan, 'color' ).name('Color').listen();

	// var spanOpacity = spanfolder.add( newSpan, 'opacity' ).min(0).max(1).step(0.01).name('Opacity').listen();
	// spanOpacity.onChange(function(value) { 
	// 	// cube.material.opacity = value; 
	// });
	
	// var spanLabel = spanfolder.add( newSpan, 'label', categories ).name('Category').listen();
	// spanLabel.onChange(function(value) { 
	// 	// updateCube(); 
	// });

    var spanInfo = spanfolder.add(newSpan, 'info').name('Info').listen();

    var spanStart = spanfolder.add(newSpan, 'start');

	var spanEnd = spanfolder.add(newSpan, 'end');

	spanfolder.add(newSpan, 'AddNewSpan');

	gui.add(newScene, 'doneEditingScene').name('Save Scene');

}

