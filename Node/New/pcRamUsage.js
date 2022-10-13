const os = require('os');
//a cada um 1s ela irá verificar a memoria ram
setInterval(() => {
    const { platform, arch, totalmem, freemem } = os;
    const tRam = totalmem() / 1024 / 1024;
    const fRam = freemem() / 1024 / 1024;
    const usage = (fRam / tRam) * 100;

    const stats = {
        OS: platform(),
        Arch: arch(),
        TotalRAM: parseInt(tRam),
        FreeRAM: parseInt(fRam),
        Usage: `${usage.toFixed(2)}%` //para que as informações de uso nao fique com muitas casas decimais
    }
    console.clear(); //limpar para nao encher o terminal de atualizações
    console.table(stats); //criar uma tabela
    exports.stats = stats;
}, 1000)