export interface Question {
  id: number;
  text: string;
  options: { letter: string; text: string }[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Where are you in your business right now?",
    options: [
      { letter: "A", text: "Just starting out, finding my feet" },
      { letter: "B", text: "Growing, but results are inconsistent" },
      { letter: "C", text: "Stuck. I've hit a ceiling" },
      { letter: "D", text: "Ready to scale to the next level" },
    ],
  },
  {
    id: 2,
    text: "What's your biggest frustration right now?",
    options: [
      { letter: "A", text: "I'm not attracting enough clients" },
      { letter: "B", text: "My income is unpredictable month to month" },
      { letter: "C", text: "I have no time. I'm doing everything myself" },
      { letter: "D", text: "I know what I want but I'm unclear on how to get there" },
    ],
  },
  {
    id: 3,
    text: "When you think about your business goals, you mostly feel...",
    options: [
      { letter: "A", text: "Excited but completely overwhelmed" },
      { letter: "B", text: "Confused about what to do next" },
      { letter: "C", text: "Defeated, like I keep trying but nothing sticks" },
      { letter: "D", text: "Quietly confident but ready for a push" },
    ],
  },
  {
    id: 4,
    text: "How are most of your clients finding you right now?",
    options: [
      { letter: "A", text: "Word of mouth and referrals only" },
      { letter: "B", text: "Social media, but it's hit and miss" },
      { letter: "C", text: "My website (or I wish they were!)" },
      { letter: "D", text: "Honestly, I'm not getting enough clients from anywhere" },
    ],
  },
  {
    id: 5,
    text: "How clear are you on exactly who you help and how?",
    options: [
      { letter: "A", text: "Crystal clear. I know my niche inside out" },
      { letter: "B", text: "Mostly clear but I second-guess myself" },
      { letter: "C", text: "A bit fuzzy, it changes depending on who I'm talking to" },
      { letter: "D", text: "Completely lost. I try to help everyone" },
    ],
  },
  {
    id: 6,
    text: "What have you already tried to grow your business?",
    options: [
      { letter: "A", text: "Online courses and self-study" },
      { letter: "B", text: "Previous coaching or mentoring" },
      { letter: "C", text: "DIY, figuring it out as I go" },
      { letter: "D", text: "I haven't really tried anything structured yet" },
    ],
  },
  {
    id: 7,
    text: "If you had one breakthrough in the next 90 days, it would be...",
    options: [
      { letter: "A", text: "A consistent flow of dream clients" },
      { letter: "B", text: "Predictable, reliable income" },
      { letter: "C", text: "Getting out of overwhelm and having a clear plan" },
      { letter: "D", text: "The confidence to charge what I'm worth and show up fully" },
    ],
  },
];
