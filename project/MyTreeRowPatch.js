import { CGFobject } from '../lib/CGF.js';
import { MyBillboard } from "./MyBillboard.js";

export class MyTreeRowPatch extends CGFobject {
  constructor(scene, texture) {
    super(scene);
    this.scene = scene;
    this.texture = texture;

    this.trees = [];
    
    for (let i = 0; i < 7; ++i) {
      let randx = 2 + Math.random() * 7;
      let randz = 2 + Math.random() * 7;
      let randScale = 3 + Math.random() * 10;

      let base_x = -150 + i * 15;  
      let base_z = -130;  
      this.trees.push(new MyBillboard(scene, texture, base_x + randx, -72, base_z + randz, randScale));
    }
  }
  
  display() {
    for (let tree of this.trees) {
      tree.display();
    }
  } 
}