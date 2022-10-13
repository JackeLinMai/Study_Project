// se atentar ao criar uma rota secreta, um dos problemas é nã se atentar
const http = require("http");
const host = 'http://localhost'
const stats = require("./pcRamUsage.js");

http
    .createServer((req, res) => {
        var url = req.url;
        if (url === "/stats") { //rota padrão
            res.end(JSON.stringify(stats, null, 2)); //
        } else {
            res.write("Ok, vá praticar"); //write a response
            res.end();
        }
    })
    .listen(port, () =>
        console.log(`Server is running in http://localhost:${port}`)
    );