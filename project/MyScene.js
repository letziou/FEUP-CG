import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./MyBird.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
    this.birdSpeed = 0;
    this.birdPosition = { x: 0, y: 0, z: 0 };
  }

  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.setUpdatePeriod(1000/60);
    this.enableTextures(true);

    //Textures
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture1);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.texture2 = new CGFtexture(this, "images/earth.jpg");
    this.earth = new CGFappearance(this);
    this.earth.setTexture(this.texture2);
    this.earth.setTextureWrap('REPEAT', 'REPEAT');

    this.texture3 = "images/panorama4.jpg";

    this.billboardTextures = [
      new CGFtexture(this, "images/billboardtree1.png"),
      new CGFtexture(this, "images/billboardtree2.png"),
      new CGFtexture(this, "images/billboardtree3.png")
    ];
    this.billboardShader = new CGFshader(this.gl, "billboard.vert", "billboard.frag");

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.panorama = new MyPanorama(this, this.texture3, 50, 25, 200, true);

    this.bird = new MyBird(this);
    
    //this.billboard = new MyBillboard(this, this.billboardTexture);

    this.treeGroupPatch = new MyTreeGroupPatch(this, this.billboardTexture);
    this.treeRowPatch = new MyTreeRowPatch(this, this.billboardTexture);
    
    this.displayAxis = true;
    this.displaySphere = true;
    this.scaleFactor = 1;
    this.speedFactor = 1;

    this.terrain = new MyTerrain(this);
  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Update the camera position
    //this.camera.position = this.camera.getPosition();

    // Draw axis
    if (this.displayAxis) 
      this.axis.display();
  
    this.pushMatrix();
    this.translate(0, -100, 0);
    this.scale(400, 400, 400);
    this.rotate(-Math.PI / 2.0, 1, 0, 0);
    this.terrain.display();
    this.popMatrix();

    // Push new matrix and translate it by the bird position
    this.pushMatrix();
    this.translate(this.birdPosition.x, this.birdPosition.y, this.birdPosition.z);
    this.rotate(this.bird.rotation, 0, 1, 0);
    this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
    this.bird.display();
    this.popMatrix();

    this.pushMatrix();
    this.setActiveShader(this.billboardShader);
    this.treeGroupPatch.display();
    this.setActiveShader(this.defaultShader);
    this.popMatrix();

    this.pushMatrix();
    this.setActiveShader(this.billboardShader);
    this.treeRowPatch.display();
    this.setActiveShader(this.defaultShader);
    this.popMatrix();
    
    // ---- BEGIN Primitive drawing section
    if (this.displaySphere) 
      this.panorama.display();

    this.gl.activeTexture(this.gl.TEXTURE1);


    // ---- END Primitive drawing section
  }

  checkKeys() {
    if (this.gui.isKeyPressed("KeyS")) {
        this.birdSpeed += 0.05 * this.speedFactor;
        if (this.birdSpeed > 0) {
            this.birdSpeed = 0;
        }
    }

    if (this.gui.isKeyPressed("KeyW")) {
        this.birdSpeed -= 0.05 * this.speedFactor;
    }

    if (this.gui.isKeyPressed("KeyR")) {
      this.bird.resetPosition();
    }
  }

  update(t) {
    this.deltaTime = t;
    this.checkKeys();
    this.bird.update();
    
    // Update bird position
    this.birdPosition.x = this.bird.x;
    this.birdPosition.y = this.bird.y;
    this.birdPosition.z = this.bird.z;
  }
}