const Pool = require('../config/db');
const Crypto = require('crypto');

const selectAllCustomer = (limit, offset, searchParam,sortBY,sort) =>{
  return Pool.query(`SELECT * FROM customer WHERE name LIKE '%${searchParam}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset} `);
}

const findEmail =(email)=>{
  return  new Promise ((resolve,reject)=> 
  Pool.query(`SELECT * FROM customer WHERE email='${email}'`,(error,result)=>{
    if(!error){
      resolve(result)
    }else{
      reject(error)
    }
  })
  )
}

const selectCustomer = (id) =>{
    return Pool.query(`SELECT * FROM customer WHERE id_customer='${id}'`);
}

const insertCustomer = (data) =>{
    console.log(data); 
    const {name,phone,password,email,gender,birth_date} = data;
    const query = `INSERT INTO customer VALUES('${Crypto.randomUUID()}','${name}','${phone}','${password}','${email}','male','${birth_date}','customer')`
    return Pool.query(query);
}

const updateCustomer = (data) =>{
    const { id,name,phone,password,email,gender,birth_date} = data;
    return Pool.query(`UPDATE customer SET name='${name}', phone='${phone}', password='${password}', email='${email}',gender='${gender}', birth_date='${birth_date}' WHERE id_customer=${id}`);
}

const deleteCustomer = (id) =>{
    return Pool.query(`DELETE FROM customer WHERE id_customer='${id}'`);
}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM customer')
  }
  
const findId =(id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id_customer FROM customer WHERE id_customer=${id}`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }

module.exports = {
    selectAllCustomer,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
    countData,
    findId,
    findEmail
}