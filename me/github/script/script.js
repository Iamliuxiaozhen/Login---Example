const githublogin = document.getElementById('githublogin');
const Status = document.getElementById("Status");
const  username = document.getElementById("name");
const login = document.getElementById("login");
const bio = document.getElementById("bio");
const avatar = document.getElementById("avatar");


fetch("/api/me")
  .then(response => response.json())
  .then(data => {
    if(!data.authenticated){
        window.location.href = '/';
    }else{
        username.innerHTML = data.user.name;
        login.innerHTML = data.user.login;
        bio.innerHTML = data.user.bio;
        avatar.src = data.user.avatar_url;
    };
  })
  .catch(error => {
    console.error(error);
  })