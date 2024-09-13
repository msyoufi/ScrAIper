from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import RequestHTML

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*']
)


@app.post('/')
async def root(file_type: str, request_html: RequestHTML):
    prompt = request_html.prompt
    html = request_html.html

    print('html:', html)
    print('file_type:', file_type)
    print('prompt:', prompt)
    return 'Hello World!'


@app.get('/')
async def getroot():
    return 'hi!'
