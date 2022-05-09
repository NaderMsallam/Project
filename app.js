const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const https = require("https")
const fs = require('fs')
const { Schema } = mongoose;
const userRrouter = require("./routes/usersRouter");
const itemRouter = require("./routes/itemRouter");
const orderRouter = require("./routes/orderRouter");
const { orderService } = require("./services/orderService");
const { itemService } = require("./services/itemService");

const { chatHistoryService } = require("./services/chatHistoryService")

const app = express();
app.use(cookieParser());
app.use(bodyParser.json({ limit: "25mb" }));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ credentials: true, origin: "http://localhost:4200" }));
app.use(userRrouter);
app.use(itemRouter);
app.use(orderRouter);

mongoose.connect(
    "mongodb://localhost:27017/NaderMsallam"
);



// const privateKey = fs.readFileSync('https://rt-dev.xyz/etc/letsencrypt/live/rtfs0620.xyz/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('https://rt-dev.xyz/etc/letsencrypt/live/rtfs0620.xyz/cert.pem', 'utf8');
// const ca = fs.readFileSync('https://rt-dev.xyz/etc/letsencrypt/live/rtfs0620.xyz/chain.pem', 'utf8');

// const credentials = {
//     key: privateKey,
//     cert: certificate,
//     ca: ca
// };
// const Server = https.createServer(credentials, app);

// const http = require("http").createServer((req, res) => {
//     let pathname = url.parse(req.url).pathname;
//     res.writeHead(301, { Location: "https://" + pathname });
//     res.end();
// });

const http = require("http").createServer(app);
//socket conenction

const io = require("socket.io")(http, {
    cors: {
        origins: ["http://localhost:4200"],
    },
});

io.on("connection", (socket) => {
    console.log("a user connected " + socket.id);
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on('identify', async(email) => {
        console.log('email ' + email);

        socket.on('hello', async(msg) => {
            console.log(msg);
            switch (msg) {
                case '1':
                    const orders = await orderService.getAllOrders(email);

                    io.to(socket.id).emit('getAllOrders', orders);
                    break;
                case '2':
                    const items = await itemService.getAllItems();
                    io.to(socket.id).emit('getAllItems', items);
                    break;
                case '3':
                    const products = await itemService.getAllItems();
                    io.to(socket.id).emit('getAllItems', products);
                    io.to(socket.id).emit('BotMessage', 'please choose product number you would like to order, irrelevant text will be ignored \n example: buy 1 1 2 means you want two of product 1 and one product 2');
                    break;
                case '4':
                    const chatHistory = await chatHistoryService.getChatHistory(email);
                    io.to(socket.id).emit('getChatHistory', chatHistory);
                    break;
                default:
                    io.to(socket.id).emit('exitMessage', `${msg} \n sorry i couldnt understand that can you choose from the list again?`)
            }


        });

        socket.on('saveHistory', async(chat) => {
            let data = { 'email': email, 'history': chat };
            const saveChat = await chatHistoryService.addToChatHistory(data);
        })

        socket.on('buyProduct', async(productIDs) => {
            //invalid input
            if (!productIDs) {
                io.to(socket.id).emit('exitMessage', `sorry, couldnt read that. wrong input !`)
            } else {
                //filtering input from chat
                let IDs = productIDs.replace(/[^0-9]/g, ' ');
                IDs = IDs.split(' ');
                IDs = IDs.filter(function(item) {
                    return (item !== '')
                })
                console.log(IDs);
                if (IDs.length === 0) {
                    io.to(socket.id).emit('exitMessage', `sorry, couldnt read that. wrong input !`)
                } else {
                    const Products = await itemService.getAllItems();
                    var BoughtProducts = [];
                    const lastProductNumber = Products.length;
                    console.log(lastProductNumber);
                    for (let i = 0; i < IDs.length; i++) {
                        if (IDs[i] > -1 && IDs[i] < lastProductNumber) {

                            BoughtProducts.push(Products[IDs[i]]);
                        }
                    }
                    const data = {
                        email: email,
                        order: BoughtProducts,
                    };
                    const saveOrder = await orderService.addOrder(data);
                    io.to(socket.id).emit('exitMessage', `thank you for your purchase! `)
                }
            }
        })
    });

});

app.get("/", (req, res) => {
    res.set({ "Access-control-Allow-origin": "*" });
    return res.redirect("index.html");
});

// Server.listen(3000, () => {
//     console.log("listening on https on port 3000");
// })
http.listen(3000, () => {
    console.log("listening on *:3000");
});