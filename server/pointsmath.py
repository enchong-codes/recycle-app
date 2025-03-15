


def update_points(old_points, action):
    """Updates the user's points total based on their streak and recycling action."""
    
    # Define point values for different recyclable items
    recycling_points = {
        "591mL Plastic Bottle": 3,
        "2L Plastic Bottle": 10,
        "4L Plastic Jug": 15,
        "Detergent Bottle": 8,
        "Shampoo/Conditioner Bottle": 6,
    }

    # Get the points for the action
    add_points = recycling_points.get(action, 0)


    # Calculate new points total
    current_points = add_points + old_points

    return current_points

# Example Usage
old_points = 0
action = ()

new_points = update_points(old_points, action)
print(f"New Points Total: {new_points}")


USER_DATA_FILE = "user.txt"


def update_rank(username, add_points):
    """Updates the user's points and reorders the leaderboard based on new scores."""
    users = []

    # Read current user data
    with open(USER_DATA_FILE, "r") as file:
        for line in file:
            user_data = line.strip().split(",")
            if user_data[0] == username:
                new_points = int(user_data[4]) + add_points  # Update points
                user_data[4] = str(new_points)  # Set new points
            users.append(user_data)

    # Sort users by points in descending order and update leaderboard positions
    users.sort(key=lambda x: int(x[4]), reverse=True)
    for index, user in enumerate(users):
        user[5] = str(index + 1)  # Set new leaderboard ranking

    # Write updated data back to the file
    with open(USER_DATA_FILE, "w") as file:
        for user in users:
            file.write(",".join(user) + "\n")

    print(f"Updated {username}'s points. New leaderboard ranking applied.")

# Example Usage
if __name__ == "__main__":
    uname = input("Enter username: ")
    points_to_add = int(input("Enter points to add: "))
    update_rank(uname, points_to_add)