// shader loader
var customMaterial = function(vertShaderId, fragShaderId, uniforms) {

    // get shader files
	var vertShaderUrl = $('#'+vertShaderId)[0].src;
    var fragShaderUrl = $('#'+fragShaderId)[0].src;

	var vert = ''; 
	$.ajax({ type: "GET",   
	         url: vertShaderUrl,   
	         async: false,
	         success : function(text)
	         {
	             vert = text;
	         }
	});
	var frag = '';
	$.ajax({ type: "GET",   
        url: fragShaderUrl,   
        async: false,
        success : function(text)
        {
            frag = text;
        }
	});

    // define new material
	var material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		// attributes: attributes,
	  	side: THREE.FrontSide,
		blending: THREE.AdditiveBlending,
		transparent: true,

		vertexShader:  vert, 
		fragmentShader:  frag 
	});

	return material;

}

// model loader
var customMinion = function(meshFile, textureFile, customMaterial) {
	
	// texture
	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {
		console.log( item, loaded, total );
	};
	
	var texture;
	if ( textureFile != null ) {
		texture = new THREE.Texture();
		var onProgress = function ( xhr ) {
			if ( xhr.lengthComputable ) {
				var percentComplete = xhr.loaded / xhr.total * 100;
				console.log( Math.round(percentComplete, 2) + '% downloaded' );
			}
		};
		var onError = function ( xhr ) {
		};

		var loader = new THREE.ImageLoader( manager );
		// textureFile -> 'textures/UV_Grid_Sm.jpg'
		loader.load( textureFile, function ( image ) {
			texture.image = image;
			texture.needsUpdate = true;
		} );
	};

	// shader
	// customMaterial

	// mesh
	var loader = new THREE.OBJLoader( manager );
	loader.load( meshFile, function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				// if ( texture != null ) {
				// 	child.material.map = texture;
				// } else {
				//    child.material.color = new THREE.Color( 0xFFCC66 );
				    child.material = new THREE.MeshLambertMaterial( {color: 0xFFCC66 } );
				    child.castShadow = true;
				    child.receiveShadow = false;
				// }
			}
		    object.castShadow = true;
		    object.receiveShadow = false;
		} );
		 
		object.position.y = -10;
		scene.add( object );
	}, onProgress, onError );

}
