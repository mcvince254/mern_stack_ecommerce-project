import json
import requests

#BASE = "https://mern-stack-ecommerce-project-91cd.onrender.com/api/v1"
BASE = "http://localhost:4300/api/v1"

data = {
    "email": "admin@example.com",
    "password": "12345678"
}

response = requests.post(f"{BASE}/login", json=data)
result = response.json()

if "token" in result:
    with open("token.txt", "w") as f:
        f.write(result["token"])

    print("Token saved to token.txt")
else:
    print(result)