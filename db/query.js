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
async function addMembership(id){
    await pool.query("UPDATE users SET membership=$1 WHERE id=$2",[true,id])
}
async function postMsg(title,time,msg,authorid){
    await pool.query("INSERT INTO messages(title,time,message,authorid) VALUES($1,$2,$3,$4)",[title,time,msg,authorid]);

}
async function getAllMsg(){
    const{rows}=await pool.query("SELECT messages.id,title,time,message,username FROM messages JOIN users ON messages.authorid = users.id");
    return rows;
}
async function deleteMsg(msgId) {
    await pool.query("DELETE FROM messages WHERE id =$1",[msgId]);
}
module.exports={
    postUser,
    findByEmail,
    findUserById,
    addMembership,
    postMsg,
    getAllMsg,
    deleteMsg
}