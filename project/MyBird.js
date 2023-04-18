
import {CGFobject} from '../lib/CGF.js';
import { MyBirdBody } from "./MyBirdBody.js";
import { MyBirdBodyTail } from "./MyBirdBodyTail.js";
import { MyBirdHead } from "./MyBirdHead.js";
import { MyBirdWing } from "./MyBirdWing.js";

export class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.birdhead = new MyBirdHead(scene, 50, 25, .5, false);
        this.birdbody = new MyBirdBody(scene, 20, 20);
        this.birdbodytail = new MyBirdBodyTail(scene, 1000, 20);
        this.birdwing = new MyBirdWing(scene);

    }

    display() {
        //Head
        this.scene.pushMatrix();
        this.scene.translate(0, .5, 1);
        this.birdhead.display();
        this.scene.popMatrix();

        //Neck
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI+Math.PI/2, -1, 0, 0);
        this.scene.translate(0, .5, 0);
        this.scene.scale(1, .2, 1);
        this.birdbodytail.display();
        this.scene.popMatrix();

        //Beak
        this.scene.pushMatrix();
        this.scene.translate(0, .5, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(.4, .4, .4);
        this.birdbodytail.display();
        this.scene.popMatrix();

        //Body
        this.scene.pushMatrix();
        this.birdbody.display();
        this.scene.popMatrix();

        //Tail
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.scene.scale(1, .5, 1);
        this.birdbodytail.display();
        this.scene.popMatrix();
        
        //wing Left
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.scene.scale(.5, .5, 0);
        this.scene.translate(.5, -.5, 0);
        this.birdwing.display();
        this.scene.popMatrix();

        //wing Right
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(.5, .5, 0);
        this.scene.translate(.5, -.5, 0);
        this.birdwing.display();
        this.scene.popMatrix();

    }
}