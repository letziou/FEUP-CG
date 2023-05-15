import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

export class MyBillboard extends CGFobject {
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.quad = new MyQuad(scene);
  }
  
  angleBetweenVectors(v1, v2) {
    const dot = v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
    const mag1 = Math.sqrt(v1[0]*v1[0] + v1[1]*v1[1] + v1[2]*v1[2]);
    const mag2 = Math.sqrt(v2[0]*v2[0] + v2[1]*v2[1] + v2[2]*v2[2]);
    const angle = Math.acos(dot/(mag1*mag2));
    return angle;
  }
  
  display(x = 0, y = 0, z = 0) {
    // Calculate the vector from the billboard to the camera
    const cameraPos = this.scene.camera.position;
    const toCamera = [cameraPos[0]-x, cameraPos[1]-y, cameraPos[2]-z];
  
    // Calculate the rotation angle
    const billboardNormal = [0, 0, 1];  // Assuming the billboard is facing the positive Z direction
    const angle = angleBetweenVectors(billboardNormal, toCamera);
  
    this.scene.pushMatrix();
    this.scene.translate(x, y, z);
    this.scene.rotate(angle, 0, 1, 0);  // Rotate around the Y axis
    this.quad.display();
    this.scene.popMatrix();
  }  
}