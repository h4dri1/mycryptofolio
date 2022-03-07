/**
 * @swagger
* /v1/portfolio/wallet/{wid}:
*   post:
*     tags: [Portfolio]
*     security:             
*     - bearerAuth: []   
*     summary: Add or update transaction
*     description: Update an existant transaction or add a new one
*     parameters:
*     - name: "wid"
*       in: "path"
*       type: string
*       required: true
*       description: Wallet id
*     requestBody:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Transaction ID
 *                     example: 8
 *                   buy:
 *                     type: string
 *                     required: true
 *                     description: True for buy False for sell
 *                     example: true
 *                   buy_date:
 *                     type: string
 *                     required: true
 *                     description: Date of buy timestamp
 *                     example: Fri Jan 28 2022 15:20:46 GMT+0100
 *                   coin_id:
 *                     type: string
 *                     required: true
 *                     description: coin id
 *                     example: bitcoin
 *                   price:
 *                     type: integer
 *                     required: true
 *                     description: buy price
 *                     example: 42233
 *                   quantity:
 *                     type: integer
 *                     required: true
 *                     description: quantity of nuy
 *                     example: 2
 *                   symbol:
 *                     type: string
 *                     required: true
 *                     description: symbol of crypto
 *                     example: btc
*     responses:
*       200:
*         description: Portfolio by wallet
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                     id:
*                       type: string
*                       description: coin id
*                       example: 01coin
*                     symbol:
*                       type: string
*                       description: crypto symbol
*                       example: zoc
*                     buy: 
*                       type: string
*                       description: buy or sell (true/false)
*                       example: true
*                     price:
*                       type: integer
*                       description: price
*                       example: 1.3
*                     quantity:
*                       type: integer
*                       description: quantity buy
*                       example: 56900
*                     buy_date:
*                       type: string
*                       description: buy date
*                       example: 2022-01-28T14:20:46.000Z                 
*/