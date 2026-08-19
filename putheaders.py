import requests
import json

#BASE = "https://mern-stack-ecommerce-project-91cd.onrender.com/api/v1" 

BASE = "http://localhost:4300/api/v1"

productId ="6a5f6dd19f8ce96d99122d4f"
orderId ="6a5fa8d8506313d70decf83f"


with open("token.txt") as f:
    token = f.read().strip()

headers = {
    "Authorization": f"Bearer {token}"
};

data = {"status":"Delivered"}

response = requests.put(
    f"{BASE}/admin/order/{orderId}",
#    params={
#     "id": productId
#     },
    headers=headers,
    json=data
);

try:
    print(json.dumps(response.json(), indent=4));
except ValueError:
    print("Response is not valid JSON:");
    print(response.text);