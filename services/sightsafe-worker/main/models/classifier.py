from pydantic import BaseModel
from typing import Literal


class ClassifyRequest(BaseModel):
    id: str
    type: Literal["classify"]
    data: str


class ClassifyResponse(BaseModel):
    id: str
    type: Literal["classify-result"]
    data: str
