
varying vec2 vUV;
uniform sampler2D myTexture;

void main() {

	vec4 color = texture2D(myTexture, vUV);
	gl_FragColor = vec4(color.xyz, 1.0);
}
