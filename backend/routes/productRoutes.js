import express from 'express'
import { getAllProducts,createProducts, updateProduct, deleteProduct, getSingleProduct, getAdminProducts,createOrUpdateReview,getProductReviews, deleteReview} from '../controller/productController.js'
import { roleBasedAccess, verifyUserAuth } from '../middleWare/userAuth.js';

const router = express.Router()

// product Routes user
router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/reviews").get(getProductReviews).delete(verifyUserAuth,deleteReview)

router.route("/product/review/:id").put(verifyUserAuth,createOrUpdateReview);
//product routes admin
router.route("/admin/products")
.get(verifyUserAuth,roleBasedAccess('admin'),getAdminProducts)

router.route("/admin/product/create")
.post(verifyUserAuth,roleBasedAccess('admin'), createProducts);
router.route('/admin/product/:id')
.put(verifyUserAuth,roleBasedAccess('admin'), updateProduct)
.delete(verifyUserAuth,roleBasedAccess('admin'), deleteProduct);


 
export default router    