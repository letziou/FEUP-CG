#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D terrainMap;
uniform sampler2D terrainTex;
uniform sampler2D terrainAlt;

void main() {
    vec4 heightColor = texture2D(terrainMap, vTextureCoord);
    float height = -heightColor.r; // Assuming height is in the red channel
    vec4 altColor = texture2D(terrainAlt, vec2(0.5, height)); // Use height as the y-coordinate
    
    vec4 color = texture2D(terrainTex, vTextureCoord);
    gl_FragColor = mix(color, altColor, 0.3); // You can adjust the mixing factor
}