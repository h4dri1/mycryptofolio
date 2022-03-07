/**
 * @swagger
* /v1/portfolio:
*   get:
*     security:              
*      - bearerAuth: []
*     summary: Get portfolio
*     tags: [Portfolio]
*     description: Get portfolio dashboard
*     responses:
*       200:
*         description: Portfolio
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 transaction:
*                   type: object  
*                   properties:
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
*                 distribution:
*                   type: object  
*                   properties:
*                     name:
*                       type: string
*                       description: coin name
*                       example: 01coin
*                     quantity:
*                       type: integer
*                       description: quantity buy
*                       example: 5900
*                     value: 
*                       type: integer
*                       description: actual value
*                       example: 1500
*                     distribution:
*                       type: integer
*                       description: distribution
*                       example: 100
*                 performance:
*                   type: object  
*                   properties:
*                     investment:
*                       type: string
*                       description: Sum investment
*                       example: 5600
*                     actual_value:
*                       type: integer
*                       description: Actual value for the wallet
*                       example: 59000
*                     pnl: 
*                       type: integer
*                       description: actual value of profit or loose
*                       example: 1500
*                 wallet:
*                   type: object  
*                   properties:
*                     id:
*                       type: integer
*                       description: wallet id
*                       example: 1
*                     sum:
*                       type: integer
*                       description: Actual value for the wallet
*                       example: 59000
*                     label: 
*                       type: string
*                       description: name of the wallet
*                       example: wallet1
*/