// index_page/game/core/createRenderer.js
import * as THREE from 'three';


export function createRenderer(root, rendererConfig) {
    const renderer = new THREE.WebGLRenderer({
        antialias: rendererConfig.antialias,
        alpha: false,
    });

    renderer.setPixelRatio( Math.min(window.devicePixelRatio || 1, 2) );
    renderer.setClearColor(rendererConfig.clearColor);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    root.appendChild(renderer.domElement);
    return renderer;
}
