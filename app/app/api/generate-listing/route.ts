
import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { platform, customPrompt } = await request.json();

    if (!platform) {
      return new Response(
        JSON.stringify({ error: 'Platform is required' }),
        { status: 400 }
      );
    }

    // Get the platform and template data
    const platformData = await prisma.platform.findUnique({
      where: { id: platform },
    });

    const template = await prisma.listingTemplate.findFirst({
      where: { platformId: platform },
    });

    if (!platformData || !template) {
      return new Response(
        JSON.stringify({ error: 'Platform or template not found' }),
        { status: 404 }
      );
    }

    // Prepare the prompt for the LLM
    let systemPrompt = `You are an expert marketplace listing optimizer specializing in high-value specialty items. Your task is to create compelling, platform-optimized listings for a CNCUSA-HD-12L 12V DC mini-split air conditioner.

PRODUCT DETAILS:
- Brand: Cruise N Comfort USA HD-12L
- Type: 12V DC mini-split air conditioner
- Cooling Capacity: 10,000 BTU
- Power: 12V DC (10-15 VDC range)
- Current Draw: 38-55 AMPS
- Construction: Stainless steel for harsh environments
- System: Split system (indoor/outdoor units)
- Condition: Brand new, in original packaging
- Retail Price: $4,398 + $175 shipping = $4,573 total
- Asking Price: $4,200 FIRM
- Location: Mid-Wilshire, Los Angeles (90036)
- Pickup Only: Cannot ship or deliver

TARGET AUDIENCE: Van life enthusiasts, RV owners, off-grid living community, marine applications, professional van builders.

PLATFORM: ${platformData.displayName}
PLATFORM DESCRIPTION: ${platformData.description}

BASE TEMPLATE TITLE: ${template.title}
BASE TEMPLATE DESCRIPTION: ${template.description}

REQUIREMENTS:
- Keep price at $4,200 FIRM, non-negotiable
- Emphasize professional-grade quality vs cheap alternatives
- Highlight energy efficiency and battery compatibility
- Include all technical specifications
- Maintain pickup-only requirement
- Professional installation required (R134a refrigerant)
- Appeal to target audience`;

    if (customPrompt) {
      systemPrompt += `\n\nADDITIONAL CUSTOMIZATION REQUEST: ${customPrompt}`;
    }

    systemPrompt += `\n\nPlease respond in JSON format with the following structure:
{
  "title": "Optimized title for ${platformData.displayName}",
  "description": "Complete optimized description"
}

Respond with raw JSON only. Do not include code blocks, markdown, or any other formatting.`;

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
            content: `Create an optimized listing for ${platformData.displayName}. ${customPrompt ? `Focus on: ${customPrompt}` : 'Use the base template as reference but optimize for this platform.'}`
          }
        ],
        stream: true,
        max_tokens: 2000,
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
                      message: 'Failed to parse generated content'
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
                    message: 'Generating optimized listing...'
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
            message: 'Failed to generate listing'
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
    console.error('Error generating listing:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate listing' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
