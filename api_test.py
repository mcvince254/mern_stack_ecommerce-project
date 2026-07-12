import json
import requests

BASE = "http://localhost:4300/api/v1"

response = requests.get(f"{BASE}/products")

print("Status:", response.status_code)
print(json.dumps(response.json(), indent=4))