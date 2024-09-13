from pydantic import BaseModel


class RequestHTML(BaseModel):
    prompt: str
    html: str
