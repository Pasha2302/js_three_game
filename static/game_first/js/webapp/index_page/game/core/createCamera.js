// index_page/game/core/createCamera.js
import * as THREE from 'three';


export function createCamera(cameraConfig) {
    const camera = new THREE.PerspectiveCamera(
        cameraConfig.fov,
        1,
        cameraConfig.near,
        cameraConfig.far,
    );

    camera.position.set(
        cameraConfig.position.x,
        cameraConfig.position.y,
        cameraConfig.position.z,
    );

    return camera;
}
