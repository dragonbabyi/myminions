// http://filmicgames.com/archives/75

varying vec2 vUV;

uniform sampler2D myTexture;
uniform float exposure;


vec3 Uncharted2Tonemap(vec3 x)
{
    float A = 0.15;
    float B = 0.50;
    float C = 0.10;
    float D = 0.20;
    float E = 0.02;
    float F = 0.30;
    float W = 11.2;
    return ((x*(A*x+C*B)+D*E)/(x*(A*x+B)+D*F))-E/F;
}

// Uncharted 2 operator by Jahn Hable
void main()
{
    float W = 11.2;

	vec4 texColor = texture2D(myTexture, vUV);
	vec3 rgb = texColor.xyz * exposure; 

    float ExposureBias = 2.0;
    vec3 curr = Uncharted2Tonemap(rgb * ExposureBias);

    vec3 whiteScale = 1.0/Uncharted2Tonemap(vec3(W, W, W));
    vec3 RGB = curr*whiteScale;

    // // Apply gamma correction
    // float oneOverGamma = 1.0/2.2;
    // vec3 res = pow(RGB, vec3(oneOverGamma, oneOverGamma, oneOverGamma));

    gl_FragColor = vec4(RGB, 1.0);
}