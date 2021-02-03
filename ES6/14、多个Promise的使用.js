function getUser() {
	return new Promise((reslove, reject) => {
		setTimeout(() => {
			reslove(['nick', 'apple', 'wechat']);
			// reject(Error('no user.'))
		}, 1000)
	})
}

function getUserInfo() {
	return new Promise((reslove, reject) => {
		setTimeout(() => {
			reslove({
				location: '上海',
				name: 'apple'
			});
			// reject(Error('no info.'))
		}, 500)
	})
}

//两个promise都成功才执行
Promise
	.all([getUser(), getUserInfo()])
	.then(responses => {
		// console.log(responses);//[['nick','apple','wechat'], {location:'上海', name: 'apple' }]
		const [user, info] = responses;
		console.log(user) //['nick','apple','wechat']
		console.log(info) //{location:'上海', name: 'apple' }
	})
	.catch(err => { //两个promise中一个失败则执行,两个都失败的情况下返回执行最快的一个
		console.error(err);
	})


	//由第一个返回的promise状态决定,只返回一个promise的状态信息
// 只要有一个成功就会调用success
Promise
	.race([getUser(), getUserInfo()])
	.then(responses => {
		console.log(responses);
	})
	.catch(err => {
		console.error(err);
	})