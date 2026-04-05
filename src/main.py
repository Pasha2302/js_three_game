from pathlib import Path
from litestar import Litestar
from litestar.contrib.jinja import JinjaTemplateEngine
from litestar.static_files import StaticFilesConfig
from litestar.template.config import TemplateConfig
from src.routes import routers  # импортируем маршруты

BASE_DIR = Path(__file__).parent.parent
path_templates = BASE_DIR / "templates"
print(f"\n\n[DEBUG] Path Template:\n{path_templates}")


app = Litestar(
    route_handlers=routers,
    debug=True,

    template_config=TemplateConfig(
        directory= path_templates,
        engine=JinjaTemplateEngine,
    ),

    static_files_config=[
        StaticFilesConfig(
            path="/static",   # «Все файлы из папки BASE_DIR/static должны быть доступны по URL /static/...»
            directories=[BASE_DIR / "static"],  # FS
        )
    ],

)

# Пример запуска:
# >> uvicorn src.asgi:app --reload --port 8080 --log-level debug
