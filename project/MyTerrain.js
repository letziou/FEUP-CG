import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture, CGFobject } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";

/**
 * MyTerrain
 * @constructor
 */
export class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.plane = new MyPlane(scene, 20);
        this.heightmap = new CGFtexture(scene, "images/heightmap.jpg");
        this.terrainmap = new CGFtexture(scene, "images/terrain.jpg");
        this.terrainaltimetry = new CGFtexture(scene, "images/altimetry.png");
        this.terrainShader = new CGFshader(scene.gl, "shaders/terrain.vert", "shaders/terrain.frag"); 
    
        // Bind texture units
        this.terrainShader.setUniformsValues({ terrainTex: 0 });
        this.terrainShader.setUniformsValues({ terrainMap: 1 });
        this.terrainShader.setUniformsValues({ terrainAlt: 2 });

    }

    display() {
        
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.terrainShader);
        this.terrainmap.bind(0);
        this.heightmap.bind(1);
        this.terrainaltimetry.bind(2);
        
        this.plane.display();

        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }

    enableNormalViz() {
        this.plane.enableNormalViz();
    }

    disableNormalViz() {
        this.plane.disableNormalViz();
    }
}