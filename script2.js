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
var alpha=["A","B","C","D","E","F","G","H","I","J"];
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  const dbRef=db.ref();
  const pollsRef = dbRef.child('polls');
  let url=window.location.href;
  let tmp=url.split("?");
  const id=tmp[1];
  let optionMain="";


  pollsRef.on("child_added", snap => {
   let poll = snap.val();
   if(poll.id==id){
    let key=snap.key;
    let optRef=dbRef.child('polls/'+key+'/options');
    let optnBtnlistUI=document.getElementById("options-btn-list");
    let optnResultlistUI=document.getElementById("result-list");
    let title=document.querySelector("#poll-title");
    title.textContent=poll.title;
    let details=document.querySelector("#poll-details");
    details.textContent=poll.details;
    let options=poll.options;
    let x=0;
    for(let opt in options){
      let $p=document.createElement("p");
      $p.setAttribute("class","result-row");
      let $lbl=document.createElement("label");
      let string=alpha[x]+": "+opt;
      $lbl.innerHTML=string;
      $lbl.setAttribute("class","optn-title");
      $p.append($lbl);
      let $span=document.createElement("span");
      $span.innerHTML=options[opt];
      $span.setAttribute("class","optn-value-hidden");
      $span.setAttribute("id","value-"+alpha[x]);
      $p.append($span);
      optnResultlistUI.append($p);
      let $btn=document.createElement("button");
      $btn.innerHTML = alpha[x];
      $btn.setAttribute("class", "option-btn"); 
      //$btn.setAttribute("onclick","optnClick("+opt+")");
      
      $btn.addEventListener('click',()=>{
        //alert(opt);
        //let optvalueUI=document.querySelector("#value-"+opt);
        let allOptUI=document.getElementsByClassName("optn-value-hidden");
        for (var i = allOptUI.length - 1; i >= 0; i--) {
          allOptUI[i].setAttribute("class","optn-value-visible")
        }
        let optvalueUI=document.querySelector("#value-"+$btn.textContent);
        let optvalue=optvalueUI.textContent;
        let value=parseInt(optvalue);
        value=value+1;
        optvalueUI.textContent=value;
        options[opt]=value;
        optRef.set(options);
        optnBtnlistUI.remove();

      });
      optnBtnlistUI.append($btn);
      x++;

      //console.log(opt);
      //console.log(options[opt]);
      //console.log("\n");

    }

   }
   
});


