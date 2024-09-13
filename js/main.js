import '../scss/style.scss';

import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import Environment from './Environment.js';
import RigidBody from './RigidBody.js';

const clock = new THREE.Clock();
const env = new Environment();

// Objetos
const sphere = new RigidBody(
    new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshToonMaterial({
            color: 0xe5dfc7,
        })
    ),
    new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(-2, 6, 3),
        shape: new CANNON.Sphere(1),
    })
);

env.addBody(sphere);

// Luces
const ambientLight = new THREE.AmbientLight('#ffffff', 0.2);
const directionalLight = new THREE.DirectionalLight('#ffffff', 2.5);
const directinalLightHelper = new THREE.DirectionalLightHelper(
    directionalLight
);

directionalLight.position.x = 3;
directionalLight.position.y = 5;
directionalLight.position.z = 2;

env.addLight(ambientLight);
env.addLight(directionalLight);
env.addLight(directinalLightHelper);

if (env.debug.isDebugging()) {
    const lightDirectionalGUIFolder =
        env.debug.gui.addFolder('Directional Light');
    const lightDirectionalPositionGUIFolder =
        lightDirectionalGUIFolder.addFolder('Position');

    lightDirectionalGUIFolder.add(directionalLight, 'intensity').min(0).max(10);
    lightDirectionalGUIFolder.addColor(directionalLight, 'color');
    lightDirectionalPositionGUIFolder
        .add(directionalLight.position, 'x')
        .min(-10)
        .max(10);
    lightDirectionalPositionGUIFolder
        .add(directionalLight.position, 'y')
        .min(-10)
        .max(10);
    lightDirectionalPositionGUIFolder
        .add(directionalLight.position, 'x')
        .min(-10)
        .max(10);
}

let deltaTime = 0;
let lastTime = 0;

const renderLoop = () => {
    const currentTime = clock.getElapsedTime();
    deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    env.update(deltaTime);
    sphere.update();
    window.requestAnimationFrame(renderLoop);
};

renderLoop();
