// ReinhardHdr.frag

varying vec2 vUV;

uniform sampler2D myTexture;
uniform float exposure;

void main() {

	vec4 texColor = texture2D(myTexture, vUV);
	 

	 
	gl_FragColor = vec4(retColor.x, 1.0, 0.0, 1.0);
}
