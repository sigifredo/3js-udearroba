import * as THREE from 'three';
import CannonDebugger from 'cannon-es-debugger';
import GUI from 'lil-gui';
import Stats from 'three/examples/jsm/libs/stats.module';

export class Debug {
    constructor(env) {
        if (this.isDebugging()) {
            this.gui = new GUI();
            this.stats = new Stats();

            env.add(new THREE.AxesHelper(2));
            document.body.appendChild(this.stats.dom);

            this.cannonDebugger = new CannonDebugger(
                env.scene,
                env.physicsWorld,
                {
                    color: 0x00ff00,
                }
            );
        } else {
            this.gui = null;
            this.stats = null;
        }
    }

    isDebugging() {
        // return window.location.hash === 'debug';
        return true;
    }

    update() {
        if (this.isDebugging()) {
            this.stats.update();
        }
    }
}

export default Debug;
