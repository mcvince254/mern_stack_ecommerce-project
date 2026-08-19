import requests

BASE = "http://localhost:4300/api/v1"
product_id = "6a5f6dd09f8ce96d99122583"

with open("token.txt") as f:
    token = f.read().strip()

headers = {
    "Authorization": f"Bearer {token}"
}

data = {
    "rating": 2,
    "comment": "fake product! more fake",

}

response = requests.put(
    f"{BASE}/product/review/{product_id}",
    headers=headers,
    json=data,
    timeout=10
)

print(response.status_code)
print(response.text)