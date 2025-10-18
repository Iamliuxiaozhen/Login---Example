const githublogin = document.getElementById('githublogin');
const Status = document.getElementById("Status");

fetch("/api/me")
  .then(response => {
    if (response.status === 401) {
      // 明确未登录，不尝试解析 JSON
      return { authenticated: false };
    }
    if (!response.ok) {
      throw new Error(`HTTP错误! 状态码: ${response.status}`);
    }
    return response.json(); // 只有在 2xx 时才解析 JSON
  })
  .then(data => {
    const login_json = data;

    if (login_json.authenticated) {
      console.log("已登录");
      Status.innerHTML = '你已登录，等等跳转';
      window.location.href = "/me/github/";
    } else {
      console.log("未登录");
      githublogin.removeAttribute('disabled');
      githublogin.removeAttribute("background-color");
    }
  })
  .catch(error => {
    console.error("获取用户信息失败:", error);
    Status.innerHTML = '获取状态错误,请重新尝试登录';
    githublogin.removeAttribute('disabled');
    githublogin.removeAttribute("background-color");
  });