/**
 * lib/data/listeningTopics.ts
 * Static listening strategy content for the Learning Hub.
 * Covers TOEFL ITP Section 1 (Listening Comprehension) concepts.
 * Uses the same GrammarTopic type but with category: "listening".
 */

import type { GrammarTopic } from "./grammarTopics";

export const listeningTopics: GrammarTopic[] = [
  {
    slug: "short-conversations",
    title: "Short Conversations",
    subtitle: "Part A — Two-person dialogues with inference questions",
    icon: "messages",
    color: "#8b5cf6",
    category: "listening",
    description:
      "Part A consists of 30 short conversations between two speakers. Each dialogue is about 20-30 words. You hear the conversation once, then answer a question about it. Questions often test inference, implication, and understanding of idiomatic expressions.",
    rules: [
      "Listen for the SECOND speaker's response — the question usually asks about it.",
      "Negative expressions change meaning: 'I couldn't agree more' = strong agreement, 'I can hardly wait' = very excited.",
      "Suggestion forms: 'Why don't you...', 'How about...', 'You should...' — the question often asks what was suggested.",
      "Idiomatic expressions are common: 'It's a piece of cake' = easy, 'Under the weather' = sick.",
      "The correct answer often paraphrases what was said — the exact words from the dialogue are usually wrong answers.",
    ],
    examples: [
      {
        sentence: "Man: Should we drive or take the bus to the museum?\nWoman: With this traffic, we'd better take the subway.",
        correctAnswer: "She suggests they take the subway.",
        wrongAnswer: "She wants to drive to the museum.",
        explanation:
          "The woman suggests the subway as the best option because of traffic. 'We'd better' is a suggestion form.",
      },
      {
        sentence: "Woman: I can't believe how long that lecture was.\nMan: You can say that again!",
        correctAnswer: "The man agrees the lecture was long.",
        wrongAnswer: "The man wants the woman to repeat herself.",
        explanation:
          "'You can say that again' is an idiom meaning 'I completely agree.' It does NOT mean the man wants her to repeat the statement.",
      },
      {
        sentence: "Man: Did you finish the assignment?\nWoman: I was going to, but my computer crashed.",
        correctAnswer: "She did not complete the assignment.",
        wrongAnswer: "She finished the assignment on another computer.",
        explanation:
          "'I was going to' implies she intended to but did not. The computer crash prevented her from finishing.",
      },
    ],
    tips: [
      "Focus on the LAST line — it usually contains the answer.",
      "Watch for negative expressions that change meaning completely.",
      "Don't choose answers that repeat exact words from the dialogue — correct answers paraphrase.",
      "Listen for tone and emphasis — they reveal attitudes and emotions.",
    ],
    mnemonic: "LAST LINE WINS: The answer usually comes from the second speaker's final response.",
    drillTag: "short_conversation",
  },

  {
    slug: "longer-conversations",
    title: "Longer Conversations",
    subtitle: "Part B — Extended dialogues on campus topics",
    icon: "users",
    color: "#0891b2",
    category: "listening",
    description:
      "Part B features 2-3 longer conversations between two speakers, with 3-4 questions per conversation (8 questions total). These dialogues take place in academic settings — advising sessions, office hours, campus services. Questions test main idea, details, and inference.",
    rules: [
      "Listen for the MAIN PURPOSE: why is the student visiting? What problem needs solving?",
      "Track the SOLUTION: what does the advisor/staff member suggest?",
      "Note SPECIFIC DETAILS: dates, times, requirements, deadlines.",
      "Understand speaker ATTITUDES: is the student relieved, frustrated, confused?",
      "Multiple questions per conversation — try to remember key points, not every word.",
    ],
    examples: [
      {
        sentence: "A student visits an advisor to discuss course overload and the advisor suggests dropping one course and taking it in summer.",
        correctAnswer: "Take the course during summer session",
        wrongAnswer: "Take all courses at the same time",
        explanation:
          "The advisor typically offers a practical solution. Listen for suggestion phrases like 'I'd recommend,' 'you might consider,' or 'why don't you.'",
      },
    ],
    tips: [
      "Before the conversation starts, quickly read all 3-4 questions to know what to listen for.",
      "The first question usually asks about the MAIN TOPIC or PURPOSE.",
      "Detail questions ask about specific facts mentioned in the conversation.",
      "Inference questions ask what is implied but not directly stated.",
    ],
    mnemonic: "PMD: Purpose (main idea) → Method (solution suggested) → Details (specifics mentioned)",
    drillTag: "longer_conversation",
  },

  {
    slug: "talks-lectures",
    title: "Talks & Lectures",
    subtitle: "Part C — Academic mini-lectures",
    icon: "graduation",
    color: "#059669",
    category: "listening",
    description:
      "Part C contains 3 mini-lectures or academic talks, each followed by 4 questions (12 total). Topics cover science, history, social science, and arts. Questions test understanding of main ideas, supporting details, vocabulary in context, and speaker's purpose.",
    rules: [
      "The FIRST sentence of the lecture usually states the main topic — pay extra attention to it.",
      "Listen for SIGNAL WORDS: 'however' (contrast), 'furthermore' (addition), 'for example' (detail), 'in conclusion' (summary).",
      "When the professor says 'What's important to note...' or 'The key point is...', the answer is coming.",
      "Numbers, dates, and statistics are frequently tested — take mental note of them.",
      "Cause-effect relationships: 'because,' 'as a result,' 'led to,' 'consequently' signal testable content.",
    ],
    examples: [
      {
        sentence: "Professor: Today we'll discuss photosynthesis, the process by which plants convert sunlight into chemical energy...",
        correctAnswer: "The process by which plants convert sunlight into energy",
        wrongAnswer: "How animals get their food",
        explanation:
          "The opening sentence gives the main topic. Main idea questions ask 'What is the lecture mainly about?'",
      },
    ],
    tips: [
      "The main idea question is almost always answered in the first 2-3 sentences.",
      "Detail questions focus on examples, statistics, or processes mentioned.",
      "If the professor defines a term → that definition will likely be tested.",
      "Listen for contrasts: 'Unlike X, Y does...' — both X and Y may appear in questions.",
    ],
    mnemonic: "OPEN STRONG: The first sentences reveal the main topic. Examples reveal the details. Signal words reveal the structure.",
    drillTag: "talks_lectures",
  },

  {
    slug: "listening-idioms",
    title: "Idioms & Expressions",
    subtitle: "Common TOEFL idiomatic expressions",
    icon: "sparkles",
    color: "#d97706",
    category: "listening",
    description:
      "Part A frequently tests understanding of English idiomatic expressions and colloquial phrases. These expressions cannot be understood from their literal meaning — you must know what they mean in context.",
    rules: [
      "'It's a piece of cake' = It's very easy.",
      "'Under the weather' = Feeling sick.",
      "'Hit the books' = Study hard.",
      "'I couldn't agree more' = I completely agree.",
      "'You can say that again' = I completely agree (NOT: repeat yourself).",
      "'I could use a hand' = I need help.",
    ],
    examples: [
      {
        sentence: "Woman: How was the math final?\nMan: It was a piece of cake.",
        correctAnswer: "The man thought the exam was easy.",
        wrongAnswer: "The man brought cake to the exam.",
        explanation:
          "'A piece of cake' means something is very easy. This is a classic TOEFL idiom.",
      },
      {
        sentence: "Man: Are you going to class today?\nWoman: I'm feeling a bit under the weather.",
        correctAnswer: "The woman is not feeling well.",
        wrongAnswer: "The woman is concerned about the weather.",
        explanation:
          "'Under the weather' means feeling sick or unwell. It has nothing to do with actual weather.",
      },
      {
        sentence: "Woman: I need to hit the books tonight.\nMan: Me too. The exam is tomorrow.",
        correctAnswer: "Both speakers plan to study.",
        wrongAnswer: "The woman is angry at her books.",
        explanation:
          "'Hit the books' means to study intensively. It's one of the most common TOEFL idioms.",
      },
    ],
    tips: [
      "Memorize the 50 most common TOEFL idioms — they appear frequently in Part A.",
      "If an answer matches the literal meaning of the idiom, it's almost certainly wrong.",
      "Context clues in the other speaker's response often confirm the idiomatic meaning.",
      "Expressions with negative forms often express positive meanings (double negatives).",
    ],
    mnemonic: "LITERAL = WRONG: If an answer matches the word-by-word meaning of an idiom, eliminate it.",
    drillTag: "idiom",
  },

  {
    slug: "campus-vocabulary",
    title: "Campus Vocabulary",
    subtitle: "Academic settings, roles, and places",
    icon: "book",
    color: "#dc2626",
    category: "listening",
    description:
      "TOEFL ITP Listening frequently uses campus-specific vocabulary — academic offices, student services, faculty roles, and campus locations. Understanding these terms helps you quickly identify the setting and topic of conversations.",
    rules: [
      "Registrar = the office that handles course enrollment, transcripts, and graduation requirements.",
      "TA (Teaching Assistant) = a graduate student who helps teach undergraduate courses.",
      "Office hours = scheduled times when professors are available to meet with students.",
      "Prerequisite = a course you must complete before taking another course.",
      "Dean = a senior administrator who oversees a college or school within the university.",
      "Syllabus = a document outlining course topics, assignments, and grading policies.",
    ],
    examples: [
      {
        sentence: "Man: I need to check if I've met all my prerequisites for organic chemistry.\nWoman: You should visit the registrar's office.",
        correctAnswer: "The registrar's office handles course requirements.",
        wrongAnswer: "The chemistry department manages prerequisites.",
        explanation:
          "The registrar's office manages enrollment and course requirements. This is a common campus vocabulary item.",
      },
    ],
    tips: [
      "Learn the roles: professor, TA, advisor, dean, registrar, librarian, lab assistant.",
      "Learn the places: registrar, financial aid, dining hall, dormitory, student union, lab.",
      "Academic terms: credits, GPA, major, minor, elective, prerequisite, thesis.",
      "When you hear campus terms, quickly identify the SETTING of the conversation.",
    ],
    mnemonic: "WHO-WHERE-WHAT: Identify the person's role, the location, and the academic topic.",
    drillTag: "campus_vocabulary",
  },

  {
    slug: "signal-words",
    title: "Signal Words & Transitions",
    subtitle: "Listening for structural cues in lectures",
    icon: "layers",
    color: "#7c3aed",
    category: "listening",
    description:
      "Signal words and transitions help you follow the structure of TOEFL lectures. They indicate when a speaker is adding information, contrasting ideas, giving examples, showing cause-effect, or concluding. Recognizing these cues is essential for Parts B and C.",
    rules: [
      "ADDITION: furthermore, moreover, in addition, also, another point → more information is coming.",
      "CONTRAST: however, on the other hand, nevertheless, in contrast, unlike, whereas → opposite idea is coming.",
      "EXAMPLE: for instance, for example, such as, to illustrate, consider → a specific detail follows.",
      "CAUSE/EFFECT: because, since, as a result, therefore, consequently, led to → reason or outcome.",
      "CONCLUSION: in summary, to conclude, the main point is, overall → key takeaway.",
    ],
    examples: [
      {
        sentence: "Professor: The experiment was successful. However, the results were not what we expected.",
        correctAnswer: "The results were surprising despite the success.",
        wrongAnswer: "The experiment failed completely.",
        explanation:
          "'However' signals a contrast. The experiment was successful, BUT the results were unexpected. This is tested frequently.",
      },
    ],
    tips: [
      "When you hear 'however' or 'but,' the information AFTER it is usually more important.",
      "Listing signals ('first,' 'second,' 'finally') help you organize the lecture structure.",
      "'For example' always introduces a detail that supports the main point — this detail is often tested.",
      "Emphasis phrases like 'What's important is...' almost always precede an answer to a question.",
    ],
    mnemonic: "SIGNAL = ANSWER NEARBY: When you hear a signal word, the testable information follows immediately.",
    drillTag: "signal_words",
  },
];

export function getListeningTopicBySlug(slug: string) {
  return listeningTopics.find((t) => t.slug === slug);
}
