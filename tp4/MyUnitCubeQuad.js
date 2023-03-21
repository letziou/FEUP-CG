import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

export class MyUnitCubeQuad extends CGFobject{
  constructor(scene, top, side, bottom) {
    super(scene);
    this.scene = scene;
    this.face = new MyQuad(scene);
    this.top = top;
    this.side = side;
    this.bottom = bottom;

    this.initMaterials(scene, top, side, bottom);
}

initMaterials(scene, top, side, bottom){

  this.topTexture = new CGFappearance(scene);
  this.topTexture.setAmbient(0.1, 0.1, 0.1, 1);
  this.topTexture.setDiffuse(0.9, 0.9, 0.9, 1);
  this.topTexture.setSpecular(0.1, 0.1, 0.1, 1);
  this.topTexture.setShininess(10.0);
  this.topTexture.loadTexture(top);
  this.topTexture.setTextureWrap('REPEAT', 'REPEAT');

  this.midTexture = new CGFappearance(scene);
  this.midTexture.setAmbient(0.1, 0.1, 0.1, 1);
  this.midTexture.setDiffuse(0.9, 0.9, 0.9, 1);
  this.midTexture.setSpecular(0.1, 0.1, 0.1, 1);
  this.midTexture.setShininess(10.0);
  this.midTexture.loadTexture(side);
  this.midTexture.setTextureWrap('REPEAT', 'REPEAT');

  this.bottomTexture = new CGFappearance(scene);
  this.bottomTexture.setAmbient(0.1, 0.1, 0.1, 1);
  this.bottomTexture.setDiffuse(0.9, 0.9, 0.9, 1);
  this.bottomTexture.setSpecular(0.1, 0.1, 0.1, 1);
  this.bottomTexture.setShininess(10.0);
  this.bottomTexture.loadTexture(bottom);
  this.bottomTexture.setTextureWrap('REPEAT', 'REPEAT');

}

display() {

  this.scene.pushMatrix();
  this.topTexture.apply();
  if (!this.scene.linear)
      this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
  else
      this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);

  // top side
  this.scene.pushMatrix();
  this.scene.scale(1, 1, 1);
  this.scene.translate(0, .5, 0);
  this.scene.rotate(-Math.PI/2, 1, 0, 0);
  this.face.display();
  this.scene.popMatrix();

  this.midTexture.apply();
  if (!this.scene.linear)
      this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
  else
      this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);

  // right side
  this.scene.pushMatrix();
  this.scene.scale(1, 1, 1);
  this.scene.translate(.5, 0, 0);
  this.scene.rotate(Math.PI/2, 0, 1, 0);
  this.face.display();
  this.scene.popMatrix();

  // left side
  this.scene.pushMatrix();
  this.scene.scale(1, 1, 1);
  this.scene.translate(-.5, 0, 0);
  this.scene.rotate(-Math.PI/2, 0, 1, 0);
  this.face.display();
  this.scene.popMatrix();

  // front side
  this.scene.pushMatrix();
  this.scene.scale(1, 1, 1);
  this.scene.translate(0, 0, .5);
  this.scene.rotate(0, 0, 1, 0);
  this.face.display();
  this.scene.popMatrix();

  // back side
  this.scene.pushMatrix();
  this.scene.scale(1, 1, 1);
  this.scene.translate(0, 0, -.5);
  this.scene.rotate(Math.PI, 0, 1, 0);
  this.face.display();
  this.scene.popMatrix();

  this.bottomTexture.apply();
  if (!this.scene.linear)
      this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
  else
      this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);

  // down side
  this.scene.pushMatrix();
  this.scene.scale(1, 1, 1);
  this.scene.translate(0, -.5, 0);
  this.scene.rotate(Math.PI/2, 1, 0, 0);
  this.face.display();
  this.scene.popMatrix();
  }
}
