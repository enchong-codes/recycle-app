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

def get_user_data(user_id):
    """Retrieves the user data from the user.txt file based on user_id."""
    if not os.path.exists(USER_DATA_FILE):
        return None

    with open(USER_DATA_FILE, "r") as file:
        for line in file:
            user_data = line.strip().split(",")
            if len(user_data) >= 7 and user_data[3] == str(user_id):  # Match user_id (4th column)
                return {
                    "username": user_data[0],
                    "password": user_data[1],
                    "email": user_data[2],
                    "user_id": user_data[3],
                    "points": int(user_data[4]),  # Points are at index 4
                    "leaderboard": int(user_data[5]),
                    "location": user_data[6]
                }
    return None

@app.route('/leaderboard', methods=['GET'])
def leaderboard():
    try:
        # Open and read the user.txt file
        with open('user.txt', 'r') as file:
            users = file.readlines()

        leaderboard = []
        for user in users:
            # Skip empty lines or lines with incorrect number of parts
            parts = user.split(',')
            if len(parts) != 7:
                print(f"Skipping malformed line: {user.strip()}")
                continue  # Skip this line if it doesn't have exactly 7 parts
            
            leaderboard.append({
                'username': parts[0].strip(),
                'points': int(parts[4].strip())  # Points are at index 4 in your file
            })

        # Sort leaderboard by points in descending order
        leaderboard = sorted(leaderboard, key=lambda x: x['points'], reverse=True)

        return jsonify(leaderboard)

    except Exception as e:
        print("Error reading file:", e)
        return jsonify({'error': 'Unable to load leaderboard'}), 500


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
    
    if status_code == 200:  # Only proceed if login was successful
        user_id = result["user_id"]
        user_data = get_user_data(user_id)  # Retrieve user data including points
        result["points"] = user_data["points"]  # Add points to the result
        
    return jsonify(result), status_code


@app.route("/submit-recycle", methods=["POST"])
def submit_recycle():
    data = request.get_json()

    # Extract item, old points, and user ID from the request
    action = data.get("item")
    old_points = data.get("oldPoints", 0)  # Default to 0 if missing
    user_id = str(data.get("userId"))  # Ensure it's a string for matching

    if action:
        # Update points
        new_points = pointsmath.update_points(old_points, action)

        # Update the file to save new points
        update_user_points(user_id, new_points)

        # Update in-memory storage
        user_points[user_id] = new_points  

        return jsonify({"newPoints": new_points}), 200
    else:
        return jsonify({"error": "Missing action"}), 400

def update_user_points(user_id, new_points):
    """Updates the user's points in user.txt."""
    users = []

    # Read user data and update points
    with open(USER_DATA_FILE, "r") as file:
        for line in file:
            # Skip empty lines
            if not line.strip():
                continue

            user_data = line.strip().split(",")
            
            # Ensure the line has enough data (7 columns expected)
            if len(user_data) < 7:
                print(f"Skipping malformed line: {line}")
                continue

            if user_data[3] == user_id:  # Match user_id (4th column)
                user_data[4] = str(new_points)  # Update points
            users.append(user_data)

    # Rewrite the updated user data back to file
    with open(USER_DATA_FILE, "w") as file:
        for user in users:
            file.write(",".join(user) + "\n")

    print(f"Updated points for User ID {user_id} to {new_points}")



if __name__ == '__main__':
    app.run(debug=True, port=8080)
