var firebaseConfig = {
    apiKey: "AIzaSyB1ATlCPIo7opeWYcBIbwIBIcrQhymzEcc",
    authDomain: "wepollbypc.firebaseapp.com",
    projectId: "wepollbypc",
    storageBucket: "wepollbypc.appspot.com",
    messagingSenderId: "571513652594",
    appId: "1:571513652594:web:969b6674f0c5daeeda09eb",
    measurementId: "G-99HFHDY2ZF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  const dbRef=db.ref();
  const pollsRef = dbRef.child('polls');

document.getElementById("next").addEventListener('click',()=>{
	let no_optionsUI=document.querySelector("#in-options");
	let n=parseInt(no_optionsUI.value);
	if(n<=10){
			let listUI=document.querySelector("#result-list");
			let btn=document.getElementById("next");
			btn.remove();
			for (let i = 0; i < n; i++) {
			  let $p=document.createElement("p");
		      $p.setAttribute("class","result-row");
		      let $lbl=document.createElement("label");
		      $lbl.setAttribute("class","text-small");
		      $lbl.innerHTML="option "+(i+1);
		      $p.appendChild($lbl);
		      let $optin=document.createElement("input");
		      $optin.setAttribute("class","text-small");
		      $optin.setAttribute("id","opt"+i);
		      $optin.setAttribute("type","text");
		      $optin.setAttribute("placeholder","option");
		      $optin.setAttribute("value","");
		      $p.appendChild($optin);
		      
		      listUI.append($p);
		
			}
		let $btn=document.createElement("button");
		$btn.innerHTML="create poll";
		$btn.setAttribute("class","option-btn");
		$btn.setAttribute("onclick","createPoll("+n+")");
		listUI.append($btn);
		}
		else{
			alert("maximum 10 options");
		}
});
function createPoll(n){
	let id=getIdTimestamp();
	let obj={};
	let titleUI=document.querySelector("#in-title");
	obj["title"]=titleUI.value;
	let detailsUI=document.querySelector("#in-details");
	obj["details"]=detailsUI.value;
	obj["id"]=id;
	let options={};
	for(let i=0; i<n;i++){
		let $opt=document.querySelector("#opt"+i);
		
		options[$opt.value]=0;
	}
	obj["options"]=options;
	let url="view.html?"+obj["id"];

	
	pollsRef.push(obj,function(){
		//console.log(obj);
   		//console.log("data has been inserted");
   		window.open(url);
 })
}
function getIdTimestamp(){
	let currentDate=new Date();
	let date=currentDate.getDate();
	let month=currentDate.getMonth();
	let year=currentDate.getFullYear();
	let time=currentDate.getTime();
	let id=date+"$"+month+"$"+year+"$"+time;
	return id;
}