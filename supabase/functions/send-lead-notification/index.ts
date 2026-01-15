import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LeadData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  business?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('🚀 Edge function called:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('🔧 Handling CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('📝 Processing lead notification request');
    const leadData: LeadData = await req.json();
    console.log('📋 Lead data received:', { name: leadData.name, email: leadData.email });
    
    const slackWebhookUrl = Deno.env.get('SLACK_WEBHOOK_URL');
    console.log('🔐 Slack webhook configured:', !!slackWebhookUrl);

    if (!slackWebhookUrl) {
      console.error('SLACK_WEBHOOK_URL not configured');
      return new Response(
        JSON.stringify({ error: 'Slack webhook not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create Slack message
    const slackMessage = {
      text: "🚀 Nuevo Lead - Abrir Empresa Dubai",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🚀 Nuevo Lead Recibido",
            emoji: true
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Nombre:*\n${leadData.name}`
            },
            {
              type: "mrkdwn",
              text: `*Email:*\n${leadData.email}`
            }
          ]
        }
      ]
    };

    // Add optional fields if they exist
    if (leadData.phone || leadData.company) {
      slackMessage.blocks.push({
        type: "section",
        fields: [
          ...(leadData.phone ? [{
            type: "mrkdwn",
            text: `*Teléfono:*\n${leadData.phone}`
          }] : []),
          ...(leadData.company ? [{
            type: "mrkdwn",
            text: `*Empresa:*\n${leadData.company}`
          }] : [])
        ]
      });
    }

    if (leadData.business) {
      slackMessage.blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Tipo de Negocio:*\n${leadData.business}`
        }
      });
    }

    if (leadData.message) {
      slackMessage.blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Mensaje:*\n${leadData.message}`
        }
      });
    }

    // Add timestamp
    slackMessage.blocks.push({
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `📅 ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}`
        }
      ]
    });

    // Send to Slack
    console.log('📤 Sending message to Slack...');
    const slackResponse = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage),
    });

    console.log('📡 Slack response status:', slackResponse.status);
    
    if (!slackResponse.ok) {
      const errorText = await slackResponse.text();
      console.error('❌ Failed to send Slack notification:', slackResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to send notification', details: errorText }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('✅ Lead notification sent successfully:', leadData.name);

    return new Response(
      JSON.stringify({ success: true, message: 'Notification sent successfully' }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('❌ Error in send-lead-notification function:', error);
    console.error('❌ Error stack:', error.stack);
    return new Response(
      JSON.stringify({ error: error.message, stack: error.stack }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);