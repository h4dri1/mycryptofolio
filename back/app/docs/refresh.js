/**
 * @swagger
* /v1/jwt/refresh/{token}:
*   get:
*     summary: Get new Access Token
*     description: Get new Access Token if Refresh Token is valide.
*     parameters:
*     - name: "token"
*       in: "path"
*       type: string
*       required: true
*       description: Refresh Token
*     responses:
*       200:
*         description: Status reponse
*         content:
*             application/json:
*                 schema:
*                     type: object
*                 properties:
*                 status:
*                 type: string  
*                 description: success message
*                 example: token refresh ok
*/