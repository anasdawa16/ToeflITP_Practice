-- 004_seed_s3_passages_b.sql
-- Section 3: Reading Comprehension — Passages 11-20
-- 10 passages x 8 questions = 80 questions
-- Topics: Arts(3) + Technology(2) + Business(2) + Social Science(3)

INSERT INTO passages (id, title, content, topic, word_count, difficulty, is_active) VALUES

('01000001-0000-0000-0000-000000000011',
 'The Origins of Jazz Music',
 'Jazz emerged in New Orleans in the early twentieth century as a uniquely American art form, synthesizing African musical traditions, European harmonic structures, and the blues to create something entirely new. The city''s cultural diversity—a mixture of African, Caribbean, French, and Spanish influences—provided an environment in which these musical streams could converge.

African musical elements contributed rhythmic complexity, call-and-response patterns, and the expressive vocal quality that musicians transferred to their instruments. European traditions contributed harmonic and formal structures, along with the instruments themselves—trumpets, clarinets, trombones, and piano. The blues, which developed among African Americans in the rural South, contributed a characteristic emotional directness and the use of "blue notes"—slightly flattened notes that gave the music its distinctive feeling.

Improvisation is the defining characteristic of jazz performance. Rather than reproducing a composed piece exactly, jazz musicians create variations spontaneously within a harmonic framework, responding to each other and to the audience in real time. This interactive quality makes jazz performance fundamentally different from classical music performance, in which fidelity to the written score is the standard.

After World War One, jazz spread rapidly from New Orleans to Chicago, New York, and beyond, carried by migrating musicians and recorded by the new phonograph industry. By the 1920s—often called the Jazz Age—it had become the dominant popular music of the United States and had attracted attention worldwide. Subsequent decades brought further evolution: swing, bebop, cool jazz, and fusion each represented a generation of musicians redefining the boundaries of the form.

Jazz today is recognized internationally as one of America''s most significant cultural contributions, a living tradition that continues to evolve while maintaining its improvisational core.',
 'arts', 265, 3, true),

('01000001-0000-0000-0000-000000000012',
 'The Development of American Cinema',
 'Motion pictures were invented in the 1890s and quickly became the most powerful mass entertainment medium the world had ever seen. Within two decades of their invention, films had transformed from brief novelties shown in nickelodeons into feature-length narratives that attracted audiences from all social classes.

The early film industry was concentrated in the New York area, where Thomas Edison held patents on filmmaking equipment and charged other producers licensing fees. To escape these restrictions, filmmakers relocated to California where the combination of reliable sunshine, diverse landscapes, and distance from Edison''s enforcement agents made production practical. Hollywood, a suburb of Los Angeles, became the center of American film production by approximately 1915.

The studio system that developed over the following decades was vertically integrated: major studios produced films, distributed them, and owned the theaters in which they were shown. This system gave studios enormous market power but also produced extraordinary creativity. The 1930s and 1940s are often called Hollywood''s Golden Age—a period characterized by the refinement of genre filmmaking, the star system, and the narrative conventions that still define mainstream cinema.

The introduction of sound in 1927 with The Jazz Singer transformed the industry overnight, rendering silent film stars obsolete and creating entirely new creative possibilities. Color processes developed gradually during the 1930s, with Technicolor becoming the preferred studio system for prestige productions.

After World War Two, the studio system faced twin challenges: the Supreme Court forced studios to divest their theater chains, and television began competing for the leisure time and attention of American audiences. In response, studios invested in widescreen formats, epic productions, and eventually evolved toward the independent production model that characterizes the film industry today.',
 'arts', 272, 3, true),

('01000001-0000-0000-0000-000000000013',
 'American Modernist Poetry',
 'The early twentieth century brought a revolution in American poetry. Reacting against the formal conventions of Victorian verse—its strict meter, rhyme schemes, and sentimental themes—a group of poets including Ezra Pound, T.S. Eliot, William Carlos Williams, and Marianne Moore developed a new poetics that prized image, precision, and formal experimentation.

Ezra Pound''s battle cry "Make it New" captured the movement''s spirit. Pound advocated for the image—a concrete, precise verbal picture that conveys meaning directly without abstraction or explanation. His Imagist movement, active around 1912-1917, insisted on clear, hard language and the rejection of unnecessary ornamentation. Though the movement was short-lived, its influence was lasting.

T.S. Eliot''s "The Waste Land" (1922) is generally considered the central text of literary modernism. Its fragmented structure, multiple voices, and dense network of allusions to literature, religion, and mythology reflected a worldview shattered by World War One and the collapse of shared cultural certainties. The poem demands active interpretation from readers; it does not explain itself.

William Carlos Williams took a different path, insisting on "No ideas but in things"—the notion that poetry should work through concrete objects and the American vernacular rather than through European literary reference. His poetry of everyday objects and working-class American life proposed a uniquely American modernism independent of the European tradition that Eliot and Pound drew upon.

These poets established formal and thematic precedents that shaped American poetry throughout the remainder of the twentieth century. The tension between Eliot''s allusive, culturally dense approach and Williams''s direct, vernacular poetics remains a defining tension in American verse today.',
 'arts', 258, 4, true),

('01000001-0000-0000-0000-000000000014',
 'The Internet and Global Communication',
 'The Internet has transformed human communication more profoundly than any technology since the printing press. Beginning as a government-funded research network called ARPANET in the late 1960s, it evolved through decades of academic and commercial development into the global network that now connects billions of people and devices.

The World Wide Web, invented by Tim Berners-Lee in 1989, made the Internet accessible to non-technical users by creating a system of hyperlinked documents navigable through a browser. The Web''s rapid expansion through the 1990s brought commercial businesses online, created new forms of journalism and entertainment, and made vast quantities of information freely available to anyone with an internet connection.

Social media platforms emerging in the 2000s fundamentally changed the nature of online participation. Where early Internet use was primarily passive—reading, searching, shopping—social media transformed users into content producers. Platforms like Facebook, Twitter, and YouTube created networks in which information, opinion, and culture spread laterally through social connections rather than broadcasting from centralized media sources.

These changes have had profound consequences for politics, commerce, and culture. Political movements can now organize rapidly across geographic boundaries; small businesses can reach global markets; cultural products created anywhere in the world can find audiences everywhere. But the same technologies have also enabled the rapid spread of misinformation, created new forms of social manipulation, and raised serious concerns about privacy and the concentration of economic power in a small number of technology companies.

Scholars studying the Internet''s social effects emphasize that the technology is not neutral: its design choices, ownership structures, and regulatory environments shape how it affects human interaction and social organization.',
 'technology', 263, 3, true),

('01000001-0000-0000-0000-000000000015',
 'Renewable Energy Technologies',
 'The transition from fossil fuels to renewable energy sources represents one of the most significant technological challenges of the twenty-first century. Solar, wind, and hydroelectric power have existed for decades, but the combination of falling equipment costs, improving technology, and the urgent need to reduce greenhouse gas emissions has accelerated their adoption dramatically in recent years.

Solar photovoltaic panels convert sunlight directly into electricity through the photoelectric effect. The cost of solar panels has fallen by more than ninety percent since 1980, making solar electricity competitive with or cheaper than fossil-fuel generation in many markets. Utility-scale solar farms can now generate electricity at costs that would have seemed impossible a decade ago. Solar power''s primary limitation is intermittency: panels only generate electricity when the sun is shining.

Wind turbines convert the kinetic energy of moving air into electricity through a generator attached to rotating blades. Modern wind turbines are considerably larger and more efficient than their predecessors; offshore wind installations take advantage of stronger and more consistent marine winds. Like solar, wind power is intermittent—output varies with weather conditions.

The intermittency challenge has driven intensive research into energy storage, particularly advanced battery systems. Lithium-ion batteries, which power consumer electronics and electric vehicles, are also being deployed at grid scale. Other storage technologies under development include compressed air storage, pumped hydroelectric facilities, and hydrogen produced by electrolysis using renewable electricity.

Grid modernization—upgrading electrical transmission systems to handle dispersed, variable renewable generation—is also essential to the energy transition. Smart grid technologies that can balance supply and demand in real time, and high-voltage transmission lines connecting renewable-rich regions with population centers, are key infrastructure investments.',
 'technology', 267, 3, true),

('01000001-0000-0000-0000-000000000016',
 'Global Supply Chain Management',
 'Modern businesses rarely produce goods entirely within a single location or even a single country. Instead, they rely on global supply chains—networks of suppliers, manufacturers, distributors, and retailers that may span dozens of countries and hundreds of individual firms. Managing these chains effectively has become one of the central challenges of contemporary business.

Supply chains developed their modern form during the latter half of the twentieth century as trade liberalization reduced tariffs, containerization revolutionized shipping, and communications technology made coordination across distances practical. Manufacturing companies discovered that they could reduce costs dramatically by sourcing components and production from locations where wages, regulations, and resource costs were lower than in their home markets.

The benefits of global supply chains are clear in terms of unit costs and product availability. Consumers in wealthy countries benefit from access to a vast range of goods at prices that domestic production alone could not achieve. But the 2008 financial crisis and, particularly, the COVID-19 pandemic exposed serious vulnerabilities. When the pandemic disrupted factories and ports simultaneously around the world, supply chains for essential goods—medical equipment, semiconductors, and basic consumer products—broke down dramatically, creating shortages that persisted for years.

These disruptions have prompted businesses and governments to reconsider the trade-offs inherent in lean, globally dispersed supply chains. Companies are investing in supply chain visibility systems that provide real-time information about inventory and production status throughout the chain. Many are also pursuing "nearshoring"—relocating production to countries geographically closer to their primary markets—and maintaining larger safety stock to buffer against disruption.

The tension between efficiency and resilience is likely to define supply chain strategy for the coming decade.',
 'business', 262, 3, true),

('01000001-0000-0000-0000-000000000017',
 'Behavioral Economics and Consumer Decision-Making',
 'Traditional economic theory assumes that individuals make decisions rationally—gathering available information, assessing costs and benefits, and choosing the option that maximizes their utility. Decades of research in behavioral economics have challenged this assumption, demonstrating that human decision-making is systematically influenced by cognitive biases, emotional states, and the contexts in which choices are presented.

Daniel Kahneman and Amos Tversky, whose collaboration laid the foundation of behavioral economics, identified numerous ways in which human judgment deviates from rational choice. Their prospect theory showed that people evaluate gains and losses asymmetrically: losses feel approximately twice as painful as equivalent gains feel pleasurable. This loss aversion leads people to make choices that protect against losses even when those choices reduce expected value.

The concept of "anchoring" describes how initial information disproportionately influences subsequent judgments. When people estimate unknown quantities—the price of a used car, for example—their conclusions are strongly influenced by the first number they encounter, even when that number is arbitrary. Retailers exploit anchoring by displaying inflated "original prices" beside sale prices, making discounts appear more substantial than they actually are.

"Choice architecture"—the way options are presented to decision-makers—powerfully influences outcomes. Research by Richard Thaler and Cass Sunstein showed that making a beneficial option the default choice dramatically increases its adoption. Employee retirement savings rates increased significantly when employers changed their retirement plan from an opt-in to an opt-out design—a change with no financial incentives whatsoever.

Behavioral economics has influenced policy design across domains including public health, environmental regulation, and financial planning. Its central insight—that small changes in how choices are presented can produce large changes in behavior—has practical implications for anyone designing systems that involve human decision-making.',
 'business', 271, 4, true),

('01000001-0000-0000-0000-000000000018',
 'Language Acquisition in Children',
 'The speed and universality with which children acquire language is one of the most remarkable phenomena in human development. Without formal instruction, and based on exposure to imperfect, incomplete input, virtually all children master the complex grammatical system of their native language by approximately age five. This achievement has generated intense debate among linguists and psychologists about the relationship between human biology and language learning.

Noam Chomsky''s nativist hypothesis proposes that humans are born with an innate language faculty—a "language acquisition device" that contains universal principles of grammatical structure. This hypothesis explains why children never make certain types of grammatical errors, even types they are never explicitly told to avoid, and why languages around the world share deep structural similarities. Children, on this view, do not learn language purely from experience; they bring powerful linguistic knowledge to the task.

Opposing theorists argue that general cognitive mechanisms—pattern recognition, statistical learning, and social interaction—are sufficient to explain language acquisition without positing innate linguistic knowledge. Experimental research has shown that infants as young as eight months can detect statistical regularities in sound sequences, suggesting that powerful domain-general learning mechanisms are at work from the earliest stages of development.

Critical period research indicates that language acquisition is most efficient during a window that closes around puberty. Individuals who are not exposed to language during this period—whether due to profound deafness without sign language exposure or, in extreme cases, social isolation—face serious and often permanent difficulties in acquiring grammar, regardless of subsequent instruction. This finding supports the view that there is a biological timetable for language development.

The debate between nativist and empiricist perspectives on language acquisition remains unresolved, but both sides have contributed valuable insights into one of humanity''s most distinctive capacities.',
 'social_science', 269, 4, true),

('01000001-0000-0000-0000-000000000019',
 'The Psychology of Creativity',
 'Creativity—the capacity to generate ideas, solutions, or works that are both novel and useful—is one of the most valued and least understood of human cognitive abilities. For much of history, creative achievement was attributed to divine inspiration or mysterious individual genius. Psychological research over the past century has developed more systematic accounts of the processes underlying creative thought.

Psychologist Graham Wallas described the creative process as occurring in four stages: preparation, incubation, illumination, and verification. During preparation, the thinker actively gathers information and works on a problem. Incubation refers to a period of apparent inactivity during which unconscious processing continues. Illumination is the sudden arrival of insight—the "aha moment." Verification involves conscious evaluation and refinement of the insight.

Research on creativity has challenged the popular notion that creativity is a unitary trait that individuals either possess strongly or weakly. Instead, creativity appears to depend on the interaction of multiple factors: domain-specific knowledge, certain cognitive styles (particularly the ability to think both divergently and convergently), motivation, and environmental conditions.

Divergent thinking—the ability to generate multiple possible responses to an open-ended problem—is often measured in creativity research. Yet divergent thinking alone is insufficient for creative achievement; convergent thinking, the ability to evaluate and select among possibilities, is equally important. Nobel laureate scientists and prize-winning artists share not only imagination but the disciplined ability to evaluate and develop their ideas.

Recent neuroscience research has identified networks of brain regions, including the default mode network typically associated with daydreaming, that activate during creative thought. These findings suggest that genuinely creative thinking involves a characteristic pattern of brain activity distinct from routine problem-solving.',
 'social_science', 267, 3, true),

('01000001-0000-0000-0000-000000000020',
 'The History of Public Health',
 'The modern concept of public health—the systematic effort to prevent disease and promote health at the population level through organized social action—emerged primarily in the nineteenth century in response to the devastating epidemics that accompanied rapid industrialization and urbanization.

Before the germ theory of disease was established, public health reformers worked largely in ignorance of disease causation but achieved significant results through environmental intervention. Edwin Chadwick''s 1842 report on sanitary conditions in Britain documented the relationship between poverty, unsanitary living conditions, and disease mortality. Chadwick advocated for clean water supply and sewage systems as public health measures, improvements that reduced mortality substantially even before anyone understood why they worked.

John Snow''s famous investigation of the 1854 cholera epidemic in London provided an early demonstration of epidemiological method. By mapping cholera cases and interviewing residents, Snow identified a contaminated water pump in Soho as the source of the outbreak—an insight achieved through systematic observation rather than laboratory science. Removing the pump handle is often cited as the founding moment of epidemiology.

The late nineteenth century brought the bacteriological revolution. Robert Koch and Louis Pasteur demonstrated that specific microorganisms cause specific diseases, providing a scientific foundation for interventions including vaccines and sanitary regulations. The development of effective vaccines against smallpox, rabies, diphtheria, and typhoid transformed public health practice.

The twentieth century saw public health expand beyond infectious disease to address chronic conditions, mental health, and the social determinants of health—the economic and social conditions that shape population health outcomes. Today, public health practitioners combine biological, epidemiological, and social scientific approaches to understand and improve health at a population scale.',
 'history', 270, 3, true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Section 3 Questions for Passages 11-20 (80 questions)
-- ============================================================
INSERT INTO questions (
  section, part, question_text,
  option_a, option_b, option_c, option_d,
  correct_answer, explanation, difficulty, topic_tags, passage_id, is_active
) VALUES

-- PASSAGE 11: Jazz Music (8 questions)
(3,'reading','What does the passage identify as the defining characteristic of jazz performance?',
 'Its reliance on African rhythmic traditions','Improvisation within a harmonic framework','The use of blue notes borrowed from the blues','Its development in New Orleans'' multicultural environment',
 'B','The passage states: "Improvisation is the defining characteristic of jazz performance."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000011',true),

(3,'reading','The word "synthesizing" in paragraph 1 is closest in meaning to',
 'analyzing separately','combining into a unified whole','imitating','replacing',
 'B','"Synthesize" means to combine separate elements into a new unified whole. Jazz synthesized African, European, and blues traditions.',1,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000011',true),

(3,'reading','According to the passage, what did African musical traditions contribute to jazz?',
 'Harmonic structures and formal composition','Wind instruments including trumpets and clarinets','Rhythmic complexity, call-and-response patterns, and expressive vocal quality','The major and minor scale systems',
 'C','The passage states: "African musical elements contributed rhythmic complexity, call-and-response patterns, and the expressive vocal quality."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000011',true),

(3,'reading','How does the passage say jazz performance differs from classical music performance?',
 'Jazz uses a wider variety of instruments than classical music','Jazz musicians create variations spontaneously rather than faithfully reproducing a score','Jazz follows a stricter harmonic framework than classical compositions','Classical music is more emotionally expressive than jazz',
 'B','The passage states jazz musicians "create variations spontaneously within a harmonic framework," while in classical music "fidelity to the written score is the standard."',2,ARRAY['detail','comparison'],'01000001-0000-0000-0000-000000000011',true),

(3,'reading','According to the passage, jazz spread from New Orleans throughout America primarily due to',
 'government programs promoting American music abroad','migrating musicians and recordings by the phonograph industry','formal music education programs in Northern cities','the popularity of the Jazz Age dance halls',
 'B','The passage states jazz spread "carried by migrating musicians and recorded by the new phonograph industry."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000011',true),

(3,'reading','The term "blue notes" refers to',
 'notes played exclusively on the trumpet','slightly flattened notes giving jazz its distinctive feeling','notations in the musical score written in blue ink','the low bass notes characteristic of African drumming',
 'B','The passage defines blue notes as "slightly flattened notes that gave the music its distinctive feeling."',1,ARRAY['detail','vocabulary_in_context'],'01000001-0000-0000-0000-000000000011',true),

(3,'reading','It can be inferred from the passage that New Orleans was particularly important to jazz because',
 'it was the first city in America with professional music venues','its diverse cultural mixture provided the conditions for multiple musical traditions to merge','it was the home of African American communities that had preserved African music most fully','its tropical climate encouraged outdoor musical performances',
 'B','The passage states New Orleans'' "cultural diversity—a mixture of African, Caribbean, French, and Spanish influences—provided an environment in which these musical streams could converge."',2,ARRAY['inference'],'01000001-0000-0000-0000-000000000011',true),

(3,'reading','Which of the following best describes the overall organization of the passage?',
 'A chronological biography of key jazz musicians','An argument that jazz is more valuable than classical music','A description of jazz''s origins, defining features, historical development, and legacy','A comparison of jazz with other American art forms',
 'C','The passage covers jazz''s diverse origins, its defining characteristic (improvisation), its spread in the 1920s, subsequent evolution, and current status—a developmental overview.',2,ARRAY['organization'],'01000001-0000-0000-0000-000000000011',true),

-- PASSAGE 12: Cinema (8 questions)
(3,'reading','What is the main subject of the passage?',
 'The technical innovations that made sound films possible','The history and development of the American film industry','The competition between Hollywood studios during the Golden Age','The reasons filmmakers moved from New York to California',
 'B','The passage traces the film industry from the 1890s through post-WWII challenges, covering invention, relocation, the studio system, and key transitions.',1,ARRAY['main_idea'],'01000001-0000-0000-0000-000000000012',true),

(3,'reading','According to the passage, why did filmmakers relocate from New York to California?',
 'California offered larger studios and better financial support','They wanted to escape Edison''s patent restrictions and benefit from reliable sunshine and varied landscapes','California''s population was larger, providing bigger audiences','The federal government offered tax incentives for West Coast film production',
 'B','The passage states filmmakers relocated to escape "Edison''s enforcement agents" and benefited from "reliable sunshine, diverse landscapes."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000012',true),

(3,'reading','The word "vertically integrated" in paragraph 3 means the studios',
 'built their facilities on multiple floors to maximize space','controlled all stages of production, distribution, and exhibition','formed alliances with European studios to distribute films globally','specialized in one type of film genre exclusively',
 'B','The passage defines vertical integration: "major studios produced films, distributed them, and owned the theaters in which they were shown."',2,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000012',true),

(3,'reading','According to the passage, what was the major effect of introducing sound in 1927?',
 'It made color filming cheaper and more practical','It allowed studios to reduce production costs significantly','It transformed the industry and made many silent film stars obsolete','It ended Hollywood''s dominance and shifted production to Europe',
 'C','The passage states the introduction of sound "transformed the industry overnight, rendering silent film stars obsolete."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000012',true),

(3,'reading','It can be inferred from the passage that the Supreme Court ruling mentioned in paragraph 5',
 'regulated the content of films to protect public morality','forced studios to separate their production and theater ownership, reducing their market power','required studios to hire a minimum percentage of independent directors','prohibited studios from signing actors to exclusive long-term contracts',
 'A','The passage states the Supreme Court "forced studios to divest their theater chains," meaning studios had to give up theater ownership. This reduced their control over distribution and exhibition.',3,ARRAY['inference'],'01000001-0000-0000-0000-000000000012',true),

(3,'reading','According to the passage, what two challenges did the studio system face after World War Two?',
 'Competition from radio broadcasting and rising production costs','Required divestiture of theater chains and competition from television','Government censorship and competition from European cinema','Declining star popularity and the rising cost of color films',
 'B','The passage explicitly mentions "the Supreme Court forced studios to divest their theater chains, and television began competing for the leisure time."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000012',true),

(3,'reading','The passage implies that Hollywood''s Golden Age was characterized by',
 'experimental films that challenged conventional narrative','the refinement of genre films, the star system, and standard narrative conventions','intense competition between Hollywood and European film studios','rapid technological changes that made earlier film techniques obsolete',
 'B','The passage states the Golden Age was "characterized by the refinement of genre filmmaking, the star system, and the narrative conventions that still define mainstream cinema."',1,ARRAY['detail','implication'],'01000001-0000-0000-0000-000000000012',true),

(3,'reading','According to the passage, what was ARPANET? (Wait — this is wrong passage. Correct question:) What does the passage say about Technicolor?',
 'It was invented by Walt Disney for animated productions','It became the preferred studio system for prestige productions in the 1930s','It was the first fully digital color process used in cinema','It replaced black-and-white film completely by 1935',
 'B','The passage states: "Technicolor becoming the preferred studio system for prestige productions."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000012',true),

-- PASSAGE 13: Modernist Poetry (8 questions)
(3,'reading','What is the main idea of the passage?',
 'T.S. Eliot is the greatest poet of the twentieth century','American modernist poets rebelled against Victorian conventions and developed a new poetics centered on image and precision','William Carlos Williams was more important than Ezra Pound to American poetry','Modernist poetry was too difficult for ordinary readers to understand',
 'B','The passage describes modernist poets'' rejection of Victorian conventions and their development of new approaches centered on image, precision, and formal experimentation.',2,ARRAY['main_idea'],'01000001-0000-0000-0000-000000000013',true),

(3,'reading','The phrase "Make it New" associated with Ezra Pound means',
 'Poets should invent entirely new languages for their poems','Poetry must reject all historical and cultural references','Poetry should break from old conventions and create something genuinely original','Poems should be rewritten for each new generation of readers',
 'C','Pound''s slogan captures the modernist spirit of rejecting old conventions and creating something original and contemporary.',2,ARRAY['vocabulary_in_context','inference'],'01000001-0000-0000-0000-000000000013',true),

(3,'reading','According to the passage, Imagism insisted on',
 'narrative poems describing historical events','clear, hard language and rejection of unnecessary ornamentation','poems that incorporated musical elements and rhythmic complexity','extensive use of myth and classical literary allusion',
 'B','The passage states Imagism "insisted on clear, hard language and the rejection of unnecessary ornamentation."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000013',true),

(3,'reading','The passage implies that "The Waste Land" demands active interpretation because',
 'it is written in multiple languages that readers must translate','its non-linear structure and dense allusions do not explain themselves','it was written in a dialect unfamiliar to most readers','Eliot deliberately removed all punctuation to confuse readers',
 'B','The passage states: "The poem demands active interpretation from readers; it does not explain itself" due to its "fragmented structure, multiple voices, and dense network of allusions."',2,ARRAY['inference'],'01000001-0000-0000-0000-000000000013',true),

(3,'reading','How does the passage characterize Williams''s approach compared to Eliot''s?',
 'Williams focused on nature poetry while Eliot focused on urban themes','Williams preferred longer epic poems while Eliot wrote short lyrics','Williams used the American vernacular and everyday objects while Eliot relied on European literary tradition','Williams wrote in strict traditional forms while Eliot experimented with free verse',
 'C','The passage contrasts Williams''s "everyday objects and working-class American life" with Eliot''s drawing upon "European literary reference."',2,ARRAY['comparison','detail'],'01000001-0000-0000-0000-000000000013',true),

(3,'reading','The word "vernacular" in paragraph 4 most nearly means',
 'formal and elevated','the everyday language of ordinary people in a region','poetic language using classical references','written rather than spoken language',
 'B','"Vernacular" refers to the everyday, ordinary language spoken by people in a particular place, as opposed to formal or classical language.',2,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000013',true),

(3,'reading','According to the passage, what was the Imagist movement''s lasting influence?',
 'It established improvisation as a central technique in modern poetry','Though short-lived, its influence on subsequent poetry was lasting','It inspired the development of the New York School of poetry','It directly led to the composition of "The Waste Land"',
 'B','The passage states: "Though the movement was short-lived, its influence was lasting."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000013',true),

(3,'reading','It can be inferred that the "tension" mentioned in the final paragraph refers to',
 'conflict between American and European poets over poetic copyright','an ongoing debate about whether poetry should be scholarly or accessible','differing poetic philosophies of cultural allusion versus direct vernacular expression','the rivalry between Pound and Williams for dominance in American poetry',
 'C','The passage describes the tension between "Eliot''s allusive, culturally dense approach and Williams''s direct, vernacular poetics" as "a defining tension in American verse today."',3,ARRAY['inference','implication'],'01000001-0000-0000-0000-000000000013',true),

-- PASSAGE 14: Internet (8 questions)
(3,'reading','What is the main focus of the passage?',
 'The technical history of ARPANET and its development into the Internet','How the Internet and social media have transformed communication and society','The dangers of social media to democracy and public discourse','The economic benefits that the Internet has created for global businesses',
 'B','The passage covers the Internet''s origins, the Web, social media''s transformation of participation, and both positive and negative social consequences.',1,ARRAY['main_idea'],'01000001-0000-0000-0000-000000000014',true),

(3,'reading','According to the passage, what was Tim Berners-Lee''s contribution?',
 'He invented ARPANET as a government communication network','He founded the first major social media platform','He invented the World Wide Web, making the Internet accessible through hyperlinked documents','He developed the first commercial Internet browser',
 'C','The passage states: "The World Wide Web, invented by Tim Berners-Lee in 1989, made the Internet accessible to non-technical users by creating a system of hyperlinked documents."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000014',true),

(3,'reading','The word "laterally" in paragraph 3 is closest in meaning to',
 'from top to bottom','in a traditional manner','horizontally through peer networks rather than from a central source','slowly and gradually',
 'C','"Laterally" means sideways—in this context, information spreads through peer social connections rather than broadcasting from central (vertical) media sources.',2,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000014',true),

(3,'reading','According to the passage, how did social media change Internet participation?',
 'It moved Internet use from desktop computers to mobile devices','It transformed users from passive consumers into active content producers','It made the Internet available to people in developing countries for the first time','It created more secure systems for financial transactions online',
 'B','The passage states social media "transformed users into content producers" as opposed to the earlier passive use of "reading, searching, shopping."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000014',true),

(3,'reading','Which of the following is NOT mentioned as a benefit of the Internet in the passage?',
 'Political movements can organize across geographic boundaries','Small businesses can reach global markets','Cultural products can find audiences anywhere in the world','Individuals can verify the accuracy of news more easily',
 'D','The passage mentions political organizing, global business, and cultural reach as benefits, but never mentions easier news verification. In fact, it mentions misinformation as a problem.',2,ARRAY['not_except','detail'],'01000001-0000-0000-0000-000000000014',true),

(3,'reading','It can be inferred from the passage that the author views the Internet as',
 'fundamentally beneficial despite some manageable problems','inherently neutral—neither good nor bad in itself','a technology with significant benefits that also carries serious risks','primarily a commercial tool whose social effects are secondary',
 'C','The passage presents both benefits and "serious concerns about privacy and the concentration of economic power," and states the technology "is not neutral."',2,ARRAY['inference','author_attitude'],'01000001-0000-0000-0000-000000000014',true),

(3,'reading','What does the passage say about the Internet''s design and ownership?',
 'Open-source design makes the Internet immune to corporate control','Its design choices and ownership structures shape how it affects society','Government regulation of the Internet is ineffective','The original ARPANET design was better for public communication than the modern Internet',
 'B','The passage concludes: "its design choices, ownership structures, and regulatory environments shape how it affects human interaction and social organization."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000014',true),

(3,'reading','The passage suggests that the early Internet was primarily characterized by',
 'user-generated content and social interaction','passive activities such as reading, searching, and shopping','online commerce and financial transactions','government and academic research sharing',
 'B','The passage distinguishes early Internet use as "primarily passive—reading, searching, shopping" from later social media interaction.',1,ARRAY['detail','comparison'],'01000001-0000-0000-0000-000000000014',true),

-- PASSAGE 15: Renewable Energy (8 questions)
(3,'reading','The passage is mainly about',
 'Why fossil fuels will never be completely replaced by renewable energy','Key renewable energy technologies and the challenges of integrating them into power grids','Why solar energy is more promising than wind energy','The history of government energy subsidies and their effects',
 'B','The passage covers solar, wind, intermittency, storage solutions, and grid modernization as a comprehensive overview of renewable energy transition challenges.',1,ARRAY['main_idea'],'01000001-0000-0000-0000-000000000015',true),

(3,'reading','According to the passage, by how much have solar panel costs fallen since 1980?',
 'Approximately fifty percent','More than seventy-five percent','More than ninety percent','Nearly one hundred percent',
 'C','The passage states: "The cost of solar panels has fallen by more than ninety percent since 1980."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000015',true),

(3,'reading','The word "intermittency" as used in the passage means',
 'The inability of solar panels to generate power in hot weather','Power generation that occurs only at certain times rather than continuously','Power that is too expensive for commercial use','The tendency of wind turbines to require frequent maintenance',
 'B','"Intermittency" means not continuous—solar only generates when the sun shines, wind only when wind blows. Both are "intermittent" rather than constant power sources.',2,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000015',true),

(3,'reading','According to the passage, what is the primary limitation of both solar and wind power?',
 'They produce electricity that is incompatible with existing grid infrastructure','Their output is intermittent, varying with weather conditions','They require rare minerals that are expensive to extract','Their energy conversion efficiency is too low to be economically competitive',
 'B','The passage explicitly states both solar ("only generate electricity when the sun is shining") and wind ("output varies with weather conditions") are intermittent.',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000015',true),

(3,'reading','Why has the intermittency challenge driven research into energy storage?',
 'Because storage would eliminate the need for transmission infrastructure','Because stored energy could be used when renewable generation is unavailable','Because batteries can make solar and wind generation more efficient','Because energy storage would reduce the cost of renewable energy equipment',
 'B','If energy storage can hold power generated during sunny or windy periods for use when generation drops, it would address intermittency. The passage says intermittency "has driven intensive research into energy storage."',2,ARRAY['inference'],'01000001-0000-0000-0000-000000000015',true),

(3,'reading','According to the passage, which of the following is an energy storage technology currently under development?',
 'Nuclear microreactors connected to battery systems','Gravitational energy storage using massive weight systems','Hydrogen produced by electrolysis using renewable electricity','Geothermal heat storage in underground formations',
 'C','The passage lists "hydrogen produced by electrolysis using renewable electricity" as a storage technology under development.',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000015',true),

(3,'reading','What does the passage say about grid modernization?',
 'It is less important than energy storage to the renewable energy transition','It refers to upgrading transmission systems to handle variable, dispersed renewable generation','It primarily involves replacing old power plants with newer fossil fuel facilities','It has already been completed in most developed countries',
 'B','The passage states grid modernization means "upgrading electrical transmission systems to handle dispersed, variable renewable generation."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000015',true),

(3,'reading','The passage implies that the main reason renewable energy adoption has accelerated recently is',
 'Government mandates requiring utilities to use only renewable sources','Falling equipment costs combined with improved technology and climate urgency','The depletion of accessible fossil fuel reserves','Public pressure campaigns by environmental activists',
 'B','The passage states: "the combination of falling equipment costs, improving technology, and the urgent need to reduce greenhouse gas emissions has accelerated their adoption dramatically."',2,ARRAY['inference'],'01000001-0000-0000-0000-000000000015',true),

-- PASSAGE 16: Supply Chains (8 questions)
(3,'reading','What is the passage primarily about?',
 'Why manufacturing companies moved production to developing countries','The development, benefits, vulnerabilities, and future of global supply chains','How containerization revolutionized international shipping','The impact of COVID-19 on international trade relationships',
 'B','The passage covers supply chain development, benefits, vulnerabilities exposed by COVID-19, and strategic responses—a comprehensive overview.',1,ARRAY['main_idea'],'01000001-0000-0000-0000-000000000016',true),

(3,'reading','According to the passage, which factors allowed modern global supply chains to develop?',
 'Advanced artificial intelligence for logistics coordination','Automation of manufacturing across all global regions','Trade liberalization, containerization, and communications technology','International agreements on labor and environmental standards',
 'C','The passage states: "trade liberalization reduced tariffs, containerization revolutionized shipping, and communications technology made coordination across distances practical."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000016',true),

(3,'reading','The word "lean" in paragraph 4 most nearly means',
 'geographically dispersed','streamlined with minimal excess inventory or redundancy','financially unprofitable','dependent on a small number of suppliers',
 'B','"Lean" supply chains are designed for efficiency with minimal waste and inventory buffer—the opposite of resilient systems with safety stock.',2,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000016',true),

(3,'reading','According to the passage, what did the COVID-19 pandemic reveal about global supply chains?',
 'That supply chains had become too dependent on a single technology provider','That they contained serious vulnerabilities when disrupted simultaneously','That most companies had adequate safety stock to handle the disruptions','That nearshoring was already widespread before the pandemic',
 'B','The passage states the pandemic exposed "serious vulnerabilities" as "supply chains for essential goods...broke down dramatically."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000016',true),

(3,'reading','The term "nearshoring" as used in the passage means',
 'Moving all production back to domestic facilities','Relocating production to geographically closer countries','Moving manufacturing from land-based to port-adjacent facilities','Hiring workers from nearby countries for domestic factories',
 'B','The passage defines nearshoring as "relocating production to countries geographically closer to their primary markets."',1,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000016',true),

(3,'reading','According to the passage, companies are investing in supply chain visibility systems in order to',
 'Reduce the need for human workers in logistics roles','Get real-time information about inventory and production throughout the chain','Prevent competitors from learning about their supply chain structures','Comply with new international trade regulations',
 'B','The passage states: "Companies are investing in supply chain visibility systems that provide real-time information about inventory and production status throughout the chain."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000016',true),

(3,'reading','It can be inferred from the passage that the main trade-off in supply chain design is between',
 'quality and cost','speed and reliability','efficiency and resilience','domestic and foreign production',
 'C','The passage states: "The tension between efficiency and resilience is likely to define supply chain strategy for the coming decade."',2,ARRAY['inference'],'01000001-0000-0000-0000-000000000016',true),

(3,'reading','The passage implies that consumers in wealthy countries have benefited from global supply chains primarily through',
 'Higher wages from manufacturing jobs that supply chains created','Access to a wide range of goods at prices domestic production could not match','Greater economic equality between wealthy and developing nations','Improved safety standards for manufactured products',
 'B','The passage states: "Consumers in wealthy countries benefit from access to a vast range of goods at prices that domestic production alone could not achieve."',1,ARRAY['inference','detail'],'01000001-0000-0000-0000-000000000016',true),

-- PASSAGE 17: Behavioral Economics (8 questions)
(3,'reading','What assumption does the passage say traditional economic theory makes about decision-making?',
 'People make decisions based primarily on emotional responses','People gather information, assess costs and benefits, and rationally maximize utility','People are influenced primarily by social norms when making choices','People make consistent decisions regardless of how choices are presented',
 'B','The passage states: "Traditional economic theory assumes that individuals make decisions rationally—gathering available information, assessing costs and benefits, and choosing the option that maximizes their utility."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000017',true),

(3,'reading','According to prospect theory described in the passage, losses feel approximately',
 'Equally as significant as equivalent gains','Twice as painful as equivalent gains feel pleasurable','Three times more significant than equivalent gains','Only marginally more significant than equivalent gains',
 'B','The passage states: "losses feel approximately twice as painful as equivalent gains feel pleasurable."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000017',true),

(3,'reading','The word "asymmetrically" in paragraph 2 means',
 'Accurately and rationally','In a balanced and proportional way','In an unequal or disproportionate way','Slowly and with considerable uncertainty',
 'C','"Asymmetrically" means unevenly—losses and gains of equal size do not feel equally significant, so they are evaluated in an unbalanced, disproportionate way.',2,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000017',true),

(3,'reading','According to the passage, retailers exploit anchoring by',
 'Placing expensive items near the entrance of stores','Offering free samples to increase the perceived value of products','Displaying inflated original prices beside sale prices','Using bright colors to make products appear more appealing',
 'C','The passage states: "Retailers exploit anchoring by displaying inflated ''original prices'' beside sale prices, making discounts appear more substantial than they actually are."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000017',true),

(3,'reading','The experiment with employee retirement savings plans demonstrated that',
 'Financial incentives are the most effective way to encourage saving','Making the beneficial option the default dramatically increases its adoption','Workers are generally reluctant to save for retirement regardless of plan design','Opt-in plans generate higher savings rates than opt-out plans',
 'B','The passage states savings rates "increased significantly when employers changed their retirement plan from an opt-in to an opt-out design—a change with no financial incentives whatsoever."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000017',true),

(3,'reading','It can be inferred that loss aversion leads people to make choices that',
 'Maximize their expected gains in the long run','Prefer certain smaller gains over uncertain larger ones even when the math favors the latter','Seek out the highest risk options with the highest potential rewards','Ignore sunk costs and focus only on future costs and benefits',
 'B','Since "losses feel approximately twice as painful as equivalent gains," people will be risk-averse—preferring safe certain outcomes over gambles even when expected value favors the gamble.',3,ARRAY['inference'],'01000001-0000-0000-0000-000000000017',true),

(3,'reading','The term "choice architecture" refers to',
 'The physical design of stores and offices to influence purchasing','The way options are presented to decision-makers, which influences outcomes','The process of designing retirement savings plans for employees','The cognitive framework individuals use to evaluate their choices',
 'B','The passage defines choice architecture as "the way options are presented to decision-makers."',1,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000017',true),

(3,'reading','What is the "central insight" of behavioral economics mentioned in the final paragraph?',
 'People are fundamentally irrational and cannot make good decisions without guidance','Loss aversion is the most powerful force in human decision-making','Small changes in how choices are presented can produce large changes in behavior','Cultural factors override cognitive biases in most real-world decisions',
 'C','The passage states: "Its central insight—that small changes in how choices are presented can produce large changes in behavior."',1,ARRAY['detail','main_idea'],'01000001-0000-0000-0000-000000000017',true),

-- PASSAGE 18: Language Acquisition (8 questions)
(3,'reading','What is the main debate discussed in the passage?',
 'Whether language is best learned through formal instruction or informal exposure','Whether children learn language faster through bilingual education','Whether innate biological mechanisms or general cognitive learning explain language acquisition','Whether language acquisition ends permanently at puberty',
 'C','The passage presents the nativist view (innate language faculty) against the empiricist view (general cognitive mechanisms), framing this as the central debate.',1,ARRAY['main_idea'],'01000001-0000-0000-0000-000000000018',true),

(3,'reading','According to the passage, Chomsky''s nativist hypothesis proposes that',
 'Children learn language through imitation of adult speech patterns','Language ability develops gradually through interaction with caregivers','Humans are born with an innate language faculty containing universal grammatical principles','General pattern recognition is sufficient to explain all aspects of language acquisition',
 'C','The passage states Chomsky proposed "humans are born with an innate language faculty—a ''language acquisition device'' that contains universal principles of grammatical structure."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000018',true),

(3,'reading','The word "positing" in paragraph 3 is closest in meaning to',
 'denying or rejecting','proposing or assuming as a given','proving through experiment','measuring or quantifying',
 'B','"Posit" means to put forward or assume as a fact or starting point in an argument.',2,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000018',true),

(3,'reading','According to the passage, what do opponents of Chomsky''s view argue?',
 'Children are born with complete grammatical knowledge that only needs activation','Language acquisition requires formal instruction to succeed','General cognitive mechanisms like pattern recognition and social interaction explain language learning','Different languages are too diverse to share universal grammatical structures',
 'C','The passage states opposing theorists argue "general cognitive mechanisms—pattern recognition, statistical learning, and social interaction—are sufficient to explain language acquisition."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000018',true),

(3,'reading','What do the experiments with eight-month-old infants demonstrate according to the passage?',
 'That infants recognize their mothers'' voices before other voices','That powerful domain-general learning mechanisms are active from early development','That innate grammar is fully formed before birth','That social interaction is the most important factor in early language learning',
 'B','The passage states infants can "detect statistical regularities in sound sequences, suggesting that powerful domain-general learning mechanisms are at work from the earliest stages of development."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000018',true),

(3,'reading','The critical period research described in the passage suggests that',
 'The best time to learn a second language is after puberty','Language acquisition is most efficient and biologically supported before puberty','Deaf children cannot acquire full linguistic competence under any circumstances','Children who miss the critical period can fully recover with intensive instruction',
 'B','The passage states "language acquisition is most efficient during a window that closes around puberty."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000018',true),

(3,'reading','It can be inferred from the passage that the universality of language acquisition across cultures supports',
 'The empiricist view that the environment provides all necessary information','The nativist view that there is a biological basis for language','The conclusion that all languages have identical grammatical structures','The idea that formal instruction is sufficient for all children',
 'B','The fact that "virtually all children master the complex grammatical system" regardless of culture implies a biological basis—consistent with the nativist view.',3,ARRAY['inference'],'01000001-0000-0000-0000-000000000018',true),

(3,'reading','How does the passage characterize the debate between nativist and empiricist views?',
 'Resolved in favor of the nativist view by critical period research','Fully settled by recent neuroscientific evidence','Ongoing, with both sides contributing valuable insights','No longer relevant given modern advances in linguistics',
 'C','The passage concludes: "The debate...remains unresolved, but both sides have contributed valuable insights."',1,ARRAY['detail','conclusion'],'01000001-0000-0000-0000-000000000018',true),

-- PASSAGE 19: Creativity (8 questions)
(3,'reading','The main purpose of the passage is to',
 'Prove that creativity is genetically inherited and cannot be taught','Describe psychological research that has developed more systematic accounts of creative processes','Argue that divergent thinking is more important than convergent thinking','Compare creative thinking in scientists and artists',
 'B','The passage states psychological research "has developed more systematic accounts of the processes underlying creative thought" — this is the central purpose.',1,ARRAY['main_idea','author_purpose'],'01000001-0000-0000-0000-000000000019',true),

(3,'reading','According to Wallas''s model, what occurs during the "incubation" stage?',
 'The thinker actively gathers information related to the problem','A period of apparent inactivity during which unconscious processing continues','The sudden arrival of a new insight or solution','Conscious evaluation and refinement of an idea',
 'B','The passage states: "Incubation refers to a period of apparent inactivity during which unconscious processing continues."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000019',true),

(3,'reading','According to the passage, psychological research has challenged the view that creativity is',
 'Connected to intelligence and academic achievement','A unitary trait that individuals either strongly possess or weakly possess','Related to specific patterns of brain activity','Influenced by motivational factors',
 'B','The passage states: "Research on creativity has challenged the popular notion that creativity is a unitary trait that individuals either possess strongly or weakly."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000019',true),

(3,'reading','The word "convergent" in paragraph 4 most nearly means',
 'Generating many diverse possible answers','Coming together toward a single best answer','Building connections between unrelated ideas','Rapidly producing creative work',
 'B','"Convergent thinking" is the opposite of divergent thinking—it focuses on finding the single best or correct answer from available information.',2,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000019',true),

(3,'reading','According to the passage, why is divergent thinking alone insufficient for creative achievement?',
 'Divergent thinking is only measured in laboratory settings and does not transfer to real problems','Without convergent thinking, there is no ability to evaluate and select the best ideas','Most domains require memorization rather than creative generation','Highly divergent thinkers tend to lose focus and not complete projects',
 'B','The passage states: "divergent thinking alone is insufficient for creative achievement; convergent thinking, the ability to evaluate and select among possibilities, is equally important."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000019',true),

(3,'reading','It can be inferred from the passage that Nobel laureate scientists and prize-winning artists share',
 'Similar educational backgrounds and academic training','The ability to generate and critically evaluate and develop their ideas','Higher than average divergent thinking scores on standardized tests','An unusual reliance on unconscious processing during incubation',
 'B','The passage states they "share not only imagination but the disciplined ability to evaluate and develop their ideas"—combining generation with critical evaluation.',2,ARRAY['inference'],'01000001-0000-0000-0000-000000000019',true),

(3,'reading','What does neuroscience research reveal about creative thinking according to the passage?',
 'Creative thinking occurs in the same brain regions as logical reasoning','The default mode network, typically associated with daydreaming, is active during creative thought','Creative thinking requires suppressing the analytical regions of the brain','Brain activity during creative work is identical to that during sleep',
 'B','The passage states research "identified networks of brain regions, including the default mode network typically associated with daydreaming, that activate during creative thought."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000019',true),

(3,'reading','Before psychological research, to what was creative achievement often attributed?',
 'Exceptional early childhood education and mentorship','Deliberate practice and domain-specific knowledge','Divine inspiration or mysterious individual genius','High scores on general intelligence measures',
 'C','The passage states: "For much of history, creative achievement was attributed to divine inspiration or mysterious individual genius."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000019',true),

-- PASSAGE 20: Public Health (8 questions)
(3,'reading','What is the main idea of the passage?',
 'The germ theory of disease is the most important development in medical history','Modern public health emerged in the nineteenth century and evolved from sanitation to a broad science addressing multiple health determinants','Edwin Chadwick was the founder of modern epidemiology','Infectious diseases are no longer a significant public health concern',
 'B','The passage traces public health from nineteenth century sanitation reforms through germ theory to the modern broadened focus on chronic disease and social determinants.',2,ARRAY['main_idea'],'01000001-0000-0000-0000-000000000020',true),

(3,'reading','According to the passage, what was significant about Chadwick''s 1842 report?',
 'It identified the specific bacteria that caused the major epidemic diseases','It documented the link between unsanitary conditions and disease mortality','It established the first national system of public vaccination','It proved that poverty itself, rather than sanitation, caused disease',
 'B','The passage states Chadwick''s report "documented the relationship between poverty, unsanitary living conditions, and disease mortality."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000020',true),

(3,'reading','The word "intervention" in paragraph 2 is closest in meaning to',
 'Medical treatment for individual patients','Deliberate action taken to change a situation or prevent a problem','Scientific experiment designed to test a hypothesis','Government regulation of private medical practice',
 'B','"Intervention" in public health means a deliberate action (like building clean water systems) taken to prevent disease or improve health outcomes.',1,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000020',true),

(3,'reading','John Snow''s investigation of the 1854 cholera epidemic is significant because',
 'It used laboratory methods to identify the cholera bacterium for the first time','It demonstrated that disease could be traced through systematic observation and mapping','It proved that cholera was spread through the air rather than water','It led directly to the development of the first cholera vaccine',
 'B','The passage states Snow''s work is "often cited as the founding moment of epidemiology" because he used systematic observation and mapping rather than laboratory science.',2,ARRAY['detail','significance'],'01000001-0000-0000-0000-000000000020',true),

(3,'reading','The passage implies Chadwick''s sanitation reforms reduced mortality even though',
 'The reforms were resisted by the government and only partially implemented','Scientists of the time already knew about the germ theory of disease','The mechanisms of how clean water prevented disease were not yet understood','The reforms only applied to wealthy neighborhoods in major cities',
 'C','The passage states improvements "reduced mortality substantially even before anyone understood why they worked"—before germ theory was established.',2,ARRAY['inference'],'01000001-0000-0000-0000-000000000020',true),

(3,'reading','According to the passage, what did Koch and Pasteur demonstrate?',
 'That epidemic disease was primarily caused by poverty rather than microorganisms','That vaccines could prevent all major infectious diseases','That specific microorganisms cause specific diseases, providing a scientific foundation for interventions','That John Snow''s cholera findings were incorrect',
 'C','The passage states: "Robert Koch and Louis Pasteur demonstrated that specific microorganisms cause specific diseases, providing a scientific foundation for interventions including vaccines."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000020',true),

(3,'reading','According to the passage, how did public health change in the twentieth century?',
 'It returned to focusing exclusively on controlling infectious disease outbreaks','It expanded to address chronic conditions, mental health, and social determinants of health','It became increasingly dependent on individual medical treatment rather than population-level intervention','It shifted from government responsibility to private sector management',
 'B','The passage states: "The twentieth century saw public health expand beyond infectious disease to address chronic conditions, mental health, and the social determinants of health."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000020',true),

(3,'reading','Which of the following best describes the organization of the passage?',
 'A comparison of different national approaches to public health','A chronological account of the development of public health from early sanitation to modern practice','A series of case studies illustrating different public health failures','An argument for increased government spending on public health programs',
 'B','The passage proceeds chronologically: 19th century sanitation → Snow''s epidemiology → germ theory → 20th century expansion—a clear historical development.',1,ARRAY['organization'],'01000001-0000-0000-0000-000000000020',true)
ON CONFLICT DO NOTHING;
