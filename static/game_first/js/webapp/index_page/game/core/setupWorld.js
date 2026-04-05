// index_page/game/core/setupWorld.js
import * as THREE from 'three';


export function setupWorld(scene, worldConfig) {
    // AmbientLight -- Это свет, который освещает все объекты в сцене равномерно, без направления. 
    // Он не отбрасывает тени и используется для создания базового освещения, чтобы объекты не были полностью черными.
    const ambientLight = new THREE.AmbientLight(0xffffff, worldConfig.ambientLight);
    scene.add(ambientLight);

    // DirectionalLight -- Это свет, который освещает объекты из определенного направления, как солнечный свет.
    const directionalLight = new THREE.DirectionalLight(0xffffff, worldConfig.directionalLight);
    directionalLight.position.set(5, 10, 4);
    scene.add(directionalLight);

    // PlaneGeometry -- Это геометрия, которая представляет собой плоскость.
    // Она используется для создания пола в нашей сцене.
    const floorGeometry = new THREE.PlaneGeometry(worldConfig.floorSize, worldConfig.floorSize);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x132338,
        metalness: 0.15,
        roughness: 0.88,
    });

    // Создание меша для пола и его добавление в сцену.
    // Mesh -- Дословно: Сетка. Это объект, который объединяет геометрию и материал,
    // и может быть добавлен в сцену для рендеринга.
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.5;
    scene.add(floor);

    // GridHelper -- Это вспомогательный объект, который отображает сетку на плоскости.
    // Он полезен для визуализации масштаба и ориентации в сцене.
    const grid = new THREE.GridHelper(worldConfig.floorSize, worldConfig.floorSize, 0x2d8fa8, 0x163245);
    grid.position.y = -1.49;
    scene.add(grid);
}
