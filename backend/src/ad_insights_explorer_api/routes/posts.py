import requests
from flask import Blueprint, jsonify, request
from pydantic import BaseModel, Field, ValidationError, model_validator
from pydantic_core import PydanticCustomError
from typing_extensions import Self
from typing import Tuple, Optional
from src.ad_insights_explorer_api.model import Post
from src.ad_insights_explorer_api.repository import posts_cache
from config import Config


class PostsQueryParams(BaseModel):
    userId: int | None = Field(None, gt=0, description="User ID must be greater then 0")
    page: int | None = Field(None, ge=0, description="Page must be greater than or equal to 0")
    pageSize: int | None = Field(None, gt=0, description="Page size must be greater than 0")

    @model_validator(mode="after")
    def check_page_size_requires_page(self) -> Self:
        if self.pageSize is not None and self.page is None:
            raise PydanticCustomError(
                "value_error",
                "When pageSize is set, page must also be set",
                {
                    'page': self.page,
                    'pageSize': self.pageSize,
                }
            )
        return self

    def paginate(self) -> Tuple[Optional[int], Optional[int]]:
        if self.page is None:
            return None, None

        page_size = self.pageSize or Config.POSTS_DEFAULT_PAGE_SIZE
        start = page_size * self.page
        end = start + page_size
        return start, end

posts_blueprint = Blueprint("posts", __name__)

@posts_blueprint.route("/")
def posts():
    try:
        params = PostsQueryParams(**request.args.to_dict())
        posts = posts_cache.get()

        if params.userId is not None:
            posts = list(filter(lambda post: post.user_id == params.userId, posts))

        start, end = params.paginate()
        if start is not None and end is not None:  
            posts = posts[start:end]

        return jsonify({
            "posts": [post.model_dump(by_alias=True) for post in posts]
        })

    except ValidationError as e:
        return jsonify({ "error": e.errors() }), 400

    except requests.exceptions.RequestException as e:
        return jsonify({ "error": str(e)}), 500
