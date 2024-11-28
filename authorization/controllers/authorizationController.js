const jwt=require('jsonwebtoken');
const crypto = require("crypto");

const UserModel=require('../../common/models/user');

const { roles, jwtSecret, jwtExpirationInSeconds}= require('../../config');
const { error } = require('console');


//Generates an Access Token using login and userId for the user's authentication
const generateAccessToken=(login, userId) =>{
    return jwt.sign(
        {
            userId,
            login,
        },
        jwtSecret,
        {
            expiresIn: jwtExpirationInSeconds,
        }
    );
};

//encrypt the password with using SHA256 algoritm
const encryptPassword= (password) =>{
    const hash=crypto.createHash("sha256"); //creating  SHA-256 hash object
    hash.update(password);//update the hash object with the string to be encrypted
    return hash.digest("hex");// encrypted value in hexadecimal format

};

module.exports={
    register: (req, res)=>{
        const payload=req.body;
        if (payload.password.length > 255) {
            return res.status(400).json({
                status: false,
                    error: {
                        message: "Password too long",
                    },
                });
        } 

        let encryptedPassword=encryptPassword(payload.password);
        let role=payload.role;

        if (!role){
            role=roles.USER;
        }
UserModel.createUser(
    Object.assign(payload,{ password: encryptedPassword, role})
).then((user)=> {
    const accessToken=generateAccessToken(payload.login, user.id);
    //token requireed in all subsequent requests


    return res.status(200).json({
        status: true,
        data:{
            accessToken: accessToken,
            message: `Your account was created successfully`,
        },
    });
})
.catch((errorr)=> {
    console.log(errorr)

    if (errorr.name == "SequelizeDatabaseError") {
        console.log(Object.values(errorr));
        return res.status(400).json({
        status: false,
            error: {
                message: errorr.original.sqlMessage,
            },
        });
    } else {
        return res.status(400).json({
            status: false,
            error: {
                message: errorr.errors[0].message,
                type: errorr.errors[0].type,
                value: errorr.errors[0].value,
            },
            
        });
    }
    
});
    },

login: (req, res) => {
    const {login, password}=req.body;

    UserModel.findUser({login})
    .then((user) => {

        if (!user){
            
            return res.status(400).json({
                status: false,
                error: {
                    message: `Could not find any user with login: \`${login}\`.`,
                },
            });
        }

        const encryptedPassword=encryptPassword(password);


//if password does not match with the one stored in the database
        if (user.password !== encryptedPassword) {
            return res.status(400).json({
                error: {
                    message: `Provided username or password did not match`,
                },

            });
        };

        const accessToken=generateAccessToken(user.login, user.id);//generating token for user


return res.status(200).json({
    
    status: true,
    data: {
        accessToken: accessToken,
        message: `You are successfully logged in`,
    },
});
   

})
.catch((errorr)=>{
    return res.status(500).json({
        status: false,
        error: errorr,
    });
});

},

};