/**
 * @swagger
* /v1/portfolio/wallet:
*   post:
*     tags: [Portfolio]
*     security:             
*     - bearerAuth: []   
*     summary: Add or update wallet
*     description: Update an existant wallet or add a new one
*     requestBody:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Wallet ID
 *                     example: 8
 *                   label:
 *                     type: string
 *                     required: true
 *                     description: Name of the wallet
 *                     example: Cool wallet
*     responses:
*       200:
*         description: Portfolio by wallet
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
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