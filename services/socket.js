const { Server } = require("socket.io");
var http=require("http"); 
const io=new Server();
class SocketServer{
    constructor(app){
        this.server=http.createServer(app);
        this.io=new Server(this.server);
        this.initListeners();
        return this.server;
    }


initListeners=() => {
this.io.on("connection",(client)=>{
    console.log(client.id);
    client.on('disconnect', () => {
        console.log('user disconnected');
      });

      
});
}
}
module.exports={SocketServer}