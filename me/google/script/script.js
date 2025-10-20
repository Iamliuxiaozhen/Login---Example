const avatar = document.getElementById("avatar");
const username = document.getElementById("username");
const email = document.getElementById("email");
const logout_btn = document.getElementById("logout_btn");

logout_btn.addEventListener("click",function(){
    fetch("api/google/exit")
    .then(response => response.json())
    .then(data => {
        if(data.status !== 'ok'){
            alert("好像有点问题，我们好像未能给您退出登录。");
        }
        else{
            window.location.href = '/';
        }
    })
    .catch(error =>{
        console.error(error);
        alert("出现错误，我们好像未能给您退出登录。")
    })
})

fetch("api/google/me")
  .then(response => response.json())
  .then(data => {
    if(!data.authenticated){
        window.location.href = '/';
    }else{
        avatar.src = data.user.picture;
        username.innerHTML = data.user.name;
        email.innerHTML = data.user.email;
    };
  })
  .catch(error => {
    console.error(error);
  })