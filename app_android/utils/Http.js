/**
 * @author: chenwei
 * @description: 接口地址
 * @time: 2017-03-15
 */
const Http_Domain = "https://app.cxy61.com/program_girl";   //https://app.bcjiaoyu.com/program_girl
const Page_Domain = "https://www.coding61.com/girl";        //https://app.bcjiaoyu.com/girl
const Share_Domain = "https://www.coding61.com";

// const Http_Domain = "https://app.bcjiaoyu.com/program_girl";
// const Page_Domain = "https://app.bcjiaoyu.com/girl";
// const Share_Domain = "https://app.bcjiaoyu.com";

let Http = {
	domainPage:Page_Domain,    //网站页面地址的域名
	domain:Http_Domain,        //接口域名
	domain3:Share_Domain,      //网页域名
	login:Http_Domain + "/userinfo/invitation_code_login/",       //邀请码登录
	whoami:Http_Domain + "/userinfo/whoami/",                     //个人信息
	addReward:Http_Domain + "/userinfo/add_reward/",              //添加奖励
	updateExtent:Http_Domain + "/userinfo/update_learnextent/",   //更新进度
	myTeam:Http_Domain + "/userinfo/mygroup/",                    //我的团队
	teamBrand:Http_Domain + "/userinfo/groups/diamond/ranking/",  //团队排行
	lunTanUnread:Http_Domain + "/message/messages/?types=forum&status=unread",   //论坛未读消息

	updateUserInfo:Http_Domain + "/userinfo/userinfo_update/",       //修改个人信息
	getQiniuToken:Http_Domain + "/upload/token/",                    //获取七牛 token
	// getRongYunToken:Http_Domain + "/im/user_get_token/",          //获取融云 token
	getRongYunToken:Http_Domain + "/im/user_refresh_token/",         //刷新 token

	// 登录相关接口
	loginInvite:Http_Domain + "/userinfo/invitation_code_login/",                     //登录(邀请码方式登录)
	loginPassword:Http_Domain + "/userinfo/telephone_login/",                         //登录(密码方式登录)
	loginVerify:Http_Domain + "/userinfo/vcode_login/",                               //登录(验证码方式登录)
	findPassword:Http_Domain + "/userinfo/reset_password/",                           //找回密码
	register:Http_Domain + "/userinfo/telephone_signup/",                             //注册
	getVerifyForLogin:(phone)=>{
		return Http_Domain + "/userinfo/vcode_login_request/?telephone=" + phone      //获取验证码(验证码方式登录)
	},
	getVerifyForForgetPsd:(phone)=>{
		return Http_Domain + "/userinfo/reset_password_request/?telephone=" + phone   //获取验证码(找回密码)
	},
	getVerifyForRegister:(phone)=>{
		return Http_Domain + "/userinfo/telephone_signup_request/?telephone=" + phone //获取验证码(手机注册)
	},
	
	courseInfo:(pk)=>{                                                                //课程信息
		return Http_Domain + "/course/courses/" + pk + "/"
	},
	getPassCode:(phone)=>{
		return Http_Domain + "/userinfo/reset_password_request/?telephone=" + phone      //获取找回密码验证码
	},
	getRegCode:(phone)=>{
		return Http_Domain + "/userinfo/telephone_signup_request/?telephone=" + phone    //获取手机注册验证码
	},
	getNewsList:(lastId)=>{
		return Http_Domain + "/news/news/?current_id=" + lastId                          //获取新闻推送列表
	},

	// 活动相关接口
	addActivity:Http_Domain + "/club/club_create/",                                      //添加活动
	activityList:(pagenum)=>{
		return Http_Domain + "/club/clubs/?page=" + pagenum                              //活动列表
	},
	myAcitivitys:(pagenum, type)=>{
		return Http_Domain + "/club/myclub/?types="+type+"&page=" + pagenum              //我的活动
	},
	updateActivity:(pk)=>{
		return Http_Domain + "/club/clubs/" + pk + "/"                                   //修改活动
	},
	getActivityDetail:(pk)=>{
		return Http_Domain + "/club/club_detail/"+ pk +"/"                               //活动详情
	},
	quitActivity:(pk)=>{
		return Http_Domain + "/club/clubs/"+pk+"/"                                       //解散活动
	},
	joinActivity:(pk, password)=>{
		return Http_Domain + "/club/join_club/"+pk+"/?password=" + password              //加入活动
	},
	removeActivityMember:(pk)=>{
		return Http_Domain + "/club/delete_clubmember/"+pk+"/"                           //移除活动成员
	},
	leaveActivity:(pk)=>{
		return Http_Domain + "/club/quit_club/"+pk+"/"                                   //退出活动
	},

	// 竞赛相关接口
	competeList:(pagenum)=>{
		return Http_Domain + "/contest/?page=" + pagenum                                 //竞赛列表
	},
	competeDetail:(pk)=>{
		return Http_Domain + "/contest/"+pk+"/"                                          //竞赛详情
	},
	questionList:(pk)=>{
		return Http_Domain + "/contest/"+pk+"/question/"                                 //竞赛下问题列表
	},
	competeAnswer:(pk)=>{
		return Http_Domain + "/contest/"+pk+"/answer_question/"                          //回答问题
	},
	competeRank:(pk, pagenum)=>{
		return Http_Domain + "/contest/"+pk+"/ranking/?exclude=answers&page=" + pagenum  //竞赛排行榜
	},

	// 兑换相关接口
	getExchangeProductList:(pagenum)=>{
		return Http_Domain + "/market/exchange_products/?page=" + pagenum          //获取兑换商品列表
	},
	getExchangeOrderList:(pagenum)=>{
		return Http_Domain + "/market/exchange_product_order/?page=" + pagenum     //获取兑换商品订单列表
	},
	getExchangeProductDetail:(pk)=>{
		return Http_Domain + "/market/exchange_products/"+pk+"/"                   //获取兑换商品详情
	},
	getExchangeOrderDetail:(pk)=>{
		return Http_Domain + "/market/exchange_product_order/"+pk+"/"              //获取兑换商品订单详情
	},
	buyExchangeProduct:(pk)=>{
		return Http_Domain + "/market/exchange_products/purchase/"+pk+"/"          //购买兑换商品
	},
	getRewardRecordList:(pagenum)=>{
		return Http_Domain + "/lottery/prize_list/?page=" + pagenum                //获取兑换商品订单列表
	},
	myProducts:(pagenum, status)=>{
		return Http_Domain + "/market/user_products/?page=" + pagenum+"&_type=1&status="+status //我的道具
	},
	useProduct:(pk)=>{
		return Http_Domain + "/market/use_product/"+pk+"/"                         //使用道具
	},
	unUseProduct:(pk)=>{
		return Http_Domain + "/market/unuse_product/"+pk+"/"                       //不使用道具
	},

	// 奖学金相关
	getScholarship:(pagenum)=>{
		return Http_Domain + "/asset/record/?page=" + pagenum                         //奖学金
	},

    // 分享相关
	shareLogoUrl: "https://static1.bcjiaoyu.com/girlShareLogo.png",
	shareActivityUrl:(pk)=>{
		return Page_Domain + "/app/share/activityDetails.html?pk=" + String(pk)
	},
	shareCompeteUrl:(pk)=>{
		return Page_Domain + "/app/share/compete.html?pk=" + String(pk);
	},
	shareForumUrl:(pk)=>{
		return Page_Domain + "/app/share/forum.html?pk=" + String(pk);
	},
	sharePunchUrl:(pk, username, name, head)=>{
		return Page_Domain + "/app/share/punch.html?pk=" + String(pk) + "&username=" + username + "&name=" + name + "&head=" + head;
	},
	punchCard:(pk)=>{
		return Http_Domain + "/club/club_punch/" + String(pk) + "/";
	},
	getPunchCardRecord:(pk, username)=>{
		return Http_Domain + "/club/myclub_punch/" + String(pk) + "/?username=" + username;
	},
	shareBonusUrl:(bonus, diamond, name, head)=>{
		return Page_Domain + "/app/share/bonus.html?bonus=" + String(bonus) + "&diamond=" + String(diamond) + "&name=" + name + "&head=" + head;
	},
	getBonusRecord:Http_Domain + "/contest/statistics/",
	
	// 自适应课程相关
	resetAdaptCourse:Http_Domain + "/course/reset_mycourse/",                //重置自适应课程
	beginAdaptCourse:Http_Domain + "/course/begin_mycourse/",                //添加自适应课程

	// 招聘相关
	jobList:(pagenum)=>{
		return Http_Domain + "/third_party_api/intern/search/?page=" + pagenum
	},

	// 论坛相关
	forumSections:(pagenum)=>{
		return Http_Domain + "/forum/sections/?page=" + pagenum
	},
	forumList:(pagenum)=>{
		return Http_Domain + "/forum/posts/?myposts=false&page=" + pagenum
	},
	myCollectForumList:(pagenum)=>{
		return Http_Domain + "/collect/collections/?page=" + pagenum
	},
	myForumList:(pagenum)=>{
		return Http_Domain + "/forum/posts/?section=&isessence=&myposts=true&page=" + pagenum
	},
	otherForumList:(pagenum, owner)=>{
		return Http_Domain + "/forum/posts/?username="+owner+"&page=" + pagenum
	},
	searchForumList:(pagenum, keyword)=>{
		return Http_Domain + "/forum/posts/?keyword=" + keyword + "&page=" + pagenum
	},
	addForum:Http_Domain + "/forum/posts_create/",  
	forumUnreadMsg:Http_Domain + "/message/messages/?types=forum&status=unread",
	forumMessagesList:(pagenum)=>{
		return Http_Domain + "/message/messages/?page=" + pagenum
	},
	forumMessageDetail:(pk)=>{
		return Http_Domain + "/message/messages/" + pk + "/"
	},
	forumSetMsgRead:Http_Domain + "/message/messages/allread/",
	forumRankList:(pagenum)=>{
		return Http_Domain + "/userinfo/userinfo/diamond/ranking/?page=" + pagenum
	},
	forumDetail:(pk)=>{
		return Http_Domain + "/forum/posts/"+pk+"/"
	},
	forumReplyList:(pk, pagenum)=>{
		return Http_Domain + "/forum/replies/?posts=" + pk + "&page=" + pagenum
	},
	collectForum: Http_Domain + "/collect/collection/",
	deleteForum: (pk) => {
	    return Http_Domain + "/forum/posts/" + pk + "/"
	},
	deleteForumReply: (pk)=>{
	    return Http_Domain + "/forum/replies/"+pk+"/"
	},
	deleteForumReplyAgain:(pk)=>{
	    return Http_Domain + "/forum/replymores/" + pk + "/"
	},
	forumReply:Http_Domain + "/forum/replies_create/",
	forumReplyAgain: Http_Domain + "/forum/replymore_create/",
	forumEssence:(pk)=>{
		return Http_Domain + "/forum/posts_essence/"+pk+"/"
	},
	cancelForumEssence:(pk)=>{
		return Http_Domain + "/forum/posts_essence/cancel/"+pk+"/"
	},
	forumTop:(pk)=>{
		return Http_Domain + "/forum/posts_top/"+ pk +"/"
	},
	cancelForumTop:(pk)=>{
		return Http_Domain + "/forum/posts_top/cancel/"+pk+"/"
	},
	awardDiamond:Http_Domain + "/userinfo/play_reward/",		  //打赏钻石
	userinfo:(username)=>{
		return Http_Domain + "/userinfo/username_userinfo/?username=" + username
	},
}
export default Http;
