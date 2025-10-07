
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { trigger, category } = await request.json();

    if (!trigger || !category) {
      return new Response(
        JSON.stringify({ error: 'Trigger and category are required' }),
        { status: 400 }
      );
    }

    // Create system prompt based on the research strategy
    const systemPrompt = `You are an expert at creating professional, automated response templates for marketplace inquiries. You're helping sell a CNCUSA-HD-12L 12V DC mini-split air conditioner.

PRODUCT CONTEXT:
- CNCUSA-HD-12L 12V DC Mini-Split Air Conditioner
- 10,000 BTU cooling capacity
- Professional-grade, American-made
- Price: $4,200 FIRM (non-negotiable)
- Retail: $4,398 + $175 shipping = $4,573 total
- Location: Mid-Wilshire, Los Angeles (90036)
- Condition: Brand new, in original packaging
- Pickup only - cannot ship or deliver
- Professional installation required (R134a refrigerant)
- Target audience: Van life, RV, off-grid, marine applications

STRATEGY PRINCIPLES:
- Filter out unserious buyers early
- Emphasize firm pricing
- Pre-qualify leads efficiently  
- Professional but friendly tone
- Include all essential information upfront
- End with a qualifying question when appropriate

TRIGGER: "${trigger}"
CATEGORY: ${category}

Create a professional auto-response that addresses this trigger effectively. The response should:
1. Be helpful and informative
2. Include relevant product details
3. Maintain firm pricing stance
4. End with a qualifying question if appropriate
5. Be concise but complete (2-4 sentences max)

Please respond in JSON format with:
{
  "response": "Your generated auto-response message"
}

Respond with raw JSON only.`;

    // Make the API call to LLM
    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Generate an auto-response for trigger "${trigger}" in category ${category}.`
          }
        ],
        stream: true,
        max_tokens: 500,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        let buffer = '';
        let partialRead = '';

        try {
          while (true) {
            const { done, value } = await reader?.read() ?? { done: true, value: undefined };
            if (done) break;

            partialRead += decoder.decode(value, { stream: true });
            let lines = partialRead.split('\n');
            partialRead = lines.pop() || '';

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') {
                  try {
                    const finalResult = JSON.parse(buffer);
                    const finalData = JSON.stringify({
                      status: 'completed',
                      result: finalResult
                    });
                    controller.enqueue(encoder.encode(`data: ${finalData}\n\n`));
                  } catch (e) {
                    console.error('Error parsing final JSON:', e);
                    const errorData = JSON.stringify({
                      status: 'error',
                      message: 'Failed to parse generated response'
                    });
                    controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
                  }
                  return;
                }
                try {
                  const parsed = JSON.parse(data);
                  buffer += parsed.choices?.[0]?.delta?.content || '';
                  
                  const progressData = JSON.stringify({
                    status: 'processing',
                    message: 'Generating response...'
                  });
                  controller.enqueue(encoder.encode(`data: ${progressData}\n\n`));
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }
        } catch (error) {
          console.error('Stream error:', error);
          const errorData = JSON.stringify({
            status: 'error',
            message: 'Failed to generate response'
          });
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error generating response:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate response' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
