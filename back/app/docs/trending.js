/**
 * @swagger
* /v1/trending:
*   get:
*     tags: [Cryptos]
*     summary: Get trending crypto
*     description: Get top 5 trending cryptos on coingueko
*     responses:
*       200:
*         description: One cryptos
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 coins:
*                   type: object
*                   properties:
*                      item:
*                        type: object
*                        properties:
*                          id:
*                            type: string
*                            description: crypto id
*                            example: osmosis
*                          coin_id:
*                            type: integer
*                            description: coin id
*                            example: 16724
*                          name:
*                            type: string
*                            description: crypto name
*                            example: Osmosis
*                          symbol: 
*                            type: string
*                            description: crypto symbol
*                            example: OSMO
*                          maket_cap_rank:
*                            type: integer
*                            description: Rang market cap
*                            example: 41
*                          thumb:
*                            type: string
*                            description: pictures
*                            example: https://assets.coingecko.com/coins/images/16724/thumb/osmo.png?1632763885
*                          small:
*                            type: string
*                            description: pictures
*                            example: https://assets.coingecko.com/coins/images/16724/small/osmo.png?1632763885
*                          large:
*                            type: string
*                            description: pictures
*                            example: https://assets.coingecko.com/coins/images/16724/large/osmo.png?1632763885
*                          slug:
*                            type: string
*                            description: slug
*                            example: osmosis
*                          price_btc:
*                            type: integer
*                            description: price btc
*                            example: 0.00002
*                          score:
*                            type: integer
*                            description: score
*                            example: 0
*/    