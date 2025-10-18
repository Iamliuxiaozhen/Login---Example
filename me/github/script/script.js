const  username = document.getElementById("username");
const login = document.getElementById("login");
const bio = document.getElementById("bio");
const avatar = document.getElementById("avatar");
const Repositories = document.getElementById("Repositories");
const Followers = document.getElementById("Followers");
const Following = document.getElementById("Following");


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
        Repositories.innerHTML = data.user.public_repos;
        Followers.innerHTML = data.user.Followers;
        Following.innerHTML = data.user.Following;
    };
  })
  .catch(error => {
    console.error(error);
  })