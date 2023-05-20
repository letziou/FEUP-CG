
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
        this.wingRotation = 0;

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

        this.downSpeed = 2;
        this.upSpeed = 0.5;

        this.birdMovingDown = false;
        this.birdMovingUp = false;
        this.initialTime = 0;
    }

    turn(val) {
        if (val == 1) {
            this.rotation += Math.PI / 45 * this.rotationSpeed;
            this.tailRotation = Math.max(this.tailRotation - 0.05, -0.5);
            this.headRotation = Math.min(this.headRotation + 0.05, -0.2);
        }

        if (val == -1) {
            this.rotation -= Math.PI / 45 * this.rotationSpeed;
            this.tailRotation = Math.min(this.tailRotation + 0.05, 0.5);
            this.headRotation = Math.max(this.headRotation - 0.05, 0.2);
        }
    }

    accelerate(val, speedFactor) {
        if(val == 1){
        this.moveSpeed += this.acceleration * speedFactor;
            if (this.moveSpeed > this.maxMoveSpeed * speedFactor) {
                this.moveSpeed = this.maxMoveSpeed * speedFactor;
            }
        }

        if(val == 0){
        this.moveSpeed -= this.deceleration * speedFactor;
            if (this.moveSpeed < this.minMoveSpeed) {
                this.moveSpeed = this.minMoveSpeed;
            }
        }

        if (val == 1) {
            this.wingRotation = Math.min(this.wingRotation + 0.05, 0.5);
        } else if (val == 0) {
            this.wingRotation = Math.max(this.wingRotation - 0.05, -0.5);
        }
    }

    down() {
        this.birdMovingDown = true;
    }

    bottom() {
        if(this.y <= -72){
            this.birdMovingDown = false;
            this.birdMovingUp = true;
        }
    }

    top() {
        if(this.y >= -0.1){
            this.birdMovingUp = false;
            this.scene.birdStop();
        }
    }

    update(t, speedFactor) {
        var val; 
        this.sineWaveTime += 0.05 * (2 + this.moveSpeed);

        if(this.moveSpeed == 0){
            this.wingAngle = 0.3 * Math.sin(this.sineWaveTime * 6);
        }else{
            this.wingAngle = 0.3 * Math.sin(this.sineWaveTime / this.moveSpeed); // arranjar movespeed para que quanto menos for, mair a frequencia do bater de asas
        }
        
        if (this.scene.gui.isKeyPressed("KeyW")) {
            val = 1;
            this.accelerate(val, speedFactor);
            this.wingAngle = 0.3 * Math.sin(this.sineWaveTime * 5);
        }
    
        if (this.scene.gui.isKeyPressed("KeyS")) {
            val = 0;
            this.accelerate(val, speedFactor);
            this.wingAngle = 0.3 * Math.sin(this.sineWaveTime * 5);
        }
    
        if (this.scene.gui.isKeyPressed("KeyA")) {
            val = 1;
            this.turn(val);
        } else {
            this.tailRotation *= 0.9;
            this.headRotation *= 0.9;
        }
    
        if (this.scene.gui.isKeyPressed("KeyD")) {
            val = -1;
            this.turn(val);
        } else {
            this.tailRotation *= 0.9;
            this.headRotation *= 0.9;
        }

        this.x += this.moveSpeed * Math.sin(this.rotation);
        this.z += this.moveSpeed * Math.cos(this.rotation);
        this.y += 0.05 * Math.sin(this.sineWaveTime);

        if (!this.scene.gui.isKeyPressed("KeyW") && !this.scene.gui.isKeyPressed("KeyS")) {
            if (this.wingRotation > 0) {
                this.wingRotation = Math.max(this.wingRotation - 0.05, 0);
            } else if (this.wingRotation < 0) {
                this.wingRotation = Math.min(this.wingRotation + 0.05, 0);
            }
        }

        if(!this.birdMovingDown && !this.birdMovingUp)
            this.initialTime = t;

        if (this.birdMovingDown) {
            this.time = (t - this.initialTime) / 1000;
            this.x += this.moveSpeed * Math.sin(this.rotation);
            this.y += -1 / 2 * this.downSpeed * this.time * this.time ;
            this.z += this.moveSpeed * Math.sin(this.rotation);
            this.bottom();
        }

        if (this.birdMovingUp) {
            this.time = (t - this.initialTime) / 1000;
            this.x += this.moveSpeed * Math.sin(this.rotation);
            this.y += 1 / 2 * this.upSpeed * this.time * this.time ;
            this.z += this.moveSpeed * Math.sin(this.rotation);
            this.top();
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

        this.imgFeather1 = 'images/feather.jpg';
        this.feather1 = new CGFappearance(scene);
        this.feather1.setAmbient(0.1, 0.1, 0.1, 1);
        this.feather1.setDiffuse(0.9, 0.9, 0.9, 1);
        this.feather1.setSpecular(0.1, 0.1, 0.1, 1);
        this.feather1.setShininess(10.0);
        this.feather1.loadTexture(this.imgFeather1);
        this.feather1.setTextureWrap('REPEAT', 'REPEAT');

        this.imgFeather2 = 'images/feather2.jpg'
        this.feather2 = new CGFappearance(scene);
        this.feather2.setAmbient(0.1, 0.1, 0.1, 1);
        this.feather2.setDiffuse(0.9, 0.9, 0.9, 1);
        this.feather2.setSpecular(0.1, 0.1, 0.1, 1);
        this.feather2.setShininess(10.0);
        this.feather2.loadTexture(this.imgFeather2);
        this.feather2.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        //Head
        this.scene.pushMatrix();
        this.scene.translate(0, .4, 1);
        this.scene.scale(.8, .8, .8);
        this.scene.rotate(this.headRotation, 0, 0, 1);
        this.feather1.apply();
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
        this.feather2.apply();
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
        this.feather1.apply();
        this.birdhead.display();
        this.scene.popMatrix();

        //Tail
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.scene.scale(.9, .5, .9);
        this.feather2.apply();
        this.birdbodytail.display();
        this.scene.popMatrix();

        //wing Left
        this.scene.pushMatrix();
        this.scene.rotate(this.wingAngle, 0, 0, 1); // Apply the wing angle rotation
        this.scene.rotate(this.wingRotation, 1, 0, 0); // Apply the wing rotation
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.scene.rotate(Math.PI/8, 0, -1, 0);
        this.scene.translate(0, -.5, .3);
        this.scene.scale(.5, .5, 0);
        this.feather1.apply();
        this.birdwing.display();
        this.scene.popMatrix();
        //Tip
        this.scene.pushMatrix();
        this.scene.rotate(this.wingAngle, 0, 0, 1); // Apply the wing angle rotation
        this.scene.rotate(this.wingRotation, 1, 0, 0); // Apply the wing rotation
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(-1.8, -.5, -.658);
        this.scene.scale(.5, .5, 0);
        this.feather1.apply();
        this.birdwing.display();
        this.scene.popMatrix();
        
        //wing Right
        this.scene.pushMatrix();
        this.scene.rotate(-this.wingAngle, 0, 0, 1); // Apply the wing angle rotation with the opposite sign
        this.scene.rotate(this.wingRotation, 1, 0, 0); // Apply the wing rotation
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.scene.rotate(Math.PI/8, 0, 1, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(0, -.5, -.3);
        this.scene.scale(.5, .5, 0);
        this.feather1.apply();
        this.birdwing.display();
        this.scene.popMatrix();
        //Tip
        this.scene.pushMatrix();
        this.scene.rotate(-this.wingAngle, 0, 0, 1); // Apply the wing angle rotation with the opposite sign
        this.scene.rotate(this.wingRotation, 1, 0, 0); // Apply the wing rotation
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.scene.translate(-1.8, -.5, .658);
        this.scene.scale(.5, .5, 0);
        this.feather2.apply();
        this.birdwing.display();
        this.scene.popMatrix();

        //tail tail
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(this.tailRotation, 0, 1, 0);
        this.scene.scale(0.5, 0.5, 0);
        this.scene.translate(0, -2, 0);
        this.feather1.apply();
        this.birdtail.display();
        this.scene.popMatrix();
    }
}