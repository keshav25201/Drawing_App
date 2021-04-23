const pre = document.getElementById("display");
const input = document.getElementById("input")
function getCode(){
  fetch('http://localhost:4000/getcode')
  .then(response => response.json())
  .then(data => pre.innerText = data["code"]);
}

function joinRoom(){
  window.location.href = `http://localhost:4000/draw/${input.value}`
  
}
