const Pool = require('../config/db');

const findEmail =(email)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT * FROM userr WHERE email='${email}'`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }

  const createUser = (data) =>{
    const { id_user,fullname,email,password,role } = data;
    return new Promise ((resolve,reject)=> 
    Pool.query(`INSERT INTO userr(id_user,email,password,fullname,role) VALUES('${id_user}','${email}','${password}','${fullname}','${role}')`,(error,result)=>{
        if (!error) {
            resolve(result)
        } else {
            reject(error)
        }
    })
    )
}

module.exports = { findEmail,createUser}