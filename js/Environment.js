import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Debug from './Debug.js';

export class Environment {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
        });
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight
        );
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.debug = new Debug(this);

        // Físicas
        this.physicsWorld = new CANNON.World({
            gravity: new CANNON.Vec3(0, -9.82, 0),
        });

        // 6. Configurar canvas
        this.canvas.id = 'app';
        document.body.prepend(this.canvas);

        // 7. Configurar el renderizador
        this.renderer.setClearColor('#0f0f0f');
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);

        // 9. Configurar la cámara
        this.camera.position.x = -3;
        this.camera.position.y = 3;
        this.camera.position.z = 3;

        const self = this;
        window.addEventListener('resize', () => {
            const canvasSize = {
                width: window.innerWidth,
                height: window.innerHeight,
            };

            self.renderer.setSize(canvasSize.width, canvasSize.height);
            self.camera.aspect = canvasSize.width / canvasSize.height;
            self.camera.updateProjectionMatrix();
        });
    }

    /**
     * Agrega objetos a la escena
     */
    add(obj) {
        this.scene.add(obj);
    }

    /**
     * Agrega cuerpos rígidos a la escena
     */
    addBody(rigidBody) {
        this.scene.add(rigidBody.mesh);
        this.physicsWorld.addBody(rigidBody.collider);
    }

    /**
     * Agrega lices a la escena
     */
    addLight(light) {
        this.scene.add(light);
    }

    update(deltaTime) {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        this.debug.update();
        this.physicsWorld.step(1 / 60, deltaTime, 3);
    }
}

export default Environment;
