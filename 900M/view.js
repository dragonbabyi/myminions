
var palettes = [];


/**
 * tweenjs for smooth animation.
 */

function setupTween(obj) {

	var update = function() {
		obj.position.x = current.x;
	}
	var current = { z: obj.position.z };

	TWEEN.removeAll();

	var easing = TWEEN.Easing['Elastic']['EaseInOut'];

	var tweenHead = new TWEEN.Tween(current)
			.to({z: 0}, 200)
			.delay(200)
			.easing('Elastic.EaseInOut')
			.onUpdate(update);

	var tweenBack = new TWEEN.Tween(current)
			.to({z: 400}, 200)
			.delay(200)
			.easing(easing)
			.onUpdate(update);

	tweenHead.chain(tweenBack);

	tweenBack.chain(tweenHead);

	tweenHead.start();
}


/**
 * transform the small cube to the nearer center
 * view the cube by holding the mouse and rotate
 * update 6 values (colors of faces)
 **/
function viewCube(scene, obj) {
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
		var material = new THREE.MeshBasicMaterial( {color: 0xff8700} );
		var palette = new THREE.Mesh( geometry, material );
		var d = 30;
		var x = d * Math.cos( i * 60 * Math.PI / 180 );
		var y = d * Math.sin( i * 60 * Math.PI / 180 );
        palette.applyMatrix( new THREE.Matrix4().makeTranslation( x, y, 450 ) );
        palette.name = "palette" + i.toString();
		scene.add( palette );
		palettes.push( palette );

    }
}

function resetCube(scene, obj) {

	obj.rotation.x = 0;
	obj.rotation.y = 0;

	obj.position.x = obj.pos.x;
	obj.position.y = obj.pos.y;
	obj.position.z = obj.pos.z;

	palettes.forEach(function( palette ) {
		scene.remove( palette );
	})
}
