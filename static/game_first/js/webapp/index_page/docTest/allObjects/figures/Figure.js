// index_page/docTest/objects/figures/Figure.js
'use strict';


export class Figure {
    constructor(options) {
        this.config = options.config;
        this.mesh = options.mesh;
    }

    update(time, ndx, isPaused) {
        if (isPaused) return;

        const speed = 1 + ndx * 0.1;
        const rot = time * speed;

        this.mesh.rotation.x = rot;
        this.mesh.rotation.y = rot;
    }

    reset() {
        this.mesh.rotation.x = 0;
        this.mesh.rotation.y = 0;
    }
}
