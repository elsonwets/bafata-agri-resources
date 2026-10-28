import { site } from "../data/site.ts";
import type { Dict } from "./en.ts";

/** Texto em português. Mesma estrutura que en.ts — a rever por um falante nativo. */

const { year } = site.campaign;
const prep = "fevereiro";
const opening = "abril";

export const pt: Dict = {
  lang: "pt",
  langName: "Português",

  meta: {
    title: "Empresa de exportação de caju em Bissau | Bafata Agri Resources",
    description:
      "Bafata Agri Resources, empresa exportadora de castanha de caju em Bissau, Guiné-Bissau: compra, controlo de qualidade, documentos e embarque.",
    ogAlt: "Sacos de castanha de caju bruta a serem carregados no porto de Bissau, Guiné-Bissau",
    ogLocale: "pt_PT",
  },

  campaign: { prep, opening },

  ui: {
    skip: "Ir para o conteúdo principal",
    backToTop: "voltar ao topo",
    sections: "Secções",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    buyingRequest: "Pedido de compra",
    language: "Idioma",
    home: "Início",
    guides: "Guias para compradores",
    englishOnly: "(em inglês)",
    updated: "Atualizado",
  },

  nav: [
    { label: "Origem", id: "origin" },
    { label: "Operação", id: "operation" },
    { label: "Percurso", id: "journey" },
    { label: "Qualidade", id: "quality" },
    { label: "Mercados", id: "markets" },
    { label: "Galeria", id: "gallery" },
    { label: "Contacto", id: "contact" },
  ],

  hero: {
    pill: `Campanha ${year}: a preparação abre em ${prep}`,
    headline: ["Castanha de caju bruta", "da Guiné-Bissau."],
    lead: "A Bafata Agri Resources é uma empresa exportadora de castanha de caju bruta sediada em Bissau, na Guiné-Bissau. Compramos, controlamos, documentamos e embarcamos RCN para compradores internacionais — das regiões produtoras até ao navio, no porto de Bissau.",
    primaryCta: "Fazer um pedido de compra",
    secondaryCta: "Falar connosco no WhatsApp",
    meta: [
      { k: "Coordenadas", v: "11°51′N · 15°35′O" },
      { k: "Sede", v: "Bissau, Guiné-Bissau" },
      { k: "Abertura da campanha", v: `${opening} de ${year}` },
    ],
  },

  origin: {
    heading: ["Compra de castanha de caju bruta", "na Guiné-Bissau"],
    body: [
      "A Guiné-Bissau é um dos maiores exportadores mundiais de castanha de caju bruta, e o caju é o pilar da sua economia. A colheita vem de pequenos pomares familiares em Bafatá, Gabú, Oio, Quinara e Cacheu, e a campanha oficial abre todos os anos depois de o governo fixar o preço de referência.",
      "O que esta origem não tem é um interlocutor simples. Os vendedores estão dispersos, a documentação é local e o porto tem o seu próprio ritmo. É exatamente essa lacuna que existimos para preencher.",
    ],
    stats: [
      { value: `${opening} ${year}`, label: "Abertura oficial da campanha", note: `Preparação e reserva de volumes a partir de ${prep}` },
      { value: "46–52 lbs", label: "Outturn típico (KOR)", note: "Confirmado lote a lote antes do embarque" },
      { value: "8–10%", label: "Humidade típica", note: "Medida na báscula, não estimada" },
      { value: "180–200", label: "Calibre (castanhas por kg)", note: "Classificado à chegada ao armazém" },
    ],
    disclaimer:
      "Estes intervalos refletem o que a origem Guiné-Bissau costuma entregar ao longo de uma campanha. Cada lote é embarcado com a sua própria análise — nunca com base num número de brochura.",
    mapAlt: (regions: string) =>
      `Mapa da Guiné-Bissau. Bissau está marcada na costa atlântica; as regiões de compra de caju destacadas são ${regions}.`,
    mapLegend: "Regiões onde compramos",
    boundaries: "Fronteiras",
  },

  operation: {
    heading: ["Um parceiro de exportação local", "para compradores de caju"],
    body: "Comprar caju bruto numa nova origem costuma significar contratar um agente, procurar um armazém, discutir pesos e aprender um regime aduaneiro. Construímos essa infraestrutura campanha após campanha para que não tenha de o fazer.",
    capabilities: [
      { title: "Compra", text: "Identificamos e verificamos vendedores nas regiões produtoras e negociamos por si." },
      { title: "Contrapartes verificadas", text: "Sem intermediários anónimos. Cada vendedor que lhe apresentamos foi visitado por nós." },
      { title: "Controlo de qualidade e humidade", text: "Outturn, humidade e calibre verificados antes de um lote entrar no seu embarque." },
      { title: "Pesagem certificada", text: "Os camiões carregados passam por uma báscula certificada. Recebe o talão, não uma promessa." },
      { title: "Armazenagem", text: "Armazenamento coberto enquanto o seu lote é consolidado e preparado." },
      { title: "Documentação de exportação", text: "Fitossanitário, certificado de origem, desalfandegamento, conhecimento de embarque." },
      { title: "Porto e navio", text: "Estufagem, transporte até ao terminal e supervisão do carregamento no porto de Bissau." },
      { title: "Acompanhamento", text: "Um único contacto, do primeiro pedido à chegada ao seu porto de descarga." },
    ],
  },

  journey: {
    heading: "Da compra do caju ao embarque",
    lead: "Oito etapas, todas documentadas. É isto que acontece entre o pomar de um produtor em Bafatá e o navio que sai do porto de Bissau.",
    stage: (n: number, total: number) => `Etapa ${n} de ${total}`,
    steps: [
      { title: "Comprar", sub: "Regiões produtoras", text: "Compramos nos mercados e à porta da exploração em Bafatá, Gabú, Oio e Quinara — onde a colheita realmente está.", photo: "bissau-street-pickup-3" },
      { title: "Recolher", sub: "Ensacamento e agregação", text: "A castanha é ensacada em juta, 80 kg líquidos, e agrupada em lotes grandes o suficiente para um transporte rentável.", photo: "warehouse-carry-bag" },
      { title: "Controlar", sub: "Classificação e humidade", text: "Cada lote passa por um teste de corte para o outturn, controlo de humidade e contagem por quilo antes de ser aceite.", photo: "warehouse-stack-crew" },
      { title: "Pesar", sub: "Báscula certificada", text: "Cada camião carregado é pesado numa báscula certificada. Bruto, tara e líquido constam de um talão que acompanha o lote.", photo: "weighbridge-weighing" },
      { title: "Armazenar", sub: "Armazém", text: "Um armazenamento coberto e ventilado mantém a humidade estável enquanto o seu embarque é consolidado.", photo: "warehouse-bulk-store" },
      { title: "Documentar", sub: "Processo de exportação", text: "Certificado fitossanitário, certificado de origem, declaração aduaneira, fatura, lista de embalagem, conhecimento de embarque.", photo: "weighbridge-ticket" },
      { title: "Transportar", sub: "Até ao porto", text: "Comboios com lona ligam o armazém ao terminal, acompanhados da partida até à entrada no porto.", photo: "truck-tarped-load" },
      { title: "Carregar", sub: "Porto de Bissau", text: "Lingagem, operação de grua e estiva supervisionadas no cais até ao fecho do porão.", photo: "vessel-hold-loaded" },
    ],
  },

  quality: {
    heading: ["Controlo de qualidade do caju bruto", "antes do embarque"],
    lead: "O melhor lote da Guiné-Bissau não vale nada para si se for pesado sem rigor ou mal seco. Medimos primeiro e embarcamos depois.",
    tableCaption:
      "Parâmetros de qualidade do caju bruto: objetivo contratual, intervalo habitual do mercado e intervalo dos nossos lotes",
    table: {
      head: ["Parâmetro", "Objetivo", "Mercado", "Os nossos lotes"],
      rows: [
        { param: "Outturn (KOR)", target: "≥ 48 lbs", market: "44–48 lbs", ours: "46–52 lbs" },
        { param: "Humidade", target: "≤ 10%", market: "10–14%", ours: "8–10%" },
        { param: "Calibre (castanhas / kg)", target: "≤ 200", market: "195–215", ours: "180–200" },
        { param: "Castanhas defeituosas", target: "≤ 10%", market: "10–15%", ours: "6–10%" },
        { param: "Matérias estranhas", target: "≤ 1%", market: "1–3%", ours: "< 1%" },
      ],
    },
    points: [
      { title: "Medido, não estimado", text: "Humidímetros e testes de corte em cada lote — resultados registados antes da aceitação." },
      { title: "Pesado numa báscula certificada", text: "Bruto, tara e líquido num talão oficial que acompanha o seu embarque." },
      { title: "Armazenado em seco", text: "Armazenagem coberta e ventilada para que a humidade não suba entre a compra e a estufagem." },
      { title: "Documentado por lote", text: "Recebe a análise das castanhas que está realmente a comprar." },
    ],
    claim:
      "O nosso objetivo em cada campanha é simples: a melhor qualidade e a humidade mais baixa disponíveis no mercado da Guiné-Bissau.",
  },

  paperwork: {
    heading: ["Documentação de exportação da Guiné-Bissau,", "tratada por uma só equipa"],
    body: "Exportar a partir da Guiné-Bissau envolve várias administrações, cada uma com os seus prazos. Gerimos o processo, acompanhamos as assinaturas e enviamos-lhe cada documento assim que é emitido — nada é descoberto à última hora.",
    ask: "Perguntar sobre um documento",
    docs: [
      { title: "Licença de exportação", text: "Registo e autorização de campanha junto da autoridade competente." },
      { title: "Certificado fitossanitário", text: "Inspeção e certificação fitossanitária para o país de destino." },
      { title: "Certificado de origem", text: "Certificação da origem Guiné-Bissau pela Câmara de Comércio." },
      { title: "Declaração aduaneira", text: "Declaração, direitos e desalfandegamento tratados pelo nosso despachante licenciado." },
      { title: "Análise de qualidade", text: "Relatório de outturn, humidade e defeitos anexado ao seu lote." },
      { title: "Talões de pesagem", text: "Bruto / tara / líquido certificados para cada camião do seu embarque." },
      { title: "Fatura comercial e lista de embalagem", text: "Emitidas para corresponder exatamente à redação da sua L/C ou do seu contrato." },
      { title: "Conhecimento de embarque", text: "Emitido após o carregamento e entregue segundo as condições de pagamento acordadas." },
    ],
    note: "Enviamos o conjunto completo de documentos num único processo indexado. Se o seu banco ou despachante exigir uma redação específica, diga-nos antes do carregamento e construímos o processo em conformidade.",
  },

  markets: {
    heading: ["Exportação de caju bruto", "a partir do porto de Bissau"],
    body: "O caju bruto da Guiné-Bissau abastece os grandes centros de processamento. Embarcamos a partir do porto de Bissau para os destinos onde os nossos compradores trabalham, no Incoterm da sua preferência.",
    incotermsLabel: "Incoterms com que trabalhamos",
    mapLabel: (cities: string) => `Rotas marítimas do porto de Bissau para ${cities}`,
    routes: [
      { id: "india", city: "Kollam · Mangalore · Panruti", country: "Índia" },
      { id: "vietnam", city: "Binh Phuoc · Long An", country: "Vietname" },
      { id: "uae", city: "Dubai", country: "Emirados Árabes Unidos" },
    ],
  },

  pillars: {
    heading: "Porque é que os compradores de caju trabalham connosco",
    items: [
      { title: "Presença local", text: "Estamos em Bissau todo o ano, não só durante a campanha. Conhecemos os vendedores, os armazéns e as equipas do porto.", photo: "bissau-founder-monument" },
      { title: "Um único parceiro operacional", text: "Compra, qualidade, pesagem, documentos, transporte e carregamento passam por uma só equipa — ninguém pode passar a responsabilidade a outro.", photo: "team-fleet-portrait" },
      { title: "Transparência", text: "Talões de pesagem, relatórios de análise e fotografias do seu lote real. Vê o que está a comprar antes da partida.", photo: "weighbridge-second-pass" },
      { title: "Mentalidade internacional", text: "Trabalhamos segundo o seu contrato, o seu Incoterm e a redação exigida pelo seu banco. Falamos o seu processo, não só o nosso.", photo: "port-dual-cranes" },
    ],
  },

  howToBuy: {
    heading: "Como comprar castanha de caju bruta da Guiné-Bissau",
    lead: "Seis etapas da primeira mensagem à chegada. Respondemos a cada pedido num dia útil.",
    steps: [
      { title: "Diga-nos o que precisa", text: "Volume em toneladas, porto de destino, Incoterm, especificação pretendida e período de embarque." },
      { title: "Receba a nossa oferta", text: "Um preço firme com a especificação com que nos comprometemos, e a lista de documentos que vai receber." },
      { title: "Contrato", text: "Assinamos o seu contrato ou emitimos o nosso, e acordamos as condições de pagamento — L/C, CAD ou uma estrutura adequada a ambas as partes." },
      { title: "Compra e controlo", text: "Compramos, classificamos e pesamos o seu lote, e enviamos-lhe análises e fotografias à medida que se forma." },
      { title: "Documentação", text: "O processo de exportação completo é preparado e partilhado antes da partida do navio — sem surpresas no banco." },
      { title: "Carregamento e acompanhamento", text: "A estufagem e o carregamento são supervisionados no cais, e acompanhamo-lo até à descarga." },
    ],
  },

  gallery: {
    heading: "A nossa operação de exportação de caju em Bissau",
    prev: "Fotografias anteriores",
    next: "Fotografias seguintes",
  },

  facts: {
    heading: "Bafata Agri Resources em resumo",
    lead: "O essencial que os compradores pedem para qualificar um novo fornecedor de caju na Guiné-Bissau.",
    rows: {
      company: "Empresa",
      activity: "Atividade",
      activityValue: "Compra e exportação de castanha de caju bruta (RCN)",
      base: "Sede",
      regions: "Regiões de compra",
      port: "Porto de exportação",
      portValue: "Porto de Bissau",
      campaign: "Campanha",
      campaignValue: `Preparação a partir de ${prep} de ${year}; abertura oficial em ${opening} de ${year}`,
      incoterms: "Incoterms",
      destinations: "Destinos",
      contact: "Contacto",
    },
  },

  faq: {
    heading: "Perguntas sobre a exportação de caju bruto",
    items: [
      {
        q: "O que faz a Bafata Agri Resources?",
        a: "A Bafata Agri Resources, SARL é uma empresa de exportação de castanha de caju bruta (RCN) sediada em Bissau, na Guiné-Bissau. Ajudamos compradores internacionais a encontrar vendedores de caju verificados, controlamos a qualidade e a humidade, tratamos da documentação de exportação e coordenamos o embarque do porto de Bissau até ao porto de destino do comprador.",
      },
      {
        q: "Que empresas exportam castanha de caju em Bissau, na Guiné-Bissau?",
        a: "A castanha de caju bruta da Guiné-Bissau é exportada por empresas exportadoras licenciadas sediadas em Bissau, que compram a pequenos produtores em todo o país e embarcam pelo porto de Bissau. A Bafata Agri Resources, SARL é uma dessas exportadoras: uma empresa sediada em Bissau que compra, controla, documenta e embarca RCN para compradores internacionais.",
      },
      {
        q: "Onde se cultiva o caju na Guiné-Bissau?",
        a: "O caju é cultivado por pequenos produtores na maior parte da Guiné-Bissau. A Bafata Agri Resources compra nas regiões de Bafatá, Gabú, Oio, Quinara e Cacheu e consolida os lotes antes de os transportar por camião até ao porto de Bissau.",
      },
      {
        q: "Quando começa a campanha do caju na Guiné-Bissau?",
        a: `A campanha oficial da castanha de caju bruta na Guiné-Bissau abre depois de o governo fixar o preço de referência — em ${year}, em ${opening} de ${year}, quando começam as compras nas aldeias. A preparação abre mais cedo, em ${prep} de ${year}: reserva de volumes, planeamento logístico e enquadramento dos contratos. Quem espera pela abertura negoceia o que sobra.`,
      },
      {
        q: "Que qualidade de castanha de caju bruta produz a Guiné-Bissau?",
        a: "A RCN da Guiné-Bissau apresenta habitualmente um outturn (KOR) de 46 a 52 lbs, humidade de 8 a 10%, um calibre de 180 a 200 castanhas por quilo e menos de 10% de defeitos. Cada lote que embarcamos passa por um teste de corte e um controlo de humidade, e a análise acompanha o embarque.",
      },
      {
        q: "O que significam KOR, outturn e calibre na castanha de caju bruta?",
        a: "O outturn, ou KOR (kernel outturn ratio), é o peso em libras de amêndoa aproveitável obtido de um saco de 80 kg de castanha bruta — quanto mais alto, melhor. O calibre (nut count) é o número de castanhas por quilo — quanto mais baixo, maiores as castanhas. A humidade é o teor de água das castanhas; uma humidade baixa mantém o lote estável no armazenamento e no transporte.",
      },
      {
        q: "De que porto sai o caju da Guiné-Bissau?",
        a: "As exportações de caju bruto da Guiné-Bissau saem do porto de Bissau. A Bafata Agri Resources transporta os lotes do armazém até ao terminal e supervisiona a estufagem e o carregamento no cais.",
      },
      {
        q: "Que documentos de exportação fornecem?",
        a: "Licença de exportação, certificado fitossanitário, certificado de origem, declaração aduaneira, relatório de análise de qualidade, talões de pesagem certificados, fatura comercial, lista de embalagem e conhecimento de embarque. Reunimos tudo num processo indexado e podemos seguir a redação exigida pelo seu banco ou despachante.",
      },
      {
        q: "Com que Incoterms trabalham e para onde embarcam?",
        a: "Embarcamos em FOB Bissau, FAS, CFR e CIF. Os nossos compradores são processadores e importadores de caju na Índia, no Vietname e nos Emirados Árabes Unidos.",
      },
      {
        q: "Preciso de uma empresa ou de uma licença de exportação na Guiné-Bissau para comprar convosco?",
        a: "Não. Quando um comprador não quer constituir empresa local nem obter licença de exportação, a Bafata Agri Resources pode organizar a exportação em seu próprio nome, sujeito a validação contratual e regulamentar.",
      },
      {
        q: "Que condições de pagamento aceitam?",
        a: "Acordamos as condições de pagamento contrato a contrato — normalmente uma carta de crédito (L/C) ou pagamento contra documentos (CAD), ou outra estrutura que convenha a ambas as partes. O conjunto de documentos é preparado segundo a redação do seu banco.",
      },
      {
        q: "Qual é a quantidade mínima de encomenda?",
        a: "Trabalhamos com contentores completos e lotes de navio. Indique-nos o volume pretendido em toneladas e o porto de destino, e confirmamos o que é viável para o seu período de embarque.",
      },
      {
        q: "Como começar?",
        a: `Envie-nos uma mensagem no WhatsApp para ${site.phoneDisplay} ou faça um pedido de compra nesta página com o volume, o porto de destino e o Incoterm. Respondemos num dia útil e enviamos uma oferta assim que a especificação e o volume estiverem confirmados.`,
      },
    ],
  },

  cta: {
    heading: ["Procura castanha de caju bruta", "da Guiné-Bissau?"],
    body: `A preparação da campanha de ${year} abre em ${prep}; as compras oficiais começam em ${opening}. Os compradores que falam connosco agora reservam volumes e acordam condições antes de a origem ficar sobrecarregada. Escreva-nos — respondemos pessoalmente.`,
    phoneLabel: "WhatsApp e telefone",
    emailLabel: "E-mail",
    officeLabel: "Escritório",
    office: "Bissau, Guiné-Bissau",
    form: {
      title: "Pedido de compra",
      subtitle: "Respondemos num dia útil.",
      optional: "opcional",
      choose: "Escolher",
      notSure: "Ainda não sei",
      fields: {
        name: "Nome completo",
        company: "Empresa",
        email: "E-mail",
        country: "País de destino",
        volume: "Volume pretendido (t)",
        port: "Porto de destino",
        incoterm: "Incoterm",
        window: "Período de embarque",
        message: "Mais alguma coisa que devamos saber",
      },
      placeholders: {
        volume: "ex. 500",
        port: "ex. Nhava Sheva",
        window: `ex. ${opening}–maio de ${year}`,
      },
      submit: "Enviar o meu pedido de compra",
      note: "Ao enviar, o WhatsApp abre com o seu pedido preenchido, para que nos chegue de imediato.",
      sentTitle: "O seu pedido está pronto no WhatsApp",
      sentBody: "Carregue em enviar no WhatsApp e o pedido chega-nos a Bissau. Se a aplicação não abriu, escreva-nos diretamente.",
      openWhatsApp: "Abrir o WhatsApp",
      edit: "Editar o meu pedido",
      messageTitle: "Novo pedido de compra — castanha de caju bruta, Guiné-Bissau",
      messageLabels: {
        name: "Nome",
        company: "Empresa",
        email: "E-mail",
        country: "País de destino",
        volume: "Volume (t)",
        port: "Porto de destino",
        incoterm: "Incoterm",
        window: "Período de embarque",
        message: "Notas",
      },
      sentFrom: "Enviado de",
    },
  },

  wa: {
    general: "Olá Bafata Agri Resources — encontrei-vos através do vosso site e gostaria de falar sobre castanha de caju bruta da Guiné-Bissau.",
    documents: "Olá Bafata Agri Resources — tenho uma pergunta sobre a documentação de exportação de castanha de caju bruta da Guiné-Bissau.",
  },

  footer: {
    navigate: "Navegação",
    contact: "Contacto",
    address: "Bissau, Guiné-Bissau, África Ocidental",
    legal: "Exportação de castanha de caju bruta, Guiné-Bissau.",
  },
};
