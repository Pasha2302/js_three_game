// index_page/index.js
'use strict';
import { MaintThreeJs } from './docTest/mainGame.js'



// =============================================================================================== //

export function init_page_index(baseEv, apiClientJs) {
    console.log('\nIndex page Game loaded ...');

    const gameJs = new MaintThreeJs();
    gameJs.init();

    document.querySelector('#toggleAnimationBtn').addEventListener('click', () => gameJs.toggleAnimationPaused());
    document.querySelector('#resetSceneBtn').addEventListener('click', () => gameJs.resetScene());
}



// import { GameApp } from './game/GameApp.js';

// function runThreeJsDemo() {
//     const canvasRoot = document.querySelector('#gameCanvasRoot');
//     const sceneStatus = document.querySelector('#sceneStatus');

//     if (!canvasRoot) {
//         console.warn('Контейнер для игры не найден');
//         return;
//     }

//     // Создаём экземпляр приложения.
//     // В дальнейшем сюда можно передавать настройки игрока, карты, API и другие зависимости.
//     const gameApp = new GameApp({
//         root: canvasRoot,
//         statusElement: sceneStatus,
//         apiClient: apiClientJs,
//     });

//     gameApp.start();

//     baseEv.on('click', '#toggleAnimationBtn', () => {
//         const isRunning = gameApp.toggleAnimation();
//         const button = document.querySelector('#toggleAnimationBtn');
//         if (button) {
//             button.textContent = isRunning ? 'Пауза анимации' : 'Запустить анимацию';
//         }
//     });

//     baseEv.on('click', '#resetSceneBtn', () => {
//         gameApp.resetDemo();
//     });

//     // Это удобно на этапе экспериментов:
//     // можно открыть консоль и вручную вызывать методы window.gameApp.
//     window.gameApp = gameApp;
// }
