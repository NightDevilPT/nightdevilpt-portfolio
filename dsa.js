const newPromise = new Promise((res,rej)=>{
	setTimeout(()=>{
		res("hello")
	},1000);
})

newPromise.then((res)=>{console.log(res)});
console.log("PROM")