/**
 * @swagger
* /v1/logout/{token}:
*   get:
*     security:             
*     - bearerAuth: []   
*     summary: Logout.
*     description: Logout.
*     parameters:
*     - name: "token"
*       in: "path"
*       type: string
*       required: true
*       description: Refresh Token
*     responses:
*       200:
*         description: Logout status
*         content:
*             application/json:
*                 schema:
*                     type: object
*                 properties:
*                 status:
*                 type: string  
*                 description: Logout message.
*                 example: Lougout OK
*/