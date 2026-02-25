from pymongo import MongoClient
from bson import ObjectId
from bson.errors import InvalidId

client = MongoClient("mongodb://localhost:27017/")
db = client["videojuegos"]
collection = db["games"]

def get_all_games():
    games = list(collection.find())
    for game in games:
        game["_id"] = str(game["_id"])
    return games

def create_game(data):
    result = collection.insert_one(data)
    return str(result.inserted_id)

def delete_game(id):
    try:
        result = collection.delete_one({"_id": ObjectId(id)})
        return result.deleted_count
    except InvalidId:
        return 0

def update_game(id, data):
    try:
        result = collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": {
                "nombre": data["nombre"],
                "genero": data["genero"],
                "precio": data["precio"],
                "imagenUrl": data["imagenUrl"]
            }}
        )
        return result.modified_count
    except InvalidId:
        return 0