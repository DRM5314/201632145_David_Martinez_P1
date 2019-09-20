const {Router} = require('express');
const router = Router();

router.get('/',(req,res)=>{
    res.render('entrada');
})

module.exports = router;