// index_page/game/core/createScene.js
import * as THREE from 'three';


export function createScene() {
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x08111d, 12, 28);
    return scene;
}
