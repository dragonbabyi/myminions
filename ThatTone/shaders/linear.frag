
varying vec2 vUV;

uniform sampler2D myTexture;
uniform float exposure;

void main() {

	vec4 texColor = texture2D(myTexture, vUV);
	texColor *= exposure;   
	vec3 retColor = texColor.xyz;
	// vec3 retColor = vec3(pow(texColor.x, 1.0/2.2), pow(texColor.y, 1.0/2.2), pow(texColor.z, 1.0/2.2));
	gl_FragColor = vec4(retColor.x, 0.0, 0.0, 1.0);
}
