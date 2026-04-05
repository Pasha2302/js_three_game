/**
 * UniversalLazyLoader
 * Лениво загружает библиотеки после первого взаимодействия пользователя
 */
export class UniversalLazyLoader {
    /**
     * @param {Function} callback - функция, которая выполнится после взаимодействия
     * @param {Object} [options] - настройки
     * @param {number} [options.scrollThreshold=50] - минимальный скролл для триггера
     */
    constructor(callback, options = {}) {
        this.callback = callback;
        this.scrollThreshold = options.scrollThreshold ?? 50;
        this.triggered = false;

        // Привязываем обработчик один раз
        this._boundTrigger = this._triggerOnce.bind(this);

        // Слушаем события
        this._addListeners();
    }

    _addListeners() {
        window.addEventListener('scroll', this._boundTrigger, { passive: true });
        window.addEventListener('mousemove', this._boundTrigger, { passive: true });
        window.addEventListener('touchstart', this._boundTrigger, { passive: true });
        window.addEventListener('wheel', this._boundTrigger, { passive: true });
        window.addEventListener('keydown', this._boundTrigger, { passive: true });
    }

    _removeListeners() {
        window.removeEventListener('scroll', this._boundTrigger);
        window.removeEventListener('mousemove', this._boundTrigger);
        window.removeEventListener('touchstart', this._boundTrigger);
        window.removeEventListener('wheel', this._boundTrigger);
        window.removeEventListener('keydown', this._boundTrigger);
    }

    async _triggerOnce(ev) {
        if (this.triggered) return;

        // Для scroll проверяем минимальное смещение
        if (ev.type === 'scroll' && window.scrollY < this.scrollThreshold) return;

        this.triggered = true;
        this._removeListeners();

        try {
            await this.callback();
        } catch (err) {
            console.error('Ошибка при ленивой загрузке:', err);
        }
    }
}

// ================== ПРИМЕР ИСПОЛЬЗОВАНИЯ ==================

// // Лениво загружаем Swiper только после действия пользователя
// new UniversalLazyLoader(async () => {
//     console.log('Пользователь начал взаимодействовать — загружаем Swiper');

//     // Динамический import (ESM)
//     const { default: Swiper } = await import('/static/app_casinos/js/swiper-bundle.min.js');

//     // Инициализация менеджера свайперов
//     const swiperManager = new SwiperBlocksManager(Swiper);
//     swiperManager.init();

// }, { scrollThreshold: 50 });