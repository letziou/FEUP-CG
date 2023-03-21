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
    this.triangle = new MyTriangle(scene);
    this.parallelogram = new MyParallelogram(scene);
    this.orangeTriangleBig = new MyTriangleBig(scene, 'orange');
    this.blueTriangleBig = new MyTriangleBig(scene, 'blue');
    this.redTriangleSmall = new MyTriangleSmall(scene, 'red');
    this.purpleTriangleSmall = new MyTriangleSmall(scene, 'purple');

    this.initMaterials(scene);
}

initMaterials(scene){
   // Tangram texture
   this.tangramTexture = new CGFappearance(this.scene);
   this.tangramTexture.setAmbient(0.1, 0.1, 0.1, 1);
   this.tangramTexture.setDiffuse(0.9, 0.9, 0.9, 1);
   this.tangramTexture.setSpecular(0.1, 0.1, 0.1, 1);
   this.tangramTexture.setShininess(10.0);
   this.tangramTexture.loadTexture('images/tangram.png');
   this.tangramTexture.setTextureWrap('REPEAT', 'REPEAT');
}

display() {
    this.scene.pushMatrix();
    this.tangramTexture.apply();

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
    this.parallelogram.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(1, 1, 1);
    this.scene.translate(-0.7, -1, 0);
    this.scene.rotate(Math.PI/4, 0, 0, 1);
    this.orangeTriangleBig.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(1, 1, 1);
    this.scene.translate(2.128, -1, 0);
    this.scene.rotate(-Math.PI/4, 0, 0, 1);
    this.triangle.display();
    this.scene.popMatrix();

    // left side small triangle
    this.scene.pushMatrix();
    this.scene.scale(1, 1, 1);
    this.scene.translate(-1.41, -1.71, 0);
    this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
    this.redTriangleSmall.display();
    this.scene.popMatrix();

    // right side small triangle
    this.scene.pushMatrix();
    this.scene.scale(1, 1, 1);
    this.scene.translate(1.424, -1.71, 0);
    this.scene.rotate(3*Math.PI/4, 0, 0, 1);
    this.purpleTriangleSmall.display();
    this.scene.popMatrix();

    // this is the triangle in the top
    this.scene.pushMatrix();
    this.scene.scale(1, 1, 1);
    this.scene.translate(0, .41, 0);
    this.scene.rotate(0, 0, 0, 1);
    this.blueTriangleBig.display();
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
