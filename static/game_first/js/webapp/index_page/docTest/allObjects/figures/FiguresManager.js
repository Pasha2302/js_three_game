// index_page/docTest/objects/figures/FiguresManager.js
'use strict';
import { FigureFactory } from './FigureFactory.js';


export class FiguresManager {
    constructor(scene) {
        this.scene = scene;
        this.figures = [];
        this.figureFactory = new FigureFactory();
    }

    createFigure(figureConfig) {
        const figure = this.figureFactory.createFigure(figureConfig);

        this.scene.add(figure.mesh);
        this.figures.push(figure);
        return figure;
    }

    createStartFigures(figureConfigs) {
        figureConfigs.forEach((figureConfig) => {
            this.createFigure(figureConfig);
        });
    }

    tick(time, isPaused) {
        this.figures.forEach((figure, ndx) => {
            figure.update(time, ndx, isPaused);
        });
    }

    reset() {
        this.figures.forEach(figure => {
            figure.reset();
        });
    }
}
