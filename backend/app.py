from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash

app = Flask(__name__)
CORS(app) 

app.secret_key = "assignment_manan"

client = MongoClient("mongodb+srv://mananAssignment:mananMongo123@cluster0.tliuq6e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

db = client["assignment_db"]  
collection = db["users"]  

@app.route('/')
def welcome():
    return "Hello"

@app.route('/users/add', methods = ['POST'])
def add_user():
    _json = request.json
    id = _json.get('id')
    name = _json.get('name')
    email = _json.get('email')
    password = _json.get('password')

    if not all ([id, name, email, password]):
        return jsonify(message = "Missing Required Fields"), 400
    
    if collection.find_one({'email': email}):
        return jsonify(message = "User with this email already exists"), 409
    
    hashed_password = generate_password_hash(password)

    user = {
        "id" : id,
        "name" : name, 
        "email" : email, 
        "password" : hashed_password
    }

    result = collection.insert_one(user)
    return jsonify(message = "User added successfully"), 201


@app.route('/users', methods = ['GET'])
def get_users():
    users = collection.find()

    user_list = []
    for user in users:
        user_info = {
            'id' : user.get("id"),
            'name' : user.get("name"),
            'email' : user.get("email"),
        }
        user_list.append(user_info)

    return jsonify(user_list), 200


@app.route('/users/<user_id>', methods = ['GET'])
def get_user_by_id(user_id):
    try:
        user = collection.find_one({"id": user_id})
        if user:
            user['_id'] = str(user['_id'])
            return jsonify(user), 200
        else:
            return jsonify({'error': 'user not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@app.route('/users/<user_id>', methods = ['PUT'])
def update_user(user_id):
    try:
        data = request.get_json()
        data.pop('_id', None)
        if 'password' in data:
            data['password'] = generate_password_hash(data['password'])
        result = collection.update_one({'id': user_id}, {'$set':data})

        if result.modified_count == 0:
            return jsonify({'error': 'No data changed'}), 404
        
        return jsonify({'message': 'User updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
            

@app.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        result = collection.delete_one({"id": user_id})
        
        if result.deleted_count == 0:
            return jsonify({'error': 'User not found'}), 404  
          
        return jsonify({'message': 'User deleted successfully'}), 200 
    except Exception as e:
        return jsonify({'error': str(e)}), 500 

if __name__ == "__main__":
    app.run(debug=True)