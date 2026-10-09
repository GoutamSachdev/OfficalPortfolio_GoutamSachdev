// Single source of truth for skills: the résumé's Technical Skills section, the
// hero orbit, and the interactive constellation on /skills. Keeping them in one
// module means the page and the PDF can't drift apart.

// Skills that ride the outer orbit on the About page. Even indices are the six
// core keywords and stay visible on phones; the odd ones fade in from `md` up so
// the pills never collide on a small screen.
export const HERO_SKILLS = [
  'Python', 'LangChain',
  'FastAPI', 'Django',
  'RAG', 'LlamaIndex',
  'LangGraph', 'CrewAI',
  'Agentic AI', 'Generative AI',
  'Next.js', 'PyTorch',
]

// The résumé's Technical Skills section, kept in the same categories so the site
// and the PDF never drift apart. A few tools named only in the experience
// bullets (Celery, pgvector, Zendesk) are folded into the closest category.
export const SKILL_GROUPS = [
  {
    title: 'Programming',
    items: ['Python', 'C++', 'JavaScript', 'SQL'],
  },
  {
    title: 'Frameworks & Libraries',
    items: [
      'FastAPI', 'Django', 'Flask', 'ReactJS', 'Next.js', 'OpenCV',
      'PyTorch', 'TensorFlow', 'Keras', 'Scikit-Learn', 'Hugging Face',
      'LangChain', 'CrewAI', 'LangGraph',
    ],
  },
  {
    title: 'Databases & Storage',
    items: [
      'MySQL', 'PostgreSQL', 'pgvector', 'MongoDB', 'Redis',
      'ChromaDB', 'Pinecone', 'Deep Lake',
    ],
  },
  {
    title: 'AI & Agentic Systems',
    items: [
      'Agentic AI', 'AI Agents', 'Multi-Agent Systems', 'Prompt Engineering',
      'RAG', 'Graph RAG', 'Generative AI', 'LlamaIndex',
    ],
  },
  {
    title: 'Core Skills',
    items: [
      'REST API Development', 'Backend Development', 'API Integration',
      'Computer Vision', 'Celery', 'JWT Auth', 'WebRTC',
    ],
  },
  {
    title: 'Tools & Platforms',
    items: ['Git', 'Docker', 'LiveKit', 'n8n', 'Zendesk', 'OpenAI ChatKit'],
  },
]

// Colours are mid-tone so the same value reads on both the light (#f7f7f5) and
// dark (#0f0f10) backgrounds — no separate dark palette needed.
export const CATEGORIES = [
  { id: 'ai', label: 'AI & Agentic Systems', short: 'AI', color: '#B63E96' },
  { id: 'frameworks', label: 'Frameworks & Libraries', short: 'Frameworks', color: '#58E6D9' },
  { id: 'data', label: 'Databases & Storage', short: 'Databases', color: '#9B8CFF' },
  { id: 'tools', label: 'Tools & Platforms', short: 'Tools', color: '#F2A93B' },
  { id: 'lang', label: 'Programming', short: 'Languages', color: '#4EA8DE' },
]

export const CATEGORY_BY_ID = CATEGORIES.reduce((acc, c) => {
  acc[c.id] = c
  return acc
}, {})

// Geometry of the constellation, in SVG user units. Rings are laid out by
// category, with the specialism nearest the hub.
//
// The viewBox is sized around the widest thing on screen, which is a label
// hanging off an outer node: outermost ring (430) + node radius (38) + label gap
// (26) + half a label. That reach is ~514 units vertically and ~614
// horizontally, so the centre sits at (700, 530) inside a 1400x1060 box — which
// also leaves the outer labels inside the box rather than clipped by the
// scroller (one axis scrolling forces the other to scroll too).
export const SKETCH_VIEW = { w: 1400, h: 1060, cx: 700, cy: 530 }
export const RING_R = { 1: 150, 2: 245, 3: 340, 4: 430 }
export const NODE_R = 38

// Per-ring rotation, fitted offline by maximising the distance between the
// closest pair of node centres (see the note in SkillsPlayground). Rings share
// no common pitch — 6, 6, 5 and 7 nodes — so a formula can't align them; these
// values push the closest pair out to 96 units, which clears 2 x NODE_R.
export const RING_PHASE = {
  1: 2.6965, // 154.5 deg
  2: 0.0785, //   4.5 deg
  3: 0.6021, //  34.5 deg
  4: 1.2305, //  70.5 deg
}

/**
 * The constellation. `ring` picks the radius; nodes are spread evenly around
 * their ring with a per-ring phase offset so no two rings line up radially.
 * `usedIn` names real résumé projects and is intentionally left empty where the
 * résumé doesn't show the tool shipping in a named project — an empty list just
 * hides that part of the detail panel.
 */
export const SKILL_NODES = [
  // Ring 1 — the specialism
  { id: 'rag', label: 'RAG', category: 'ai', ring: 1, usedIn: ['SHIFU', 'Hybrid Graph RAG', 'Customer Support Chatbot'], note: 'Retrieval-augmented generation — grounding answers in the customer\'s own documents.' },
  { id: 'graphrag', label: 'Graph RAG', category: 'ai', ring: 1, usedIn: ['Hybrid Graph RAG'], note: 'Knowledge-graph retrieval fused with vector search for multi-hop questions.' },
  { id: 'agentic', label: 'Agentic AI', category: 'ai', ring: 1, usedIn: ['SHIFU', 'E-commerce AI Shopping Assistant'], note: 'Agents that plan, call tools, and finish a task without a human in the loop.' },
  { id: 'llamaindex', label: 'LlamaIndex', category: 'ai', ring: 1, usedIn: ['Hybrid Graph RAG', 'Real-time Voice Support Chatbot'], note: 'The retrieval framework behind the hybrid pipelines.' },
  { id: 'crewai', label: 'CrewAI', category: 'ai', ring: 1, usedIn: ['Customer Support Chatbot'], note: 'Multi-agent crews with defined roles and hand-offs.' },
  { id: 'cv', label: 'Computer Vision', category: 'ai', ring: 1, usedIn: ['AutoBlackjack', 'Pediatric Wrist Report'], note: 'Detection and medical imaging work in PyTorch and OpenCV.' },

  // Ring 2 — the frameworks
  { id: 'fastapi', label: 'FastAPI', category: 'frameworks', ring: 2, usedIn: ['SHIFU', 'E-commerce AI Shopping Assistant', 'Real-time Voice Support Chatbot'], note: 'The default service layer: async APIs wrapping the model calls.' },
  { id: 'django', label: 'Django', category: 'frameworks', ring: 2, usedIn: ['Washery'], note: 'Batteries-included backend for data-heavy product work.' },
  { id: 'nextjs', label: 'Next.js', category: 'frameworks', ring: 2, usedIn: ['Customer Support Chatbot', 'Hybrid Graph RAG'], note: 'Front end for the AI products — this site included.' },
  { id: 'pytorch', label: 'PyTorch', category: 'frameworks', ring: 2, usedIn: ['Pediatric Wrist Report'], note: 'Model training and inference for the vision work.' },
  { id: 'langchain', label: 'LangChain', category: 'frameworks', ring: 2, usedIn: [], note: 'Chains, tools, and retrieval glue for LLM applications.' },
  { id: 'langgraph', label: 'LangGraph', category: 'frameworks', ring: 2, usedIn: ['E-commerce AI Shopping Assistant', 'Schedule Assistant'], note: 'Stateful graphs for agents that need loops and branching.' },

  // Ring 3 — storage
  { id: 'postgres', label: 'PostgreSQL', category: 'data', ring: 3, usedIn: ['SHIFU', 'Washery', 'E-commerce AI Shopping Assistant'], note: 'Primary store across the backend work.' },
  { id: 'pgvector', label: 'pgvector', category: 'data', ring: 3, usedIn: ['SHIFU'], note: 'Vector search inside Postgres — no second datastore to operate.' },
  { id: 'redis', label: 'Redis', category: 'data', ring: 3, usedIn: ['SHIFU'], note: 'Queue broker and cache in front of the ingestion pipeline.' },
  { id: 'mongodb', label: 'MongoDB', category: 'data', ring: 3, usedIn: [], note: 'Document store for flexible, schema-light records.' },
  { id: 'pinecone', label: 'Pinecone', category: 'data', ring: 3, usedIn: [], note: 'Managed vector index for retrieval at scale.' },

  // Ring 4 — languages and tools
  { id: 'python', label: 'Python', category: 'lang', ring: 4, usedIn: ['SHIFU', 'Washery', 'Hybrid Graph RAG'], note: 'The language everything else here is built in.' },
  { id: 'docker', label: 'Docker', category: 'tools', ring: 4, usedIn: ['SHIFU'], note: 'Containerised services and reproducible deploys.' },
  { id: 'celery', label: 'Celery', category: 'tools', ring: 4, usedIn: ['SHIFU'], note: 'Background ingestion so uploads never block a request.' },
  { id: 'livekit', label: 'LiveKit', category: 'tools', ring: 4, usedIn: ['Real-time Voice Support Chatbot', 'AI Voice Agent'], note: 'WebRTC transport for the real-time voice agents.' },
  { id: 'javascript', label: 'JavaScript', category: 'lang', ring: 4, usedIn: [], note: 'Front-end and Node-side scripting.' },
  { id: 'n8n', label: 'n8n', category: 'tools', ring: 4, usedIn: [], note: 'Visual automation for wiring services together.' },
  { id: 'sql', label: 'SQL', category: 'lang', ring: 4, usedIn: ['SHIFU', 'Washery'], note: 'Query design and indexing work across the databases.' },
]

// Which skills connect to which. Undirected — the component builds the
// adjacency both ways. These encode how the stack actually fits together, which
// is what makes walking the graph informative rather than decorative.
export const SKILL_EDGES = [
  ['python', 'fastapi'],
  ['python', 'django'],
  ['python', 'pytorch'],
  ['python', 'langchain'],
  ['python', 'rag'],
  ['python', 'sql'],
  ['javascript', 'nextjs'],
  ['sql', 'postgres'],
  ['fastapi', 'rag'],
  ['fastapi', 'postgres'],
  ['fastapi', 'redis'],
  ['fastapi', 'celery'],
  ['fastapi', 'livekit'],
  ['fastapi', 'mongodb'],
  ['django', 'postgres'],
  ['django', 'mongodb'],
  ['django', 'docker'],
  ['nextjs', 'fastapi'],
  ['nextjs', 'docker'],
  ['langchain', 'rag'],
  ['langchain', 'llamaindex'],
  ['langchain', 'langgraph'],
  ['langgraph', 'agentic'],
  ['langgraph', 'crewai'],
  ['crewai', 'agentic'],
  ['llamaindex', 'graphrag'],
  ['rag', 'graphrag'],
  ['rag', 'pgvector'],
  ['rag', 'pinecone'],
  ['pgvector', 'postgres'],
  ['redis', 'celery'],
  ['pytorch', 'cv'],
  ['livekit', 'agentic'],
  ['n8n', 'agentic'],
]
