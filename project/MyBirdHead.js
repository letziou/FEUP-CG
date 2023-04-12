import { CGFappearance ,CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
/**
 * MyBirdHead
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions around the Y axis
 * @param radius - scale of sphere
 * @param inverted - flag indicating whether to invert the faces of sphere
 */
export class MyBirdHead extends CGFobject {
	constructor(scene, slices, stacks, radius, inverted) {
		super(scene);
		
    this.sphere = new MySphere(scene, slices, stacks, radius, inverted);

    this.initMaterials(scene);
	}
	
	initMaterials(scene){
      // Blue color
      this.blue = new CGFappearance(scene);
      this.blue.setAmbient(0.1,0.1,0.1,1.0);
      this.blue.setDiffuse(0,0.749*0.7,0.7,1.0);
      this.blue.setSpecular(1,1,1,1.0);
      this.blue.setShininess(10.0);
  }

  display(){
    this.blue.apply();
    this.sphere.display();
  }
}

