// index_page/game/GameApp.js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { GAME_CONFIG } from './config.js';
import { createRenderer } from './core/createRenderer.js';
import { createCamera } from './core/createCamera.js';
import { createScene } from './core/createScene.js';
import { setupWorld } from './core/setupWorld.js';
import { createDemoCube } from './objects/createDemoCube.js';


export class GameApp {
    constructor(options = {}) {
        this.root = options.root;
        this.statusElement = options.statusElement || null;
        this.apiClient = options.apiClient || null;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;

        this.entities = [];
        this.isAnimationRunning = true;
        this.animationFrameId = null;
        this.lastFrameTime = 0;

        this.handleResize = this.handleResize.bind(this);
        this.animate = this.animate.bind(this);
    }

    start() {
        if (!this.root) {
            throw new Error('Не передан root-контейнер для Three.js сцены');
        }

        this.root.innerHTML = '';

        this.scene = createScene();
        this.camera = createCamera(GAME_CONFIG.camera);
        this.renderer = createRenderer(this.root, GAME_CONFIG.renderer);
        this.controls = this.createControls();

        setupWorld(this.scene, GAME_CONFIG.world);
        this.createDemoEntities();
        this.handleResize();

        window.addEventListener('resize', this.handleResize);
        this.setStatus('Сцена запущена. Можно крутить камеру мышкой.');

        // lastFrameTime -- это свойство для хранения времени последнего кадра, чтобы вычислять deltaTime
        // ( performance ) -- это глобальный объект, предоставляющий высокоточные таймеры.
        // performance.now() возвращает время в миллисекундах с момента загрузки страницы, с высокой точностью.
        this.lastFrameTime = performance.now();
        // animationFrameId -- хранит ID текущего запроса анимации, чтобы можно было его отменить при необходимости
        this.animationFrameId = requestAnimationFrame(this.animate);
    }

    animate(currentTime) {
        const deltaTime = Math.min((currentTime - this.lastFrameTime) / 1000, 0.032);
        this.lastFrameTime = currentTime;

        if (this.isAnimationRunning) {
            for (const entity of this.entities) {
                if (typeof entity.update === 'function') {
                    entity.update(deltaTime);
                }
            }
        }

        if (this.controls) {
            this.controls.update();
        }

        this.renderer.render(this.scene, this.camera);
        this.animationFrameId = requestAnimationFrame(this.animate);
    }

    createControls() {
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.06;
        controls.target.set(0, 0.6, 0);
        controls.update();
        return controls;
    }

    createDemoEntities() {
        const cube = createDemoCube(GAME_CONFIG.demoCube);
        this.entities.push(cube);
        this.scene.add(cube.sceneObject);
    }

    handleResize() {
        if (!this.root || !this.renderer || !this.camera) {
            return;
        }

        const width = this.root.clientWidth || 1;
        const height = this.root.clientHeight || 1;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height, false);
    }

    toggleAnimation() {
        this.isAnimationRunning = !this.isAnimationRunning;
        this.setStatus(
            this.isAnimationRunning
                ? 'Анимация запущена.'
                : 'Анимация остановлена. Сцена остаётся интерактивной.',
        );
        return this.isAnimationRunning;
    }

    resetDemo() {
        for (const entity of this.entities) {
            if (typeof entity.reset === 'function') {
                entity.reset();
            }
        }

        this.camera.position.set(
            GAME_CONFIG.camera.position.x,
            GAME_CONFIG.camera.position.y,
            GAME_CONFIG.camera.position.z,
        );

        if (this.controls) {
            this.controls.target.set(0, 0.6, 0);
            this.controls.update();
        }

        this.setStatus('Сцена сброшена в исходное состояние.');
    }

    setStatus(message) {
        if (this.statusElement) {
            this.statusElement.textContent = message;
        }
    }

    destroy() {
        window.removeEventListener('resize', this.handleResize);

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }

        for (const entity of this.entities) {
            if (typeof entity.destroy === 'function') {
                entity.destroy();
            }
        }

        this.entities = [];

        if (this.controls) {
            this.controls.dispose();
        }

        if (this.renderer) {
            this.renderer.dispose();
        }

        if (this.root) {
            this.root.innerHTML = '';
        }
    }
}
