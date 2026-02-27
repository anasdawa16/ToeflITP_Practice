-- ============================================================
-- 003_seed_s3_passages_a.sql
-- Section 3: Reading Comprehension — Passages 1-10
-- 10 passages × 8 questions = 80 questions
-- Passage length: 200-350 words (ETS standard)
-- Topics: Natural Science (5) + American History (3) + Social Science (2)
-- ============================================================

-- Insert passages with fixed UUIDs so questions can reference them
INSERT INTO passages (id, title, content, topic, word_count, difficulty, is_active) VALUES

('01000001-0000-0000-0000-000000000001',
 'The Formation of Coral Reefs',
 'Coral reefs are among the most biologically diverse ecosystems on Earth, yet they are built by remarkably simple organisms. Coral polyps—tiny marine animals related to jellyfish and sea anemones—secrete calcium carbonate skeletons that accumulate over thousands of years to form the massive reef structures we see today.

The relationship between coral polyps and photosynthetic algae called zooxanthellae is central to reef formation. These microscopic algae live within the tissues of coral polyps and provide up to ninety percent of the coral''s energy needs through photosynthesis. In return, the polyps offer the algae a protected environment and access to carbon dioxide for photosynthesis. This mutualistic relationship requires warm, clear, shallow water where sunlight can penetrate.

When ocean temperatures rise even slightly above normal levels, corals expel their zooxanthellae in a stress response known as coral bleaching. Without the algae, corals lose both their color and their primary energy source. Though corals can survive brief bleaching events, prolonged stress leads to starvation and death.

Reef ecosystems support an estimated twenty-five percent of all marine species despite covering less than one percent of the ocean floor. Beyond their ecological significance, reefs protect coastlines from wave erosion, support fishing industries that feed millions of people, and generate billions of dollars annually through tourism and recreation.

Scientists studying coral ecology have developed techniques to grow heat-resistant coral in nurseries and transplant them onto damaged reefs. While these efforts show promise, researchers emphasize that reducing greenhouse gas emissions remains the most critical factor in preserving reef ecosystems for future generations.',
 'science', 290, 3, true),

('01000001-0000-0000-0000-000000000002',
 'The Behavior of Migratory Birds',
 'Every year, billions of birds undertake extraordinary journeys across continents and oceans, navigating with remarkable precision to reach breeding and wintering grounds thousands of miles apart. The mechanisms underlying avian migration have fascinated scientists for centuries, and research has revealed a surprisingly complex array of navigational tools that birds employ.

Birds possess an internal magnetic compass that allows them to detect the Earth''s magnetic field. Specialized proteins called cryptochromes, found in the eyes of migrating birds, appear to be sensitive to magnetic fields and may generate visual signals that help birds maintain directional orientation. This magnetic sense appears to work in conjunction with other navigational cues rather than operating independently.

In addition to magnetic sensing, many species navigate using the position of the sun during the day and stars at night. Experiments in which birds were placed in planetariums with artificially shifted star patterns showed that the birds reoriented themselves according to the new stellar display, confirming that they use celestial navigation. Young birds appear to learn star patterns during their first summer before their first migration.

Landscape features and olfactory cues also play navigational roles. Some species, particularly those like salmon-like eels and certain seabirds, appear to use smell to locate familiar territories. Experienced adult birds develop detailed cognitive maps of their migration routes, incorporating multiple types of information to navigate accurately even under challenging conditions.

Climate change is altering the timing of insect emergence and plant flowering along migration routes, creating mismatches between the arrival of birds and the availability of their food sources. Understanding how birds navigate is therefore increasingly important for predicting how migratory populations will respond to environmental change.',
 'science', 288, 3, true),

('01000001-0000-0000-0000-000000000003',
 'Photosynthesis and the Carbon Cycle',
 'Photosynthesis is the foundation of virtually all life on Earth. Through this process, green plants, algae, and certain bacteria convert light energy into chemical energy stored in glucose, simultaneously consuming carbon dioxide and releasing oxygen as a byproduct. The overall equation—carbon dioxide plus water, in the presence of light, yields glucose and oxygen—conceals extraordinary biochemical complexity.

The process occurs in two main stages. The light-dependent reactions take place in the thylakoid membranes of chloroplasts, where chlorophyll and other pigments absorb solar energy. This energy is used to split water molecules, releasing electrons and generating ATP and NADPH—molecules that carry chemical energy. The Calvin cycle, which takes place in the stroma of the chloroplast, uses this stored energy to convert carbon dioxide into three-carbon sugar molecules that are ultimately used to build glucose.

Photosynthesis plays a critical role in the global carbon cycle. Plants and phytoplankton absorb approximately 120 billion metric tons of carbon dioxide from the atmosphere annually. This sequestration moderates atmospheric carbon dioxide levels and, consequently, global temperatures. Forests have been called the lungs of the Earth, though this metaphor is imprecise: forests both absorb and release carbon dioxide through the photosynthesis of living plants and the decomposition of dead organic matter.

Human activities—particularly fossil fuel combustion and deforestation—have disrupted the carbon cycle by releasing carbon that was stored underground for millions of years and reducing the number of photosynthesizing organisms on land. The net result is a steady increase in atmospheric carbon dioxide concentration that scientists correlate with observed rises in global average temperature. Understanding the limits of photosynthetic carbon absorption is therefore essential for accurate climate modeling.',
 'science', 285, 3, true),

('01000001-0000-0000-0000-000000000004',
 'Deep-Sea Hydrothermal Vents',
 'In 1977, scientists exploring the seafloor near the Galapagos Islands made one of the twentieth century''s most surprising biological discoveries: thriving ecosystems clustered around cracks in the ocean floor from which superheated, mineral-rich water poured. These hydrothermal vents overturned a fundamental assumption of biology—that all life ultimately depends on solar energy.

Hydrothermal vents form where seawater seeps through cracks in the ocean crust, descends into regions of intense geothermal heat, becomes superheated—sometimes exceeding 400 degrees Celsius—and rises back to the seafloor laden with dissolved minerals including hydrogen sulfide. Rather than being inhospitable, these conditions support rich biological communities.

The key to vent ecosystem productivity is chemosynthesis, a process analogous to photosynthesis but using chemical energy rather than light. Specialized bacteria and archaea oxidize hydrogen sulfide released by the vents, using the energy released by this reaction to fix carbon dioxide into organic molecules. These chemosynthetic microorganisms form the base of the food chain, supporting remarkable communities of giant tube worms—some exceeding two meters in length—clams, shrimp, crabs, and fish.

Vent organisms have evolved extraordinary adaptations to survive extreme conditions. Tube worms lack digestive systems entirely; they harbor chemosynthetic bacteria in a specialized organ called the trophosome and depend on their microbial partners for all nutrition. Many vent species can tolerate temperatures, pressures, and chemical concentrations that would instantly kill surface organisms.

The discovery of vent ecosystems has expanded scientific thinking about the possibilities for life in extreme environments and has intensified speculation about potential life on other worlds, particularly on icy moons like Europa and Enceladus where liquid water may exist beneath frozen surfaces.',
 'science', 298, 4, true),

('01000001-0000-0000-0000-000000000005',
 'The Science of Soil',
 'Soil may appear to be simple dirt, but it is one of the most complex ecosystems on Earth—a living matrix of minerals, organic matter, water, air, and an astonishing diversity of organisms. A single teaspoon of healthy soil contains more bacteria than there are people on Earth, along with fungi, protozoa, nematodes, and countless other forms of life that together drive the nutrient cycles that support all terrestrial ecosystems.

Soil forms through the weathering of rock over thousands to millions of years. Physical and chemical processes break parent rock into smaller mineral particles, while the accumulation of organic matter from dead plants and animals—partially broken down by decomposers—creates humus. This dark, nutrient-rich material gives fertile soil its characteristic color and much of its agricultural value.

Different types of soil have different proportions of sand, silt, and clay particles. Sandy soils drain quickly but retain few nutrients. Clay soils hold water and nutrients effectively but drain poorly and become compacted. Loam—a balanced mixture of all three particle sizes, along with abundant organic matter—is generally considered ideal for agriculture because it balances drainage with nutrient and water retention.

Modern agricultural practices can degrade soil health over time. Intensive tillage disrupts soil structure and kills soil organisms; monoculture depletes specific nutrients; and overuse of synthetic fertilizers can alter soil chemistry. Erosion removes topsoil at rates far exceeding natural formation. Scientists estimate that it takes approximately five hundred years to form one inch of topsoil under natural conditions.

Sustainable agriculture practices—including crop rotation, cover cropping, reduced tillage, and applications of compost—aim to maintain and restore soil health, recognizing that fertile soil is a nonrenewable resource on human timescales.',
 'science', 282, 2, true),

('01000001-0000-0000-0000-000000000006',
 'The Transcontinental Railroad',
 'The completion of the First Transcontinental Railroad in 1869 transformed the United States in ways that its builders could scarcely have imagined. By linking the Atlantic and Pacific coasts with a continuous rail line spanning nearly 1,800 miles, the railroad compressed a months-long wagon journey across the continent into a trip of less than two weeks and opened the West to accelerated settlement, economic development, and incorporation into the national economy.

Construction of the railroad was a monumental engineering and organizational achievement. The Central Pacific built eastward from Sacramento, California, employing thousands of Chinese immigrant laborers who performed dangerous work including drilling tunnels through the Sierra Nevada using only hand tools and black powder. The Union Pacific built westward from Omaha, Nebraska, relying heavily on Irish immigrants and Civil War veterans. The two lines met at Promontory Summit, Utah, on May 10, 1869, where a ceremonial golden spike was driven to mark the completion of the line.

The economic consequences were profound and mixed. The railroad stimulated settlement of the Great Plains, facilitated the growth of cities like Denver and Omaha, and created national markets for agricultural products and manufactured goods. Industries that had previously operated at local or regional scales could now distribute products nationwide. The railroad also accelerated the near-extinction of the American bison, as hunters could now travel quickly to the Great Plains and ship hides east efficiently.

For Native American peoples of the Great Plains, the railroad was catastrophic. It brought an overwhelming influx of settlers onto lands that had sustained indigenous nations for generations, accelerated the destruction of the bison herds that were central to Plains Indian cultures, and facilitated military campaigns that forcibly relocated nations to reservations.',
 'history', 285, 3, true),

('01000001-0000-0000-0000-000000000007',
 'The Industrial Revolution in American Cities',
 'Between roughly 1870 and 1920, the United States underwent a dramatic industrial transformation that fundamentally reshaped American society. The combination of abundant natural resources, a large and growing labor supply, technological innovation, and extensive railroad networks made the United States the world''s leading industrial power by the early twentieth century.

Cities grew with extraordinary speed to accommodate industrial expansion. Chicago, which had barely existed in 1830, became a metropolis of over two million people by 1900, fueled by meatpacking, steel manufacturing, and its position as a railroad hub. Pittsburgh became synonymous with steel production, Newark with leather and chemicals, Detroit with emerging automobile manufacturing. Urban growth was so rapid that housing, sanitation, and public services could rarely keep pace.

The workforce that powered industrial expansion was largely composed of immigrants. Between 1880 and 1920, approximately twenty-three million people immigrated to the United States, primarily from southern and eastern Europe. They settled in industrial cities and took up dangerous, low-wage factory work, creating densely populated ethnic neighborhoods with distinct cultural institutions including churches, newspapers, and mutual aid societies.

Working conditions in factories were frequently brutal. Twelve-hour workdays and six-day workweeks were common; child labor was widespread; workplace safety regulations were minimal or nonexistent. High rates of industrial accidents, occupational diseases, and premature disability were accepted as normal features of industrial life. These conditions generated growing labor activism, producing major strikes and the eventual growth of the labor movement.

Progressive reformers responded to the social consequences of industrialization by advocating for factory safety laws, limits on working hours, restrictions on child labor, and improved urban sanitation. Their efforts laid the groundwork for later social legislation.',
 'history', 287, 2, true),

('01000001-0000-0000-0000-000000000008',
 'The New Deal and Economic Recovery',
 'When Franklin D. Roosevelt took office in March 1933, the United States was in the depths of the Great Depression. Unemployment stood at approximately twenty-five percent, thousands of banks had failed, industrial output had collapsed, and breadlines stretched across major cities. Roosevelt''s administration responded with a series of legislative programs collectively known as the New Deal, which reshaped the relationship between the federal government and the American economy.

The New Deal''s first phase focused on emergency stabilization. The Emergency Banking Act of 1933 temporarily closed banks and allowed only solvent institutions to reopen after federal inspection. The Federal Deposit Insurance Corporation insured bank deposits up to $5,000, restoring public confidence in the banking system. These measures helped halt the wave of bank panics that had destroyed savings and destabilized credit across the economy.

The second phase focused on employment and economic stimulation. Programs such as the Works Progress Administration and the Civilian Conservation Corps provided jobs to millions of unemployed Americans by funding the construction of roads, bridges, public buildings, and other infrastructure. The Agricultural Adjustment Act paid farmers to reduce production in an attempt to raise commodity prices, though its benefits were distributed very unequally and often at the expense of tenant farmers and sharecroppers.

The Social Security Act of 1935 established the foundation of America''s social insurance system, creating old-age pensions and unemployment insurance. The National Labor Relations Act guaranteed workers the right to organize and bargain collectively, dramatically strengthening the labor movement.

Historians debate the extent to which the New Deal actually ended the Depression—unemployment remained high throughout the late 1930s—but most agree that it fundamentally transformed American political economy and the scope of federal responsibility for citizen welfare.',
 'history', 289, 3, true),

('01000001-0000-0000-0000-000000000009',
 'Memory and Cognitive Science',
 'Human memory is not a faithful recording device that stores and retrieves experiences intact, as common intuition might suggest. Rather, memory is a reconstructive process—an active system that encodes, stores, and reassembles information in ways that are subject to distortion, omission, and revision. This understanding, developed through decades of cognitive science research, has profound implications for how we evaluate eyewitness testimony, learn from experience, and understand human identity.

Cognitive psychologists distinguish among several types of memory. Episodic memory holds personally experienced events tied to specific times and places—a first day at school, a vacation trip. Semantic memory contains general knowledge of facts, concepts, and language independent of personal experience. Procedural memory stores skills and habits including riding a bicycle or playing a musical instrument; unlike declarative memories, procedural memories are typically not accessible to conscious introspection.

Working memory, once called short-term memory, is a limited-capacity system that holds information in conscious awareness for active processing. It can typically maintain only four to seven items simultaneously and retains them for only seconds to minutes without rehearsal. Information that receives sufficient attention and processing is transferred for long-term storage, but this conversion process—called consolidation—is not instantaneous, and newly formed memories require hours to days to become fully stable.

Research by Elizabeth Loftus and others demonstrated that human memory is highly susceptible to post-event suggestion. In experiments, subjects who were asked leading questions about witnessed events frequently incorporated false details into their subsequent recollections, sometimes with high confidence. These findings have raised serious questions about the reliability of eyewitness accounts in legal settings and contributed to reforms in how law enforcement gathers witness testimony.',
 'social_science', 284, 3, true),

('01000001-0000-0000-0000-000000000010',
 'The Sociology of Urban Migration',
 'Throughout history, the movement of people from rural areas to cities has been one of the most powerful forces transforming human societies. This process of urbanization accelerated dramatically during industrialization and continues today: for the first time in human history, more than half of the world''s population now lives in urban areas, and the proportion is expected to reach two-thirds by 2050.

Sociologists identify two types of factors driving rural-to-urban migration. Push factors are conditions that make rural life difficult or unattractive, including agricultural mechanization that reduces the demand for farm labor, land scarcity, environmental degradation, and limited access to education, healthcare, and economic opportunities. Pull factors are conditions that attract migrants to cities, including the availability of employment, higher wages, cultural amenities, and social networks established by earlier migrants.

The experience of migrants in cities varies enormously depending on the economic and social conditions they encounter. In rapidly industrializing economies, migrants may find low-wage but stable factory employment that over time enables social mobility. In cities with slower economic growth, migrants may end up in informal sector occupations—street vending, domestic service, casual construction work—that offer little security or opportunity for advancement.

Social networks play a crucial role in migration processes. Migrants tend to move to places where relatives or people from their home communities have already settled. These networks provide information about employment and housing, offer social support during the difficult transition to urban life, and often preserve cultural practices and community bonds across geographic distance.

Urban sociologists have observed that migration rarely produces the rapid assimilation once assumed by sociologists. Instead, migrants maintain complex identities that blend elements of their home and host cultures, remaining connected to their places of origin through regular visits, financial remittances, and ongoing communication.',
 'social_science', 290, 3, true)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- Section 3 Questions — Passages 1-10 (80 questions)
-- question_text = the question
-- option_a/b/c/d = 4 answer choices
-- correct_answer = letter of correct choice
-- ============================================================

INSERT INTO questions (
  section, part, question_text,
  option_a, option_b, option_c, option_d,
  correct_answer, explanation, difficulty, topic_tags, passage_id, is_active
) VALUES

-- PASSAGE 1: Coral Reefs (8 questions)
(3,'reading',
 'What is the primary purpose of the passage?',
 'To argue that human activity is destroying coral reefs','To describe the biology and ecological significance of coral reefs','To explain why zooxanthellae are essential to marine biodiversity','To compare coral reefs with other marine ecosystems',
 'B','The passage as a whole describes how coral reefs form, the biology of coral polyps, the role of zooxanthellae, reef ecology, and conservation efforts—a broad overview of coral biology and significance.',2,ARRAY['main_idea'],'01000001-0000-0000-0000-000000000001',true),

(3,'reading',
 'According to the passage, zooxanthellae benefit from their relationship with coral polyps by',
 'receiving food in the form of glucose produced by the coral','gaining protection and access to carbon dioxide for photosynthesis','absorbing nutrients from the calcium carbonate skeleton','using the coral''s oxygen supply for cellular respiration',
 'B','The passage states that coral polyps "offer the algae a protected environment and access to carbon dioxide for photosynthesis."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000001',true),

(3,'reading',
 'The word "mutualistic" in paragraph 2 is closest in meaning to',
 'competitive','parasitic','mutually beneficial','dependent',
 'C','A mutualistic relationship is one in which both organisms benefit. The passage describes how both the coral and the algae receive advantages from their relationship.',2,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000001',true),

(3,'reading',
 'What happens to corals during a bleaching event?',
 'They grow new zooxanthellae within their tissues','They expel their zooxanthellae and lose their primary energy source','They absorb more sunlight to compensate for energy loss','They migrate to cooler ocean regions',
 'B','The passage states: "corals expel their zooxanthellae in a stress response known as coral bleaching. Without the algae, corals lose both their color and their primary energy source."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000001',true),

(3,'reading',
 'It can be inferred from the passage that coral reefs are economically important because they',
 'produce calcium carbonate that is mined for industrial use','provide habitats that support commercial fisheries and tourism','generate energy from the photosynthesis of zooxanthellae','supply the oxygen that coastal populations require',
 'B','The passage mentions that reefs "support fishing industries that feed millions of people, and generate billions of dollars annually through tourism and recreation."',2,ARRAY['inference'],'01000001-0000-0000-0000-000000000001',true),

(3,'reading',
 'According to the passage, which of the following is true about coral reef nurseries?',
 'They are the most effective long-term solution to reef degradation','They have been proven to fully restore damaged reef ecosystems','They involve growing heat-resistant coral for transplantation to damaged reefs','They operate without any scientific support',
 'C','The passage states: "Scientists...have developed techniques to grow heat-resistant coral in nurseries and transplant them onto damaged reefs."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000001',true),

(3,'reading',
 'What does the author imply is the most important action for reef preservation?',
 'Developing coral nursery programs on a global scale','Protecting coastlines with artificial barriers','Reducing greenhouse gas emissions','Increasing funding for marine biology research',
 'C','The passage states: "researchers emphasize that reducing greenhouse gas emissions remains the most critical factor in preserving reef ecosystems."',2,ARRAY['inference','implication'],'01000001-0000-0000-0000-000000000001',true),

(3,'reading',
 'Which of the following best describes the organization of the passage?',
 'A problem is described and several potential solutions are evaluated','General information about coral biology leads to discussion of threats and conservation','A chronological account of coral reef discovery is presented','Competing scientific theories about reef formation are compared',
 'B','The passage moves from the biology of coral polyps and their relationship with zooxanthellae, to reef ecology, to threats (bleaching), to ecological/economic importance, to conservation—a logical progression from general biology to conservation concerns.',3,ARRAY['organization','passage_structure'],'01000001-0000-0000-0000-000000000001',true),

-- PASSAGE 2: Migratory Birds (8 questions)
(3,'reading',
 'The main idea of the passage is that',
 'migratory birds use the position of stars as their primary navigational tool','bird migration is threatened by climate change and habitat loss','birds employ multiple complex navigational mechanisms to migrate accurately','the magnetic sense of birds is the most recently discovered navigational ability',
 'C','The passage examines several navigational tools birds use—magnetic compass, celestial navigation, landscape features, olfactory cues—emphasizing that migration involves "a surprisingly complex array of navigational tools."',2,ARRAY['main_idea'],'01000001-0000-0000-0000-000000000002',true),

(3,'reading',
 'According to the passage, cryptochromes are',
 'specialized eye proteins that may detect magnetic fields','the pigments in bird feathers that change with season','a type of migratory bird found in the northern hemisphere','navigational maps stored in the bird''s brain',
 'A','The passage states: "Specialized proteins called cryptochromes, found in the eyes of migrating birds, appear to be sensitive to magnetic fields."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000002',true),

(3,'reading',
 'The planetarium experiments described in the passage demonstrated that',
 'birds cannot navigate without magnetic field cues','birds can learn new migration routes in a single season','birds reorient themselves according to star patterns','young birds instinctively know star patterns before migration',
 'C','The passage states: "birds were placed in planetariums with artificially shifted star patterns showed that the birds reoriented themselves according to the new stellar display."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000002',true),

(3,'reading',
 'The word "conjunction" in paragraph 2 is closest in meaning to',
 'opposition','combination','competition','contrast',
 'B','"In conjunction with" means "together with" or "in combination with." The magnetic sense works in combination with other navigational cues.',1,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000002',true),

(3,'reading',
 'It can be inferred from the passage that experienced adult birds navigate more accurately than young birds because',
 'their magnetic compass becomes stronger with age','they have developed detailed cognitive maps from previous journeys','they are guided by older birds on their first migration','they have larger eyes that can detect more stellar information',
 'B','The passage states that experienced adult birds "develop detailed cognitive maps of their migration routes, incorporating multiple types of information." This implies experience builds accuracy.',3,ARRAY['inference'],'01000001-0000-0000-0000-000000000002',true),

(3,'reading',
 'According to the passage, which navigational method is used primarily at night?',
 'Magnetic compass','Olfactory cues','Stellar (star) navigation','Landscape recognition',
 'C','The passage states: "many species navigate using the position of the sun during the day and stars at night."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000002',true),

(3,'reading',
 'What concern about climate change is mentioned in the passage?',
 'It is reducing the number of suitable nesting sites for migratory birds','It is causing birds to abandon their traditional migration routes entirely','It may create timing mismatches between bird arrival and food availability','It is reducing the strength of the Earth''s magnetic field',
 'C','The passage states: "Climate change is altering the timing of insect emergence and plant flowering along migration routes, creating mismatches between the arrival of birds and the availability of their food sources."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000002',true),

(3,'reading',
 'The author''s tone in this passage can best be described as',
 'enthusiastic and celebratory','objective and informative','skeptical and questioning','urgent and alarming',
 'B','The author presents scientific information about bird navigation in a balanced, informative way without strong emotional coloring or advocacy.',2,ARRAY['tone','author_purpose'],'01000001-0000-0000-0000-000000000002',true),

-- PASSAGE 3: Photosynthesis (8 questions)
(3,'reading',
 'Which of the following best states the main idea of the passage?',
 'The biochemistry of photosynthesis is too complex for non-specialists to understand','Photosynthesis sustains life and plays a critical role in regulating the global carbon cycle','Forests absorb more carbon dioxide than they release, making deforestation the primary climate concern','The light-dependent reactions are more important than the Calvin cycle',
 'B','The passage describes both the biochemistry of photosynthesis and its role in the carbon cycle, concluding with the importance of understanding photosynthetic limits for climate modeling.',2,ARRAY['main_idea'],'01000001-0000-0000-0000-000000000003',true),

(3,'reading',
 'According to the passage, where does the Calvin cycle take place?',
 'In the thylakoid membranes of chloroplasts','In the stroma of the chloroplast','In the mitochondria of plant cells','In the cell wall of photosynthesizing organisms',
 'B','The passage states: "The Calvin cycle, which takes place in the stroma of the chloroplast, uses this stored energy to convert carbon dioxide into three-carbon sugar molecules."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000003',true),

(3,'reading',
 'The word "sequestration" in paragraph 3 is closest in meaning to',
 'release','capture and storage','conversion','measurement',
 'B','In the context of carbon, "sequestration" refers to the process of capturing and storing carbon dioxide, removing it from the atmosphere.',2,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000003',true),

(3,'reading',
 'The author states that calling forests "the lungs of the Earth" is imprecise because',
 'forests produce less oxygen than ocean phytoplankton','forests both absorb and release carbon dioxide','forests do not actually perform photosynthesis in winter','the comparison to lungs ignores the role of soil organisms',
 'B','The passage states: "This metaphor is imprecise: forests both absorb and release carbon dioxide through the photosynthesis of living plants and the decomposition of dead organic matter."',2,ARRAY['detail','author_purpose'],'01000001-0000-0000-0000-000000000003',true),

(3,'reading',
 'It can be inferred from the passage that ATP and NADPH are important because',
 'they are the direct products of the Calvin cycle that are used by plants','they carry chemical energy from the light-dependent reactions to power carbon fixation','they are the primary carbon-containing molecules that give organisms energy','they control the rate at which chlorophyll absorbs light',
 'B','The passage states that the light-dependent reactions generate "ATP and NADPH—molecules that carry chemical energy" and that the Calvin cycle "uses this stored energy" to fix carbon.',3,ARRAY['inference'],'01000001-0000-0000-0000-000000000003',true),

(3,'reading',
 'According to the passage, approximately how much carbon dioxide do plants and phytoplankton absorb annually?',
 'One billion metric tons','Fifty billion metric tons','One hundred twenty billion metric tons','Three hundred billion metric tons',
 'C','The passage states: "Plants and phytoplankton absorb approximately 120 billion metric tons of carbon dioxide from the atmosphere annually."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000003',true),

(3,'reading',
 'Which of the following is NOT mentioned in the passage as a consequence of human activity on the carbon cycle?',
 'Release of carbon stored underground for millions of years','Reduction in the number of photosynthesizing organisms','Increase in atmospheric carbon dioxide concentration','Decline in the efficiency of chlorophyll in absorbing sunlight',
 'D','The passage mentions fossil fuel combustion (releasing stored carbon), deforestation (reducing photosynthesizing organisms), and increased CO2 (mentioned explicitly), but never discusses changes in chlorophyll efficiency.',3,ARRAY['not_except','detail'],'01000001-0000-0000-0000-000000000003',true),

(3,'reading',
 'The passage implies that understanding the limits of photosynthesis is important primarily for',
 'developing new agricultural technologies','creating more accurate climate models','designing more efficient solar energy panels','protecting endangered plant species',
 'B','The passage concludes: "Understanding the limits of photosynthetic carbon absorption is therefore essential for accurate climate modeling."',2,ARRAY['inference','purpose'],'01000001-0000-0000-0000-000000000003',true),

-- PASSAGE 4: Hydrothermal Vents (8 questions)
(3,'reading',
 'What was the main significance of the 1977 discovery described in the passage?',
 'It proved that hydrothermal vents are the most productive ecosystems on Earth','It revealed that ecosystems can thrive without depending ultimately on solar energy','It led to the first classification of giant tube worms as a distinct species','It demonstrated that geothermal heat can be harnessed as a sustainable energy source',
 'B','The passage states the discovery "overturned a fundamental assumption of biology—that all life ultimately depends on solar energy."',2,ARRAY['main_idea','significance'],'01000001-0000-0000-0000-000000000004',true),

(3,'reading',
 'According to the passage, hydrothermal vents form when',
 'underwater volcanoes release lava into the deep ocean','seawater descends through cracks, becomes superheated, and rises laden with minerals','organisms excrete hydrogen sulfide through metabolic processes','geothermal heat causes mineral deposits to dissolve into seawater',
 'B','The passage explains: "seawater seeps through cracks in the ocean crust, descends into regions of intense geothermal heat, becomes superheated...and rises back to the seafloor laden with dissolved minerals."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000004',true),

(3,'reading',
 'The word "analogous" in paragraph 3 is closest in meaning to',
 'opposite','identical','similar in function','more effective',
 'C','"Analogous" means similar in function or structure, though not necessarily identical. Chemosynthesis is analogous to photosynthesis because both produce food, but using different energy sources.',1,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000004',true),

(3,'reading',
 'According to the passage, giant tube worms obtain their nutrition through',
 'filtering organic particles from the superheated water released by vents','consuming the bacteria and archaea that live around the vents','relying on chemosynthetic bacteria housed within a specialized organ','absorbing dissolved sulfur compounds directly through their outer tissues',
 'C','The passage states tube worms "harbor chemosynthetic bacteria in a specialized organ called the trophosome and depend on their microbial partners for all nutrition."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000004',true),

(3,'reading',
 'It can be inferred from the passage that vent organisms are notable primarily because they',
 'are the oldest living organisms yet discovered on Earth','can survive conditions that would be fatal to most other known organisms','have the highest metabolic rates of any marine species','form the largest individual organisms found in the deep ocean',
 'B','The passage describes tube worms, shrimp, and other organisms thriving under extreme heat, pressure, and chemical conditions and states: "Many vent species can tolerate temperatures, pressures, and chemical concentrations that would instantly kill surface organisms."',2,ARRAY['inference'],'01000001-0000-0000-0000-000000000004',true),

(3,'reading',
 'Why does the author mention Europa and Enceladus in the final paragraph?',
 'To provide examples of places where hydrothermal vents have already been observed','To suggest that vent ecosystems are similar to those found on other planets','To illustrate how vent discoveries have expanded thinking about where life might exist','To contrast the conditions on these moons with those found at hydrothermal vents',
 'C','The passage states the vent discovery "has intensified speculation about potential life on other worlds" and mentions these moons as places with liquid water where similar life might exist.',2,ARRAY['author_purpose','reference'],'01000001-0000-0000-0000-000000000004',true),

(3,'reading',
 'Which of the following best describes the process of chemosynthesis as explained in the passage?',
 'Bacteria convert sunlight to chemical energy by oxidizing hydrogen sulfide','Archaea use water as the raw material for producing oxygen and organic molecules','Bacteria oxidize hydrogen sulfide using the released energy to fix carbon dioxide into organic molecules','Microorganisms convert geothermal heat directly into chemical energy stored in glucose',
 'C','The passage states: "Specialized bacteria and archaea oxidize hydrogen sulfide...using the energy released by this reaction to fix carbon dioxide into organic molecules."',3,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000004',true),

(3,'reading',
 'What does the passage suggest about the trophosome?',
 'It is an organ found in all deep-sea organisms that live near vent systems','It is a specialized organ in tube worms that contains chemosynthetic bacteria','It produces hydrogen sulfide that the tube worm uses as an energy source','It is the tube worm''s digestive system that processes vent minerals',
 'B','The passage directly states tube worms "harbor chemosynthetic bacteria in a specialized organ called the trophosome."',1,ARRAY['detail','reference'],'01000001-0000-0000-0000-000000000004',true),

-- PASSAGE 5: Soil Science (8 questions)
(3,'reading',
 'What is the main point the author makes about soil in the passage?',
 'Soil is primarily composed of minerals and should be valued mainly as an agricultural resource','Soil is a complex living ecosystem that supports all terrestrial life and is threatened by poor management','Soil fertility can be easily restored through modern agricultural chemistry','Sandy soil is less valuable than clay soil because it retains fewer nutrients',
 'B','The passage emphasizes soil''s complexity as a living ecosystem and warns about agricultural practices that degrade it, calling fertile soil "a nonrenewable resource."',2,ARRAY['main_idea'],'01000001-0000-0000-0000-000000000005',true),

(3,'reading',
 'According to the passage, humus is best described as',
 'a type of clay that gives fertile soil its agricultural value','the inorganic mineral component of soil formed from weathered rock','dark, nutrient-rich material created from partially decomposed organic matter','a type of bacteria that drives nutrient cycling in soil ecosystems',
 'C','The passage states: "the accumulation of organic matter from dead plants and animals—partially broken down by decomposers—creates humus. This dark, nutrient-rich material gives fertile soil its characteristic color."',1,ARRAY['detail','vocabulary_in_context'],'01000001-0000-0000-0000-000000000005',true),

(3,'reading',
 'Which type of soil does the author describe as ideal for agriculture?',
 'Sandy soil because it drains quickly','Clay soil because it holds nutrients effectively','Loam because it balances drainage with nutrient retention','Humus-poor soil because it is easier to till',
 'C','The passage states: "Loam—a balanced mixture of all three particle sizes, along with abundant organic matter—is generally considered ideal for agriculture because it balances drainage with nutrient and water retention."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000005',true),

(3,'reading',
 'The word "depletes" as used in the passage most nearly means',
 'enriches','challenges','exhausts or uses up','measures',
 'C','"Deplete" means to use up or exhaust a supply. "Monoculture depletes specific nutrients" means it uses up those nutrients without allowing them to replenish.',1,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000005',true),

(3,'reading',
 'According to the passage, approximately how long does it take to naturally form one inch of topsoil?',
 'Fifty years','One hundred years','Two hundred fifty years','Five hundred years',
 'D','The passage states: "it takes approximately five hundred years to form one inch of topsoil under natural conditions."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000005',true),

(3,'reading',
 'It can be inferred from the passage that the author views intensive tillage as harmful because',
 'it makes soil too loose, leading to excessive water absorption','it kills soil organisms and disrupts the soil structure that supports healthy ecosystems','it mixes clay too deeply into the soil, reducing drainage capacity','it prevents the natural formation of humus from organic matter',
 'B','The passage states: "Intensive tillage disrupts soil structure and kills soil organisms." This reflects the author''s view that living soil organisms are essential to soil health.',2,ARRAY['inference'],'01000001-0000-0000-0000-000000000005',true),

(3,'reading',
 'Which of the following is NOT listed as a sustainable agriculture practice in the passage?',
 'Crop rotation','Cover cropping','Increased application of synthetic fertilizers','Reduced tillage',
 'C','The passage lists crop rotation, cover cropping, reduced tillage, and applications of compost as sustainable practices. It describes synthetic fertilizers as potentially harmful.',2,ARRAY['not_except','detail'],'01000001-0000-0000-0000-000000000005',true),

(3,'reading',
 'The author describes fertile soil as "a nonrenewable resource on human timescales" primarily to suggest that',
 'scientists have given up hope of restoring degraded soil','soil formation is effectively permanent once it occurs','soil degradation cannot realistically be reversed within human lifetimes','farmers should mine soil for its mineral resources while it exists',
 'C','By saying "nonrenewable on human timescales," the author implies that if soil is degraded, it cannot recover within a timeframe meaningful to humans (since it takes 500 years to form just one inch).',3,ARRAY['inference','implication'],'01000001-0000-0000-0000-000000000005',true),

-- PASSAGE 6: Transcontinental Railroad (8 questions)
(3,'reading',
 'What is the passage mainly about?',
 'The technical engineering challenges of building the transcontinental railroad','The transformation brought about by the transcontinental railroad and its mixed consequences','The labor conditions faced by Chinese and Irish railroad workers','The role of the railroad in the decline of Native American cultures',
 'B','The passage covers the railroad''s construction, economic effects, and consequences for Native Americans—presenting a balanced view of its transformative but mixed impacts.',2,ARRAY['main_idea'],'01000001-0000-0000-0000-000000000006',true),

(3,'reading',
 'According to the passage, the Central Pacific railroad was built primarily by',
 'Civil War veterans and freed slaves','Irish immigrants moving eastward from California','Chinese immigrant laborers working from Sacramento eastward','Spanish-speaking workers from Mexico and Central America',
 'C','The passage states: "The Central Pacific built eastward from Sacramento, California, employing thousands of Chinese immigrant laborers."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000006',true),

(3,'reading',
 'The word "monumental" in paragraph 2 is closest in meaning to',
 'tragic','gradual','extremely large and impressive','controversial',
 'C','"Monumental" means enormous and impressive in scale or significance. The construction was "a monumental engineering and organizational achievement."',1,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000006',true),

(3,'reading',
 'According to the passage, what happened at Promontory Summit, Utah?',
 'Workers from the two railroad companies first made contact after years of construction','A ceremonial golden spike marked the completion of the transcontinental line','The Union Pacific and Central Pacific signed their construction contract','The first passenger train from the east coast arrived at the Pacific coast terminus',
 'B','The passage states: "The two lines met at Promontory Summit, Utah, on May 10, 1869, where a ceremonial golden spike was driven to mark the completion of the line."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000006',true),

(3,'reading',
 'Which of the following best describes how the railroad affected the American bison?',
 'It led directly to the bison''s extinction by 1890','It enabled hunters to reach the plains quickly and ship hides east, accelerating the bison''s near-extinction','It transported bison herds between grazing regions, expanding their range','It had little direct impact on bison populations, which declined for other reasons',
 'B','The passage states the railroad "accelerated the near-extinction of the American bison, as hunters could now travel quickly to the Great Plains and ship hides east efficiently."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000006',true),

(3,'reading',
 'It can be inferred from the passage that the author views the railroad''s impact as',
 'overwhelmingly positive for all Americans','purely negative due to its effects on Native peoples','significant but producing both benefits and serious harms','less important than other developments of the nineteenth century',
 'B','The passage presents economic benefits but describes the impact on Native Americans as "catastrophic" and notes that benefits from agricultural policy were "distributed very unequally." The overall picture is mixed with serious harms emphasized.',3,ARRAY['inference','tone'],'01000001-0000-0000-0000-000000000006',true),

(3,'reading',
 'According to the passage, which of the following is mentioned as a city that grew because of railroad development?',
 'San Francisco','New York','Denver','Los Angeles',
 'C','The passage states the railroad "facilitated the growth of cities like Denver and Omaha."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000006',true),

(3,'reading',
 'What does the passage say railroad construction allowed industries to do that they could not do before?',
 'Produce goods at much lower cost due to cheaper labor','Distribute products across national markets rather than just locally or regionally','Standardize production processes across multiple factory locations','Hire immigrant workers without them having to relocate permanently',
 'B','The passage states: "Industries that had previously operated at local or regional scales could now distribute products nationwide."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000006',true),

-- PASSAGE 7: Industrial Revolution in Cities (8 questions)
(3,'reading',
 'The passage is primarily concerned with',
 'the political causes of American industrialization between 1870 and 1920','the social and economic consequences of rapid industrialization in American cities','the contributions of specific immigrant groups to American industrial growth','the development of labor unions in response to factory working conditions',
 'B','The passage examines how industrialization transformed American cities—covering urban growth, immigrant labor, working conditions, and reform responses—as a social and economic phenomenon.',2,ARRAY['main_idea'],'01000001-0000-0000-0000-000000000007',true),

(3,'reading',
 'According to the passage, Chicago grew because of its',
 'position as a government administrative center','location near the Great Lakes and therefore access to water','meatpacking industry, steel manufacturing, and railroad hub status','role as a financial center for agricultural commodity trading',
 'C','The passage states Chicago "was fueled by meatpacking, steel manufacturing, and its position as a railroad hub."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000007',true),

(3,'reading',
 'The word "synonymous" in paragraph 2 is closest in meaning to',
 'associated or identified','unrelated','in conflict with','historically prior to',
 'A','"Synonymous with" means closely and typically associated with. "Pittsburgh became synonymous with steel" means Pittsburgh was so associated with steel that the two names became linked.',1,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000007',true),

(3,'reading',
 'According to the passage, approximately how many immigrants came to the United States between 1880 and 1920?',
 'Eight million','Fifteen million','Twenty-three million','Forty million',
 'C','The passage states: "Between 1880 and 1920, approximately twenty-three million people immigrated to the United States."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000007',true),

(3,'reading',
 'The author mentions "twelve-hour workdays and six-day workweeks" to illustrate',
 'the productivity of immigrant workers in American factories','the brutal and demanding conditions of industrial labor','the efficiency of American industrial management','the difference between current and historical labor laws',
 'B','These details are given as examples of the "frequently brutal" working conditions that led to labor activism.',2,ARRAY['detail','author_purpose'],'01000001-0000-0000-0000-000000000007',true),

(3,'reading',
 'It can be inferred from the passage that immigrant workers created ethnic neighborhood institutions such as churches and newspapers in order to',
 'resist demands by factory owners to assimilate into American culture','preserve cultural connections and community bonds in an unfamiliar environment','establish political organizations to advocate for better working conditions','demonstrate to American citizens that immigrants deserved equal rights',
 'B','The passage states immigrants created "ethnic neighborhoods with distinct cultural institutions including churches, newspapers, and mutual aid societies," implying these preserved cultural identity and community.',2,ARRAY['inference'],'01000001-0000-0000-0000-000000000007',true),

(3,'reading',
 'According to the passage, what was the attitude of the period toward industrial accidents?',
 'They were viewed as unacceptable by both workers and management','They were accepted as normal features of industrial life','They were considered primarily the responsibility of workers to prevent','They were rarely discussed in public because of shame',
 'B','The passage states: "High rates of industrial accidents, occupational diseases, and premature disability were accepted as normal features of industrial life."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000007',true),

(3,'reading',
 'Progressive reformers are mentioned in the passage primarily as',
 'the main cause of the labor strikes that disrupted industrial production','a social response that advocated for better working and living conditions','political opponents of the immigrant workers who threatened their jobs','the founders of the major labor unions of the early twentieth century',
 'B','The passage describes Progressive reformers as "advocating for factory safety laws, limits on working hours, restrictions on child labor, and improved urban sanitation"—responding to industrialization''s social costs.',2,ARRAY['detail','author_purpose'],'01000001-0000-0000-0000-000000000007',true),

-- PASSAGE 8: The New Deal (8 questions)
(3,'reading',
 'According to the passage, what was the condition of the United States when Roosevelt took office?',
 'The economy was beginning to recover from a mild financial downturn','The country was experiencing severe unemployment, bank failures, and economic collapse','Industrial output had increased but income inequality had worsened','The country faced an international trade crisis but domestic production was stable',
 'B','The passage states: "Unemployment stood at approximately twenty-five percent, thousands of banks had failed, industrial output had collapsed, and breadlines stretched across major cities."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000008',true),

(3,'reading',
 'What was the primary purpose of the Federal Deposit Insurance Corporation?',
 'To provide loans to banks that were unable to meet their financial obligations','To investigate fraudulent banking practices and prosecute offenders','To insure bank deposits and restore public confidence in the banking system','To convert private banks into government-controlled institutions',
 'C','The passage states: "The Federal Deposit Insurance Corporation insured bank deposits up to $5,000, restoring public confidence in the banking system."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000008',true),

(3,'reading',
 'The word "solvent" in paragraph 2 is closest in meaning to',
 'trustworthy and well-managed','financially stable and able to meet obligations','government-controlled','recently established',
 'B','A "solvent" institution is one that can meet its financial obligations—it has enough assets to cover its liabilities. The Banking Act allowed only financially stable banks to reopen.',2,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000008',true),

(3,'reading',
 'According to the passage, which New Deal program provided jobs through infrastructure construction?',
 'The Agricultural Adjustment Act','The National Labor Relations Act','The Federal Deposit Insurance Corporation','The Works Progress Administration',
 'D','The passage states: "Programs such as the Works Progress Administration and the Civilian Conservation Corps provided jobs to millions of unemployed Americans by funding the construction of roads, bridges, public buildings."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000008',true),

(3,'reading',
 'It can be inferred from the passage that the Agricultural Adjustment Act had negative consequences for',
 'large commercial farming operations that produced export crops','the federal banking system and its deposit insurance programs','tenant farmers and sharecroppers who did not benefit equally','industrial workers who depended on agricultural products',
 'C','The passage states the AAC''s "benefits were distributed very unequally and often at the expense of tenant farmers and sharecroppers."',2,ARRAY['inference'],'01000001-0000-0000-0000-000000000008',true),

(3,'reading',
 'According to the passage, which of the following was established by the Social Security Act of 1935?',
 'The right of workers to form unions and bargain collectively','Old-age pensions and unemployment insurance','Government supervision of bank reopenings after inspection','Work programs that employed millions of unemployed Americans',
 'B','The passage states: "The Social Security Act of 1935 established the foundation of America''s social insurance system, creating old-age pensions and unemployment insurance."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000008',true),

(3,'reading',
 'What is the historians'' debate mentioned in the final paragraph?',
 'Whether Roosevelt had the legal authority to implement the New Deal programs','Whether the New Deal actually ended the Depression or primarily transformed political economy','Whether the Banking Act of 1933 violated constitutional principles','Whether the New Deal benefited wealthy Americans more than working-class Americans',
 'B','The passage states: "Historians debate the extent to which the New Deal actually ended the Depression—unemployment remained high throughout the late 1930s—but most agree that it fundamentally transformed American political economy."',2,ARRAY['detail','inference'],'01000001-0000-0000-0000-000000000008',true),

(3,'reading',
 'Which of the following best describes the organizational structure of the passage?',
 'A chronological account followed by an evaluation of long-term significance','A comparison between New Deal programs and earlier government economic policies','A description of the economic crisis followed by an explanation of government responses and their effects','A series of arguments for and against New Deal policies',
 'C','The passage begins with the Depression crisis, then describes first-phase and second-phase New Deal measures, and concludes with the historians'' assessment of long-term effects.',2,ARRAY['organization','passage_structure'],'01000001-0000-0000-0000-000000000008',true),

-- PASSAGE 9: Memory (8 questions)
(3,'reading',
 'What is the main argument the author makes about human memory?',
 'Memory is a precise recording system that stores experiences completely and accurately','Memory is a reconstructive process subject to distortion, with significant practical implications','Memory is primarily genetic and does not change significantly with learning or experience','Memory is a passive system that operates independently of attention or emotional state',
 'B','The passage''s central argument is that memory is "a reconstructive process—an active system that encodes, stores, and reassembles information in ways that are subject to distortion, omission, and revision."',2,ARRAY['main_idea'],'01000001-0000-0000-0000-000000000009',true),

(3,'reading',
 'According to the passage, which type of memory stores personally experienced events linked to specific times and places?',
 'Semantic memory','Procedural memory','Episodic memory','Working memory',
 'C','The passage states: "Episodic memory holds personally experienced events tied to specific times and places—a first day at school, a vacation trip."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000009',true),

(3,'reading',
 'The word "introspection" as used in the passage most nearly means',
 'scientific experimentation','conscious self-examination or reflection','external observation','memory retrieval',
 'B','"Introspection" means the examination of one''s own mental processes. The passage states procedural memories "are typically not accessible to conscious introspection"—you can ride a bicycle without being able to consciously describe how.',2,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000009',true),

(3,'reading',
 'According to the passage, working memory differs from long-term memory in that working memory',
 'stores emotional memories more reliably than factual information','holds only about four to seven items for a limited time without rehearsal','requires sleep to consolidate experiences into stable memories','is accessible to conscious introspection only during active use',
 'B','The passage states working memory "can typically maintain only four to seven items simultaneously and retains them for only seconds to minutes without rehearsal."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000009',true),

(3,'reading',
 'What does the passage say about the process of memory consolidation?',
 'It occurs instantaneously when information is first experienced','It requires hours to days, and newly formed memories are not immediately stable','It only applies to procedural memories like skills and habits','It is prevented by high stress, which blocks long-term storage',
 'B','The passage states: "this conversion process—called consolidation—is not instantaneous, and newly formed memories require hours to days to become fully stable."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000009',true),

(3,'reading',
 'The research by Elizabeth Loftus is mentioned primarily to demonstrate that',
 'jurors make poor decisions because of unreliable memory','human memory can be distorted by leading questions and post-event information','the legal system has always recognized the unreliability of eyewitness testimony','procedural memory is more reliable than episodic memory in legal settings',
 'B','The passage states Loftus''s experiments showed "subjects who were asked leading questions...frequently incorporated false details into their subsequent recollections," demonstrating memory''s susceptibility to post-event suggestion.',2,ARRAY['detail','author_purpose'],'01000001-0000-0000-0000-000000000009',true),

(3,'reading',
 'It can be inferred from the passage that procedural memory is different from declarative memory because procedural memory',
 'is stored in a different region of the brain that is less susceptible to forgetting','operates automatically and cannot easily be consciously described or analyzed','is formed through a different consolidation process that requires more repetition','stores only skills learned before the age of twelve',
 'B','The passage states procedural memories "are typically not accessible to conscious introspection," implying they operate outside of conscious, declarative knowledge.',3,ARRAY['inference'],'01000001-0000-0000-0000-000000000009',true),

(3,'reading',
 'Which statement would the author of this passage most likely agree with?',
 'Eyewitness testimony is reliable when witnesses are highly confident in their recollections','The legal system should place more weight on eyewitness accounts than on physical evidence','Research on memory distortion suggests eyewitness accounts should be treated with caution','Human memory is primarily shaped by genetics rather than by experience',
 'C','The passage discusses memory distortion and mentions "reforms in how law enforcement gathers witness testimony," implying eyewitness accounts require caution even when confident.',3,ARRAY['inference','author_attitude'],'01000001-0000-0000-0000-000000000009',true),

-- PASSAGE 10: Urban Migration (8 questions)
(3,'reading',
 'The passage is primarily about',
 'the economic challenges faced by cities that receive large numbers of migrants','the sociological forces and consequences of rural-to-urban migration','the political conflict between urban and rural populations in developing nations','the differences in migration patterns between developed and developing countries',
 'B','The passage examines what drives urbanization (push/pull factors), the experiences of migrants, the role of social networks, and how migrants maintain complex identities—a broad sociological overview.',2,ARRAY['main_idea'],'01000001-0000-0000-0000-000000000010',true),

(3,'reading',
 'According to the passage, which of the following would be considered a "push factor" in rural-to-urban migration?',
 'Higher wages available in cities','Cultural amenities found in urban areas','Social networks established by earlier migrants','Agricultural mechanization that reduces demand for farm labor',
 'D','The passage defines push factors as conditions making rural life difficult, and lists "agricultural mechanization that reduces the demand for farm labor" as an example.',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000010',true),

(3,'reading',
 'The word "amenities" in paragraph 2 is closest in meaning to',
 'economic opportunities','desirable features or facilities','social connections','official government services',
 'B','"Amenities" refers to pleasant or desirable features—in this case, the cultural attractions and conveniences that cities offer as pull factors for migrants.',1,ARRAY['vocabulary_in_context'],'01000001-0000-0000-0000-000000000010',true),

(3,'reading',
 'According to the passage, migrants in cities with slow economic growth are likely to end up in',
 'stable but low-paying factory jobs that allow for gradual social mobility','informal sector occupations with little security or advancement prospects','government-sponsored housing and employment programs','leadership roles in migrant community organizations',
 'B','The passage states: "migrants may end up in informal sector occupations—street vending, domestic service, casual construction work—that offer little security or opportunity for advancement."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000010',true),

(3,'reading',
 'According to the passage, why do migrants tend to move to places where people from their home community have already settled?',
 'Government policies require migrants to live in designated ethnic neighborhoods','These areas offer lower rents and housing costs than other parts of the city','Social networks in those areas provide employment information, housing, and social support','Language barriers prevent migrants from settling in areas without others who speak their language',
 'C','The passage states these networks "provide information about employment and housing, offer social support during the difficult transition to urban life."',2,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000010',true),

(3,'reading',
 'The passage implies that earlier sociologists expected migration to result in',
 'the rapid destruction of migrants'' home cultures and adoption of the host culture','the strengthening of migrants'' original cultural identities through organized resistance','a gradual blending of host and home cultures over multiple generations','permanent separation between migrants and their home communities',
 'A','The passage states urban sociologists "observed that migration rarely produces the rapid assimilation once assumed by sociologists," implying earlier sociologists expected rapid cultural adoption (assimilation).',3,ARRAY['inference'],'01000001-0000-0000-0000-000000000010',true),

(3,'reading',
 'Which of the following is used in the passage to illustrate how migrants maintain connections to their home communities?',
 'Participation in host country electoral politics','Regular visits, financial remittances, and ongoing communication','Maintaining separate legal citizenship in their country of origin','Operating businesses that import goods from their home countries',
 'B','The passage states migrants remain "connected to their places of origin through regular visits, financial remittances, and ongoing communication."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000010',true),

(3,'reading',
 'According to the passage, what proportion of the world''s population is expected to live in urban areas by 2050?',
 'More than one-third','Approximately one-half','About two-thirds','Nearly three-quarters',
 'C','The passage states: "the proportion is expected to reach two-thirds by 2050."',1,ARRAY['detail','factual'],'01000001-0000-0000-0000-000000000010',true)
ON CONFLICT DO NOTHING;
