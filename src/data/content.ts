export const WHATSAPP_NUMBER = '584126395734';
export const PHONE_DISPLAY = '+58 412-6395734';

export const waLink = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const wallTags = [
  ['Reels', '#2a2d52', 'reels.webp'], ['Carrusel', '#4a2e2a', 'carrusel.webp'], ['Campaña', '#2a4a3a', 'campana.webp'],
  ['Branding', '#52472a', 'branding.webp'], ['Cocktail', '#3a2a4a', 'cocktail.webp'], ['Deportes', '#2a3d52', 'deportes.webp'],
  ['Lanzamiento', '#522a3a', 'lanzamiento.webp'], ['Retail', '#2f3a2a', 'retail.webp'], ['Inmobiliaria', '#2a4a4a', 'inmobiliaria.webp'],
  ['Salud', '#3a3a52', 'salud.webp'], ['Gastronomía', '#4a3a2a', 'gastronomia.webp'], ['Eventos', '#2a2a4a', 'eventos.webp'],
] as [string, string, string | undefined][];

export const helpItems = [
  { title: 'Analizamos', desc: 'Estudiamos tu marca y tu mercado para definir la web y la presencia digital que necesitas.' },
  { title: 'Construimos', desc: 'Desarrollamos tu página web y presencia digital a medida, rápida y lista para vender.' },
  { title: 'Fidelizamos', desc: 'Creamos una identidad gráfica sólida y coherente que hace que tus clientes te reconozcan y vuelvan.' },
  { title: 'Convertimos', desc: 'Optimizamos cada pieza y llamada a la acción para convertir visitas en clientes.' },
];

export const services: { tag: string; title: string; desc: string; image: string; alt: string; href?: string; srText?: string }[] = [
  {
    tag: 'Desarrollo a medida',
    title: 'Plataformas y proyectos web',
    desc: 'Diseño y desarrollo de páginas web a medida: landing pages, sitios corporativos y sistemas con panel de gestión, desde sitios web hasta aplicaciones y herramientas interactivas que facilitan la experiencia del usuario y optimizan la gestión de tu negocio.',
    image: 'web.webp',
    alt: 'Diseño y desarrollo de páginas web — MDN Publicidad',
    href: '/paginas-web/',
    srText: 'Planes de páginas web desde $600: Landing, Web corporativa y Sistema a medida — con hosting, dominio y soporte incluidos.',
  },
  {
    tag: 'Estrategia & contenido',
    title: 'Gestión de redes sociales',
    desc: 'Analizamos tu marca y el mercado para desarrollar planes personalizados que maximizan el impacto de cada campaña, ya sea en redes sociales o en otras plataformas digitales. Desde la creación de contenido hasta la comprensión de resultados, optimizamos cada paso para maximizar tu impacto digital.',
    image: 'redes-sociales.webp',
    alt: 'Gestión de redes sociales para marcas — MDN Publicidad',
    href: '/gestion-de-redes-sociales/',
    srText: 'Planes de gestión de redes sociales desde $550 al mes: MDN Lite, MDN Plus y MDN Premium.',
  },
  {
    tag: 'Identidad visual',
    title: 'Branding y diseño gráfico',
    desc: 'Creamos identidades visuales fuertes y coherentes que reflejan la esencia de tu marca, fortaleciendo el reconocimiento y la confianza de tus clientes. Nuestro equipo de diseñadores desarrolla piezas gráficas atractivas para todas tus necesidades online y offline.',
    image: 'branding.webp',
    alt: 'Branding y diseño gráfico de identidad visual — MDN Publicidad',
  },
  {
    tag: 'Video 2D · 3D · Motion',
    title: 'Producciones audiovisuales',
    desc: 'Organizamos contenidos audiovisuales profesionales que conectan emocionalmente con tu audiencia. Videos corporativos 2D y 3D, promocionales y animaciones que potencian tu storytelling y aumentan la visibilidad.',
    image: 'audiovisual.webp',
    alt: 'Producción audiovisual y animación 2D y 3D — MDN Publicidad',
  },
  {
    tag: 'Consultoría continua',
    title: 'Asesoría y acompañamiento',
    desc: 'Proporcionamos asesoría personalizada para brindarte las tácticas más adecuadas que te permitan alcanzar tus objetivos. Nuestro equipo está a tu disposición para orientarte en cada fase del proceso y, si lo deseas, acompañarte en la ejecución.',
    image: 'asesoria.webp',
    alt: 'Asesoría y acompañamiento en estrategia digital — MDN Publicidad',
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

export type Red = 'instagram' | 'facebook' | 'tiktok' | 'linkedin' | 'youtube';

export const redesPlanes: {
  nombre: string;
  precio: string;
  precioNota: string;
  resumen: string;
  redes: { red: Red; texto: string }[];
  incluye: string[];
  destacado: boolean;
}[] = [
  {
    nombre: 'MDN Lite',
    precio: '$550',
    precioNota: 'al mes',
    resumen: 'Manejo base de tus redes para empezar a construir comunidad.',
    redes: [
      { red: 'instagram', texto: '4 publicaciones a la semana entre post y reels' },
      { red: 'facebook', texto: 'Creación de fan page (si no tienes) y posteo automático desde Instagram' },
    ],
    incluye: [
      'Seguimiento y gestión de la comunidad',
      'Calendario mensual de contenidos',
      '1 pauta de fotos o videos al mes (no incluye modelo)',
      'Entrega y puesta en marcha de estrategia inicial + acciones',
      'Configuración de cuenta de Facebook Ads y puesta en marcha de publicidad mensual (no incluye presupuesto)',
    ],
    destacado: false,
  },
  {
    nombre: 'MDN Plus',
    precio: '$750',
    precioNota: 'al mes',
    resumen: 'Más frecuencia, TikTok y WhatsApp Business configurado.',
    redes: [
      { red: 'instagram', texto: 'Post y reels diarios o interdiarios, según la estrategia' },
      { red: 'facebook', texto: 'Fan page y posteo automático desde Instagram' },
      { red: 'tiktok', texto: 'Contenidos con personalidad de marca para potenciar tu comunidad, 4 publicaciones al mes' },
    ],
    incluye: [
      'Seguimiento y gestión de la comunidad',
      '2 pautas de fotos o videos al mes: una para Instagram y otra para TikTok (no incluye modelo)',
      'Entrega y puesta en marcha de estrategia inicial + acciones',
      'Configuración, actualización y monitoreo inicial de WhatsApp Business (catálogo, respuestas rápidas, atención al cliente)',
      'Configuración de cuenta de Facebook Ads y puesta en marcha de publicidad mensual (no incluye presupuesto)',
    ],
    destacado: true,
  },
  {
    nombre: 'MDN Premium',
    precio: '$1.000',
    precioNota: 'al mes',
    resumen: 'Presencia completa en cinco plataformas con ads y material POP.',
    redes: [
      { red: 'instagram', texto: 'Post, reels e historias diarios o interdiarios, según la estrategia' },
      { red: 'facebook', texto: 'Fan page y posteo automático desde Instagram' },
      { red: 'tiktok', texto: 'Contenidos con personalidad de marca, 8 publicaciones al mes' },
      { red: 'linkedin', texto: 'Una publicación semanal' },
      { red: 'youtube', texto: 'Creación y optimización del perfil, con contenidos coherentes para la plataforma' },
    ],
    incluye: [
      'Seguimiento y gestión de la comunidad',
      '3 pautas de fotos o videos al mes (no incluye modelo)',
      'Entrega y puesta en marcha de estrategia inicial + acciones',
      'Diseño de hasta 2 piezas de material POP en pequeña escala',
      'Configuración, actualización y monitoreo inicial de WhatsApp Business (catálogo, respuestas rápidas, atención al cliente efectiva)',
      'Desarrollo, creación de piezas y puesta en marcha de Ads en las plataformas, según tus objetivos de mercado y tu presupuesto',
    ],
    destacado: false,
  },
];

export const redesPorQue = [
  'Más de 16 años impulsando y creando marcas nacionales e internacionales.',
  'La agencia de publicidad con la estructura y el equipo más grande del occidente del país.',
  'Liderazgo creativo en gestión de redes, identidades visuales, producciones audiovisuales, proyectos web, asesorías y acompañamientos.',
  'Compromiso con la profesionalización de nuestros clientes (organización y capacitación) y con la optimización constante de nuestro trabajo mediante indicadores de gestión.',
];

export const proyectos = [
  {
    nombre: 'Da Vinci Ristorante',
    categoria: 'RESTAURANTE · GASTRONOMÍA',
    descripcion: 'Restaurante italiano en Maracaibo desde 1996: web con menú, reserva por WhatsApp y presencia de marca a la altura de su cocina.',
    url: 'davinci-nueva.netlify.app',
    imagen: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785513159/clientes/proyectos/davinci-ristorante.png',
    alt: 'Captura de la página web de Da Vinci Ristorante',
  },
  {
    nombre: 'Nuvitt',
    categoria: 'CATÁLOGO · SALUD',
    descripcion: 'Suplementos vitamínicos certificados por la FDA: catálogo por objetivo de salud, ficha de producto y disponibilidad en farmacias.',
    url: 'nuvitt.com',
    imagen: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785513898/clientes/proyectos/nuvitt.png',
    alt: 'Captura de la página web de Nuvitt',
  },
  {
    nombre: 'TurboPre',
    categoria: 'CORPORATIVA · INDUSTRIAL',
    descripcion: 'Mantenimiento y soporte técnico para turbinas y equipos rotativos: presencia corporativa, servicios y captación de clientes industriales.',
    url: 'turbopre.com',
    imagen: 'https://res.cloudinary.com/mdnclientes/image/upload/v1785513897/clientes/proyectos/turbopre.png',
    alt: 'Captura de la página web de TurboPre',
  },
] as const;

export const homeFaqs = [
  {
    q: '¿Cuánto cuesta una página web?',
    a: 'Desde $600 una landing page, $1.000 una web corporativa y desde $2.500 un sistema a medida con panel de control. Todos incluyen hosting, dominio, SSL y soporte.',
  },
  {
    q: '¿Cuánto tardan en entregar?',
    a: 'Una landing se entrega en 3 días, una web corporativa en 15 y un sistema a medida en 30, dependiendo del alcance del proyecto.',
  },
  {
    q: '¿El hosting y el dominio están incluidos?',
    a: 'Sí. Todos los planes incluyen hosting, dominio, certificado SSL y respaldos periódicos, con una mensualidad de soporte y mantenimiento.',
  },
  {
    q: '¿Trabajan con clientes fuera de Venezuela?',
    a: 'Sí. Tenemos sedes en Maracaibo (Venezuela), Santiago (Chile) y Miami (Estados Unidos), y trabajamos con marcas de forma remota.',
  },
  {
    q: '¿Qué incluye la gestión de redes sociales?',
    a: 'Tenemos tres planes desde $550 al mes. Incluyen estrategia inicial, calendario de contenidos, publicaciones en Instagram, Facebook, TikTok, LinkedIn o YouTube según el plan, gestión de la comunidad y puesta en marcha de publicidad.',
  },
  {
    q: '¿Ofrecen soporte después de la entrega?',
    a: 'Sí. Para páginas web, cada plan incluye una mensualidad de soporte y mantenimiento que cubre actualizaciones, respaldos y acompañamiento.',
  },
];

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

export const stats = [
  { value: 100, label: 'Identidades visuales desarrolladas' },
  { value: 500, label: 'Marcas acompañadas en su transformación digital' },
  { value: 15, label: 'Años creando e impulsando marcas' },
];
