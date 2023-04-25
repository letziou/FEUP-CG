
import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyBirdBody } from "./MyBirdBody.js";
import { MyBirdBodyTail } from "./MyBirdBodyTail.js";
import { MyBirdHead } from "./MyBirdHead.js";
import { MyBirdWing } from "./MyBirdWing.js";
import { MyBirdTail } from "./MyBirdTail.js";

export class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.birdhead = new MyBirdHead(scene, 50, 25, .5, false);
        this.birdbody = new MyBirdBody(scene, 20, 20);
        this.birdbodytail = new MyBirdBodyTail(scene, 1000, 20);
        this.birdwing = new MyBirdWing(scene);
        this.birdtail = new MyBirdTail(scene);

        this.initMaterials(scene);

    }

    initMaterials(scene){
        this.red = new CGFappearance(scene);
        this.red.setAmbient(0.5,0.5,0.5,1.0);
        this.red.setDiffuse(0.7,0,0,1.0);
        this.red.setSpecular(0.4,0.4,0.4,0);
        this.red.setShininess(10.0);

        this.yellow = new CGFappearance(scene);
        this.yellow.setAmbient(0.1,0.1,0.1,1.0);
        this.yellow.setDiffuse(0.7,0.7,0,1.0);
        this.yellow.setSpecular(.6,.6,.6,0);
        this.yellow.setShininess(10.0);
    }

    display() {
        //Head
        this.scene.pushMatrix();
        this.scene.translate(0, .4, 1);
        this.scene.scale(.8, .8, .8);
        this.red.apply();
        this.birdhead.display();
        this.scene.popMatrix();

        //Eyes
        this.scene.pushMatrix();
        this.scene.translate(.23, .7, 1.1);
        this.scene.scale(.1, .1, .1);
        this.red.apply();
        this.birdhead.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-.23, .7, 1.1);
        this.scene.scale(.1, .1, .1);
        this.red.apply();
        this.birdhead.display();
        this.scene.popMatrix();

        //Neck
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI+Math.PI/2, -1, 0, 0);
        this.scene.translate(0, .5, 0);
        this.scene.scale(.816, .2, .816);
        this.red.apply();
        this.birdbodytail.display();
        this.scene.popMatrix();

        //Beak
        this.scene.pushMatrix();
        this.scene.translate(0, .5, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(.4, .4, .4);
        this.yellow.apply();
        this.birdbodytail.display();
        this.scene.popMatrix();

        //Body
        this.scene.pushMatrix();
        this.scene.translate(0, 0, .2);
        this.red.apply();
        this.birdhead.display();
        this.scene.popMatrix();

        //Tail
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.scene.scale(.9, .5, .9);
        this.red.apply();
        this.birdbodytail.display();
        this.scene.popMatrix();

        //wing Left
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.scene.rotate(Math.PI/8, 0, -1, 0);
        this.scene.translate(0, -.5, .3);
        this.scene.scale(.5, .5, 0);
        this.red.apply();
        this.birdwing.display();
        this.scene.popMatrix();
        //Tip
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(-1.8, -.5, -.658);
        this.scene.scale(.5, .5, 0);
        this.red.apply();
        this.birdwing.display();
        this.scene.popMatrix();
        
        //wing Right
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.scene.rotate(Math.PI/8, 0, 1, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(0, -.5, -.3);
        this.scene.scale(.5, .5, 0);
        this.red.apply();
        this.birdwing.display();
        this.scene.popMatrix();
        //Tip
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.scene.translate(-1.8, -.5, .658);
        this.scene.scale(.5, .5, 0);
        this.red.apply();
        this.birdwing.display();
        this.scene.popMatrix();

        //tail tail
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(.5, .5, 0);
        this.scene.translate(0, -2, 0);
        this.red.apply();
        this.birdtail.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.birdhead.enableNormalViz(); 
        this.birdbody.enableNormalViz();
        this.birdbodytail.enableNormalViz();
        this.birdwing.enableNormalViz(); 
        this.birdtail.enableNormalViz();
    }
  
    disableNormalViz() {
        this.birdhead.disableNormalViz();
        this.birdbody.disableNormalViz();
        this.birdbodytail.disableNormalViz();
        this.birdwing.disableNormalViz();
        this.birdtail.disableNormalViz();
    }
}