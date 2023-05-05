import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
/**
* MyBirdEgg
* @constructor
 * @param scene - Reference to MyScene object
 * @param inverted - Flag indicating whether to invert the faces of sphere
*/
export class MyBirdEgg extends CGFobject {
  constructor(scene, slices, stacks, radius, inverted){
    super(scene);

    this.sphere = new MySphere(scene, slices, stacks, radius, inverted);

    this.x = 0;
    this.y = 0;
    this.z = 0;

    this.initMaterials(scene);
  }

  initMaterials(scene){
    this.eggText = "images/egg.jpg";
    this.texture = new CGFappearance(scene); 
    this.texture.setAmbient(0.1, 0.1, 0.1, 1);
    this.texture.setDiffuse(0.9, 0.9, 0.9, 1);
    this.texture.setSpecular(0.1, 0.1, 0.1, 1);
    this.texture.setShininess(10.0);
    this.texture.loadTexture(this.eggText);
    this.texture.setTextureWrap('REPEAT', 'REPEAT');
    
  }

  display(scene){
    this.texture.apply();
    this.scene.scale(1, 1, 1.25);
    this.sphere.display();
  }
}