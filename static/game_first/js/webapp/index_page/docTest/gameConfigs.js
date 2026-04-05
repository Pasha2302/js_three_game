// index_page/docTest/gameConfigs.js
'use strict';


export const RendererConfig = {
    clearColor: 0x08111d,
    antialias: true,
}

export const CameraConfig = {
    /**
     * Field of View (FOV)
     * Угол обзора камеры по вертикали (в градусах).
     * 
     * - Малое значение (например, 30) → "зум", узкий угол, эффект приближения
     * - Большое значение (например, 90+) → широкий угол, эффект "рыбьего глаза"
     */
    fov: 75,

    /**
     * Aspect Ratio (соотношение сторон)
     * Рассчитывается как: width / height (ширина канваса / высота)
     * 
     * ⚠️ ВАЖНО: обычно НЕ задаётся вручную,
     * а вычисляется динамически:
     * 
     * camera.aspect = canvas.clientWidth / canvas.clientHeight;
     */
    aspect: 2,

    /**
     * Near Clipping Plane
     * Минимальное расстояние от камеры, на котором объекты ещё видимы.
     * Всё, что ближе — отсекается (не рендерится).
     * 
     * ⚠️ Делать слишком маленьким (например, 0.0001) — плохая идея:
     * ухудшается точность глубины (z-fighting).
     */
    near: 0.1,

    /**
     * Far Clipping Plane
     * Максимальное расстояние от камеры, на котором объекты ещё видимы.
     * Всё, что дальше — не рендерится.
     * 
     * ⚠️ Слишком большое значение → ухудшение глубины сцены.
     * Всегда старайся держать диапазон (far / near) как можно меньше.
     */
    far: 100,

    /**
     * Позиция камеры по оси Z
     * 
     * В Three.js камера по умолчанию смотрит в сторону -Z.
     * Поэтому положительное значение Z отодвигает камеру "назад"
     * от центра сцены (0, 0, 0).
     */
    posZ: 36,
};

export const LightConfig = {
    color: 0xfff2b3,
    intensity: 500,
    position: { x: 0, y: 0.7, z: 0 },
};

export const HelperConfig = {
    axesSize: 80,
    lightHelperSize: 50,
};


// ======================== Space Objects: ========================== //

/**
 * Конфигурация "Солнца" (или любого светящегося объекта) в сцене
 */
const SunConfig = {
    /**
     * Радиус сферы (геометрия)
     * 
     * Обычно используется в SphereGeometry:
     * new THREE.SphereGeometry(radius, ...)
     */
    radius: 5.8,

    /**
     * Базовый цвет материала (diffuse color)
     * 
     * ⚠️ Если используется MeshStandardMaterial:
     * этот цвет будет виден только при наличии освещения.
     */
    color: 0xffcc55,

    /**
     * Цвет самосвечения (emissive)
     * 
     * Делает объект визуально "светящимся",
     * даже без внешних источников света.
     */
    emissive: 0xffaa00,

    /**
     * Интенсивность свечения (emissiveIntensity)
     * 
     * - 0 → нет свечения
     * - 1 → нормальное
     * - >1 → яркое "пересвеченное" свечение
     */
    emissiveIntensity: 1.4,

    /**
     * Позиция объекта в сцене
     * 
     * ⚠️ Обрати внимание:
     * смещение по Y = 0.7 — объект немного "приподнят"
     * относительно центра сцены (0, 0, 0)
     */
    position: { x: 0, y: 0.7, z: 0 },
};

export const SpaceObjectConfigs = [
    {
        type: 'planet',
        radius: 1,
        segments: 32,
        texturePath: '',
        posX: 7,
        posY: 0.7,
        color: 0x6699ff,
        tiltX: 0.45,
        selfRotationSpeed: 1.15,
        orbitRadius: 24,
        orbitSpeed: 0.2,
        orbitCenter: { x: 0, y: 0.7, z: 0 },
        moon: {
            radius: 0.28,
            color: 0xd9dde7,
            distance: 3.3,
            orbitSpeed: 0.1,
            posY: 0.15,
        },
    },

    {
        type: 'sun',
        ...SunConfig,
    }
];


// =============================================================================== //

// Набор стартовых фигур для демо-сцены.
// Потом отсюда удобно читать стартовую конфигурацию уровня.
export const FigureConfigs = [
    {
        color: 0x44aa88,
        size: 1,
        posX: 0,
    },
    {
        color: 0x8844aa,
        size: 2,
        posX: -4,
    },
    {
        color: 0xaa8844,
        size: 3,
        posX: 4,
    },
];
