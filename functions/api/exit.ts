export default {
  async fetch(request: Request): Promise<Response> {
    const cookieHeader = request.headers.get("cookie") || "";
    const host = request.headers.get("host") || "";
    const hostname = host.split(":")[0]; // 去掉端口号

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

    // 逐个设置清除 cookie
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
  },
};