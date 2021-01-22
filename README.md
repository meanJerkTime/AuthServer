# This file will be filled with details later

## Routes

1. POST  /signup  (only username and password is required, user role will be default to 'user')

2. POST  /signin (only username and password is required, expect a JWT in return under the 'token' key)

3. GET /allusers  (only admin has access. Will show how to register admin later )

4. GET /user/:id ( Admin can get any user's detailed info, users can only the their own info)

5. PATCH /user/:id/password ( Users can update their password, currently only the password could be updated. Admin can update anyone's password)

6. DELETE /user/:id ( Users can delete their account. Admin can delete anyone's account)

7. POST /gamesignin  ( route for game server to validate user's login)
