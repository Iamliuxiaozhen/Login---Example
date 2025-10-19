const  username = document.getElementById("username");
const login = document.getElementById("login");
const bio = document.getElementById("bio");
const avatar = document.getElementById("avatar");
const Repositories = document.getElementById("Repositories");
const Followers = document.getElementById("Followers");
const Following = document.getElementById("Following");
const logout_btn = document.getElementById("logout_btn");
const Log_out_bin = document.getElementById("Log_out_bin");

logout_btn.addEventListener('click',function(){
    fetch('/api/github/exit')
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

Log_out_bin.addEventListener('click',function(){
    fetch('/api/github/log_out')
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

fetch("/api/github/me")
  .then(response => response.json())
  .then(data => {
    if(!data.authenticated){
        window.location.href = '/';
    }else{
        username.innerHTML = data.user.name;
        login.innerHTML = data.user.login;
        bio.innerHTML = data.user.bio;
        avatar.src = data.user.avatar_url;
        Repositories.innerHTML = data.user.public_repos;
        Followers.innerHTML = data.user.Followers;
        Following.innerHTML = data.user.Following;
    };
  })
  .catch(error => {
    console.error(error);
  })