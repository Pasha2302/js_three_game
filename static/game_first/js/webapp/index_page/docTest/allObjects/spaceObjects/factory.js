// index_page/docTest/allObjects/spaceObjects/factory.js
'use strict';
import * as THREE from 'three';
import { SpaceObject } from './objects.js';


export class SpaceObjectFactory {

    _createSun(SunConfig) {
        const geometry = new THREE.SphereGeometry(SunConfig.radius, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: SunConfig.color,
            emissive: SunConfig.emissive,
            emissiveIntensity: SunConfig.emissiveIntensity,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            SunConfig.position.x,
            SunConfig.position.y,
            SunConfig.position.z,
        );

        return new SpaceObject( {config: SunConfig, mesh} );

    }

    createObject(spaceObjConf) {
        if (spaceObjConf.type == 'sun') return this._createSun(spaceObjConf);

        // Пока это заготовка под будущие планеты.
        // Когда дойдешь до планетарной системы, здесь можно будет:
        // - грузить текстуры
        // - задавать орбиту
        // - обновлять вращение и обращение вокруг центра
        const geometry = new THREE.SphereGeometry(
            spaceObjConf.radius,
            spaceObjConf.segments,
            spaceObjConf.segments,
        );

        const material = new THREE.MeshPhongMaterial({
            color: spaceObjConf.color || 0x6699ff,
            shininess: 90,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = spaceObjConf.posX;
        mesh.position.y = spaceObjConf.posY || 0;

        let moon = null;
        let moonPivot = null;

        // Спутник делаем дочерним объектом планеты через pivot.
        // Так проще управлять его локальной орбитой вокруг самой планеты.
        if (spaceObjConf.moon) {
            moonPivot = new THREE.Object3D();
            mesh.add(moonPivot);

            const moonGeometry = new THREE.SphereGeometry(
                spaceObjConf.moon.radius,
                24,
                24,
            );

            const moonMaterial = new THREE.MeshPhongMaterial({
                color: spaceObjConf.moon.color,
                shininess: 40,
            });

            moon = new THREE.Mesh(moonGeometry, moonMaterial);
            moon.position.set(
                spaceObjConf.moon.distance,
                spaceObjConf.moon.posY || 0,
                0,
            );

            moonPivot.add(moon);
        }

        return new SpaceObject({
            config: spaceObjConf,
            mesh,
            moon,
            moonPivot,
        });
    }

}
