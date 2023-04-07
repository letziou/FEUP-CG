import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
/**
* MyPanorama
* @constructor
 * @param scene - Reference to MyScene object
 * @param panorama - Reference to texture object
*/
export class MyPanorama extends CGFobject {
  constructor(scene, panorama, slices, stacks, radius){
    super(scene);

    this.sphere = new MySphere(scene, slices, stacks, radius);
    this.panorama = panorama;

    this.initMaterials(scene, panorama);
  }

  initMaterials(scene, panorama){
    this.texture = new CGFappearance(scene); 
    this.texture.setAmbient(0.1, 0.1, 0.1, 1);
    this.texture.setDiffuse(0.9, 0.9, 0.9, 1);
    this.texture.setSpecular(0.1, 0.1, 0.1, 1);
    this.texture.setShininess(10.0);
    this.texture.loadTexture(panorama);
    this.texture.setTextureWrap('REPEAT', 'REPEAT');
  }

  display(){
    this.texture.apply();
    this.sphere.display();
  }
}