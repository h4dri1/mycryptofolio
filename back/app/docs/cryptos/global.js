/**
 * @swagger
* /v1/global:
*   get:
*     tags: [Cryptos]
*     summary: Get gobal data
*     description: Get global data for crypto market
*     responses:
*       200:
*         description: Gobal data
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                   type: object
*                   properties: 
*                      active_cryptocurrencies:
*                        type: integer  
*                        description: Number of active cryptos
*                        example: 12977
*                      upcoming_icos:
*                        type: string
*                        description: icos
*                        example: 0
*                      ended_icos:
*                        type: string
*                        description: icos
*                        example: 3376
*                      markets: 
*                        type: string
*                        description: market
*                        example: 764
*                      total_market_cap:
*                        type: object
*                        properties:
*                           btc:
*                             type: interger
*                             description: total market cap
*                             example: 46247529
*                      total_volume:
*                        type: object
*                        properties:
*                           btc:
*                             type: interger
*                             description: volume total
*                             example: 46247529
*                      market_cap_percentage:
*                        type: object
*                        properties:
*                           btc:
*                             type: interger
*                             description: market cap percentage
*                             example: 40
*/