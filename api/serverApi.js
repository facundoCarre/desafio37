
const dotenv = require('dotenv');
const { fork } = require('child_process');

dotenv.config();

class ServerApi {

    constructor() { }

    async info(productos) {
        try {
            let resp= {}
            resp ={
              'version de node ' : process.version,
              'sistema operativo': process.platform,
              'uso de la memoria': process.memoryUsage(),
              'id del proceso': process.pid,
              'path de ejecucion': process.execPath,
              'arumentos de entrada': process.argv,
              'carpeta corriente': process.cwd()
        
            }
            return resp;
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = new ServerApi();