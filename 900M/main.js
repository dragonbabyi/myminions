var renderer, camera, scene, cubes, objects, plane, buffers;
var bday = new Date("Dec 24, 1988");

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var isShiftDown, clear, animate;   // flag
var intersects, animCube;

// var CC = [0xffd500, 0x009e60, 0x0051ba, 0xffffff, "yellow", 0xC41E3A ];
var CC = [];
$.each( faceColors, function(k, v) {
	CC.push( v );
});
 
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

    // add grid
	var size = 300; 
	var step = 20; 
	// add plane
    plane = new THREE.PlaneGeometry( size * 2, size * 2 );
	var material = new THREE.MeshBasicMaterial( {color: 0x222222} );
	var plane = new THREE.Mesh( plane, material );
	scene.add( plane );

	var gridXY = new THREE.GridHelper(size, step);
	gridXY.position.set( 0, 0, 0 );
	gridXY.rotation.x = Math.PI/2;
	gridXY.setColors( new THREE.Color(0xffffff), new THREE.Color(0xffffff) );
	scene.add(gridXY);

	// init cubes 
	bday = $('#birthday')[0].valueAsDate;
	var currDate = new Date();
	var y = currDate.getFullYear() - bday.getFullYear();
	var m = currDate.getMonth() - bday.getMonth();
	var len = y * 12 + m;
	len = len > 900 ? 900 : len;

	objects = [];
	objects.push( plane );
	clear = false;
	intersects = null;
	animate = false;

	// topbar
	var topbars = createTopbar();
	topbars.forEach( function( element ) { scene.add( element ); }); 

	// grid
    for (var i = 0; i < len; i++) {

    	var newcube = new THREE.BoxGeometry(20, 20, 20);
	    var mats = [];
	    mats.push(new THREE.MeshBasicMaterial({ color: CC[0] }));
	    mats.push(new THREE.MeshBasicMaterial({ color: CC[1] }));
	    mats.push(new THREE.MeshBasicMaterial({ color: CC[2] }));
	    mats.push(new THREE.MeshBasicMaterial({ color: CC[3] }));
	    mats.push(new THREE.MeshBasicMaterial({ color: CC[4] }));  // backward
	    mats.push(new THREE.MeshBasicMaterial({ color: CC[5] }));
	    var faceMaterial = new THREE.MeshFaceMaterial(mats); 

    	var mesh = new THREE.Mesh(newcube, faceMaterial); 
    	var cubeyear = Math.floor(i / 12) + bday.getFullYear();    	
        var cubemonth = Math.floor(i % 12) + bday.getMonth() + 1;
    	mesh.info = cubeyear.toString() + "-" + cubemonth.toString(); // date
    	mesh.mcolor =  new THREE.Color( CC[4] );

    	mesh.applyMatrix( new THREE.Matrix4().makeTranslation(Math.floor(i%30)*20 - 290, 290 - Math.floor(i/30)*20, 10) ); 
    	mesh.pos = new THREE.Vector3( mesh.position.x, mesh.position.y, mesh.position.z );

        var cubeframe = new THREE.BoxHelper( mesh );
		cubeframe.material.color.set( 0xfffff2 );
		   
    	scene.add(mesh);
    	scene.add(cubeframe);
    	objects.push(mesh);
    	objects.push(cubeframe);

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
}

function render() { 

	requestAnimationFrame( render );   
	renderer.render( scene, camera );

	if (animate) {
		// TWEEN.update();
	}

}

function highlight ( obj ) {

    if ( obj.geometry.type == "BoxGeometry" ) {
    	obj.material.materials[4].color.set( "white" );
    }
}


function toggleScene() {

	if ( !clear ) {
        // clear scene
	    objects.forEach(function( mesh ) {
			scene.remove(mesh);
	    })
	    clear = true;
	} else {
        // recover scene
   		objects.forEach(function( mesh ) {
			scene.add(mesh);
		})
		clear = false;
	}
}

/**
 * click empty slot to add cube
 * shift click cube to remove
 * click on cube to view
 * @param intersect  The first intersection = intersects[0]
 **/
function updateCube ( intersect ) {
	
	if ( animate ) { 
		// move the cube back to the grid
		resetCube( scene, animCube );
		animCube = null;
		animate = false;
		return;
	};

	if (intersect.object.geometry.type == "BoxGeometry") {

    	if ( isShiftDown ) {
			// remove cube
			var obj = intersect.object;
			scene.remove( obj );
            
			// get the BoxHelper by id + 1
			var objBoxId = obj.id + 1;
			scene.remove( scene.getObjectById( objBoxId) );

			objects.splice( objects.indexOf( obj ), 2);
		}    
        else {
        	var obj = intersect.object;
            // reset the front face color
            obj.material.materials[4].color.set( obj.mcolor );
			// view single cube
            if ( !animate ) {
				animCube = obj;
				viewCube( scene, obj );
				animate = true;
			}
        }
    }
    else if ( intersect.object.geometry.type == "PlaneGeometry") {
        // add cube
		var pos = intersect.point;
	    pos.divideScalar(20).floor().multiplyScalar(20).addScalar(10);

    	var num = Math.floor(( pos.x + 310 ) / 20 + Math.floor( 290 - pos.y) / 20 * 30 );
    	var cubeyear = Math.floor( num / 12 ) + bday.getFullYear();
        var cubemonth = ( Math.floor( num % 12 ) + bday.getMonth() ) + 1;
        if (cubemonth > 12) {
        	cubemonth = cubemonth % 12;
        	cubeyear += 1;
        }

    	var cube = new THREE.BoxGeometry(20, 20, 20);
	    
	    var mats = [];
	    mats.push(new THREE.MeshBasicMaterial({ color: CC[0] }));
	    mats.push(new THREE.MeshBasicMaterial({ color: CC[1] }));
	    mats.push(new THREE.MeshBasicMaterial({ color: CC[2] }));
	    mats.push(new THREE.MeshBasicMaterial({ color: CC[3] }));
	    mats.push(new THREE.MeshBasicMaterial({ color: CC[4] })); 
	    mats.push(new THREE.MeshBasicMaterial({ color: CC[5] }));
	    var faceMaterial = new THREE.MeshFaceMaterial(mats); 
		
		var mesh = new THREE.Mesh(cube, faceMaterial);     	
    	mesh.info = cubeyear.toString() + "-" + cubemonth.toString();  
    	mesh.mcolor =  new THREE.Color( "yellow" );
	
		mesh.applyMatrix( new THREE.Matrix4().makeTranslation( pos.x, pos.y, 10 ) );	 
    	mesh.pos = new THREE.Vector3( mesh.position.x, mesh.position.y, mesh.position.z );

	    var cubeframe = new THREE.BoxHelper( mesh );
		cubeframe.material.color.set( 0x0066ff );

        scene.add(mesh);
        scene.add(cubeframe);
	    objects.push(mesh);
		objects.push(cubeframe);
	}
 
}

/**
 * Save the current scene to an image
 */
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

    var obj;
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;		

	// update the picking ray with the camera and mouse position	
	raycaster.setFromCamera( mouse, camera );	

    objects.forEach(function( mesh ) {
    	if (mesh.geometry.type == "BoxGeometry") {
    		mesh.material.materials[4].color.set( mesh.mcolor );
    	}
	});
	// calculate objects intersecting the picking ray
	intersects = raycaster.intersectObjects( objects, true );

	if ( intersects.length > 0) {
		obj = intersects[0].object;
    
	    if ( !animate ) {

	    	// highlight the selection
	    	highlight( obj );
	    } else {

	        editCube( scene, animCube, intersects[0] );
	    }
	}
}

function onDocumentMouseDown( event ) {

    if ( intersects == null ) {

		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;	
		// update the picking ray with the camera and mouse position	
		raycaster.setFromCamera( mouse, camera );	
	
		// calculate objects intersecting the picking ray
		intersects = raycaster.intersectObjects( objects, true );

    };

	if (intersects.length > 0) {
		updateCube( intersects[0] );
	}
}

function onDocumentKeyDown( event ) {

	switch( event.keyCode ) {
		case 16: isShiftDown = true; 
		    break;
		case 68: toggleScene();
		    break;
	}
}

function onDocumentKeyUp( event ) {

	switch( event.keyCode ) {
		case 16: isShiftDown = false; 
		    break;
	}
}
