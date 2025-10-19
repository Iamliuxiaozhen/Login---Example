// @ts-nocheck
export const onRequestGet: PagesFunction = async ({ request, env }) => {
  try {
    // 1. 解析 Cookie
    const cookieHeader = request.headers.get("Cookie") || "";
    const tokenMatch = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/);
    const token = tokenMatch ? decodeURIComponent(tokenMatch[1]) : null;

    if (!token || token.length < 10) {
      return new Response(JSON.stringify({ authenticated: false }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2. 请求 Microsoft Graph 用户信息
    const msRes = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!msRes.ok) {
      return new Response(JSON.stringify({ authenticated: false }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await msRes.json();

    // 3. 返回精简用户信息
    const safeUser = {
      id: user.id,
      displayName: user.displayName,
      mail: user.mail || user.userPrincipalName,
      jobTitle: user.jobTitle,
      mobilePhone: user.mobilePhone,
      officeLocation: user.officeLocation,
    };

    return new Response(JSON.stringify({ authenticated: true, user: safeUser }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: "server_error", message: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};