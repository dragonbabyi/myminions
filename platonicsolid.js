 
var w = window.innerWidth;
var h = window.innerHeight;

var $container = $('#ViewContainer');
var renderer = new THREE.WebGLRenderer({antialias: true});
var camera = new THREE.PerspectiveCamera(45,w/h,0.1,10000);
var scene = new THREE.Scene();

scene.add(camera);
renderer.setSize(w, h);
$container.append(renderer.domElement);
 
///////////////////////////////////////////////
 
// Camera
camera.position.z = 200;
 
// Material
var pinkMat = new THREE.MeshPhongMaterial({
  color      :  new THREE.Color("rgb(30,30,30)"),
  emissive   :  new THREE.Color("rgb(30,30,30)"),
  specular   :  new THREE.Color("rgb(100,100,100)"),
  shininess  :  10,
  shading    :  THREE.FlatShading,
  transparent: 1,
  opacity    : 1
});
 
var L1 = new THREE.PointLight( 0xffffff, 1);
L1.position.z = 100;
L1.position.y = 100;
L1.position.x = 100;
scene.add(L1);
 
var L2 = new THREE.PointLight( 0xffffff, 0.8);
L2.position.z = 200;
L2.position.y = 50;
L2.position.x = -100;
scene.add(L2);
 
var size=45;
var division=0;
var old_size = 45;
var old_division = 0;
var Ico;
// IcoSphere -> THREE.IcosahedronGeometry(80, 1) 1-4
Ico = new THREE.Mesh(new THREE.IcosahedronGeometry(size, division), pinkMat);
Ico.rotation.z = 0.5;
scene.add(Ico);

function update(){
  document.getElementById('Size').onchange = function() {
    size = this.value;
  }
  document.getElementById('Division').onchange = function() {
    division = this.value;
  }
  if ( (size != old_size) || (division != old_division) ) {
    // delete the old one
    scene.remove(Ico);
    // create the new one
    Ico = new THREE.Mesh(new THREE.IcosahedronGeometry(size, division), pinkMat);
    Ico.rotation.z = 0.5;
    scene.add(Ico);

    old_size = size;
    old_division = division;
  };

  Ico.rotation.x+=2/50;
  Ico.rotation.y+=2/100;
}
 
// Render
function render() {
  requestAnimationFrame(render);			
  renderer.render(scene, camera);	
  update();
}
 
// render();

window.addEventListener("load", render, true);

