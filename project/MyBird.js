
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

        this.elapsedTime = 0;
        this.sineWaveTime = 0;
        this.wingAngle = 0;
        this.tailRotation = 0;
        this.headRotation = 0;

        this.scene = scene;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.rotation = 0;

        this.moveSpeed = 0;
        this.rotationSpeed = 1;
        this.minMoveSpeed = 0;
        this.maxMoveSpeed = 0.5;
        this.acceleration = 0.005;
        this.deceleration = 0.005;

        this.verticalMoveSpeed = 0;
        this.maxVerticalMoveSpeed = 0.2;
    }

    update() {
        if (this.scene.gui.isKeyPressed("KeyW")) {
            this.moveSpeed += this.acceleration;
            if (this.moveSpeed > this.maxMoveSpeed) {
                this.moveSpeed = this.maxMoveSpeed;
            }
        }
    
        if (this.scene.gui.isKeyPressed("KeyS")) {
            this.moveSpeed -= this.deceleration;
            if (this.moveSpeed < this.minMoveSpeed) {
                this.moveSpeed = this.minMoveSpeed;
            }
        }
    
        if (this.scene.gui.isKeyPressed("KeyA")) {
            this.rotation += Math.PI / 45 * this.rotationSpeed;
            this.tailRotation = Math.max(this.tailRotation - 0.05, -0.5);
            this.headRotation = Math.min(this.headRotation + 0.05, -0.2);
        } else {
            this.tailRotation *= 0.9;
            this.headRotation *= 0.9;
        }
    
        if (this.scene.gui.isKeyPressed("KeyD")) {
            this.rotation -= Math.PI / 45 * this.rotationSpeed;
            this.tailRotation = Math.min(this.tailRotation + 0.05, 0.5);
            this.headRotation = Math.max(this.headRotation - 0.05, 0.2);
        } else {
            this.tailRotation *= 0.9;
            this.headRotation *= 0.9;
        }
        
        this.x += this.moveSpeed * Math.sin(this.rotation);
        this.z += this.moveSpeed * Math.cos(this.rotation);
        this.y += 0.05 * Math.sin(this.sineWaveTime);

        this.sineWaveTime += 0.05 * (2 + this.moveSpeed);

        if(this.moveSpeed > 0){
            this.wingAngle = -0.3 * Math.sin(this.moveSpeed * this.sineWaveTime);
            console.log('wing: ' + this.moveSpeed);
        }else{
            this.wingAngle = 0.3 * Math.sin(this.sineWaveTime);
        }
    }

    resetPosition() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.rotation = 0;
        this.moveSpeed = 0;
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
        
        this.black = new CGFappearance(scene);
        this.black.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.black.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.black.setSpecular(0.0, 0.0, 0.0, 1.0);
        this.black.setShininess(1.0);
    }

    display() {
        //Head
        this.scene.pushMatrix();
        this.scene.translate(0, .4, 1);
        this.scene.scale(.8, .8, .8);
        this.scene.rotate(this.headRotation, 0, 0, 1);
        this.red.apply();
        this.birdhead.display();
        this.scene.popMatrix();

        //Eyes
        this.scene.pushMatrix();
        this.scene.translate(.23, .7, 1.1);
        this.scene.scale(.1, .1, .1);
        this.scene.rotate(this.headRotation, 0, 0, 1);
        this.black.apply();
        this.birdhead.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-.23, .7, 1.1);
        this.scene.scale(.1, .1, .1);
        this.scene.rotate(this.headRotation, 0, 0, 1);
        this.black.apply();
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
        this.scene.rotate(this.headRotation, 0, 0, 1);
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
        this.scene.rotate(this.wingAngle, 0, 0, 1); // Apply the wing angle rotation
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.scene.rotate(Math.PI/8, 0, -1, 0);
        this.scene.translate(0, -.5, .3);
        this.scene.scale(.5, .5, 0);
        this.red.apply();
        this.birdwing.display();
        this.scene.popMatrix();
        //Tip
        this.scene.pushMatrix();
        this.scene.rotate(this.wingAngle, 0, 0, 1); // Apply the wing angle rotation
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(-1.8, -.5, -.658);
        this.scene.scale(.5, .5, 0);
        this.red.apply();
        this.birdwing.display();
        this.scene.popMatrix();
        
        //wing Right
        this.scene.pushMatrix();
        this.scene.rotate(-this.wingAngle, 0, 0, 1); // Apply the wing angle rotation with the opposite sign
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
        this.scene.rotate(-this.wingAngle, 0, 0, 1); // Apply the wing angle rotation with the opposite sign
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.scene.translate(-1.8, -.5, .658);
        this.scene.scale(.5, .5, 0);
        this.red.apply();
        this.birdwing.display();
        this.scene.popMatrix();

        //tail tail
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(this.tailRotation, 0, 1, 0);
        this.scene.scale(0.5, 0.5, 0);
        this.scene.translate(0, -2, 0);
        this.red.apply();
        this.birdtail.display();
        this.scene.popMatrix();
    }
}