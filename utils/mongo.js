//引入
let express = require('express');
var mongodb = require('mongodb');
//实例化连接
let mongoCt = mongodb.MongoClient;
//查  验证帐号密码是否错误
let cha = (username,password)=>{
	mongoCt.connect('mongodb://127.0.0.1:27017',username,password,(err,client)=>{
		if(err){
			// console.log("连接失败",err);
		}else{
			console.log('连接成功');
			//链接库和集合
			let db=client.db('kuidada');
			//连接集合
			let user = db.collection('user');
			//操作库 --增
			// user.insertOne({name:284509742,password:123321},(err,res)=>{
			// 	console.log('状态',res.result.n)
			// })
			//查询库 --查
			user.find({username:username,password:password},{projection:{_id:0}},(err,result)=>{
			
				result.toArray((err,data)=>{
				  console.log('err.........',err);// null 没有错误
				 //  console.log(data[0].name)//查询帐号
					// console.log(data[0].password)	//查询密码
					if(data.length>0){
						console.log('登陆成功')
					}
				  //7. 关闭库链接
				  client.close()
						
				})
			})
		}
	})
}
// shuju(284509742,123321)调用
exports.cha=cha;
// 增
let cun = (name,password)=>{
	mongoCt.connect('mongodb://127.0.0.1:27017',name,password,(err,client)=>{
		if(err){
			// console.log("连接失败",err);
		}else{
			console.log('连接成功');
			//链接库和集合
			let db=client.db('kuidada');
			//连接集合
			let user = db.collection('user');
			//操作库 --增
			// user.insertOne({name:284509742,password:123321},(err,res)=>{
			// 	console.log('状态',res.result.n)
			// })
			//查询库 --查
			user.find({name:name},{projection:{_id:0}},(err,result)=>{
				result.toArray((err,data)=>{
				  console.log('err.........',err);// null 没有错误/
				 //  console.log(data[0].name)//查询帐号
					// console.log(data[0].password)	//查询密码
					// console.log(data)
					if(data.length>0){
						console.log("已存在帐号")
					}else{
						user.insertOne({name,password},(err,res)=>{
						if(err==null){
							console.log('存成功')
						}else{
							console.log('存失败请重试')
						}
						})
					}
				  //7. 关闭库链接
				  client.close()
						
				})
			})
		}
	})
}
// cha(131415,123321)
exports.cun=cun;