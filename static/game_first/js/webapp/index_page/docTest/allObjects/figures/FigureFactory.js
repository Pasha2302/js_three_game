// index_page/docTest/objects/figures/FigureFactory.js
'use strict';
import * as THREE from 'three';
import { Figure } from './Figure.js';


export class FigureFactory {
    createFigure(figureConfig) {
        // Далее мы создаем BoxGeometry который содержит данные для прямоугольного параллелепипеда.
        // Почти все, что мы хотим отобразить в Three.js,
        // нуждается в геометрии, которая определяет вершины нашего трехмерного объекта.
        const geometry = new THREE.BoxGeometry(
            figureConfig.size,
            figureConfig.size,
            figureConfig.size,
        );

        // Создаем основной материал и устанавливаем его цвет ( MeshBasicMaterial -- не отражает свет! ):
        // const material = new THREE.MeshBasicMaterial( {color: 0x44aa88} );
        const material = new THREE.MeshPhongMaterial({ color: figureConfig.color });  // Восприимчив к свету.

        // Создаем полигональную сетку:
        // Представляет комбинацию формы объекта Geometry и Material
        // (как нарисовать объект, блестящий или плоский, какой цвет, какую текстуру(ы) применить и т.д.)
        // а также положение, ориентацию, и масштаб этого объекта в сцене.
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = figureConfig.posX;

        return new Figure({
            config: figureConfig,
            mesh,
        });
    }
}
