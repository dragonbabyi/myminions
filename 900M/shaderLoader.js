/**
 * Create new material from shader program.
 */

// var newMaterial = function(vertShaderId, fragShaderId, attributes, uniforms) {
var newMaterial = function(vertShaderId, fragShaderId, uniforms) {

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

};

