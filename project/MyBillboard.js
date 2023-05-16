import { MyQuad } from "./MyQuad.js";
import { CGFobject, CGFappearance, CGFshader } from '../lib/CGF.js';

export class MyBillboard extends CGFobject {
  constructor(scene, texture, x = 0, y = 0, z = 0, scale = 1) {
    super(scene);
    this.scene = scene;
    this.quad = new MyQuad(scene);

    this.x = x;
    this.y = y;
    this.z = z;
    this.scale = scale;
    
    this.texture = texture;
    this.appearance = new CGFappearance(scene);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.shader = new CGFshader(this.scene.gl, "billboard.vert", "billboard.frag");
  }
  
  display() {
    // Calculate the direction vector from the camera to the quad in the XZ-plane
    const cameraPos = this.scene.camera.position;
    const directionVec = [this.x - cameraPos[0], this.z - cameraPos[2]];

    // Normalize the direction vector
    const length = Math.sqrt(directionVec[0]**2 + directionVec[1]**2);
    const normalizedVec = directionVec.map(e => e / length);

    // Calculate the rotation angle
    const rotY = Math.atan2(-normalizedVec[0], -normalizedVec[1]);

    this.scene.pushMatrix();
    this.scene.translate(this.x, this.y + (1 + this.scale) / 2, this.z);
    this.scene.scale(this.scale, this.scale, this.scale);
    this.scene.rotate(rotY, 0, 1, 0);
    //this.scene.setActiveShader(this.shader);
    this.appearance.apply();
    this.quad.display();
    //this.scene.setActiveShader(this.scene.defaultShader);
    this.scene.popMatrix();
  } 
}
