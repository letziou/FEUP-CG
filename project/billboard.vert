// This is a very basic vertex shader that just passes along model space coordinates
// to the fragment shader.
precision mediump float;

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float uWindIntensity; 
uniform float timeFactor;  

varying vec2 vTextureCoord;

void main(void) {
    vec3 WindDirection = vec3(0, 0, 1);
    float textureThreshold = 0.5; // Adjust this value to control the threshold for the moving texture

    // Apply displacement only to the top part of the texture
    vec3 windOffset = aVertexNormal * uWindIntensity * dot(normalize(WindDirection), aVertexNormal) * step(aTextureCoord.y, textureThreshold);

    float wobbleOffset = sin(timeFactor) * 0.1;
    vec4 displacedPosition = vec4(aVertexPosition + windOffset * wobbleOffset, 1.0);

    gl_Position = uPMatrix * uMVMatrix * displacedPosition;
    vTextureCoord = aTextureCoord;
}

