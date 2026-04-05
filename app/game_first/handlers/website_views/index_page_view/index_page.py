from litestar import get
from litestar.exceptions import HTTPException
from litestar.response import Template



@get(path='', sync_to_thread=False)
def index_handler() -> Template:
    context = {
        "name_page": "index_page",
        "user_name": "Pavlusha =)",
    }
    return Template(template_name="game_first/pages/index/index_wrapp.html", context=context)


# =============================================================================================== #

@get(path="{template_type:str}/{name:str}", sync_to_thread=False)
def test_page_handler(template_type: str, name: str) -> Template:
    context = {
        "name_page": "index_page",
        "user_name": name,
    }

    if template_type == "file":
        return Template(template_name="test_temps/test_page.html", context=context)
    elif template_type == "string":
        return Template(template_str="Hello <strong>Jinja</strong> using strings", context={"name": name})
    raise HTTPException(status_code=404, detail="Template type not found")
