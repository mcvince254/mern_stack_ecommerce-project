import requests
import json

#BASE = "https://mern-stack-ecommerce-project-91cd.onrender.com/api/v1" 

BASE = "http://localhost:4300/api/v1"

productId = "6a5f6dd19f8ce96d99122d4f"
orderId = "6a5fa5cf506313d70decf44d"


with open("token.txt") as f:
    token = f.read().strip()

headers = {
    "Authorization": f"Bearer {token}"
};

response = requests.delete(
    f"{BASE}/admin/order/{orderId}",
#    params={
#     "id": productId
#     },
    headers=headers
);

try:
    print(json.dumps(response.json(), indent=4))
except ValueError:
    print("Response is not valid JSON:")
    print(response.text)