import requests
import json

BASE = "http://localhost:4300/api/v1"

productId = "6a5f6dd19f8ce96d99122d4f"

# Read JWT token
with open("token.txt", "r") as f:
    token = f.read().strip()

headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}

payload = {
    "shippingInfo": {
        "address": "123 ndumbd",
        "city": "Nairobi",
        "state": "Nairobi",
        "phoneNo": "0712345678",
        "country": "Kenya"
    },
    "orderItems": [
        {
            "name": "Test Product",
            "price": 18888888800,
            "quantity": 2,
            "image": "https://example.com/product.jpg",
            "product": productId
        }
    ],
    "paymentInfo": {
        "id": "TEST_PAYMENT_001",
        "status": "Processing"
    },
    "itemPrice": 3000,
    "shippingPrice": 200,
    "taxPrice": 480,
    "totalPrice": 3680
}

response = requests.post(
    f"{BASE}/new/order",
    headers=headers,
    json=payload
)

print(f"Status Code: {response.status_code}")

try:
    print(json.dumps(response.json(), indent=4))
except Exception:
    print(response.text)