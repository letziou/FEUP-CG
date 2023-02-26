import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangle } from './MyTriangle.js';

export class MyTangram extends CGFobject{
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.diamond = new MyDiamond(scene);
    this.diamond = new MyDiamond(scene);
    this.triangle = new MyTriangle(scene);
    this.parallelogram = new MyParallelogram(scene);
}

display() {

    this.scene.pushMatrix();
    this.scene.scale(1.5, 1.5, 1);
    this.scene.translate(0, 0, 0);
    this.scene.rotate(Math.PI+Math.PI/4, 0, 0, 1);
    this.triangle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(-1.1, 1.1, 1);
    this.scene.translate(-2, 0, 0);
    this.scene.rotate(-Math.PI/4, 0, 0, 1);
    this.parallelogram.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.scene.scale(1.4, 1.4, 1);
    this.scene.translate(-.5, -1, 0);
    this.scene.rotate(-Math.PI/2, 0, 0, 1);
    this.triangle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(.6, .6, 1);
    this.scene.translate(-2.5, -3.7, 0);
    this.scene.rotate(Math.PI/2, 0, 0, 1);
    this.triangle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(1, 1, 1);
    this.scene.translate(2.1, -1.5, 0);
    this.scene.rotate(-Math.PI/4, 0, 0, 1);
    this.triangle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(.7, .7, 1);
    this.scene.translate(2, -3.2, 0);
    this.scene.rotate(0, 0, 0, 1);
    this.triangle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(.9, .9, 1);
    this.scene.translate(3, -2.55, 0);
    this.scene.rotate(Math.PI/4, 0, 0, 1);
    this.diamond.display();
    this.scene.popMatrix();
  }
}
