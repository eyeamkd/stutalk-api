 const express= require('express'); 
 const bodyParser = require('body-parser');  
 const cors =require('cors');
 const MongoClient = require('mongodb').MongoClient; 
 const assert = require('assert');   
 const multer = require('multer'); 
 const serveIndex = require('serve-index'); 
 var path = require('path');
let counter =1;

 const storage = multer.diskStorage({  
 	destination: function(req,file,cb){  
 		cb(null,'./public/images');

 	}, 
 	filename: function(req,file,cb){  
 		cb(null,"newsimage-"+ counter+path.extname(file.originalname)	); 
 		counter=counter+1; 
 	}
 });  
 const upload = multer({storage: storage }); 


 const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'kunaldubey',
    password : '',
    database : 'stutalk'
  }
});




 const app=express();  
 app.use(express.static('public'));
 app.use(cors());  
 app.use(bodyParser.json());   

 const NC_database =[ 
 		{ 	"name":"Kunal Dubey", 
 			"dept":"IT", 
 			"password":"kunalncc", 
 			"id":"2297"
 			}  ,
 		{ 	"name":"Kaustubh", 
 			"dept":"IT", 
 			"password":"kaustubhncc", 
 			"id":"2298"
 			},  
 		{ 	"name":"Vetha Varshini", 
 			"dept":"IT", 
 			"password":"vethancc", 
 			"id":"2299"
 			} , 
 		{ 	"name":"Prashanth", 
 			"dept":"IT", 
 			"password":"prashanthncc", 
 			"id":"2300"
 			} , 
 		{ 	"name":"Praveen", 
 			"dept":"IT", 
 			"password":"praveenncc", 
 			"id":"2301"
 			} , 
 		{ 	"name":"Sree Teja", 
 			"dept":"IT", 
 			"password":"sreetejancc", 
 			"id":"2302"
 			} ,
 		{ 	"name":"Sathish", 
 			"dept":"IT", 
 			"password":"sathishncc", 
 			"id":"2303"
 			} , 
 		{ 	"name":"Akshay", 
 			"dept":"IT", 
 			"password":"akshayncc", 
 			"id":"2304"
 			} ,
 		{ 	"name":"Alex Valentine", 
 			"dept":"IT", 
 			"password":"alexncc", 
 			"id":"2305"
 			} ,
 ] 
 const NewsDb=[  
	 	{  "heading":"VBIT breaks its Admission Records", 
	 	  "image":"http://vbithyd.ac.in/wp-content/uploads/2016/06/7.jpg", 
	 	  "content":"This year VBIT has crossed all its records by having more than 800+ addmissions " , 
	 	  "dept":"ADMIN"
	 		},  
	 	{  "heading":"VBIT gives a warm welcome to all its freshers ", 
	 	  "image":"", 
	 	  "content":"The convocation ceremony which was conducted on July 18th was a huge success" ,
	 	  "dept":"ADMIN H&S"
	 		}, 
	 	{  "heading":"VBIT's Library to become smart ", 
	 	  "image":"", 
	 	  "content":"Kunal Dubey, a third year IT student along with his partner Sanath Swaroop, is said to implement RFID technology into our library which will , according to our sources , will work just as fine as the Hyderabad metro rail" , 
	 	  "dept":"ADMIN IT"
	 		},  
	 	{  "heading":"VBIT BECOMES AUTONOMOUS", 
	 	  "image":"", 
	 	  "content":"The college has finally become AUTONOMOUS", 
	 	  "dept":"ADMIN" 
	 		},  
	 	{  "heading":"Huge Literary Fest Coming up!", 
	 	  "image":"", 
	 	  "content":"The VBITians can hold their breath as the college is about to host 'Biggest Literary Fest!!!' in its History , to get all the updates for the Literary Fest click subscribe button on events page , you can find it here",
	 	  "dept":"EVENTS DRISHTI" 
	 		},  
	 	{  "heading":"Prashasan block to be renovated", 
	 	  "image":"", 
	 	  "content":"Prashasan block to be renovated soon" ,
	 	  "dept":"ADMIN DEV"
	 		},  
	 	{  "heading":"VP promises More events in 2018 ", 
	 	  "image":"", 
	 	  "content":"VP promises More events in 2018" ,
	 	  "dept":"EVENTS ADMIN"
	 		},   
	 	{  "heading":"Industrial Trip to Amazon!", 
	 	  "image":"", 
	 	  "content":"No, not Amazon river but Amazon,inc.",  
	 	 "dept":"EVENTS IEEE CSE IT"

	 		},  
	 	{  "heading":"MATECH FEST 2018", 
	 	  "image":"", 
	 	  "content":"Ganith comes up with its very own flagship event MATECH FEST, click here to register", 
	 	  "dept":"ADMIN GANITH H&S"
	 		}, 
]
 app.get('/',(req,res)=>{   

 	knex('news').select('*').orderBy('submitted', 'desc')
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});

 	
 })
 app.get('/ADMIN',(req,res)=>{   
 	// const dispArray=[];

 	// NewsDb.forEach((news)=>{  
 	// 	if(news.dept.includes("ADMIN"))
 	// 		{  
 	// 			dispArray.push(news);
 	// 		}
 	// }) 
 	// res.status(200).json(dispArray);  
 	knex('news').where('dept', 'like', '%ADMIN%') 
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});

 });  
 app.get('/ROBOTICS',(req,res)=>{   
 	knex('news').where('dept', 'like', '%ROBOTICS%') 
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});

 });  
 app.get('/EXAM',(req,res)=>{   
 	knex('news').where('dept', 'like', '%EXAM%') 
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});
 

 }); 
 app.get('/IEEE',(req,res)=>{   
 	knex('news').where('dept', 'like', '%IEEE%') 
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});


 });  
 app.get('/EVENTS',(req,res)=>{   
 	knex('news').where('dept', 'like', '%EVENTS%') 
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});


 }); 
 app.get('/IT',(req,res)=>{   
 	knex('news').where('dept', 'like', '%IT%') 
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});


 });  
 app.get('/CSE',(req,res)=>{   
 	knex('news').where('dept', 'like', '%CSE%') 
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});


 });  
 app.get('/H&S',(req,res)=>{   
 	knex('news').where('dept', 'like', '%H&S%') 
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});


 });  
 app.get('/DEV',(req,res)=>{   
 	knex('news').where('dept', 'like', '%DEV%') 
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});
 

 });  

 app.get('/EEE',(req,res)=>{   
 	knex('news').where('dept', 'like', '%EEE%') 
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});


 }); 
 app.get('/ECE',(req,res)=>{   
 	knex('news').where('dept', 'like', '%ECE%') 
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});


 }); 
 app.get('/CIVIL',(req,res)=>{   
 	knex('news').where('dept', 'like', '%CIVIL%') 
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});

 }); 
 app.get('/MECH',(req,res)=>{   
 	knex('news').where('dept', 'like', '%MECH%') 
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});


 }); 
 app.get('/EXAM',(req,res)=>{   
 	knex('news').where('dept', 'like', '%EXAM%') 
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});

 }); 
 app.get('/IETE',(req,res)=>{   
 	knex('news').where('dept', 'like', '%IETE%') 
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});

 });   
 app.get('/GANITH',(req,res)=>{   
 	knex('news').where('dept', 'like', '%GANITH%') 
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});
 

 });  
 app.get('/SC',(req,res)=>{   
 	knex('news').where('dept', 'like', '%SC%') 
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});

 });   
 app.get('/ISE',(req,res)=>{   
 	knex('news').where('dept', 'like', '%ISE%') 
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});

 });   
 app.get('/AUTO',(req,res)=>{   
 	knex('news').where('dept', 'like', '%AUTO%') 
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});


 }); 
 app.get('/ALUMNI',(req,res)=>{   
 	knex('news').where('dept', 'like', '%ALUMNI%') 
 	.then(resp=>res.json(resp)) 
 	.catch(err=>{console.log("No News Available")});

 });
app.post('/NC/signin',(req,res)=>{  
	const nccid=req.body.id; 
	const pass=req.body.password; 
	knex('nc').select('password').where('id',nccid) 
	.then(password=>{  
	if(pass===password[0].password)
		{ res.status(200).json("Logged in Successfully")
		} 
		else {  
			res.status(404).json("NC id or Password incorrect");
		} 
	}).catch(err=>console.log(err));
		
})  

app.post('/NC/post',upload.single('image'),(req,res)=>{   
		console.log(req.file);   
	const { heading  , content , dept}=req.body; 
					const date=new Date();  
						knex('news').insert({heading: heading, 
											content: content,
											dept:dept, 
											image:req.file.path,
											submitted: date.toString().substr(0,11) 
										}).then(res.status(200).json("Good Job News Contributor!"))
										 .catch(err=>res.status(400).json("Failed to publish"));
						
		}); 


 app.listen(3001,()=>{ 
 	console.log("Stutalk Server is Running"); 
 	const date= new Date();  
 	console.log(date.toString()); 
 });
