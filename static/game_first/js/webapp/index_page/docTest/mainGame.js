// index_page/docTest/mainGame.js
'use strict';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FigureConfigs, SpaceObjectConfigs } from './gameConfigs.js';
import { FiguresManager } from './allObjects/figures/FiguresManager.js';
import { SpaceObjectManager } from './allObjects/spaceObjects/manager.js';
import { GameSceneManager } from './scenes/manager.js';

// =============================================================================================== //


export class MaintThreeJs {
    constructor() {
        this.canvas = document.querySelector('#gameCanvasRoot');
        this.renderer = new THREE.WebGLRenderer( {antialias: true, canvas: this.canvas} );
        // GameSceneManager теперь отвечает за всё, что связано со сценой:
        // camera, light, helpers и сам объект scene.
        this.gameSceneManager = new GameSceneManager();

        this.scene = null;
        this.controls = null;
        this.camera = null;

        this.isPaused = false;

        this.figuresObjsManager = null;
        this.spaceObjsManager = null;

        this._mainLoop = this._mainLoop.bind(this);
        this._handleResize = this._handleResize.bind(this);
    }

    init() {
        this.gameSceneManager.init();
        this.scene = this.gameSceneManager.scene;
        this.camera = this.gameSceneManager.camera;

        // OrbitControls -- это класс из библиотеки three.js,
        // который позволяет легко добавлять интерактивное управление камерой с помощью мыши или сенсорного экрана.
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true; // плавное замедление — очень приятно на ощупь

        this._updateRendererSize();

        // Отдельный менеджер фигур хранит коллекцию объектов и логику их обновления.
        // this.figures = new FiguresManager(this.scene);
        // this.figures.createStartFigures(FigureConfigs);

        // Планеты подключаются по такой же схеме:
        // отдельная фабрика создаёт объекты, а менеджер хранит их коллекцию.
        this.spaceObjsManager = new SpaceObjectManager(this.scene);
        this.spaceObjsManager.createObjects(SpaceObjectConfigs);

        // Вызвав функцию render рендерера передав ей сцену и камеру:
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this._mainLoop);

        window.addEventListener('resize', this._handleResize);

        document.querySelector('#sceneStatus').textContent = 'Сцена запущена ✓';
    }

    _mainLoop(time) {
        time *= 0.001;  // конвертировать время в секунды

        if (this.figuresObjsManager) {
            this.figuresObjsManager.tick(time, this.isPaused);
        }

        if (this.spaceObjsManager) {
            this.spaceObjsManager.tick(time, this.isPaused);
        }
        
        this.controls.update(); // нужно если enableDamping = true
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this._mainLoop);
    }

    _updateRendererSize() {
        const canvas = this.renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        this.gameSceneManager.needResize = canvas.width !== width || canvas.height !== height;

        if ( this.gameSceneManager.needResize ) {
            this.renderer.setSize(width, height, false); // false — не трогать CSS размер
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.gameSceneManager.setCameraAspect(width, height);
        }
    }

    _handleResize() {
        this._updateRendererSize();
    }

    // ------ //

    toggleAnimation() {
        this.isPaused = !this.isPaused;
        const btn = document.querySelector('#toggleAnimationBtn');
        btn.textContent = this.isPaused ? 'Продолжить анимацию' : 'Пауза анимации';
    }

    resetScene() {
        if (this.figuresObjsManager) {
            this.figuresObjsManager.reset();
        }

        if (this.spaceObjsManager) {
            this.spaceObjsManager.reset();
        }

        this.gameSceneManager.resetCamera();
        this.controls.reset();
        this.isPaused = false;
        document.querySelector('#toggleAnimationBtn').textContent = 'Пауза анимации';
        document.querySelector('#sceneStatus').textContent = 'Сцена сброшена ✓';
    }


}
