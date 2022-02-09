const { JsonWebTokenError } = require("jsonwebtoken");
const jsonwebtoken = require("jsonwebtoken")


const generateJWT = (uid = '') => {

    return new Promise ((resolve, reject) => {

        const payload = {uid}; // todo lo que ponemos aca se puede ver ejemplo name, password, nacimiento

        jsonwebtoken.sign( payload, process.env.SECRETPRIVATEKEY, {
            expiresIn: '6h'
        }, (err, token) => {
            if ( err ) {
                console.log(err);
                reject('Not cant play the Token')
            }else {
                resolve ( token );
            }
        } )


    })

}

module.exports = {
    generateJWT
}