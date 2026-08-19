import requests

BASE = "http://localhost:4300/api/v1"

user_id = "6a5e61a4203bbac11194fae2"

url = f"{BASE}/admin/users/{user_id}"

payload = {
    "role": "admin"
}

response = requests.put(url, json=payload)

print("Status:", response.status_code)
print(response.text)