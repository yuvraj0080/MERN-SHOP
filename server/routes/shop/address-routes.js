const express = require('express')
const {addAdress,fetchAllAdress,editAdress,deleteAdress} = require('../../constrollers/shop/address-controller')

const router = express.Router()

router.post('/add',addAdress)
router.get('/get/:userId',fetchAllAdress)
router.put('/update/:userId/:addressId',editAdress)
router.delete('/delete/:userId/:addressId',deleteAdress)

module.exports = router