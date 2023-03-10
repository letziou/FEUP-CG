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

    this.initMaterials(scene);
}

initMaterials(scene){
   // Green color
   this.green = new CGFappearance(scene);
   this.green.setAmbient(0.1,0.1,0.1,1.0);
   this.green.setDiffuse(0,1,0,1.0);
   this.green.setSpecular(1,1,1,1.0);
   this.green.setShininess(10.0);

   // Blue color
   this.blue = new CGFappearance(scene);
   this.blue.setAmbient(0.1,0.1,0.1,1.0);
   this.blue.setDiffuse(0,0.749*0.7,0.7,1.0);
   this.blue.setSpecular(1,1,1,1.0);
   this.blue.setShininess(10.0);

   // Pink color
   this.pink = new CGFappearance(scene);
   this.pink.setAmbient(0.1,0.1,0.1,1.0);
   this.pink.setDiffuse(0.7,0.714*0.7,0.757*0.7,1.0);
   this.pink.setSpecular(1,1,1,0);
   this.pink.setShininess(10.0);

   // orange color
   this.orange = new CGFappearance(scene);
   this.orange.setAmbient(0.1,0.1,0.1,1.0);
   this.orange.setDiffuse(0.7,0.647*0.7,0,1.0);
   this.orange.setSpecular(1,1,1,0);
   this.orange.setShininess(10.0);

   // yellow color
   this.yellow = new CGFappearance(scene);
   this.yellow.setAmbient(0.1,0.1,0.1,1.0);
   this.yellow.setDiffuse(0.7,0.7,0,1.0);
   this.yellow.setSpecular(1,1,1,0);
   this.yellow.setShininess(10.0);

   // red color
   this.red = new CGFappearance(scene);
   this.red.setAmbient(0.1,0.1,0.1,1.0);
   this.red.setDiffuse(0.7,0,0,1.0);
   this.red.setSpecular(1,1,1,0);
   this.red.setShininess(10.0);

   // purple color
   this.purple = new CGFappearance(scene);
   this.purple.setAmbient(0.1,0.1,0.1,1.0);
   this.purple.setDiffuse(0.58*0.7,0,0.827*0.7,1.0);
   this.purple.setSpecular(1,1,1,1.0);
   this.purple.setShininess(10.0);
}

display() {

    this.scene.pushMatrix();
    this.scene.scale(1, 1, 1);
    this.scene.translate(2.834, -1.71, 0);
    this.scene.rotate(Math.PI/4, 0, 0, 1);
    this.diamond.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(1, -1, 1);
    this.scene.translate(-0.7, 1, 0);
    this.scene.rotate(-Math.PI/4, 0, 0, 1);
    this.yellow.apply();
    this.parallelogram.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(1, 1, 1);
    this.scene.translate(-0.7, -1, 0);
    this.scene.rotate(Math.PI/4, 0, 0, 1);
    this.orange.apply();
    this.triangleBig.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(1, 1, 1);
    this.scene.translate(2.128, -1, 0);
    this.scene.rotate(-Math.PI/4, 0, 0, 1);
    this.pink.apply();
    this.triangle.display();
    this.scene.popMatrix();

    // left side small triangle
    this.scene.pushMatrix();
    this.scene.scale(1, 1, 1);
    this.scene.translate(-1.41, -1.71, 0);
    this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
    this.red.apply();
    this.triangleSmall.display();
    this.scene.popMatrix();

    // right side small triangle
    this.scene.pushMatrix();
    this.scene.scale(1, 1, 1);
    this.scene.translate(1.424, -1.71, 0);
    this.scene.rotate(3*Math.PI/4, 0, 0, 1);
    this.purple.apply();
    this.triangleSmall.display();
    this.scene.popMatrix();

    // this is the triangle in the top
    this.scene.pushMatrix();
    this.scene.scale(1, 1, 1);
    this.scene.translate(0, .41, 0);
    this.scene.rotate(0, 0, 0, 1);
    this.blue.apply();
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
