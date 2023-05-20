import { MyQuad } from "./MyQuad.js";
import { CGFobject } from '../lib/CGF.js';

export class MyBillboard extends CGFobject {
  constructor(scene, texture, x = 0, y = 0, z = 0, scale = 1) {
    super(scene);
    this.scene = scene;
    this.quad = new MyQuad(scene);

    this.texture = texture;

    this.x = x;
    this.y = y;
    this.z = z;
    this.scale = scale;
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
    this.texture.bind();
    this.scene.translate(this.x, this.y + (1 + this.scale) / 2, this.z);
    this.scene.scale(this.scale, this.scale, this.scale);
    this.scene.rotate(rotY, 0, 1, 0);
    this.quad.display();
    this.texture.unbind();
    this.scene.popMatrix();
  } 
}