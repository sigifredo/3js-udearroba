import { OrbitControls } from 'three/examples/jsm/Addons.js';
import '../scss/style.scss';
import * as THREE from 'three';

// configurar canvas
const canvas = document.getElementById('canvas');

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
const controls = new OrbitControls(camera, canvas);

renderer.setClearColor('#0f0f0f');
renderer.setSize(window.innerWidth, window.innerHeight);

scene.add(camera);
renderer.render(scene, camera);

camera.position.x = -3;
camera.position.z = 3;
camera.position.y = 3;

// configurar los controles
controls.enabled = true;
controls.enableDamping = true;

// agregar cubos
const cuboMaterial = new THREE.MeshStandardMaterial({
    color: '#ff0000',
});

const cubos = [];
const g = new THREE.Group();

for (let i = 0; i < 15; i++) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const mesh = new THREE.Mesh(geometry, cuboMaterial);

    cubos.push(mesh);
    g.add(mesh);
}

scene.add(g);

const ambientLight = new THREE.AmbientLight('#ffffff', 1);
const directionalLight = new THREE.DirectionalLight('#ffffff', 1);

const axes = new THREE.AxesHelper(2);

directionalLight.position.y = 5;
directionalLight.position.z = 2;

scene.add(axes);
scene.add(ambientLight);
scene.add(directionalLight);

let time = 0;

const render = () => {

    cubos.forEach((cubo, i) => {
        cubo.position.x = 10 * Math.sin((time - i * cubos.length * 2) * 0.01);
        cubo.position.z = 10 * Math.cos((time - i * cubos.length * 2) * 0.01);
        cubo.rotateX(0.005 * i);
    });
    g.rotateZ(0.01);

    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
    time++;
};

render();
