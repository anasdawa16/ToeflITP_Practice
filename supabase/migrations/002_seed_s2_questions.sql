-- ============================================================
-- 002_seed_s2_questions.sql
-- Section 2: Structure & Written Expression
-- 70 Structure + 50 Written Expression = 120 questions total
-- Follows ETS TOEFL ITP Level 1 format exactly.
--
-- Written Expression format:
--   question_text = full sentence (no markers needed)
--   option_a/b/c/d = the 4 underlined words/phrases in order
--   correct_answer = letter of the ERRONEOUS portion
-- ============================================================

INSERT INTO questions (
  section, part, question_text,
  option_a, option_b, option_c, option_d,
  correct_answer, explanation, difficulty, topic_tags, is_active
) VALUES

-- ============================================================
-- STRUCTURE (70 questions) — complete the sentence
-- ============================================================

-- NOUN CLAUSES (10)
(2,'structure',
 '_______ the researchers discovered in the cave fundamentally changed theories of early human migration.',
 'What','That what','Which','Whatever was',
 'A','What introduces a noun clause as the grammatical subject of "changed." "Whatever" changes the meaning; "That what" and "Which" are ungrammatical here.',2,ARRAY['noun_clause','subject_clause'],true),

(2,'structure',
 'The committee was surprised by _______ the audit revealed about the financial records.',
 'what','that','which','how that',
 'A','After the preposition "by," a noun clause introduced by "what" serves as the object. "Which" would require an antecedent; "that" cannot follow a preposition directly.',2,ARRAY['noun_clause','object_clause'],true),

(2,'structure',
 '_______ the theory was eventually proven incorrect does not diminish its historical importance.',
 'Although','That','Because','Despite',
 'B','A noun clause with "That" functions as the subject of "does not diminish." The other options create adverbial clauses, not noun clauses.',3,ARRAY['noun_clause','subject_clause'],true),

(2,'structure',
 'Scientists still debate _______ the asteroid impact caused the mass extinction event.',
 'whether','that whether','if that','that if',
 'A','"Whether" correctly introduces a noun clause (indirect question) as the object of "debate." "If" can also work in informal speech, but "whether" is standard in academic English.',2,ARRAY['noun_clause','whether_clause'],true),

(2,'structure',
 'The discovery of penicillin, _______ changed the course of modern medicine, was largely accidental.',
 'which','that it','what','it',
 'A','A non-restrictive relative clause introduced by "which" correctly adds information about the discovery. "That" cannot introduce a non-restrictive clause.',2,ARRAY['relative_clause','non_restrictive'],true),

(2,'structure',
 '_______ she chose to pursue graduate studies surprised everyone who knew her earlier career plans.',
 'That','It that','What it','How',
 'A','"That she chose to pursue graduate studies" is a noun clause acting as the subject. "It that" is ungrammatical; "How" would require a different sentence structure.',3,ARRAY['noun_clause','that_clause'],true),

(2,'structure',
 'The professor explained _______ the experiment had yielded unexpected results.',
 'that','what that','which','how that',
 'A','"That" correctly introduces a noun clause as the direct object of "explained." The other options create ungrammatical or semantically incorrect structures.',1,ARRAY['noun_clause','that_clause'],true),

(2,'structure',
 'No one could predict _______ the volcanic eruption would occur or how severe it would be.',
 'whether','if that','that whether','when whether',
 'A','"Whether" is used in noun clauses representing yes/no questions or alternatives ("whether...or"). "If" is informal and less preferred in academic writing here.',2,ARRAY['noun_clause','whether_clause'],true),

(2,'structure',
 '_______ species survive in changing environments depends largely on their genetic diversity.',
 'Whether','That which','How many','Which',
 'C','"How many species survive" is a noun clause functioning as subject. "Whether" changes the meaning to a yes/no question; "Which" cannot introduce this type of clause.',3,ARRAY['noun_clause','how_many'],true),

(2,'structure',
 'The archaeologist noted _______ the artifacts found at the site were consistent with the Bronze Age.',
 'that','what','which','it that',
 'A','"That" introduces a noun clause as the direct object of "noted." In reporting verbs like "noted," "said," "found," a "that" clause follows directly.',1,ARRAY['noun_clause','that_clause'],true),

-- INVERTED STRUCTURE (10)
(2,'structure',
 'Rarely _______ so diverse an ecosystem in such a small geographic area.',
 'scientists have found','have scientists found','scientists found','did scientists found',
 'B','After limiting adverbs like "Rarely," subject-auxiliary inversion is required: auxiliary + subject + main verb = "have scientists found."',3,ARRAY['inverted_structure','negative_adverb'],true),

(2,'structure',
 'Not until the twentieth century _______ the mechanisms of genetic inheritance fully understood.',
 'were','they were','they have been','had been',
 'A','"Not until" requires inverted structure: "Not until X were/did + subject..." The passive "were...understood" is correct here.',3,ARRAY['inverted_structure','not_until'],true),

(2,'structure',
 'Scarcely _______ the research team arrived at the site when the unexpected storm hit.',
 'had','had they','they had','did they have',
 'B','"Scarcely...when" requires inversion: "Scarcely had + subject + past participle." "Had they arrived" is correct.',4,ARRAY['inverted_structure','scarcely_when'],true),

(2,'structure',
 'Never before _______ such rapid technological advancement in human history.',
 'there has been','has there been','there was','was there been',
 'B','After "Never before," inversion is mandatory: auxiliary + subject. "Has there been" correctly inverts "there has been."',3,ARRAY['inverted_structure','negative_adverb'],true),

(2,'structure',
 'Only after extensive testing _______ the new drug approved for public use.',
 'was','they approved','it was','had approved',
 'A','"Only after" triggers inversion. The passive "was the new drug approved" correctly places the auxiliary before the subject.',3,ARRAY['inverted_structure','only_after'],true),

(2,'structure',
 'So complex _______ the mathematical proof that only a handful of specialists could verify it.',
 'was','it was','the proof was','proved',
 'A','"So + adjective + was + subject" is the inverted structure used for emphasis. "So complex was the mathematical proof..."',4,ARRAY['inverted_structure','so_adjective'],true),

(2,'structure',
 'Not only _______ the earthquake destroy numerous buildings, but it also disrupted the water supply.',
 'did','had','the earthquake','was',
 'A','"Not only...but also" with inverted structure requires: "Not only did + subject + base verb." The auxiliary "did" precedes the subject.',4,ARRAY['inverted_structure','not_only_but_also'],true),

(2,'structure',
 'Seldom _______ a scientific discovery with such immediate and widespread practical applications.',
 'there comes','comes there','does there come','there has come',
 'C','After "Seldom," inversion applies: "Seldom does there come..." using auxiliary "does" + subject "there" + main verb.',4,ARRAY['inverted_structure','seldom'],true),

(2,'structure',
 'Had _______ about the risks earlier, the expedition team would have taken different precautions.',
 'they known','they have known','known they','they to know',
 'A','Inverted conditional: "Had + subject + past participle" = "If they had known." This is the correct form for a past unreal conditional.',4,ARRAY['conditional','inverted_structure','third_conditional'],true),

(2,'structure',
 'Under no circumstances _______ students use electronic devices during the examination.',
 'should','students should','they should','are',
 'A','"Under no circumstances" requires inversion: "Under no circumstances should students..." The modal "should" precedes the subject.',3,ARRAY['inverted_structure','negative_phrase'],true),

-- PARALLEL STRUCTURE (8)
(2,'structure',
 'The biologist spent her career studying marine ecosystems, documenting rare species, and _______.',
 'to write scientific articles','writing scientific articles','she wrote articles','the writing of articles',
 'B','Parallel structure requires identical grammatical form. Since the list uses gerunds ("studying," "documenting"), the third item must be "writing scientific articles."',2,ARRAY['parallel_structure','gerund'],true),

(2,'structure',
 'The new urban planning policy aims to reduce traffic congestion, improve air quality, and _______.',
 'affordable housing must be created','the creation of affordable housing','create affordable housing','for creating affordable housing',
 'C','The list uses base infinitives after "to": "to reduce...improve...create." The third item must also be a base verb: "create affordable housing."',2,ARRAY['parallel_structure','infinitive'],true),

(2,'structure',
 'The scholarship requires applicants to demonstrate academic excellence, _______ financial need, and community involvement.',
 'show','to show','showing','having shown',
 'A','After "to demonstrate...show...," the series omits "to" before the second and third verbs but they must still be base forms: "demonstrate, show, [demonstrate] community involvement."',3,ARRAY['parallel_structure','infinitive'],true),

(2,'structure',
 'The ancient trade route connected distant civilizations, facilitated the exchange of goods, and _______.',
 'cultural ideas had been spread','spread cultural ideas','was spreading cultural ideas','the spreading of cultural ideas',
 'B','Simple past parallel: "connected...facilitated...spread." All three verbs must be in the same tense and form.',2,ARRAY['parallel_structure','verb_form'],true),

(2,'structure',
 'Effective scientific writing is characterized by clarity, precision, and _______.',
 'being objective','objectivity','it is objective','objectively',
 'B','A series of nouns: "clarity, precision, and objectivity." All three must be nouns. "Objectivity" maintains parallelism.',2,ARRAY['parallel_structure','noun'],true),

(2,'structure',
 'The training program teaches employees how to manage time efficiently, _______, and resolve conflicts professionally.',
 'to communicate clearly','communicating clearly','clear communication','they communicate clearly',
 'A','After "how to manage...communicate...resolve," all items need "to + base verb" (or parallel infinitive phrases): "to communicate clearly."',2,ARRAY['parallel_structure','infinitive'],true),

(2,'structure',
 'The river was important to the ancient city not only as a source of water but also as _______.',
 'for transportation','a means of transportation','transporting goods','it transported goods',
 'B','"Not only as...but also as" requires parallel structure: "as a source" parallels "as a means of transportation." Both are noun phrases.',3,ARRAY['parallel_structure','correlatives'],true),

(2,'structure',
 'The new laboratory equipment is state-of-the-art, reliable, and _______.',
 'costing very little','very little cost','inexpensive','it is inexpensive',
 'C','Predicate adjective series: "state-of-the-art, reliable, and inexpensive." All three must be adjectives in the same construction.',1,ARRAY['parallel_structure','adjective'],true),

-- REDUCED CLAUSES / PARTICIPIAL PHRASES (8)
(2,'structure',
 '_______ thousands of years ago, the cave paintings were remarkably well preserved.',
 'Created','Creating','Having created','They were created',
 'A','A past participial phrase "Created thousands of years ago" = "that were created thousands of years ago." It modifies "the cave paintings."',3,ARRAY['reduced_clause','past_participle'],true),

(2,'structure',
 'The manuscript, _______ by scholars for centuries, was finally decoded using modern imaging technology.',
 'misunderstood','misunderstanding','had misunderstood','was misunderstood',
 'A','Past participle "misunderstood" creates a reduced relative clause: "which had been misunderstood by scholars for centuries."',3,ARRAY['reduced_clause','relative_clause'],true),

(2,'structure',
 '_______ along the coastline for over three hundred miles, the highway offers spectacular ocean views.',
 'Extended','Extending','It extends','Having been extended',
 'B','Present participle "Extending along the coastline" describes the highway (active, ongoing state). "Extended" implies someone extended it passively.',3,ARRAY['reduced_clause','present_participle'],true),

(2,'structure',
 'The chemical compound, _______ at room temperature, is commonly used as a preservative in food processing.',
 'stable','being stable','it is stable','to be stable',
 'A','A participial adjective phrase in apposition: "stable at room temperature" = "which is stable at room temperature." Simplest reduced form.',2,ARRAY['reduced_clause','adjective'],true),

(2,'structure',
 '_______ that the sample was contaminated, the researchers discarded the results and began again.',
 'Realizing','Realized','To realize','They realized',
 'A','A present participial phrase "Realizing that..." indicates simultaneous or preceding action by the subject (the researchers).',2,ARRAY['reduced_clause','present_participle'],true),

(2,'structure',
 'The treaty, _______ by twelve nations, established new standards for maritime trade.',
 'signed','signing','to be signed','had been signed',
 'A','"Signed by twelve nations" = reduced relative clause "which was signed by twelve nations." Past participle modifies "treaty."',2,ARRAY['reduced_clause','past_participle'],true),

(2,'structure',
 '_______ their initial findings, the team presented an interim report to the funding committee.',
 'Having summarized','Summarized','Summary of','They summarized',
 'A','"Having summarized" is a perfect participial phrase showing action completed before the main clause action (presenting). It correctly precedes the main subject.',3,ARRAY['reduced_clause','perfect_participle'],true),

(2,'structure',
 'The expedition members, _______ by the unexpected cold front, sought emergency shelter at a nearby station.',
 'caught','catching','to be caught','being catching',
 'A','"Caught by the unexpected cold front" = reduced passive participial phrase "who were caught by the cold front."',3,ARRAY['reduced_clause','past_participle'],true),

-- CORRELATIVES (6)
(2,'structure',
 'The study concluded that neither economic incentives _______ regulatory pressure alone was sufficient to change corporate behavior.',
 'nor was','nor','or','nor were',
 'B','"Neither...nor" is the correct correlative conjunction. No additional auxiliary is needed here; "nor" simply connects the two alternatives.',2,ARRAY['correlatives','neither_nor'],true),

(2,'structure',
 'Both the long-term environmental consequences _______ the immediate economic impacts were considered in the final report.',
 'or','nor','and','but also',
 'C','"Both...and" connects two parallel noun phrases. "Both A and B" is the complete correlative structure.',1,ARRAY['correlatives','both_and'],true),

(2,'structure',
 'The research team could either redesign the entire experiment _______ accept the limitations of the current methodology.',
 'nor','or','but also','and also',
 'B','"Either...or" presents two alternatives. "Either A or B" is the correct correlative pair.',1,ARRAY['correlatives','either_or'],true),

(2,'structure',
 'The discovery was important not only because of its immediate applications _______ because it opened entirely new fields of inquiry.',
 'and also','but also','or also','but and',
 'B','"Not only...but also" is the complete correlative conjunction. It emphasizes the second point as additional and often more important.',2,ARRAY['correlatives','not_only_but_also'],true),

(2,'structure',
 'The foundation awarded grants to _______ established researchers and emerging scholars.',
 'either','both','neither','not only',
 'B','"Both...and" must follow "both" to connect "established researchers and emerging scholars." The sentence is using "both" as a predeterminer here.',2,ARRAY['correlatives','both_and'],true),

(2,'structure',
 '_______ the experiment nor the follow-up study produced statistically significant results.',
 'Either','Neither','Not only','Both',
 'B','"Neither...nor" negates both elements. "Either...or" presents alternatives (not negation). Only "Neither" correctly indicates that neither one produced results.',2,ARRAY['correlatives','neither_nor'],true),

-- COMPARATIVES / AS...AS (6)
(2,'structure',
 'The new alloy is _______ durable as traditional steel but significantly lighter.',
 'as','more','so','equally',
 'A','"As...as" is used for equal comparison: "as durable as." "More...than" would be comparative but doesn''t fit "as" at the end.',1,ARRAY['comparison','as_as'],true),

(2,'structure',
 '_______ the population grows, the demand for clean water resources becomes more pressing.',
 'As long as','The more','As','For',
 'C','"As the population grows" is an adverbial clause of time/proportion. "As" means "while" or "in proportion as" in this context.',2,ARRAY['adverbial_clause','as_proportion'],true),

(2,'structure',
 'The results of the second experiment were far _______ those of the first.',
 'superior than','more superior to','superior to','superior over',
 'C','"Superior to" is the correct idiomatic expression — "superior" already includes the comparative meaning and requires the preposition "to."',3,ARRAY['comparison','adjective_preposition'],true),

(2,'structure',
 '_______ the mountains are, the thinner the atmosphere and the more intense the solar radiation.',
 'Higher','The higher','More high','As higher',
 'B','"The + comparative...the + comparative" expresses proportional relationship: "The higher...the thinner...the more intense."',3,ARRAY['comparison','the_more_the_more'],true),

(2,'structure',
 'Modern surgical techniques are _______ safer than those practiced a century ago.',
 'very','considerably','more considerably','so',
 'B','"Considerably safer" uses an adverb to intensify a comparative adjective. "Very" modifies positive/superlative, not comparative forms.',3,ARRAY['comparison','intensifier'],true),

(2,'structure',
 'The new bridge design is twice _______ the original structure.',
 'as strong as','stronger than','stronger as','as stronger as',
 'A','"Twice as...as" is the correct structure for multiples of equal comparison: "twice as strong as." "Stronger than" would need "twice" differently placed.',3,ARRAY['comparison','multiple_comparison'],true),

-- CONDITIONALS (6)
(2,'structure',
 'If the ocean temperature _______ to rise significantly, entire coral reef ecosystems would be destroyed.',
 'were','is','would be','had been',
 'A','A present unreal (hypothetical) conditional uses "were" (or subjunctive) in the if-clause, even for third-person singular.',3,ARRAY['conditional','hypothetical'],true),

(2,'structure',
 '_______ the researchers had published their findings sooner, the outbreak might have been contained.',
 'Had','If they had','Were','Should',
 'A','Inverted third conditional: "Had the researchers published" = "If the researchers had published." The auxiliary "had" moves to the front when "if" is omitted.',4,ARRAY['conditional','inverted_structure','third_conditional'],true),

(2,'structure',
 'The project will be completed on schedule _______ there are no further unexpected delays.',
 'providing that','as long as','unless','provided that',
 'D','"Provided that" is the most formal and precise conditional conjunction meaning "on the condition that." All four options are grammatically possible, but "provided that" is standard in formal academic writing.',3,ARRAY['conditional','formal_conjunctions'],true),

(2,'structure',
 'Should the initial results prove inconclusive, the team _______ the experiment with a larger sample.',
 'will repeat','would repeat','had repeated','repeats',
 'B','"Should" in the if-clause (inverted conditional for a possible future situation) pairs with "would + base verb" in the result clause.',4,ARRAY['conditional','should_clause'],true),

(2,'structure',
 'If the government _______ the subsidies earlier, the industry might have survived the economic downturn.',
 'had maintained','maintained','would maintain','has maintained',
 'A','Third conditional (past unreal): "If + past perfect...would/might + have + past participle." The if-clause requires the past perfect.',3,ARRAY['conditional','third_conditional'],true),

(2,'structure',
 'Unless the funding committee _______ its decision, the research program will be terminated by year end.',
 'reverses','will reverse','had reversed','reversed',
 'A','"Unless" + present simple tense expresses a real future condition: "Unless X reverses [its decision], Y will happen."',2,ARRAY['conditional','unless'],true),

-- APPOSITIVES (4)
(2,'structure',
 'Albert Einstein, _______, spent the last decades of his life in Princeton, New Jersey.',
 'the Nobel Prize winner in Physics','who won the Nobel Prize in Physics in 1921','a winner of the Nobel','having won the Nobel',
 'A','An appositive noun phrase ("the Nobel Prize winner in Physics") renames or identifies the subject. It is separated by commas and does not require "who."',2,ARRAY['appositive'],true),

(2,'structure',
 'The Nile River, _______, has supported human civilization for thousands of years.',
 'the longest river in Africa','which is the longest river in Africa','being the longest river','longest river in Africa',
 'A','An appositive noun phrase ("the longest river in Africa") is the most concise and grammatically correct way to add identifying information.',2,ARRAY['appositive'],true),

(2,'structure',
 'Marie Curie, _______ to win two Nobel Prizes in different scientific disciplines, remains an icon of perseverance.',
 'the first woman','the first woman ever','a first woman','first woman',
 'B','"The first woman ever to win" is the correct appositive phrase with the superlative "first" + "ever" for emphasis. "The first woman" alone needs "ever" for proper ETS phrasing.',3,ARRAY['appositive','superlative'],true),

(2,'structure',
 'DNA, _______ carries genetic information in all living organisms, consists of a double helix structure.',
 'that it','which','whom','whose it',
 'B','A non-restrictive relative clause with "which" is used to add non-essential information about DNA. "That" cannot begin a non-restrictive clause.',2,ARRAY['relative_clause','non_restrictive'],true),

-- GERUND vs. INFINITIVE (6)
(2,'structure',
 'Scientists have succeeded in _______ the protein responsible for the cellular mutation.',
 'to identify','identifying','identify','the identification',
 'B','After prepositions (here: "in"), gerunds are required: "in identifying." An infinitive cannot follow a preposition.',2,ARRAY['gerund_infinitive','preposition'],true),

(2,'structure',
 'The research team avoided _______ the data before the analysis was complete.',
 'interpreting','to interpret','interpretation of','they interpret',
 'A','"Avoid" is a verb that takes a gerund object (not an infinitive): "avoid interpreting." Other verbs requiring gerunds: enjoy, deny, consider, recommend.',2,ARRAY['gerund_infinitive','verb_gerund'],true),

(2,'structure',
 '_______ the variables in a complex system is often more difficult than identifying them.',
 'To control','Controlling','For controlling','Having controlled',
 'B','A gerund phrase as subject ("Controlling the variables") parallels the second gerund phrase "identifying them." Gerunds and infinitives both work as subjects, but parallelism here requires gerund.',3,ARRAY['gerund_infinitive','parallel_structure'],true),

(2,'structure',
 'The committee decided _______ the budget allocation without further consultation.',
 'revising','on revising','to revise','for revising',
 'C','"Decide" takes an infinitive (not a gerund): "decided to revise." Compare: "decided on" would require a gerund — "decided on revising" is also grammatically correct here.',2,ARRAY['gerund_infinitive','verb_infinitive'],true),

(2,'structure',
 'Many environmentalists advocate _______ stricter regulations on industrial emissions.',
 'to impose','imposing','impose','for impose',
 'B','"Advocate" takes a gerund when used without "for": "advocate imposing." With "for," it takes a noun: "advocate for stricter regulations."',3,ARRAY['gerund_infinitive','verb_gerund'],true),

(2,'structure',
 'The professor suggested _______ the original data sources before drawing any final conclusions.',
 'to reconsider','reconsidering','that reconsidering','reconsider',
 'B','"Suggest" takes a gerund as direct object: "suggested reconsidering." (It can also take a "that" clause with subjunctive: "suggested that they reconsider.")',2,ARRAY['gerund_infinitive','verb_gerund'],true),

-- ADVERBIAL CLAUSES (6)
(2,'structure',
 '_______ the theoretical framework was sound, the experimental results consistently contradicted the predictions.',
 'Despite','Although','Because','Since',
 'B','"Although" introduces a concessive adverbial clause (contrast) with a full subject-verb structure. "Despite" is a preposition and cannot precede a clause directly.',2,ARRAY['adverbial_clause','concession'],true),

(2,'structure',
 'The coral reefs will continue to deteriorate _______ ocean temperatures rise above critical thresholds.',
 'as long as','unless','because','while',
 'A','"As long as" expresses a condition that must persist. "Unless" would require the opposite condition. "Because" and "while" change the meaning.',2,ARRAY['adverbial_clause','condition'],true),

(2,'structure',
 '_______ the data from multiple sources, the analysts developed a comprehensive model of the phenomenon.',
 'Having compiled','They have compiled','Compiling having been','compiled',
 'A','"Having compiled" is a perfect participial phrase indicating an action completed before the main clause. It correctly modifies "the analysts."',3,ARRAY['adverbial_clause','perfect_participle'],true),

(2,'structure',
 'The glacier has retreated significantly _______ the industrial revolution introduced large-scale burning of fossil fuels.',
 'until','since','while','during',
 'B','"Since" introduces a time clause referring to a point in the past from which a situation has continued (used with present perfect in main clause).',2,ARRAY['adverbial_clause','since'],true),

(2,'structure',
 '_______ the experiment was conducted under controlled conditions, the researchers noted several anomalies.',
 'Even though','Yet','However','Despite',
 'A','"Even though" (= "although") introduces a concessive clause with full subject-verb. "However" and "Yet" are conjunctive adverbs used differently.',2,ARRAY['adverbial_clause','concession'],true),

(2,'structure',
 'The river changes its course gradually _______ it encounters resistant bedrock formations.',
 'wherever','whenever','however','whatever',
 'B','"Whenever" = "each time that" — appropriate for describing a repeated condition. "Wherever" relates to place; "however" relates to manner/degree.',2,ARRAY['adverbial_clause','whenever'],true),

-- SUBJECT-VERB AGREEMENT / IT CONSTRUCTIONS (4)
(2,'structure',
 'It was the discovery of fire _______ enabled early humans to cook food and extend their habitable range.',
 'which','what','that','and that',
 'C','"It was...that" is the cleft sentence structure used for emphasis. "It was the discovery of fire that enabled..." emphasizes the discovery.',2,ARRAY['cleft_sentence','emphasis'],true),

(2,'structure',
 '_______ essential that all experimental variables be carefully documented and controlled throughout the study.',
 'This is','It is','There is','One is',
 'B','"It is + adjective + that-clause with subjunctive" is the standard construction: "It is essential that all variables be..." "It" is the formal/expletive subject.',1,ARRAY['it_subject','subjunctive'],true),

(2,'structure',
 'There _______ a number of unresolved questions regarding the long-term effects of the medication.',
 'remain','remains','is remaining','are remaining',
 'A','"There + remain/are" agrees with the real subject "a number of questions" (plural). "A number of" takes a plural verb.',3,ARRAY['agreement','a_number_of'],true),

(2,'structure',
 'It took decades of research before scientists _______ understand the full complexity of the human genome.',
 'would begin to','came to','could begin in','began to fully',
 'D','"Before scientists began to fully understand" — simple past in the time clause after "before." "Began to fully understand" (split infinitive) is the most natural and grammatically sound option.',3,ARRAY['adverbial_clause','time'],true),

-- ============================================================
-- WRITTEN EXPRESSION (50 questions) — identify the error
-- option_a/b/c/d = the 4 underlined portions in the sentence
-- correct_answer = the portion containing the grammatical error
-- ============================================================

-- SUBJECT-VERB AGREEMENT (10)
(2,'written_expression',
 'The committee have reached its decision after reviewing all the submitted evidence and testimonials.',
 'The committee','have reached','its decision','after reviewing',
 'A','"Committee" is a collective noun treated as singular in formal American English: "The committee has reached its decision."',2,ARRAY['verb_agreement','collective_noun'],true),

(2,'written_expression',
 'Either the project manager or her assistants was responsible for the submission delay.',
 'Either','her assistants','was responsible','the submission delay',
 'C','With "either...or," the verb agrees with the subject closer to it. Since "her assistants" is closest and plural, "was" should be "were."',3,ARRAY['verb_agreement','either_or'],true),

(2,'written_expression',
 'The data collected from all three experimental groups strongly suggests a connection between diet and longevity.',
 'data collected','all three','strongly suggests','between diet',
 'C','"Data" is the plural of "datum" and takes a plural verb in formal/scientific writing: "strongly suggest."',3,ARRAY['verb_agreement','data_plural'],true),

(2,'written_expression',
 'Each of the researchers involved in the longitudinal study were required to submit progress reports monthly.',
 'Each of','the researchers','were required','to submit',
 'C','"Each" is singular and requires a singular verb: "was required." "Each of the researchers" takes the singular.',2,ARRAY['verb_agreement','each_singular'],true),

(2,'written_expression',
 'The number of endangered species in the region have increased dramatically over the past two decades.',
 'The number','endangered species','have increased','the past two decades',
 'C','"The number of" (= the count) is singular: "has increased." Compare: "A number of" (= several) is plural.',3,ARRAY['verb_agreement','the_number_of'],true),

(2,'written_expression',
 'Neither the professor nor her graduate students was present at the interdepartmental symposium.',
 'Neither','her graduate students','was present','interdepartmental symposium',
 'C','With "neither...nor," the verb agrees with the nearest subject. "graduate students" is plural, so "was" should be "were."',3,ARRAY['verb_agreement','neither_nor'],true),

(2,'written_expression',
 'Physics are considered one of the most challenging undergraduate majors at research universities.',
 'Physics','are considered','one of the most','challenging undergraduate',
 'B','"Physics" (and other -ics disciplines: mathematics, economics, linguistics) is treated as singular: "is considered."',2,ARRAY['verb_agreement','ics_singular'],true),

(2,'written_expression',
 'The flock of migratory birds were observed resting on the reservoir before continuing their southward journey.',
 'The flock','migratory birds','were observed','before continuing',
 'C','"Flock" as the head noun is singular: "was observed." When the focus is on the group as a unit, the singular verb applies.',2,ARRAY['verb_agreement','collective_noun'],true),

(2,'written_expression',
 'Approximately one-third of the Earth''s surface are covered by desert regions of varying types and sizes.',
 'Approximately','the Earth''s surface','are covered','varying types',
 'C','Fractions agree with the noun that follows "of." "One-third of the Earth''s surface" — surface is singular, so "is covered."',3,ARRAY['verb_agreement','fraction'],true),

(2,'written_expression',
 'The jury have deliberated for four days before finally reaching a unanimous verdict in the complex case.',
 'The jury','have deliberated','for four days','unanimous verdict',
 'B','In American English, "jury" is treated as a singular collective noun: "has deliberated." (British English uses plural for collective nouns.)',2,ARRAY['verb_agreement','collective_noun'],true),

-- VERB TENSE (8)
(2,'written_expression',
 'By the time the explorers reached the summit, they have been climbing for over fourteen hours.',
 'By the time','reached the summit','have been climbing','over fourteen hours',
 'C','"By the time + past simple" requires past perfect in the other clause: "had been climbing" (past perfect continuous).',3,ARRAY['verb_tense','past_perfect'],true),

(2,'written_expression',
 'The ancient city had thrived for centuries before a catastrophic earthquake finally destroys it.',
 'had thrived','for centuries','a catastrophic','finally destroys',
 'D','The sentence describes a past completed action. "Destroys" should be "destroyed" to maintain consistency with past narrative tense.',3,ARRAY['verb_tense','past_sequence'],true),

(2,'written_expression',
 'Scientists working on the project since 2001 have published more than forty peer-reviewed articles.',
 'Scientists working','on the project','since 2001','have published',
 'A','"Since 2001" requires present perfect in active use: "Scientists who have been working" or the participial form needs adjustment. "Working" without auxiliary implies simple present.',4,ARRAY['verb_tense','since_present_perfect'],true),

(2,'written_expression',
 'If the funding had been secured earlier, the team will have completed the research by last December.',
 'the funding','had been secured','the team','will have completed',
 'D','Third conditional (past unreal) requires "would have + past participle": "would have completed," not "will have completed."',3,ARRAY['verb_tense','conditional','third_conditional'],true),

(2,'written_expression',
 'The historian argues that the Renaissance begun in Florence during the fourteenth century.',
 'The historian argues','that the Renaissance','begun in Florence','the fourteenth century',
 'C','"Begun" is the past participle, not the simple past. The simple past "began" is required: "the Renaissance began in Florence."',2,ARRAY['verb_tense','irregular_verb'],true),

(2,'written_expression',
 'By 2030, renewable energy sources will supply more than half of the world''s electricity needs.',
 'By 2030','renewable energy','will supply','half of the world''s',
 'A','"By 2030" signals a future deadline, requiring future perfect: "will have supplied" to indicate completion by that point.',3,ARRAY['verb_tense','future_perfect'],true),

(2,'written_expression',
 'The treaty was signed in 1648, effectively ending the Thirty Years War and has established a new European order.',
 'was signed','effectively ending','the Thirty Years War','has established',
 'D','The sentence describes past events. "Has established" (present perfect) should be "established" (simple past) to match the narrative tense.',2,ARRAY['verb_tense','tense_consistency'],true),

(2,'written_expression',
 'The geologists discovered that volcanic activity in the region increases significantly during the previous century.',
 'The geologists discovered','volcanic activity','increases significantly','the previous century',
 'C','In reported speech with a past reporting verb ("discovered"), the verb in the reported clause shifts to past: "had increased significantly."',3,ARRAY['verb_tense','reported_speech','backshift'],true),

-- WORD FORM (8)
(2,'written_expression',
 'The economy improvement observed in the third quarter surprised many financial analysts.',
 'economy improvement','observed in','third quarter','surprised many',
 'A','"Economy" is a noun used incorrectly as a modifier. The correct adjective form is "economic": "The economic improvement."',2,ARRAY['word_form','adjective_noun'],true),

(2,'written_expression',
 'The scientist made an importance contribution to the understanding of cellular division.',
 'The scientist','made an importance','contribution to','cellular division',
 'B','"Importance" is a noun; the adjective "important" is needed before the noun "contribution": "made an important contribution."',1,ARRAY['word_form','adjective_noun'],true),

(2,'written_expression',
 'The rapid grow of the urban population created unprecedented challenges for city planners.',
 'The rapid','grow of','urban population','unprecedented challenges',
 'B','"Grow" is a verb; the noun "growth" is required: "the rapid growth of the urban population."',2,ARRAY['word_form','noun_verb'],true),

(2,'written_expression',
 'Despite extensive research, the cure for the disease remains elusive and scientific difficult to isolate.',
 'Despite extensive','remains elusive','scientific difficult','to isolate',
 'C','"Scientific" is an adjective; the adverb "scientifically" is needed to modify the adjective "difficult": "scientifically difficult."',2,ARRAY['word_form','adverb_adjective'],true),

(2,'written_expression',
 'The committee''s decision to fund the project was meet with widespread approval from the scientific community.',
 'committee''s decision','to fund','was meet','widespread approval',
 'C','In a passive construction, the past participle form is required: "was met with" not "was meet with."',2,ARRAY['word_form','passive_participle'],true),

(2,'written_expression',
 'The anthropologist''s analysis provided a depth understanding of the cultural practices of the indigenous group.',
 'anthropologist''s analysis','provided a','depth understanding','cultural practices',
 'C','"Depth" is a noun; the adjective "deep" or "in-depth" is required: "provided a deep understanding" or "an in-depth understanding."',2,ARRAY['word_form','adjective_noun'],true),

(2,'written_expression',
 'Researchers discovered that early exposure to music significant improves language acquisition in young children.',
 'early exposure','to music','significant improves','language acquisition',
 'C','"Significant" is an adjective; the adverb "significantly" is needed to modify the verb "improves."',1,ARRAY['word_form','adverb_adjective'],true),

(2,'written_expression',
 'The successfully of the new drug trials encouraged pharmaceutical companies to increase investment in research.',
 'The successfully','new drug trials','companies to increase','investment in research',
 'A','"Successfully" is an adverb; the noun "success" is required as the subject: "The success of the new drug trials."',2,ARRAY['word_form','noun_adverb'],true),

-- PRONOUN REFERENCE (6)
(2,'written_expression',
 'The board of directors announced that they would delay their decision until the quarterly results were available.',
 'The board of directors','announced that','they would delay','quarterly results',
 'A','In American English, "board of directors" is singular (corporate context), so "it would delay its decision" is standard formal usage.',3,ARRAY['pronoun_reference','collective_noun'],true),

(2,'written_expression',
 'Each student must submit their final thesis by the last day of the examination period.',
 'Each student','must submit','their final thesis','last day of',
 'C','Traditionally, "each student" (singular) requires a singular pronoun: "his or her final thesis." (Note: singular "their" is increasingly accepted in modern usage, but TOEFL tests traditional grammar.)',3,ARRAY['pronoun_reference','each_singular'],true),

(2,'written_expression',
 'When a researcher analyzes their data, they must account for potential sources of error and bias.',
 'a researcher analyzes','their data','they must account','sources of error',
 'B','Traditional formal grammar requires singular pronoun agreement: "When a researcher analyzes his or her data, he or she must account..."',3,ARRAY['pronoun_reference','generic_pronoun'],true),

(2,'written_expression',
 'The company and its subsidiary have announced that it would merge operations by the end of the fiscal year.',
 'The company','and its subsidiary','have announced','it would merge',
 'D','"The company and its subsidiary" is a compound subject (plural). The pronoun should be "they would merge," not "it would merge."',2,ARRAY['pronoun_reference','compound_subject'],true),

(2,'written_expression',
 'The two studies reached different conclusions, which has caused considerable debate among researchers.',
 'The two studies','reached different','which has caused','among researchers',
 'C','"Which" refers to the plural antecedent "different conclusions," so the verb should be plural: "which have caused considerable debate."',3,ARRAY['pronoun_reference','relative_agreement'],true),

(2,'written_expression',
 'The archaeological artifacts were carefully catalogued and it was shipped to the national museum for preservation.',
 'were carefully catalogued','carefully catalogued','it was shipped','for preservation',
 'C','"The artifacts" is plural; "it" should be "they": "they were shipped to the national museum."',2,ARRAY['pronoun_reference','pronoun_number'],true),

-- PARALLEL STRUCTURE (6)
(2,'written_expression',
 'The new policy requires all staff to attend training sessions, submitting monthly reports, and adhere to updated protocols.',
 'requires all staff','to attend training sessions','submitting monthly reports','adhere to updated protocols',
 'C','All items in the series must be parallel: "to attend...to submit...to adhere" or "attending...submitting...adhering." "Submitting" breaks the infinitive pattern.',3,ARRAY['parallel_structure','list'],true),

(2,'written_expression',
 'The professor is known for her expertise in molecular biology, her dedication to student mentorship, and being published extensively.',
 'expertise in molecular biology','her dedication','student mentorship','being published extensively',
 'D','The series uses noun phrases: "her expertise...her dedication...and her extensive publication record." "Being published extensively" breaks the nominal parallel.',3,ARRAY['parallel_structure','noun_phrase'],true),

(2,'written_expression',
 'The ancient Roman engineers were skilled at designing aqueducts, to build roads, and fortifying city walls.',
 'ancient Roman engineers','skilled at designing','to build roads','fortifying city walls',
 'C','After "skilled at," all items must use gerunds: "designing...building...fortifying." "To build" breaks the gerund pattern.',3,ARRAY['parallel_structure','gerund'],true),

(2,'written_expression',
 'The report recommended increasing the research budget, hiring additional staff, and that new equipment should be purchased.',
 'recommended increasing','the research budget','hiring additional staff','new equipment should be purchased',
 'D','The series uses gerunds: "increasing...hiring...purchasing." "That new equipment should be purchased" is a clause that breaks the gerund parallel.',3,ARRAY['parallel_structure','mixed_structure'],true),

(2,'written_expression',
 'Scientists evaluate theories by testing predictions, examining evidence, and on the basis of reproducibility.',
 'evaluate theories','testing predictions','examining evidence','on the basis of reproducibility',
 'D','After "by," all items must be gerund phrases: "testing...examining...assessing reproducibility." "On the basis of" is a prepositional phrase that breaks parallelism.',3,ARRAY['parallel_structure','gerund'],true),

(2,'written_expression',
 'The candidate''s qualifications include extensive field experience, publication of research, and to speak three languages fluently.',
 'candidate''s qualifications','extensive field experience','publication of research','to speak three languages',
 'D','The series uses noun phrases: "extensive field experience...publication of research...fluency in three languages." "To speak" is an infinitive phrase that breaks the nominal parallel.',3,ARRAY['parallel_structure','noun_phrase'],true),

-- PREPOSITION / IDIOM ERRORS (6)
(2,'written_expression',
 'The scientist''s work resulted with a breakthrough in understanding the mechanisms of cellular aging.',
 'scientist''s work','resulted with','a breakthrough','cellular aging',
 'B','"Result in" is the correct preposition: "resulted in a breakthrough." "Result with" is not standard English idiom.',2,ARRAY['preposition','idiom'],true),

(2,'written_expression',
 'The research team was capable to solve the complex problem within the allotted timeframe.',
 'research team','was capable','to solve','allotted timeframe',
 'C','"Capable of + gerund" is the correct structure: "was capable of solving." "Capable to" is an error; capable takes "of."',2,ARRAY['preposition','adjective_preposition'],true),

(2,'written_expression',
 'The findings are consistent to previous studies on the relationship between exercise and cognitive function.',
 'The findings','are consistent','to previous studies','exercise and cognitive',
 'C','"Consistent with" is the correct preposition: "consistent with previous studies." "Consistent to" is incorrect usage.',2,ARRAY['preposition','adjective_preposition'],true),

(2,'written_expression',
 'The university''s emphasis in undergraduate research has attracted top faculty from around the world.',
 'university''s emphasis','in undergraduate research','attracted top faculty','from around',
 'B','"Emphasis on" is the correct preposition: "emphasis on undergraduate research." "Emphasis in" is incorrect.',2,ARRAY['preposition','noun_preposition'],true),

(2,'written_expression',
 'Researchers must be aware about the ethical implications of their work, particularly when human subjects are involved.',
 'Researchers must','be aware about','ethical implications','human subjects',
 'B','"Aware of" is the correct preposition: "be aware of the ethical implications." "Aware about" is incorrect.',1,ARRAY['preposition','adjective_preposition'],true),

(2,'written_expression',
 'The new taxation policy has had a significant effect in the behavior of both consumers and producers.',
 'new taxation policy','has had','significant effect','the behavior',
 'C','"Effect on" is the correct preposition: "significant effect on the behavior." Compare: "affect" (verb) takes no preposition.',2,ARRAY['preposition','noun_preposition'],true),

-- COMPARISON ERRORS (6)
(2,'written_expression',
 'The brain of a human is more complex than any animal on Earth.',
 'The brain','of a human','more complex than','any animal',
 'D','The comparison is faulty: a human brain cannot be compared directly to "any animal." It should be "any animal''s brain" or "the brain of any other animal."',3,ARRAY['comparison','faulty_comparison'],true),

(2,'written_expression',
 'The new model is more faster than its predecessor and consumes significantly less energy.',
 'The new model','more faster','its predecessor','significantly less',
 'B','"More faster" is a double comparative error. Use either "faster" (simple comparative) or "more rapidly." "More" cannot precede a one-syllable comparative adjective.',2,ARRAY['comparison','double_comparative'],true),

(2,'written_expression',
 'Between the three candidates considered for the position, she was clearly the more qualified.',
 'Between the three','candidates considered','clearly the more','she was',
 'C','When comparing more than two items, the superlative is required: "the most qualified." "Between" is also incorrect for three items (use "among"), but "more" is the primary grammatical error.',3,ARRAY['comparison','three_or_more'],true),

(2,'written_expression',
 'The Amazon rainforest is as larger as the entire continental United States in terms of total area.',
 'The Amazon rainforest','as larger as','entire continental','total area',
 'B','"As...as" equal comparison requires the positive (base) form of the adjective: "as large as." "As larger as" incorrectly uses the comparative form.',2,ARRAY['comparison','as_as'],true),

(2,'written_expression',
 'This year''s harvest was the most productive than any year on record for the agricultural region.',
 'This year''s harvest','was the most productive','than any year','agricultural region',
 'B','"Most productive" is a superlative and should not be followed by "than." Use either "more productive than" (comparative) or "the most productive of any year."',3,ARRAY['comparison','mixed_superlative_comparative'],true),

(2,'written_expression',
 'Compared with other industrialized nation, Japan has one of the highest rates of technological patent filing.',
 'Compared with','other industrialized nation','Japan has','rates of technological',
 'B','"Nation" should be plural: "other industrialized nations" — Japan is being compared to multiple countries.',2,ARRAY['comparison','plural_noun'],true);

-- Count check: 70 structure + 50 written_expression = 120 questions
