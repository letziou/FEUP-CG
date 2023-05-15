import { CGFobject } from '../lib/CGF.js';
import { MyBillboard } from "./MyBillboard.js";

export class MyTreeGroupPatch extends CGFobject {
  constructor(scene, texture) {
    super(scene);
    this.scene = scene;
    this.texture = texture;

    this.trees = [];
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        let randx = 15 + Math.random() * 20;
        let randz = 15 + Math.random() * 20;
        let randScale = 3 + Math.random() * 10;

        let base_x = -90 + i * 15;  
        let base_z = -90 + j * 15;  
        this.trees.push(new MyBillboard(scene, texture, base_x , -72, base_z , randScale));
      }
    }
  }
  
  display() {
    for (let tree of this.trees) {
      tree.display();
    }
  } 
}


