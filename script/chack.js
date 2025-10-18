const githublogin = document.getElementById('githublogin');
const Status = document.getElementById("Status");

fetch("/api/me")
  .then(response => response.json())
  .then(data => {
    // 将返回的json保存到login_json变量
    const login_json = data;
    
    if(login_json.authenticated){
        console.log("已登录");
        Status.innerHTML = '你已登录，等等跳转';
    }else{
        console.log("未登录");
        githublogin.removeAttribute('disabled');
        githublogin.removeAttribute("background-color");
    }
  })
  .catch(error => {
    console.error("获取用户信息失败:", error);
    // 处理错误情况
    Status.innerHTML = '获取状态错误,请重新尝试登录';
    githublogin.removeAttribute('disabled');
    githublogin.removeAttribute("background-color");
  });