from litestar import Router

from app.game_first.handlers.api.test_api import test_api_handler
from app.game_first.handlers.dev_tools.dev_tools_view import devtools_handler
from app.game_first.handlers.website_views.index_page_view.index_page import test_page_handler, index_handler


website_router = Router(
    path="/", # Задаёт префикс пути, под которым будут доступны все обработчики внутри этого роутера.
    route_handlers=[
        devtools_handler,
        index_handler,

        test_page_handler
    ],
)

api_v1_router = Router(
    path="/api/v1",
    route_handlers=[
        test_api_handler,
    ],
)

routers = [website_router, api_v1_router, ]

