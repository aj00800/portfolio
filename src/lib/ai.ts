import fs from 'fs';
import path from 'path';
import Groq from 'groq-sdk';

export type AiAnalysis = {
  summary: string;
  category:
    | 'Shopify Development'
    | 'React Development'
    | 'Node.js Backend'
    | 'Django'
    | 'UI/UX Design'
    | 'Full Stack'
    | 'Portfolio Inquiry'
    | 'Pricing Question'
    | 'Job Opportunity'
    | 'Internship'
    | 'General Question'
    | 'Spam';
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  lead_quality: 'High' | 'Medium' | 'Low';
  lead_score: number; // 0–100
  generated_reply: string;
};

function loadKnowledgeBase(): string {
  const knowledgeDir = path.join(process.cwd(), 'src', 'knowledge');
  const files = fs.readdirSync(knowledgeDir).filter((f) => f.endsWith('.md'));
  return files
    .map((file) => {
      const content = fs.readFileSync(path.join(knowledgeDir, file), 'utf-8');
      return `--- ${file} ---\n${content}`;
    })
    .join('\n\n');
}

export async function analyzeInquiry(data: {
  name: string;
  email: string;
  company?: string;
  subject: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
}): Promise<AiAnalysis> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY is not configured');

  const client = new Groq({ apiKey });
  const knowledgeBase = loadKnowledgeBase();

  const systemPrompt = `You are an assistant that analyzes client inquiries for a freelance web developer's portfolio and drafts replies on their behalf.
You have access to the developer's knowledge base below (services, pricing, availability, FAQ, resume/experience). Use it to inform your analysis and reply — do not invent services, prices, or experience not listed there.

KNOWLEDGE BASE:
${knowledgeBase}

Respond ONLY with a valid JSON object matching this exact shape:
{
  "summary": "2-3 sentence summary of what the client wants",
  "category": one of: "Shopify Development" | "React Development" | "Node.js Backend" | "Django" | "UI/UX Design" | "Full Stack" | "Portfolio Inquiry" | "Pricing Question" | "Job Opportunity" | "Internship" | "General Question" | "Spam",
  "sentiment": one of: "Positive" | "Neutral" | "Negative",
  "lead_quality": one of: "High" | "Medium" | "Low",
  "lead_score": integer from 0 to 100,
  "generated_reply": "a complete, ready-to-send email reply to the client, written in first person as the developer"
}

Lead scoring guide:
- High (70–100): clear project scope, budget mentioned, serious tone, known project type
- Medium (40–69): interested but vague on scope or budget
- Low (0–39): very vague, no budget, spam-like, or just a general question

Reply-writing guide:
- Tone: friendly, professional, helpful, natural — never robotic or templated-sounding.
- Address the client by name, reference specifics from their message.
- Personalize using the knowledge base (relevant services/experience/pricing) — never invent facts.
- Keep it concise (under ~150 words) with a clear next step (e.g. propose a call, ask a clarifying question).
- Sign off as "Abdullah".
- If the inquiry is spam or nonsensical, still produce a short polite generic reply (it will not be sent unless approved).`;

  const userPrompt = `Analyze this inquiry:

Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}` : ''}
Subject: ${data.subject}
${data.projectType ? `Project type: ${data.projectType}` : ''}
${data.budget ? `Budget: ${data.budget}` : ''}
${data.timeline ? `Timeline: ${data.timeline}` : ''}
Message: ${data.message}`;

  const response = await client.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    response_format: { type: 'json_object' },
    temperature: 0.2
  });

  const raw = response.choices[0].message.content;
  if (!raw) throw new Error('Empty response from Groq');

  const parsed = JSON.parse(raw) as AiAnalysis;
  return parsed;
}
