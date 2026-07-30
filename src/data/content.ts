export const wallTags = [
  ['Reels', '#2a2d52', 'reels.webp'], ['Carrusel', '#4a2e2a', 'carrusel.webp'], ['Campaña', '#2a4a3a', 'campana.webp'],
  ['Branding', '#52472a', 'branding.webp'], ['Cocktail', '#3a2a4a', 'cocktail.webp'], ['Deportes', '#2a3d52', 'deportes.webp'],
  ['Lanzamiento', '#522a3a', 'lanzamiento.webp'], ['Retail', '#2f3a2a', 'retail.webp'], ['Inmobiliaria', '#2a4a4a', 'inmobiliaria.webp'],
  ['Salud', '#3a3a52', 'salud.webp'], ['Gastronomía', '#4a3a2a', 'gastronomia.webp'], ['Eventos', '#2a2a4a', 'eventos.webp'],
] as [string, string, string | undefined][];

export const helpItems = [
  { title: 'Analizamos', desc: 'Estudiamos tu marca y tu mercado para definir la web y la presencia digital que necesitas.' },
  { title: 'Construimos', desc: 'Creamos una identidad gráfica sólida y coherente para tu marca.' },
  { title: 'Fidelizamos', desc: 'Retenemos a tus clientes con herramientas y plataformas web.' },
  { title: 'Convertimos', desc: 'Creamos contenidos visuales que captan la atención y convierten.' },
];

export const services = [
  {
    tag: 'Desarrollo a medida',
    title: 'Plataformas y proyectos web',
    desc: 'Diseño y desarrollo de páginas web a medida: landing pages, sitios corporativos y sistemas con panel de gestión, desde sitios web hasta aplicaciones y herramientas interactivas que facilitan la experiencia del usuario y optimizan la gestión de tu negocio.',
    image: 'web.webp',
  },
  {
    tag: 'Estrategia & contenido',
    title: 'Gestión de redes sociales',
    desc: 'Analizamos tu marca y el mercado para desarrollar planes personalizados que maximizan el impacto de cada campaña, ya sea en redes sociales o en otras plataformas digitales. Desde la creación de contenido hasta la comprensión de resultados, optimizamos cada paso para maximizar tu impacto digital.',
    image: 'redes-sociales.webp',
  },
  {
    tag: 'Identidad visual',
    title: 'Branding y diseño gráfico',
    desc: 'Creamos identidades visuales fuertes y coherentes que reflejan la esencia de tu marca, fortaleciendo el reconocimiento y la confianza de tus clientes. Nuestro equipo de diseñadores desarrolla piezas gráficas atractivas para todas tus necesidades online y offline.',
    image: 'branding.webp',
  },
  {
    tag: 'Video 2D · 3D · Motion',
    title: 'Producciones audiovisuales',
    desc: 'Organizamos contenidos audiovisuales profesionales que conectan emocionalmente con tu audiencia. Videos corporativos 2D y 3D, promocionales y animaciones que potencian tu storytelling y aumentan la visibilidad.',
    image: 'audiovisual.webp',
  },
  {
    tag: 'Consultoría continua',
    title: 'Asesoría y acompañamiento',
    desc: 'Proporcionamos asesoría personalizada para brindarte las tácticas más adecuadas que te permitan alcanzar tus objetivos. Nuestro equipo está a tu disposición para orientarte en cada fase del proceso y, si lo deseas, acompañarte en la ejecución.',
    image: 'asesoria.webp',
  },
];

export const paginasWebPlanes = [
  {
    nombre: 'Landing',
    precio: '$600',
    precioNota: 'pago único',
    resumen: 'Una sola página para que te contacten.',
    entrega: '3 días',
    mensualidad: '$50/mes',
    features: [
      'Hosting, dominio y SSL incluidos',
      'Respaldos periódicos',
      '2 cambios menores al mes',
    ],
    idealPara: 'Profesionales, campañas de pauta, un solo servicio',
    destacado: false,
  },
  {
    nombre: 'Web corporativa',
    precio: '$1.000',
    precioNota: 'pago único',
    resumen: 'Inicio + 4 secciones para mostrar tu empresa.',
    entrega: '15 días',
    mensualidad: '$50/mes',
    features: [
      'Todo lo de Landing',
      'Inicio + 4 secciones',
      'Diseño a medida para tu empresa',
    ],
    idealPara: 'Clínicas, restaurantes, inmobiliarias, constructoras',
    destacado: true,
  },
  {
    nombre: 'Sistema',
    precio: 'desde $2.500',
    precioNota: 'a medida',
    resumen: 'Web + panel de control para gestionar contenido, reservas o usuarios.',
    entrega: '30 días',
    mensualidad: '$90/mes',
    features: [
      'Todo lo anterior',
      'Panel de control + base de datos',
      'Soporte del panel (2 h/mes)',
    ],
    idealPara: 'Catálogos, reservas de citas, portales de clientes',
    destacado: false,
  },
] as const;

export const brands: { name: string; logo: string; scale?: number }[] = [
  { name: 'udo', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917571/clientes/10_kf689r.webp' },
  { name: 'vettal', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917571/clientes/11_fi3uin.webp' },
  { name: 'vin store', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917572/clientes/12_lucuqa.webp' },
  { name: 'blu', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917572/clientes/13_ousmnz.webp' },
  { name: 'comseaña', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917572/clientes/14_khveib.webp' },
  { name: 'credimara', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917573/clientes/15_hjfjl9.webp' },
  { name: 'fein kaffee', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917573/clientes/16_nahobx.webp' },
  { name: 'innocens', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917573/clientes/17_qmxcno.webp' },
  { name: 'comsalud', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917573/clientes/18_egwwre.webp' },
  { name: 'dahilmar saez', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917571/clientes/1_o8fx09.webp' },
  { name: 'one pizza', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917573/clientes/20_id27ox.webp' },
  { name: 'remax hogar', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917571/clientes/2_ja1fis.webp' },
  { name: 'andiamo', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917572/clientes/3_c5t47s.webp' },
  { name: 'alpitech', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917571/clientes/4_tik6mc.webp' },
  { name: 'regalado', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917572/clientes/6_tdcwbg.webp' },
  { name: 'superfina', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917572/clientes/7_tu8zmf.webp' },
  { name: 'alsa import', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917580/clientes/Logo-ALSA.png_jr6out.webp' },
  { name: 'davinci cafe', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917574/clientes/Logo-DA-VINCI-CAFE.png_u54ed7.webp' },
  { name: 'davinci', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917573/clientes/Logo-DA-VINCI-DAL-1996.png_hiafq0.webp' },
  { name: 'drink cola', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917585/clientes/Logo-DRINK-COLA.png_xmvezp.webp' },
  { name: 'mdn academy', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917586/clientes/Logo-academy.png_xd5xry.webp' },
  { name: 'bestronger', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917579/clientes/Logo-be-stronger.png_pkg0fi.webp' },
  { name: 'encco', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917580/clientes/Logo-encco.png_e7uskz.webp' },
  { name: 'flamingo', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917579/clientes/Logo-flamingo.png_cusew1.webp' },
  { name: 'gelarttesano', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1784917586/clientes/Logo-gelartesano.png_jsoupe.webp', scale: 0.78 },
  { name: 'tu digistore', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785253763/clientes/01_tu_digistore_mcfre4.webp' },
  { name: 'cow rodizio', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785253763/clientes/02_cow_rodizio_esngzn.webp' },
  { name: 'bloq market', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785253763/clientes/03_bloq_market_k2led0.webp' },
  { name: 'autoteke', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785253764/clientes/04_autoteke_efdk4r.webp' },
  { name: 'cow carnicería', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785253764/clientes/05_cow_carniceria_skvbje.webp' },
  { name: 'capitas', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785253765/clientes/06_capitas_j84qlq.webp' },
  { name: 'san lucas', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785253765/clientes/07_san_lucas_k44zwg.webp' },
  { name: 'agrolago', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785253766/clientes/10_agrolago_yb6w1v.webp' },
  { name: 'ads', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785253767/clientes/11_ads_fyrcqu.webp' },
  { name: 'maxxis', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785262393/clientes/01_MAXXIS_gris_khth7g.png' },
  { name: 'maderas adidas', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785262394/clientes/02_MADERAS_ADIDAS_gris_bs7li3.png' },
  { name: 'liderwest', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785262393/clientes/03_LIDERWEST_gris_n91e78.png' },
  { name: 'los angeles', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785262394/clientes/05_LOS_ANGELES_gris_wokngo.png' },
  { name: 'inspira', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785262395/clientes/06_INSPIRA_gris_kixg7p.png' },
  { name: 'flexmed', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785262396/clientes/07_FLEXMED_gris_qykppe.png' },
  { name: 'energon', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785262396/clientes/08_ENERGON_gris_ckfq2f.png' },
  { name: 'el complejo', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785262397/clientes/09_EL_COMPLEJO_gris_rbghz3.png' },
  { name: 'dr machado', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785262397/clientes/10_DR_MACHADO_gris_c2qghj.png' },
  { name: 'tienda del pintor', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785262371/clientes/tienda_del_pintor.png' },
  { name: 'punto fit', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785339688/clientes/01_punto_fit_gris_p2nkya.png' },
  { name: 'turbopre', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785339689/clientes/03_turbopre_gris_hgtien.png' },
  { name: 'taller elite', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785339689/clientes/04_taller_elite_gris_tuegu2.png' },
  { name: 'smashack', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785339691/clientes/06_smashack_gris_cbh6u2.png' },
  { name: 'push', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785339691/clientes/07_push_gris_qalzei.png' },
  { name: 'protein', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785339692/clientes/08_protein_gris_enrq0r.png' },
  { name: 'nuvitt', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785339693/clientes/09_nuvitt_gris_ibi6lm.png' },
  { name: 'tiendas montaña', logo: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785339693/clientes/10_tiendas_montana_gris_oyojqx.png' },
];

export const serviceChips = ['Web & apps', 'Gestión de redes', 'Branding & diseño', 'Audiovisual', 'Asesoría'];

export const pillars = [
  {
    title: 'Estructura',
    desc: 'Nuestra estructura en Venezuela, Chile y Miami nos permite ofrecer servicios con alcance local, nacional e internacional.',
  },
  {
    title: 'Resultados',
    desc: 'Obtenemos resultados medibles y alineados a tus objetivos de negocio, en cada fase del proceso.',
  },
  {
    title: 'Enfoque',
    desc: 'Acciones efectivas y creativas con un solo objetivo: que tu marca crezca y conecte con su público.',
  },
];
