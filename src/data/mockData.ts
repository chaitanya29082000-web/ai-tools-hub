import {
  MessageSquare,
  ImageIcon,
  Code,
  Mic,
  Video,
  BarChart3,
  Bot,
  PenTool,
  Languages,
  Zap,
  Palette,
  Search,
  FileText,
  Globe,
  Layers,
  Brain,
  Music,
  Camera,
  Shield,
  Database,
  Workflow,
  BookOpen,
  Headphones,
  Film,
  PieChart,
  type LucideIcon,
} from 'lucide-react'

import type { Category, Tool } from '../types'

export const iconMap: Record<string, LucideIcon> = {
  PenTool, ImageIcon, Code, Mic, Video, BarChart3, Bot,
  MessageSquare, Languages, Zap, Palette, Search, FileText,
  Globe, Layers, Brain, Music, Camera, Shield, Database, Workflow,
  BookOpen, Headphones, Film, PieChart,
}

export const categories: Category[] = [
  { id: 'text', name: 'Text Generation', description: 'AI-powered writing and content creation', icon: PenTool, toolCount: 24, color: '#6366f1' },
  { id: 'image', name: 'Image Generation', description: 'Create images from text prompts', icon: ImageIcon, toolCount: 18, color: '#8b5cf6' },
  { id: 'code', name: 'Code Assistant', description: 'AI coding help and code generation', icon: Code, toolCount: 15, color: '#3b82f6' },
  { id: 'voice', name: 'Voice & Audio', description: 'Speech synthesis and audio tools', icon: Mic, toolCount: 12, color: '#06b6d4' },
  { id: 'video', name: 'Video Creation', description: 'AI video generation and editing', icon: Video, toolCount: 10, color: '#14b8a6' },
  { id: 'data', name: 'Data Analysis', description: 'Insights from your data with AI', icon: BarChart3, toolCount: 14, color: '#f59e0b' },
  { id: 'chatbots', name: 'Chatbots', description: 'Conversational AI assistants', icon: Bot, toolCount: 20, color: '#10b981' },
  { id: 'writing', name: 'Writing Tools', description: 'Grammar, style, and editing', icon: MessageSquare, toolCount: 16, color: '#ec4899' },
  { id: 'translation', name: 'Translation', description: 'Multi-language translation AI', icon: Languages, toolCount: 8, color: '#f97316' },
  { id: 'productivity', name: 'Productivity', description: 'Automate workflows and tasks', icon: Zap, toolCount: 22, color: '#eab308' },
  { id: 'design', name: 'Design Tools', description: 'AI-assisted graphic design', icon: Palette, toolCount: 11, color: '#a855f7' },
  { id: 'research', name: 'Research', description: 'AI research and information retrieval', icon: Search, toolCount: 13, color: '#64748b' },
]

export const initialTools: Tool[] = [
  // --- Text Generation ---
  {
    id: 'jasper', name: 'Jasper', description: 'AI content platform for marketing teams and content creators.',
    category: 'text', url: 'https://jasper.ai', icon: FileText, color: '#6366f1',
    tags: ['content', 'marketing', 'copywriting'], featured: false,
  },
  {
    id: 'copy-ai', name: 'Copy.ai', description: 'Generate marketing copy, blog posts, and social media content with AI.',
    category: 'text', url: 'https://copy.ai', icon: PenTool, color: '#6366f1',
    tags: ['copywriting', 'marketing', 'social media'], featured: false,
  },
  {
    id: 'writesonic', name: 'Writesonic', description: 'AI writing assistant for articles, ads, and product descriptions.',
    category: 'text', url: 'https://writesonic.com', icon: FileText, color: '#6366f1',
    tags: ['writing', 'SEO', 'ads'], featured: false,
  },

  // --- Image Generation ---
  {
    id: 'midjourney', name: 'Midjourney', description: 'Create stunning AI-generated artwork from text descriptions.',
    category: 'image', url: 'https://midjourney.com', icon: ImageIcon, color: '#8b5cf6',
    tags: ['art', 'image', 'creative'], featured: false,
  },
  {
    id: 'dalle', name: 'DALL·E', description: 'OpenAI\'s AI system for creating realistic images and art from text.',
    category: 'image', url: 'https://openai.com/dall-e-3', icon: Camera, color: '#8b5cf6',
    tags: ['image', 'OpenAI', 'creative'], featured: false,
  },
  {
    id: 'stable-diffusion', name: 'Stable Diffusion', description: 'Open-source AI model for generating detailed images from text.',
    category: 'image', url: 'https://stability.ai', icon: ImageIcon, color: '#8b5cf6',
    tags: ['open-source', 'image', 'diffusion'], featured: false,
  },

  // --- Code Assistant ---
  {
    id: 'github', name: 'GitHub', description: 'The world\'s leading platform for developers. AI-powered code review and Copilot integration.',
    category: 'code', url: 'https://github.com', icon: Code, color: '#10b981',
    tags: ['code', 'collaboration', 'Copilot'], featured: true,
  },
  {
    id: 'devpost', name: 'Devpost', description: 'Discover and showcase hackathon projects. Find inspiration and collaborate with developers worldwide.',
    category: 'code', url: 'https://devpost.com', icon: Code, color: '#3b82f6',
    tags: ['hackathon', 'projects', 'community'], featured: true,
  },
  {
    id: 'cursor', name: 'Cursor', description: 'AI-first code editor built for pair programming with AI.',
    category: 'code', url: 'https://cursor.sh', icon: Code, color: '#3b82f6',
    tags: ['editor', 'coding', 'AI'], featured: false,
  },
  {
    id: 'replit', name: 'Replit', description: 'Collaborative browser-based IDE with AI code generation and deployment.',
    category: 'code', url: 'https://replit.com', icon: Code, color: '#3b82f6',
    tags: ['IDE', 'collaboration', 'deploy'], featured: false,
  },

  // --- Voice & Audio ---
  {
    id: 'elevenlabs', name: 'ElevenLabs', description: 'Realistic AI voice synthesis and speech-to-text conversion.',
    category: 'voice', url: 'https://elevenlabs.io', icon: Mic, color: '#06b6d4',
    tags: ['voice', 'TTS', 'speech'], featured: false,
  },
  {
    id: 'murf', name: 'Murf AI', description: 'Studio-quality AI voiceovers for videos, podcasts, and e-learning.',
    category: 'voice', url: 'https://murf.ai', icon: Headphones, color: '#06b6d4',
    tags: ['voiceover', 'TTS', 'podcasts'], featured: false,
  },
  {
    id: 'descript', name: 'Descript', description: 'AI-powered audio and video editing with transcription and screen recording.',
    category: 'voice', url: 'https://descript.com', icon: Music, color: '#06b6d4',
    tags: ['audio', 'editing', 'transcription'], featured: false,
  },

  // --- Video Creation ---
  {
    id: 'runway', name: 'Runway', description: 'Professional AI video generation and editing tools for creators.',
    category: 'video', url: 'https://runway.ml', icon: Video, color: '#14b8a6',
    tags: ['video', 'editing', 'creative'], featured: false,
  },
  {
    id: 'synthesia', name: 'Synthesia', description: 'Create AI videos with virtual avatars from text in 120+ languages.',
    category: 'video', url: 'https://synthesia.io', icon: Film, color: '#14b8a6',
    tags: ['avatar', 'text-to-video', 'localized'], featured: false,
  },
  {
    id: 'pika', name: 'Pika', description: 'Generate and edit videos using text prompts and AI.',
    category: 'video', url: 'https://pika.art', icon: Video, color: '#14b8a6',
    tags: ['text-to-video', 'creative', 'editing'], featured: false,
  },

  // --- Data Analysis ---
  {
    id: 'tableau', name: 'Tableau AI', description: 'AI-driven data visualization and business intelligence.',
    category: 'data', url: 'https://tableau.com', icon: BarChart3, color: '#f59e0b',
    tags: ['data', 'visualization', 'analytics'], featured: false,
  },
  {
    id: 'julius', name: 'Julius', description: 'AI data analyst that creates charts, runs SQL, and analyzes datasets.',
    category: 'data', url: 'https://julius.ai', icon: PieChart, color: '#f59e0b',
    tags: ['data analysis', 'SQL', 'charts'], featured: false,
  },
  {
    id: 'obviously-ai', name: 'Obviously AI', description: 'No-code machine learning for predictions and data insights.',
    category: 'data', url: 'https://obviously.ai', icon: Database, color: '#f59e0b',
    tags: ['no-code', 'ML', 'predictions'], featured: false,
  },

  // --- Chatbots ---
  {
    id: 'openrouter', name: 'OpenRouter', description: 'Access hundreds of AI models through a single unified API with flexible pricing.',
    category: 'chatbots', url: 'https://openrouter.ai', icon: Bot, color: '#8b5cf6',
    tags: ['API', 'models', 'LLM'], featured: true,
  },
  {
    id: 'chatgpt', name: 'ChatGPT', description: 'Advanced conversational AI for writing, analysis, and problem-solving.',
    category: 'chatbots', url: 'https://chat.openai.com', icon: Bot, color: '#10b981',
    tags: ['chat', 'writing', 'analysis'], featured: false,
  },
  {
    id: 'claude', name: 'Claude', description: 'Anthropic\'s AI assistant for thoughtful analysis, writing, and coding.',
    category: 'chatbots', url: 'https://claude.ai', icon: Bot, color: '#10b981',
    tags: ['chat', 'analysis', 'coding'], featured: false,
  },

  // --- Writing Tools ---
  {
    id: 'grammarly', name: 'Grammarly', description: 'AI writing assistant for grammar, style, and tone improvement.',
    category: 'writing', url: 'https://grammarly.com', icon: PenTool, color: '#ec4899',
    tags: ['grammar', 'writing', 'editing'], featured: false,
  },
  {
    id: 'hemingway', name: 'Hemingway Editor', description: 'Make your writing bold and clear with AI-powered readability analysis.',
    category: 'writing', url: 'https://hemingwayapp.com', icon: BookOpen, color: '#ec4899',
    tags: ['readability', 'editing', 'style'], featured: false,
  },
  {
    id: 'prowritingaid', name: 'ProWritingAid', description: 'In-depth writing analysis with style, grammar, and readability reports.',
    category: 'writing', url: 'https://prowritingaid.com', icon: MessageSquare, color: '#ec4899',
    tags: ['grammar', 'style', 'reports'], featured: false,
  },

  // --- Translation ---
  {
    id: 'deepl', name: 'DeepL', description: 'Neural machine translation for accurate and natural translations.',
    category: 'translation', url: 'https://deepl.com', icon: Languages, color: '#f97316',
    tags: ['translation', 'languages', 'neural'], featured: false,
  },
  {
    id: 'language-io', name: 'Linguana', description: 'AI-powered translation management for multilingual websites.',
    category: 'translation', url: 'https://linguana.io', icon: Globe, color: '#f97316',
    tags: ['website', 'i18n', 'localization'], featured: false,
  },

  // --- Productivity ---
  {
    id: 'flowcv', name: 'FlowCV', description: 'Build a professional resume in minutes with AI-powered suggestions and modern templates.',
    category: 'productivity', url: 'https://flowcv.com', icon: PenTool, color: '#6366f1',
    tags: ['resume', 'career', 'AI'], featured: true,
  },
  {
    id: 'notion-ai', name: 'Notion AI', description: 'AI-powered workspace for notes, docs, and project management.',
    category: 'productivity', url: 'https://notion.so', icon: Layers, color: '#eab308',
    tags: ['workspace', 'notes', 'project management'], featured: false,
  },
  {
    id: 'zapier', name: 'Zapier AI', description: 'Automate workflows by connecting apps with AI-powered actions.',
    category: 'productivity', url: 'https://zapier.com', icon: Workflow, color: '#eab308',
    tags: ['automation', 'integration', 'workflows'], featured: false,
  },

  // --- Design Tools ---
  {
    id: 'canva', name: 'Canva', description: 'AI-enhanced graphic design platform with smart templates.',
    category: 'design', url: 'https://canva.com', icon: Palette, color: '#a855f7',
    tags: ['design', 'templates', 'graphics'], featured: false,
  },
  {
    id: 'figma', name: 'Figma AI', description: 'Collaborative design tool with AI-powered features for UI/UX.',
    category: 'design', url: 'https://figma.com', icon: Palette, color: '#a855f7',
    tags: ['UI', 'UX', 'collaboration'], featured: false,
  },
  {
    id: 'remove-bg', name: 'Remove.bg', description: 'AI-powered background removal for product and portrait photos.',
    category: 'design', url: 'https://remove.bg', icon: Camera, color: '#a855f7',
    tags: ['background', 'remove', 'photos'], featured: false,
  },

  // --- Research ---
  {
    id: 'perplexity', name: 'Perplexity', description: 'AI-powered answer engine with real-time web search capabilities.',
    category: 'research', url: 'https://perplexity.ai', icon: Search, color: '#64748b',
    tags: ['search', 'research', 'answers'], featured: false,
  },
  {
    id: 'consensus', name: 'Consensus', description: 'AI-powered academic search engine for scientific research.',
    category: 'research', url: 'https://consensus.app', icon: Brain, color: '#64748b',
    tags: ['academic', 'science', 'papers'], featured: false,
  },
  {
    id: 'elicit', name: 'Elicit', description: 'AI research assistant that reads and analyzes academic papers.',
    category: 'research', url: 'https://elicit.com', icon: Search, color: '#64748b',
    tags: ['papers', 'analysis', 'literature review'], featured: false,
  },
]
