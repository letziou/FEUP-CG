import {CGFobject} from '../lib/CGF.js';

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param baseRadius - Value for the radius of the cilinder's base
 * @param topRadius - Value for the radius of the cilinder's top
 * @param height - Value of height
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions ajg the Y axis
 */
export class MyCylinder extends CGFobject {
  constructor(scene, baseRadius, topRadius, height, slices, stacks) {
    super(scene);

    this.baseRadius = baseRadius;
    this.topRadius = topRadius;
    this.height = height;
    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];
  
    let radiusDiff = this.topRadius - this.baseRadius;
    let heightInc = this.height / this.stacks;
    let radiusInc = radiusDiff / this.stacks;
    let angleInc = 2 * Math.PI / this.slices;
  
    for (let i = 0; i <= this.stacks; i++) {
      let h = heightInc * i;
      let r = this.baseRadius + i * radiusInc;
  
      for (let j = 0; j <= this.slices; j++) {
        let x = r * Math.cos(j * angleInc);
        let y = r * Math.sin(j * angleInc);
        let z = h;
  
        this.vertices.push(x, y, z);
  
        let nx = Math.cos(j * angleInc);
        let ny = Math.sin(j * angleInc);
        let nz = radiusDiff / this.height;
  
        let length = Math.sqrt(nx * nx + ny * ny + nz * nz);
        this.normals.push(nx / length, ny / length, nz / length);
  
        this.texCoords.push(j / this.slices, i / this.stacks);
      }
    }
  
    // Outer surface normals and texture coordinates
    for (let i = 0; i <= this.stacks; i++) {
      let h = heightInc * i;
      let r = this.baseRadius + i * radiusInc;
      let texS = 0.5 * r / this.topRadius;
  
      for (let j = 0; j <= this.slices; j++) {
        let x = r * Math.cos(j * angleInc);
        let y = r * Math.sin(j * angleInc);
        let z = h;
  
        this.vertices.push(x, y, z);
  
        let nx = Math.cos(j * angleInc);
        let ny = Math.sin(j * angleInc);
        let nz = 0;
  
        let length = Math.sqrt(nx * nx + ny * ny);
        this.normals.push(nx / length, ny / length, nz);
  
        this.texCoords.push(texS + (j / this.slices) * (1 - texS), i / this.stacks);
      }
    }
  
    let vertIndex = (this.stacks + 1) * (this.slices + 1);
  
    for (let i = 0; i < this.stacks; i++) {
      for (let j = 0; j < this.slices; j++) {
        let first = i * (this.slices + 1) + j;
        let second = first + this.slices + 1;
  
        this.indices.push(first, second, first + 1);
        this.indices.push(second, second + 1, first + 1);
  
        // Outer surface indices
        this.indices.push(vertIndex + first + 1, vertIndex + second, vertIndex + first);
        this.indices.push(vertIndex + first + 1, vertIndex + second + 1, vertIndex + second);
      }
    }
  
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
  
}