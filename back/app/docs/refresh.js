/**
 * @swagger
* /v1/jwt/refresh/{token}:
*   get:
*     tags: [Auth]
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
*                   id:
*                     type: string  
*                     description: crypto id
*                     example: bitcoin
*/