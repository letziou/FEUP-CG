import { CGFappearance, CGFobject } from '../lib/CGF.js';
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

initMaterials(scene){
   // Blue color
   this.blue = new CGFappearance(scene);
   this.blue.setAmbient(0.1,0.1,0.1,1.0);
   this.blue.setDiffuse(0,0.749*0.7,1*0.7,1.0);
   this.blue.setSpecular(1,1,1,1.0);
   this.blue.setShininess(10.0);
}

display() {
    this.scene.pushMatrix();
    this.scene.scale(1, -1, 1);
    this.scene.translate(-0.7, 1, 0);
    this.scene.rotate(-Math.PI/4, 0, 0, 1);
    this.blue.apply();
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

  enableNormalViz() {
      this.parallelogram.enableNormalViz();
      this.diamond.enableNormalViz();
      this.triangle.enableNormalViz();
      this.triangleBig.enableNormalViz();
      this.triangleSmall.enableNormalViz();
  }

  disableNormalViz() {
      this.parallelogram.disableNormalViz();
      this.diamond.disableNormalViz();
      this.triangle.disableNormalViz();
      this.triangleBig.disableNormalViz();
      this.triangleSmall.disableNormalViz();
  }

  updateBuffers(complexity){
      // reinitialize buffers
      this.initBuffers();
      this.initNormalVizBuffers();
  }
}
