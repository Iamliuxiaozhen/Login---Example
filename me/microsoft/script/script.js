const avatar = document.getElementById("avatar");
const mail = document.getElementById("mail");
const username = document.getElementById("username");
const logout_btn = document.getElementById("logout_btn");

fetch("api/microsoft/me")
.then(response => response.json())
.then(data =>{
    if(!data.authenticated){
        window.location.href = '/';
    }else{
        username.innerHTML = data.displayName;
        mail.innerHTML = data.mail;
    };
})
.catch(error => {
    console.error(error);
})

logout_btn.addEventListener('click',function(){
    fetch('/api/microsoft/exit')
    .then(data => {
        if(!data.status === 'ok'){
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