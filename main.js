/* ============================================================
   GLOBALS
   ============================================================ */
const header  = document.querySelector(".site-header");
const toggle  = document.querySelector(".nav-toggle");
const nav     = document.querySelector(".site-nav");
const toast   = document.getElementById("toast");
const body    = document.body;
const page    = body.dataset.page;
const metaEl  = document.getElementById("metaDescription");

let toastTimer    = null;
let rerenderCal   = null;
let currentLang   = localStorage.getItem("site-lang") || "fr";
if (!["fr","en"].includes(currentLang)) currentLang = "fr";

/* ============================================================
   TRANSLATIONS
   ============================================================ */
const t = {
  fr: {
    meta: {
      home:    { title: "Cabinet Vétérinaire de Gruissan",          description: "Cabinet médico-chirurgical de Gruissan — soins, chirurgie, prévention." },
      team:    { title: "Équipe | Cabinet Vétérinaire de Gruissan", description: "Découvrez l'équipe du Cabinet Vétérinaire de Gruissan." },
      cabinet: { title: "Le cabinet | Cabinet Vétérinaire de Gruissan", description: "Les espaces et équipements du cabinet vétérinaire de Gruissan." },
      booking: { title: "Contact | Cabinet Vétérinaire de Gruissan", description: "Contactez le Cabinet Vétérinaire de Gruissan par téléphone ou email." },
      blog:    { title: "Blog | Cabinet Vétérinaire de Gruissan", description: "Conseils vétérinaires, prévention et actualités pour chiens, chats et NAC, par le Cabinet Vétérinaire de Gruissan." },
      article:  { title: "Chenilles processionnaires : le danger pour les chiens et chats à Gruissan | Blog", description: "Symptômes, gestes d'urgence et prévention face aux chenilles processionnaires du pin sur le littoral audois." },
      article2: { title: "Épillets de graminées : danger pour chiens et chats à Gruissan (été) | Blog", description: "Épillets de graminées : symptômes selon la localisation, réflexes d'urgence et prévention pour vos animaux cet été à Gruissan." },
      article3: { title: "Canicule chien chat à Gruissan : protéger son animal de la chaleur", description: "Chien ou chat pendant la canicule à Gruissan : bons réflexes, erreurs à éviter, signes d'alerte et conseils du Cabinet Vétérinaire de Gruissan proche Narbonne." }
    },
    careSummary: {
      consultation: "Consultation générale",
      vaccin:       "Vaccin & prévention",
      chirurgie:    "Chirurgie & soins techniques",
      imagerie:     "Imagerie & analyses"
    },
    toast: { form: "Demande enregistrée dans la maquette. Nous vous recontactons rapidement." },
    text: {
      /* nav */
      "nav.home":    "Accueil",
      "nav.team":    "Équipe",
      "nav.cabinet": "Le cabinet",
      "nav.blog":    "Blog",
      "nav.booking": "Rendez-vous",
      "nav.cta":     "Prendre rendez-vous",

      /* footer */
      "footer.brand": "Cabinet Vétérinaire de Gruissan",
      "footer.text":  "Cabinet médico-chirurgical — 40 Rue de la Tartane, 11430 Gruissan.",
      "footer.map":   "Voir sur Google Maps",

      /* home hero */
      "home.hero.label": "Vétérinaire à Gruissan",
      "home.hero.title": "Votre vétérinaire à Gruissan.",
      "home.hero.sub":   "Cabinet médico-chirurgical fondé en 1997. Soins, chirurgie, imagerie et hospitalisation sous vidéosurveillance.",
      "home.hero.cta1":  "Prendre rendez-vous",
      "home.hero.cta2":  "04 68 75 18 22",
      "home.hero.fig1":  "Fondé par le Dr EYME",
      "home.hero.fig2":  "Vidéosurveillance",
      "home.hero.fig3":  "Équipe bilingue",
      "home.hero.fig4":  "Espaces dédiés",

      /* home services */
      "home.services.label": "Ce que nous faisons",
      "home.services.title": "Une structure complète, à votre service.",
      "home.services.note":  "Tous les soins essentiels assurés sur place, sans transfert.",
      "home.s1.title": "Consultation & prévention",
      "home.s1.text":  "Bilan de santé, suivi clinique, antiparasitaires et conseils nutrition pour chiens, chats et NAC.",
      "home.s2.title": "Chirurgie & soins techniques",
      "home.s2.text":  "Bloc opératoire dédié, soins pré et post-opératoires, hospitalisation sous surveillance vidéo.",
      "home.s3.title": "Imagerie médicale",
      "home.s3.text":  "Radiographie numérique et échographie sur place. Résultats immédiats pour des décisions rapides.",
      "home.s4.title": "Laboratoire & analyses",
      "home.s4.text":  "Analyses réalisées en interne. Bilan sanguin, urinaire et plus encore, pour un diagnostic précis.",

      /* home approach */
      "home.approach.label": "Notre approche",
      "home.approach.title": "Une relation médicale directe, sans intermédiaire.",
      "home.approach.text":  "Nous avons voulu un cabinet où les décisions se prennent vite, avec les bons outils et une communication claire avec les propriétaires.",
      "home.approach.note":  "Le Dr Jean-François EYME est vétérinaire depuis 1988, diplômé de l'ENV d'Alfort et de la Faculté de Médecine de Paris.",
      "home.approach.cta":   "Rencontrer l'équipe",

      /* home independence */
      "home.indep.label": "Cabinet indépendant",
      "home.indep.title": "Aucun groupe. Aucun actionnaire. Juste votre vétérinaire.",
      "home.indep.text":  "Contrairement à la majorité des cliniques, notre cabinet n'appartient à aucun groupement actionnarial. Nous ne reversons aucun dividende à des fonds de pension, qu'ils soient français ou étrangers. Cette indépendance nous permet de fixer nos tarifs librement et de prendre chaque décision médicale dans le seul intérêt de votre animal — jamais pour rémunérer des investisseurs.",
      "home.indep.quote": "« Je suis le fondateur et le responsable de mon cabinet. Les cliniques affiliées à des fonds de pension ont des objectifs de rentabilité qui se répercutent forcément sur les prix. »",
      "home.indep.cite":  "— Dr Jean-François EYME, fondateur",
      "home.indep.p1":    "Indépendant depuis la création du cabinet en 1997",
      "home.indep.p2":    "Dividende reversé à un fonds d'investissement ou de pension",
      "home.indep.p3":    "Vétérinaire responsable, votre seul interlocuteur médical",

      /* home local */
      "home.local.label": "Local & accessible",
      "home.local.title": "Pour les habitants et les visiteurs.",
      "home.local.text":  "Résident, propriétaire d'une résidence secondaire ou touriste de passage — nous accueillons votre animal avec le même soin. À 10 minutes de Narbonne.",
      "home.local.t1": "Vétérinaire Gruissan",
      "home.local.t2": "Proche Narbonne",
      "home.local.t3": "Urgences aux horaires",
      "home.local.t4": "Cabinet médico-chirurgical",

      /* home info */
      "home.info.label":     "Infos pratiques",
      "home.info.title":     "Tout ce qu'il faut savoir avant de venir.",
      "home.info.addrLabel": "Adresse",
      "home.info.phoneLabel":"Téléphone",
      "home.info.emailLabel":"Email",
      "home.info.langLabel": "Langues",
      "home.info.langText":  "Français, English",
      "home.info.cta1":      "Prendre rendez-vous",
      "home.info.cta2":      "Appeler le cabinet",

      /* home hours */
      "home.hours.title":   "Horaires d'ouverture",
      "home.hours.mon":     "Lundi",
      "home.hours.tue":     "Mardi",
      "home.hours.wed":     "Mercredi",
      "home.hours.thu":     "Jeudi",
      "home.hours.fri":     "Vendredi",
      "home.hours.sat":     "Samedi",
      "home.hours.sun":     "Dimanche",
      "home.hours.closed":  "Fermé",
      "home.hours.urgLabel":"Urgence",
      "home.hours.urgText": "En cas d'urgence pendant les horaires d'ouverture, appelez-nous immédiatement au 04 68 75 18 22.",

      /* home team */
      "home.team.label": "L'équipe",
      "home.team.title": "Trois personnes à votre écoute.",
      "home.team.sub":   "Une équipe soudée, formée et engagée dans la qualité des soins.",
      "home.team.cta":   "Voir toute l'équipe",

      /* team page */
      "team.hero.label":    "L'équipe",
      "team.hero.title":    "Des professionnels à l'écoute de vos animaux.",
      "team.hero.sub":      "Vétérinaire et auxiliaires spécialisées, une équipe engagée au quotidien.",
      "team.section.label": "Notre équipe",
      "team.section.title": "Trois personnes à votre service.",
      "team.member1.role":  "Vétérinaire fondateur",
      "team.member1.text":  "Vétérinaire depuis 1988. Diplômé de l'ENV d'Alfort et de la Faculté de Médecine de Paris.",
      "team.member1.bio":   "Vétérinaire depuis 1988. Diplômé de l'École Nationale Vétérinaire d'Alfort et de la Faculté de Médecine de Paris. Vétérinaire sanitaire de l'Aude, maître de stage pour les futurs vétérinaires.",
      "team.member2.role":  "ASV",
      "team.member2.text":  "Apprentie ASV 2ème année.",
      "team.member2.bio":   "Apprentie Auxiliaire Spécialisée Vétérinaire de 2ème année. En formation au sein du cabinet, elle accompagne les soins et l'accueil des patients.",
      "team.member3.role":  "ASV",
      "team.member3.text":  "Apprentie ASV 1ère année depuis 2026.",
      "team.member3.bio":   "Apprentie Auxiliaire Spécialisée Vétérinaire de 1ère année depuis 2026. Elle contribue à la prise en charge quotidienne des animaux et à la vie du cabinet.",
      "team.cta.title":     "Nous joindre rapidement.",
      "team.cta.sub":       "Pour une urgence ou une demande rapide, le téléphone reste la voie la plus directe.",
      "team.cta.phone":     "04 68 75 18 22",
      "team.cta.booking":   "Prendre rendez-vous",

      /* cabinet page */
      "cabinet.hero.label":    "Le cabinet",
      "cabinet.hero.title":    "Une structure médicale complète à Gruissan.",
      "cabinet.hero.sub":      "Consultation, chirurgie, imagerie, analyses et hospitalisation — tout sur place.",
      "cabinet.story.label":   "Notre structure",
      "cabinet.story.title":   "Fondé en 1997, équipé pour aujourd'hui.",
      "cabinet.story.p1":      "Le cabinet a été fondé par le Dr Jean-François EYME et dispose de moyens techniques régulièrement renouvelés pour proposer les meilleurs soins possibles.",
      "cabinet.story.p2":      "L'ensemble des espaces a été pensé pour la sécurité et le confort des animaux, avec une hospitalisation sous vidéosurveillance H24 et un bloc opératoire dédié.",
      "cabinet.f1":  "Salle d'accueil avec espace produits et alimentation",
      "cabinet.f2":  "Salle de consultation dédiée",
      "cabinet.f3":  "Salle de soins séparée",
      "cabinet.f4":  "Bloc opératoire",
      "cabinet.f5":  "Laboratoire d'analyses intégré",
      "cabinet.f6":  "Hospitalisation sous vidéosurveillance H24",
      "cabinet.f7":  "Radiographie numérique et échographie",
      "cabinet.story.indep": "Cabinet 100% indépendant : aucun groupe, aucun actionnaire, aucun dividende reversé à des fonds de pension. Nos décisions restent médicales avant tout.",
      "cabinet.gallery.label": "Aperçus",
      "cabinet.gallery.title": "Quelques vues de nos espaces.",
      "cabinet.cta1": "Prendre rendez-vous",
      "cabinet.cta2": "Voir l'équipe",

      /* contact page */
      "contact.hero.label": "Nous contacter",
      "contact.hero.title": "Prenez rendez-vous par téléphone ou email.",
      "contact.hero.sub":   "Notre équipe est disponible aux horaires d'ouverture. Pour toute urgence, appelez-nous directement.",
      "contact.phone.label":"Appelez-nous",
      "contact.phone.hint": "Appui direct — le moyen le plus rapide",
      "contact.email.label":"Écrivez-nous",
      "contact.email.hint": "Réponse dans les meilleurs délais",
      "contact.addr.label": "Nous trouver",
      "contact.hours.label":"Horaires",
      "contact.infos.label":"Informations pratiques",
      "contact.infos.lang": "Langues parlées",
      "contact.infos.access":"Accès",
      "contact.infos.accessText":"À 10 minutes de Narbonne, parking à proximité.",
      "contact.infos.species":"Espèces reçues",
      "contact.infos.speciesText":"Chiens, chats et NAC.",
      "contact.infos.payment":"Paiement",
      "contact.infos.paymentText":"Espèces, chèque, carte bancaire.",

      /* blog page */
      "blog.hero.label": "Blog",
      "blog.hero.title": "Conseils, prévention et actualités du cabinet.",
      "blog.hero.sub":   "Un nouvel article chaque semaine, écrit par l'équipe du Cabinet Vétérinaire de Gruissan.",
      "blog.list.label": "Derniers articles",
      "blog.list.title": "À lire avant votre prochaine visite.",
      "blog.card1.tag":   "Prévention",
      "blog.card1.title": "Chenilles processionnaires : le danger pour les chiens et chats à Gruissan",
      "blog.card1.excerpt": "Chaque printemps, les chenilles processionnaires du pin représentent un risque sérieux pour les animaux du littoral audois. Symptômes, gestes d'urgence et prévention.",
      "blog.card1.cta":   "Lire l'article",
      "blog.card1.read":  "5 min de lecture",

      /* blog card 2 */
      "blog.card2.tag":     "Prévention",
      "blog.card2.title":   "Épillets de graminées : le danger méconnu de l'été pour chiens et chats à Gruissan",
      "blog.card2.excerpt": "En été, les épillets de graminées se glissent dans les pattes, oreilles, yeux et nez des animaux et migrent en profondeur. Signes à reconnaître et réflexes d'urgence.",
      "blog.card2.cta":     "Lire l'article",
      "blog.card2.read":    "6 min de lecture",

      /* blog card 3 */
      "blog.card3.tag":     "Prévention",
      "blog.card3.title":   "Canicule à Gruissan : comment protéger votre chien ou votre chat pendant les fortes chaleurs",
      "blog.card3.excerpt": "En été, les chiens et les chats peuvent souffrir rapidement de la chaleur. Découvrez les bons réflexes, les erreurs à éviter et les signes d'alerte à surveiller à Gruissan.",
      "blog.card3.cta":     "Lire l'article",
      "blog.card3.read":    "8 min de lecture",

      /* reviews */
      "reviews.label":  "Avis clients",
      "reviews.title":  "Ils nous font confiance depuis des années.",
      "reviews.sub":    "Note moyenne de 4,6/5 sur plus de 300 avis Google.",
      "reviews.google": "Laisser un avis sur Google →"
    }
  },

  en: {
    meta: {
      home:    { title: "Gruissan Veterinary Clinic",             description: "Medical and surgical veterinary clinic in Gruissan — care, surgery, prevention." },
      team:    { title: "Team | Gruissan Veterinary Clinic",      description: "Meet the team at the Gruissan Veterinary Clinic." },
      cabinet: { title: "The clinic | Gruissan Veterinary Clinic",description: "Facilities and equipment of the Gruissan Veterinary Clinic." },
      booking: { title: "Contact | Gruissan Veterinary Clinic", description: "Contact the Gruissan Veterinary Clinic by phone or email." },
      blog:    { title: "Blog | Gruissan Veterinary Clinic", description: "Veterinary advice, prevention and news for dogs, cats and exotic pets, by the Gruissan Veterinary Clinic." },
      article:  { title: "Pine processionary caterpillars: the danger for dogs and cats in Gruissan | Blog", description: "Symptoms, emergency steps and prevention against pine processionary caterpillars on the Aude coastline." },
      article2: { title: "Grass seeds: the summer danger for dogs and cats in Gruissan | Blog", description: "Grass seeds: symptoms by location, emergency steps and prevention for your pets this summer in Gruissan." },
      article3: { title: "Heatwave dogs and cats in Gruissan: how to protect your pet from the heat", description: "Dogs and cats during a heatwave in Gruissan: best practices, mistakes to avoid, warning signs and advice from the Gruissan Veterinary Clinic." }
    },
    careSummary: {
      consultation: "General consultation",
      vaccin:       "Vaccination & prevention",
      chirurgie:    "Surgery & technical care",
      imagerie:     "Imaging & lab tests"
    },
    toast: { form: "Request saved in the demo. We will get back to you shortly." },
    text: {
      /* nav */
      "nav.home":    "Home",
      "nav.team":    "Team",
      "nav.cabinet": "The clinic",
      "nav.blog":    "Blog",
      "nav.booking": "Appointments",
      "nav.cta":     "Book an appointment",

      /* footer */
      "footer.brand": "Gruissan Veterinary Clinic",
      "footer.text":  "Medical & surgical clinic — 40 Rue de la Tartane, 11430 Gruissan.",
      "footer.map":   "View on Google Maps",

      /* home hero */
      "home.hero.label": "Veterinary care in Gruissan",
      "home.hero.title": "Your vet in Gruissan.",
      "home.hero.sub":   "Medical and surgical clinic founded in 1997. Care, surgery, imaging and 24h video-monitored hospitalisation.",
      "home.hero.cta1":  "Book an appointment",
      "home.hero.cta2":  "04 68 75 18 22",
      "home.hero.fig1":  "Founded by Dr EYME",
      "home.hero.fig2":  "Video surveillance",
      "home.hero.fig3":  "Bilingual team",
      "home.hero.fig4":  "Dedicated rooms",

      /* home services */
      "home.services.label": "What we do",
      "home.services.title": "A complete structure, at your service.",
      "home.services.note":  "All essential care provided on-site — no transfer needed.",
      "home.s1.title": "Consultation & prevention",
      "home.s1.text":  "Health checks, clinical follow-up, parasite prevention and nutrition advice for dogs, cats and exotic pets.",
      "home.s2.title": "Surgery & technical care",
      "home.s2.text":  "Dedicated operating theatre, pre/post-op care, hospitalisation under video monitoring.",
      "home.s3.title": "Medical imaging",
      "home.s3.text":  "Digital radiography and ultrasound on-site. Immediate results for fast decisions.",
      "home.s4.title": "Laboratory & tests",
      "home.s4.text":  "In-house lab analysis. Blood, urine and more, for accurate diagnosis.",

      /* home approach */
      "home.approach.label": "Our approach",
      "home.approach.title": "A direct medical relationship — no middleman.",
      "home.approach.text":  "We designed a clinic where decisions are made quickly, with the right tools and clear communication with owners.",
      "home.approach.note":  "Dr Jean-François EYME has been a veterinarian since 1988, trained at the Alfort National Veterinary School and the Paris Faculty of Medicine.",
      "home.approach.cta":   "Meet the team",

      /* home independence */
      "home.indep.label": "Independent practice",
      "home.indep.title": "No group. No shareholders. Just your vet.",
      "home.indep.text":  "Unlike most clinics, our practice belongs to no corporate group. We pay no dividends to pension funds, French or foreign. This independence lets us set our prices freely and make every medical decision in your animal's best interest alone — never to pay back investors.",
      "home.indep.quote": "\"I am the founder and the person in charge of my practice. Clinics affiliated with pension funds have profitability targets that inevitably push prices up.\"",
      "home.indep.cite":  "— Dr Jean-François EYME, founder",
      "home.indep.p1":    "Independent since the clinic was founded in 1997",
      "home.indep.p2":    "Dividends paid to an investment or pension fund",
      "home.indep.p3":    "Veterinarian in charge, your sole medical contact",

      /* home local */
      "home.local.label": "Local & accessible",
      "home.local.title": "For residents and visitors.",
      "home.local.text":  "Whether you live here, own a holiday home or are passing through — we welcome your animal with equal care. 10 minutes from Narbonne.",
      "home.local.t1": "Vet in Gruissan",
      "home.local.t2": "Near Narbonne",
      "home.local.t3": "Emergencies during hours",
      "home.local.t4": "Medical & surgical clinic",

      /* home info */
      "home.info.label":     "Practical info",
      "home.info.title":     "Everything you need to know before you visit.",
      "home.info.addrLabel": "Address",
      "home.info.phoneLabel":"Phone",
      "home.info.emailLabel":"Email",
      "home.info.langLabel": "Languages",
      "home.info.langText":  "Français, English",
      "home.info.cta1":      "Book an appointment",
      "home.info.cta2":      "Call the clinic",

      /* home hours */
      "home.hours.title":   "Opening hours",
      "home.hours.mon":     "Monday",
      "home.hours.tue":     "Tuesday",
      "home.hours.wed":     "Wednesday",
      "home.hours.thu":     "Thursday",
      "home.hours.fri":     "Friday",
      "home.hours.sat":     "Saturday",
      "home.hours.sun":     "Sunday",
      "home.hours.closed":  "Closed",
      "home.hours.urgLabel":"Emergency",
      "home.hours.urgText": "For emergencies during opening hours, call us immediately at 04 68 75 18 22.",

      /* home team */
      "home.team.label": "The team",
      "home.team.title": "Three people ready to help.",
      "home.team.sub":   "A committed team, trained and dedicated to quality care.",
      "home.team.cta":   "Meet the full team",

      /* team page */
      "team.hero.label":    "The team",
      "team.hero.title":    "Professionals dedicated to your animals.",
      "team.hero.sub":      "Veterinarian and veterinary assistants, a team committed every day.",
      "team.section.label": "Our team",
      "team.section.title": "Three people at your service.",
      "team.member1.role":  "Founding veterinarian",
      "team.member1.text":  "Veterinarian since 1988. Trained at the Alfort National Veterinary School and the Paris Faculty of Medicine.",
      "team.member1.bio":   "Veterinarian since 1988, trained at the Alfort National Veterinary School and the Paris Faculty of Medicine. Official veterinarian for the Aude department, and a training supervisor for future vets.",
      "team.member2.role":  "Veterinary assistant",
      "team.member2.text":  "Second-year trainee veterinary assistant.",
      "team.member2.bio":   "Second-year trainee veterinary assistant, she supports daily care and patient reception at the clinic.",
      "team.member3.role":  "Veterinary assistant",
      "team.member3.text":  "First-year trainee veterinary assistant since 2026.",
      "team.member3.bio":   "First-year trainee veterinary assistant since 2026, contributing to daily animal care and clinic life.",
      "team.cta.title":     "Reach us quickly.",
      "team.cta.sub":       "For an emergency or a quick request, calling us is the fastest option.",
      "team.cta.phone":     "04 68 75 18 22",
      "team.cta.booking":   "Book an appointment",

      /* cabinet page */
      "cabinet.hero.label":    "The clinic",
      "cabinet.hero.title":    "A complete medical structure in Gruissan.",
      "cabinet.hero.sub":      "Consultation, surgery, imaging, lab tests and hospitalisation — all on-site.",
      "cabinet.story.label":   "Our structure",
      "cabinet.story.title":   "Founded in 1997, equipped for today.",
      "cabinet.story.p1":      "The clinic was founded by Dr Jean-François EYME and uses regularly updated equipment to provide the best possible care.",
      "cabinet.story.p2":      "All spaces are designed for the safety and comfort of animals, with 24h video-monitored hospitalisation and a dedicated operating theatre.",
      "cabinet.f1":  "Reception area with products and food",
      "cabinet.f2":  "Dedicated consultation room",
      "cabinet.f3":  "Separate treatment room",
      "cabinet.f4":  "Operating theatre",
      "cabinet.f5":  "In-house laboratory",
      "cabinet.f6":  "24h video-monitored hospitalisation",
      "cabinet.f7":  "Digital radiography and ultrasound",
      "cabinet.story.indep": "A 100% independent practice: no group, no shareholders, no dividends paid to pension funds. Our decisions stay medical, first and foremost.",
      "cabinet.gallery.label": "Views",
      "cabinet.gallery.title": "A few views of our spaces.",
      "cabinet.cta1": "Book an appointment",
      "cabinet.cta2": "Meet the team",

      /* contact page */
      "contact.hero.label": "Contact us",
      "contact.hero.title": "Book by phone or email.",
      "contact.hero.sub":   "Our team is available during opening hours. For emergencies, call us directly.",
      "contact.phone.label":"Call us",
      "contact.phone.hint": "Direct call — the fastest option",
      "contact.email.label":"Write to us",
      "contact.email.hint": "We reply as soon as possible",
      "contact.addr.label": "Find us",
      "contact.hours.label":"Opening hours",
      "contact.infos.label":"Practical information",
      "contact.infos.lang": "Languages spoken",
      "contact.infos.access":"Access",
      "contact.infos.accessText":"10 minutes from Narbonne, parking nearby.",
      "contact.infos.species":"Species",
      "contact.infos.speciesText":"Dogs, cats and exotic pets.",
      "contact.infos.payment":"Payment",
      "contact.infos.paymentText":"Cash, cheque, credit card.",

      /* blog page */
      "blog.hero.label": "Blog",
      "blog.hero.title": "Advice, prevention and clinic news.",
      "blog.hero.sub":   "A new article every week, written by the team at the Gruissan Veterinary Clinic.",
      "blog.list.label": "Latest articles",
      "blog.list.title": "Worth reading before your next visit.",
      "blog.card1.tag":   "Prevention",
      "blog.card1.title": "Pine processionary caterpillars: the danger for dogs and cats in Gruissan",
      "blog.card1.excerpt": "Every spring, pine processionary caterpillars pose a serious risk to pets along the Aude coastline. Symptoms, emergency steps and prevention.",
      "blog.card1.cta":   "Read the article",
      "blog.card1.read":  "5 min read",

      /* blog card 2 */
      "blog.card2.tag":     "Prevention",
      "blog.card2.title":   "Grass seeds: the underrated summer danger for dogs and cats in Gruissan",
      "blog.card2.excerpt": "In summer, grass seeds lodge in paws, ears, eyes and noses and migrate deep into tissue. Recognise the signs and know what to do.",
      "blog.card2.cta":     "Read the article",
      "blog.card2.read":    "6 min read",

      /* blog card 3 */
      "blog.card3.tag":     "Prevention",
      "blog.card3.title":   "Heatwave in Gruissan: how to protect your dog or cat from the heat",
      "blog.card3.excerpt": "In summer, dogs and cats can suffer from the heat quickly. Discover the right reflexes, mistakes to avoid and warning signs to watch for in Gruissan.",
      "blog.card3.cta":     "Read the article",
      "blog.card3.read":    "8 min read",

      /* reviews */
      "reviews.label":  "Client reviews",
      "reviews.title":  "They have trusted us for years.",
      "reviews.sub":    "Average rating 4.6/5 across over 300 Google reviews.",
      "reviews.google": "Leave a Google review →"
    }
  }
};

/* ============================================================
   TOAST
   ============================================================ */
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3000);
}

/* ============================================================
   HEADER SCROLL
   ============================================================ */
function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 20);
}

/* ============================================================
   TRANSLATIONS
   ============================================================ */
function applyLang(lang) {
  const dict = t[lang] || t.fr;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict.text[key] !== undefined) el.textContent = dict.text[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (dict.text[key] !== undefined) el.setAttribute("placeholder", dict.text[key]);
  });

  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });

  if (dict.meta[page]) {
    document.title = dict.meta[page].title;
    if (metaEl) metaEl.setAttribute("content", dict.meta[page].description);
  }

  updateCareSummary(lang);
  if (typeof rerenderCal === "function") rerenderCal();
}

/* ============================================================
   CARE SUMMARY
   ============================================================ */
function updateCareSummary(lang = currentLang) {
  const el      = document.querySelector("[data-care-summary]");
  const checked = document.querySelector("input[name='care']:checked");
  if (!el || !checked) return;
  const dict = t[lang] || t.fr;
  el.textContent = dict.careSummary[checked.dataset.careKey] || checked.value;
}

/* ============================================================
   HOURS: highlight today
   ============================================================ */
function highlightToday() {
  const today = new Date().getDay();
  document.querySelectorAll(".hours-table tr[data-day]").forEach(row => {
    row.classList.toggle("is-today", Number(row.dataset.day) === today);
  });
}

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
function initReveal() {
  const nodes = document.querySelectorAll("[data-reveal]");
  if (!nodes.length) return;

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-visible");
        obs.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    nodes.forEach(n => obs.observe(n));
  } else {
    nodes.forEach(n => n.classList.add("is-visible"));
  }
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMenu() {
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    body.style.overflow = open ? "hidden" : "";
  });

  nav.querySelectorAll("a, button[data-lang]").forEach(el => {
    el.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      body.style.overflow = "";
    });
  });
}

/* ============================================================
   CALENDAR (booking page)
   ============================================================ */
function startOfDay(d) { const c = new Date(d); c.setHours(0,0,0,0); return c; }

function fmtDate(d, lang) {
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "fr-FR", {
    weekday:"long", day:"numeric", month:"long", year:"numeric"
  }).format(d);
}

function fmtMonth(d, lang) {
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "fr-FR", {
    month:"long", year:"numeric"
  }).format(d);
}

function weekdays(lang) {
  const mon = new Date(2024, 0, 1);
  return Array.from({length:7}, (_, i) => {
    const day = new Date(mon); day.setDate(mon.getDate() + i);
    return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "fr-FR", {weekday:"short"}).format(day);
  });
}

function slotsFor(d) {
  const day = d.getDay();
  if (day === 0) return [];
  if (day === 6) return ["09:00","09:30","10:00","10:30","11:00","11:30"];
  return ["09:00","09:30","10:00","10:30","11:00","11:30","17:00","17:30","18:00","18:30"];
}

function initCalendar() {
  if (page !== "booking") return null;

  const monthEl   = document.querySelector("[data-calendar-month]");
  const wdEl      = document.querySelector("[data-calendar-weekdays]");
  const gridEl    = document.querySelector("[data-calendar-grid]");
  const slotEl    = document.querySelector("[data-slot-list]");
  const selDateEl = document.querySelector("[data-calendar-selected]");
  const apptDateEl= document.querySelector("[data-appointment-date]");
  const apptSlotEl= document.querySelector("[data-appointment-slot]");
  const hidDate   = document.getElementById("selectedDate");
  const hidSlot   = document.getElementById("selectedSlot");
  const prevBtn   = document.querySelector("[data-calendar-nav='prev']");
  const nextBtn   = document.querySelector("[data-calendar-nav='next']");

  if (!monthEl || !gridEl) return null;

  const today = startOfDay(new Date());
  let month   = new Date(today.getFullYear(), today.getMonth(), 1);
  let selDate = null;
  let selSlot = "";

  function syncSummary() {
    const dict = t[currentLang] || t.fr;
    if (selDate) {
      const fmt = fmtDate(selDate, currentLang);
      apptDateEl && (apptDateEl.textContent = fmt);
      selDateEl  && (selDateEl.textContent  = fmt);
      hidDate    && (hidDate.value = selDate.toISOString().slice(0,10));
    } else {
      apptDateEl && (apptDateEl.textContent = dict.text["booking.info.dateEmpty"]);
      selDateEl  && (selDateEl.textContent  = dict.text["booking.slots.empty"]);
      hidDate    && (hidDate.value = "");
    }
    if (selSlot) {
      apptSlotEl && (apptSlotEl.textContent = selSlot);
      hidSlot    && (hidSlot.value = selSlot);
    } else {
      apptSlotEl && (apptSlotEl.textContent = dict.text["booking.info.slotEmpty"]);
      hidSlot    && (hidSlot.value = "");
    }
  }

  function renderSlots() {
    if (!slotEl) return;
    const dict = t[currentLang] || t.fr;
    slotEl.innerHTML = "";
    if (!selDate) {
      slotEl.innerHTML = `<p class="slot-empty">${dict.text["booking.slots.empty"]}</p>`;
      syncSummary(); return;
    }
    const slots = slotsFor(selDate);
    if (!slots.length) {
      slotEl.innerHTML = `<p class="slot-empty">${dict.text["booking.slots.none"]}</p>`;
      syncSummary(); return;
    }
    slots.forEach(s => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "slot-button" + (s === selSlot ? " is-selected" : "");
      btn.textContent = s;
      btn.addEventListener("click", () => { selSlot = s; renderSlots(); });
      slotEl.appendChild(btn);
    });
    syncSummary();
  }

  function renderCal() {
    if (!monthEl || !gridEl || !wdEl) return;
    monthEl.textContent = fmtMonth(month, currentLang);
    if (prevBtn) prevBtn.disabled = month.getFullYear() === today.getFullYear() && month.getMonth() === today.getMonth();

    wdEl.innerHTML = "";
    weekdays(currentLang).forEach(w => {
      const s = document.createElement("span"); s.textContent = w; wdEl.appendChild(s);
    });

    gridEl.innerHTML = "";
    const first  = new Date(month.getFullYear(), month.getMonth(), 1);
    const last   = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const offset = (first.getDay() + 6) % 7;
    const cells  = Math.ceil((offset + last.getDate()) / 7) * 7;

    for (let i = 0; i < cells; i++) {
      const cd   = new Date(month.getFullYear(), month.getMonth(), i - offset + 1);
      const inM  = cd.getMonth() === month.getMonth();
      const past = startOfDay(cd) < today;
      const noSl = slotsFor(cd).length === 0;
      const dis  = !inM || past || noSl;
      const isT  = cd.getTime() === today.getTime();
      const isSel= selDate && cd.getTime() === selDate.getTime();

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "calendar-day";
      btn.textContent = cd.getDate();
      btn.disabled = dis;
      if (!inM) btn.classList.add("is-muted");
      if (isT)  btn.classList.add("is-today");
      if (isSel)btn.classList.add("is-selected");
      btn.setAttribute("aria-label", fmtDate(cd, currentLang));

      if (!dis) {
        btn.addEventListener("click", () => {
          selDate = startOfDay(cd);
          if (!slotsFor(selDate).includes(selSlot)) selSlot = "";
          renderCal(); renderSlots();
        });
      }
      gridEl.appendChild(btn);
    }
  }

  prevBtn && prevBtn.addEventListener("click", () => {
    if (!prevBtn.disabled) { month = new Date(month.getFullYear(), month.getMonth() - 1, 1); renderCal(); }
  });
  nextBtn && nextBtn.addEventListener("click", () => {
    month = new Date(month.getFullYear(), month.getMonth() + 1, 1); renderCal();
  });

  rerenderCal = () => { renderCal(); renderSlots(); };
  renderCal(); renderSlots();

  return {
    hasSelection() { return !!(hidDate && hidDate.value && hidSlot && hidSlot.value); },
    reset() { selDate = null; selSlot = ""; month = new Date(today.getFullYear(), today.getMonth(), 1); renderCal(); renderSlots(); }
  };
}

/* ============================================================
   REVIEWS SLIDER
   ============================================================ */
function initReviewsSlider() {
  const wrap    = document.getElementById("reviewsSlider");
  const track   = document.getElementById("reviewsTrack");
  const dotsEl  = document.getElementById("reviewsDots");
  const prevBtn = document.getElementById("reviewsPrev");
  const nextBtn = document.getElementById("reviewsNext");
  if (!track) return;

  const cards = Array.from(track.children);
  let perView = 3;
  let current = 0;
  let total   = 0;
  let timer   = null;

  function getPerView() {
    return window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
  }

  function setLayout() {
    const containerW = track.parentElement.offsetWidth;
    perView = getPerView();
    const gap = parseFloat(getComputedStyle(track).gap) || 22;
    const w   = (containerW - (perView - 1) * gap) / perView;
    cards.forEach(c => { c.style.flex = `0 0 ${w}px`; });
    total   = Math.ceil(cards.length / perView);
    current = Math.min(current, total - 1);
  }

  function buildDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const d = document.createElement("button");
      d.className = "reviews-dot" + (i === current ? " is-active" : "");
      d.setAttribute("aria-label", `Page ${i + 1}`);
      d.addEventListener("click", () => { stopAuto(); goTo(i); startAuto(); });
      dotsEl.appendChild(d);
    }
  }

  function updateDots() {
    dotsEl && dotsEl.querySelectorAll(".reviews-dot").forEach((d, i) =>
      d.classList.toggle("is-active", i === current)
    );
  }

  function goTo(idx) {
    current = ((idx % total) + total) % total;
    const gap    = parseFloat(getComputedStyle(track).gap) || 22;
    const cardW  = cards[0].offsetWidth;
    track.style.transform = `translateX(-${current * perView * (cardW + gap)}px)`;
    updateDots();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() { timer = setInterval(next, 5000); }
  function stopAuto()  { clearInterval(timer); }

  prevBtn && prevBtn.addEventListener("click", () => { stopAuto(); prev(); startAuto(); });
  nextBtn && nextBtn.addEventListener("click", () => { stopAuto(); next(); startAuto(); });

  if (wrap) {
    wrap.addEventListener("mouseenter", stopAuto);
    wrap.addEventListener("mouseleave", startAuto);
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { setLayout(); buildDots(); goTo(current); }, 120);
  });

  setLayout();
  buildDots();
  goTo(0);
  startAuto();
}

/* ============================================================
   INTRO ANIMATION
   ============================================================ */
function initIntro() {
  const el      = document.getElementById("intro");
  const wordmark = document.getElementById("introWordmark");
  if (!el) return;

  // Build letter-by-letter wordmark via JS
  if (wordmark) {
    "GRUISSAN".split("").forEach((char, i) => {
      const wrap  = document.createElement("span");
      wrap.className = "intro-cw";
      const inner = document.createElement("span");
      inner.className = "intro-c";
      inner.style.setProperty("--i", i);
      inner.textContent = char;
      wrap.appendChild(inner);
      wordmark.appendChild(wrap);
    });
  }

  // Dismiss: start slide-up at 1.85s
  setTimeout(() => {
    el.classList.add("is-out");
    // Remove from DOM after transition ends
    el.addEventListener("transitionend", () => {
      el.remove();
    }, { once: true });
  }, 1850);
}

/* ============================================================
   INIT
   ============================================================ */
initIntro();

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

initMenu();
initReveal();
initReviewsSlider();
highlightToday();

document.querySelectorAll("[data-lang]").forEach(btn => {
  btn.addEventListener("click", () => {
    currentLang = btn.dataset.lang;
    localStorage.setItem("site-lang", currentLang);
    applyLang(currentLang);
    highlightToday();
  });
});

applyLang(currentLang);
