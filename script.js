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
  let polllistUI=document.getElementById("main-polls");
  pollsRef.on("child_added", snap => {
   let poll = snap.val();
   let $div = document.createElement("div");
   $div.innerHTML = poll.title;
   $div.setAttribute("class", "poll-row"); 
   $div.setAttribute("id", poll.id ); 
   console.log(poll.id);
   //$div.setAttribute("onclick","clickPoll("+poll.id+")");

   $div.addEventListener('click',()=>{
  alert(poll.id);
  url="poll.html?"+poll.id;
  window.open(url);
   });
   polllistUI.append($div);
});

function clickPoll(id){
  alert(id);
  let url="poll.html?"+id;
  window.open(url);
}
document.getElementById("poll-btn").addEventListener('click',()=>{
  window.open('createpoll.html', '_self');
});