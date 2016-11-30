!function(){"use strict";angular.module("miniRvce",["ui.router","toaster","ngAnimate"]).config(["$stateProvider","$urlRouterProvider","$httpProvider",function(t,e,n){e.otherwise("/home");var o="src/";t.state("account",{url:"/user",templateUrl:o+"user/account/account.tpl",controller:"AccountController as account"}).state("account.login",{url:"/user/login",templateUrl:o+"user/account/login/login.tpl",controller:"LoginController as login"}).state("account.signup",{url:"/user/signup",templateUrl:o+"user/account/signup/signup.tpl",controller:"SignUpController as signup"}).state("account.logout",{url:"/user/login",templateUrl:o+"user/account/login/login.tpl",controller:"AccountController as account"}).state("home",{url:"/home",templateUrl:o+"home/home.tpl",controller:"HomeController as home"}).state("question",{url:"/question/:ques_id",templateUrl:o+"questions/question.tpl",controller:"QuestionController as question"}).state("listed",{url:"/listed/:tag_id",templateUrl:o+"listed/tagList.tpl",controller:"tagListController as listed"}).state("addques",{url:"/addques",templateUrl:o+"addques/addques.tpl",controller:"AddQuesController as addques"}).state("unanswered",{url:"/unanswered",templateUrl:o+"unanswered/unanswered.tpl",controller:"UnansweredController as unaswered"})}])}(),function(){"use strict";angular.module("miniRvce").controller("AddQuesController",["$scope","$state","$rootScope","$window","$stateParams","AddQues","Tag",function(t,e,n,o,u,c,r){var a=this;a.user=null,n.verifiedAcc=o.localStorage.getItem("vfd"),a.tagsList=[],r.getTags().then(function(t){a.tagsList=t.data.TAGS}).catch(function(t){console.log("Tag retrieval error: ",t)}),a.user=o.localStorage.getItem("user_id"),a.uname=o.localStorage.getItem("name"),a.col_id=o.localStorage.getItem("cl_id"),a.tag_id=null,a.tag_name=null;var i=new Date;a.cur_date=("0"+i.getDate()).slice(-2)+"-"+("0"+(i.getMonth()+1)).slice(-2)+"-"+i.getFullYear();var s={};a.getTag=function(){a.tag_id=t.item.id,console.log("tag_id ",a.tag_id),a.tag_name=t.item.name},a.addQuestion=function(){console.log("tag_id ",a.tag_id),s={tag_id:a.tag_id,tag:a.tag_name,u_id:a.user,col_id:a.col_id,contents:a.new_ques,username:a.uname,pdate:a.cur_date},c.postQues(s).then(function(t){e.go("home")}).catch(function(t){console.log("Error in posting question",t)})}}])}(),function(){"use strict";angular.module("miniRvce").factory("AddQues",["$http","$window",function(t,e){return{postQues:function(e){return t.post("/question",e)}}}])}(),function(){"use strict";angular.module("miniRvce").controller("CommentController",["$rootScope","$window","$stateParams","Comment",function(t,e,n,o){var u=this;u.commentList=[],u.user=null,u.user=e.localStorage.getItem("user_id"),t.verifiedAcc=e.localStorage.getItem("vfd"),u.uname=e.localStorage.getItem("name"),u.new_comment=null,u.cur_a_id=null,u.upd=function(t){o.getComments(t).then(function(t){console.log("comments: ",t),u.commentList=t.data.COMMENTS}).catch(function(t){console.log(t)})},u.addComment=function(t){var e={u_id:u.user,ans_id:t,contents:u.new_comment,uname:u.uname};o.postComm(e).then(function(e){u.upd(t)}).catch(function(t){console.log("Error in posting comment: ",t)})}}])}(),function(){"use strict";angular.module("miniRvce").factory("Comment",["$http","$window",function(t,e){return{getComments:function(e){return t.get("/comments/?ans_id="+e)},postComm:function(e){return t.post("/comments",e)}}}])}(),function(){"use strict";angular.module("miniRvce").controller("HomeController",["$state","$http","Home","$window","$stateParams","$rootScope","Question","Comment",function(t,e,n,o,u,c,r,a){var i=this;i.tagsList=[],i.queslist=[];c.verifiedAcc=o.localStorage.getItem("vfd");var s=function(t){var e=r.getAnswers(t).then(function(t){return t.data.ANSWERS[0]}).catch(function(t){return t});return e},l=function(t){var e=a.getComments(t).then(function(t){return t.data.COMMENTS}).catch(function(t){return t});return e};i.getall=function(){return n.getQuestions().then(function(t){i.queslist=t.data.QUESTION;for(var e=0;e<i.queslist.length;e++)i.queslist[e].topAns=s(i.queslist[e].id).then(function(t){return console.log("getTopAns: ",t),t}).catch(function(t){console.log(t)})}).catch(function(t){console.log("error:",t)}),1},i.getCom=function(){for(var t=0;t<i.queslist.length;t++)console.log("aaaa"),i.queslist[t].topAns.topCom=l(i.queslist[t].topAns.$$state.value.id).then(function(t){return console.log(t),t}).catch(function(t){console.log(t)})},i.sequence=function(){i.getCom(),i.getall(),i.getCom(),i.getCom(),i.getCom(),i.getCom(),i.getCom(),i.getCom(),i.getCom(),i.getCom(),i.getCom()},i.sequence(),i.update_up=function(t){n.upd_up(t).then(function(t){i.getall()}).catch(function(t){console.log(t)})},i.update_dw=function(t){n.upd_dw(t).then(function(t){i.getall()}).catch(function(t){console.log(t)})},n.getTags().then(function(t){i.tagsList=t.data.TAGS}).catch(function(t){console.log("Tag retrieval error: ",t)})}])}(),function(){"use strict";angular.module("miniRvce").factory("Home",["$http","$window",function(t,e){return{getQuestions:function(){return t.get("/question/all")},getTags:function(){return t.get("/tags")},upd_up:function(e){return t.post("/question/up",{q_id:e})},upd_dw:function(e){return t.post("/question/dw",{q_id:e})}}}])}(),function(){"use strict";angular.module("miniRvce").controller("tagListController",["$state","$http","Home","tagList","$window","$stateParams","$rootScope",function(t,e,n,o,u,c,r){var a=this;a.queslist=[],a.t_id=c.tag_id,r.verifiedAcc=u.localStorage.getItem("vfd"),o.getQuestions(a.t_id).then(function(t){a.queslist=t.data.QUESTION}).catch(function(t){console.log("error:",t)}),a.update_up=function(t){n.upd_up(t).then(function(t){}).catch(function(t){console.log(t)})},a.update_dw=function(t){n.upd_dw(t).then(function(t){}).catch(function(t){console.log(t)})}}])}(),function(){"use strict";angular.module("miniRvce").factory("tagList",["$http","$window",function(t,e){return{getQuestions:function(e){return t.get("/question/?tag_id="+e)}}}])}(),function(){"use strict";angular.module("miniRvce").controller("QuestionController",["$rootScope","$window","$stateParams","Question",function(t,e,n,o){var u=this;u.answerList=[],u.curQuestionId=n.ques_id,u.new_answer=null,u.user=null,u.user=e.localStorage.getItem("user_id"),t.verifiedAcc=e.localStorage.getItem("vfd");var c=u.curQuestionId,r=function(){o.getCurDet(c).then(function(t){console.log(t),u.allData=t.data.QUESTION}).catch(function(t){console.log(t)})};r();var a=function(){o.getAnswers(u.curQuestionId).then(function(t){console.log("answers: ",t),u.answerList=t.data.ANSWERS}).catch(function(t){console.log(t)})};a(),u.addAnswer=function(){var t={u_id:u.user,q_id:u.curQuestionId,contents:u.new_answer};o.postAns(t).then(function(t){a()}).catch(function(t){console.log("Error in posting answer",t)})},u.update_up=function(t){o.upd_up(t).then(function(t){console.log(t)}).catch(function(t){console.log(t)})},u.update_dw=function(t){o.upd_dw(t).then(function(t){console.log(t)}).catch(function(t){console.log(t)})}}])}(),function(){"use strict";angular.module("miniRvce").factory("Question",["$http","$window",function(t,e){return{getAnswers:function(e){return t.get("/answer/?id="+e)},getCurDet:function(e){return t.get("/question/qid/?q_id="+e)},postAns:function(e){return t.post("/answer",e)},upd_up:function(e){return t.post("/answer/up",{a_id:e})},upd_dw:function(e){return t.post("/answer/dw",{a_id:e})}}}])}(),function(){"use strict";angular.module("miniRvce").controller("UnansweredController",["$state","$http","Home","$window","$stateParams","$rootScope",function(t,e,n,o,u,c){var r=this;r.tagsList=[],r.queslist=[],c.verifiedAcc=o.localStorage.getItem("vfd"),r.getall=function(){n.getQuestions().then(function(t){r.queslist=t.data.QUESTION}).catch(function(t){console.log("error:",t)})},r.getall(),r.update_up=function(t){n.upd_up(t).then(function(t){r.getall()}).catch(function(t){console.log(t)})},r.update_dw=function(t){n.upd_dw(t).then(function(t){r.getall()}).catch(function(t){console.log(t)})},n.getTags().then(function(t){r.tagsList=t.data.TAGS}).catch(function(t){console.log("Tag retrieval error: ",t)})}])}(),function(){"use strict";angular.module("miniRvce").controller("TagController",["$state","$http","Tag","$window","$stateParams","$rootScope",function(t,e,n,o,u,c){var r=this;r.tagsList=[],c.verifiedAcc=o.localStorage.getItem("vfd"),n.getTags().then(function(t){r.tagsList=t.data.TAGS}).catch(function(t){console.log("Tag retrieval error: ",t)})}])}(),function(){"use strict";angular.module("miniRvce").factory("Tag",["$http","$window",function(t,e){return{getTags:function(){return t.get("/tags")}}}])}(),function(){"use strict";angular.module("miniRvce").controller("AccountController",["Account","$state","$window","$rootScope",function(t,e,n,o){var u=this;o.loggedIn=t.isLoggedInFunc(),o.verifiedAcc=t.isVerified(),u.logout=function(){t.logout(),u.loggedin=!1}}])}(),function(){"use strict";angular.module("miniRvce").factory("Account",["$http","$window",function(t,e){function n(e){return t.post("/signup",e)}function o(){return 1===e.localStorage.getItem("vfd")}function u(n){var o=this;return t.post("/login",n).then(function(t){o.isLoggedIn=!0,l=t.data.token,g=t.data.USER[0].id;var n=t.data.USER[0].dept_id;return e.localStorage.setItem("token",l),e.localStorage.setItem("user_id",g),e.localStorage.setItem("d_id",n),e.localStorage.setItem("cl_id",t.data.USER[0].col_id),e.localStorage.setItem("name",t.data.USER[0].name),e.localStorage.setItem("usn",t.data.USER[0].usn),e.localStorage.setItem("email",t.data.USER[0].email),e.localStorage.setItem("phone",t.data.USER[0].phone),e.localStorage.setItem("type",t.data.USER[0].type),e.localStorage.setItem("vfd",t.data.USER[0].verified),t}).catch(function(t){console.log(t)})}function c(){return d=!1,e.localStorage.clear()}function r(){return s()&&i()?(d=!0,!0):(console.log("not logged in"),d=!1,!1)}function a(){return t.get("/users")}function i(){return g=e.localStorage.getItem("user_id")}function s(){return l=e.localStorage.getItem("token")}var l=null,g=null,d=!1;return{signUp:n,login:u,getUserNames:a,getUserId:i,getToken:s,isLoggedIn:this.isLoggedIn,isLoggedInFunc:r,logout:c,isVerified:o}}])}(),function(){"use strict";angular.module("miniRvce").controller("LoginController",["$window","Account","$state","$rootScope",function(t,e,n,o){var u=this;o.isSignUp=!1,u.submit=function(){e.login({usn:u.usn,password:u.password}).then(function(e){console.log(e),e.data.error?u.Message=e.data.error:(o.loggedIn=!0,o.verifiedAcc=t.localStorage.getItem("vfd"),n.go("home"))}).catch(function(t){console.log(t),u.Message=t})}}])}(),function(){"use strict";angular.module("miniRvce").controller("SignUpController",["Account","$state","$rootScope",function(t,e,n){var o=this;o.message="",o.enable=!1,n.isSignUp=!0,o.submit=function(){console.log(o);var n={dept_name:o.dept_name,clg_name:o.clg_name,name:o.name,usn:o.usn,password:o.password,email:o.email,phone:o.phone,type:o.typ};o.message="",t.signUp(n).then(function(o){console.log("Response after signin up: ",o),t.login({usn:n.usn,password:n.password}).then(function(){e.go("home")}).catch(function(t){console.log("err During login!!"),console.log(t)})}).catch(function(t){o.enable=!0,o.message="Unsuccessful!! Please Check the entered details..!",console.log("err during signup: ",t)})}}])}();