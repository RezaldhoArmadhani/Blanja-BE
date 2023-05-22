const Pool = require('../config/db');
const Crypto = require('crypto');

const selectAllSeller = (limit, offset, searchParam,sortBY,sort) =>{
  return Pool.query(`SELECT * FROM seller WHERE name LIKE '%${searchParam}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset} `);
}

const findEmail =(email)=>{
  return  new Promise ((resolve,reject)=> 
  Pool.query(`SELECT * FROM seller WHERE email='${email}'`,(error,result)=>{
    if(!error){
      resolve(result)
    }else{
      reject(error)
    }
  })
  )
}

const selectSeller = (id) =>{
    return Pool.query(`SELECT * FROM seller WHERE id_seller='${id}'`);
}

const insertSeller = (data) =>{
  console.log(data);  
  const {name,phone,password,email,gender,birth_date} = data;
  const query = `INSERT INTO seller VALUES('${Crypto.randomUUID()}','${name}','${phone}','${password}','${email}','male','${birth_date}','seller')`
    return Pool.query(query);
}

const updateSeller = (data) =>{
    const { id,name,phone,password,email,gender,birth_date} = data;
    return Pool.query(`UPDATE Seller SET name='${name}', phone='${phone}', password='${password}', email='${email}',gender='${gender}',birth_date='${birth_date}' WHERE id_seller=${id}`);
}

const deleteSeller = (id) =>{
    return Pool.query(`DELETE FROM Seller WHERE id_seller='${id}'`);
}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM seller')
  }
  
const findId =(id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id_seller FROM seller WHERE id_seller=${id}`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }

module.exports = {
    selectAllSeller,
    selectSeller,
    insertSeller,
    updateSeller,
    deleteSeller,
    countData,
    findId,
    findEmail
}
