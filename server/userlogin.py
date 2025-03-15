import hashlib

USER_DATA_FILE = "user.txt"

def hash_password(password):
    """Hashes a password using SHA-256."""
    return hashlib.sha256(password.encode()).hexdigest()

def create_account(username, password, email, location):
    """Creates a new user account and stores it in user.txt."""
    user_id = get_next_user_id()
    hashed_password = hash_password(password)

    user_data = f"{username},{hashed_password},{email},{user_id},0,0,{location}\n"

    with open(USER_DATA_FILE, "a") as file:
        file.write(user_data)

    print(f"Account for {username} created successfully!")

def get_next_user_id():
    """Finds the next available user ID by counting lines in the file."""
    try:
        with open(USER_DATA_FILE, "r") as file:
            return sum(1 for _ in file) + 1
    except FileNotFoundError:
        return 1  # Start user IDs at 1

def login(username, password):
    """Logs in a user by checking credentials in user_data.txt."""
    hashed_password = hash_password(password)

    try:
        with open(USER_DATA_FILE, "r") as file:
            for line in file:
                stored_username, stored_hash, email, user_id, points, leaderboard, location = line.strip().split(",")
                if stored_username == username and stored_hash == hashed_password:
                    print(f"Login successful! Welcome back, {username}.")
                    return True
        print("Invalid username or password.")
        return False
    except FileNotFoundError:
        print("No user data found. Please create an account first.")
        return False

# Example Usage
if __name__ == "__main__":
    while True:
        choice = input("Do you want to (1) Create an account or (2) Log in? ")
        if choice == "1":
            uname = input("Enter username: ")
            pwd = input("Enter password: ")
            email = input("Enter email: ")
            location = input("Enter location: ")
            create_account(uname, pwd, email, location)
        elif choice == "2":
            uname = input("Enter username: ")
            pwd = input("Enter password: ")
            login(uname, pwd)