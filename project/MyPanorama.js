import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
/**
* MyPanorama
* @constructor
 * @param scene - Reference to MyScene object
 * @param panorama - Reference to texture object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions around the Y axis
 * @param radius - scale of sphere that functions as radius
 * @param inverted - Flag indicating whether to invert the faces of sphere
*/
export class MyPanorama extends CGFobject {
  constructor(scene, panorama, slices, stacks, radius, inverted){
    super(scene);

    this.sphere = new MySphere(scene, slices, stacks, radius, inverted);
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
    //this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
    this.sphere.display();
  }
}