// index_page/game/core/setupWorld.js
import * as THREE from 'three';


export function setupWorld(scene, worldConfig) {
    const ambientLight = new THREE.AmbientLight(0xffffff, worldConfig.ambientLight);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, worldConfig.directionalLight);
    directionalLight.position.set(5, 10, 4);
    scene.add(directionalLight);

    const floorGeometry = new THREE.PlaneGeometry(worldConfig.floorSize, worldConfig.floorSize);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x132338,
        metalness: 0.15,
        roughness: 0.88,
    });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.5;
    scene.add(floor);

    const grid = new THREE.GridHelper(worldConfig.floorSize, worldConfig.floorSize, 0x2d8fa8, 0x163245);
    grid.position.y = -1.49;
    scene.add(grid);
}
