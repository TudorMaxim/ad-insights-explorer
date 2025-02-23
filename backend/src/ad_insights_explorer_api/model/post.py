from pydantic import BaseModel, ConfigDict
import humps

def to_camel_case(s: str) -> str:
    return humps.camelize(s)


class Post(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel_case, populate_by_name=True)

    id: int
    user_id: int
    title: str
    body: str
