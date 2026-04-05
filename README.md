# game-js

Проект выглядит живо: уже есть `Litestar`, шаблоны, статика и раздельная структура по `app/`, `src/`, `templates/`, `static/`.
Для старта это очень хорошая база.

## Backend: установка через `uv`

Если `uv` ещё не установлен:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Установить Python для проекта:

```bash
uv python install 3.13
```

Создать окружение и установить все нужные зависимости:

```bash
uv venv --python 3.13
uv add litestar jinja2 uvicorn pydantic sqlalchemy
uv add --dev pytest
uv sync
```

## Backend: запуск проекта

```bash
uv run python manage.py
```
Или напрямую через `uvicorn`:
```bash
uv run uvicorn src.main:app --reload
```


## Backend: тесты

```bash
uv run pytest
```

## Frontend: что используется

Для фронтенда используется:
- `Three.js` как библиотека для 3D
- `Vite` как dev-инструмент и сборщик

Исходный frontend-код лежит в папке:
```text
static/game_first/js/webapp
```

Готовая сборка, которую отдаёт `Litestar`, попадает в:
```text
static/game_first/js/build
```


## Frontend: установка зависимосте
Перейти в папку frontend:
```bash
cd static/game_first/js/webapp
```
Установить зависимости:

```bash
npm install
```
Если нужно поставить зависимости вручную с нуля:

```bash
npm install three
npm install -D vite
```


## Frontend: разработка
Во время разработки ты редактируешь исходники в:

```text
static/game_first/js/webapp
```

Например:

```text
static/game_first/js/webapp/main.js
static/game_first/js/webapp/index_page/index.js
static/game_first/js/webapp/index_page/game/GameApp.js
```

Запустить frontend dev server:

```bash
cd static/game_first/js/webapp
npm run dev
```

Важно:

- dev server `Vite` запускается отдельно от `Litestar`
- текущий шаблон проекта подключает production-сборку из `static/game_first/js/build/main.js`
- поэтому для обычной работы через `Litestar` после изменений нужно делать сборку frontend

## Frontend: сборка

Собрать frontend для `Litestar`:

```bash
cd static/game_first/js/webapp
npm run build
```

После этого `Vite` обновит файлы в:

```text
static/game_first/js/build
```

Именно эти файлы подключаются в шаблонах и отдаются через `/static/...`.

## Полный запуск проекта

1. Запустить backend:

```bash
uv run python manage.py
```

2. При изменениях во frontend пересобирать bundle:
```bash
cd static/game_first/js/webapp
npm run build
```

3. Открыть проект в браузере:

```text
http://127.0.0.1:8000/
```


### -------------------------------------
## Шпаргалка команд

Установить backend-зависимости:

```bash
uv sync
```

Запустить backend:

```bash
uv run python manage.py
```

Установить frontend-зависимости:

```bash
cd static/game_first/js/webapp
npm install
```

Запустить `Vite` dev server:

```bash
cd static/game_first/js/webapp
npm run dev
```

Собрать frontend для `Litestar`:

```bash
cd static/game_first/js/webapp
npm run build
```
