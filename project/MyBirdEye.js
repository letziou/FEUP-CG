import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
* MyPanorama
* @constructor
 * @param scene - Reference to MyScene object
*/

export class MyBirdEye extends CGFobject{
  constructor(scene) {
    super(scene);

    this.scene = scene;
    this.face = new MyQuad(scene);

    this.initMaterials(scene);
}

initMaterials(scene){
  this.black = new CGFappearance(scene);
  this.black.setAmbient(0, 0, 0, 1.0);
  this.black.setDiffuse(0, 0, 0, 1.0);
  this.black.setSpecular(0, 0, 0, 1.0);
  this.black.setShininess(10.0);

}

display() {

  this.scene.pushMatrix();
  this.black.apply();

  this.scene.pushMatrix();
  this.scene.scale(1, 1, 1);
  this.scene.translate(0, .1, 0);
  this.scene.rotate(-Math.PI/2, 1, 0, 0);
  this.face.display();
  this.scene.popMatrix();
  
  this.scene.pushMatrix();
  this.scene.scale(1, 1, 1);
  this.scene.translate(.1, 0, 0);
  this.scene.rotate(Math.PI/2, 0, 1, 0);
  this.face.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1, 1, 1);
  this.scene.translate(-.1, 0, 0);
  this.scene.rotate(-Math.PI/2, 0, 1, 0);
  this.face.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1, 1, 1);
  this.scene.translate(0, 0, .1);
  this.scene.rotate(0, 0, 1, 0);
  this.face.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1, 1, 1);
  this.scene.translate(0, 0, -.1);
  this.scene.rotate(Math.PI, 0, 1, 0);
  this.face.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1, 1, 1);
  this.scene.translate(0, -.1, 0);
  this.scene.rotate(Math.PI/2, 1, 0, 0);
  this.face.display();
  this.scene.popMatrix();
  }
}
