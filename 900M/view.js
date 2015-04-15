
var palettes = [];

// create gradient texture
function generateTexture( colorHex ) {

	var size = 128;

	// create canvas
	canvas = document.createElement( 'canvas' );
	canvas.width = size;
	canvas.height = size;
	// get context
	var context = canvas.getContext( '2d' );
	context.rect(0, 0, size, size);
	// draw gradient
	var gradient = context.createRadialGradient( 64,64,5, 64,64,128 );
	gradient.addColorStop(0, colorHex);  
	gradient.addColorStop(1, 'transparent');  
	context.fillStyle = gradient;
	context.fill();

	return canvas;

}

/**
 * transform the small cube to the nearer center
 * view the cube by holding the mouse and rotate
 * update 6 values (colors of faces)
 **/
function viewCube (scene, obj) {
	// move the cube forward to the center
 
	// var startTime = Date.now();
	// setupTween(obj);
	
	obj.rotation.x = 25 * Math.PI / 180;
	obj.rotation.y = 45 * Math.PI / 180;

    obj.position.x = 0 ;
    obj.position.y = 0 ;
    obj.position.z = 450 ;

    // add face color selection
    for (var i = 0; i < 6; i++) {
    	var geometry = new THREE.CircleGeometry( 3, 32, 32 );

        var key = Object.keys(faceColors)[i];
        var col = faceColors[key];
		
		// material texture
		var texture = new THREE.Texture( generateTexture( col ) );
		texture.needsUpdate = true; // important!

		// material
	    var material = new THREE.MeshBasicMaterial( { map: texture, transparent: true } );

		// var material = new THREE.MeshBasicMaterial( {color: col} );
		var palette = new THREE.Mesh( geometry, material );
		var d = 25;
		var x = d * Math.cos( i * 60 * Math.PI / 180 );
		var y = d * Math.sin( i * 60 * Math.PI / 180 );
        palette.applyMatrix( new THREE.Matrix4().makeTranslation( x, y, 450 ) );
        palette.name = "face" + i.toString();
		scene.add( palette );
		palettes.push( palette );

    }
}

function editCube (scene, animCube, intersect) {
	// when mouse is over palette, click to select color 
    if ( intersect.object.geometry.type == "CircleGeometry" ) {

        var center = intersect.object.position;
        var point = intersect.point;
        var distance = ( point - center ).length(); 


    } else { // else rotate the cube 

		animCube.rotation.x += ( mouse.y * 10 ) * Math.PI / 180;
		animCube.rotation.y += ( mouse.x * 10 ) * Math.PI / 180;

    }

}

function highlightFace ( str ) {
	// todo
	// if select one face text in the topbar
	// rotate all the cubes to make that face facing forward
	//....

}

function resetCube (scene, obj) {

	obj.rotation.x = 0;
	obj.rotation.y = 0;

	obj.position.x = obj.pos.x;
	obj.position.y = obj.pos.y;
	obj.position.z = obj.pos.z;

	palettes.forEach(function( palette ) {
		scene.remove( palette );
	})
}
