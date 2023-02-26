import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

export class MyUnitCubeQuad extends CGFobject{
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.face = new MyQuad(scene);
}

display() {
  this.scene.pushMatrix();
  this.scene.scale(1, 1, 1);
  this.scene.translate(.5, 0, 0);
  this.scene.rotate(Math.PI/2, 0, 1, 0);
  this.face.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1, 1, 1);
  this.scene.translate(-.5, 0, 0);
  this.scene.rotate(-Math.PI/2, 0, 1, 0);
  this.face.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1, 1, 1);
  this.scene.translate(0, 0, .5);
  this.scene.rotate(0, 0, 1, 0);
  this.face.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1, 1, 1);
  this.scene.translate(0, 0, -.5);
  this.scene.rotate(Math.PI, 0, 1, 0);
  this.face.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1, 1, 1);
  this.scene.translate(0, .5, 0);
  this.scene.rotate(-Math.PI/2, 1, 0, 0);
  this.face.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1, 1, 1);
  this.scene.translate(0, -.5, 0);
  this.scene.rotate(Math.PI/2, 1, 0, 0);
  this.face.display();
  this.scene.popMatrix();
  }
}
