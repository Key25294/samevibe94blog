import { Post, Category, LeadMagnet, Testimonial } from './types';

export const AUTHORS = {
  sameer: {
    name: "Sameer Vibe",
    role: "Founder & Creative Curator",
    avatar: "SV",
    bio: "Obsessed with psychology, minimalist living, and creating spaces for quiet introspection in a loud digital landscape."
  },
  elena: {
    name: "Dr. Elena Thorne",
    role: "Contributing Writer • Cognitive Psychologist",
    avatar: "ET",
    bio: "Focuses on neural-plasticity and mindful habits. Helping humans build compassionate relationships with their thoughts."
  }
};

export const CATEGORIES: Category[] = [
  {
    id: "personal-growth",
    name: "Personal Growth",
    slug: "personal-growth",
    description: "Honest ideas about habits, intentionality, and navigating life transitions gracefully.",
    iconName: "Compass",
    count: 14
  },
  {
    id: "psychology",
    name: "Psychology",
    slug: "psychology",
    description: "Understanding why we think, feel, and behave the way we do, minus the complex jargon.",
    iconName: "Brain",
    count: 18
  },
  {
    id: "productivity",
    name: "Productivity",
    slug: "productivity",
    description: "Redefining efficiency through the lens of human energy, flow, and mindful rhythms.",
    iconName: "Maximize2",
    count: 9
  },
  {
    id: "mindset",
    name: "Mindset",
    slug: "mindset",
    description: "Deconstructing mental blocks, shifting perspectives, and embracing cognitive flexibility.",
    iconName: "Sparkles",
    count: 12
  },
  {
    id: "creativity",
    name: "Creativity",
    slug: "creativity",
    description: "Unlocking artistic courage, overcoming resistance, and finding beauty in raw creation.",
    iconName: "Paintbrush",
    count: 8
  },
  {
    id: "life-lessons",
    name: "Life Lessons",
    slug: "life-lessons",
    description: "Soft reflections and everyday observations of the magic hidden in ordinary moments.",
    iconName: "Heart",
    count: 15
  }
];

export const POSTS: Post[] = [
  {
    id: "1",
    slug: "quiet-art-of-unlearning",
    title: "The Quiet Art of Unlearning: Why Letting Go is Our Greatest Growth",
    excerpt: "We spend the first half of our lives accumulating identities, beliefs, and expectations. Real maturation begins when we start the gentle process of questioning them.",
    content: [
      "I was sitting in a crowded café in Kyoto when it hit me. I had spent two decades building a fortress of opinions, certifications, and rules about who I was supposed to be. Yet, wrapped in that armor, I felt narrower instead of deeper. I had learned how to acquire, but I didn't know how to dissolve.",
      "In our hyper-performance society, learning is glorified as the ultimate virtue. We add skills, badges, and philosophies like files into an overstuffed hard drive. But what happens when the operating system of your life is running on outdated paradigms? What happens when the things you think you know are the exact barriers keeping you from being present?",
      "Unlearning is not the deletion of knowledge; it is the testing of its relevance to your current heart. It is the brave posture of saying: 'I used to believe that to be true, but I am different now.' It requires examining the rules we inherited—about success, emotional strength, and productivity—and noticing which ones are squeezing the life out of us.",
      "First, look at your 'shoulds'. Every time you say 'I should be doing this,' you are likely executing someone else’s code. Write them down and interrogate them. Second, embrace the clean state of 'I don’t know.' There is deep liberation in looking at a complex situation and refusing to rush to a quick judgment, choosing instead to let it speak.",
      "When we let go of carrying who we *were configed* to be, we open up a soft, curious space inside. We begin to look at ourselves, and others, with unshielded interest. Letting go doesn't make you empty—it makes you spacious."
    ],
    date: "June 10, 2026",
    readingTime: "5 min read",
    category: "Personal Growth",
    tags: ["Mindfulness", "Philosophy", "Deconstruction", "Habits"],
    author: AUTHORS.sameer,
    coverStyle: {
      bgGradient: "from-[#F4E8EA] to-[#FBEDED]",
      patternType: "waves"
    },
    isFeatured: true,
    isPopular: true,
    tableOfContents: [
      { id: "intro", label: "Sitting with the Armor" },
      { id: "overloaded", label: "The Overcrowded Mind" },
      { id: "what-is-unlearning", label: "Interrogating the Shoulds" },
      { id: "how-to", label: "Steps to Inner Spaciousness" }
    ],
    comments: [
      { id: "c1", author: "Mia Harrison", text: "This article put into words what I have been feeling for the past year. Thank you for validating the feeling of wanting to let go of old identities.", date: "Today, 10:14 AM", avatarColor: "bg-lavender-primary" },
      { id: "c2", author: "Julian Foster", text: "Refusing to rush into judgments is so hard in our current social media landscape. A reminder I sorely needed.", date: "Yesterday", avatarColor: "bg-lavender-secondary" }
    ]
  },
  {
    id: "2",
    slug: "psychology-of-emotional-friction",
    title: "The Psychology of Emotional Friction: Greeting Your Resistant Self",
    excerpt: "Whenever we attempt to change, a shadow self rises to pull us back. Here is how cognitive psychologist Dr. Elena Thorne suggests we negotiate with our internal resistance.",
    content: [
      "You decide to write for thirty minutes, but your kitchen counter suddenly demands a deep scrub. You decide to meditate, and your mind flashes back to an awkward email you sent in 2018. We call this procrastination, but psychology reveals it is something far more survival-based: emotional friction.",
      "Our brains are designed to prefer predictable distress over unpredictable peace. To your nervous system, any shift—even a highly positive one—is categorized as 'abnormal behavior' and therefore unsafe. Resistance is simply your ego’s clumsy attempt to wrap you in a protective blanket.",
      "Instead of turning resistance into a battlefield, what if we welcomed it as a guest? When you feel that sudden heavy reluctance, pause. Say internally: 'I see you trying to protect me from failing. Thank you, but we are safe to try this.' By removing the internal combat, you bypass the amygdala hijack.",
      "When we stop treating our self-sabotage as proof of weakness, we uncover its function. Emotional friction is a golden compass. It points directly to the boundaries of your current comfort zone. Walk softly towards that boundary, and cross it by a single millimeter today."
    ],
    date: "June 08, 2026",
    readingTime: "6 min read",
    category: "Psychology",
    tags: ["Mental Health", "Self-Sabotage", "Habits", "Neuroscience"],
    author: AUTHORS.elena,
    coverStyle: {
      bgGradient: "from-[#FBEDED] to-[#BCA2BD]/20",
      patternType: "circles"
    },
    isFeatured: true,
    isPopular: false,
    tableOfContents: [
      { id: "resistance", label: "The Subconscious Friction" },
      { id: "predictable-pain", label: "The Comfort of Pain" },
      { id: "greeting-guest", label: "Reframing Self-Sabotage" }
    ],
    comments: [
      { id: "c3", author: "Marcus Vance", text: "Unpredictable peace vs predictable distress explanation blew my mind. Makes so much sense.", date: "June 09", avatarColor: "bg-dark-theme" }
    ]
  },
  {
    id: "3",
    slug: "reclaiming-attention-span",
    title: "Deep Focus: Reclaiming Attention in the Era of Dopamine Loops",
    excerpt: "Our focus hasn't vanished—it has been commoditized. A practical blueprint on designing friction back into your environment to protect your cognitive tranquility.",
    content: [
      "The average attention span matches that of a goldfish, or so the popular, slightly flawed statistic claims. But the truth is more alarming: we are actively training ourselves to look away. Every pull-to-refresh reflex is a micro-dose of novelty that rewires our focus thresholds.",
      "In this environment, standard self-discipline fails. The smartest psychologists on earth are on the other side of your screen, designing hooks to dismantle your intention. The solution isn't to build iron willpower; it is to build strategic environment friction.",
      "By placing physical distance between yourself and your triggers—and substituting high-stimulus feedback loop systems for slow tactile rituals—you give your brain chemistry a chance to cool down. True productivity isn't about running faster; it's about curating your focus with extreme boundaries.",
      "Start by instituting 'Analog Mornings'. Allow yourself 45 minutes of awake time before you look at glass. Notice how the texture of your afternoon shifts when you do not start the day in an inherited state of reactivity."
    ],
    date: "June 05, 2026",
    readingTime: "4 min read",
    category: "Productivity",
    tags: ["Intention", "Deep Work", "Minimalism", "Technology"],
    author: AUTHORS.sameer,
    coverStyle: {
      bgGradient: "from-[#BCA2BD]/10 to-[#A98AB0]/30",
      patternType: "blobs"
    },
    isFeatured: true,
    isPopular: true,
    tableOfContents: [
      { id: "attention-economy", label: "The Attention Commodity" },
      { id: "friction", label: "Designing Friction" },
      { id: "analog-tactics", label: "The Analog Morning Formula" }
    ],
    comments: []
  },
  {
    id: "4",
    slug: "quiet-joys-of-incomplete-ideas",
    title: "In Defense of Half-Baked Thoughts and Unfinished Drafts",
    excerpt: "Not everything in your mind needs to be a polished newsletter post, a portfolio item, or a product. Let’s bring back the cozy texture of non-monetized thinking.",
    content: [
      "We live in a world that asks us to package every hobby into a side-hustle, and every private thought into a structured social thread. This persistent pressure to create finished products is quietly paralyzing our creative play.",
      "When we make things purely for the joy of witnessing their raw shapes, we access a wilder, more children-like creativity. Unfinished sketches and raw journaling pages hold the seeds of our real artistic voice—before we edit them for the gaze of an audience.",
      "Give yourself permission to have notebooks filled with glorious, useless fragments. A paragraph describing the steam rising from a teacup. A chord progression that doesn't resolve. A business idea that makes no financial sense. These are the organic nutrients of a vibrant psychic backyard."
    ],
    date: "May 28, 2026",
    readingTime: "3 min read",
    category: "Creativity",
    tags: ["Creativity", "Play", "Minimalism", "Self-Expression"],
    author: AUTHORS.sameer,
    coverStyle: {
      bgGradient: "from-[#F4E8EA] to-[#BCA2BD]/20",
      patternType: "stripes"
    },
    isFeatured: false,
    isPopular: true,
    tableOfContents: [],
    comments: [
      { id: "c4", author: "Sienna Rivers", text: "Yes! The pressure to monetise hobbies is exhausting. Happy to see someone writing about the pure joy of the half-finished sketch.", date: "May 30", avatarColor: "bg-lavender-secondary" }
    ]
  },
  {
    id: "5",
    slug: "uncluttering-the-internal-chatter",
    title: "Uncluttering the Mind: How to Decouple From Your Mindset Traps",
    excerpt: "We often treat our brains as our identities, forgetting that we are the observer, not the thoughts. Discover neuro-cognitive strategies to separate yourself from self-criticism.",
    content: [
      "Have you ever noticed that your internal critic sounds remarkably sure of itself? It makes sweeping proclamations: 'You are ruining everything,' or 'They think you are boring.' We take these sentences as truth because they happen in our heads.",
      "But a thought is just a bio-chemical event. It is a neuron firing to make sense of a temporary physical sensation, like high stress or low blood sugar. When we decouple our sense of self from this internal cognitive chatter, we gain immense psychological breathing room.",
      "A simple but life-changing technique from CBT is linguistic reframing. Instead of saying, 'I am a failure because this failed,' say: 'I notice my brain is producing the thought that I am failing.' It sounds small, but it places a vital gap between the stimulus and your heart."
    ],
    date: "May 19, 2026",
    readingTime: "5 min read",
    category: "Mindset",
    tags: ["Interstellar Space", "Habits", "Cognitive Behavioral Therapy", "Psychology"],
    author: AUTHORS.elena,
    coverStyle: {
      bgGradient: "from-[#FBEDED] to-[#A98AB0]/20",
      patternType: "waves"
    },
    isFeatured: false,
    isPopular: false,
    tableOfContents: [],
    comments: []
  },
  {
    id: "6",
    slug: "making-peace-with-your-ordinary-days",
    title: "Making Peace with Ordinary Days: The Art of Slow Living",
    excerpt: "We are taught to hunt for peak experiences—weddings, promotions, breathtaking flights. But our human histories are written in plain, quiet Tuesdays. Let's find beauty right there.",
    content: [
      "The heavy weights of ambition often blind us to the sheer joy of physical existence. If our minds are constantly projected into a future of milestones, we treat our actual days as mere scaffolding for some phantom climax.",
      "Slow living isn't about moving like a snail; it's about staying in the body. It is feeling the heat of the water as you wash the spoon. It is watching the late afternoon shadow creep across the rug. It is realizing that this ordinary Tuesday is, in fact, the actual material of your life.",
      "Let's abandon the aggressive pursuit of 'remarkable' and practice being awake for the unremarkable. That's where we recover the peaceful state of enoughness."
    ],
    date: "May 10, 2026",
    readingTime: "4 min read",
    category: "Life Lessons",
    tags: ["Slow Living", "Presence", "Gratitude", "Mindset"],
    author: AUTHORS.sameer,
    coverStyle: {
      bgGradient: "from-[#BCA2BD]/10 to-[#FBEDED]",
      patternType: "circles"
    },
    isFeatured: false,
    isPopular: false,
    tableOfContents: [],
    comments: []
  }
];

export const LEAD_MAGNETS: LeadMagnet[] = [
  {
    id: "reflection-questions",
    title: "30 Questions for Deep Reflection",
    description: "A beautifully designed printable workbook containing our absolute most powerful journaling prompts for personal clarity, healing, and intentional focus.",
    iconName: "FileText",
    badge: "Most Popular",
    premiumLabel: "FREE PDF WORKBOOK",
    contentTitle: "30 Reflection Questions for Deep Growth",
    contentSections: [
      {
        title: "Part 1: Deconstructing Current Patterns",
        items: [
          "What is a belief you held five years ago that now feels too small for who you are?",
          "In what areas of your daily life are you currently settling for safe mediocrity?",
          "If you could rewrite one 'should' that guides your routine, what would it be?",
          "What energy leak have you been tolerating out of habit or social convenience?",
          "When was the last time you said 'yes' but your stomach felt a distinct 'no'?"
        ]
      },
      {
        title: "Part 2: Designing Your Intention",
        items: [
          "What would your day look like if you prioritized peaceful focus over rapid output?",
          "What does 'uncluttering' look like in your closest friendships right now?",
          "How can you make space for thirty minutes of analog play this coming week?",
          "What is a minor creative dream you've suppressed because it doesn't earn income?",
          "What word represents the emotional climate you want to curate in your home?"
        ]
      }
    ]
  },
  {
    id: "mindset-reset",
    title: "The 7-Day Mindset Reset Guide",
    description: "A short, actionable science-backed micro-course sent to your inbox to conquer anxious overthinking and practice cognitive calm.",
    iconName: "Sparkles",
    badge: "Psychology-Backed",
    premiumLabel: "7-DAY MICRO-COURSE",
    contentTitle: "The Mindset Reset Guide (Day-by-Day Journey)",
    contentSections: [
      {
        title: "Day 1-3: Cognitive Decoupling",
        items: [
          "Day 1: Track the Critic - Log every self-critical thought and note its trigger.",
          "Day 2: Linguistic Distancing - Reframe thoughts using: 'I notice my brain is suggesting...'",
          "Day 3: Fact vs. Habit - Interrogate whether a recurring fear has empirical proof or just habit history."
        ]
      },
      {
        title: "Day 4-7: Mindful Action & Quiet Integration",
        items: [
          "Day 4: Restructure Your Physical Space - Put your phone in a drawer for the first 2 hours.",
          "Day 5: Gentle Boundaries - Say 'I am fully committed and cannot take this on' once today.",
          "Day 6: Tactile Integration - Engage in 15 minutes of sensory, screen-free focus (plants, kneading, writing).",
          "Day 7: The Gratitude of Enoughness - Write a thank-you note to your baseline body."
        ]
      }
    ]
  },
  {
    id: "weekly-reflection",
    title: "Weekly Reflection Template",
    description: "Our signature Sunday template to clean the slate and align your mental state for the week ahead — fully compatible with Notion, Obsidian, and analog pages.",
    iconName: "Calendar",
    badge: "Quick Template",
    premiumLabel: "NOTION & PRINTABLE SHEET",
    contentTitle: "Weekly Reflection Template (Sunday Slate)",
    contentSections: [
      {
        title: "Sunday Evening Release (15 Mins)",
        items: [
          "Brain Dump: Write down every unresolved feeling, task, or micro-worry on a raw page.",
          "The Wins: What are three tiny moments of connection, rest, or intentionality from this week?",
          "The Releases: What was heavy or frictional? Leave it on the page and declare it closed."
        ]
      },
      {
        title: "Monday Alignment (5 Mins)",
        items: [
          "My One Word: Select a thematic word to anchor your temperament to (e.g., Spacious, Resilient, Calm).",
          "Focus Blocks: Circle the single most important action that would make you feel proud.",
          "Energy Check: Rate your starting baseline out of 5, and design one self-compassion pivot."
        ]
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Alisha Vance",
    role: "Reader since 2024",
    text: "Samevibe94 is the single newsletter that actually gets opened in my inbox. Sameer writes with zero pretension—it's like getting a thoughtful, warm letter from an emotionally intelligent friend.",
    rating: 5
  },
  {
    id: "t2",
    name: "Gregory Park",
    role: "Journaler • UX Specialist",
    text: "The aesthetic of this site mirrored the quiet mindset I was seeking. Downloading the 30 Reflection Questions kicked off a morning journaling habit that has radically reduced my career overthinking.",
    rating: 5
  },
  {
    id: "t3",
    name: "Clara Finch",
    role: "Digital Designer",
    text: "Elena's psychology posts are pure therapy. She simplifies neuroscience in a way that helps me greet my anxious thoughts with a soft smile instead of immediate self-judgment.",
    rating: 5
  }
];

export const TRUST_POINTS = [
  {
    title: "Real Lived Experience",
    description: "Every story is born from actual journal entries, quiet mistakes, and human trial-and-error—not dry theoretical abstracts.",
    iconName: "BookOpen"
  },
  {
    title: "Honest Reflections",
    description: "We skip the hyper-motivational toxic positivity. We speak softly and honestly about grief, blocks, and uncertainty.",
    iconName: "Heart"
  },
  {
    title: "Neuroscience Meet Mindfulness",
    description: "Merging ancient slow lifestyle systems with modern evidence-based cognitive psychology for strategies that actually stick.",
    iconName: "Activity"
  },
  {
    title: "Absolutely Zero Guru Advice",
    description: "We are not here to sell you a 10-step billionaire routine. We are companion travelers sharing tea and quiet notes.",
    iconName: "ShieldAlert"
  }
];
