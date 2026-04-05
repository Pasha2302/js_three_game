// index_page/docTest/scenes/manager.js
'use strict';
import * as THREE from 'three';
import { CameraConfig, HelperConfig, LightConfig } from '../gameConfigs.js';


export class GameSceneManager {
    constructor() {
        // Все, что вы хотите нарисовать необходимо добавить на сцену.
        this.scene = new THREE.Scene(); // Создание сцены
        this.camera = null;
        this.light = null;
        this.lightHelper = null;
        this.sun = null;
        this.ambientLight = null;

        this.needResize = false;
    }

    init() {
        this._createСamera();
        this._createLight();
        this._createHelpers();
        return this;
    }

    _createСamera() {
        // Камера:
        const fov = CameraConfig.fov;   // fov сокращение от field of view, поле зрения.
        const aspect = CameraConfig.aspect;  // aspect это соотношение сторон холста.
        // near и far представляют пространство перед камерой, которое будет отображаться.
        // Все, что находится до или после этого диапазона, будет обрезано (не нарисовано).
        const near = CameraConfig.near;
        const far = CameraConfig.far;

        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        // По умолчанию камера смотрит вниз по оси -Z и вверх по оси +Y
        // поэтому нам нужно немного отодвинуть камеру назад, чтобы что-то увидеть.
        this.camera.position.z = CameraConfig.posZ;  // Сдвиг камеры.
    }

    _createLight() {
        // Основной источник света теперь находится в центре сцены и совпадает с солнцем.
        const color = LightConfig.color;
        const intensity = LightConfig.intensity;

        this.light = new THREE.PointLight(color, intensity, 60, 2);
        this.light.position.set(
            LightConfig.position.x,
            LightConfig.position.y,
            LightConfig.position.z,
        );

        // Небольшой ambient light, чтобы теневая сторона объектов не проваливалась в полный мрак.
        this.ambientLight = new THREE.AmbientLight(0x2c3650, 0.9);

        this.scene.add(this.light);
        this.scene.add(this.ambientLight);
    }

    _createHelpers() {
        // PointLightHelper -- это специальный объект, который визуализирует положение и радиус действия точечного света.
        this.lightHelper = new THREE.PointLightHelper(this.light, HelperConfig.lightHelperSize);

        // AxesHelper -- это специальный объект, который визуализирует оси координат (X, Y, Z) в виде цветных линий.
        const axesHelper = new THREE.AxesHelper(HelperConfig.axesSize);

        this.scene.add(this.lightHelper);
        this.scene.add(axesHelper);
    }

    setCameraAspect(width, height) {
        if (!this.camera) return;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    resetCamera() {
        if (!this.camera) return;

        this.camera.position.set(0, 0, CameraConfig.posZ);
        this.camera.lookAt(0, 0, 0);
    }
}
