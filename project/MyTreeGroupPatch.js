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
        let randx = 2 + Math.random() * 5;
        let randz = 2 + Math.random() * 5;
        let randScale = 3 + Math.random() * 10;

        let base_x = -100 + i * 15;  
        let base_z = -100 + j * 15;  
        this.trees.push(new MyBillboard(scene, texture, base_x + randx, -72, base_z + randz, randScale));
      }
    }
  }
  
  display() {
    for (let tree of this.trees) {
      tree.display();
    }
  } 
}


