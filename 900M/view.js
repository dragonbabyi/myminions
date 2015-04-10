/**
 * User input information from GUI.
 */

var userOpts	= {
	 
};


/**
 * tweenjs for smooth animation.
 */

function setupTween(obj) {

	var update = function() {
		obj.position.x = current.x;
	}
	var current = { x: obj.position.x };

	TWEEN.removeAll();

	var easing = TWEEN.Easing['Elastic']['EaseInOut'];

	var tweenHead = new TWEEN.Tween(current)
			.to({x: 0}, 200)
			.delay(200)
			.easing('Elastic.EaseInOut')
			.onUpdate(update);

	var tweenBack = new TWEEN.Tween(current)
			.to({x: 0}, 200)
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
function viewCube(obj) {
	// transform from origianl position to (0, 0, 300)
	// camera.position.z = 500;

	// var startTime	= Date.now();

	// setupTween(obj);
	
    var cubeGeometry = obj.geometry;
    cubeGeometry.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 100) );

}
