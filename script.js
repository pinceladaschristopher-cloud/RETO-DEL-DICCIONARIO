// =======================================================================
// CONFIGURACIÓN Y ESTADO DEL JUEGO
// =======================================================================
let gameState = 'STARTUP'; 
let playerName = "";

let playerMoney = 500;
let playerWords = {};
let usedChallengeWords = {}; // Palabras usadas en desafíos
let currentWord = {}; // Palabra actual en pantalla
let passiveIncome = 0;
let initialCredits = 500; 
let consecutiveFailures = 0; // Contador de fallos (vidas)
let playerStats = {
    wordsBought: 0,
    challengesWon: 0,
    bossesDefeatedCount: 0,
};

// =======================================================================
// VARIABLES DE BUCLE Y TIEMPO
// =======================================================================
let animationFrameId = null;
let lastUpdateTime = 0;
let timeSinceLastIncomeUpdate = 0;
let wordDisplayTimeout;
let challengeTimerInterval;
let guardianBlessingTimeout = null; // Temporizador para el regalo de vida del Guardián
let randomEventInterval = null; // Intervalo para eventos aleatorios

// =======================================================================
// VARIABLES DE BOOSTS Y EVENTOS
// =======================================================================
let christopherBoostEndTime = 0; // Fin del boost x2 de Christopher
let superValueBoosts = {}; // Fin del boost x2 por categoría
let limboGramaticalEndTime = 0; // Fin del boost Limbo Gramatical
let limboTriggeredThisLevel = false; // Bandera para evitar doble Limbo por nivel
let dealRejectedForLimboBoost = false; // Bandera para boost adicional por rechazar trato
let hasHadFirstRandomAttackThisPartida = false; // Garantiza un ataque de robo de vida en el primer juego
let confusionModeEndTime = 0; // Modo de confusión (no usado actualmente)
let guardianBlessingAvailable = true; // Si la bendición de Guardián está disponible

// =======================================================================
// VARIABLES DE CONTROL DE UI Y FLUJO
// =======================================================================
let currentView = 'startup'; 
let gameStarted = false;
let hasBoughtFirstWord = false;
let activeChallengeOnLoad = false; // Indica si hay un reto activo al cargar
let visibilityChangeHandler = null;
let confirmCallback = null; // Callback para el modal de confirmación
let currentChallengeData = {};

// =======================================================================
// VARIABLES DE AUDIO
// =======================================================================
let audioInitialized = false;
let mainMusicLoop, thiefMusicLoop;
let mainSynth, thiefSynth;
let isMuted = false;

// =======================================================================
// VARIABLES DE BOSS (JEFE)
// =======================================================================
let bossesDefeated = [], whisperInterval = null;
const BOSS_MILESTONES = { 1: 50, 2: 100, 3: 150, 4: 200, 5: 250, 6: 300, 7: 350, 8: 400 }; // Palabras compradas para activar el jefe
let currentBossLevel = 0, currentBossSentence = {};
let bossTimerInterval;
let isWhispering = false; // Si el jefe está "susurrando" palabras corruptas
let activeWhisper = "";
let corruptedWordsBought = 0; // Contador de palabras corruptas compradas (debuff para el jefe)

// =======================================================================
// CONSTANTES DEL JUEGO
// =======================================================================
const PRICE_PER_LETTER = 15;
const SUPER_VALUE_MULTIPLIER = 2;
const INFLATION_FACTOR = 100; // Factor para calcular el aumento de valor de las palabras
const CHALLENGE_REWARDS = { base: 50000 };

// Palabras corruptas (sin tilde) para la fase de susurro
const CORRUPTED_WORDS = [
    { wrong: "Lapiz", right: "Lápiz", category: "Llanas" }, { wrong: "Arbol", right: "Árbol", category: "Llanas" },
    { wrong: "Cafe", right: "Café", category: "Agudas" }, { wrong: "Sofa", right: "Sofá", category: "Agudas" },
    { wrong: "Musica", right: "Música", category: "Esdrújulas" }, { wrong: "Pagina", right: "Página", category: "Esdrújulas" },
    { wrong: "Compas", right: "Compás", category: "Agudas" }, { wrong: "Dificil", right: "Difícil", category: "Llanas" },
    { wrong: "Celula", right: "Célula", category: "Esdrújulas" }, { wrong: "Jamas", right: "Jamás", category: "Agudas" }
];

// Palabras para el mini-reto de sílaba tónica
const TONIC_SYLLABLE_WORDS = [
     { word: "cantar", syllable: "tar" }, { word: "papel", syllable: "pel" },
     { word: "ciudad", syllable: "dad" }, { word: "reloj", syllable: "loj" },
     { word: "feliz", syllable: "liz" }, { word: "amor", syllable: "mor" },
     { word: "mesa", syllable: "me" }, { word: "libro", syllable: "li" },
     { word: "ventana", syllable: "ta" }, { word: "casa", syllable: "ca" },
     { word: "lunes", syllable: "lu" }, { word: "calle", syllable: "ca" },
     { word: "joven", syllable: "jo" }, { word: "examen", syllable: "xa" }
];
// Palabras para otros mini-retos
const MINI_CHALLENGE_WORDS = {
    accent: [ 
         {wrong: "logica", right: "lógica"}, {wrong: "arabe", right: "árabe"},
         {wrong: "video", right: "vídeo"}, {wrong: "camion", right: "camión"},
         {wrong: "carcel", right: "cárcel"}, {wrong: "exito", right: "éxito"},
         {wrong: "jamas", right: "jamás"}, {wrong: "ultimo", right: "último"},
         {wrong: "album", right: "álbum"}, {wrong: "cesped", right: "césped"},
         {wrong: "facil", right: "fácil"}, {wrong: "angel", right: "ángel"},
         {wrong: "mastil", right: "mástil"}, {wrong: "util", right: "útil"},
         {wrong: "tambien", right: "también"}, {wrong: "despues", right: "después"},
         {wrong: "corazon", right: "corazón"}, {wrong: "bebe", right: "bebé"},
         {wrong: "pagina", right: "página"}, {wrong: "musica", right: "música"},
         {wrong: "telefono", right: "teléfono"}, {wrong: "brujula", right: "brújula"}
    ],
    trueFalse: [ 
        { word: "Reloj", category: "Agudas", isCorrect: true },
        { word: "Casa", category: "Agudas", isCorrect: false },
        { word: "Fácil", category: "Llanas", isCorrect: true },
        { word: "Libro", category: "Esdrújulas", isCorrect: false },
        { word: "Pájaro", category: "Esdrújulas", isCorrect: true },
        { word: "Resolver", category: "Llanas", isCorrect: false },
        { word: "Cantar", category: "Agudas", isCorrect: true },
        { word: "Lámpara", category: "Llanas", isCorrect: false },
         { word: "Cárcel", category: "Agudas", isCorrect: false },
         { word: "Azúcar", category: "Llanas", isCorrect: true },
         { word: "Árbol", category: "Esdrújulas", isCorrect: false },
         { word: "Teléfono", category: "Esdrújulas", isCorrect: true },
         { word: "Camión", category: "Llanas", isCorrect: false }
    ]
};

// Diálogos del Jefe (Ladrón de Tildes)
const BOSS_INITIAL_DIALOGUES = [
    "Veo que has reunido un pequeño tesoro... Demuéstrame que mereces conservarlo.", "Tus palabras acumuladas cantan una melodía que me atrae. ¿Defenderás tu colección?",
    "Huelo el poder de la sintaxis en ti. Pero, ¿conoces la verdadera ortografía?", "Has sido descuidado. Dejaste un rastro de tildes olvidadas, y yo lo he seguido hasta aquí.",
    "Otro coleccionista... Creen que acumular es saber. Te enseñaré la diferencia.", "Las reglas son mis cadenas y tu conocimiento, la llave. No te la dejaré usar.",
    "¿Sientes ese peso en el aire? Son las tildes que has ignorado. Vengo a reclamarlas.", "Tus avances no han pasado desapercebidos. Es hora de una pequeña corrección.",
    "Me llaman ladrón, pero yo me considero un purista. Vengo a limpiar tu colección de errores.", "El conocimiento sin precisión es ruido. Y tú estás haciendo mucho ruido."
];
const BOSS_VICTORY_DIALOGUES = [
    "Impresionante... Por ahora, tu conocimiento es tuyo. Pero volveré a sentir tu poder.", "Has demostrado tu valía, mortal. Disfruta de tu tesoro... mientras puedas.",
    "Me has vencido, sí. Pero recuerda que una sola tilde olvidada puede deshacerlo todo.", "Tu mente es aguda. Una herramienta peligrosa en las manos adecuadas. Hasta la próxima.",
    "Admito mi derrota. La precisión de tus tildes es un arma formidable."
];
const BOSS_DEFEAT_DIALOGUES = [
    "Tu ignorancia es... deliciosa. Estas palabras estarán mejor conmigo.", "Tal como lo esperaba. Un simple acumulador sin verdadero conocimiento. Gracias por el tributo.",
    "Te falta práctica. Vuelve cuando sepas la diferencia entre un 'si' y un 'sí'.", "Un error tan simple... y tan costoso. Tus palabras ahora me pertenecen.",
    "La duda es el óxido del intelecto. Y el tuyo está completamente corroído."
];

const BOSS_TAUNT = "JA JA JA JA";

// Oraciones para el reto del Jefe (sin tildes vs con tildes correctas)
const BOSS_SENTENCES = {
    1: [ 
        { wrong: "El habil mecanico arreglo el automovil rapido.", right: "El hábil mecánico arregló el automóvil rápido." },
        { wrong: "La musica clasica es mi pasion.", right: "La música clásica es mi pasión." },
        { wrong: "El examen de matematicas fue dificil.", right: "El examen de matemáticas fue difícil." },
        { wrong: "Te gustaria tomar un te caliente.", right: "Te gustaría tomar un té caliente." },
        { wrong: "El libro es para el.", right: "El libro es para él." }
    ],
    2: [ 
        { wrong: "Tu no sabes si el quiere te o cafe.", right: "Tú no sabes si él quiere té o café." },
        { wrong: "Se que tu tienes mi libro, pero el no lo sabe.", right: "Sé que tú tienes mi libro, pero él no lo sabe." },
        { wrong: "De mas de lo que el te pide.", right: "Dé más de lo que él te pide." },
        { wrong: "Aun no he terminado, aun cuando todos se han ido.", right: "Aún no he terminado, aun cuando todos se han ido." },
        { wrong: "A mi me gusta mas el te que a el.", right: "A mí me gusta más el té que a él." }
    ],
    3: [ 
        { wrong: "Dime que necesitas y cuando lo quieres para saber como ayudarte.", right: "Dime qué necesitas y cuándo lo quieres para saber cómo ayudarte." },
        { wrong: "Quien te dijo que y como lo supiste es un misterio.", right: "Quién te dijo qué y cómo lo supiste es un misterio." },
        { wrong: "No entiendo por que ries, ni cual es el motivo.", right: "No entiendo por qué ríes, ni cuál es el motivo." },
        { wrong: "Donde esta el libro del que te hable cuando te vi.", right: "Dónde está el libro del que te hablé cuando te vi." },
        { wrong: "Que sorpresa verte aqui! Cuando llegaste?", right: "¡Qué sorpresa verte aquí! ¿Cuándo llegaste?" }
    ],
    4: [ 
        { wrong: "El buho volaba silenciosamente sobre el maiz.", right: "El búho volaba silenciosamente sobre el maíz." },
        { wrong: "Raul leia poesia en el baul antiguo.", right: "Raúl leía poesía en el baúl antiguo." },
        { wrong: "Actua con cortesia y rapidamente.", right: "Actúa con cortesía y rápidamente." },
        { wrong: "Fisicamente, se sentia debil despues del frio.", right: "Físicamente, se sentía débil después del frío." },
        { wrong: "Cuentamelo rapidamente, no tengo mucho tiempo.", right: "Cuéntamelo rápidamente, no tengo mucho tiempo." }
    ],
    5: [ 
        { wrong: "Es un analisis fisico-quimico complejo.", right: "Es un análisis físico-químico complejo." },
        { wrong: "El tio vivo funcionaba mecanicamente.", right: "El tiovivo funcionaba mecánicamente." },
        { wrong: "Dificilmente encontraras un especimen asi.", right: "Difícilmente encontrarás un espécimen así." },
        { wrong: "Pideme lo que quieras, dámelo ahora.", right: "Pídeme lo que quieras, dámelo ahora." },
        { wrong: "El menu incluia cócteles y sándwiches.", right: "El menú incluía cócteles y sándwiches." }
    ],
    6: [ 
        { wrong: "Aun no se por que lo hizo.", right: "Aún no sé por qué lo hizo." },
        { wrong: "El te que te di es para mi.", right: "El té que te di es para mí." },
        { wrong: "Solo se que tu iras solo.", right: "Solo sé que tú irás solo." },
        { wrong: "El camion que viste es de el.", right: "El camión que viste es de él." },
        { wrong: "No le de mas de lo que pidio.", right: "No le dé más de lo que pidió." }
    ],
    7: [ 
        { wrong: "Actuo cortesmente y se fue rapidamente.", right: "Actuó cortésmente y se fue rápidamente." },
        { wrong: "Raul veia como caia la nieve.", right: "Raúl veía cómo caía la nieve." },
        { wrong: "El maiz y la raiz crecieron.", right: "El maíz y la raíz crecieron." },
        { wrong: "Fue un acto heroico y tragico.", right: "Fue un acto heroico y trágico." },
        { wrong: "Comio agilmente y se durmio.", right: "Comió ágilmente y se durmió." }
    ],
    8: [ 
        { wrong: "Dime que quieres, cuanto cuesta y donde esta.", right: "Dime qué quieres, cuánto cuesta y dónde está." },
        { wrong: "Se que tu no tienes fe en el.", right: "Sé que tú no tienes fe en él." },
        { wrong: "El vehiculo dio un giro brusco.", right: "El vehículo dio un giro brusco." },
        { wrong: "Aun los que no sabian, lo hicieron.", right: "Aun los que no sabían, lo hicieron." },
        { wrong: "El oceano Pacifico es mas grande.", right: "El océano Pacífico es más grande." }
    ]
};

// Iconos SVG para usar en la UI
const ICON_LIBRARY = {
    'bossIcon': `<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path><circle cx="12" cy="12" r="3"></circle><path d="M10.5 14.5c.5.3 1.2.3 1.7 0 M8 9.5s1-1 4-1 4 1 4 1"/></svg>`,
    'christopherIcon': `<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>`,
    'speakerOn': `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>`,
    'speakerOff': `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd" /><path stroke-linecap="round" stroke-linejoin="round" d="M17 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2" /></svg>`
};

// Gran base de datos de palabras, dividida por categorías de acentuación
const HUGE_WORD_DATABASE = {
     "Monosílabos": {
        value: 10,
        words: ["Sol", "Mar", "Luz", "Voz", "Pan", "Sal", "Miel", "Tren", "Flor", "Rey", "Son", "Paz", "Bien", "Mal", "Gas", "No", "Sí", "Yo", "Él", "Tú", "Ve", "Da", "Sé", "Vi", "Di", "Pie", "Fe", "Ley", "Don", "Fin", "Mes", "Mil", "Res", "Ron", "Set", "Sur", "Tal", "Tez", "Zas", "Dar", "Ver", "Mas", "Te", "Mi", "Si", "El", "Un", "La", "Los", "Las", "Dos", "Tres", "Cien", "Tan", "Muy", "Ah", "Oh", "Ya", "En", "Es", "Ir", "O", "Y", "A", "De", "Ni", "So", "Va", "Le", "Lo", "Me", "Se", "Su", "Tu", "Gol", "Bar", "Bit", "Box", "Bus", "Chip", "Club", "Fan", "Fax", "Gel", "Gin", "Golf", "Jet", "Kit", "Led", "Link", "Look", "Pub", "Punk", "Rap", "Rock", "Rol", "Show", "Ski", "Snob", "Spot", "Stop", "Surf", "Test", "Top", "Tour", "Web", "Zen", "Zinc", "Clip", "Crack", "Cross", "Film", "Flash", "Folk", "Full"], 
        superValueWords: ["Flor", "Voz", "Rey", "Paz", "Luz", "Miel"],
        limit: 100 // Límite de palabras para completar la categoría
    },
    "Agudas": {
        value: 100,
         words: ["Acción", "Adicción", "Además", "Andén", "Balón", "Bebé", "Café", "Camión", "Canción", "Colibrí", "Corazón", "Después", "Emoción", "Interés", "Jabalí", "Jamás", "Jardín", "Jazmín", "Menú", "País", "París", "Pasión", "Perfección", "Portugués", "Revolución", "Sofá", "Solución", "También", "Visión", "Volcán", "Comió", "Estudió", "Habló", "Vivió", "Ganará", "Común", "Betún", "Calzón", "Dragón", "Francés", "Inglés", "Japonés", "Maní", "Ratón", "Tiburón", "Vudú", "Bambú", "Jabón", "Melón", "Patín", "Avión", "Botón", "Compás", "Decisión", "Estación", "Explosión", "Ilusión", "León", "Misión", "Opinión", "Pantalón", "Salmón", "Televisión", "Unión", "Violín", "Atún", "Azafrán", "Carbón", "Colchón", "Limón", "Salón", "Sartén", "Tapón", "Tazón", "Almacén", "Alquitrán", "Arnés", "Autobús", "Bailarín", "Bergantín", "Bombón", "Calderón", "Capitán", "Chapuzón", "Ciprés", "Civilización", "Composición", "Confirmación", "Congestión", "Construcción", "Conversación", "Corrupción", "Cotización", "División", "Edredón", "Evaluación", "Expedición", "Explicación", "Faraón", "Huracán", "Información", "Instalación", "Afganistán", 
         "Cristal", "Cuartel", "Feliz", "Reloj", "Pared", "Cantar", "Comer", "Vivir"],
        superValueWords: ["Colibrí", "Jazmín", "Pasión", "Revolución", "Corazón", "Tiburón"],
        limit: 100 
    },
    "Llanas": {
        value: 250,
         words: ["Árbol", "Ángel", "Azúcar", "Cáncer", "Cárcel", "Carácter", "Césped", "Clímax", "Cráter", "Día", "Difícil", "Dólar", "Éter", "Fácil", "Fósil", "Fútbol", "Huésped", "Lápiz", "Líder", "Mártir", "Móvil", "Nácar", "Poesía", "Póker", "Río", "Tórax", "Trébol", "Túnel", "Geografía", "Biología", "Filosofía", "Tecnología", "Psicología", "Economía", "Anatomía", "Sandía", "Policía", "Cómics", "Fénix", "Hábil", "Inmóvil", "Referí", "Tándem", "Tótem", "Versátil", "Zombis", "Álbum", "Cáliz", "Débil", "Frágil", "Níquel", "Récord", "Estéril", "Portátil", "Táctil", "Textil", "Útil", "Automóvil", "Cónsul", "Dúctil", "Huérfano", "Mármol", "Néctar", "Péndulo", "Revólver", "Volátil", "Bíceps", "Fórceps", "Tríceps", "Acné", "Apóstol", "Cráneo", "Gómez", "López", "Martínez", "Pérez", "Sánchez", "Alcázar", "Bolívar", "Cádiz", "Héctor", "Júnior", "Suárez", "Tóner", "Wáter", "Ámbar", "Béisbol", "Cadáver", "Contraseña", "Cristóbal", "Estándar", "Flúor", "Gánster", "Hámster", "Ítem", "Kárdex", "Láser", "Máster", "Médium", "Póster", "Referéndum", "Sándwich", "Superávit"], 
        superValueWords: ["Carácter", "Cráter", "Poesía", "Geografía", "Fénix", "Filosofía"],
        limit: 100 
    },
    "Esdrújulas": {
        value: 500,
        words: ["Análisis", "Antártida", "Atmósfera", "Bolígrafo", "Brújula", "Cálculo", "Catástrofe", "Círculo", "Clínica", "Cómpralo", "Déficit", "Esdrújula", "Estómago", "Éxito", "Fábrica", "Fósforo", "Gramática", "Hígado", "Héroe", "Hipócrita", "Índice", "Lágrima", "Lógico", "Mágico", "Máquina", "Matemáticas", "Médico", "Miércoles", "Murciélago", "Músculo", "Música", "Número", "Oxígeno", "Página", "Pájaro", "Plátano", "Público", "Química", "Rápido", "Sábado", "Semáforo", "Sílaba", "Teléfono", "Término", "Tráfico", "Último", "Vértebra", "Víctima", "Aéreo", "Célula", "Diálogo", "Época", "Gótico", "Jurásico", "Kilómetro", "Óptimo", "Párrafo", "Pirámide", "Sátira", "Técnica", "Vándalo", "Académico", "Ábaco", "Águila", "Álgebra", "Ámbito", "Análogo", "Ánimo", "Antídoto", "Apóstrofe", "Armónica", "Arácnido", "Artículo", "Atlético", "Aurícula", "Auténtico", "Bálsamo", "Bárbaro", "Básico", "Benéfico", "Biblioteca", "Bólido", "Botánico", "Bóveda", "Bulímico", "Burócrata", "Cámara", "Capítulo", "Cápsula", "Cátedra", "Católico", "Centímetro", "Cerámica", "Cíclope", "Científico", "Clásico", "Código", "Colérico", "Cómico", "Cómplice", "Cónyuge", "Crédito", "Crítico", "Crónica", "Cúbico", "Cúpula", "Débito", "Década", "Décimo", "Demócrata", "Depósito", "Diámetro", "Didáctico", "Dinámico", "Cuádriceps", "Dátiles", "Énfasis", "Cónclave", "Dóberman", "Mánager", "Taxímetro"], 
        superValueWords: ["Atmósfera", "Murciélago", "Científico", "Matemáticas", "Pirámide", "Jurásico"],
        limit: 100 
    },
    "Sobreesdrújulas": {
        value: 1000000,
        words: ["Agradéceselo", "Apréndetelo", "Averíguamelo", "Búscaselo", "Comprándomelo", "Dígamelo", "Díceselo", "Enciéndemelo", "Entrégaselo", "Explícaselo", "Guárdaselo", "Hágaselo", "Júraselo", "Llévaselo", "Pídemelo", "Pásaselo", "Repíteselo", "Tráigaselo", "Véndeselo", "Dedicándoselo", "Estudiándotelo", "Explicándoselo", "Repitiéndoselo", "Comiéndoselo", "Escribiéndotelo", "Mirándoselo", "Preparándomelo", "Comprándoselo", "Llamándoselo", "Encontrándoselo", "Recibiéndoselo", "Entregándoselo", "Aceptándoselo", "Aconsejándoselo", "Acompañándotelo", "Aprendiéndotelo", "Bendiciéndotelo", "Buscándoselo", "Celebrándoselo", "Comentándoselo"],
        superValueWords: [],
        limit: 1 // Solo se necesita 1 para ganar
    }
};

let WORD_DATABASE = {}; // La base de datos de palabras del juego (se copia de la grande al inicio) 

// Mapeo de estilos para la UI
const categoryColors = { "Monosílabos": "text-gray-800", "Agudas": "text-green-800", "Llanas": "text-yellow-800", "Esdrújulas": "text-blue-800", "Sobreesdrújulas": "text-purple-800" };
const categoryBackgrounds = { "Monosílabos": "bg-gray-200", "Agudas": "bg-green-200", "Llanas": "bg-yellow-200", "Esdrújulas": "bg-blue-200", "Sobreesdrújulas": "bg-purple-200" };

/**
 * Genera la base de datos de palabras para la partida actual, copiándola de la base de datos maestra.
 */
function generatePlaythroughWordDatabase() {
    WORD_DATABASE = {};
    for (const category in HUGE_WORD_DATABASE) {
        const baseCategory = HUGE_WORD_DATABASE[category];
        const wordsForThisGame = [...baseCategory.words]; 
        WORD_DATABASE[category] = { ...baseCategory, words: wordsForThisGame };
    }
    console.log("Playthrough word database generated:", WORD_DATABASE);
}

/**
 * Obtiene la fecha y hora actual formateada.
 */
function getFormattedDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    return { date, time };
}

/**
 * Recalcula el ingreso pasivo total en base a las palabras y boosts activos.
 */
function recalculatePassiveIncome() {
    passiveIncome = 0;
    const now = Date.now();
    Object.keys(playerWords).forEach(category => {
        if (playerWords[category] && WORD_DATABASE[category] && category !== "Sobreesdrújulas") {
            const count = playerWords[category].count || 0;
            const baseValue = WORD_DATABASE[category].value; 
            let categoryIncome = count * baseValue;
            // Aplica boost de Super Valor
            if (superValueBoosts[category] && now < superValueBoosts[category]) categoryIncome *= SUPER_VALUE_MULTIPLIER;
            passiveIncome += categoryIncome;
        }
    });
}

/**
 * Reinicia todos los datos del juego para una nueva partida.
 */
function resetGameData() {
    initialCredits = 500; 
    playerMoney = initialCredits;
    passiveIncome = 0;
    usedChallengeWords = {};
    christopherBoostEndTime = 0;
    superValueBoosts = {};
    limboGramaticalEndTime = 0;
    hasBoughtFirstWord = false;
    limboTriggeredThisLevel = false; 
    dealRejectedForLimboBoost = false;
    bossesDefeated = [];
    corruptedWordsBought = 0;
    hasHadFirstRandomAttackThisPartida = false;
    confusionModeEndTime = 0;
    guardianBlessingAvailable = true; 
    if (guardianBlessingTimeout) clearTimeout(guardianBlessingTimeout); 
    guardianBlessingTimeout = null;
    playerStats = { wordsBought: 0, challengesWon: 0, bossesDefeatedCount: 0 }; 
    
    generatePlaythroughWordDatabase();
    playerWords = {};
    Object.keys(WORD_DATABASE).forEach(category => {
        playerWords[category] = { count: 0, list: [] };
    });
}

/**
 * Reinicia el progreso de palabras pero conserva las vidas.
 * Se usa tras fallar un desafío.
 */
function resetProgressButKeepLives() {
    passiveIncome = 0;
    Object.keys(playerWords).forEach(category => {
        if (playerWords[category]) {
            playerWords[category].count = 0;
            playerWords[category].list = [];
        }
    });
    recalculatePassiveIncome();
    updateUI();
}

/**
 * Inicializa el estado del juego al inicio de una partida.
 */
function initializeGameState() {
     playerMoney = 500; 
     playerWords = {};
     usedChallengeWords = {}; 
     consecutiveFailures = 0; 
     bossesDefeated = []; 
     hasBoughtFirstWord = false; 
     isWhispering = false; 
     activeWhisper = ""; 
     corruptedWordsBought = 0;
     hasHadFirstRandomAttackThisPartida = false; 
     confusionModeEndTime = 0; 
     dealRejectedForLimboBoost = false;
     limboTriggeredThisLevel = false; 
     guardianBlessingAvailable = true; 
     if (guardianBlessingTimeout) clearTimeout(guardianBlessingTimeout); 
     guardianBlessingTimeout = null;
     playerStats = { wordsBought: 0, challengesWon: 0, bossesDefeatedCount: 0 }; 
     resetGameData();
}

/**
 * Cambia el estado principal del juego y gestiona los bucles y la música.
 * @param {string} newState - El nuevo estado ('STARTUP', 'PLAYING', 'CINEMATIC', etc.)
 */
function setGameState(newState) {
    if (gameState === newState) return; 
    
    const oldState = gameState;
    gameState = newState;
     console.log(`Game State Changed: ${oldState} -> ${newState}`);

    if (newState !== 'PLAYING') {
        stopGameLoops();
    }
    
    switch (newState) {
        case 'PLAYING':
            if (oldState !== 'CINEMATIC') {
                hideAllModals(); 
            }
            startGameLoops();
            playMainMusic(); 
            if (oldState !== 'CINEMATIC') {
                // Si no venimos de un cinemático, generamos una palabra inicial o retomamos.
                if (!currentWord || !currentWord.word) {
                     console.log("Generating initial word because currentWord is empty.");
                     generateNewWord(true); 
                } else {
                    console.log("Resuming with current word:", currentWord.word);
                     updateTimerBarUI();
                     const elapsedTime = Date.now() - (currentWord.startTime || Date.now());
                     const duration = currentWord.isBonus ? 1000 : 3000;
                     const remainingTime = Math.max(0, duration - elapsedTime);
                     startWordDisplayTimer(remainingTime);
                }
            } else {
                // Si venimos de un cinemático (modal abierto), retomamos el temporizador si estaba activo.
                if (currentWord && currentWord.startTime) {
                    const elapsedTime = Date.now() - currentWord.startTime;
                    const duration = currentWord.isBonus ? 1000 : 3000;
                    const remainingTime = Math.max(0, duration - elapsedTime);
                    console.log(`Resuming word timer after cinematic. Remaining: ${remainingTime}ms`);
                    startWordDisplayTimer(remainingTime);
                } else {
                     console.log("Generating new word after cinematic because currentWord lacks startTime.");
                     generateNewWord(true);
                }
            }
            break;
        case 'STARTUP':
            hideAllModals();
            playMainMusic(); 
            break;
        case 'CINEMATIC':
        case 'CHALLENGE_MINI':
        case 'CHALLENGE_BOSS':
            // En estos estados, los bucles de juego están detenidos.
            break; 
        case 'GAME_OVER':
        case 'GAME_WON':
            stopAllMusic();
            break;
    }
}

/**
 * Muestra un modal de mensaje temporal.
 * @param {string} message - El mensaje a mostrar.
 * @param {number|null} duration - Duración en ms, o null para cierre manual.
 * @param {boolean} isSuccess - Si es un mensaje de éxito (borde azul) o fallo (borde rojo).
 */
function showModal(message, duration = 2500, isSuccess = true) {
    const modal = document.getElementById('messageModal');
    const closeButton = document.getElementById('modalCloseButton');
    const messageModalContent = modal.querySelector('div');
    document.getElementById('modalMessage').textContent = message;

    messageModalContent.classList.remove('border-blue-300', 'border-red-400');
    messageModalContent.classList.add(isSuccess ? 'border-blue-300' : 'border-red-400');

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Pausar el juego si estaba corriendo
     const currentState = gameState;
     if (currentState === 'PLAYING') {
        setGameState('CINEMATIC');
    }

    if (duration !== null) {
        closeButton.classList.add('hidden');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            
            // Volver al estado de juego si se pausó para el modal
            if (gameState === 'CINEMATIC' && currentState !== 'GAME_OVER' && currentState !== 'GAME_WON' && currentView === 'game') {
                 console.log("Auto-closing modal, returning to PLAYING state.");
                 setGameState('PLAYING');
            } else {
                 console.log(`Auto-closing modal, NOT returning to PLAYING. Current state: ${gameState}, Initial state: ${currentState}, Current View: ${currentView}`);
            }
        }, duration);
    } else {
        closeButton.classList.remove('hidden');
    }
}

/**
 * Muestra el modal de confirmación (Sí/No).
 * @param {string} message - El mensaje de confirmación.
 * @param {function} onConfirm - Función a ejecutar si el usuario confirma.
 */
function showConfirmationModal(message, onConfirm) {
    document.getElementById('confirmationMessage').textContent = message;
    document.getElementById('confirmationModal').classList.add('flex');
    document.getElementById('confirmationModal').classList.remove('hidden');
    
    if (gameState === 'PLAYING') {
        setGameState('CINEMATIC');
    }
    confirmCallback = onConfirm;
}

/**
 * Oculta el modal de confirmación.
 */
function hideConfirmationModal() {
    document.getElementById('confirmationModal').classList.remove('flex');
    document.getElementById('confirmationModal').classList.add('hidden');
    
    if (gameState === 'CINEMATIC' && currentView === 'game') {
         setGameState('PLAYING');
    }
    confirmCallback = null;
}

/**
 * Oculta todos los modales del juego.
 */
function hideAllModals() {
    const modalIds = [
        'nameInputModal', 'messageModal', 'confirmationModal', 'wordsModal',
        'thiefMiniChallengeModal', 'bossModal', 
        'thiefWhisperModal', 'randomThiefAttackModal', 'thiefDealModal',
        'guardianModal', 'guardianGiftModal'
    ];
    modalIds.forEach(id => {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            modal.classList.remove('opacity-100', 'opacity-0');
            // Resetear la animación del contenido del jefe
            if (id === 'bossModal') {
                    const content = document.getElementById('bossModalContent');
                    if(content) content.classList.add('opacity-0', 'scale-95');
            }
        }
    });
     if (gameState !== 'GAME_OVER') {
         const goScreen = document.getElementById('gameOverScreen');
         if (goScreen) goScreen.classList.add('hidden');
     }
     if (gameState !== 'GAME_WON') {
         const winScreen = document.getElementById('winScreen');
         if (winScreen) winScreen.classList.add('hidden');
     }
}

/**
 * Cambia la vista principal del juego (inicio, juego, fin).
 * @param {string} view - La vista a mostrar ('startup', 'game', 'gameOver', 'win').
 */
function changeView(view) {
    currentView = view;
    const screenIds = ['gameScreen', 'startupScreen', 'gameOverScreen', 'winScreen', 'gameControls'];
     console.log(`Changing view to: ${view}`);
    
    screenIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
             element.classList.add('hidden');
             element.classList.remove('flex');
        }
    });

    const targetScreenId = `${view}Screen`;
    const targetScreen = document.getElementById(targetScreenId);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
         if (view === 'gameOver' || view === 'win' || view === 'startup') {
            targetScreen.classList.add('flex');
         }
         console.log(`Showing screen: ${targetScreenId}`);
    } else {
         console.error(`Screen element not found: ${targetScreenId}`);
    }

    hideAllModals();
    
    const controls = document.getElementById('gameControls');
    if (controls) {
        if (view === 'game') {
            controls.classList.remove('hidden');
            controls.classList.add('flex');
        } else {
            controls.classList.add('hidden');
            controls.classList.remove('flex');
        }
    }
    
    if (view === 'game') {
        setGameState('PLAYING');
    } else if (view === 'startup') {
        setGameState('STARTUP');
    } else if (view === 'gameOver') {
        setGameState('GAME_OVER');
    } else if (view === 'win') {
        setGameState('GAME_WON');
    }
}

/**
 * Inicia una nueva partida, inicializando los datos y cambiando la vista.
 */
async function startNewGame() {
    initializeGameState(); 
    gameStarted = true;
    changeView('game'); 
    await startGameCommon(false); // Inicia el juego
}

/**
 * Inicia el temporizador de la palabra actual.
 * @param {number} duration - Duración en milisegundos.
 */
function startWordDisplayTimer(duration) {
     console.log(`Starting word timer for ${duration}ms`);
    clearTimeout(wordDisplayTimeout);
    wordDisplayTimeout = setTimeout(() => {
        if (gameState === 'PLAYING') {
             console.log("Word timer expired, generating new word.");
             generateNewWord(true);
        } else {
             console.log("Word timer expired, but game state is not PLAYING.");
        }
    }, duration);
}

/**
 * Muestra el modal del Guardián del Limbo para ofrecer un regalo.
 */
function triggerLimboGramatical() {
    setGameState('CINEMATIC');

    const modal = document.getElementById('guardianModal');
    const dialogueEl = document.getElementById('guardianDialogue');
    const buttons = document.getElementById('guardianButtons');

    document.getElementById('guardianIcon').innerHTML = ICON_LIBRARY.christopherIcon;
    dialogueEl.textContent = '';
    buttons.classList.add('hidden');

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => modal.classList.remove('opacity-0'), 20);

    // Primer diálogo
    typeEffect(dialogueEl, "Soy el Guardián del Limbo. Tu entereza ha abierto un camino hasta mí.", () => {
        setTimeout(() => {
            // Segundo diálogo
            typeEffect(dialogueEl, "Como recompensa, te ofrezco restaurar tus fuerzas y bendecirte con protección temporal. ¿Aceptas mi regalo?", null, false); 
            buttons.classList.remove('hidden');
            buttons.classList.add('flex');
        }, 500);
    });
}

/**
 * Genera una nueva palabra para la compra.
 * @param {boolean} forceNew - Fuerza la generación de una nueva palabra incluso si el juego está pausado (para reanudar).
 */
async function generateNewWord(forceNew = false) {
    if (gameState !== 'PLAYING') {
         console.log("generateNewWord called, but game state is not PLAYING.");
         return;
    }
     console.log(`Generating new word. Force new: ${forceNew}`);
    
    if (forceNew) clearTimeout(wordDisplayTimeout);
    
    // 1. Palabra Corrupta (Susurro del Jefe)
    if (isWhispering && Math.random() < 0.15) { 
         console.log("Generating corrupted word.");
        const randomCorrupted = CORRUPTED_WORDS[Math.floor(Math.random() * CORRUPTED_WORDS.length)];
        const category = randomCorrupted.category;
        const inflationMultiplier = 1 + (passiveIncome / INFLATION_FACTOR); 
        const dynamicValue = Math.floor((HUGE_WORD_DATABASE[category].value + (randomCorrupted.wrong.length * PRICE_PER_LETTER)) * inflationMultiplier);
        currentWord = { word: randomCorrupted.wrong, category: category, value: dynamicValue, isCorrupted: true, rightVersion: randomCorrupted.right, startTime: Date.now() };
        updateUI();
        startWordDisplayTimer(3000);
        return;
    }
    
    // 2. Palabra Christopher (Bonus x2)
    let christopherChance = 0.03; 

    if (Math.random() < christopherChance) {
         console.log("Generating CHRISTOPHER bonus word.");
        currentWord = { word: "CHRISTOPHER", category: "Bonus", value: 0, isBonus: true, startTime: Date.now() };
        updateUI();
        startWordDisplayTimer(1000); 
        return;
    }
    
    // 3. Palabra Normal
    const nonFinalCategories = Object.keys(WORD_DATABASE).filter(c => c !== "Sobreesdrújulas");
    const incompleteCategories = nonFinalCategories.filter(cat => playerWords[cat] && playerWords[cat].count < WORD_DATABASE[cat].limit);
    let categoryPool = (incompleteCategories.length > 0) ? incompleteCategories : nonFinalCategories;
    const allCategoriesCompleted = nonFinalCategories.every(cat => playerWords[cat] && playerWords[cat].count >= WORD_DATABASE[cat].limit);
    let randomCategory = allCategoriesCompleted ? "Sobreesdrújulas" : categoryPool[Math.floor(Math.random() * categoryPool.length)];
    
     if (!playerWords[randomCategory]) playerWords[randomCategory] = { count: 0, list: [] };
     
    let ownedWords = playerWords[randomCategory]?.list || [];
     let availableWords = (WORD_DATABASE[randomCategory]?.words || []).filter(word => !ownedWords.includes(word));
    
    if (availableWords.length === 0 && randomCategory !== "Sobreesdrújulas" && !allCategoriesCompleted) { 
         console.log(`Category ${randomCategory} complete, retrying generation.`);
        setTimeout(() => generateNewWord(true), 50); 
        return;
    }
    
    // Reutilizar palabras de categorías completas
    if (availableWords.length === 0 && (randomCategory === "Sobreesdrújulas" || allCategoriesCompleted)) { 
         console.log(`Reusing words from category ${randomCategory}.`);
         availableWords = (WORD_DATABASE[randomCategory]?.words || []);
         if (availableWords.length === 0) {
             console.error(`No words available in category ${randomCategory}, even after allowing reuse.`);
             currentWord = { word: "ERROR", category: "Error", value: 0, startTime: Date.now() };
             updateUI();
             return;
         }
    }
    
    let randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    let isSuperValue = (WORD_DATABASE[randomCategory].superValueWords || []).includes(randomWord);
    
    // Forzar Súper Valor si Limbo está activo
    const isLimboActive = Date.now() < limboGramaticalEndTime;
    if (isLimboActive && !isSuperValue && randomCategory !== "Sobreesdrújulas" && !currentWord.isBonus && !currentWord.isCorrupted) {
         console.log("Forcing Super Value due to Limbo.");
        isSuperValue = true;
    }
    
    let dynamicValue = WORD_DATABASE[randomCategory].value;
    if (randomCategory !== "Sobreesdrújulas") {
        // Cálculo de la inflación y valor dinámico
        const inflationMultiplier = 1 + (passiveIncome / INFLATION_FACTOR); 
        dynamicValue = Math.floor((WORD_DATABASE[randomCategory].value + (randomWord.length * PRICE_PER_LETTER)) * inflationMultiplier);
        
        if (isSuperValue) {
            dynamicValue *= SUPER_VALUE_MULTIPLIER;
        }
    }
    
     console.log(`Generated word: ${randomWord} (Category: ${randomCategory}, Value: ${dynamicValue}, SuperValue: ${isSuperValue})`);
    currentWord = { word: randomWord, category: randomCategory, value: dynamicValue, isSuperValue, startTime: Date.now() };
    updateUI();
    startWordDisplayTimer(3000); 
}

/**
 * Formatea un número con separadores de miles (punto) y decimales (coma), manteniendo un decimal.
 * @param {number} num - El número a formatear.
 * @returns {string} - El número formateado.
 */
function formatNumber(num) {
    let parts = num.toFixed(1).toString().split('.');
    // Reemplazar separador de miles por coma (para formato español/latino)
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

/**
 * Actualiza la interfaz de usuario con los datos del estado del juego.
 */
function updateUI() {
    // Inicialización de seguridad de la base de datos
    if (!WORD_DATABASE || Object.keys(WORD_DATABASE).length === 0) {
        console.error("WORD_DATABASE is empty in updateUI. Regenerating...");
        generatePlaythroughWordDatabase();
        Object.keys(WORD_DATABASE).forEach(category => {
             if (!playerWords[category]) {
                 playerWords[category] = { count: 0, list: [] };
             }
        });
     }

    // Actualizar dinero e ingresos
    document.getElementById('playerMoney').textContent = Math.floor(playerMoney).toLocaleString('es-ES').replace(/\./g, ',');
    recalculatePassiveIncome();
    let finalPassiveIncome = passiveIncome;
    // Aplicar boosts de Christopher y Limbo al ingreso pasivo
    if (Date.now() < christopherBoostEndTime) finalPassiveIncome *= 2;
    if (Date.now() < limboGramaticalEndTime) finalPassiveIncome *= 1.21;
    document.getElementById('passiveIncome').textContent = formatNumber(finalPassiveIncome);

    // Actualizar palabra actual
    if (currentWord.word) {
        const currentWordEl = document.getElementById('currentWord');
        const wordCategoryEl = document.getElementById('wordCategory');
        const wordValueEl = document.getElementById('wordValue');
        
        if(currentWordEl && wordCategoryEl && wordValueEl) {
            let wordClass = "";
            if (currentWord.isBonus) wordClass = "rainbow-text font-black";
            else if (currentWord.isSuperValue) wordClass = "super-value-text font-black";
            else if (currentWord.isCorrupted) wordClass = "text-red-700 font-black corrupted-text-effect";
            else wordClass = `${categoryColors[currentWord.category] || "text-gray-800"} font-black`;
            
            currentWordEl.innerHTML = `<span class="${wordClass}">${currentWord.word}</span>`;
            wordCategoryEl.textContent = currentWord.category;
            
            const buyButton = document.getElementById('buyButton');
            let canAfford = playerMoney >= currentWord.value;
            let isOwned = false;
            let isCategoryComplete = false;

            if (currentWord.category && !playerWords[currentWord.category]) {
                 playerWords[currentWord.category] = { count: 0, list: [] };
            }

            if (!currentWord.isBonus && !currentWord.isCorrupted && currentWord.category && playerWords[currentWord.category]) {
                const categoryData = playerWords[currentWord.category];
                const limit = WORD_DATABASE[currentWord.category]?.limit;
                isCategoryComplete = categoryData && typeof limit === 'number' && categoryData.count >= limit;
                isOwned = (categoryData.list || []).includes(currentWord.word);
            }
            
             if (currentWord.category === "Sobreesdrújulas") {
                currentWord.value = HUGE_WORD_DATABASE["Sobreesdrújulas"].value; 
                canAfford = playerMoney >= currentWord.value;
            }
            
            // Deshabilitar botón si no se puede pagar, ya es dueño, o la categoría está completa.
            buyButton.disabled = (!canAfford && !currentWord.isBonus) || isOwned || isCategoryComplete;
            buyButton.classList.toggle('opacity-50', buyButton.disabled);
            buyButton.classList.toggle('cursor-not-allowed', buyButton.disabled);

            if (isCategoryComplete && currentWord.category !== "Sobreesdrújulas") {
                wordValueEl.textContent = 'Categoría Completa';
            } else if (currentWord.isBonus) {
                wordValueEl.textContent = '¡BONUS X2!';
            } else if (currentWord.isCorrupted) {
                wordValueEl.textContent = `Pagar: ${Math.floor(currentWord.value).toLocaleString('es-ES').replace(/\./g, ',')} (¡RIESGO!)`;
            } else {
                let valueHTML = `${Math.floor(currentWord.value).toLocaleString('es-ES').replace(/\./g, ',')}`;
                wordValueEl.innerHTML = valueHTML;
            }
        } else {
             console.error("Error updating current word UI: Elements not found.");
        }
    } else {
         console.log("UpdateUI called but currentWord is empty.");
    }

    // Actualizar contador de vidas
    const remainingLives = Math.max(0, 3 - consecutiveFailures);
    const lifeCounter = document.getElementById('lifeCounter');
    lifeCounter.textContent = `${remainingLives}/3`;
    const lifeCounterContainer = document.getElementById('lifeCounterContainer');
    lifeCounterContainer.classList.remove('border-green-300', 'border-yellow-400', 'border-red-500');
    if (remainingLives === 3) lifeCounterContainer.classList.add('border-green-300');
    else if (remainingLives === 2) lifeCounterContainer.classList.add('border-yellow-400');
    else lifeCounterContainer.classList.add('border-red-500');
    
    // Actualizar Inventario
    const now = Date.now();
    const limboIsActive = now < limboGramaticalEndTime;
    
    const inventoryContainer = document.getElementById('inventoryContainer');
     inventoryContainer.innerHTML = '';
    
    Object.keys(WORD_DATABASE).forEach(category => {
        const data = playerWords[category] || { count: 0, list: [] };
        const limit = WORD_DATABASE[category]?.limit; 
        const isCompleted = typeof limit === 'number' ? data.count >= limit : true;

        const categoryDiv = document.createElement('div');
        const bgColor = categoryBackgrounds[category] || 'bg-gray-200';
        const textColor = categoryColors[category] || 'text-gray-800';
        
        categoryDiv.className = `relative flex-1 flex-shrink-0 text-center flex flex-col items-center justify-between p-2 rounded-lg shadow-md ${isCompleted ? "bg-gray-300 text-gray-500" : bgColor}`;
        
        // Iconos de Boosts Activos en la categoría
        const isChrisActive = Date.now() < christopherBoostEndTime;
        const isSuperValueActiveForThisCategory = superValueBoosts[category] && Date.now() < superValueBoosts[category];
        let boostIconsHTML = '<div class="absolute top-0 right-1 flex flex-col items-end">';
        if (isChrisActive && category !== "Sobreesdrújulas") boostIconsHTML += `<span class="rainbow-text font-bold text-xs">x2</span>`;
        if (isSuperValueActiveForThisCategory) boostIconsHTML += `<span class="super-value-text font-bold text-xs">SV</span>`;
        boostIconsHTML += '</div>';

        const limitText = typeof limit === 'number' ? limit : 'N/A';

        categoryDiv.innerHTML = `
            ${boostIconsHTML}
            <p class="font-bold ${textColor}">${category}</p>
            <p class="text-2xl font-extrabold ${textColor}">${data.count}/${limitText}</p>
        `;
        inventoryContainer.appendChild(categoryDiv);
    });
}

/**
 * Comprueba si se debe activar el Limbo Gramatical (Guardián).
 */
function checkLimboActivation() {
    const baseChance = 0.05; 
    const criticalChance = 1.0; 
    
    let currentChance = (consecutiveFailures === 2) ? criticalChance : baseChance;
    
    if (!limboTriggeredThisLevel && Math.random() < currentChance) {
        limboTriggeredThisLevel = true; 
        triggerLimboGramatical(); 
    }
}

/**
 * Lógica de compra de palabra o activación de bonus.
 */
function buyWord() {
     console.log("Buy button clicked for word:", currentWord?.word);
    if (playerMoney < currentWord.value && !currentWord.isBonus) {
         console.log("Cannot afford word.");
         return;
     }
    
    // Manejo de palabra corrupta
    if (currentWord.isCorrupted) {
         console.log("Buying corrupted word.");
        playerMoney -= currentWord.value;
        corruptedWordsBought++;
        showWhisperModal(BOSS_TAUNT);
        updateUI();
        generateNewWord(true);
        return;
    }
    
    let wordBought = false;
    // Manejo de palabra CHRISTOPHER (Bonus)
    if (currentWord.isBonus) {
         console.log("Activating CHRISTOPHER bonus.");
        const now = Date.now();
        const baseDuration = 60000; // 1 minuto
        const remainingTime = (christopherBoostEndTime > now) ? (christopherBoostEndTime - now) : 0;
        christopherBoostEndTime = now + remainingTime + baseDuration; 
        wordBought = true;
    } else {
         console.log("Attempting to buy regular word:", currentWord.word, "Category:", currentWord.category);
         
         if (!playerWords[currentWord.category]) {
              playerWords[currentWord.category] = { count: 0, list: [] };
              console.log("Initialized playerWords for category:", currentWord.category);
         }
         
        const categoryData = playerWords[currentWord.category];
        const limit = WORD_DATABASE[currentWord.category]?.limit;

        console.log(`Category Data: count=${categoryData.count}, limit=${limit}`);
        console.log(`Word already in list? ${categoryData.list.includes(currentWord.word)}`);

        // Manejo de Sobreesdrújulas (Condición de Victoria)
        if (currentWord.category === "Sobreesdrújulas") {
            playerMoney -= currentWord.value;
            wordBought = true;
            
            if (categoryData.count === 0) {
                categoryData.count = 1;
                categoryData.list.push(currentWord.word);
                
                const { date, time } = getFormattedDateTime();
                const winReport = `¡VICTORIA, ${playerName}! Has ganado el ${date} a las ${time}.`;
                console.log("Win condition met, preparing win screen...");
                document.getElementById('winMessage').textContent = winReport;
                
                const restartBtn = document.getElementById('reiniciarButton');
                if(restartBtn) restartBtn.disabled = false;
                
                console.log("Calling changeView('win')...");
                changeView('win');
                return;
            } else {
                categoryData.list.push(currentWord.word);
            }
        } 
        // Manejo de palabras normales
        else if (typeof limit === 'number' && categoryData.count < limit && !categoryData.list.includes(currentWord.word)) {
             console.log("Buying new word.");
            playerMoney -= currentWord.value;
            categoryData.count++;
            categoryData.list.push(currentWord.word);
            wordBought = true;
            // Activar boost de Super Valor por categoría
            if (currentWord.isSuperValue) {
                 console.log("Activating Super Value bonus.");
                const now = Date.now();
                const category = currentWord.category;
                const baseDuration = 10000; // 10 segundos
                const remainingTime = (superValueBoosts[category] > now) ? (superValueBoosts[category] - now) : 0;
                superValueBoosts[category] = now + remainingTime + baseDuration; 
            }
        } else {
             console.log("Word is already owned or category is full.");
        }
    }

    if (wordBought) {
        if (!hasBoughtFirstWord) hasBoughtFirstWord = true;
        
        if (!currentWord.isBonus && currentWord.category !== "Sobreesdrújulas") {
            playerStats.wordsBought++; 
             console.log("Total words bought:", playerStats.wordsBought);
        }

        document.getElementById('buyButton').disabled = true;
         updateUI();
        clearTimeout(wordDisplayTimeout);
        
        // Retomar generación de palabra después de una breve pausa
        setTimeout(() => {
            if (gameState === 'PLAYING') { 
                if (!currentWord.isBonus && currentWord.category !== "Sobreesdrújulas") {
                    checkBossEncounter(); 
                }
                
                checkLimboActivation(); 
                
                const elapsedTime = Date.now() - currentWord.startTime;
                const duration = currentWord.isBonus ? 1000 : 3000;
                // Tiempo restante para la siguiente palabra (un poco más rápido después de la compra)
                const newRemainingTime = Math.max(100, (duration - elapsedTime) - 1000);
                startWordDisplayTimer(newRemainingTime);
            }
        }, 0); 
    }
}

/**
 * Inicia el mini-reto del Ladrón.
 * @param {string} forcedType - Tipo de reto forzado ('accent', 'trueFalse', 'tonicSyllable').
 */
function startThiefMiniChallenge(forcedType = null) {
    const allCategoriesCompleted = Object.keys(WORD_DATABASE).filter(c => c !== "Sobreesdrújulas").every(cat => playerWords[cat] && playerWords[cat].count >= WORD_DATABASE[cat].limit);
    
    if (gameState !== 'PLAYING' || allCategoriesCompleted) return;
    
    setGameState('CHALLENGE_MINI');
    playThiefMusic(); 

    const challengeTypes = ['accent', 'trueFalse', 'tonicSyllable'];
    const type = forcedType || challengeTypes[Math.floor(Math.random() * challengeTypes.length)];
    currentChallengeData = { type };

    const modal = document.getElementById('thiefMiniChallengeModal');
    const descriptionEl = document.getElementById('challengeDescription');
    const questionEl = document.getElementById('challengeQuestion');
    const inputContainer = document.getElementById('challengeInputContainer');
    const buttonsContainer = document.getElementById('challengeButtonsContainer');
    const inputEl = document.getElementById('challengeInput');
    const timerEl = document.getElementById('challengeTimer');

    document.getElementById('thiefMiniChallengeIcon').innerHTML = ICON_LIBRARY.bossIcon;
    inputEl.value = '';

    let timeLeft;

    // Lógica específica para cada tipo de reto
    switch (type) {
        case 'accent':
            timeLeft = 20;
            descriptionEl.textContent = 'Escribe la palabra con la tilde correcta:';
            const accentChallenge = MINI_CHALLENGE_WORDS.accent[Math.floor(Math.random() * MINI_CHALLENGE_WORDS.accent.length)];
            currentChallengeData.answer = accentChallenge.right;
            questionEl.textContent = accentChallenge.wrong;
            inputContainer.classList.remove('hidden');
            buttonsContainer.classList.add('hidden');
            inputEl.focus();
            break;
        case 'trueFalse':
            timeLeft = 20;
            descriptionEl.textContent = '¿La clasificación es correcta?';
            const tfChallenge = MINI_CHALLENGE_WORDS.trueFalse[Math.floor(Math.random() * MINI_CHALLENGE_WORDS.trueFalse.length)];
            currentChallengeData.answer = tfChallenge.isCorrect;
            questionEl.textContent = `"${tfChallenge.word}" - ${tfChallenge.category}`;
            inputContainer.classList.add('hidden');
            buttonsContainer.classList.remove('hidden');
            buttonsContainer.classList.add('flex');
            break;
        case 'tonicSyllable': 
            timeLeft = 25;
            descriptionEl.textContent = 'Escribe la sílaba tónica (sin tilde):';
            const tonicChallenge = TONIC_SYLLABLE_WORDS[Math.floor(Math.random() * TONIC_SYLLABLE_WORDS.length)];
            currentChallengeData.answer = tonicChallenge.syllable.toLowerCase(); 
            questionEl.textContent = tonicChallenge.word;
            inputContainer.classList.remove('hidden');
            buttonsContainer.classList.add('hidden');
            inputEl.focus();
            break;
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    timerEl.textContent = timeLeft;
    challengeTimerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) endThiefMiniChallenge(null); // Fallo por tiempo
    }, 1000);
}

/**
 * Finaliza el mini-reto del Ladrón y aplica las consecuencias.
 * @param {string|boolean|null} playerAnswer - La respuesta del jugador (string para texto, boolean para V/F, null para tiempo agotado).
 */
function endThiefMiniChallenge(playerAnswer) {
    clearInterval(challengeTimerInterval);
    
    playMainMusic();
    
    const modal = document.getElementById('thiefMiniChallengeModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    
    let isCorrect = false;
    let failureReason = "Respuesta incorrecta.";
    
    switch (currentChallengeData.type) {
        case 'accent':
        case 'tonicSyllable': 
            // Comparar respuesta de texto
            if (playerAnswer && playerAnswer.trim().toLowerCase() === currentChallengeData.answer.toLowerCase()) {
                isCorrect = true;
            }
            if(!playerAnswer) {
                failureReason = "No se introdujo respuesta.";
            } else if (currentChallengeData.type === 'accent') {
                failureReason = `Incorrecto. La respuesta era "${currentChallengeData.answer}".`;
            } else { 
                 failureReason = `Incorrecto. La sílaba tónica era "${currentChallengeData.answer}".`;
            }
            break;
        case 'trueFalse':
            // Comparar respuesta booleana
            if (playerAnswer === currentChallengeData.answer) {
                isCorrect = true;
            }
            failureReason = `Incorrecto. La clasificación era ${currentChallengeData.answer ? 'Verdadera' : 'Falsa'}.`;
            break;
    }

    if(playerAnswer === null) failureReason = "Se acabó el tiempo.";

    if (isCorrect) {
        playerStats.challengesWon++; 
        const reward = CHALLENGE_REWARDS.base; 
        playerMoney += reward;
        showModal(`¡Correcto! Ganas ${reward.toLocaleString('es-ES', { useGrouping: true }).replace(/\./g, ',')}.`);
    } else {
        handleChallengeFailure(failureReason);
    }
     if (gameState !== 'GAME_OVER') {
          setGameState('PLAYING');
     }
}

/**
 * Maneja un fallo en un desafío (aumenta el contador de fallos/vidas).
 * @param {string} reason - Razón del fallo.
 */
function handleChallengeFailure(reason) {
    consecutiveFailures++;
    
    // Lógica de Bendición del Guardián (revivir)
    if (consecutiveFailures === 1 && guardianBlessingAvailable) {
        guardianBlessingAvailable = false; 
        if (guardianBlessingTimeout) clearTimeout(guardianBlessingTimeout); 
        guardianBlessingTimeout = setTimeout(() => {
            if (gameState !== 'GAME_OVER' && consecutiveFailures > 0) { 
                consecutiveFailures--;
                showGuardianGiftModal("El Guardián sintió tu tropiezo...", "¡Te devuelve 1 vida!");
                updateUI(); 
            }
            guardianBlessingTimeout = null; 
        }, 21000); 
    }

    checkForThiefDeal(() => {
        showWhisperModal(BOSS_TAUNT, () => {
            showFailureMessage(reason);
        });
    });
}

/**
 * Muestra el mensaje de fallo y maneja el Game Over si se agotan las vidas.
 * @param {string} reason - Razón del fallo.
 */
function showFailureMessage(reason) {
    if (consecutiveFailures >= 3) {
         if (guardianBlessingTimeout) { 
            clearTimeout(guardianBlessingTimeout);
            guardianBlessingTimeout = null;
         }
        document.getElementById('gameOverMessage').textContent = `Fallaste 3 veces. Razón final: ${reason}`;
        changeView('gameOver');
    } else {
        resetProgressButKeepLives();
        showModal(`¡Fallo! ${reason}. Has perdido tus palabras. Te quedan ${3 - consecutiveFailures} intentos.`, 4000, false); 
    }
}

/**
 * Muestra el modal del Jefe con animación.
 */
function showBossModal() {
    const modal = document.getElementById('bossModal');
    const modalContent = document.getElementById('bossModalContent');
    modal.classList.remove('hidden');
    modal.classList.add('flex'); 
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalContent.classList.remove('opacity-0', 'scale-95');
    }, 20);
}

/**
 * Oculta el modal del Jefe con animación.
 * @param {function} callback - Función a ejecutar al finalizar la animación.
 */
function hideBossModal(callback) {
    const modal = document.getElementById('bossModal');
    const modalContent = document.getElementById('bossModalContent');
    modal.classList.add('opacity-0');
    modalContent.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        if (callback) callback();
    }, 300);
}

/**
 * Comprueba si se ha alcanzado un hito para un encuentro con el Jefe.
 */
function checkBossEncounter() {
    if (gameState !== 'PLAYING') return;
    
    const wordsPurchased = playerStats.wordsBought; 
    const nextBossLevel = bossesDefeated.length + 1;
    const milestone = BOSS_MILESTONES[nextBossLevel];
    
    if (!milestone || bossesDefeated.includes(nextBossLevel)) return;
    
    const whisperThreshold = milestone - 5; 
    
    if (wordsPurchased >= milestone) {
         console.log(`Milestone reached (${milestone}), starting boss challenge level ${nextBossLevel}.`);
        startBossChallenge(nextBossLevel);
    } else if (wordsPurchased >= whisperThreshold && !isWhispering) { 
         console.log("Whisper threshold reached.");
        isWhispering = true; // El jefe empieza a susurrar (palabras corruptas)
    }
}

/**
 * Inicia el desafío del Jefe.
 * @param {number} level - Nivel del Jefe (determina la dificultad de la frase).
 */
function startBossChallenge(level) {
    isWhispering = false;
    activeWhisper = "";
    
    setGameState('CHALLENGE_BOSS');
    playThiefMusic();
    
    currentBossLevel = level;
    const sentencesForLevel = BOSS_SENTENCES[level] || BOSS_SENTENCES[Object.keys(BOSS_SENTENCES).pop()]; 
    currentBossSentence = sentencesForLevel[Math.floor(Math.random() * sentencesForLevel.length)];
    
    const dialogueEl = document.getElementById('bossDialogue');
    const challengeContent = document.getElementById('bossChallengeContent');
    const sentenceEl = document.getElementById('bossChallengeSentence');
    const inputEl = document.getElementById('bossChallengeInput');
    const timerEl = document.getElementById('bossTimer');
    document.getElementById('bossIconContainer').innerHTML = ICON_LIBRARY.bossIcon;
    challengeContent.classList.add('hidden');
    inputEl.value = '';
    dialogueEl.textContent = '';
    showBossModal();
    
    const dialogueText = BOSS_INITIAL_DIALOGUES[Math.floor(Math.random() * BOSS_INITIAL_DIALOGUES.length)];
    
    // Efecto de mecanografía para el diálogo
    typeEffect(dialogueEl, dialogueText, () => {
        challengeContent.classList.remove('hidden');
        sentenceEl.textContent = currentBossSentence.wrong;
        inputEl.focus();
        
        const totalTime = 60;
        const timeDebuffPerWord = 0.03; 
        // Reducción de tiempo por palabras corruptas compradas
        const timeDebuff = totalTime * timeDebuffPerWord * corruptedWordsBought; 
        let timeLeft = Math.max(15, Math.floor(totalTime - timeDebuff));
        
        timerEl.textContent = timeLeft;
        bossTimerInterval = setInterval(() => {
            timeLeft--;
            timerEl.textContent = timeLeft;
            if (timeLeft <= 0) endBossChallenge(false); // Fallo por tiempo
        }, 1000);
    });
    
    // Listener para la tecla Enter
    inputEl.onkeyup = (event) => {
        if (event.key === 'Enter') {
            // Normaliza la respuesta del jugador: elimina espacios extra, minúsculas, elimina tildes para una comparación parcial (no, el juego requiere tildes)
            const normalizedPlayerAnswer = inputEl.value.trim().replace(/\s{2,}/g, ' ');
            const normalizedCorrectAnswer = currentBossSentence.right.trim().replace(/\s{2,}/g, ' ');
            
            endBossChallenge(normalizedPlayerAnswer === normalizedCorrectAnswer);
        }
    };
}

/**
 * Muestra un texto con efecto de mecanografía.
 * @param {HTMLElement} element - El elemento donde escribir.
 * @param {string} text - El texto a escribir.
 * @param {function} onCompleteCallback - Callback al finalizar.
 * @param {number|null|boolean} autoCloseDelay - Retraso para cerrar el modal o false para no cerrar.
 */
function typeEffect(element, text, onCompleteCallback, autoCloseDelay = null) {
    let i = 0;
    element.textContent = '';
    const modalContent = element.closest('.bg-gray-800, .bg-white');
    const dealButtons = modalContent?.querySelector('#thiefDealButtons');
    const giftButtons = modalContent?.querySelector('#guardianButtons');
    
    // Ocultar botones mientras se escribe el diálogo
    if (dealButtons) dealButtons.classList.add('hidden');
    if (giftButtons) giftButtons.classList.add('hidden');

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50); // Velocidad de escritura
        } else {
            // Mostrar botones o ejecutar callback al finalizar
            if ((autoCloseDelay === null || autoCloseDelay === false) && !onCompleteCallback) {
                if (dealButtons) {
                    dealButtons.classList.remove('hidden');
                    dealButtons.classList.add('flex');
                }
                if (giftButtons) {
                    giftButtons.classList.remove('hidden');
                    giftButtons.classList.add('flex');
                }
            }
            if (onCompleteCallback) setTimeout(onCompleteCallback, 500); 

            // Cierre automático del modal
            if(typeof autoCloseDelay === 'number') {
                setTimeout(() => {
                    const modal = element.closest('.boss-modal-bg, .christopher-modal-bg');
                    if (modal) {
                        modal.classList.add('opacity-0');
                        setTimeout(() => {
                            modal.classList.add('hidden');
                            modal.classList.remove('flex');
                            
                            if (gameState === 'CINEMATIC' && currentView === 'game') {
                                 console.log("Auto-closing typeEffect modal, returning to PLAYING.");
                                 setGameState('PLAYING');
                            } else {
                                 console.log(`Auto-closing typeEffect modal, NOT returning to PLAYING. State: ${gameState}, View: ${currentView}`);
                            }
                        }, 300);
                    }
                }, autoCloseDelay);
            }
        }
    }
    type();
}

/**
 * Finaliza el desafío del Jefe y aplica las recompensas o penalizaciones.
 * @param {boolean} isCorrect - Si la respuesta del jugador fue correcta.
 */
async function endBossChallenge(isCorrect) {
    clearInterval(bossTimerInterval);
    
    setGameState('CINEMATIC');
    
    document.getElementById('bossChallengeContent').classList.add('hidden');
    const dialogueEl = document.getElementById('bossDialogue');
    dialogueEl.textContent = '';
    
    if (isCorrect) {
         console.log(`Boss level ${currentBossLevel} defeated.`);
        bossesDefeated.push(currentBossLevel);
        playerStats.bossesDefeatedCount = bossesDefeated.length;
        
        // Recompensa en porcentaje del dinero actual
        const rewardPercentage = { 1: 0.10, 2: 0.15, 3: 0.20, 4: 0.25, 5: 0.30, 6: 0.35, 7: 0.40, 8: 0.50 }[currentBossLevel] || 0.05; 
        const moneyReward = Math.floor(playerMoney * rewardPercentage);
        playerMoney += moneyReward;
        
        const finalDialogue = BOSS_VICTORY_DIALOGUES[Math.floor(Math.random() * BOSS_VICTORY_DIALOGUES.length)];
        const resultMessage = `¡VICTORIA! Ganas un ${Math.floor(rewardPercentage * 100)}% de tu dinero (+${moneyReward.toLocaleString('es-ES', { useGrouping: true }).replace(/\./g, ',')}).`;
        
        typeEffect(dialogueEl, finalDialogue, () => hideBossModal(() => {
            playMainMusic(); 
            showModal(resultMessage); 
        }));
    } else {
         console.log(`Boss level ${currentBossLevel} failed.`);
        consecutiveFailures++;
        
        // Lógica de Bendición del Guardián (revivir)
        if (consecutiveFailures === 1 && guardianBlessingAvailable) {
             guardianBlessingAvailable = false;
             if (guardianBlessingTimeout) clearTimeout(guardianBlessingTimeout);
             guardianBlessingTimeout = setTimeout(() => {
                if (gameState !== 'GAME_OVER' && consecutiveFailures > 0) {
                    consecutiveFailures--;
                    showGuardianGiftModal("El Guardián sintió tu tropiezo...", "¡Te devuelve 1 vida!");
                    updateUI();
                }
                guardianBlessingTimeout = null;
             }, 21000);
        }

        checkForThiefDeal(() => {
            // Penalización en porcentaje del dinero actual
            let moneyLost = playerMoney * ({ 1: 0.10, 2: 0.20, 3: 0.30, 4: 0.40, 5: 0.50, 6: 0.50, 7: 0.50, 8: 0.50 }[currentBossLevel] || 0.1); 
            playerMoney = Math.max(0, playerMoney - Math.floor(moneyLost));
            
            const finalDialogue = BOSS_DEFEAT_DIALOGUES[Math.floor(Math.random() * BOSS_DEFEAT_DIALOGUES.length)];
            const resultMessage = `¡DERROTA! El Ladrón te roba ${Math.floor(moneyLost).toLocaleString('es-ES', { useGrouping: true }).replace(/\./g, ',')}. Pierdes 1 vida.`;
            
            typeEffect(dialogueEl, finalDialogue, () => hideBossModal(() => {
                playMainMusic(); 
                if (consecutiveFailures >= 3) {
                     if (guardianBlessingTimeout) { 
                        clearTimeout(guardianBlessingTimeout);
                        guardianBlessingTimeout = null;
                     }
                    document.getElementById('gameOverMessage').textContent = `Fallaste 3 veces. El Ladrón de Tildes fue tu perdición.`;
                    changeView('gameOver'); 
                } else {
                    showModal(resultMessage, 4000, false); 
                }
            }));
        }); 
    } 
     updateUI();
} 

/**
 * Función que se ejecuta periódicamente para activar eventos aleatorios (mini-retos, ataques, regalos).
 */
function triggerRandomEvent() {
    const allCategoriesCompleted = Object.keys(WORD_DATABASE).filter(c => c !== "Sobreesdrújulas").every(cat => playerWords[cat] && playerWords[cat].count >= WORD_DATABASE[cat].limit);
    
    if (!gameStarted || gameState !== 'PLAYING' || !hasBoughtFirstWord || allCategoriesCompleted) return;

    const rand = Math.random();
     console.log(`Random event check. Rand: ${rand.toFixed(2)}`);

    // 1. Mini-Retos (Probabilidad 10%)
    if (rand < 0.04) { console.log("Triggering mini-challenge: accent"); startThiefMiniChallenge('accent'); }         
    else if (rand < 0.07) { console.log("Triggering mini-challenge: trueFalse"); startThiefMiniChallenge('trueFalse'); }  
    else if (rand < 0.10) { console.log("Triggering mini-challenge: tonicSyllable"); startThiefMiniChallenge('tonicSyllable'); } 
    
    // 2. Ataque Aleatorio del Ladrón (Probabilidad 10%)
    else if (rand < 0.20) {
        console.log("Triggering random thief attack.");
        let attackType;
        
        // Garantizar un robo de vida la primera vez
        if (!hasHadFirstRandomAttackThisPartida) {
            attackType = 'lifeTheft';
            hasHadFirstRandomAttackThisPartida = true;
        } else {
            const attacks = ['incomeTheft', 'wordTheft'];
            attackType = attacks[Math.floor(Math.random() * attacks.length)];
        }
         console.log(`Thief attack type: ${attackType}`);

        showRandomThiefAttackModal(
            () => { 
                switch (attackType) {
                    case 'lifeTheft':
                        return { title: 'Robo de Vidas', effectText: "¡Has perdido 1 vida!", onComplete: () => {
                            consecutiveFailures++;
                            // Comprobar si se activa la bendición del Guardián
                            if (consecutiveFailures === 1 && guardianBlessingAvailable) {
                                 guardianBlessingAvailable = false;
                                 if (guardianBlessingTimeout) clearTimeout(guardianBlessingTimeout);
                                 guardianBlessingTimeout = setTimeout(() => {
                                    if (gameState !== 'GAME_OVER' && consecutiveFailures > 0) {
                                        consecutiveFailures--;
                                        showGuardianGiftModal("El Guardián sintió tu tropiezo...", "¡Te devuelve 1 vida!");
                                        updateUI();
                                    }
                                    guardianBlessingTimeout = null;
                                 }, 21000);
                            }
                            checkForThiefDeal(() => {
                                updateUI();
                                if (consecutiveFailures >= 3) {
                                    if (guardianBlessingTimeout) { clearTimeout(guardianBlessingTimeout); guardianBlessingTimeout = null; } 
                                    showFailureMessage("El Ladrón te ha dado el golpe de gracia.");
                                }
                            });
                        }};
                    case 'incomeTheft':
                        const moneyStolen = Math.floor(playerMoney * 0.15);
                        return { title: 'Robo de Ingresos', effectText: `¡Te ha robado el 15% de tu dinero! (-${moneyStolen.toLocaleString('es-ES', { useGrouping: true }).replace(/\./g, ',')})`, onComplete: () => {
                            playerMoney -= moneyStolen;
                            updateUI();
                        }};
                    case 'wordTheft':
                        // Busca una categoría con palabras para robar
                        const ownableCategories = Object.keys(playerWords).filter(cat => cat !== "Sobreesdrújulas" && playerWords[cat]?.count > 0);
                        if (ownableCategories.length > 0) {
                            const randomCategory = ownableCategories[Math.floor(Math.random() * ownableCategories.length)];
                            const wordsInCategory = playerWords[randomCategory].list;
                            const wordsToStealCount = Math.max(1, Math.floor(wordsInCategory.length * 0.10));
                            
                            return { title: 'Robo de Palabras', effectText: `¡Ha robado ${wordsToStealCount} palabra(s) de la categoría ${randomCategory}!`, onComplete: () => {
                                for(let i = 0; i < wordsToStealCount; i++) {
                                    if(wordsInCategory.length > 0) {
                                        const randomIndex = Math.floor(Math.random() * wordsInCategory.length);
                                        wordsInCategory.splice(randomIndex, 1);
                                    }
                                }
                                playerWords[randomCategory].count -= wordsToStealCount;
                                updateUI();
                            }};
                        } else { 
                             // Fallback si no hay palabras para robar
                             const moneyStolenFallback = Math.floor(playerMoney * 0.15);
                             return { title: 'Robo de Ingresos', effectText: `Iba a robar palabras, pero no tienes. Me conformo con ${moneyStolenFallback.toLocaleString('es-ES', { useGrouping: true }).replace(/\./g, ',')}`, onComplete: () => {
                                playerMoney -= moneyStolenFallback;
                                updateUI();
                            }};
                        }
                }
            }
        );
    }
    // 3. Regalo del Guardián (Probabilidad 20%)
    else if (rand < 0.40) { 
         console.log("Triggering guardian gift.");
         triggerGuardianGift();
    } else {
         console.log("No random event triggered this cycle.");
    }
}

/**
 * Activa y muestra el regalo aleatorio del Guardián.
 */
function triggerGuardianGift() {
    const giftRand = Math.random();
    let dialogue, effectText;
    let moneyGained = 0;

    if (giftRand < 0.95) { 
         console.log("Guardian gift: Wealth.");
        dialogue = "Veo tu esfuerzo, acepta esta ayuda.";
        const moneyPercent = 0.05 + Math.random() * 0.10; 
        moneyGained = Math.floor(playerMoney * moneyPercent);
        effectText = `¡Don de Riqueza! (+${moneyGained.toLocaleString('es-ES', { useGrouping: true }).replace(/\./g, ',')})`;
        playerMoney += moneyGained;
    } else { 
         console.log("Guardian gift: Protection (Limbo).");
        dialogue = "¡Protégete de la oscuridad!";
        effectText = "¡Don de Protección! (Limbo Gramatical +1 min)";
        limboGramaticalEndTime = Date.now() + 60000; 
    }
    
    showGuardianGiftModal(dialogue, effectText);
    updateUI(); 
}

/**
 * Muestra el modal para el regalo del Guardián (efecto inmediato).
 * @param {string} dialogue - Diálogo del Guardián.
 * @param {string} effectText - Texto del efecto aplicado.
 */
function showGuardianGiftModal(dialogue, effectText) {
    const modal = document.getElementById('guardianGiftModal');
    const dialogueEl = document.getElementById('guardianGiftDialogue');
    const effectDiv = document.getElementById('guardianGiftEffect');
    const effectTextEl = document.getElementById('guardianGiftEffectText');
    
    document.getElementById('guardianGiftIcon').innerHTML = ICON_LIBRARY.christopherIcon;
    
    dialogueEl.textContent = '';
    effectDiv.classList.add('hidden');
    
    setGameState('CINEMATIC');
    
    modal.classList.remove('hidden');
    modal.classList.add('flex'); 
    setTimeout(() => modal.classList.remove('opacity-0'), 20);

    // Efecto de mecanografía y cierre automático
    typeEffect(dialogueEl, dialogue, () => {
        effectTextEl.textContent = effectText;
        effectDiv.classList.remove('hidden');
    }, 4000); 
}

/**
 * Muestra el modal para el ataque aleatorio del Ladrón.
 * @param {function} getAttackDetailsCallback - Callback que devuelve los detalles del ataque y el efecto.
 */
function showRandomThiefAttackModal(getAttackDetailsCallback) {
    const modal = document.getElementById('randomThiefAttackModal');
    const dialogueEl = document.getElementById('randomThiefDialogue');
    const effectDiv = document.getElementById('randomThiefEffect');
    
    document.getElementById('randomThiefIcon').innerHTML = ICON_LIBRARY.bossIcon;
    
    dialogueEl.textContent = ''; 
    dialogueEl.classList.add('hidden'); 
    effectDiv.classList.add('hidden');
    
    setGameState('CINEMATIC');
    playThiefMusic(); 

    modal.classList.remove('hidden');
    modal.classList.add('flex'); 
    setTimeout(() => modal.classList.remove('opacity-0'), 20);

    const { title, effectText, onComplete } = getAttackDetailsCallback();
    modal.querySelector('h4').textContent = `El Ladrón de Tildes ataca: ${title}`;
    document.getElementById('randomThiefEffectText').textContent = effectText;
    effectDiv.classList.remove('hidden');
    onComplete();

    // Cierre automático del modal de ataque
    setTimeout(() => {
        modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            if (gameState === 'CINEMATIC' && currentView === 'game') { 
                 setGameState('PLAYING');
            }
        }, 300);
    }, 4000); 
}

/**
 * Muestra el modal de susurro del Ladrón.
 * @param {string} dialogue - El diálogo a susurrar.
 * @param {function} onCompleteCallback - Callback al finalizar el susurro.
 */
function showWhisperModal(dialogue, onCompleteCallback = null) {
    const modal = document.getElementById('thiefWhisperModal');
    const dialogueEl = document.getElementById('thiefWhisperDialogue');
    
    document.getElementById('thiefWhisperIcon').innerHTML = ICON_LIBRARY.bossIcon;
    
    setGameState('CINEMATIC');
    playThiefMusic(); 

    modal.classList.remove('hidden', 'opacity-0');
    modal.classList.add('flex'); 
    
    typeEffect(dialogueEl, dialogue, onCompleteCallback, 4000);
}

/**
 * Comprueba si se debe ofrecer un trato al Ladrón (cuando queda 1 vida).
 * @param {function} callbackOnNoDeal - Función a ejecutar si no se ofrece trato o se rechaza.
 */
function checkForThiefDeal(callbackOnNoDeal) {
    if ( (3 - consecutiveFailures) === 1 && gameState !== 'GAME_OVER') {
         console.log("Checking for thief deal.");
        setGameState('CINEMATIC');
        playThiefMusic(); 

        // Identificar la categoría más valiosa para el trato
        let bestCategory = null;
        let maxIncome = -1;

        Object.keys(playerWords).forEach(category => {
            if (playerWords[category] && WORD_DATABASE[category] && category !== "Sobreesdrújulas" && playerWords[category].count > 0) {
                const count = playerWords[category].count;
                const baseValue = WORD_DATABASE[category].value;
                const categoryIncome = count * baseValue;
                if (categoryIncome > maxIncome) {
                    maxIncome = categoryIncome;
                    bestCategory = category;
                }
            }
        });

        if (bestCategory) {
             console.log(`Offering deal for category: ${bestCategory}`);
            const modal = document.getElementById('thiefDealModal');
            const dialogueEl = document.getElementById('thiefDealDialogue');
            const buttons = document.getElementById('thiefDealButtons');
            buttons.classList.add('hidden');
            document.getElementById('thiefDealIcon').innerHTML = ICON_LIBRARY.bossIcon;
            
            modal.classList.remove('hidden', 'opacity-0');
            modal.classList.add('flex'); 
            
            // Diálogo y botones del trato
            typeEffect(dialogueEl, `Veo que estás al límite... Te ofrezco un trato. Te devuelvo una vida, pero a cambio me quedaré con todas tus palabras de la categoría "${bestCategory}". ¿Aceptas?`, null, false);
            
            document.getElementById('acceptDealButton').onclick = () => {
                 console.log("Deal accepted.");
                consecutiveFailures--;
                playerWords[bestCategory] = { count: 0, list: [] };
                modal.classList.add('hidden', 'opacity-0');
                modal.classList.remove('flex');
                playMainMusic(); 
                showModal("Trato aceptado. Has recuperado una vida, pero tus palabras han desaparecido.");
                 updateUI();
            };
            document.getElementById('rejectDealButton').onclick = () => {
                 console.log("Deal rejected.");
                dealRejectedForLimboBoost = true; 
                modal.classList.add('hidden', 'opacity-0');
                modal.classList.remove('flex');
                
                playMainMusic(); 
                if (callbackOnNoDeal) callbackOnNoDeal();
            };
        } else {
             console.log("No category eligible for deal.");
             playMainMusic(); 
             if (gameState === 'CINEMATIC') setGameState('PLAYING');
             if (callbackOnNoDeal) callbackOnNoDeal();
        }

    } else {
         console.log("Not eligible for deal (not 1 life left or game over).");
        if (callbackOnNoDeal) callbackOnNoDeal();
    }
}

/**
 * Bucle principal del juego (para ingresos pasivos y UI).
 * @param {number} timestamp - Marca de tiempo de requestAnimationFrame.
 */
function mainGameLoop(timestamp) {
    if (gameState !== 'PLAYING') {
        animationFrameId = null; 
        return;
    }
    
    // Lógica de Ingreso Pasivo (cada 1 segundo)
    if (!lastUpdateTime) lastUpdateTime = timestamp;
    const deltaTime = timestamp - lastUpdateTime;
    lastUpdateTime = timestamp;
    timeSinceLastIncomeUpdate += deltaTime;
    if (timeSinceLastIncomeUpdate >= 1000) {
        let incomeThisSecond = passiveIncome;
        // Aplicar boosts de Christopher y Limbo al ingreso por segundo
        if (Date.now() < christopherBoostEndTime) incomeThisSecond *= 2;
        if(Date.now() < limboGramaticalEndTime) incomeThisSecond *= 1.21;
        playerMoney += incomeThisSecond;
        timeSinceLastIncomeUpdate = 0;
        
        updateUI();
    }
    updateTimerBarUI();
    animationFrameId = requestAnimationFrame(mainGameLoop);
}

/**
 * Actualiza la barra de tiempo de la palabra actual.
 */
function updateTimerBarUI() {
    if (gameState !== 'PLAYING' || !gameStarted || !currentWord.startTime) return; 
    const bar = document.getElementById('wordTimerBar');
    if (!bar) return;
    const now = Date.now();
    const duration = currentWord.isBonus ? 1000 : 3000;
    const elapsedTime = now - currentWord.startTime;
    const timeLeft = Math.max(0, duration - elapsedTime);
    const percentage = (timeLeft / duration) * 100;
    bar.style.width = `${percentage}%`;
    
    // Cambiar color de la barra según el tiempo restante
    if (percentage > 66) bar.style.backgroundColor = '#22c55e'; // Verde
    else if (percentage > 33) bar.style.backgroundColor = '#eab308'; // Amarillo
    else bar.style.backgroundColor = '#ef4444'; // Rojo
}

// Reglas de acentuación para el rotador de reglas en la UI
const accentuationRules = [
    { title: "Monosílabos", text: "Por regla general, no llevan tilde, salvo en casos de tilde diacrítica.", color: "text-gray-800"},
    { title: "Palabras Agudas", text: "Llevan tilde cuando terminan en 'n', 's' o vocal. La sílaba tónica es la última.", color: "text-green-700" },
    { title: "Palabras Llanas (o Graves)", text: "Llevan tilde cuando NO terminan en 'n', 's' o vocal. La sílaba tónica es la penúltima.", color: "text-yellow-700" },
    { title: "Palabras Esdrújulas", text: "Siempre llevan tilde. La sílaba tónica es la antepenúltima.", color: "text-blue-700" },
    { title: "Palabras Sobreesdrújulas", text: "Siempre llevan tilde. La sílaba tónica es anterior a la antepenúltima.", color: "text-purple-700" }
];
let currentRuleIndex = 0;
let rulesInterval = null;

/**
 * Inicia el rotador de reglas de acentuación.
 */
function startRulesRotator() {
    stopRulesRotator(); 
    const rulesContainer = document.getElementById('rulesContainer');
    if (rulesContainer) rulesContainer.classList.remove('hidden');
    const updateRule = () => {
        const rulesDisplay = document.getElementById('rulesDisplay');
        if (!rulesDisplay) return;
        rulesDisplay.style.opacity = 0;
        setTimeout(() => {
            const rule = accentuationRules[currentRuleIndex];
            rulesDisplay.innerHTML = `<h3 class="text-lg font-bold ${rule.color}">${rule.title}</h3><p class="text-gray-700">${rule.text}</p>`;
            rulesDisplay.style.opacity = 1;
            currentRuleIndex = (currentRuleIndex + 1) % accentuationRules.length;
        }, 200); // Pequeño retraso para la animación de fade
    };
    updateRule(); 
    rulesInterval = setInterval(updateRule, 15000); // Cambia cada 15 segundos
}

/**
 * Detiene el rotador de reglas de acentuación.
 */
function stopRulesRotator() {
    if (rulesInterval) clearInterval(rulesInterval);
    rulesInterval = null;
    const rulesContainer = document.getElementById('rulesContainer');
    if(rulesContainer) rulesContainer.classList.add('hidden');
}

/**
 * Inicializa el contexto de audio (requiere interacción del usuario).
 */
async function initializeAudio() {
     if (audioInitialized) return;
     try {
        console.log("Audio context will start on user interaction.");
        setupMusic();
        Tone.Transport.start(); // Inicia el transporte de Tone.js
        audioInitialized = true; 
     } catch (e) {
         console.error("Error setting up audio:", e);
     }
}

/**
 * Configura los sintetizadores y los loops de música principal y de jefe.
 */
function setupMusic() {
    // Efectos de audio
    const mainReverb = new Tone.Reverb(1.5).toDestination();
    const chorus = new Tone.Chorus(4, 2.5, 0.7).connect(mainReverb);
    const thiefReverb = new Tone.Reverb(5).toDestination();
    
    // Sintetizador para la música principal (Synth FM)
    mainSynth = new Tone.PolySynth(Tone.FMSynth, {
        harmonicity: 1, modulationIndex: 7,
        envelope: { attack: 0.01, decay: 0.4, sustain: 0.1, release: 1.4 },
        modulation: { type: "triangle" }
    }).connect(chorus);
    mainSynth.volume.value = -Infinity; // Empieza silenciado

    // Sintetizador para la música del Ladrón (Synth Duo para un sonido más oscuro)
    thiefSynth = new Tone.PolySynth(Tone.DuoSynth, {
        vibratoAmount: 0.5, vibratoRate: 5, harmonicity: 1,
        voice0: { volume: -8, portamento: 0, oscillator: { type: 'sawtooth' }, filterEnvelope: { attack: 0.01, decay: 0.5, sustain: 0.2, release: 1 }, envelope: { attack: 0.01, decay: 0.5, sustain: 0.2, release: 1 } },
        voice1: { volume: -15, portamento: 0, oscillator: { type: 'sine' }, filterEnvelope: { attack: 0.01, decay: 0.5, sustain: 0.2, release: 1 }, envelope: { attack: 0.01, decay: 0.5, sustain: 0.2, release: 1 } }
    }).connect(thiefReverb);
    thiefSynth.volume.value = -Infinity; // Empieza silenciado

    // Secuencia de notas para la música principal (Acordes alegres/misteriosos)
    const mainNotes = [ { time: '0:0', notes: ['C4', 'E4', 'G4'] }, { time: '0:2', notes: ['A4'] }, { time: '1:0', notes: ['G3', 'B3', 'D4'] }, { time: '2:0', notes: ['F3', 'A3', 'C4'] }, { time: '2:2', notes: ['G3'] }, { time: '3:0', notes: ['E3', 'G3', 'B3'] }, { time: '4:0', notes: ['A3', 'C4', 'E4'] }, { time: '4:2', notes: ['B4'] }, { time: '5:0', notes: ['G3', 'B3', 'D4'] }, { time: '6:0', notes: ['C4', 'E4', 'A4'] }, { time: '6:2', notes: ['G4'] }, { time: '7:0', notes: ['F3', 'A3', 'C4'] } ];
    mainMusicLoop = new Tone.Part((time, value) => { mainSynth.triggerAttackRelease(value.notes, "2n", time); }, mainNotes);
    mainMusicLoop.loop = true; mainMusicLoop.loopEnd = '8m';
    mainMusicLoop.start(0);
    
    // Secuencia de notas para la música del Ladrón (Acordes disonantes/graves)
    const thiefNotes = [ { time: '0:0', notes: ['C2', 'D#2'], duration: '2n' }, { time: '1:0', notes: ['C#2', 'E2'], duration: '2n' }, { time: '2:0', notes: ['D2', 'F2'], duration: '1m' }, { time: '3:2', notes: ['B1', 'C2'], duration: '2n' } ];
    thiefMusicLoop = new Tone.Part((time, value) => { thiefSynth.triggerAttackRelease(value.notes, value.duration, time); }, thiefNotes);
    thiefMusicLoop.loop = true; thiefMusicLoop.loopEnd = '4m';
    thiefMusicLoop.start(0);
}

/**
 * Detiene la música atenuando el volumen.
 */
function stopAllMusic() {
    if (!audioInitialized) return;
    
     if (mainSynth) mainSynth.volume.rampTo(-Infinity, 0.5);
     if (thiefSynth) thiefSynth.volume.rampTo(-Infinity, 0.5);
}

/**
 * Inicia la reproducción de la música principal y el rotador de reglas.
 */
function playMainMusic() {
    if (!audioInitialized || Tone.context.state !== 'running' || isMuted) return;
    
    mainSynth.volume.rampTo(-6, 1);
    thiefSynth.volume.rampTo(-Infinity, 1);
    
    if(gameState === 'PLAYING') {
        startRulesRotator(); 
    } else {
         stopRulesRotator();
    }
}

/**
 * Inicia la reproducción de la música del Ladrón y detiene el rotador de reglas.
 */
function playThiefMusic() {
    if (!audioInitialized || Tone.context.state !== 'running' || isMuted) return;
    
    mainSynth.volume.rampTo(-Infinity, 1);
    thiefSynth.volume.rampTo(-6, 1);
    
    stopRulesRotator(); 
}

/**
 * Inicia los bucles de juego (animación y eventos aleatorios).
 */
function startGameLoops() {
    if (animationFrameId || gameState !== 'PLAYING') return;
    
    stopGameLoops(); 
    
    if (!isWhispering) {
        startRulesRotator();
    }
    
    lastUpdateTime = 0; 
    animationFrameId = requestAnimationFrame(mainGameLoop);
    
    // Intervalo para chequear eventos aleatorios (cada 20 segundos)
    randomEventInterval = setInterval(triggerRandomEvent, 20000); 
}

/**
 * Detiene todos los bucles y temporizadores del juego.
 */
function stopGameLoops() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
    
    clearInterval(randomEventInterval); 
    clearTimeout(wordDisplayTimeout);
    
    randomEventInterval = null; 
    lastUpdateTime = 0;
    
    stopRulesRotator(); 
}

/**
 * Lógica común de inicio de juego (puede incluir carga de datos/guardado si fuera un juego persistente).
 */
async function startGameCommon(shouldLoad = true) {
     if (activeChallengeOnLoad) {
        handleChallengeFailure("Reto abandonado al recargar la página.");
        activeChallengeOnLoad = false;
     }
     // No hay lógica de carga/guardado en este archivo, solo se inicializa el estado.
}

/**
 * Configura los listeners de eventos para la interacción del usuario.
 */
function setupEventListeners() {
    document.getElementById('playButton').addEventListener('click', async () => {
        // Inicializar y reanudar audio en la primera interacción
        if (!audioInitialized) {
            await initializeAudio(); 
        }
        if (Tone.context.state !== 'running') {
            try {
                await Tone.start();
                console.log("Audio context started/resumed by Play button.");
            } catch(e) {
                 console.error("Error starting/resuming audio context:", e);
            }
        }
        
        document.getElementById('nameInputModal').classList.remove('hidden');
        document.getElementById('nameInputModal').classList.add('flex');
        document.getElementById('playerNameInput').focus();
    });

    document.getElementById('confirmNameButton').addEventListener('click', () => {
        const nameInput = document.getElementById('playerNameInput');
        const nameError = document.getElementById('nameError');
        playerName = nameInput.value.trim();
        
        if (playerName === "") {
            nameError.textContent = "¡Debes introducir un nombre!";
            nameInput.classList.add('shake', 'border-red-500');
            setTimeout(() => {
                nameInput.classList.remove('shake', 'border-red-500');
                nameError.textContent = "";
            }, 500);
            return;
        }
        
        document.getElementById('nameInputModal').classList.add('hidden');
        document.getElementById('nameInputModal').classList.remove('flex');
        nameError.textContent = "";

        startNewGame();
    });

    document.getElementById('playerNameInput').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('confirmNameButton').click();
        }
    });

    document.getElementById('buyButton').addEventListener('click', buyWord);
    
    document.getElementById('homeButton').addEventListener('click', () => {
        changeView('startup'); 
    });

    document.getElementById('modalCloseButton').addEventListener('click', () => {
         const modal = document.getElementById('messageModal');
         modal.classList.add('hidden');
         modal.classList.remove('flex');
         
        if (gameState === 'CINEMATIC' && currentView === 'game') {
             setGameState('PLAYING');
        }
    });
    
     document.getElementById('confirmYesButton').addEventListener('click', () => { 
        if (confirmCallback) confirmCallback(); 
        hideConfirmationModal(); 
    });
    document.getElementById('confirmNoButton').addEventListener('click', hideConfirmationModal); 
    
    document.getElementById('wordsModalCloseButton').addEventListener('click', () => {
        document.getElementById('wordsModal').classList.add('hidden');
        if (gameState === 'CINEMATIC' && currentView === 'game') { 
            setGameState('PLAYING');
        }
    });
    
    document.getElementById('backToGameFromGameOver').addEventListener('click', async () => {
         changeView('startup');
        document.getElementById('nameInputModal').classList.remove('hidden');
        document.getElementById('nameInputModal').classList.add('flex');
        document.getElementById('playerNameInput').value = '';
        document.getElementById('playerNameInput').focus();
    });
    document.getElementById('reiniciarButton').addEventListener('click', async () => {
        changeView('startup');
        document.getElementById('nameInputModal').classList.remove('hidden');
        document.getElementById('nameInputModal').classList.add('flex');
        document.getElementById('playerNameInput').value = '';
        document.getElementById('playerNameInput').focus();
    });

    // Botones del Guardián (Limbo Gramatical)
    document.getElementById('acceptGiftButton').addEventListener('click', () => {
        const modal = document.getElementById('guardianModal');
        modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);

        let rewardMessage;
        if (consecutiveFailures === 0) {
            playerMoney += 300000;
            rewardMessage = "¡Don aceptado! Recibes 300,000 monedas y el LIMBO GRAMATICAL ha comenzado.";
        } else {
            consecutiveFailures = 0;
            rewardMessage = "¡Don aceptado! Tus vidas han sido restauradas y el LIMBO GRAMATICAL ha comenzado.";
            updateUI();
        }
        
        limboGramaticalEndTime = Date.now() + 60000; // Activa el Limbo por 1 minuto
        
        showModal(rewardMessage);
    });

    document.getElementById('rejectGiftButton').addEventListener('click', () => {
        const modal = document.getElementById('guardianModal');
        const dialogueEl = document.getElementById('guardianDialogue');
        const buttons = document.getElementById('guardianButtons');
        buttons.classList.add('hidden');

        typeEffect(dialogueEl, "Comprendo tu decisión. Que tu camino sea firme.", () => {
            setTimeout(() => {
                modal.classList.add('opacity-0');
                setTimeout(() => {
                    modal.classList.add('hidden');
                    modal.classList.remove('flex');
                    setGameState('PLAYING');
                }, 300);
            }, 1500);
        });
    });

    // Botones del Mini-Reto
    document.getElementById('challengeInput').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') endThiefMiniChallenge(e.target.value);
    });
    document.getElementById('trueButton').addEventListener('click', () => endThiefMiniChallenge(true));
    document.getElementById('falseButton').addEventListener('click', () => endThiefMiniChallenge(false));

    // Botón de Silencio/Música
    const muteButton = document.getElementById('muteButton');
    muteButton.innerHTML = ICON_LIBRARY.speakerOn;
    muteButton.addEventListener('click', async () => { 
        if (isMuted && !audioInitialized) {
            await initializeAudio();
             try {
                await Tone.start();
                console.log("Audio context started by Unmute button.");
            } catch(e) {
                 console.error("Error starting audio context on unmute:", e);
            }
        } else if (isMuted && audioInitialized && Tone.context.state !== 'running') {
             try {
                await Tone.start();
                console.log("Audio context resumed by Unmute button.");
            } catch(e) {
                 console.error("Error resuming audio context on unmute:", e);
            }
        }

        isMuted = !isMuted;
        Tone.Destination.mute = isMuted;
        muteButton.innerHTML = isMuted ? ICON_LIBRARY.speakerOff : ICON_LIBRARY.speakerOn;
        
        if(!isMuted && (gameState === 'PLAYING' || gameState === 'STARTUP')) {
            playMainMusic();
        } else if (!isMuted && (gameState === 'CHALLENGE_MINI' || gameState === 'CHALLENGE_BOSS' || isWhispering)) {
            playThiefMusic();
        } else {
            stopAllMusic();
        }
    });
    
    window.addEventListener('beforeunload', () => {
    });
}

/**
 * Inicializa el juego al cargar la ventana.
 */
async function initGame() {
    changeView('startup'); 
    // Intentar inicializar audio, pero se requiere interacción para iniciar el contexto.
    await initializeAudio(); 
    setupEventListeners();
}

window.onload = initGame;
