# This file will be filled with details later

## Routes

deployed URL <https://munchkin-auth.herokuapp.com>

1. POST  /signup  (only username and password is required, user role will be default to 'user', will block user from sign up as admin)

2. POST  /adminsignup  (bearer token required. username, password and role=admin are required, admin can only be added by another admin)

3. POST  /signin (only username and password is required, expect a JWT in return under the 'token' key)

4. GET /allusers  (only admin has access. )

5. GET /user/:id ( Admin can get any user's detailed info, users can only get their own info)

6. PATCH /user/:id/password ( Users can update their password, currently only the password could be updated. Admin can update anyone's password)

7. DELETE /user/:id ( Users can delete their account. Admin can delete anyone's account)

8. POST /gamesignin  ( route for game server to validate user's login. TBD)
