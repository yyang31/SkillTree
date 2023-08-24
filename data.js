let nodes = new vis.DataSet([
    {
        id: 1,
        value: 1,
        group: "Career",
        label: "What skills are important in\nupper management preparation?",
        image: "images/placeholder.png",
        value: 40,
        isRoot: true,
        selected: true,
        x: 0,
        y: 0,
        fixed: {
            x: true,
            y: true,
        },
    },
    {
        id: 2,
        value: 1,
        group: "SelfGrowth",
        label: "Self-Growth",
        image: "images/self_growth.png",
        description:
            "Actively seek ways to grow and be challenged using development channels.",
        x: -100,
        y: -125,
    },
    {
        id: 3,
        value: 1,
        group: "OutcomesDriven",
        label: "Outcomes Driven",
        image: "images/outcomes_driven.png",
        description: "Achieve results, despite the circumstances.",
        x: 0,
        y: -150,
    },
    {
        id: 4,
        value: 1,
        group: "StrategicMindset",
        label: "Strategic Mindset",
        image: "images/strategic_mindset.png",
        description:
            "Decides the best course of action for future trajectories.",
        x: 100,
        y: -125,
    },
    {
        id: 5,
        value: 1,
        group: "Alignment",
        label: "Alignment",
        image: "images/alignment.png",
        description:
            "Plans and prioritizes work to meet commitments aligned with organizational goals.",
        x: 150,
        y: -25,
    },
    {
        id: 6,
        value: 1,
        group: "Ambiguity",
        label: "Ambiguity",
        image: "images/ambiguity.png",
        description:
            "Operates well, even when contexts and objectives are not certain or clear cut.",
        x: 140,
        y: 75,
    },
    {
        id: 7,
        value: 1,
        group: "Interconnectivity",
        label: "Interconnectivity",
        image: "images/interconnectivity.png",
        description: "Converse and relate comfortably with diverse groups.",
        x: 60,
        y: 150,
    },
    {
        id: 8,
        value: 1,
        group: "Communication",
        label: "Communication",
        image: "images/communication.png",
        description:
            "Develop and express thoughts and feelings to an audience.",
        x: -60,
        y: 150,
    },
    {
        id: 9,
        value: 1,
        group: "BalancesStakeholders",
        label: "Balances Stakeholders",
        image: "images/balanced_stakeholders.png",
        description:
            "Address needs of multiple groups associated with the organization.",
        x: -140,
        y: 75,
    },
    {
        id: 10,
        value: 1,
        group: "Adaptability",
        label: "Adaptability",
        image: "images/placeholder.png",
        description:
            "Shifting behaviors to fit organizational context in real time.",
        x: -150,
        y: -25,
    },
    {
        id: 11,
        value: 1,
        group: "BalancesStakeholders",
        label: "Lend Your Ear",
        image: "images/balanced_stakeholders.png",
        description:
            "Listens to others to gain an understanding of various stakeholder priorities.",
        x: -200,
        y: 175,
    },
    {
        id: 12,
        value: 1,
        group: "BalancesStakeholders",
        label: "Cultural Awareness",
        image: "images/balanced_stakeholders.png",
        description:
            "Understand and respect different cultures and values of different groups.",
        x: -300,
        y: 325,
    },
    {
        id: 13,
        value: 1,
        group: "BalancesStakeholders",
        label: "People Skills",
        image: "images/balanced_stakeholders.png",
        description: "Engages effectively with multiple stakeholders.",
        x: -300,
        y: 175,
    },
    {
        id: 14,
        value: 1,
        group: "BalancesStakeholders",
        label: "Cultural Savvy",
        image: "images/balanced_stakeholders.png",
        description:
            "Navigate multiple cultural spaces with respect and professionalism for each of their norms and values.",
        x: -350,
        y: 550,
    },
    {
        id: 15,
        value: 1,
        group: "BalancesStakeholders",
        label: "Workplace Culture",
        image: "images/balanced_stakeholders.png",
        description:
            "Create, embody, and enforce organizational culture in which people follow the highest ethics and deepest cultural sensitivity.",
        x: -475,
        y: 650,
    },
    {
        id: 16,
        value: 1,
        group: "Communication",
        label: "Been Present",
        image: "images/communication.png",
        description:
            "Pay attention to others' insights, advice, or instructions to grasp main concepts and pieces.",
        x: -150,
        y: 250,
    },
    {
        id: 17,
        value: 1,
        group: "Communication",
        label: "Concision",
        image: "images/communication.png",
        description:
            "Promptly shares relevant info with right amount of detail.",
        x: -50,
        y: 275,
    },
    {
        id: 18,
        value: 1,
        group: "Communication",
        label: "Experienced Writer",
        image: "images/communication.png",
        description: "Gives appropriate context and details when writing.",
        x: -50,
        y: 400,
    },
    {
        id: 19,
        value: 1,
        group: "Communication",
        label: "Content Creator",
        image: "images/communication.png",
        description:
            "Produces rich, professional documents and reports that widely shared internally and externally of the organization.",
        x: -50,
        y: 550,
    },
    {
        id: 20,
        value: 1,
        group: "Communication",
        label: "Experienced Speaker",
        image: "images/communication.png",
        description: "Gives appropriate context and details when speaking.",
        x: -200,
        y: 350,
    },
    {
        id: 21,
        value: 1,
        group: "Communication",
        label: "Critical Listening",
        image: "images/communication.png",
        description:
            "Listens carefully and probes beneath the surface to gain richer insight on others' views.",
        x: -200,
        y: 475,
    },
    {
        id: 22,
        value: 1,
        group: "Communication",
        label: "Forum Moderator",
        image: "images/communication.png",
        description:
            "Creates forums for people to express themselves openly and regularly.",
        x: -250,
        y: 575,
    },
    {
        id: 23,
        value: 1,
        group: "Communication",
        label: "Expert Speaker",
        image: "images/communication.png",
        description:
            "Delivers messages effectively to all levels of the organization, tailoring communication content and style to the needs of others.",
        x: -150,
        y: 575,
    },
    {
        id: 24,
        value: 1,
        group: "Communication",
        label: "Advanced Forum Moderator",
        image: "images/communication.png",
        description:
            "Pays attention to others' input and perspectives, asks questions, and summarizes to confirm understanding.",
        x: -300,
        y: 675,
    },
    {
        id: 25,
        value: 1,
        group: "Communication",
        label: "Veteran Oratory",
        image: "images/communication.png",
        description:
            "Has a strong, compelling impact on people at all levels, building interest and commitment and creating culture of ongoing constructive dialogue.",
        x: -150,
        y: 675,
    },
    {
        id: 26,
        value: 1,
        group: "BalancesStakeholders",
        label: "People Research",
        image: "images/balanced_stakeholders.png",
        description: "Learn about various stakeholders and gain insight.",
        x: -300,
        y: 50,
    },
    {
        id: 27,
        value: 1,
        group: "BalancesStakeholders",
        label: "Preemptive Strike",
        image: "images/balanced_stakeholders.png",
        description:
            "Takes initiative to respond to stakeholder concerns and issues.",
        x: -400,
        y: 175,
    },
    {
        id: 28,
        value: 1,
        group: "BalancesStakeholders",
        label: "Insider Knowledge",
        image: "images/balanced_stakeholders.png",
        description:
            "Probes deeper to gain richer details and backgrounds about stakeholders.",
        x: -400,
        y: 300,
    },
    {
        id: 29,
        value: 1,
        group: "BalancesStakeholders",
        label: "Integrity",
        image: "images/balanced_stakeholders.png",
        description:
            "Ensures people understand and adhere to ethical standards when working with stakeholders.",
        x: -400,
        y: 400,
    },
    {
        id: 30,
        value: 1,
        group: "BalancesStakeholders",
        label: "Advanced Integrity",
        image: "images/balanced_stakeholders.png",
        description: "Promotes and environment of high ethical standards.",
        x: -475,
        y: 550,
    },
    {
        id: 31,
        value: 1,
        group: "BalancesStakeholders",
        label: "Crowd Working",
        image: "images/balanced_stakeholders.png",
        description:
            "Respond to stakeholders with well-balanced, win-win solutions.",
        x: -500,
        y: 400,
    },
    {
        id: 32,
        value: 1,
        group: "BalancesStakeholders",
        label: "Crowd Management",
        image: "images/balanced_stakeholders.png",
        description:
            "Maximize outcomes for all stakeholders and identify all relevant issues.",
        x: -600,
        y: 550,
    },
    {
        id: 33,
        value: 1,
        group: "Interconnectivity",
        label: "Openness",
        image: "images/interconnectivity.png",
        description:
            "Listens and responds non-defensively when given advice, instruction, or feedback.",
        x: 60,
        y: 250,
    },
    {
        id: 34,
        value: 1,
        group: "Interconnectivity",
        label: "Countenance",
        image: "images/interconnectivity.png",
        description:
            "Maintains an open, accepting demeanor when interacting with others.",
        x: 200,
        y: 250,
    },
    {
        id: 35,
        value: 1,
        group: "Interconnectivity",
        label: "Tact",
        image: "images/interconnectivity.png",
        description:
            "Shows sensible reactions and sensitivity in difficult interpersonal situations.",
        x: 50,
        y: 375,
    },
    {
        id: 36,
        value: 1,
        group: "Interconnectivity",
        label: "Social Awareness I",
        image: "images/interconnectivity.png",
        description:
            "Grasp others' more obvious social cues and responds appropriately.",
        x: 150,
        y: 350,
    },
    {
        id: 37,
        value: 1,
        group: "Interconnectivity",
        label: "Tactition",
        image: "images/interconnectivity.png",
        description:
            "Helps to diffuse difficult interpersonal situations by showing high levels of tact, sensitivity, and consideration.",
        x: 75,
        y: 500,
    },
    {
        id: 38,
        value: 1,
        group: "Interconnectivity",
        label: "Social Awareness II",
        image: "images/interconnectivity.png",
        description:
            "Grasp others' subtle social cues and nimbly responds to others' needs and concerns.",
        x: 175,
        y: 475,
    },
    {
        id: 39,
        value: 1,
        group: "Interconnectivity",
        label: "Unity",
        image: "images/interconnectivity.png",
        description: "Works to build greater group harmony.",
        x: 125,
        y: 600,
    },
    {
        id: 40,
        value: 1,
        group: "Interconnectivity",
        label: "People Management",
        image: "images/interconnectivity.png",
        description:
            "Understands the nuances of interpersonal group dynamics and leverages this knowledge to achieve results.",
        x: 175,
        y: 675,
    },
    {
        id: 41,
        value: 1,
        group: "Interconnectivity",
        label: "Tutelage",
        image: "images/interconnectivity.png",
        description: "Coach members on interpersonal skills.",
        x: 250,
        y: 575,
    },
    {
        id: 42,
        value: 1,
        group: "Interconnectivity",
        label: "People Liaison",
        image: "images/interconnectivity.png",
        description:
            "Picks up on team interpersonal dynamics and finds ways to work effectively and resolve interpersonal conflict, internal and external to the organization.",
        x: 325,
        y: 675,
    },
    {
        id: 43,
        value: 1,
        group: "Interconnectivity",
        label: "Relationship Building",
        image: "images/interconnectivity.png",
        description:
            "Starts conversations and builds rapport with audience members.",
        x: 275,
        y: 350,
    },
    {
        id: 44,
        value: 1,
        group: "Interconnectivity",
        label: "Charm",
        image: "images/interconnectivity.png",
        description: "Builds rapport with ease.",
        x: 325,
        y: 450,
    },
    {
        id: 45,
        value: 1,
        group: "Interconnectivity",
        label: "Rapport",
        image: "images/interconnectivity.png",
        description:
            "Takes time to build rapport in meetings and groups and speaks about common interests  with poise and polish.",
        x: 350,
        y: 550,
    },
    {
        id: 46,
        value: 1,
        group: "Interconnectivity",
        label: "Communication Culture",
        image: "images/interconnectivity.png",
        description:
            "Cultivates a culture in which interpersonal and group dynamics are positive internally and externally.",
        x: 450,
        y: 650,
    },
    {
        id: 47,
        value: 1,
        group: "Ambiguity",
        label: "Seeking Guidance",
        image: "images/ambiguity.png",
        description:
            "Connecting with appropriate individuals to gain direction.",
        x: 250,
        y: 160,
    },
    {
        id: 48,
        value: 1,
        group: "Ambiguity",
        label: "Guide",
        image: "images/ambiguity.png",
        description: "Helps others deal with uncertainty or lack of info.",
        x: 300,
        y: 250,
    },
    {
        id: 49,
        value: 1,
        group: "Ambiguity",
        label: "Advanced Seeking Guidance",
        image: "images/ambiguity.png",
        description:
            "Look for help on how to adapt to changes and responds with calm composure.",
        x: 425,
        y: 200,
    },
    {
        id: 50,
        value: 1,
        group: "Ambiguity",
        label: "Shepard",
        image: "images/ambiguity.png",
        description:
            "Offer coaching and suggestions to help individuals navigate ambiguity and continue moving forward.",
        x: 400,
        y: 350,
    },
    {
        id: 51,
        value: 1,
        group: "Ambiguity",
        label: "Life Coach",
        image: "images/ambiguity.png",
        description:
            "Steer others skillfully with a stabilizing presence and clear targeted instruction in order to make progress.",
        x: 475,
        y: 425,
    },
    {
        id: 52,
        value: 1,
        group: "Ambiguity",
        label: "Serenity",
        image: "images/ambiguity.png",
        description:
            "Remain calm, positive, and focused during transitions or chaotic situations.",
        x: 500,
        y: 300,
    },
    {
        id: 53,
        value: 1,
        group: "Ambiguity",
        label: "Charismatic Leadership",
        image: "images/ambiguity.png",
        description:
            "Champions change by rallying and inspiring people to take swift and effective action, offering a clear path forward during ambiguous times.",
        x: 600,
        y: 475,
    },
    {
        id: 54,
        value: 1,
        group: "Ambiguity",
        label: "Determination",
        image: "images/ambiguity.png",
        description: "Takes steps forward, despite unknown details.",
        x: 275,
        y: 75,
    },
    {
        id: 55,
        value: 1,
        group: "Ambiguity",
        label: "Embrace Change",
        image: "images/placeholder.png",
        description: "Ask questions to anticipate new priorities.",
        x: 425,
        y: 100,
    },
    {
        id: 56,
        value: 1,
        group: "Ambiguity",
        label: "Reactance",
        image: "images/ambiguity.png",
        description:
            "Responding effectively to unclear situations by resolving ambiguity and make progress.",
        x: 575,
        y: 200,
    },
    {
        id: 57,
        value: 1,
        group: "Ambiguity",
        label: "Opportunist",
        image: "images/ambiguity.png",
        description:
            "Discerns and capitalizes on promising, ambiguous situations to manage change.",
        x: 650,
        y: 300,
    },
    {
        id: 58,
        value: 1,
        group: "Alignment",
        label: "Support",
        image: "images/alignment.png",
        description:
            "Point out available support and how can they be used to carry out plans.",
        x: 250,
        y: 0,
    },
    {
        id: 59,
        value: 1,
        group: "Alignment",
        label: "Advanced Support",
        image: "images/alignment.png",
        description:
            "Skillfully identify and use available support and explore options.",
        x: 350,
        y: 25,
    },
    {
        id: 60,
        value: 1,
        group: "Alignment",
        label: "Small-scale Planning",
        image: "images/alignment.png",
        description:
            "Incorporate new activities that allow for optimal efficiency and effective coordination.",
        x: 550,
        y: 75,
    },
    {
        id: 61,
        value: 1,
        group: "Alignment",
        label: "Large-scale Planning",
        image: "images/alignment.png",
        description:
            "Incorporate new activities to coordinate and align plans across workgroups or departments.",
        x: 625,
        y: -25,
    },
    {
        id: 62,
        value: 1,
        group: "Alignment",
        label: "Resources",
        image: "images/alignment.png",
        description:
            "Identify available resources and how can they be used to carry out plans.",
        x: 350,
        y: -50,
    },
    {
        id: 63,
        value: 1,
        group: "Alignment",
        label: "Resourcefulness",
        image: "images/alignment.png",
        description: "Skillfully identify and use available resources.",
        x: 450,
        y: -25,
    },
    {
        id: 64,
        value: 1,
        group: "Alignment",
        label: "Onward Movement",
        image: "images/alignment.png",
        description:
            "Uphold strategic objectives with aggressive yet realistic time frames.",
        x: 500,
        y: -100,
    },
    {
        id: 65,
        value: 1,
        group: "Alignment",
        label: "Accountability",
        image: "images/alignment.png",
        description: "Meets deadlines on time with acceptable quality of work.",
        x: 250,
        y: -100,
    },
    {
        id: 66,
        value: 1,
        group: "Alignment",
        label: "Dependability",
        image: "images/alignment.png",
        description: "Deliver efficient, high quality work.",
        x: 350,
        y: -125,
    },
    {
        id: 67,
        value: 1,
        group: "Alignment",
        label: "Speed of Lightning",
        image: "images/alignment.png",
        description: "Drives actions to coordinate and align strategic goals.",
        x: 500,
        y: -175,
    },
    {
        id: 68,
        value: 1,
        group: "Alignment",
        label: "Master Planner",
        image: "images/alignment.png",
        description:
            "Generate comprehensive and exact goals to produce clear organizational priorities.",
        x: 625,
        y: -125,
    },
    {
        id: 69,
        value: 1,
        group: "Alignment",
        label: "Speed of Light",
        image: "images/alignment.png",
        description:
            "Swiftly drives actions to coordinate and align strategic goals to build sense of urgency.",
        x: 625,
        y: -250,
    },
    {
        id: 70,
        value: 1,
        group: "StrategicMindset",
        label: "Trendspotter",
        image: "images/strategic_mindset.png",
        description:
            "Spots what is gaining traction and asks about future issues that may impact one's work.",
        x: 200,
        y: -175,
    },
    {
        id: 71,
        value: 1,
        group: "StrategicMindset",
        label: "Initiator",
        image: "images/strategic_mindset.png",
        description:
            "Sparks discussion about new trends and how these impact the work, worker, industry, or consumers.",
        x: 350,
        y: -200,
    },
    {
        id: 72,
        value: 1,
        group: "StrategicMindset",
        label: "Trends Tracker",
        image: "images/strategic_mindset.png",
        description:
            "Keeps updated on current and future industry trends and market forces.",
        x: 475,
        y: -275,
    },
    {
        id: 73,
        value: 1,
        group: "StrategicMindset",
        label: "Strategist",
        image: "images/strategic_mindset.png",
        description:
            "Develops strong, long-term strategies that capitalize on the organization's unique capabilities and on the emerging market trends.",
        x: 525,
        y: -375,
    },
    {
        id: 74,
        value: 1,
        group: "StrategicMindset",
        label: "Strategic Leadership",
        image: "images/strategic_mindset.png",
        description:
            "Is highly alert to the future, analyzing multiple possibilities and scenarios to equip the organization to the address change, tackle, challenge, and shape new opportunities.",
        x: 550,
        y: -475,
    },
    {
        id: 75,
        value: 1,
        group: "StrategicMindset",
        label: "Foresight",
        image: "images/strategic_mindset.png",
        description:
            "Explores possibilities that can impact the team or organization in the future.",
        x: 250,
        y: -275,
    },
    {
        id: 76,
        value: 1,
        group: "StrategicMindset",
        label: "Sage Decisions",
        image: "images/strategic_mindset.png",
        description:
            "Takes industry, market trends, and organizational goals into account when making decisions.",
        x: 375,
        y: -300,
    },
    {
        id: 77,
        value: 1,
        group: "StrategicMindset",
        label: "Basic Action",
        image: "images/strategic_mindset.png",
        description:
            "Understand and articulates how one's actions contribute to organizational success and prioritizes actions towards goals.",
        x: 150,
        y: -300,
    },
    {
        id: 78,
        value: 1,
        group: "StrategicMindset",
        label: "Advanced Action",
        image: "images/strategic_mindset.png",
        description:
            "Identifies and prioritizes efforts and initiatives to have the greatest impacts on the organization.",
        x: 225,
        y: -375,
    },
    {
        id: 79,
        value: 1,
        group: "StrategicMindset",
        label: "Integration",
        image: "images/strategic_mindset.png",
        description:
            "Effectively combines long-term opportunities and challenges with daily activities.",
        x: 350,
        y: -375,
    },
    {
        id: 80,
        value: 1,
        group: "StrategicMindset",
        label: "Clairvoyant",
        image: "images/strategic_mindset.png",
        description:
            "Is a strong big-picture thinker and makes frequent, clear references to organizational vision and strategy with necessary stepping stones.",
        x: 375,
        y: -475,
    },
    {
        id: 81,
        value: 1,
        group: "StrategicMindset",
        label: "Seer Visions",
        image: "images/strategic_mindset.png",
        description:
            "Develops a clear picture of organizational vision and strategy and what needs to be done to accomplish them.",
        x: 250,
        y: -475,
    },
    {
        id: 82,
        value: 1,
        group: "OutcomesDriven",
        label: "Focus",
        image: "images/outcomes_driven.png",
        description:
            "Maintains concentration on work, despite obstacles or setbacks.",
        x: 50,
        y: -250,
    },
    {
        id: 83,
        value: 1,
        group: "OutcomesDriven",
        label: "Effort",
        image: "images/outcomes_driven.png",
        description: "Completes tasks consistently in a timely manner.",
        x: -50,
        y: -250,
    },
    {
        id: 84,
        value: 1,
        group: "OutcomesDriven",
        label: "Perseverance",
        image: "images/outcomes_driven.png",
        description: "Maintains productivity and positive attitude.",
        x: 50,
        y: -350,
    },
    {
        id: 85,
        value: 1,
        group: "OutcomesDriven",
        label: "Goal Orientation",
        image: "images/outcomes_driven.png",
        description: "Focuses on making and completing key goals.",
        x: -100,
        y: -350,
    },
    {
        id: 86,
        value: 1,
        group: "OutcomesDriven",
        label: "Positive Mindset",
        image: "images/outcomes_driven.png",
        description:
            "Drives ahead with great energy when faced with obstacles and setbacks.",
        x: 125,
        y: -450,
    },
    {
        id: 87,
        value: 1,
        group: "OutcomesDriven",
        label: "Team Driven",
        image: "images/outcomes_driven.png",
        description:
            "Provides assistance and encouragement to help others over obstacles.",
        x: -25,
        y: -450,
    },
    {
        id: 88,
        value: 1,
        group: "OutcomesDriven",
        label: "Tenacity",
        image: "images/outcomes_driven.png",
        description:
            "Sticks with goals to completion or initiatives in a timely way, despite setbacks or obstacles.",
        x: -150,
        y: -450,
    },
    {
        id: 89,
        value: 1,
        group: "OutcomesDriven",
        label: "Team Results",
        image: "images/outcomes_driven.png",
        description:
            "Ensures the team pushes through obstacles and establishes superior track record by creating feelings of energy and productive behaviors.",
        x: 75,
        y: -550,
    },
    {
        id: 90,
        value: 1,
        group: "OutcomesDriven",
        label: "Culture of Outcomes",
        image: "images/outcomes_driven.png",
        description:
            "Champions a result-focused culture based on meaningful tasks and energetic action, such as inspiring others and overcoming challenges.",
        x: -75,
        y: -550,
    },
    {
        id: 91,
        value: 1,
        group: "SelfGrowth",
        label: "Motivation",
        image: "images/self_growth.png",
        description: "Shows enthusiasm and energy for seeking growth.",
        x: -150,
        y: -225,
    },
    {
        id: 92,
        value: 1,
        group: "SelfGrowth",
        label: "Basic Growth",
        image: "images/self_growth.png",
        description: "Seek opportunities for learning and development.",
        x: -275,
        y: -225,
    },
    {
        id: 93,
        value: 1,
        group: "SelfGrowth",
        label: "Commitment",
        image: "images/self_growth.png",
        description: "Demonstrate a commitment for self-growth.",
        x: -200,
        y: -325,
    },
    {
        id: 94,
        value: 1,
        group: "SelfGrowth",
        label: "Practice",
        image: "images/self_growth.png",
        description: "Apply new skills on the job.",
        x: -300,
        y: -325,
    },
    {
        id: 95,
        value: 1,
        group: "SelfGrowth",
        label: "Advanced Growth",
        image: "images/self_growth.png",
        description: "Seek resources for learning and development.",
        x: -425,
        y: -275,
    },
    {
        id: 96,
        value: 1,
        group: "SelfGrowth",
        label: "Devotion",
        image: "images/self_growth.png",
        description:
            "Demonstrate a strong, long-term commitment for self-growth.",
        x: -250,
        y: -425,
    },
    {
        id: 97,
        value: 1,
        group: "SelfGrowth",
        label: "Alignment Trainer",
        image: "images/self_growth.png",
        description:
            "Use opportunities to expand abilities connected to organizational needs.",
        x: -350,
        y: -425,
    },
    {
        id: 98,
        value: 1,
        group: "SelfGrowth",
        label: "Generosity",
        image: "images/self_growth.png",
        description: "Share new insights and knowledge  with others.",
        x: -500,
        y: -400,
    },
    {
        id: 99,
        value: 1,
        group: "SelfGrowth",
        label: "Architect",
        image: "images/self_growth.png",
        description: "Create a detailed development plan.",
        x: -250,
        y: -525,
    },
    {
        id: 100,
        value: 1,
        group: "SelfGrowth",
        label: "Master Architect",
        image: "images/self_growth.png",
        description:
            "Create a thorough development plan that factors in organizational and industry dynamics.",
        x: -350,
        y: -575,
    },
    {
        id: 101,
        value: 1,
        group: "SelfGrowth",
        label: "Tactician",
        image: "images/self_growth.png",
        description:
            "Pursue ways to enhance skills and advance organizational strategy.",
        x: -425,
        y: -500,
    },
    {
        id: 102,
        value: 1,
        group: "SelfGrowth",
        label: "Inspiring Muse",
        image: "images/self_growth.png",
        description: "Motivate others to continuously grow and learn.",
        x: -525,
        y: -500,
    },
    {
        id: 103,
        value: 1,
        group: "SelfGrowth",
        label: "Change Maker",
        image: "images/self_growth.png",
        description:
            "Create a culture that strongly values and enhances individual and career development.",
        x: -450,
        y: -600,
    },
]);

let edges = new vis.DataSet([
    // Self-Growth
    { from: 1, to: 2, arrows: "to", hidden: true },
    { from: 2, to: 91, arrows: "to" },
    { from: 2, to: 92, arrows: "to" },
    { from: 91, to: 93, arrows: "to" },
    { from: 93, to: 94, arrows: "to" },
    { from: 92, to: 95, arrows: "to" },
    { from: 93, to: 96, arrows: "to" },
    { from: 94, to: 97, arrows: "to" },
    { from: 95, to: 98, arrows: "to" },
    { from: 95, to: 94, arrows: "to" },
    { from: 96, to: 99, arrows: "to" },
    { from: 99, to: 100, arrows: "to" },
    { from: 97, to: 100, arrows: "to" },
    { from: 97, to: 101, arrows: "to" },
    { from: 98, to: 102, arrows: "to" },
    { from: 102, to: 103, arrows: "to" },
    { from: 101, to: 103, arrows: "to" },
    // Outcome Driven
    { from: 1, to: 3, arrows: "to", hidden: true },
    { from: 3, to: 83, arrows: "to" },
    { from: 3, to: 82, arrows: "to" },
    { from: 82, to: 84, arrows: "to" },
    { from: 83, to: 84, arrows: "to" },
    { from: 83, to: 85, arrows: "to" },
    { from: 84, to: 86, arrows: "to" },
    { from: 84, to: 87, arrows: "to" },
    { from: 85, to: 88, arrows: "to" },
    { from: 86, to: 89, arrows: "to" },
    { from: 87, to: 89, arrows: "to" },
    { from: 87, to: 90, arrows: "to" },
    { from: 88, to: 90, arrows: "to" },

    // Strategic Mindset
    { from: 1, to: 4, arrows: "to", hidden: true },
    { from: 4, to: 70, arrows: "to" },
    { from: 70, to: 71, arrows: "to" },
    { from: 71, to: 72, arrows: "to" },
    { from: 72, to: 73, arrows: "to" },
    { from: 73, to: 74, arrows: "to" },
    { from: 70, to: 75, arrows: "to" },
    { from: 75, to: 76, arrows: "to" },
    { from: 76, to: 73, arrows: "to" },
    { from: 4, to: 77, arrows: "to" },
    { from: 77, to: 78, arrows: "to" },
    { from: 78, to: 79, arrows: "to" },
    { from: 79, to: 80, arrows: "to" },
    { from: 80, to: 74, arrows: "to" },
    { from: 78, to: 81, arrows: "to" },
    { from: 81, to: 80, arrows: "to" },
    // Alignment
    { from: 1, to: 5, arrows: "to", hidden: true },
    { from: 5, to: 58, arrows: "to" },
    { from: 58, to: 59, arrows: "to" },
    { from: 59, to: 60, arrows: "to" },
    { from: 60, to: 61, arrows: "to" },
    { from: 5, to: 62, arrows: "to" },
    { from: 62, to: 63, arrows: "to" },
    { from: 63, to: 60, arrows: "to" },
    { from: 62, to: 64, arrows: "to" },
    { from: 5, to: 65, arrows: "to" },
    { from: 65, to: 66, arrows: "to" },
    { from: 66, to: 67, arrows: "to" },
    { from: 67, to: 68, arrows: "to" },
    { from: 67, to: 69, arrows: "to" },
    // Ambiguity
    { from: 1, to: 6, arrows: "to", hidden: true },
    { from: 6, to: 47, arrows: "to" },
    { from: 6, to: 54, arrows: "to" },
    { from: 54, to: 55, arrows: "to" },
    { from: 55, to: 56, arrows: "to" },
    { from: 56, to: 52, arrows: "to" },
    { from: 56, to: 57, arrows: "to" },
    { from: 47, to: 48, arrows: "to" },
    { from: 48, to: 50, arrows: "to" },
    { from: 50, to: 51, arrows: "to" },
    { from: 47, to: 49, arrows: "to" },
    { from: 49, to: 52, arrows: "to" },
    { from: 51, to: 53, arrows: "to" },
    { from: 52, to: 53, arrows: "to" },
    // Interconnectivity
    { from: 1, to: 7, arrows: "to", hidden: true },
    { from: 7, to: 33, arrows: "to" },
    { from: 33, to: 35, arrows: "to" },
    { from: 35, to: 37, arrows: "to" },
    { from: 33, to: 36, arrows: "to" },
    { from: 36, to: 38, arrows: "to" },
    { from: 38, to: 41, arrows: "to" },
    { from: 41, to: 42, arrows: "to" },
    { from: 37, to: 39, arrows: "to" },
    { from: 38, to: 39, arrows: "to" },
    { from: 39, to: 40, arrows: "to" },
    { from: 7, to: 34, arrows: "to" },
    { from: 34, to: 43, arrows: "to" },
    { from: 43, to: 44, arrows: "to" },
    { from: 44, to: 45, arrows: "to" },
    { from: 45, to: 42, arrows: "to" },
    { from: 45, to: 46, arrows: "to" },
    // Communication
    { from: 1, to: 8, arrows: "to", hidden: true },
    { from: 8, to: 16, arrows: "to" },
    { from: 16, to: 20, arrows: "to" },
    { from: 20, to: 21, arrows: "to" },
    { from: 8, to: 17, arrows: "to" },
    { from: 17, to: 18, arrows: "to" },
    { from: 18, to: 19, arrows: "to" },
    { from: 21, to: 19, arrows: "to" },
    { from: 21, to: 22, arrows: "to" },
    { from: 21, to: 23, arrows: "to" },
    { from: 22, to: 24, arrows: "to" },
    { from: 23, to: 25, arrows: "to" },
    // Balances Stakeholders
    { from: 1, to: 9, arrows: "to", hidden: true },
    { from: 9, to: 11, arrows: "to" },
    { from: 11, to: 12, arrows: "to" },
    { from: 9, to: 13, arrows: "to" },
    { from: 13, to: 12, arrows: "to" },
    { from: 12, to: 14, arrows: "to" },
    { from: 14, to: 15, arrows: "to" },
    { from: 9, to: 26, arrows: "to" },
    { from: 26, to: 27, arrows: "to" },
    { from: 27, to: 28, arrows: "to" },
    { from: 28, to: 29, arrows: "to" },
    { from: 29, to: 30, arrows: "to" },
    { from: 28, to: 31, arrows: "to" },
    { from: 31, to: 32, arrows: "to" },
    { from: 32, to: 15, arrows: "to" },
    { from: 30, to: 15, arrows: "to" },
    { from: 1, to: 10, arrows: "to", hidden: true },
]);
