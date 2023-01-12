const Pool = require('../config/db');

const selectAllProduct = (limit, offset, searchParam,sortBY,sort) =>{
  return Pool.query(`SELECT * FROM product WHERE name LIKE '%${searchParam}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const selectProduct = (id) =>{
    return Pool.query(`SELECT * FROM product WHERE id_product=${id}`);
}

const insertProduct = (data) =>{
    const { id,name,price,description,stock,rating,color,size,id_category,id_seller} = data;
    return Pool.query(`INSERT INTO product(id_product,name,price,description,stock,rating,color,size,id_category,id_seller) VALUES(${id},'${name}',${price},'${description}',${stock},${rating},'${color}','${size}',${id_category},${id_seller})`);
}

const updateProduct = (data) =>{
    const { id,name,price,description,stock,rating,color,size,id_category,id_seller} = data;
    return Pool.query(`UPDATE product SET name='${name}', price=${price}, description='${description}',stock=${stock},rating=${rating},color='${color}',size='${size}', id_category=${id_category}, id_seller=${id_seller} WHERE id_product=${id}`);
}

const deleteProduct = (id) =>{
    return Pool.query(`DELETE FROM product WHERE id_product=${id}`);
}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM product')
  }
  
const findId =(id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id_product FROM product WHERE id_product=${id}`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }

module.exports = {
    selectAllProduct,
    selectProduct,
    insertProduct,
    updateProduct,
    deleteProduct,
    countData,
    findId
}