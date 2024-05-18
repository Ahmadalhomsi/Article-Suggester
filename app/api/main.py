
import sys
sys.path.append('./app/api/')  # Add the directory containing my_module.py to the module search path
from recommendation_algorithm import *
from http.client import HTTPException
from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI()


# --------------


class Data(BaseModel):
    user_interests: str
    dataset_count: int
    model_choice: int

    

class Item(BaseModel):
    name: str
    description: str = None

    
@app.get("/")
def read_root():
    return {"Hellox": "Worldx"}



@app.get("/api/pythonx")
def read_root():
    return {"Hellox": "Worldx"}


# @app.post("/api/vv")
# def get_recommendations(user_interests: UserInterests):
#     return {"VV": user_interests}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}



@app.get("/getDataset")
def get_dataset():
    dataset = getDataset()
    return dataset


@app.post("/recommendations")
async def get_recommendations(data: Data):
    print("XXXXXXXX")
    print(data.user_interests, data.dataset_count, data.model_choice)
    recommendations = algorithm(data.user_interests, data.dataset_count, data.model_choice)
    return recommendations



origins = ['http://localhost:3000/']


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)