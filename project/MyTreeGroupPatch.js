import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyBillboard } from "./MyBillboard.js";

export class MyTreeGroupPatch extends CGFobject {
  constructor(scene, texture) {
    super(scene);
    this.scene = scene;

    // Create a new appearance for the tree group
    this.texture = new CGFappearance(scene);
    this.texture.setTexture(texture);
    this.texture.setTextureWrap('REPEAT', 'REPEAT');

    this.trees = [];
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        let randx = 2 + Math.random() * 15;
        let randz = 2 + Math.random() * 15;
        let randScale = 3 + Math.random() * 10;

        let base_x = 30 + i * 15;  
        let base_z = 50 + j * 15;  

        let randTexture = this.scene.billboardTextures[Math.floor(Math.random() * this.scene.billboardTextures.length)];
        this.trees.push(new MyBillboard(scene, randTexture, base_x + randx, -73, base_z + randz, randScale));
      }
    }
  }
  
  display() {
    this.texture.apply();
    for (let tree of this.trees) {
      tree.display();
    }
  } 
}


