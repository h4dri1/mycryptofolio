/**
 * @swagger
* /v1/cryptos:
*   get:
*     tags: [Cryptos]
*     summary: Get all crypto
*     description: Get all cryptos with id and name, WARNING very long !
*     responses:
*       200:
*         description: One cryptos
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: integer  
*                   description: crypto id
*                   example: 1
*                 coin_id:
*                   type: string
*                   description: coin id
*                   example: 01coin
*                 symbol:
*                   type: string
*                   description: crypto symbol
*                   example: zoc
*                 logo: 
*                   type: string
*                   description: logo url
*                   example: null
*                 price:
*                   type: integer
*                   description: price
*                   example: null
*/