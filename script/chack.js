const githublogin = document.getElementById('githublogin');
const Status = document.getElementById("Status");

fetch("/api/me")
  .then(async response => {
    // 先检查响应状态
    if (!response.ok) {
      if (response.status === 401) {
        return { authenticated: false };
      }
      throw new Error(`HTTP错误! 状态码: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // 将返回的json保存到login_json变量
    const login_json = data;
    
    if(login_json.authenticated){
        console.log("已登录");
        Status.innerHTML = '你已登录，等等跳转';
        window.location.href = "/me/github/"
    }else{
        console.log("未登录");
        githublogin.removeAttribute('disabled');
        githublogin.removeAttribute("background-color");
    }
  })
  .catch(error => {
    console.error("获取用户信息失败:", error);
    // 只有在网络错误等情况下才会触发这里，HTTP 401状态不会触发
    Status.innerHTML = '获取状态错误,请重新尝试登录';
    githublogin.removeAttribute('disabled');
    githublogin.removeAttribute("background-color");
  });