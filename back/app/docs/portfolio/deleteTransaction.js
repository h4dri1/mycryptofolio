/**
 * @swagger
* /v1/portfolio/transaction/{tid}:
*   delete:
*     tags: [Portfolio]
*     security:             
*     - bearerAuth: []   
*     summary: Delete one transaction
*     description: Delete one transaction by id
*     parameters:
*     - name: "tid"
*       in: "path"
*       type: string
*       required: true
*       description: Transaction id
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