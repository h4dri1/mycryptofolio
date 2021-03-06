/**
 * @swagger
 * /v1/signup:
 *   post:
 *     tags: [Auth]
 *     summary: Signup.
 *     description: Signup for use portfolio.
 *     requestBody:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     required: true
 *                     description: The user's email.
 *                     example: mail@mail.fr
 *                   nickname:
 *                     type: string
 *                     required: true
 *                     description: The user's pseudo.
 *                     example: superPseudo
 *                   password:
 *                     type: string
 *                     required: true
 *                     description: The user's password.
 *                     example: password
 *                   passwordCheck:
 *                     type: string
 *                     required: true
 *                     description: The user's password check.
 *                     example: password
 *                   picture:
 *                     type: string
 *                     description: The user's pictures url.
 *                     example: null
 *     responses:
 *       200:
 *         description: connected status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                        type: string  
 *                        description: Welcome message.
 *                        example: Bienvenue test
 *                 refreshToken:
 *                        type: string
 *                        description: JWT Refresh Token.
 *                        example: eyJhbGciOiJIUzI1PiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRlc3RAdGVzdC5RciIsIm5pY2tuYW1lIjoidGVzdCIsInBpY3R1cmUiOiJodHRwczovL2Nkbi5pY29uLWljb25zLmNvbS9pY29uczIvMTM3MS9QTkcvNTEyL3JvYm90MDNfOTA4MzMucG5nIn0sImlhdCI6MTYHYrD1MjU5NCwiZXhwIjoxNjQ4OTQ0NTk0fQ.TnJC6Ll2U8uzoRU7Qm9fju8kI88j8WWmsUYwhwo1kOA
 *                 id:
 *                        type: integer
 *                        description: User ID
 *                        example: 2
*/