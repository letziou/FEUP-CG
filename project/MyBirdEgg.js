import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
/**
* MyBirdEgg
* @constructor
 * @param scene - Reference to MyScene object
 * @param inverted - Flag indicating whether to invert the faces of sphere
*/
export class MyBirdEgg extends CGFobject {
  constructor(scene, slices, stacks, radius, inverted, positionX, positionY, positionZ){
    super(scene);

    this.sphere = new MySphere(scene, slices, stacks, radius, inverted);

    this.x = positionX;
    this.y = positionY;
    this.z = positionZ;

    this.eggDropping = false;
    this.initialTime = 0;
    this.index = 0;

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

  drop(birdX, birdY, birdZ, index){
    this.x = birdX;
    this.y = birdY;
    this.z = birdZ;
    this.index = index;
    this.eggDropping = true;
  }

  land(){
    if(this.y < -69){
      this.eggDropping = false;
      this.scene.eggInNest(this.index);
    }
  }

  update(t) {
    if(!this.eggDropping)
      this.initialTime = t;
 
    if(this.eggDropping){
      this.time = (t - this.initialTime) / 1000;
      this.y += -1 / 2 * this.time * this.time;
      this.land();
    }

  }

  resetPosition() {
    this.x = 0;
    this.y = -20;
    this.z = 0;
  }

  display(scaleFactor) {
    this.texture.apply();
    this.scene.scale(1, 1, 1.25);
    this.scene.scale(scaleFactor, scaleFactor, scaleFactor);
    this.sphere.display();
  }

  displayInBird(scaleFactor) {
    this.texture.apply();
    this.scene.scale(1, 1.25, 1);
    this.scene.scale(scaleFactor, scaleFactor, scaleFactor);
    this.sphere.display();
  }
}
