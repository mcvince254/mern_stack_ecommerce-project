import requests
import json

BASE = "http://localhost:4300/api/v1"

productId = "6a4bd500a8059ebe239b26ca"
reviewId    = "6a4eb8e5a393b84b1c4c18ba"

with open("token.txt") as f:
    token = f.read().strip()

headers = {
    "Authorization": f"Bearer {token}"
}

response = requests.delete(
    f"{BASE}/reviews",
    params={
        "productId": productId,
        "id": reviewId
    },
    headers=headers
)

print("Status Code:", response.status_code)

try:
    print(json.dumps(response.json(), indent=4))
except ValueError:
    print("Response is not valid JSON:")
    print(response.text)