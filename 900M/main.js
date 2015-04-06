var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

// scene 
var scene = new THREE.Scene();
scene.add(camera);  

//
// guiScene( gui, scene, camera );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

// ambient lighting
var ambientLight = new THREE.AmbientLight(0x555555);
scene.add(ambientLight);

var render = function () {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
};

render();