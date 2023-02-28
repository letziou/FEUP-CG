import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangle } from './MyTriangle.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
import { MyTriangleBig } from './MyTriangleBig.js';

export class MyTangram extends CGFobject{
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.diamond = new MyDiamond(scene);
    this.diamond = new MyDiamond(scene);
    this.triangle = new MyTriangle(scene);
    this.parallelogram = new MyParallelogram(scene);
    this.triangleBig = new MyTriangleBig(scene);
    this.triangleSmall = new MyTriangleSmall(scene);
}

display() {
    this.scene.pushMatrix();
    this.scene.scale(1, -1, 1);
    this.scene.translate(-0.7, 1, 0);
    this.scene.rotate(-Math.PI/4, 0, 0, 1);
    this.parallelogram.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(1, 1, 1);
    this.scene.translate(-0.7, -1, 0);
    this.scene.rotate(Math.PI/4, 0, 0, 1);
    this.triangleBig.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(1, 1, 1);
    this.scene.translate(2.128, -1, 0);
    this.scene.rotate(-Math.PI/4, 0, 0, 1);
    this.triangle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(1, 1, 1);
    this.scene.translate(-1.41, -1.71, 0);
    this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
    this.triangleSmall.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(1, 1, 1);
    this.scene.translate(1.424, -1.71, 0);
    this.scene.rotate(3*Math.PI/4, 0, 0, 1);
    this.triangleSmall.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(1, 1, 1);
    this.scene.translate(2.834, -1.71, 0);
    this.scene.rotate(Math.PI/4, 0, 0, 1);
    this.diamond.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(1, 1, 1);
    this.scene.translate(0, .41, 0);
    this.scene.rotate(0, 0, 0, 1);
    this.triangleBig.display();
    this.scene.popMatrix();
  }
}
