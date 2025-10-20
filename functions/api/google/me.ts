// @ts-nocheck

export const onRequestGet: PagesFunction = async ({ request }) => {
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

    // 2. 请求 Google 用户信息
    const googleRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!googleRes.ok) {
      return new Response(JSON.stringify({ authenticated: false }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await googleRes.json();

    // 3. 返回精简用户信息
    const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      verified_email: user.verified_email,
      locale: user.locale,
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