// index_page/game/objects/createDemoCube.js
import * as THREE from 'three';


export function createDemoCube(config) {
    const geometry = new THREE.BoxGeometry(config.size, config.size, config.size);
    const material = new THREE.MeshStandardMaterial({
        color: config.color,
        emissive: config.emissive,
        metalness: 0.25,
        roughness: 0.32,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 0.3;

    // Возвращаем объект со стандартным интерфейсом:
    // sceneObject - то, что нужно добавить в сцену
    // update(dt) - логика обновления в игровом цикле
    // reset() - быстрый возврат в начальное состояние
    return {
        id: 'demo-cube',
        sceneObject: mesh,

        update(deltaTime) {
            mesh.rotation.x += config.rotationSpeed.x * deltaTime;
            mesh.rotation.y += config.rotationSpeed.y * deltaTime;
        },

        reset() {
            mesh.rotation.set(0, 0, 0);
            mesh.position.set(0, 0.3, 0);
        },

        destroy() {
            geometry.dispose();
            material.dispose();
        },
    };
}
