import { CGFobject } from '../lib/CGF.js';

/**
 * MyPlane
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Value for the radius of the circle
 * @param slices - Number of divisions around the circle
 */
export class MyBase extends CGFobject {
  constructor(scene, radius, slices) {
    super(scene);

    this.radius = radius;
    this.slices = slices;

    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    let angleInc = (2 * Math.PI) / this.slices;
    let centerX = 0;
    let centerY = 0;

    this.vertices.push(centerX, centerY, 0);

    for (let i = 0; i <= this.slices; i++) {
      let x = centerX + this.radius * Math.cos(i * angleInc);
      let y = centerY + this.radius * Math.sin(i * angleInc);

      this.vertices.push(x, y, 0);

      this.normals.push(0, 0, 1);
      this.texCoords.push(x / this.radius / 2 + 0.5, y / this.radius / 2 + 0.5);
    }

    for (let i = 1; i <= this.slices; i++) {
      let first = i;
      let second = i + 1;

      this.indices.push(0, first, second);
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
