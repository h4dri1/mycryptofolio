/**
 * @swagger
* /v1/cryptos/{vs}/{nb}:
*   get:
*     tags: [Cryptos]
*     summary: Get top cryptos
*     description: Get trop cryptos and choose who much you will receive
*     parameters:
*     - name: "vs"
*       in: "path"
*       type: string
*       required: true
*       description: Fiat currency
*     - name: "nb"
*       in: "path"
*       type: integer
*       required: true
*       description: Number of cryptos
*     responses:
 *       200:
 *         description: Top cryptos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                        type: string  
 *                        description: crypto id
 *                        example: bitcoin
 *                 symbol:
 *                        type: string
 *                        description: crypto symbol
 *                        example: btc
 *                 name:
 *                        type: string
 *                        description: crypto name
 *                        example: Bitcoin
 *                 ...:
 *                        type: string
 *                        description: crypto ...
 *                        example: ...
*/