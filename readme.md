### Register
```
curl -X POST http://localhost:3000/register \
     -H "Content-Type: application/json" \
     -d '{
           "username": "testuser",
           "password": "password123",
           "email": "testuser@example.com",
           "role": "admin",
           "fullName": "John Doe",
           "profileImage": "https://example.com/profile.jpg",
           "permissions": ["read", "write", "delete"]
         }'
```
### Login
```
curl -X POST http://localhost:3000/login \
     -H "Content-Type: application/json" \
     -d '{
           "username": "testuser",
           "password": "password123"
         }'
```
### Get user details
```
curl -X GET http://localhost:3000/user \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsImVtYWlsIjoidGVzdHVzZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwiY3JlYXRlZEF0IjoiMjAyNS0wMi0xOCAwNjozNTowNSIsInByb2ZpbGVJbWFnZSI6Imh0dHBzOi8vZXhhbXBsZS5jb20vcHJvZmlsZS5qcGciLCJwZXJtaXNzaW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXSwiaWF0IjoxNzM5ODYwNTg3LCJleHAiOjE3Mzk4NjQxODd9.arPucIiHa-fvn2EA9HeyUoV6xcPqO6EW0JluWIfvFf8"
```