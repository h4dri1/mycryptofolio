/**
 * @swagger
* /v1/crypto/{id}/{nbd}:
*   get:
*     tags: [Cryptos]
*     summary: Get one crypto
*     description: Get one crypto and choose who much days of price you want
*     parameters:
*     - name: "id"
*       in: "path"
*       type: string
*       required: true
*       description: Crypto
*     - name: "nbd"
*       in: "path"
*       type: integer
*       description: Number of days
*     responses:
 *       200:
 *         description: One cryptos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties: 
 *                      id:
 *                        type: string  
 *                        description: crypto id
 *                        example: bitcoin
 *                      symbol:
 *                        type: string
 *                        description: crypto symbol
 *                        example: btc
 *                      name:
 *                        type: string
 *                        description: crypto name
 *                        example: Bitcoin
 *                      ...:
 *                        type: string
 *                        description: crypto ...
 *                        example: ...
 *                 chart:
 *                   type: object
 *                   properties: 
 *                      prices:
 *                        type: string  
 *                        description: price
 *                        example: ...
 *                      market_caps:
 *                        type: string
 *                        description: market caps
 *                        example: ...
 *                      total_volumes:
 *                        type: string
 *                        description: total volume
 *                        example: ...
*/                 