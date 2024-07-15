import { Router } from 'express'
import { createProduct, deleteProduct, getProducts, updateAvailability, updateProduct, getProductsById } from './handlers/product';
import { body, param } from "express-validator";
import { handleInputErrors } from './middleware';
const router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type : object
 *              properties:
 *                  id: 
 *                      type : integer
 *                      description: The Product ID
 *                      example : 1
 *                  name:
 *                      type : string
 *                      description: The Product Name
 *                      example : Monitor Curvo de 34 Pulgadas
 *                  price: 
 *                      type : number
 *                      description: The Product Price
 *                      example : 300
 *                  availability: 
 *                      type : boolean
 *                      description: The Product availability
 *                      example : true
 */


/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Product'
 * 
*/
router.get('/', getProducts);
/**
 * @swagger 
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path 
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses: 
 *              200:
 *                  description: Succesful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not Found
 *                      
 *              400:
 *                  description: Bad Request - Invalid ID
 */
router.get('/:id',
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    getProductsById
);
/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Create a new product
 *          tags:
 *              - Products
 *          description: Returns a new record in the database
 *          requestBody: 
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name: 
 *                                  type: string
 *                                  example: "Monitor curvo 49 Pulgadas"
 *                              price: 
 *                                  type: number
 *                                  example: 399
 *          responses:  
 *              201:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema :
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request- Invalid input data
 */
router.post('/', 
        //Validacion
        body( "name" )
                .notEmpty().withMessage( "El nombre del producto no puede ir vacio" ),
        body( "price" )
                .isNumeric().withMessage("Valor no valido")
                .notEmpty().withMessage( "El precio del producto no puede ser vacio" )
                .custom( ( value ) => value > 0 ).withMessage("Precio no valido"),
    handleInputErrors,
    createProduct
);

/**
 * @swagger
 *  /api/products/{id}:
 *      put:
 *          summary: Updates a product with user input
 *          tags:
 *              - Products
 *          description: Returnns the updated product
 *          parameters:
 *            - in: path 
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody: 
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name: 
 *                                  type: string
 *                                  example: "Monitor curvo 49 Pulgadas"
 *                              price: 
 *                                  type: number
 *                                  example: 399
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema :
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: bad Request - Invalid input data
 *              404:
 *                  description: Product Not Found
 *  
 * 
 */

router.put('/:id',
    param("id").isInt().withMessage("ID no valido"),
    body( "name" )
        .notEmpty().withMessage( "El nombre del producto no puede ir vacio" ),
    body( "price" )
        .isNumeric().withMessage("Valor no valido")
        .notEmpty().withMessage( "El precio del producto no puede ser vacio" )
        .custom( ( value ) => value > 0 ).withMessage("Precio no valido"),
    body("availability")
        .isBoolean().withMessage("Valor para disponibilidad no valido"),
    handleInputErrors,
    updateProduct
);


/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update Product availability
 *          tags:
 *              - Products
 *          description : Returns the updated availability
 *          parameters:
 *            - in: path 
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema :
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: bad Request - Invalid ID
 *              404:
 *                  description: Product Not Found
 *              
 */
router.patch('/:id',
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    updateAvailability
);

/** 
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Delete product by ID
 *          tags:
 *              - Products
 *          description: delete product with the id
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              require: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema :
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: bad Request - Invalid ID
 *              404:
 *                  description: Product Not Found
*/
router.delete('/:id', 
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    deleteProduct
);

export default router;