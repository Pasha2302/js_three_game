// index_page/docTest/allObjects/spaceObjects/objects.js
'use strict';


export class SpaceObject {
    
    constructor(options) {
        this.config = options.config;
        this.mesh = options.mesh;
        this.moon = options.moon || null;
        this.moonPivot = options.moonPivot || null;
        this.startPosition = {
            x: this.mesh.position.x,
            y: this.mesh.position.y,
            z: this.mesh.position.z,
        };

        // Небольшой наклон оси сразу делает планету визуально интереснее.
        this.mesh.rotation.x = this.config.tiltX || 0;
    }

    update(time, isPaused) {
        if (isPaused) return;

        const orbitCenter = this.config.orbitCenter || { x: 0, y: this.startPosition.y, z: 0 };
        const orbitRadius = this.config.orbitRadius || 0;
        const orbitSpeed = this.config.orbitSpeed || 0;
        const selfRotationSpeed = this.config.selfRotationSpeed || 0.35;

        // Собственное вращение планеты вокруг своей оси.
        this.mesh.rotation.y = time * selfRotationSpeed;

        // Если у планеты есть спутник, крутим его отдельным pivot-объектом.
        if (this.moonPivot && this.config.moon) {
            this.moonPivot.rotation.y = time * this.config.moon.orbitSpeed;
        }

        // Простая круговая орбита вокруг центра.
        if (orbitRadius > 0) {
            const angle = time * orbitSpeed;
            this.mesh.position.x = orbitCenter.x + Math.cos(angle) * orbitRadius;
            this.mesh.position.z = orbitCenter.z + Math.sin(angle) * orbitRadius;
            this.mesh.position.y = orbitCenter.y;
        }
    }

    reset() {
        this.mesh.rotation.x = this.config.tiltX || 0;
        this.mesh.rotation.y = 0;
        if (this.moonPivot) {
            this.moonPivot.rotation.y = 0;
        }
        this.mesh.position.set(
            this.startPosition.x,
            this.startPosition.y,
            this.startPosition.z,
        );
    }
}
