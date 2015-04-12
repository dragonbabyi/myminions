
var faceColors = {
	 
	"Brown" : "#543729",
	 
	"Green" : "#2BAF2B",
	 
	"Blue" : "#00ACEE",
	
	"Gray" : "#CECECE",

	"Gold" : "#FFCC2F",

	"Red" : "#EF5734"

};

var faces = ["health", "happiness", "work", "learn", "love", "passion"];

// each category may have a sperate scene when it is selected
var categories = ["Where", "Family", "Relationship", "Study", "Learning"];
var cateScenes;

var iconColors = [0xf08000, 0x8080f0, 0x008000, 0x008080, 0x0040f0, 0xf00000, 0x00f000, 0x404040, 0xf000f0, 0x804000, 0x808080];

/**
 * Create top bar for faces
 *
 **/

 function createTopbar () {

 	var elements = [];
 	var len = 0;
 	for (var i = 0; i < faces.length; i++) {
        
        var text = faces[i];
 		 				
		var textGeo = new THREE.TextGeometry( text, {

			size: 12,
			height: 2,
			curveSegments: 4,

			font: "helvetiker",
			// weight: "bold",
			style: "normal",

			bevelThickness: 1,
			bevelSize: 0.9,
			bevelEnabled: true,

			material: 0,
			extrudeMaterial: 1

		});

        var key = Object.keys(faceColors)[i];
        var col = faceColors[key];

	    var uniforms =
		{ 
			"c":   { type: "f", value: 1.0 },
			"p":   { type: "f", value: 1.4 },
			glowColor: { type: "c", value: new THREE.Color( col ) },
			viewVector: { type: "v3", value: camera.position }
		}
		var glowMaterial = new newMaterial ( "glowvert", "glowfrag", uniforms );

		var textGlowMesh = new THREE.Mesh( textGeo, glowMaterial );
        textGlowMesh.applyMatrix( new THREE.Matrix4().makeTranslation( i*14+len*15 - 290, 320, 20 )); 
        textGlowMesh.scale.multiplyScalar(1.5);
		elements.push( textGlowMesh );

		len += text.length;

 	}

 	return elements;

 }

 /**
 * Create categories buckets
 *
 **/

 function createCate () {
 	// push the new scene to the categories
 	
	
 }

// var numbers = {
// 	"IceCreamYouCanEat": {
// 		"if you eat an ice cream everyday": 100000
// 	},
// 	"CountriesYouCanGo": { 
// 		"if you go to a new country every year": 50
// 	},
// 	"MilesYouCanRun": { 
// 		"if you go for a 10 miles run every sunny day": 100000
// 	}
// }

 /**
  * Interesting numbers about things you can do.
  ***/

  // function createNumerous ( ) {
  // 	// body...
  // }

