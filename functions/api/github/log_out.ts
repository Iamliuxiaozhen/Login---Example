// @ts-nocheck

import type { PagesFunction } from '@cloudflare/workers-types';

export const onRequest: PagesFunction = async (context) => {
  const request = context.request;
  const cookieHeader = request.headers.get("cookie") || "";
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];

  // 从 Cookie 中提取 GitHub OAuth token（假设名为 github_token）
  const tokenMatch = cookieHeader.match(/github_token=([^;]+)/);
  const githubToken = tokenMatch?.[1];

  // GitHub OAuth App 的 client_id 和 client_secret（建议通过环境变量注入）
  const clientId = context.env.GITHUB_CLIENT_ID;
  const clientSecret = context.env.GITHUB_CLIENT_SECRET;

  // 调用 GitHub API 注销 token
  if (githubToken && clientId && clientSecret) {
    const revokeUrl = `https://api.github.com/applications/${clientId}/token`;
    const authHeader = 'Basic ' + btoa(`${clientId}:${clientSecret}`);

    await fetch(revokeUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_token: githubToken }),
    }).catch((err) => {
      console.error("GitHub token revoke failed:", err);
    });
  }

  // 清除所有 Cookie
  const cookieNames = cookieHeader
    .split(";")
    .map(s => s.split("=")[0].trim())
    .filter(Boolean);

  const expired = "Thu, 01 Jan 1970 00:00:00 GMT";
  const baseAttrs = `Path=/; Expires=${expired}; Max-Age=0; Secure; SameSite=None; HttpOnly`;

  const headers = new Headers({
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  });

  for (const name of cookieNames) {
    headers.append("Set-Cookie", `${name}=; ${baseAttrs}`);
    if (hostname && hostname !== "localhost") {
      headers.append("Set-Cookie", `${name}=; Domain=${hostname}; ${baseAttrs}`);
      headers.append("Set-Cookie", `${name}=; Domain=.${hostname}; ${baseAttrs}`);
    }
  }

  return new Response(JSON.stringify({ status: "ok" }), {
    status: 200,
    headers,
  });
};
