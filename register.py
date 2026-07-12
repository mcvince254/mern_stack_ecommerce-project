import requests

url = "http://localhost:4300/api/v1/register"

payload = {
    "name": "Admin",
    "email": "admin@example.com",
    "password": "12345678",
    "role":"admin"
}

response = requests.post(url, json=payload)

print("Status Code:", response.status_code)
print("Response:")
print(response.text)