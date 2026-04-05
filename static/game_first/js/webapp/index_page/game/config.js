// index_page/game/config.js
// Центральное место для базовых настроек демо-сцены.
// Когда проект вырастет, сюда удобно вынести параметры уровней,
// камеры, физики, управления и dev-флаги.

export const GAME_CONFIG = {
    renderer: {
        clearColor: 0x08111d,
        antialias: true,
    },

    camera: {
        fov: 60,
        near: 0.1,
        far: 200,
        position: { x: 0, y: 3.5, z: 8.5 },
    },

    world: {
        ambientLight: 1.8,
        directionalLight: 2.8,
        floorSize: 28,
    },

    demoCube: {
        size: 1.35,
        color: 0x41d6e8,
        emissive: 0x0c3442,
        rotationSpeed: {
            x: 0.65,
            y: 0.95,
        },
    },
};
