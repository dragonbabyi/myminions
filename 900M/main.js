
var renderer, camera, scene, cubes;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var INTERSECTED;
function enter() {
	$("#pref").hide().fadeOut(6000);

	init();
	render();
 
}

function init() {

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// camera
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.z = 500;

	// scene 
	scene = new THREE.Scene();
	scene.add(camera);  

	var size = 300; 
	var step = 20; 
	var gridXY = new THREE.GridHelper(size, step);
	gridXY.position.set( 0, 0, 0 );
	gridXY.rotation.x = Math.PI/2;
	gridXY.setColors( new THREE.Color(0xffffff), new THREE.Color(0xffffff) );
	scene.add(gridXY);

	// init cubes 
	// var bday = new Date("Dec 24, 1988");
	var bday = $('#birthday')[0].valueAsDate;
	var currDate = new Date();
	var y = currDate.getFullYear() - bday.getFullYear();
	var m = currDate.getMonth() - bday.getMonth();
	var len = y * 12 + m;
	len = len > 900 ? 900 : len;

	objects = [];

    for (var i = 0; i < len; i++) {
    	var newcube = new THREE.BoxGeometry(20, 20, 20);
    	newcube.applyMatrix( new THREE.Matrix4().makeTranslation(Math.floor(i%30)*20 - 290, 290 - Math.floor(i/30)*20, 10) ); 
	    var mats = [];
	    mats.push(new THREE.MeshBasicMaterial({ color: 0xffd500  }));
	    mats.push(new THREE.MeshBasicMaterial({ color: 0x009e60  }));
	    mats.push(new THREE.MeshBasicMaterial({ color: 0x0051ba  }));
	    mats.push(new THREE.MeshBasicMaterial({ color: 0xffffff  }));
	    mats.push(new THREE.MeshBasicMaterial({ color: 0xff5800  }));
	    mats.push(new THREE.MeshBasicMaterial({ color: 0xC41E3A }));
	    var faceMaterial = new THREE.MeshFaceMaterial(mats); 

    	var mesh = new THREE.Mesh(newcube, faceMaterial); 
    	var cubeyear = Math.floor(i / 12) + bday.getFullYear();    	
        var cubemonth = Math.floor(i % 12) + bday.getMonth() + 1;
    	mesh.name = cubeyear.toString() + "-" + cubemonth.toString(); // date
    	mesh.mcolor =  new THREE.Color( "yellow" );
    	scene.add(mesh);
    	objects.push(mesh);

        var cubeframe = new THREE.BoxHelper( mesh );
		cubeframe.material.color.set( 0x0066ff );
		scene.add( cubeframe );
    };

	// ambient lighting
	var ambientLight = new THREE.AmbientLight(0x492730);
	scene.add(ambientLight);

    // listener
	$(document.body).bind( 'mousemove', onMouseMove, false ); 
	$(document.body).bind( 'mousedown', onDocumentMouseDown, false );
	$(document.body).bind( 'keydown', onDocumentKeyDown, false );
	$(document.body).bind( 'keyup', onDocumentKeyUp, false );
	window.addEventListener( 'resize', onWindowResize, false );
	$(document.body).addClass('stop-scrolling')
}

function render() { 
	requestAnimationFrame( render );   
	renderer.render( scene, camera );
}

function findIntersection() {

	// update the picking ray with the camera and mouse position	
	raycaster.setFromCamera( mouse, camera );	

    objects.forEach(function( mesh ) {
		mesh.material.materials[4].color.set( mesh.mcolor );
	});
	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( objects, true );
    console.log( intersects.length );

    if (intersects.length != 0) {
    	intersects[1].object.material.materials[4].color.set( "white" );	
    };

}


function cleanScene() {
    console.log("Key: d, Clear the scene.\n");
    var num = scene.Children;
    cubes.children.forEach(function( mesh ) {
		cubes.remove(mesh);
	});
}

function selectBrush(brush) { 
}

function addCube() {

}

function deleteCube() {

}

function updateObj() {
	var obj = scene.getObjectByName( "objectName" );

}

function save() {

	window.open( renderer.domElement.toDataURL('image/png'), 'mywindow' );
	return false;

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;		

    // compute the picker
    findIntersection();
    // show info box
    $('#info').css({
       left:  event.pageX,
       top:   event.pageY
    });
}

$("#info").text(function(i){
  return  "aaaaa";
});

function onDocumentMouseDown( event ) {

}

function onDocumentKeyDown( event ) {

	switch( event.keyCode ) {
		case 16: isShiftDown = true; break;
	}

}

function onDocumentKeyUp( event ) {

	switch( event.keyCode ) {
		case 16: isShiftDown = false; break;
	}
}
