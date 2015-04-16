 
var gui;

var Shaders = function (argument) {
	this.name = "Phong";
	this.vert = "";
	this.frag = "";
	this.loadShaders = function() {

	};
}

var Models = function (argument) {
	this.name = "Standford bunny";
}

function buildGui (argument) {
	
	var shaderPanel = new Shaders();
	var modelPanel = new Models();

	gui = new dat.GUI();

	gui.add( modelPanel, 'name', ['Standford bunny', 'Standford dragon']).name('Model').listen();

	gui.add( shaderPanel, 'name', ['Phong', 'Blinn Phong']).name('Shader').listen();

    gui.addFolder('Lambert');

    gui.addFolder('Phong');

    gui.addFolder('Blinn Phong');

    gui.addFolder('Customize');

}