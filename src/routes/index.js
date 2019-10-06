const {Router} = require('express');
const expres = require('express');
const router = Router();
router.use(expres.json());
router.get('/',(req,res)=>{
    res.render('entrada');    
});

router.post('/post',(req,res)=>{
    console.log('Recibo con exito');
    console.log(req.body.salida);
    res.status(200);
});

module.exports = router;