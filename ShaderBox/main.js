//
var scene, camera, renderer, controls;
var shaderProgram = [];

var mouse = new THREE.Vector2();

// init
function init (argument) {
    // dat-GUI
	buildGui();

    // renderer
    renderer = new THREE.WebGLRenderer( {antialias: true, preserveDrawingBuffer: true} );
    // setup for shadows
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    // camera
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 30;

    // scene
 	scene = new THREE.Scene();
    scene.add(camera);

    //
    controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.minDistance = 1;
	controls.maxDistance = 1000;

    // add plane
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(30,30), new THREE.MeshLambertMaterial({color: 0x222222}));
    plane.receiveShadow = true;
    plane.position.y = -10;
    plane.rotateX( -90.0 * Math.PI / 180.0 );
    scene.add( plane );

    // light
	var ambient = new THREE.AmbientLight( 0xffcccc );
	scene.add( ambient );

	var spotLight = new THREE.SpotLight( 0xffffdd );
	spotLight.position.set( 40, 45, 45 );
	spotLight.castShadow = true;
	spotLight.shadowDarkness = 0.7;
	spotLight.shadowMapWidth = 1024;
	spotLight.shadowMapHeight = 1024;

	spotLight.shadowCameraNear = 0.1;
	spotLight.shadowCameraFar = 100;
	spotLight.shadowCameraFov = 30;
	scene.add( spotLight );

	var rotatingLight = new THREE.DirectionalLight( 0x483970 );
	rotatingLight.position.set( -1, 0, 1 );
	rotatingLight.castShadow = true;
 	rotatingLight.shadowMapWidth = 1024;
	rotatingLight.shadowMapHeight = 1024;

	rotatingLight.shadowCameraNear = 0.1;
	rotatingLight.shadowCameraFar = 100;
	rotatingLight.shadowCameraFov = 50;

	rotatingLight.shadowMapBias = 0.0039;
	rotatingLight.shadowMapDarkness = 0.8;

	scene.add( rotatingLight );

    customMinion('meshes/bunnywithnormal.obj');
	 
	window.addEventListener( 'resize', onWindowResize, false );

 }

// render
function render (argument) {
 	
 	requestAnimationFrame( render );
 	controls.update();
 	renderer.render( scene, camera );

 } 

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

 }

$(document).ready(function() {
    init();
    render();
});
 
