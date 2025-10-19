// @ts-nocheck
export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const formData = await request.formData();
  const token = formData.get("cf-turnstile-response");

  if (!token) {
    return new Response(JSON.stringify({ success: false, error: "missing_token" }), { status: 400 });
  }

  const secret = env.TURNSTILE_SECRET_KEY;

  const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token }),
  });

  const result = await verifyRes.json();

  if (!result.success) {
    return new Response(JSON.stringify({ success: false, error: result["error-codes"] }), { status: 403 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};