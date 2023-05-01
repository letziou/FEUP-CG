import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyCylinder } from './MyCilinder.js';
import { MyQuad } from './MyQuad.js';

export class MyNest extends CGFobject {
  constructor(scene) {
    super(scene);
    this.scene = scene;

    this.cilinder = new MyCylinder(scene, 2, 10, 7, 50, 50);
    this.base = new MyQuad(scene);

    this.initMaterials(scene);
  }

  initMaterials(scene){
    this.nestText = "images/nest.jpg";
    this.nestTexture = new CGFappearance(scene); 
    this.nestTexture.setAmbient(0.1, 0.1, 0.1, 1);
    this.nestTexture.setDiffuse(0.9, 0.9, 0.9, 1);
    this.nestTexture.setSpecular(0.1, 0.1, 0.1, 1);
    this.nestTexture.setShininess(10.0);
    this.nestTexture.loadTexture(this.nestText);
    this.nestTexture.setTextureWrap('REPEAT', 'REPEAT');
  }

  display(){
    this.scene.pushMatrix();
    this.scene.scale(0.2, 0.2, 0.2);
    this.scene.translate(0,-5,0);
    this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
    this.nestTexture.apply();
    this.cilinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0,-1,0);
    this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
    this.nestTexture.apply();
    this.base.display();
    this.scene.popMatrix();
  }
  
}