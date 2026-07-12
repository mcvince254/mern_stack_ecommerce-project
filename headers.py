import requests
import json

#BASE = "https://mern-stack-ecommerce-project-91cd.onrender.com/api/v1" 

BASE = "http://localhost:4300/api/v1"

productId = "6a4bd500a8059ebe239b26ca"

with open("token.txt") as f:
    token = f.read().strip()

headers = {
    "Authorization": f"Bearer {token}"
}

response = requests.get(
    f"{BASE}/products"
#    params={
#     "id": productId
#     },
#     headers=headers
)

try:
    print(json.dumps(response.json(), indent=4))
except ValueError:
    print("Response is not valid JSON:")
    print(response.text)