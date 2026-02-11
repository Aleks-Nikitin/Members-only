const pool = require("./pool");
async function postUser (firstname,lastname,email,password,admin){
     await pool.query("INSERT INTO users(firstname,lastname,username,password,admin) VALUES($1,$2,$3,$4,$5)",[firstname,lastname,email,password,admin]);

}
async function findByEmail(username){
    const {rows}=await pool.query("SELECT * FROM users WHERE username=$1",[username]);
    return rows[0];
}
async function findUserById(id){
    const {rows}=await pool.query("SELECT * FROM users WHERE id =$1",[id]);
    return rows[0];
}
module.exports={
    postUser,
    findByEmail,
    findUserById
}