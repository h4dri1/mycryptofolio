/**
 * @swagger
* /v1/history/{coinId}/{day-}{month-}{year}:
*   get:
*     tags: [Cryptos]
*     summary: Get price history
*     description: Get price history for one crypto
*     parameters:
*     - name: "coinId"
*       in: "path"
*       type: string
*       required: true
*       description: Crypto ID
*     - name: "day-"
*       in: "path"
*       type: string
*       required: true
*       description: Day
*     - name: "month-"
*       in: "path"
*       type: string
*       required: true
*       description: Month
*     - name: "year"
*       in: "path"
*       type: integer
*       required: true
*       description: Year
*     responses:
 *       200:
 *         description: History price
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
 *                 localization:
 *                        type: string
 *                        description: ...
 *                        example: ...
 *                 ...:
 *                        type: string
 *                        description: ...
 *                        example: ...
*/