// Cloudflare Pages Function for authentication
export async function onRequestPost(context: any) {
  try {
    const { email, password } = await context.request.json();

    // Demo authentication
    if (email === 'seller@example.com' && password === 'sellerpass123') {
      return new Response(
        JSON.stringify({ 
          token: 'demo-token-' + Date.now(),
          user: { email, name: 'Demo Seller' }
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid credentials' }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 401,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
}

