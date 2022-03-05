/**
 * @swagger
* /v1/cryptoprice/{id}/{vs}/{include_market_cap}/{include_24hr_vol}/{include_24hr_change}/{include_last_updated_at}:
*   get:
*     tags: [Cryptos]
*     summary: Get price history
*     description: Get price history for one crypto
*     parameters:
*     - name: "id"
*       in: "path"
*       type: string
*       required: true
*       description: Crypto ID
*     - name: "vs"
*       in: "path"
*       type: string
*       required: true
*       description: Fiat currency
*     - name: "include_market_cap"
*       in: "path"
*       type: string
*       description: market cap
*     - name: "include_24hr_vol"
*       in: "path"
*       type: integer
*       description: 24h Volume
*     - name: "include_24hr_change"
*       in: "path"
*       type: integer
*       description: 24h change
*     - name: "include_last_updated_at"
*       in: "path"
*       type: string
*       description: last update at
*     responses:
 *       200:
 *         description: History price
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 coin_id:
 *                        type: object
 *                        properties:
 *                          vs:
 *                                 type: integer
 *                                 description: price in the fiat devise
 *                                 example: 40781
 *                          vs_market_cap:
 *                                 type: integer
 *                                 description: market cap in the fiat devise
 *                                 example: 777887875454
 *                          vs_24h_vol:
 *                                 type: string
 *                                 description: 24h vol in fiat devise
 *                                 example: 2555566555
 *                          vs_24h_change:
 *                                 type: string
 *                                 description: 24h change in fiat devise
 *                                 example: -4.15
 *                          last_updated_at:
 *                                 type: string
 *                                 description: last update value
 *                                 example: 1646409524
*/         