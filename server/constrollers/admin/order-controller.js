const paypal = require("../../helpers/paypal");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");



const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find({  });
  
      if (!orders.length) {
        return res.status(404).json({
          success: false,
          message: "No Orders Found",
        });
      }
  
      res.status(200).json({
          success:true,
          data : orders
      })
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: "Error occured",
      });
    }
  };


  const getOrderDetailsAdmin = async (req, res) => {
    try {
  
      const { id } = req.params;
      const order = await Order.findById(id);
  
      if (!order) {
          return res.status(404).json({
            success: false,
            message: "No Order Found",
          });
        }
  
      res.status(200).json({
          success:true,
          data : order
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: "Error occured",
      });
    }
  };

  const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;

        const order = await Order.findById(id);
  
      if (!order) {
          return res.status(404).json({
            success: false,
            message: "No Order Found",
          });
        }

    await Order.findByIdAndUpdate(id,{orderStatus})
    res.status(200).json({
        success:true,
        message: "Order Status is updated",
    })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: "Error occured",
      });
    }
  };


module.exports = {getAllOrders,getOrderDetailsAdmin,updateOrderStatus}