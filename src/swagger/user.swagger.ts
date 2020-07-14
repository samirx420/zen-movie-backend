/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 * 
 */

 
 /**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     tags:
 *       - Users
 *     description: Login user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User login parameters
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: User login response
 *       400:
 *         description: Error
 *     security:
 *       - apiKey: []
 */

 
 /**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     tags:
 *       - Users
 *     description: Register a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: first_name
 *         in: formData
 *         description: User first name
 *         required: true
 *         type: string
 *       - name: last_name
 *         in: formData
 *         description: User last name
 *         required: true
 *         type: string
 *       - name: username
 *         in: formData
 *         description: User username
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: User password
 *         required: true
 *         type: string
 *       - name: avatar
 *         in: formData
 *         description: User's avatar file
 *         required: false
 *         type: file
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: User register response
 *       400:
 *         description: Error
 *     security:
 *       - apiKey: []
 */

 
 /**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *     tags:
 *       - Users
 *     description: get current user from jwt token
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: return logged in user object
 *       400:
 *         description: Error
 *     security:
 *       - apiKey: []
 *       - jwt: []
 */

 
 
 /**
 * @swagger
 * /api/v1/users/me:
 *   put:
 *     tags:
 *       - Users
 *     description: Update user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: first_name
 *         in: formData
 *         description: User first name
 *         required: false
 *         type: string
 *       - name: last_name
 *         in: formData
 *         description: User last name
 *         required: false
 *         type: string
 *       - name: password
 *         in: formData
 *         description: User password
 *         required: false
 *         type: string
 *       - name: avatar
 *         in: formData
 *         description: User's avatar file
 *         required: false
 *         type: file
 *     responses:
 *       204:
 *         description: Successfully updated
 *       400:
 *         description: Error
 *     security:
 *       - apiKey: []
 *       - jwt: []
 */
