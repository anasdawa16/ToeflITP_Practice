/**
 * lib/data/grammarTopics.ts
 * Static grammar content for the Learning Hub.
 * Covers TOEFL ITP Section 2 (Structure & Written Expression) core topics.
 */

export interface GrammarExample {
  sentence: string;
  /** For Structure: blank fill. For WE: underlined error portion. */
  correctAnswer: string;
  wrongAnswer?: string;
  explanation: string;
}

export interface GrammarTopic {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  category: "structure" | "written_expression" | "reading";
  description: string;
  /** 3–5 key rules */
  rules: string[];
  examples: GrammarExample[];
  tips: string[];
  mnemonic?: string;
  drillTag: string; // maps to topic_tag in DB
}

export const grammarTopics: GrammarTopic[] = [
  // ─────────────────────────────────────────────────────────────
  // STRUCTURE
  // ─────────────────────────────────────────────────────────────
  {
    slug: "noun-clause",
    title: "Noun Clauses",
    subtitle: "What / That / Whether clauses as S or O",
    icon: "📎",
    color: "#1e4a9b",
    category: "structure",
    description:
      "A noun clause is a dependent clause that functions as a noun — as the subject, object, or complement of a sentence. In TOEFL ITP, noun clauses are tested in sentence completion (Structure) and you must choose the correct introductory word.",
    rules: [
      "Use WHAT when the clause is missing a subject or object: 'What she said was true.'",
      "Use THAT when the clause is a full statement: 'He knows that the answer is correct.'",
      "Use WHETHER (not 'if' in formal writing) for yes/no content questions: 'Scientists debate whether life exists elsewhere.'",
      "Noun clauses can function as subjects, objects, or subject complements.",
      "After prepositions, use what/whether — never use that: 'I am aware of what she meant.'",
    ],
    examples: [
      {
        sentence: "_______ the committee decided surprised everyone in the department.",
        correctAnswer: "What",
        wrongAnswer: "That what",
        explanation:
          "'What the committee decided' is a noun clause (missing the object of 'decided') functioning as the subject. 'That' would require a complete clause after it. 'That what' is always wrong.",
      },
      {
        sentence: "Scientists still debate _______ dark matter constitutes most of the universe's mass.",
        correctAnswer: "whether",
        wrongAnswer: "that whether",
        explanation:
          "'Whether' introduces a noun clause expressing a yes/no question indirectly. 'That' is used for statements, not yes/no alternatives. 'That whether' is ungrammatical.",
      },
      {
        sentence: "The professor explained _______ the results were statistically significant.",
        correctAnswer: "that",
        wrongAnswer: "what",
        explanation:
          "The clause 'the results were statistically significant' is a complete statement, so 'that' is correct. 'What' would require a missing element (subject or object) inside the clause.",
      },
    ],
    tips: [
      "If the noun clause has a missing S or O inside → use WHAT.",
      "If the noun clause is a complete statement → use THAT.",
      "If the noun clause involves a yes/no alternative → use WHETHER.",
      "After prepositions (of, about, by, in), 'that' cannot be used — use 'what' or 'whether'.",
    ],
    mnemonic: "W-T-W: What (missing element) · That (complete statement) · Whether (yes/no question)",
    drillTag: "noun_clause",
  },

  {
    slug: "inverted-structure",
    title: "Inverted Structure",
    subtitle: "Negative adverbs trigger S-V inversion",
    icon: "🔄",
    color: "#7c3aed",
    category: "structure",
    description:
      "When certain negative or limiting adverbs begin a sentence, the subject and auxiliary verb are inverted (auxiliary comes before the subject). This is a high-frequency TOEFL pattern.",
    rules: [
      "Inversion triggers: Never, Rarely, Seldom, Scarcely, Barely, Hardly, Not only, Not until, Only after, Under no circumstances, No sooner.",
      "Structure: Trigger + Auxiliary + Subject + Main Verb.",
      "'Scarcely/Hardly/No sooner...when/than' → requires past perfect inversion: 'Scarcely had she left when...'",
      "Inverted conditionals replace 'if': 'Had they known' = 'If they had known'; 'Should it rain' = 'If it should rain'.",
      "After 'So + adjective': 'So complex was the problem that...'",
    ],
    examples: [
      {
        sentence: "Rarely _______ such a comprehensive study of the human genome.",
        correctAnswer: "have scientists conducted",
        wrongAnswer: "scientists have conducted",
        explanation:
          "After 'Rarely,' inversion is required. Place the auxiliary 'have' before the subject 'scientists': 'Rarely have scientists conducted.'",
      },
      {
        sentence: "Not until the 20th century _______ the full complexity of the atom understood.",
        correctAnswer: "was",
        wrongAnswer: "it was",
        explanation:
          "'Not until + time clause' triggers inversion. The subject 'complexity' comes after the auxiliary 'was': 'Not until...was the full complexity understood.'",
      },
      {
        sentence: "_______ the researchers received the data did they begin to analyze the results.",
        correctAnswer: "Not until",
        wrongAnswer: "Until",
        explanation:
          "'Not until' triggers inversion in the main clause ('did they begin'). Plain 'Until' does not require inversion.",
      },
    ],
    tips: [
      "Memorize the trigger words: Never, Rarely, Seldom, Scarcely, Barely, Not only, Not until, Only after.",
      "The pattern is always: Trigger + AUX + SUBJECT + MAIN VERB.",
      "For 'Scarcely/Hardly,' the paired conjunction is 'when' (not 'than').",
      "For 'No sooner,' the paired conjunction is 'than' (not 'when').",
    ],
    mnemonic: "NRSBN: Never · Rarely · Seldom · Barely · Not-only. All need AUX before SUBJECT.",
    drillTag: "inverted_structure",
  },

  {
    slug: "parallel-structure",
    title: "Parallel Structure",
    subtitle: "Items in a series must match grammatically",
    icon: "⚖️",
    color: "#0891b2",
    category: "structure",
    description:
      "Parallel structure (parallelism) requires that elements joined by coordinating conjunctions (and, but, or) or correlative conjunctions (both...and, either...or, not only...but also) share the same grammatical form.",
    rules: [
      "Items in a list must all be the same form: nouns, verbs, gerunds, infinitives, or adjectives — not mixed.",
      "Correlatives (both...and, either...or, neither...nor, not only...but also) require parallel forms on both sides.",
      "After 'to' in a series, subsequent verbs only need the base form: 'to read, write, and speak English.'",
      "Parallel structure applies to adjectives, adverbs, clauses, and phrases equally.",
      "Common error: mixing infinitives and gerunds in a list ('to swim, jogging, and biking' → wrong).",
    ],
    examples: [
      {
        sentence:
          "The training program teaches employees how to manage time, _______ clearly, and resolve conflicts.",
        correctAnswer: "communicate",
        wrongAnswer: "communicating",
        explanation:
          "The series uses infinitive forms after 'how to': 'manage...communicate...resolve.' All verbs must be base form (infinitive without 'to') to maintain parallel structure.",
      },
      {
        sentence:
          "The scientist spent decades studying ecosystems, publishing research, and _______.",
        correctAnswer: "mentoring students",
        wrongAnswer: "to mentor students",
        explanation:
          "The list uses gerunds: 'studying...publishing...mentoring.' Switching to an infinitive 'to mentor' breaks parallelism.",
      },
      {
        sentence: "Effective writing is characterized by clarity, precision, and _______.",
        correctAnswer: "objectivity",
        wrongAnswer: "being objective",
        explanation:
          "The list consists of nouns: 'clarity, precision, and objectivity.' 'Being objective' is a gerund phrase that breaks the nominal parallel.",
      },
    ],
    tips: [
      "Find the FIRST item in the list — the rest must match its form exactly.",
      "Check correlatives: 'Not only [X] but also [Y]' — X and Y must be the same grammatical form.",
      "Watch for mixed gerund/infinitive lists — one of the most common TOEFL errors.",
      "For 'to + verb' infinitive series, only the first 'to' is needed.",
    ],
    mnemonic: "MATCH THE FIRST: whatever form the first list item uses, all others must use the SAME.",
    drillTag: "parallel_structure",
  },

  {
    slug: "conditionals",
    title: "Conditional Sentences",
    subtitle: "Real, unreal present, and past unreal",
    icon: "🔀",
    color: "#d97706",
    category: "structure",
    description:
      "Conditional sentences express if-then relationships. TOEFL ITP tests three main types: real (factual), unreal present (hypothetical), and past unreal (counterfactual), plus inverted conditionals.",
    rules: [
      "Type 1 (Real future): If + present simple → will + base verb. 'If it rains, they will cancel the event.'",
      "Type 2 (Unreal present): If + past simple (were for all persons) → would + base verb. 'If she were here, she would help.'",
      "Type 3 (Past unreal): If + past perfect → would have + past participle. 'If they had studied, they would have passed.'",
      "Inverted conditionals omit 'if': 'Had they known' (= If they had known); 'Were it possible' (= If it were possible); 'Should it rain' (= If it should rain).",
      "'Unless' = 'if...not': 'Unless you study, you will fail' = 'If you do not study, you will fail.'",
    ],
    examples: [
      {
        sentence:
          "If the funding _______ earlier, the researchers would have completed the project on time.",
        correctAnswer: "had been secured",
        wrongAnswer: "was secured",
        explanation:
          "This is a Type 3 (past unreal) conditional. The if-clause needs past perfect ('had been secured') to match 'would have completed' in the result clause.",
      },
      {
        sentence:
          "_______ the initial results prove inconclusive, the team would repeat the experiment.",
        correctAnswer: "Should",
        wrongAnswer: "Were",
        explanation:
          "'Should' creates an inverted conditional for a possible future situation (= 'If the results should prove...'). 'Were' would be for unreal present situations.",
      },
      {
        sentence:
          "If ocean temperatures _______ to rise by 2°C, entire reef ecosystems would be destroyed.",
        correctAnswer: "were",
        wrongAnswer: "would be",
        explanation:
          "Type 2 (unreal present): If-clause uses simple past subjunctive 'were' (for all persons, including third). The result clause 'would be destroyed' is already correct.",
      },
    ],
    tips: [
      "Type 3 clue words: 'would have + past participle' → the if-clause MUST use past perfect.",
      "For Type 2, use 'were' (not 'was') for all subjects — even 'he,' 'she,' 'it.'",
      "Inverted conditionals: Had / Were / Should at the start (no 'if').",
      "'Unless' is always positive in form but negative in meaning — never combine 'unless' with 'not.'",
    ],
    mnemonic: "1-2-3: Present→Will | Past→Would | Past Perfect→Would Have",
    drillTag: "conditional",
  },

  {
    slug: "reduced-clause",
    title: "Reduced Clauses",
    subtitle: "Participial phrases from relative clauses",
    icon: "✂️",
    color: "#059669",
    category: "structure",
    description:
      "A reduced clause is a shortened form of a relative or adverbial clause. The relative pronoun and auxiliary 'be' are deleted, leaving a participial phrase (present or past participle).",
    rules: [
      "Active reduced: who/that + is/are + V-ing → just V-ing. 'The scientist conducting the experiment' = 'the scientist who is conducting.'",
      "Passive reduced: who/that + was/were + past participle → just past participle. 'The manuscript found in the cave' = 'that was found in the cave.'",
      "Perfect participial: 'Having + past participle' shows action before the main clause: 'Having finished the report, she left.'",
      "The subject of the participial phrase MUST be the same as the subject of the main clause, or a dangling modifier occurs.",
      "Reduced adverbial clauses: 'While reading the report, he noticed an error' (not 'While he was reading...').",
    ],
    examples: [
      {
        sentence: "_______ along the coastline, the highway offers spectacular ocean views.",
        correctAnswer: "Extending",
        wrongAnswer: "Extended",
        explanation:
          "'Extending along the coastline' is an active participial phrase meaning 'the highway which extends.' 'Extended' would imply someone externally extended it (passive sense).",
      },
      {
        sentence:
          "The ancient city, _______ by scholars for two centuries, was finally deciphered using new technology.",
        correctAnswer: "misunderstood",
        wrongAnswer: "misunderstanding",
        explanation:
          "'Misunderstood by scholars' is a passive reduced clause (= 'which had been misunderstood'). Past participle is needed for passive meaning.",
      },
      {
        sentence: "_______ their initial findings, the team presented an interim report.",
        correctAnswer: "Having summarized",
        wrongAnswer: "Summarizing",
        explanation:
          "'Having summarized' shows completed prior action. The summary happened before the presentation. Plain 'Summarizing' implies simultaneous action.",
      },
    ],
    tips: [
      "ACTIVE meaning → V-ing (present participle).",
      "PASSIVE meaning → past participle (no auxiliary).",
      "Prior action completed → Having + past participle.",
      "Always check: does the participial phrase's implied subject = the main clause subject?",
    ],
    mnemonic: "APC: Active→Present participle · Passive→Past participle · Completed→Having+PP",
    drillTag: "reduced_clause",
  },

  // ─────────────────────────────────────────────────────────────
  // WRITTEN EXPRESSION
  // ─────────────────────────────────────────────────────────────
  {
    slug: "verb-agreement",
    title: "Subject-Verb Agreement",
    subtitle: "Tricky subjects: collective nouns, each, fractions",
    icon: "🤝",
    color: "#dc2626",
    category: "written_expression",
    description:
      "The verb must agree in number with its grammatical subject — not with nearby nouns. TOEFL ITP tests agreement with collective nouns, expressions like 'a number of / the number of,' each/every, fractions, and correlative conjunctions.",
    rules: [
      "Collective nouns in American English are singular: committee, jury, team, board, faculty + singular verb.",
      "'The number of' = singular; 'A number of' = plural. 'The number of students IS rising' vs. 'A number of students ARE absent.'",
      "'Each', 'every', 'either', 'neither' + singular noun = singular verb. 'Each of the reports IS complete.'",
      "For 'Either...or / Neither...nor,' the verb agrees with the CLOSER subject.",
      "Fractions + 'of': agree with the noun AFTER 'of.' 'One-third of the students WERE absent.'",
      "-ics subjects (physics, mathematics, economics, athletics) = singular verb.",
    ],
    examples: [
      {
        sentence: "Either the manager or her assistants [was] responsible for the delay.",
        correctAnswer: "were",
        wrongAnswer: "was",
        explanation:
          "With 'either...or,' the verb agrees with the nearer subject 'assistants' (plural), so 'were' is required.",
      },
      {
        sentence: "The data collected from all sites strongly [suggests] a correlation.",
        correctAnswer: "suggest",
        wrongAnswer: "suggests",
        explanation:
          "'Data' is the plural of 'datum' and takes a plural verb in formal scientific writing: 'suggest.'",
      },
      {
        sentence: "Physics [are] considered the most mathematically demanding science.",
        correctAnswer: "is",
        wrongAnswer: "are",
        explanation:
          "Disciplines ending in -ics (physics, mathematics, economics) are treated as singular: 'Physics is.'",
      },
    ],
    tips: [
      "Remember 'DATUMS are data' — data is plural in academic English.",
      "Collective nouns: American English → singular. British English → plural. TOEFL uses American rules.",
      "'A number of' = several → plural. 'The number of' = the count → singular.",
      "Cross out the prepositional phrase between subject and verb to find the real subject.",
    ],
    mnemonic: "THE NUMBER IS / A NUMBER ARE — the key phrase to memorize.",
    drillTag: "verb_agreement",
  },

  {
    slug: "verb-tense",
    title: "Verb Tense Errors",
    subtitle: "Time sequences, past perfect, and reported speech",
    icon: "⏰",
    color: "#7c3aed",
    category: "written_expression",
    description:
      "Tense errors occur when a verb form doesn't match the time relationship in the sentence. TOEFL ITP focuses on: past perfect (for events before another past event), future perfect (by + future time), and backshift in reported speech.",
    rules: [
      "Past perfect (had + PP) is required for an event that happened BEFORE another past event: 'By the time they arrived, the train had left.'",
      "Future perfect (will have + PP) is required for an event completed BY a future point: 'By 2030, scientists will have discovered a cure.'",
      "'Since' + point in time requires present perfect in the main clause: 'Since 2001, the team has published 40 papers.'",
      "In reported (indirect) speech, verbs backshift: 'She said that the results were inconclusive' (not 'are').",
      "Simple past irregular verbs are frequently tested: began (not begun), rose (not raised), lay (not laid).",
    ],
    examples: [
      {
        sentence: "By the time the explorers reached the summit, they [have been climbing] for 14 hours.",
        correctAnswer: "had been climbing",
        wrongAnswer: "have been climbing",
        explanation:
          "'By the time + simple past' requires past perfect in the companion clause. 'Had been climbing' (past perfect continuous) is correct.",
      },
      {
        sentence: "The historian argues that the Renaissance [begun] in Florence in the 14th century.",
        correctAnswer: "began",
        wrongAnswer: "begun",
        explanation:
          "'Begun' is the past participle — only used with auxiliaries (has begun, had begun). The simple past form is 'began.'",
      },
      {
        sentence: "If the funding had been received earlier, the team [will have] completed the research.",
        correctAnswer: "would have",
        wrongAnswer: "will have",
        explanation:
          "Third conditional (past unreal) requires 'would have + past participle' — not 'will have,' which is future perfect.",
      },
    ],
    tips: [
      "Clue words for past perfect: by the time, before, after, when + past context.",
      "Clue words for future perfect: by + future date/time.",
      "'Begun / Drunk / Sung / Run' are past participles — never use without an auxiliary.",
      "Backshift rule: say/said → present moves to past; 'is' becomes 'was.'",
    ],
    mnemonic: "BEFORE the past → PAST PERFECT. BY future time → FUTURE PERFECT.",
    drillTag: "verb_tense",
  },

  {
    slug: "word-form",
    title: "Word Form Errors",
    subtitle: "Using the right noun / verb / adjective / adverb",
    icon: "🔠",
    color: "#0891b2",
    category: "written_expression",
    description:
      "Word form errors occur when the wrong part of speech is used — for example, a noun where an adjective is needed. TOEFL ITP frequently tests confusion between: noun vs. adjective, adjective vs. adverb, noun vs. verb.",
    rules: [
      "Adjectives modify nouns: 'an important discovery' (not 'an importance discovery').",
      "Adverbs modify verbs and adjectives: 'significantly improved' (not 'significant improved').",
      "Nouns function as subjects/objects: 'the growth of' (not 'the grow of').",
      "Passive constructions need past participles: 'was met with' (not 'was meet with').",
      "Watch for common pairs: economy/economic, success/successful/successfully, depth/deep/deeply.",
    ],
    examples: [
      {
        sentence: "The [economy] improvement observed in Q3 surprised analysts.",
        correctAnswer: "economic",
        wrongAnswer: "economy",
        explanation:
          "A noun ('economy') cannot directly modify another noun as an adjective. The adjective form 'economic' is required before 'improvement.'",
      },
      {
        sentence: "Researchers discovered that music [significant] improves language acquisition.",
        correctAnswer: "significantly",
        wrongAnswer: "significant",
        explanation:
          "An adverb is needed to modify the verb 'improves.' 'Significantly' (adverb) is correct; 'significant' (adjective) cannot modify a verb.",
      },
      {
        sentence: "The [successfully] of the drug trials encouraged further research.",
        correctAnswer: "success",
        wrongAnswer: "successfully",
        explanation:
          "The subject position requires a noun. 'The success of the drug trials' — 'successfully' is an adverb and cannot function as a subject.",
      },
    ],
    tips: [
      "Before a noun → adjective (economic, rapid, important).",
      "Before a verb or adjective → adverb (-ly form: significantly, carefully).",
      "Subject / Object position → noun (success, growth, importance).",
      "After a linking verb (is, seems, appears) → adjective: 'The result seems accurate.'",
    ],
    mnemonic: "NOUN→adj before it. VERB→adv before it. SUBJECT→noun itself.",
    drillTag: "word_form",
  },

  {
    slug: "preposition",
    title: "Preposition & Idiom Errors",
    subtitle: "Fixed adjective + preposition combinations",
    icon: "🔗",
    color: "#d97706",
    category: "written_expression",
    description:
      "Many English adjectives, nouns, and verbs require specific prepositions — these are called collocations or fixed phrases. Confusing the preposition is one of the most common Written Expression errors on TOEFL ITP.",
    rules: [
      "Result IN (not 'with'): 'result in a breakthrough.'",
      "Capable OF + gerund: 'capable of solving.' (NOT 'capable to solve.')",
      "Consistent WITH: 'consistent with previous findings.' (NOT 'consistent to.')",
      "Emphasis ON: 'emphasis on research.' (NOT 'emphasis in.')",
      "Aware OF: 'aware of the risks.' (NOT 'aware about.')",
      "Effect ON / Affect (verb, no preposition): 'effect on behavior' / 'affects behavior.'",
    ],
    examples: [
      {
        sentence: "The experiment resulted [with] an unexpected but significant breakthrough.",
        correctAnswer: "in",
        wrongAnswer: "with",
        explanation:
          "'Result in' is the fixed collocation meaning 'lead to' or 'produce.' 'Result with' is nonstandard English.",
      },
      {
        sentence: "The team was not capable [to solve] the complex equation within the given time.",
        correctAnswer: "of solving",
        wrongAnswer: "to solve",
        explanation:
          "'Capable' always takes the preposition 'of' followed by a gerund: 'capable of solving.' The pattern 'capable to + infinitive' does not exist in standard English.",
      },
      {
        sentence: "The findings are consistent [to] similar studies conducted in Europe.",
        correctAnswer: "with",
        wrongAnswer: "to",
        explanation:
          "'Consistent with' is the fixed phrase. 'Consistent to' is a common learner error.",
      },
    ],
    tips: [
      "Flash card these fixed pairs: result IN · capable OF · consistent WITH · aware OF · emphasis ON · effect ON.",
      "If the answer choices are only prepositions, this is a collocation error — think of the fixed phrase.",
      "'Affect' is a verb — it takes no preposition: 'It affects behavior.'",
      "'Effect' is a noun — it takes 'on': 'It has an effect on behavior.'",
    ],
    mnemonic: "RICE-AE: Result In · Capable of · Emphasis on · Aware of · Effect on",
    drillTag: "preposition",
  },

  {
    slug: "comparison",
    title: "Comparison Errors",
    subtitle: "Faulty comparisons, double comparatives, superlatives",
    icon: "⚡",
    color: "#059669",
    category: "written_expression",
    description:
      "Comparison errors are extremely common in Written Expression. They include: double comparatives, faulty (incomplete) comparisons, mixing comparative and superlative forms, and wrong 'as...as' usage.",
    rules: [
      "Never double a comparative: 'more faster' is wrong — use 'faster' OR 'more rapidly.'",
      "Comparisons must compare equivalent things: 'The climate of Spain is warmer than that of Norway' (not 'than Norway').",
      "Use comparative + than for 2 items; superlative + of/among for 3+ items.",
      "'As + adjective + as' uses the BASE (positive) form: 'as large as' (not 'as larger as').",
      "Superlatives do NOT use 'than': 'the most productive' (not 'most productive than').",
    ],
    examples: [
      {
        sentence: "The new compound is [more faster] than its predecessor and consumes less energy.",
        correctAnswer: "faster",
        wrongAnswer: "more faster",
        explanation:
          "'More faster' is a double comparative — 'more' and '-er' both indicate comparison. Use one or the other: 'faster' or 'more rapidly.'",
      },
      {
        sentence: "The brain of a human is more complex than [any animal].",
        correctAnswer: "any other animal's brain",
        wrongAnswer: "any animal",
        explanation:
          "You must compare equivalent things: a human brain vs. an animal's brain. 'Than any animal' illogically compares a brain to an entire animal.",
      },
      {
        sentence: "The Amazon is [as larger as] the continental United States in total area.",
        correctAnswer: "as large as",
        wrongAnswer: "as larger as",
        explanation:
          "'As...as' for equal comparison requires the base (positive) adjective form: 'as large as,' not the comparative 'larger.'",
      },
    ],
    tips: [
      "Scan for 'more + -er' — always wrong (double comparative).",
      "Check both sides of 'than' — are you comparing the same type of thing?",
      "Superlative + 'than' = automatic error ('the most...than' is always wrong).",
      "For 'as...as', the adjective inside must be in base form, never comparative.",
    ],
    mnemonic: "COMPARE SAME THINGS with ONE comparative marker only.",
    drillTag: "comparison",
  },

  // ─────────────────────────────────────────────────────────────
  // READING COMPREHENSION
  // ─────────────────────────────────────────────────────────────
  {
    slug: "main-idea",
    title: "Main Idea Questions",
    subtitle: "What is the passage mainly about?",
    icon: "🎯",
    color: "#1e4a9b",
    category: "reading",
    description:
      "Main idea questions ask you to identify the central topic or argument of the entire passage. The correct answer must cover the passage as a whole — not just one paragraph or detail.",
    rules: [
      "The main idea is usually introduced in paragraph 1 and reinforced throughout the passage.",
      "Wrong answers are often: too narrow (one paragraph), too broad (beyond the passage), or directly contradict a detail.",
      "Look for the answer that captures WHAT the passage is about AND what it says about it.",
      "Key signal words in the passage: 'This article examines...' / 'This study investigates...' / 'X is characterized by...'",
      "The title (if given) almost always points to the main idea.",
    ],
    examples: [
      {
        sentence: "A passage about coral reef biology covering zooxanthellae, bleaching, ecology, and conservation.",
        correctAnswer: "To describe the biology and ecological significance of coral reefs",
        wrongAnswer: "To explain why zooxanthellae are essential to marine biodiversity",
        explanation:
          "The correct answer covers the entire passage (biology, ecology, conservation). The wrong answer covers only one paragraph about zooxanthellae — too narrow.",
      },
    ],
    tips: [
      "After reading, ask: 'What ONE sentence could describe this entire passage?'",
      "Eliminate answers that use details from only one paragraph.",
      "Eliminate answers that are factually present but cover only a minor point.",
      "The correct answer often uses more general, umbrella language.",
    ],
    mnemonic: "WHOLE-PASSAGE test: does this answer cover the WHOLE passage, not just a part?",
    drillTag: "main_idea",
  },

  {
    slug: "vocabulary-in-context",
    title: "Vocabulary in Context",
    subtitle: "What does X mean in this context?",
    icon: "📖",
    color: "#7c3aed",
    category: "reading",
    description:
      "Vocabulary-in-context questions ask what a word or phrase means AS USED IN THE PASSAGE. The correct answer fits the context — not necessarily the most common definition of the word.",
    rules: [
      "Always re-read the sentence containing the word for context clues.",
      "Try substituting each answer choice to see which one makes sense in context.",
      "Watch for words with multiple meanings — the TOEFL often tests less common meanings.",
      "Context clues include: examples (such as, for instance), contrasts (however, but, although), and definitions (means, refers to, is defined as).",
      "The correct answer preserves the logical meaning of the sentence when substituted.",
    ],
    examples: [
      {
        sentence: "The word 'intermittency' in a passage about solar energy refers to power generation that is not constant.",
        correctAnswer: "Power generation that occurs only at certain times",
        wrongAnswer: "The tendency of solar panels to require frequent maintenance",
        explanation:
          "The passage context explains that solar panels 'only generate when the sun is shining' — this points to intermittent (not continuous) operation, not maintenance issues.",
      },
    ],
    tips: [
      "Never choose an answer just because you know the most common meaning of the word.",
      "The key question is: does this answer WORK in the sentence the word appears in?",
      "If a word seems simple, the TOEFL may be testing a less common meaning.",
      "Use the surrounding sentences — context usually makes the meaning clear.",
    ],
    mnemonic: "Substitute and check: Put each answer back into the sentence — does it make sense?",
    drillTag: "vocabulary_in_context",
  },

  {
    slug: "inference",
    title: "Inference Questions",
    subtitle: "What does the passage imply or suggest?",
    icon: "💡",
    color: "#059669",
    category: "reading",
    description:
      "Inference questions ask about information not directly stated but logically implied by the passage. The correct answer follows necessarily from what IS stated — it cannot be merely possible or speculative.",
    rules: [
      "The correct answer is strongly supported by the passage — almost 'between the lines.'",
      "Wrong answers: too speculative (not supported at all), contradict the passage, or are directly stated (too obvious for an inference).",
      "Look for signal words: 'It can be inferred...', 'What does the author imply...', 'What does the passage suggest...'",
      "Use 'if-then' logic: IF the passage states X and Y, THEN Z can be inferred.",
      "Stay within the scope of the passage — do not use outside knowledge.",
    ],
    examples: [
      {
        sentence: "The passage states that Chadwick's sanitation reforms 'reduced mortality substantially even before anyone understood why they worked.'",
        correctAnswer: "The mechanisms of disease transmission were not yet understood when Chadwick implemented his reforms.",
        wrongAnswer: "Chadwick proved that poor sanitation causes disease.",
        explanation:
          "The passage directly implies lack of understanding — 'before anyone understood' is the key phrase. The wrong answer overstates: Chadwick showed a correlation but the passage doesn't say he 'proved' causation.",
      },
    ],
    tips: [
      "The answer must be TRUE based on the passage — not just possible.",
      "If an answer requires information not in the passage, eliminate it.",
      "Strong inference = passage states it almost directly without saying it explicitly.",
      "Avoid 'extreme' answers with words like 'always,' 'never,' 'all,' 'none' — the passage rarely supports absolutes.",
    ],
    mnemonic: "MUST BE TRUE — not 'could be' or 'might be.' The passage MUST support it.",
    drillTag: "inference",
  },
];

/** Lookup by slug */
export function getTopicBySlug(slug: string): GrammarTopic | undefined {
  return grammarTopics.find((t) => t.slug === slug);
}

/** Group by category */
export function getTopicsByCategory(category: GrammarTopic["category"]): GrammarTopic[] {
  return grammarTopics.filter((t) => t.category === category);
}
