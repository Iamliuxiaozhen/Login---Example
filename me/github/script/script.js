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
        console.log(data.user.name);
        username.innerHTML = data.user.name;
        console.log(data.user.login);
        login.innerHTML = data.user.login;
        console.log(data.user.bio);
        bio.innerHTML = data.user.bio;
        console.log(data.user.avatar_url);
        avatar.src = data.user.avatar_url;
    };
  })
  .catch(error => {
    console.error(error);
  })