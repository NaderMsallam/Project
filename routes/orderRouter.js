const {Router} = require("express");
const router= Router();
const {orderService}=require("../services/orderService")
const { validateToken, validateAdminToken } = require("../Auth/JWT");

// add new order
router.post("/addOrder",validateToken, async function (req, res) {
    const email= req.body.email;
    const order=req.body.order;
    console.log("entered addOrder route!!");
      
    const data = {
     email:email,
     order:order,
    };
   res.json(await orderService.addOrder(data));
  });

  // get all orders of the user
  router.get("/getAllOrders",validateToken, async (req,res)=>{
     // email=req.body.email;
     console.log("query:");
     console.log(req.query);
    email=req.query.email;
    res.json(await orderService.getAllOrders(email));
})

 //get all Orders
 router.get("/AdminGetAllOrders", validateAdminToken,async (req,res)=>{
   
    res.json(await orderService.AdminGetAllOrders());
})




module.exports=router;