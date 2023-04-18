import {CGFobject} from '../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdBody extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    initBuffers() {

        this.vertices =[];
        this.indices=[];
        this.normals=[];

        // Divide the circle by number of slices
        var ang=2*Math.PI/this.slices;
        var scale = 0.5; 


        for(let j =0; j <= this.stacks; j++) {
            for(let i=0; i < this.slices; i++) {
                // duplicate the first vertex in every iteration, and creates the next one
                this.vertices.push(scale*Math.cos(ang *i),scale*Math.sin(ang*i),j*1/this.stacks);
                this.vertices.push(scale*Math.cos((i+1)*ang),scale*Math.sin((i+1)*ang),j*1/this.stacks);

                this.normals.push(Math.cos(ang*i),Math.sin(ang*i),0);
                this.normals.push(Math.cos(ang*i+ang),Math.sin(ang*i+ang),0);
            }
        }

        var totalPoints= this.stacks*this.slices;

        for (let i =0; i < totalPoints; i+=2 ) {
            this.indices.push(i, i+1, i+1+this.slices*2);
            this.indices.push(i, i+1+this.slices*2, i+this.slices*2);
        }
    
        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}