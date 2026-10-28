import { site } from "../data/site.ts";
import type { Dict } from "./en.ts";

/** Copy en français. Même structure que en.ts — à faire relire par un natif. */

const { year } = site.campaign;
const prep = "février";
const opening = "avril";

export const fr: Dict = {
  lang: "fr",
  langName: "Français",

  meta: {
    title: "Entreprise d'exportation de noix de cajou à Bissau | Bafata Agri",
    description:
      "Bafata Agri Resources, entreprise d'exportation de noix de cajou (anacarde) à Bissau, Guinée-Bissau : achat, contrôle qualité, documents et expédition.",
    ogAlt: "Sacs de noix de cajou brutes chargés au port de Bissau, Guinée-Bissau",
    ogLocale: "fr_FR",
  },

  campaign: { prep, opening },

  ui: {
    skip: "Aller au contenu principal",
    backToTop: "retour en haut",
    sections: "Sections",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    buyingRequest: "Demande d'achat",
    language: "Langue",
    home: "Accueil",
    guides: "Guides acheteurs",
    englishOnly: "(en anglais)",
    updated: "Mis à jour",
  },

  nav: [
    { label: "Origine", id: "origin" },
    { label: "Opérations", id: "operation" },
    { label: "Parcours", id: "journey" },
    { label: "Qualité", id: "quality" },
    { label: "Marchés", id: "markets" },
    { label: "Galerie", id: "gallery" },
    { label: "Contact", id: "contact" },
  ],

  hero: {
    pill: `Campagne ${year} : la préparation ouvre en ${prep}`,
    headline: ["Noix de cajou brutes", "de Guinée-Bissau."],
    lead: "Bafata Agri Resources est une entreprise d'exportation de noix de cajou brutes (anacarde) basée à Bissau, en Guinée-Bissau. Nous achetons, contrôlons, documentons et expédions la RCN pour les acheteurs internationaux — des régions de production jusqu'au navire, au port de Bissau.",
    primaryCta: "Faire une demande d'achat",
    secondaryCta: "Nous écrire sur WhatsApp",
    meta: [
      { k: "Coordonnées", v: "11°51′N · 15°35′O" },
      { k: "Siège", v: "Bissau, Guinée-Bissau" },
      { k: "Ouverture de campagne", v: `${opening} ${year}` },
    ],
  },

  origin: {
    heading: ["Achat de noix de cajou brutes", "en Guinée-Bissau"],
    body: [
      "La Guinée-Bissau est l'un des plus grands exportateurs mondiaux de noix de cajou brutes, et le cajou est le pilier de son économie. La récolte provient de petits vergers familiaux à Bafatá, Gabú, Oio, Quinara et Cacheu, et la campagne officielle ouvre chaque année une fois que le gouvernement a fixé le prix de référence.",
      "Ce qui manque à cette origine, c'est un interlocuteur simple. Les vendeurs sont dispersés, les formalités sont locales et le port a son propre rythme. C'est précisément ce fossé que nous comblons.",
    ],
    stats: [
      { value: `${opening} ${year}`, label: "Ouverture officielle de la campagne", note: `Préparation et réservation de volumes dès ${prep}` },
      { value: "46–52 lbs", label: "Outturn typique (KOR)", note: "Confirmé lot par lot avant expédition" },
      { value: "8–10 %", label: "Humidité typique", note: "Mesurée au pont-bascule, pas estimée" },
      { value: "180–200", label: "Calibre (noix par kg)", note: "Classé à l'arrivée à l'entrepôt" },
    ],
    disclaimer:
      "Ces fourchettes reflètent ce que l'origine Guinée-Bissau livre habituellement sur une campagne. Chaque lot est expédié avec sa propre analyse — jamais sur la foi d'un chiffre de brochure.",
    mapAlt: (regions: string) =>
      `Carte de la Guinée-Bissau. Bissau est indiquée sur la côte atlantique ; les régions d'achat de cajou mises en évidence sont ${regions}.`,
    mapLegend: "Régions où nous achetons",
    boundaries: "Frontières",
  },

  operation: {
    heading: ["Un partenaire export local", "pour les acheteurs de cajou"],
    body: "Acheter du cajou brut dans une nouvelle origine, c'est d'habitude recruter un agent, trouver un entrepôt, discuter des poids et apprendre un régime douanier. Nous avons bâti cette infrastructure campagne après campagne pour que vous n'ayez pas à le faire.",
    capabilities: [
      { title: "Sourcing", text: "Nous identifions et vérifions les vendeurs dans les régions de production et négocions pour vous." },
      { title: "Contreparties vérifiées", text: "Aucun intermédiaire anonyme. Chaque vendeur que nous vous présentons, nous l'avons visité." },
      { title: "Contrôle qualité et humidité", text: "Outturn, humidité et calibre vérifiés avant qu'un lot n'entre dans votre expédition." },
      { title: "Pesée certifiée", text: "Les camions chargés passent sur un pont-bascule certifié. Vous recevez le ticket, pas une promesse." },
      { title: "Entreposage", text: "Stockage couvert pendant la constitution et la préparation de votre lot." },
      { title: "Documents d'export", text: "Phytosanitaire, certificat d'origine, dédouanement, connaissement." },
      { title: "Port et navire", text: "Empotage, transport jusqu'au terminal et supervision du chargement au port de Bissau." },
      { title: "Suivi", text: "Un seul interlocuteur, de la première demande à l'arrivée dans votre port de déchargement." },
    ],
  },

  journey: {
    heading: "Du sourcing du cajou à l'expédition",
    lead: "Huit étapes, chacune documentée. Voici ce qui se passe entre le verger d'un producteur à Bafatá et le navire qui quitte le port de Bissau.",
    stage: (n: number, total: number) => `Étape ${n} sur ${total}`,
    steps: [
      { title: "Acheter", sub: "Régions de production", text: "Nous achetons sur les marchés et bord champ à Bafatá, Gabú, Oio et Quinara — là où la récolte se trouve vraiment.", photo: "bissau-street-pickup-3" },
      { title: "Collecter", sub: "Ensachage et regroupement", text: "Les noix sont ensachées en jute, 80 kg net, et regroupées en lots assez grands pour être transportés de façon rentable.", photo: "warehouse-carry-bag" },
      { title: "Contrôler", sub: "Classement et humidité", text: "Chaque lot passe un test de coupe pour l'outturn, un contrôle d'humidité et un comptage au kilo avant d'être accepté.", photo: "warehouse-stack-crew" },
      { title: "Peser", sub: "Pont-bascule certifié", text: "Chaque camion chargé est pesé sur un pont certifié. Brut, tare et net figurent sur un ticket qui accompagne le lot.", photo: "weighbridge-weighing" },
      { title: "Stocker", sub: "Entrepôt", text: "Un stockage couvert et ventilé garde l'humidité stable pendant la constitution de votre expédition.", photo: "warehouse-bulk-store" },
      { title: "Documenter", sub: "Dossier d'export", text: "Certificat phytosanitaire, certificat d'origine, déclaration en douane, facture, liste de colisage, connaissement.", photo: "weighbridge-ticket" },
      { title: "Transporter", sub: "Jusqu'au port", text: "Des convois bâchés relient l'entrepôt au terminal, suivis du départ jusqu'à l'entrée au port.", photo: "truck-tarped-load" },
      { title: "Charger", sub: "Port de Bissau", text: "Élingage, grutage et arrimage supervisés sur le quai jusqu'à la fermeture de la cale.", photo: "vessel-hold-loaded" },
    ],
  },

  quality: {
    heading: ["Contrôle qualité du cajou brut", "avant l'expédition"],
    lead: "Le meilleur lot de Guinée-Bissau ne vaut rien pour vous s'il est pesé approximativement ou mal séché. Nous mesurons d'abord, nous expédions ensuite.",
    tableCaption:
      "Paramètres qualité du cajou brut : objectif contractuel, fourchette habituelle du marché et fourchette de nos lots",
    table: {
      head: ["Paramètre", "Objectif", "Marché", "Nos lots"],
      rows: [
        { param: "Outturn (KOR)", target: "≥ 48 lbs", market: "44–48 lbs", ours: "46–52 lbs" },
        { param: "Humidité", target: "≤ 10 %", market: "10–14 %", ours: "8–10 %" },
        { param: "Calibre (noix / kg)", target: "≤ 200", market: "195–215", ours: "180–200" },
        { param: "Noix défectueuses", target: "≤ 10 %", market: "10–15 %", ours: "6–10 %" },
        { param: "Corps étrangers", target: "≤ 1 %", market: "1–3 %", ours: "< 1 %" },
      ],
    },
    points: [
      { title: "Mesuré, pas estimé", text: "Humidimètres et tests de coupe sur chaque lot — résultats enregistrés avant acceptation." },
      { title: "Pesé sur un pont certifié", text: "Brut, tare et net sur un ticket officiel qui accompagne votre expédition." },
      { title: "Stocké au sec", text: "Entreposage couvert et ventilé pour que l'humidité ne remonte pas entre l'achat et l'empotage." },
      { title: "Documenté par lot", text: "Vous recevez l'analyse des noix que vous achetez réellement." },
    ],
    claim:
      "Notre objectif à chaque campagne est simple : la meilleure qualité et l'humidité la plus basse disponibles sur le marché bissau-guinéen.",
  },

  paperwork: {
    heading: ["Documents d'export de Guinée-Bissau,", "gérés par une seule équipe"],
    body: "Exporter depuis la Guinée-Bissau implique plusieurs administrations, chacune avec ses délais. Nous tenons le dossier, relançons les signatures et vous envoyons chaque document dès qu'il est émis — rien n'est découvert à la dernière minute.",
    ask: "Poser une question sur un document",
    docs: [
      { title: "Licence d'exportation", text: "Enregistrement et autorisation de campagne auprès de l'autorité compétente." },
      { title: "Certificat phytosanitaire", text: "Inspection et certification sanitaire des végétaux pour le pays de destination." },
      { title: "Certificat d'origine", text: "Certification de l'origine Guinée-Bissau par la Chambre de commerce." },
      { title: "Déclaration en douane", text: "Déclaration, droits et dédouanement gérés par notre commissionnaire agréé." },
      { title: "Analyse qualité", text: "Rapport d'outturn, d'humidité et de défauts joint à votre lot." },
      { title: "Tickets de pesée", text: "Brut / tare / net certifiés pour chaque camion de votre expédition." },
      { title: "Facture commerciale et liste de colisage", text: "Établies pour correspondre exactement au libellé de votre L/C ou de votre contrat." },
      { title: "Connaissement", text: "Émis après chargement et remis selon les conditions de paiement convenues." },
    ],
    note: "Nous envoyons le jeu complet de documents en un seul dossier indexé. Si votre banque ou votre transitaire exige un libellé précis, dites-le-nous avant le chargement et nous construisons le dossier en conséquence.",
  },

  markets: {
    heading: ["Exportations de cajou brut", "depuis le port de Bissau"],
    body: "Le cajou brut de Guinée-Bissau alimente les grands centres de transformation. Nous expédions depuis le port de Bissau vers les destinations où travaillent nos acheteurs, selon l'Incoterm de votre choix.",
    incotermsLabel: "Incoterms pratiqués",
    mapLabel: (cities: string) => `Routes maritimes du port de Bissau vers ${cities}`,
    routes: [
      { id: "india", city: "Kollam · Mangalore · Panruti", country: "Inde" },
      { id: "vietnam", city: "Binh Phuoc · Long An", country: "Vietnam" },
      { id: "uae", city: "Dubaï", country: "Émirats arabes unis" },
    ],
  },

  pillars: {
    heading: "Pourquoi les acheteurs de cajou travaillent avec nous",
    items: [
      { title: "Présence locale", text: "Nous sommes à Bissau toute l'année, pas seulement le temps de la campagne. Nous connaissons les vendeurs, les entrepôts et les équipes du port.", photo: "bissau-founder-monument" },
      { title: "Un seul partenaire opérationnel", text: "Sourcing, qualité, pesée, documents, transport et chargement passent par une seule équipe — personne ne peut se renvoyer la balle.", photo: "team-fleet-portrait" },
      { title: "Transparence", text: "Tickets de pesée, rapports d'analyse et photos de votre lot réel. Vous voyez ce que vous achetez avant le départ.", photo: "weighbridge-second-pass" },
      { title: "Culture internationale", text: "Nous travaillons selon votre contrat, votre Incoterm et le libellé exigé par votre banque. Nous parlons votre processus, pas seulement le nôtre.", photo: "port-dual-cranes" },
    ],
  },

  howToBuy: {
    heading: "Comment acheter des noix de cajou brutes de Guinée-Bissau",
    lead: "Six étapes du premier message à l'arrivée. Nous répondons à chaque demande sous un jour ouvré.",
    steps: [
      { title: "Dites-nous ce qu'il vous faut", text: "Volume en tonnes, port de destination, Incoterm, spécification cible et période d'expédition." },
      { title: "Recevez notre offre", text: "Un prix ferme avec la spécification sur laquelle nous nous engageons, et la liste des documents fournis." },
      { title: "Contrat", text: "Nous signons votre contrat ou émettons le nôtre, et convenons des conditions de paiement — L/C, CAD ou une structure adaptée aux deux parties." },
      { title: "Achat et contrôle", text: "Nous achetons, classons et pesons votre lot, et vous envoyons analyses et photos au fil de sa constitution." },
      { title: "Documentation", text: "Le dossier d'export complet est constitué et partagé avant le départ du navire — aucune surprise à la banque." },
      { title: "Chargement et suivi", text: "L'empotage et le chargement sont supervisés sur le quai, et nous vous accompagnons jusqu'au déchargement." },
    ],
  },

  gallery: {
    heading: "Notre activité d'export de cajou à Bissau",
    prev: "Photos précédentes",
    next: "Photos suivantes",
  },

  facts: {
    heading: "Bafata Agri Resources en bref",
    lead: "L'essentiel de ce que demandent les acheteurs pour qualifier un nouveau fournisseur de cajou en Guinée-Bissau.",
    rows: {
      company: "Société",
      activity: "Activité",
      activityValue: "Achat et exportation de noix de cajou brutes (RCN)",
      base: "Siège",
      regions: "Régions d'achat",
      port: "Port d'export",
      portValue: "Port de Bissau",
      campaign: "Campagne",
      campaignValue: `Préparation dès ${prep} ${year} ; ouverture officielle en ${opening} ${year}`,
      incoterms: "Incoterms",
      destinations: "Destinations",
      contact: "Contact",
    },
  },

  faq: {
    heading: "Questions sur l'export de cajou brut",
    items: [
      {
        q: "Que fait Bafata Agri Resources ?",
        a: "Bafata Agri Resources, SARL est une société d'exportation de noix de cajou brutes (RCN) basée à Bissau, en Guinée-Bissau. Nous aidons les acheteurs internationaux à trouver des vendeurs de cajou vérifiés, contrôlons la qualité et l'humidité, gérons les documents d'export et coordonnons l'expédition du port de Bissau jusqu'au port de destination de l'acheteur.",
      },
      {
        q: "Quelles entreprises exportent la noix de cajou à Bissau, en Guinée-Bissau ?",
        a: "Les noix de cajou brutes (anacarde) de Guinée-Bissau sont exportées par des sociétés exportatrices agréées basées à Bissau, qui achètent auprès de petits producteurs dans tout le pays et expédient par le port de Bissau. Bafata Agri Resources, SARL est l'un de ces exportateurs : une société basée à Bissau qui achète, contrôle, documente et expédie la RCN pour les acheteurs internationaux.",
      },
      {
        q: "Où pousse le cajou en Guinée-Bissau ?",
        a: "Le cajou est cultivé par de petits producteurs dans la majeure partie de la Guinée-Bissau. Bafata Agri Resources achète dans les régions de Bafatá, Gabú, Oio, Quinara et Cacheu, puis regroupe les lots avant de les acheminer par camion jusqu'au port de Bissau.",
      },
      {
        q: "Quand commence la campagne de cajou en Guinée-Bissau ?",
        a: `La campagne officielle de cajou brut en Guinée-Bissau ouvre une fois que le gouvernement a fixé le prix de référence — pour ${year}, en ${opening} ${year}, quand les achats commencent dans les villages. La préparation ouvre plus tôt, en ${prep} ${year} : réservation de volumes, organisation logistique et cadrage des contrats. Les acheteurs qui attendent l'ouverture négocient ce qui reste.`,
      },
      {
        q: "Quelle qualité de noix de cajou brutes produit la Guinée-Bissau ?",
        a: "La RCN de Guinée-Bissau offre habituellement un outturn (KOR) de 46 à 52 lbs, une humidité de 8 à 10 %, un calibre de 180 à 200 noix par kilo et moins de 10 % de défauts. Chaque lot que nous expédions passe un test de coupe et un contrôle d'humidité, et l'analyse accompagne l'expédition.",
      },
      {
        q: "Que signifient KOR, outturn et calibre pour le cajou brut ?",
        a: "L'outturn, ou KOR (kernel outturn ratio), est le poids en livres d'amande utilisable obtenu à partir d'un sac de 80 kg de noix brutes — plus il est élevé, mieux c'est. Le calibre (nut count) est le nombre de noix par kilo — plus il est bas, plus les noix sont grosses. L'humidité est la teneur en eau des noix ; une humidité basse garde le lot stable pendant le stockage et le transport.",
      },
      {
        q: "De quel port partent les noix de cajou de Guinée-Bissau ?",
        a: "Les exportations de cajou brut de Guinée-Bissau partent du port de Bissau. Bafata Agri Resources achemine les lots de l'entrepôt au terminal et supervise l'empotage et le chargement sur le quai.",
      },
      {
        q: "Quels documents d'export fournissez-vous ?",
        a: "Licence d'exportation, certificat phytosanitaire, certificat d'origine, déclaration en douane, rapport d'analyse qualité, tickets de pesée certifiés, facture commerciale, liste de colisage et connaissement. Nous réunissons le tout en un dossier indexé et pouvons reprendre le libellé exigé par votre banque ou votre transitaire.",
      },
      {
        q: "Quels Incoterms pratiquez-vous et vers où expédiez-vous ?",
        a: "Nous expédions en FOB Bissau, FAS, CFR et CIF. Nos acheteurs sont des transformateurs et importateurs de cajou en Inde, au Vietnam et aux Émirats arabes unis.",
      },
      {
        q: "Faut-il une société ou une licence d'export en Guinée-Bissau pour acheter chez vous ?",
        a: "Non. Lorsqu'un acheteur ne souhaite pas créer de société locale ni obtenir de licence d'exportation, Bafata Agri Resources peut organiser l'export en son propre nom, sous réserve de validation contractuelle et réglementaire.",
      },
      {
        q: "Quelles conditions de paiement acceptez-vous ?",
        a: "Nous convenons des conditions de paiement contrat par contrat — généralement une lettre de crédit (L/C) ou un paiement contre documents (CAD), ou une autre structure qui convient aux deux parties. Le dossier documentaire est préparé selon le libellé de votre banque.",
      },
      {
        q: "Quelle est la quantité minimum de commande ?",
        a: "Nous travaillons par conteneurs complets et par lots navire. Indiquez-nous votre volume cible en tonnes et votre port de destination, et nous vous confirmerons ce qui est réalisable pour votre période d'expédition.",
      },
      {
        q: "Comment commencer ?",
        a: `Écrivez-nous sur WhatsApp au ${site.phoneDisplay} ou envoyez une demande d'achat depuis cette page avec votre volume, votre port de destination et votre Incoterm. Nous répondons sous un jour ouvré et envoyons une offre dès que la spécification et le volume sont confirmés.`,
      },
    ],
  },

  cta: {
    heading: ["Vous cherchez des noix de cajou brutes", "de Guinée-Bissau ?"],
    body: `La préparation de la campagne ${year} ouvre en ${prep} ; les achats officiels commencent en ${opening}. Les acheteurs qui nous contactent maintenant réservent leurs volumes et fixent leurs conditions avant que l'origine ne s'emballe. Écrivez-nous — nous répondons personnellement.`,
    phoneLabel: "WhatsApp et téléphone",
    emailLabel: "E-mail",
    officeLabel: "Bureau",
    office: "Bissau, Guinée-Bissau",
    form: {
      title: "Demande d'achat",
      subtitle: "Nous répondons sous un jour ouvré.",
      optional: "facultatif",
      choose: "Choisir",
      notSure: "Je ne sais pas encore",
      fields: {
        name: "Nom complet",
        company: "Société",
        email: "E-mail",
        country: "Pays de destination",
        volume: "Volume souhaité (t)",
        port: "Port de destination",
        incoterm: "Incoterm",
        window: "Période d'expédition",
        message: "Autre chose à nous dire",
      },
      placeholders: {
        volume: "ex. 500",
        port: "ex. Nhava Sheva",
        window: `ex. ${opening}–mai ${year}`,
      },
      submit: "Envoyer ma demande d'achat",
      note: "L'envoi ouvre WhatsApp avec votre demande pré-remplie, pour qu'elle nous parvienne immédiatement.",
      sentTitle: "Votre demande est prête dans WhatsApp",
      sentBody: "Appuyez sur envoyer dans WhatsApp et elle nous parvient à Bissau. Si l'application ne s'est pas ouverte, écrivez-nous directement.",
      openWhatsApp: "Ouvrir WhatsApp",
      edit: "Modifier ma demande",
      messageTitle: "Nouvelle demande d'achat — noix de cajou brutes, Guinée-Bissau",
      messageLabels: {
        name: "Nom",
        company: "Société",
        email: "E-mail",
        country: "Pays de destination",
        volume: "Volume (t)",
        port: "Port de destination",
        incoterm: "Incoterm",
        window: "Période d'expédition",
        message: "Notes",
      },
      sentFrom: "Envoyé depuis",
    },
  },

  wa: {
    general: "Bonjour Bafata Agri Resources — je vous ai trouvés via votre site et j'aimerais parler de noix de cajou brutes de Guinée-Bissau.",
    documents: "Bonjour Bafata Agri Resources — j'ai une question sur les documents d'export de noix de cajou brutes de Guinée-Bissau.",
  },

  footer: {
    navigate: "Navigation",
    contact: "Contact",
    address: "Bissau, Guinée-Bissau, Afrique de l'Ouest",
    legal: "Exportation de noix de cajou brutes, Guinée-Bissau.",
  },
};
