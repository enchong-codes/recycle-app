from flask import Flask, request, jsonify
from flask_cors import CORS
import pointsmath
import hashlib
import os

app = Flask(__name__)
CORS(app)  # Allows React to make requests

USER_DATA_FILE = "user.txt"

# In-memory dictionary to store user points (simulating a database)
user_points = {}

# Hash function
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# Register user
def create_account(username, password, email, location):
    user_id = get_next_user_id()
    hashed_password = hash_password(password)
    user_data = f"{username},{hashed_password},{email},{user_id},0,0,{location}\n"

    with open(USER_DATA_FILE, "a") as file:
        file.write(user_data + "\n")

    # Initialize user points in memory
    user_points[user_id] = 0

    return {"message": f"Account for {username} created successfully!", "user_id": user_id, "user": username}

# Get next user ID
def get_next_user_id():
    if not os.path.exists(USER_DATA_FILE):
        return 1
    with open(USER_DATA_FILE, "r") as file:
        return sum(1 for _ in file) + 1

# User login
def login(username, password):
    hashed_password = hash_password(password)

    if not os.path.exists(USER_DATA_FILE):
        return {"error": "No user data found. Please create an account first."}, 400

    with open(USER_DATA_FILE, "r") as file:
        for line in file:
            stored_username, stored_hash, email, user_id, points, leaderboard, location = line.strip().split(",")
            if stored_username == username and stored_hash == hashed_password:
                # Initialize user points in memory if not already initialized
                if int(user_id) not in user_points:
                    user_points[int(user_id)] = 0
                return {"message": f"Login successful! Welcome back, {username}.", "user_id": user_id, "user": username}, 200

    return {"error": "Invalid username or password."}, 401

# Flask API Routes
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    if not all(k in data for k in ("username", "password", "email", "location")):
        return jsonify({"error": "Missing fields"}), 400

    result = create_account(data["username"], data["password"], data["email"], data["location"])
    return jsonify(result), 201

@app.route("/login", methods=["POST"])
def login_route():
    data = request.json
    if not all(k in data for k in ("username", "password")):
        return jsonify({"error": "Missing fields"}), 400

    result, status_code = login(data["username"], data["password"])
    return jsonify(result), status_code

@app.route("/submit-recycle", methods=["POST"])
def submit_recycle():
    # Get data from the request
    data = request.get_json()

    # Extract the action (recycled item), old points, and user_id from the request
    action = data.get("item")
    old_points = data.get("oldPoints", 0)  # Default to 0 if no points are sent
    user_id = data.get("userId")

    if action:
        # Update points with the function
        new_points = pointsmath.update_points(old_points, action)

        # Update the user's points in the in-memory dictionary
        user_points[user_id] = new_points  # Update the user's points

        return jsonify({"newPoints": new_points}), 200
    else:
        return jsonify({"error": "Missing action"}), 400

if __name__ == '__main__':
    app.run(debug=True, port=8080)
