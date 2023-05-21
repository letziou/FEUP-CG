precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main(void) {
    vec4 color = texture2D(uSampler, vTextureCoord);
    if (color.a < 1.0)
        discard;
    else
        gl_FragColor = color;
}
