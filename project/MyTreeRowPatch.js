import { CGFobject } from '../lib/CGF.js';
import { MyBillboard } from "./MyBillboard.js";

export class MyTreeRowPatch extends CGFobject {
  constructor(scene) {
    super(scene);
    this.scene = scene;

    this.trees = [];
    
    for (let i = 0; i < 7; ++i) {
      let randx = 2 + Math.random() * 7;
      let randz = 2 + Math.random() * 7;
      let randScale = 3 + Math.random() * 10;

      let base_x = 35 + i * 10;  
      let base_z = 10;  

      let randTexture = this.scene.billboardTextures[Math.floor(Math.random() * this.scene.billboardTextures.length)];
      this.trees.push(new MyBillboard(scene, randTexture, base_x + randx, -73, base_z + randz, randScale));
    }
  }
  
  display() {
    for (let tree of this.trees) {
      tree.display();
    }
  } 
}
