// index_page/docTest/scenes/manager.js
'use strict';
import * as THREE from 'three';
import { CameraConfig, HelperConfig, LightConfig, RendererConfig } from '../gameConfigs.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export class GameSceneManager {
    constructor(rootElm) {
        this.rootElm = rootElm;
        // Все, что вы хотите нарисовать необходимо добавить на сцену.
        this.scene = null;
        this.camera = null;
        this.light = null;
        this.renderer = null;
        this.controls = null;

        this.lightHelper = null;
        this.ambientLight = null;

        this.needResize = null;
    }

    init() {
        this._createScene();
        this._createСamera();
        this._createLight();

        this._createRenderer();
        this._createControls();
        this._createHelpers();
        
        return this;
    }

    // ----------------- Методы Иницализации: ------------------------- //

    _createScene() {
        // Создание сцены:
        this.scene = new THREE.Scene(); 
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

    _createRenderer() {
        const renderer = new THREE.WebGLRenderer( { antialias: true, canvas: this.rootElm } );
    
        renderer.setPixelRatio( Math.min(window.devicePixelRatio || 1, 2) );
        renderer.setClearColor(RendererConfig.clearColor);
        // SRGBColorSpace -- это цветовое пространство, которое соответствует тому, как человеческий глаз воспринимает цвета.
        renderer.outputColorSpace = THREE.SRGBColorSpace;
    
        this.renderer = renderer;
    }

    _createControls() {
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.06;
        controls.target.set(0, 0.6, 0);
        controls.update();
        this.controls = controls;
    }

    _createHelpers() {
        // PointLightHelper -- это специальный объект, который визуализирует положение и радиус действия точечного света.
        this.lightHelper = new THREE.PointLightHelper(this.light, HelperConfig.lightHelperSize);

        // AxesHelper -- это специальный объект, который визуализирует оси координат (X, Y, Z) в виде цветных линий.
        const axesHelper = new THREE.AxesHelper(HelperConfig.axesSize);

        this.scene.add(this.lightHelper);
        this.scene.add(axesHelper);
    }

    // ----------------- Публичные Методы: ------------------------- //

    setCameraAspect(width, height) {
        // Функция для обновления соотношения сторон камеры при изменении размера окна.
        if (!this.camera) return;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    resetCamera() {
        // Функция для сброса камеры в исходное положение и направление взгляда.
        if (!this.camera) return;

        // position.set -- это метод камеры, который устанавливает её позицию в 3D пространстве по координатам x, y, z.
        this.camera.position.set(0, 0, CameraConfig.posZ);
        // lookAt -- это метод камеры, который заставляет её смотреть на определённую точку в пространстве.
        this.camera.lookAt(0, 0, 0);
    }
}
