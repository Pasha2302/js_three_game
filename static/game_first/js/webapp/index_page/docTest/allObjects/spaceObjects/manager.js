// index_page/docTest/allObjects/spaceObjects/SpaceObject.js
'use strict';
import { SpaceObjectFactory } from './factory.js';


export class SpaceObjectManager {
    constructor(scene) {
        this.scene = scene;
        this.objectslist = [];  // Список объектов класса < SpaceObject >
        this.spaceObjectFactory = new SpaceObjectFactory();
    }

    createObject(spaceObjConf) {
        const object = this.spaceObjectFactory.createObject(spaceObjConf);

        this.scene.add(object.mesh);
        this.objectslist.push(object);
        return object;
    }

    createObjects(spaceObjsConf) {
        spaceObjsConf.forEach((objConf) => {
            this.createObject(objConf);
        });
    }

    tick(deltaTime, isPaused) {
        this.objectslist.forEach((object) => {
            object.update(deltaTime, isPaused);
        });
    }

    reset() {
        this.objectslist.forEach((object) => {
            object.reset();
        });
    }
}
