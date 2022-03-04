/**
 * @swagger
* /v1/portfolio/wallet/{wid}:
*   delete:
*     tags: [Portfolio]
*     security:             
*     - bearerAuth: []   
*     summary: Delete one wallet
*     description: Delete one wallet by id
*     parameters:
*     - name: "wid"
*       in: "path"
*       type: string
*       required: true
*       description: wallet id
*     responses:
*       200:
*         description: Status message
*         content:
*           application/json:
*             schema:
*               type: object
*               description: status message
*               example: delete ok
*/