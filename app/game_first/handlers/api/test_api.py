from litestar import get, Response


@get("/test")
async def test_api_handler() -> Response:
    data = {
        "status": "ok",
        "data": ['test data 1', 'test data 2', 'test data 3'],
    }
    headers = {
        "Cache-Control": "public, max-age=3600",  # кэшировать 1 час
    }
    return Response(content=data, status_code=200, headers=headers)
