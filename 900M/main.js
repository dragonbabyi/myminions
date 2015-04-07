var renderer, camera, scene;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

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

	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshNormalMaterial( { color: 0x00ff00 } );

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
	console.log(len);

    for (var i = 0; i < len; i++) {
    	var newcube = new THREE.BoxGeometry(20, 20, 20);
    	newcube.applyMatrix( new THREE.Matrix4().makeTranslation(Math.floor(i%30)*20 - 290, 290 - Math.floor(i/30)*20, 10) ); 
    	var mesh = new THREE.Mesh(newcube, material); 
    	scene.add(mesh);

        var cubeframe = new THREE.BoxHelper( mesh );
		cubeframe.material.color.set( 0x0066ff );
		scene.add( cubeframe );
    };

	// ambient lighting
	var ambientLight = new THREE.AmbientLight(0x492730);
	scene.add(ambientLight);

}

function render() { 
	requestAnimationFrame( render );
	renderer.render( scene, camera );
};

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}