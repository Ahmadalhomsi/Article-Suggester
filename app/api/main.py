
from recommendation_algorithm import *
from http.client import HTTPException
from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI()


# --------------


class UserInterests(BaseModel):
    user_interests: str


class Item(BaseModel):
    name: str
    description: str = None


@app.get("/api/pythonx")
def read_root():
    return {"Hellox": "Worldx"}


@app.post("/api/vv")
def get_recommendations(user_interests: UserInterests):
    return {"VV": user_interests}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}



@app.get("/getDataset")
def get_dataset():
    dataset = getDataset()
    return dataset


@app.post("/recommendations")
async def get_recommendations(user_interests: UserInterests):
    recommendations = algorithm(user_interests.user_interests)
    return recommendations



origins = ['http://127.0.0.1:8000/']


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
