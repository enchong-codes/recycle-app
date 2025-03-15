from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/login", methods=["GET"])
def home():
    return jsonify({"message": "Server is running!"})

if __name__ == "__main__":
    app.run(debug=True, port=8080)
