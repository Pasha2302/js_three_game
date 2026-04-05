// index_page/docTest/mainGame.js
'use strict';
import { FigureConfigs, SpaceObjectConfigs } from './gameConfigs.js';
import { FiguresManager } from './allObjects/figures/FiguresManager.js';
import { SpaceObjectManager } from './allObjects/spaceObjects/manager.js';
import { GameSceneManager } from './scenes/manager.js';

// =============================================================================================== //


export class MaintThreeJs {
    constructor() {
        this.rootElm = document.querySelector('#gameCanvasRoot');
        // GameSceneManager теперь отвечает за всё, что связано со сценой:
        this.gameSceneManager = new GameSceneManager(this.rootElm);

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;

        // this.isOnStart = true;
        this.lastFrameTime = 0;
        this.isPaused = false;
        this.animationFrameId = null;
        
        this.figuresObjsManager = null;
        this.spaceObjsManager = null;

        this._mainLoop = this._mainLoop.bind(this);
        this._handleResize = this._handleResize.bind(this);
    }

    init() {
        this.gameSceneManager.init();
        this.scene = this.gameSceneManager.scene;
        this.camera = this.gameSceneManager.camera;
        this.renderer = this.gameSceneManager.renderer;
        this.controls = this.gameSceneManager.controls;

        // Отдельный менеджер фигур хранит коллекцию объектов и логику их обновления.
        // this.figures = new FiguresManager(this.scene);
        // this.figures.createStartFigures(FigureConfigs);

        // Планеты подключаются по такой же схеме:
        // отдельная фабрика создаёт объекты, а менеджер хранит их коллекцию.
        this.spaceObjsManager = new SpaceObjectManager(this.scene);
        this.spaceObjsManager.createObjects(SpaceObjectConfigs);

        this._updateRendererSize();
        window.addEventListener('resize', this._handleResize);
        document.querySelector('#sceneStatus').textContent = 'Сцена запущена ✓';

        // lastFrameTime -- это свойство для хранения времени последнего кадра, чтобы вычислять deltaTime
        // ( performance ) -- это глобальный объект, предоставляющий высокоточные таймеры.
        // performance.now() возвращает время в миллисекундах с момента загрузки страницы, с высокой точностью.
        this.lastFrameTime = performance.now();
        // animationFrameId -- хранит ID текущего запроса анимации, чтобы можно было его отменить при необходимости
        this.animationFrameId = requestAnimationFrame(this._mainLoop);
    }

    _mainLoop(currentTime) {
        // deltaTime -- это разница во времени между текущим кадром и последним кадром, в секундах.
        // Нужно что бы обновление объектов не зависело от производительности устройства и частоты кадров.
        // const deltaTime = Math.min((currentTime - this.lastFrameTime) / 1000, 0.032);
        // this.lastFrameTime = currentTime;

        const deltaTime = currentTime * 0.001;  // конвертировать время в секунды

        if (this.figuresObjsManager) {
            this.figuresObjsManager.tick(deltaTime, this.isPaused);
        }

        if (this.spaceObjsManager) {
            this.spaceObjsManager.tick(deltaTime, this.isPaused);
        }
        
        if (this.controls) this.controls.update(); // нужно если enableDamping = true

        this.renderer.render(this.scene, this.camera);
        // animationFrameId -- это ID текущего запроса анимации, который возвращает requestAnimationFrame.
        // Он нужен для того, чтобы можно было отменить запрос при необходимости
        // (например, при остановке анимации или уничтожении сцены).
        this.animationFrameId = requestAnimationFrame(this._mainLoop);
    }

    _updateRendererSize() {
        const canvas = this.renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        this.gameSceneManager.needResize = canvas.width !== width || canvas.height !== height;

        if ( this.gameSceneManager.needResize) {
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
