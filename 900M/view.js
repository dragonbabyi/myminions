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
function viewCube(obj) {
	// move the cube forward to the center
 
	// var startTime = Date.now();
	// setupTween(obj);
	
	obj.rotation.x = 25 * Math.PI / 180;
	obj.rotation.y = 45 * Math.PI / 180;

    obj.position.x = 0 ;
    obj.position.y = 0 ;
    obj.position.z = 450 ;

}

function resetCube(obj) {

	obj.rotation.x = 0;
	obj.rotation.y = 0;

	obj.position.x = obj.pos.x;
	obj.position.y = obj.pos.y;
	obj.position.z = obj.pos.z;
}
