import requests
from flask import Blueprint, jsonify, request
from pydantic import BaseModel, Field, ValidationError, model_validator
from pydantic_core import PydanticCustomError
from typing_extensions import Self
from config import Config

posts_blueprint = Blueprint("posts", __name__)


class PostsQueryParams(BaseModel):
    userId: int | None = Field(None, gt=0, description="User ID must be greater then 0")
    page: int | None = Field(None, ge=0, description="Page must be greater than or equal to 0")
    pageSize: int | None = Field(Config.POSTS_DEFAULT_PAGE_SIZE, gt=0, description="Page size must be greater than 0")

    @model_validator(mode="after")
    def check_page_size_requires_page(self) -> Self:
        if self.pageSize is None and self.page is None:
            raise PydanticCustomError(
                "value_error",
                "When pageSize is set, page must also be set",
                {
                    'page': self.page,
                    'pageSize': self.pageSize,
                }
            )
        return self


@posts_blueprint.route("/")
def posts():
    try:
        params = PostsQueryParams(**request.args.to_dict())

        response = requests.get(url=Config.POSTS_URL)
        response.raise_for_status()
        posts_data = response.json()

        if params.userId is not None:
            posts_data = list(filter(lambda post: post["userId"] == params.userId, posts_data))

        if params.page is not None:
            start = params.pageSize * params.page
            end = min(len(posts_data), start + params.pageSize)
            posts_data = posts_data[start:end]

        return jsonify({
            "posts": posts_data
        })

    except ValidationError as e:
        return jsonify({ "error": e.errors() }), 400

    except requests.exceptions.RequestException as e:
        return jsonify({ "error": str(e)}), 500
