import express from 'express'
import { getAllProducts,createProducts, updateProduct, deleteProduct, getSingleProduct, testGetAllrPoduct} from '../controller/productController.js'
import { roleBasedAccess, verifyUserAuth } from '../middleWare/userAuth.js';

const router = express.Router()

//Routes
router.route("/products").get(verifyUserAuth,getAllProducts)
.post(verifyUserAuth,roleBasedAccess('admin'),   createProducts);
router.route('/product/:id')
.put(verifyUserAuth,roleBasedAccess('admin'), updateProduct)
.delete(verifyUserAuth,roleBasedAccess('admin'), deleteProduct)
.get(verifyUserAuth,getSingleProduct);


//test
router.route("/products").get(testGetAllrPoduct)

 
export default router   