from litestar import get


@get(path=".well-known/appspecific/com.chrome.devtools.json")
async def devtools_handler() -> dict:
    # Возвращаем пустой объект или минимальный валидный JSON
    return {}
