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
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsImVtYWlsIjoidGVzdHVzZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzk4NjY4ODQsImV4cCI6MTczOTg3MDQ4NH0.lRNj_zgW2vBYdeBs2OkrN-UHCwGMVFWZqpwO_a7S1xs"
```

### Get refresh-token
```
curl -X POST http://localhost:3000/refresh-token \
     -H "Content-Type: application/json" \
     -d '{ "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM5ODY2NzE1LCJleHAiOjE3NDA0NzE1MTV9.ub9yS5qGuhV6Hox8EdaKDapNjaqzdEQHEvaQ_Hesg2Q" }'

```