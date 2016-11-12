!function(){"use strict";angular.module("miniRvce",["ui.router","toaster","ngAnimate"]).config(["$stateProvider","$urlRouterProvider","$httpProvider",function(t,e,n){e.otherwise("/home");var o="src/";t.state("account",{url:"/user",templateUrl:o+"user/account/account.tpl",controller:"AccountController as account"}).state("account.login",{url:"/user/login",templateUrl:o+"user/account/login/login.tpl",controller:"LoginController as login"}).state("account.signup",{url:"/user/signup",templateUrl:o+"user/account/signup/signup.tpl",controller:"SignUpController as signup"}).state("account.logout",{url:"/user/login",templateUrl:o+"user/account/login/login.tpl",controller:"AccountController as account"}).state("home",{url:"/home",templateUrl:o+"home/home.tpl",controller:"HomeController as home"}).state("question",{url:"/question/:ques_id",templateUrl:o+"questions/question.tpl",controller:"QuestionController as question"}).state("listed",{url:"/listed/:tag_id",templateUrl:o+"listed/tagList.tpl",controller:"tagListController as listed"}).state("addques",{url:"/addques",templateUrl:o+"addques/addques.tpl",controller:"AddQuesController as addques"}).state("unanswered",{url:"/unanswered",templateUrl:o+"unanswered/unanswered.tpl",controller:"UnansweredController as unaswered"})}])}(),function(){"use strict";angular.module("miniRvce").controller("AddQuesController",["$scope","$state","$rootScope","$window","$stateParams","AddQues","Tag",function(t,e,n,o,a,u,r){var i=this;i.user=null,n.verifiedAcc=o.localStorage.getItem("vfd"),i.tagsList=[],r.getTags().then(function(t){i.tagsList=t.data.TAGS}).catch(function(t){console.log("Tag retrieval error: ",t)}),i.user=o.localStorage.getItem("user_id"),i.uname=o.localStorage.getItem("name"),i.col_id=o.localStorage.getItem("cl_id"),i.tag_id=null,i.tag_name=null;var c=new Date;i.cur_date=("0"+c.getDate()).slice(-2)+"-"+("0"+(c.getMonth()+1)).slice(-2)+"-"+c.getFullYear();var l={};i.getTag=function(){i.tag_id=t.item.id,console.log("tag_id ",i.tag_id),i.tag_name=t.item.name},i.addQuestion=function(){console.log("tag_id ",i.tag_id),l={tag_id:i.tag_id,tag:i.tag_name,u_id:i.user,col_id:i.col_id,contents:i.new_ques,username:i.uname,pdate:i.cur_date},u.postQues(l).then(function(t){e.go("home")}).catch(function(t){console.log("Error in posting question",t)})}}])}(),function(){"use strict";angular.module("miniRvce").factory("AddQues",["$http","$window",function(t,e){return{postQues:function(e){return t.post("/question",e)}}}])}(),function(){"use strict";angular.module("miniRvce").controller("HomeController",["$state","$http","Home","$window","$stateParams","$rootScope",function(t,e,n,o,a,u){var r=this;r.tagsList=[],r.queslist=[],u.verifiedAcc=o.localStorage.getItem("vfd"),r.getall=function(){n.getQuestions().then(function(t){r.queslist=t.data.QUESTION}).catch(function(t){console.log("error:",t)})},r.getall(),r.update_up=function(t){n.upd_up(t).then(function(t){r.getall()}).catch(function(t){console.log(t)})},r.update_dw=function(t){n.upd_dw(t).then(function(t){r.getall()}).catch(function(t){console.log(t)})},n.getTags().then(function(t){r.tagsList=t.data.TAGS}).catch(function(t){console.log("Tag retrieval error: ",t)})}])}(),function(){"use strict";angular.module("miniRvce").factory("Home",["$http","$window",function(t,e){return{getQuestions:function(){return t.get("/question/all")},getTags:function(){return t.get("/tags")},upd_up:function(e){return t.post("/question/up",{q_id:e})},upd_dw:function(e){return t.post("/question/dw",{q_id:e})}}}])}(),function(){"use strict";angular.module("miniRvce").controller("tagListController",["$state","$http","Home","tagList","$window","$stateParams","$rootScope",function(t,e,n,o,a,u,r){var i=this;i.queslist=[],i.t_id=u.tag_id,r.verifiedAcc=a.localStorage.getItem("vfd"),o.getQuestions(i.t_id).then(function(t){i.queslist=t.data.QUESTION}).catch(function(t){console.log("error:",t)}),i.update_up=function(t){n.upd_up(t).then(function(t){}).catch(function(t){console.log(t)})},i.update_dw=function(t){n.upd_dw(t).then(function(t){}).catch(function(t){console.log(t)})}}])}(),function(){"use strict";angular.module("miniRvce").factory("tagList",["$http","$window",function(t,e){return{getQuestions:function(e){return t.get("/question/?tag_id="+e)}}}])}(),function(){"use strict";angular.module("miniRvce").controller("TagController",["$state","$http","Tag","$window","$stateParams","$rootScope",function(t,e,n,o,a,u){var r=this;r.tagsList=[],u.verifiedAcc=o.localStorage.getItem("vfd"),n.getTags().then(function(t){r.tagsList=t.data.TAGS}).catch(function(t){console.log("Tag retrieval error: ",t)})}])}(),function(){"use strict";angular.module("miniRvce").factory("Tag",["$http","$window",function(t,e){return{getTags:function(){return t.get("/tags")}}}])}(),function(){"use strict";angular.module("miniRvce").controller("UnansweredController",["$state","$http","Home","$window","$stateParams","$rootScope",function(t,e,n,o,a,u){var r=this;r.tagsList=[],r.queslist=[],u.verifiedAcc=o.localStorage.getItem("vfd"),r.getall=function(){n.getQuestions().then(function(t){r.queslist=t.data.QUESTION}).catch(function(t){console.log("error:",t)})},r.getall(),r.update_up=function(t){n.upd_up(t).then(function(t){r.getall()}).catch(function(t){console.log(t)})},r.update_dw=function(t){n.upd_dw(t).then(function(t){r.getall()}).catch(function(t){console.log(t)})},n.getTags().then(function(t){r.tagsList=t.data.TAGS}).catch(function(t){console.log("Tag retrieval error: ",t)})}])}(),function(){"use strict";angular.module("miniRvce").controller("QuestionController",["$rootScope","$window","$stateParams","Question",function(t,e,n,o){var a=this;a.answerList=[],a.curQuestionId=n.ques_id,a.new_answer=null,a.user=null,a.user=e.localStorage.getItem("user_id"),t.verifiedAcc=e.localStorage.getItem("vfd");var u=a.curQuestionId,r=function(){o.getCurDet(u).then(function(t){console.log(t),a.allData=t.data.QUESTION}).catch(function(t){console.log(t)})};r();var i=function(){o.getAnswers(a.curQuestionId).then(function(t){console.log("answers: ",t),a.answerList=t.data.ANSWERS}).catch(function(t){console.log(t)})};i(),a.addAnswer=function(){var t={u_id:a.user,q_id:a.curQuestionId,contents:a.new_answer};o.postAns(t).then(function(t){i()}).catch(function(t){console.log("Error in posting answer",t)})},a.update_up=function(t){o.upd_up(t).then(function(t){console.log(t)}).catch(function(t){console.log(t)})},a.update_dw=function(t){o.upd_dw(t).then(function(t){console.log(t)}).catch(function(t){console.log(t)})}}])}(),function(){"use strict";angular.module("miniRvce").factory("Question",["$http","$window",function(t,e){return{getAnswers:function(e){return t.get("/answer/?id="+e)},getCurDet:function(e){return t.get("/question/qid/?q_id="+e)},postAns:function(e){return t.post("/answer",e)},upd_up:function(e){return t.post("/answer/up",{a_id:e})},upd_dw:function(e){return t.post("/answer/dw",{a_id:e})}}}])}(),function(){"use strict";angular.module("miniRvce").controller("AccountController",["Account","$state","$window","$rootScope",function(t,e,n,o){var a=this;o.loggedIn=t.isLoggedInFunc(),o.verifiedAcc=t.isVerified(),a.logout=function(){t.logout(),a.loggedin=!1}}])}(),function(){"use strict";angular.module("miniRvce").factory("Account",["$http","$window",function(t,e){function n(e){return t.post("/signup",e)}function o(){return 1===e.localStorage.getItem("vfd")}function a(n){var o=this;return t.post("/login",n).then(function(t){o.isLoggedIn=!0,s=t.data.token,g=t.data.USER[0].id;var n=t.data.USER[0].dept_id;return e.localStorage.setItem("token",s),e.localStorage.setItem("user_id",g),e.localStorage.setItem("d_id",n),e.localStorage.setItem("cl_id",t.data.USER[0].col_id),e.localStorage.setItem("name",t.data.USER[0].name),e.localStorage.setItem("usn",t.data.USER[0].usn),e.localStorage.setItem("email",t.data.USER[0].email),e.localStorage.setItem("phone",t.data.USER[0].phone),e.localStorage.setItem("type",t.data.USER[0].type),e.localStorage.setItem("vfd",t.data.USER[0].verified),t}).catch(function(t){console.log(t)})}function u(){return d=!1,e.localStorage.clear()}function r(){return l()&&c()?(d=!0,!0):(console.log("not logged in"),d=!1,!1)}function i(){return t.get("/users")}function c(){return g=e.localStorage.getItem("user_id")}function l(){return s=e.localStorage.getItem("token")}var s=null,g=null,d=!1;return{signUp:n,login:a,getUserNames:i,getUserId:c,getToken:l,isLoggedIn:this.isLoggedIn,isLoggedInFunc:r,logout:u,isVerified:o}}])}(),function(){"use strict";angular.module("miniRvce").controller("LoginController",["$window","Account","$state","$rootScope",function(t,e,n,o){var a=this;o.isSignUp=!1,a.submit=function(){e.login({usn:a.usn,password:a.password}).then(function(e){console.log(e),e.data.error?a.Message=e.data.error:(o.loggedIn=!0,o.verifiedAcc=t.localStorage.getItem("vfd"),n.go("home"))}).catch(function(t){console.log(t),a.Message=t})}}])}(),function(){"use strict";angular.module("miniRvce").controller("SignUpController",["Account","$state","$rootScope",function(t,e,n){var o=this;o.message="",o.enable=!1,n.isSignUp=!0,o.submit=function(){console.log(o);var n={dept_name:o.dept_name,clg_name:o.clg_name,name:o.name,usn:o.usn,password:o.password,email:o.email,phone:o.phone,type:o.typ};o.message="",t.signUp(n).then(function(o){console.log("Response after signin up: ",o),t.login({usn:n.usn,password:n.password}).then(function(){e.go("home")}).catch(function(t){console.log("err During login!!"),console.log(t)})}).catch(function(t){o.enable=!0,o.message="Unsuccessful!! Please Check the entered details..!",console.log("err during signup: ",t)})}}])}();