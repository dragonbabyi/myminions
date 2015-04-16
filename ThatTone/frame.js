/** 
 * Control initialization and animation in each frame. 
 */ 

var SCREEN_WIDTH = $("#editor").width();
var SCREEN_HEIGHT = $("#editor").height();

var container,stats;

var camera, scene, scene2, renderer;

var mesh, mesh2, texturePainting, materialPainting, texturePainting2, materialPainting2;

var mid = 100;
 
var windowHalfX = SCREEN_WIDTH / 2;
var windowHalfY = SCREEN_HEIGHT / 2;

init();
animate();

function init() {

	container = document.getElementById('editor');
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 4000 );
	camera.position.z = 3000;

	scene = new THREE.Scene();
	scene2 = new THREE.Scene();

	var callbackPainting = function() {

		var image = texturePainting.image;

		texturePainting2.image = image;
		texturePainting2.needsUpdate = true;

		var geometry = new THREE.PlaneGeometry( 100, 100 );
		mesh = new THREE.Mesh( geometry, materialPainting );
		mesh2 = new THREE.Mesh( geometry, materialPainting2 );

		addPainting( scene, mesh );
		addPainting( scene2, mesh2 );

		function addPainting( zscene, zmesh ) {

			zmesh.scale.x = image.width / 100;
			zmesh.scale.y = image.height / 100;

			zscene.add( zmesh );

			var meshFrame = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0x000000, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 5 } )  );
			meshFrame.scale.x = 1.1 * image.width / 100;
			meshFrame.scale.y = 1.1 * image.height / 100;

			zscene.add( meshFrame );
		}
	};
 
    texturePainting = THREE.ImageUtils.loadTexture( "images/park.JPG", THREE.UVMapping, callbackPainting );
 	texturePainting.needsUpdate = true;
 	materialPainting = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texturePainting } );

	texturePainting2 = new THREE.Texture();
    texturePainting2.image = texturePainting.image;
    texturePainting2.needsUpdate = true;

	texturePainting2.minFilter = texturePainting2.magFilter = THREE.NearestFilter;
	texturePainting.minFilter = texturePainting.magFilter = THREE.NearestFilter;

	var vertShaderId = 'vertexshader';
    var fragShaderId = 'linear'; 
    var uniforms = {
        myTexture: { type: 't', value: texturePainting2.image },
        exposure: {type: 'f', value: 1.0}
    };
    materialPainting2 = new newMaterial(vertShaderId, fragShaderId, uniforms);

	renderer = new THREE.WebGLRenderer({
		preserveDrawingBuffer   : true   // required to support .toDataURL()
	});
	renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	renderer.setClearColor( 0, 0, 0, 1 );
	renderer.autoClear = false;

	renderer.domElement.style.position = "relative";
	container.appendChild( renderer.domElement );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}
 
function uploadImage(img) {
    
    // update to new texture
	texturePainting = THREE.ImageUtils.loadTexture( img.src );
 	texturePainting.needsUpdate = true;

    var newtexturePainting = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texturePainting } );
    mesh.material = newtexturePainting;
 
	texturePainting.minFilter = texturePainting.magFilter = THREE.NearestFilter;
 
	/////// default shader
	var vertShaderId = 'vertexshader';
    var fragShaderId = 'linear'; 
    var defaultUniforms = {
        exposure: {type: 'f', value: 1.0}
    };

	loadshader(vertShaderId, fragShaderId, defaultUniforms);
}

function loadshader(vertex, fragment, param) {

	texturePainting2.image = texturePainting.image;
    texturePainting2.needsUpdate = true;
  
	var vertShaderId = vertex;
    var fragShaderId = fragment; 

    // create uniforms from default values
    var uniforms = {
        myTexture: { type: 't', value: texturePainting2.image },
    };
    for (var i = 0; i < Object.keys(param).length; i++) {
    	uniforms[Object.keys(param)[i]] = param[Object.keys(param)[i]];
    };

    var newtexturePainting2 = new newMaterial(vertShaderId, fragShaderId, uniforms);
    mesh2.material = newtexturePainting2;

    newtexturePainting2.minFilter = newtexturePainting2.magFilter = THREE.NearestFilter;
}

// todo
function updateUniforms(param) {

	// update uniforms 
    
	// create new material

}
 
function saveImage() {
	window.open( renderer.domElement.toDataURL('image/png'), 'myimg' );  
}

function onDocumentMouseMove(event) {
	mid = Math.max( 2, event.clientX - 350);
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {

	camera.lookAt( scene.position );

	renderer.enableScissorTest( false );
	renderer.clear();
	renderer.enableScissorTest( true );

	renderer.setScissor( 0, 0, mid - 2, SCREEN_HEIGHT );
	renderer.render( scene, camera );

	renderer.setScissor( mid, 0, SCREEN_WIDTH - 2, SCREEN_HEIGHT  );
	renderer.render( scene2, camera );

}





