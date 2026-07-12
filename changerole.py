import requests

BASE = "http://localhost:4300/api/v1"

user_id = "6a510dabe8e84874fbec81f7"

url = f"{BASE}/admin/users/{user_id}"

payload = {
    "role": "admin"
}

response = requests.put(url, json=payload)

print("Status:", response.status_code)
print(response.text)