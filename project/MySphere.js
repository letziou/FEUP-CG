import {CGFobject} from '../lib/CGF.js';
/**
* MySphere
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions ajg the Y axis
 * @param radius - scale of sphere that functions as radius
 * @param inverted - Flag indicating whether to invert the faces of sphere
*/
export class MySphere extends CGFobject {
  constructor(scene, slices, stacks, radius, inverted) {
      super(scene);

      this.stacks = stacks * 2;
      this.slices = slices;

      this.radius = radius;
      
      this.inverted = inverted;

      this.initBuffers();
  }

  /**
   * @method initBuffers
   * Initializes the sphere buffers
   */
  initBuffers() {
      this.vertices = [];
      this.indices = [];
      this.normals = [];
      this.texCoords = [];

      var sliVertice = this.slices + 1;

      const minS = 0;
      const maxS = 1;
      const minT = 0;
      const maxT = 1;
      const incS = (maxS - minS) / this.slices;
      const incT = (maxT - minT) / this.stacks;

      for (let i = 0; i <= this.stacks; i++) {
          const el = Math.PI * i/this.stacks;
          for (let j = 0; j <= this.slices; j++) {
              const az = 2 * Math.PI * j/this.slices;

              //--- Vertices coordinates
              var x = this.radius * Math.sin(el) * Math.cos(+az);
              var y = this.radius * Math.cos(el);
              var z = this.radius * Math.sin(el) * Math.sin(-az);
              this.vertices.push(x, y, z);

              //--- Normals
              const a = this.radius;
              const b = this.radius;
              const c = this.radius;
              let n = {
                  x: x/(a*a),
                  y: y/(b*b),
                  z: z/(c*c)
              };
              if (this.inverted) {
                n.x *= -1;
                n.y *= -1;
                n.z *= -1;
              }
              let r = Math.sqrt(n.x*n.x + n.y*n.y + n.z*n.z)
              this.normals.push(n.x/r, n.y/r, n.z/r);

              //--- Texture coordinates
              this.texCoords.push(minS + j * incS, minT + i * incT);

              //--- Indices
              if (i < this.stacks && j < this.slices) {
                  var current = i * sliVertice + j;
                  var next = current + sliVertice;
                  // pushing two triangles using indices from this round (current, current+1)
                  // and the ones directly south (next, next+1)
                  // (i.e. one full round of slices ahead)
                  
                  if(this.inverted) {
                    this.indices.push(current, current + 1, next);
                    this.indices.push(next, current + 1, next + 1);
                  }
                  else {
                    this.indices.push(current + 1, current, next);
                    this.indices.push(current + 1, next, next + 1);
                  }
              }
          }
      }

      this.primitiveType = this.scene.gl.TRIANGLES;
      this.initGLBuffers();
  }
}