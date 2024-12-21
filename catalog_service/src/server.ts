import app from "./expressApp"
import { logger } from "./utils";

const PORT = process.env.PORT || 8000;

export const StartServer = async ()=>{
    app.listen(PORT, ()=>{
        logger.info(`Server is running on port ${PORT}`);
    })

    process.on('uncaughtException', async (err)=>{
        logger.info(err);
        process.exit(1);
    })
}



StartServer().then(()=>{
    logger.info("Server is running");
}).catch((err)=>{
    logger.error(err, "Failed to start server");
})