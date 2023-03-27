const JWT=require('jsonwebtoken');
const JWT_SECRET_SIGN="Sirman@#";



const fetchuser = (req, res, next) => {

    //fetched token from header of request
    const token=req.header('auth-token');
    //check whether token is availble or not
    if(!token){
        res.status(400).send({error : "Please authenticate using valid taken"});
    }

    try {
        //verifying token and signature of administration
        const data=JWT.verify(token,JWT_SECRET_SIGN);

        //token user is in request user
        req.student=data.student;
        //auth function run
        next();
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send({error : "Some internal servar error"});
        
    }
}

module.exports = fetchuser