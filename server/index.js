import express from 'express'
import { companyProfile, services } from '../src/data/company.js'

const app = express()
const port = Number(process.env.PORT || 8787)

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const GOOGLE_MODEL = process.env.GOOGLE_MODEL || 'gemini-2.0-flash'
const GOOGLE_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GOOGLE_MODEL}:generateContent`

const SUPPORT_DOCUMENT = [
  `Company: ${companyProfile.name}`,
  `Tagline: ${companyProfile.tagline}`,
  `Mission: ${companyProfile.mission}`,
  '',
  'Support Knowledge Base (Services):',
  ...services.map((service) => `- ${service.title}: ${service.summary}`),
].join('\n')

app.use(express.json({ limit: '1mb' }))

function buildFallbackReply(input) {
  const value = String(input || '').toLowerCase()

  const formatResponse = (title, bullets, nextStep) => {
    return `${title}\n\nSupport Notes:\n- ${bullets.join('\n- ')}\n\nNext Step:\n${nextStep}`
  }

  if (value.includes('ai') || value.includes('rag') || value.includes('agent')) {
    return formatResponse(
      'Vyana RAG Support: AI Agent Workflow',
      [
        'Define business objective and escalation boundaries.',
        'Connect document sources for retrieval and grounding.',
        'Add observability for answer quality and latency.',
      ],
      'Share your use case and expected daily queries. We will prepare an implementation plan.'
    )
  }

  if (value.includes('price') || value.includes('cost') || value.includes('quote')) {
    return formatResponse(
      'Vyana Support: Quotation Preparation',
      [
        'Collect requirements, timeline, and expected user load.',
        'Define phased delivery with security and QA milestones.',
        'Map budget to scope with optional scale-up paths.',
      ],
      'Use the Contact form or ask me for a project checklist before requesting a quote.'
    )
  }

  if (value.includes('cloud') || value.includes('migration') || value.includes('aws') || value.includes('azure') || value.includes('gcp')) {
    return formatResponse(
      'Vyana Support: Cloud Migration',
      [
        'Start with inventory and dependency mapping.',
        'Run staged migration with rollback and health checks.',
        'Enable ongoing cost and performance governance.',
      ],
      'Tell me your current platform and target cloud. I will suggest a practical migration sequence.'
    )
  }

  if (value.includes('security') || value.includes('audit') || value.includes('firewall')) {
    return formatResponse(
      'Vyana Support: Security and Audit',
      [
        'Perform vulnerability and access posture review.',
        'Harden firewall policy and segmentation controls.',
        'Generate compliance-ready audit documentation.',
      ],
      'Share your compliance target and environment size to receive a tailored audit checklist.'
    )
  }

  return formatResponse(
    'Vyana Support: General Guidance',
    [
      'AI agent delivery and support automation.',
      'Cloud operations and migration planning.',
      'Security hardening and audit readiness.',
    ],
    'Ask a specific question and I will respond with structured support steps.'
  )
}

function extractAssistantText(payload) {
  const parts = payload?.candidates?.[0]?.content?.parts || []
  const merged = parts
    .map((part) => part?.text)
    .filter(Boolean)
    .join('\n')
    .trim()

  return merged || null
}

async function buildGoogleReply(input, conversation) {
  if (!GOOGLE_API_KEY) {
    return null
  }

  const conversationText = conversation
    .slice(-8)
    .map((message) => `${message.from === 'assistant' ? 'Assistant' : 'User'}: ${message.text}`)
    .join('\n')

  const prompt = [
    'You are Vyana Cytroksys Assistant, a RAG-style support assistant.',
    'Use only the support knowledge provided below.',
    'If user asks outside support scope, politely redirect to Cytroksys services/support.',
    'Always respond in this exact structure:',
    'Title',
    '',
    'Support Notes:',
    '- bullet 1',
    '- bullet 2',
    '- bullet 3',
    '',
    'Next Step:',
    'one practical next action.',
    '',
    SUPPORT_DOCUMENT,
    '',
    `Conversation:\n${conversationText}`,
    '',
    `Latest User Query: ${input}`,
  ].join('\n')

  const response = await fetch(`${GOOGLE_API_URL}?key=${encodeURIComponent(GOOGLE_API_KEY)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.25,
        topP: 0.9,
        maxOutputTokens: 420,
      },
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Google API error ${response.status}: ${errorText}`)
  }

  const payload = await response.json()
  return extractAssistantText(payload)
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'vyana-api' })
})

app.post('/api/vyana', async (req, res) => {
  const input = String(req.body?.input || '').trim()
  const conversation = Array.isArray(req.body?.conversation) ? req.body.conversation : []

  if (!input) {
    res.status(400).json({ error: 'input is required' })
    return
  }

  try {
    const googleReply = await buildGoogleReply(input, conversation)
    const reply = googleReply || buildFallbackReply(input)
    const mode = googleReply ? 'google' : 'fallback'

    res.json({ reply, mode })
  } catch (error) {
    console.error('Vyana API error, sending fallback response.', error)
    res.json({ reply: buildFallbackReply(input), mode: 'fallback' })
  }
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Vyana API running on port ${port}`)
})
