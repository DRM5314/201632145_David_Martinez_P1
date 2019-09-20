const app = require('./app');

async function main(){
    await app.listen(app.get('port'));
    console.log("servidor en puerto :"+app.get('port'));
}

main();