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

        // Накапливаемые углы для орбиты и самовращения
        this.selfAngle = 0;
        this.orbitAngle = 0;
        this.moonAngle = 0;
    }

    update(deltaTime, isPaused) {
        if (isPaused) return;

        const orbitCenter = this.config.orbitCenter || { x: 0, y: this.startPosition.y, z: 0 };
        const orbitRadius = this.config.orbitRadius || 0;
        const orbitSpeed = this.config.orbitSpeed || 0;
        const selfRotationSpeed = this.config.selfRotationSpeed || 0.35;

        // Накапливаем углы
        this.selfAngle += deltaTime * selfRotationSpeed;
        this.mesh.rotation.y = this.selfAngle;

        // Спутник
        if (this.moonPivot && this.config.moon) {
            this.moonAngle += deltaTime * this.config.moon.orbitSpeed;
            this.moonPivot.rotation.y = this.moonAngle;
        }

        // Орбита
        if (orbitRadius > 0) {
            this.orbitAngle += deltaTime * orbitSpeed;
            this.mesh.position.x = orbitCenter.x + Math.cos(this.orbitAngle) * orbitRadius;
            this.mesh.position.z = orbitCenter.z + Math.sin(this.orbitAngle) * orbitRadius;
            this.mesh.position.y = orbitCenter.y;
        }
    }

    reset() {
        this.selfAngle = 0;
        this.orbitAngle = 0;
        this.moonAngle = 0;

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
