from flask import Flask, request, jsonify
from flask_cors import CORS
from models.game_model import get_all_games, create_game, delete_game, update_game

app = Flask(__name__)
CORS(app)
@app.route('/')
def inicio():
    return "API Videojuegos funcionando GG"

@app.route('/games', methods=['GET'])
def get_games():
    games = get_all_games()
    return jsonify(games), 200


@app.route('/games', methods=['POST'])
def add_game():
    data = request.json
    game_id = create_game(data)
    return jsonify({
        "message": "Videojuego agregado",
        "id": game_id
    }), 201

@app.route('/games/<id>', methods=['DELETE'])
def delete_game_route(id):
    deleted_count = delete_game(id)
    if deleted_count > 0:
        return jsonify({"message": "Juego eliminado correctamente"}), 200
    else:
        return jsonify({"message": "Juego no encontrado"}), 404

@app.route('/games/<id>', methods=['PUT'])
def update_game_route(id):
    data = request.json
    modified_count = update_game(id, data)
    if modified_count > 0:
        return jsonify({"message": "Juego actualizado correctamente"}), 200
    else:
        return jsonify({"message": "No se realizaron cambios"}), 404

if __name__ == '__main__':
    app.run(debug=True)