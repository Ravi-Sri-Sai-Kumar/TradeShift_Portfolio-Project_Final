1. User Registration
POST http://localhost:8080/api/auth/register

Headers:
Content-Type: application/json

Body:

json
{
  "username": "johndoe",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "gender": "M",
  "dateOfBirth": "1990-06-15",
  "phoneNumber": "9999888877",
  "email": "john@gmail.com",
  "role": "USER",
  "accountType": "TRADER"
}
2. User Login
POST http://localhost:8080/api/auth/login

Headers:
Content-Type: application/json

Body:

json
{
  "username": "johndoe",
  "password": "password123"
}
Returns: JWT token (use in next requests)

3. User Profile (Get)
GET http://localhost:8080/api/auth/profile

Headers:
Authorization: Bearer <JWT_TOKEN_FROM_LOGIN>

4. User Update
PUT http://localhost:8080/api/auth/update

Headers:
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN_FROM_LOGIN>

Body: (update any fields; username is usually required)

json
{
  "username": "johndoe",
  "firstName": "John",
  "lastName": "Smith",
  "email": "johnsmith@gmail.com",
  // ...other fields to update
}
5. Get Portfolio(s)
GET http://localhost:8080/api/portfolio

Headers:
Authorization: Bearer <JWT_TOKEN_FROM_LOGIN>

6. Get Single Portfolio By ID
GET http://localhost:8080/api/portfolio/{id}

Headers:
Authorization: Bearer <JWT_TOKEN_FROM_LOGIN>

7. Create/Place Order
POST http://localhost:8080/api/portfolio/{portfolioId}/orders

Headers:
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN_FROM_LOGIN>

Body:

json
{
  "symbol": "AAPL",
  "type": "BUY",
  "quantity": 100,
  "price": 182.52
}
8. Get All Orders (by Portfolio)
GET http://localhost:8080/api/portfolio/{portfolioId}/orders

Headers:
Authorization: Bearer <JWT_TOKEN_FROM_LOGIN>

9. Get Asset(s) in Portfolio
GET http://localhost:8080/api/portfolio/{portfolioId}/assets

Headers:
Authorization: Bearer <JWT_TOKEN_FROM_LOGIN>
