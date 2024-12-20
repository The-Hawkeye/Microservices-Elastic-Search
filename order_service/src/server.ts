import app from "./express-app"

const PORT = process.env.PORT || 8000;

export const StartServer = async ()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    })

    process.on('uncaughtException', async (err)=>{
        console.log(err);
        process.exit(1);
    })
}



StartServer().then(()=>{
    console.log("Server is running");
}).catch((err)=>{
    console.log(err, "Failed to start server");
})