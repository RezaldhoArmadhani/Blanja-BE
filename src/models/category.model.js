const Pool = require('../config/db');

const selectAllCategory = (limit, offset, searchParam,sortBY,sort) =>{
    return Pool.query(`SELECT * FROM category WHERE name LIKE '%${searchParam}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset} `);
}

const selectCategory = (id) =>{
    return Pool.query(`SELECT * FROM category WHERE id_category=${id}`);
}

const insertCategory = (data) =>{
    const { id,name} = data;
    return Pool.query(`INSERT INTO Category(id_category,name) VALUES(${id},'${name}')`);
}

const updateCategory = (data) =>{
    const { id,name} = data;
    return Pool.query(`UPDATE category SET name='${name}' WHERE id_category=${id}`);
}

const deleteCategory = (id) =>{
    return Pool.query(`DELETE FROM category WHERE id_category=${id}`);
}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM category')
  }
  
const findId =(id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id_category FROM category WHERE id_category=${id}`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }

module.exports = {
    selectAllCategory,
    selectCategory,
    insertCategory,
    updateCategory,
    deleteCategory,
    countData,
    findId
}