// =======================================================================
// CONSTANTES DE JUEGO (INTEGRADAS DE deepseek_*.js)
// =======================================================================

// Base de datos de palabras (Simulación, asume que esta constante existe)
const HUGE_WORD_DATABASE = {
    "Monosílabos": { words: ["el", "la", "un", "una", "yo", "tú", "él", "ella", "nos", "vos", "les", "que", "qué", "se", "sé", "si", "sí", "más", "mas", "aún", "aun", "de", "dé", "mi", "mí", "te", "té", "o", "u", "por", "para", "con", "sin"], limit: 15, value: 500 },
    "Agudas": { words: ["canción", "café", "rubí", "jamás", "vivir", "pared", "balón", "razón", "capaz", "país", "avión", "quizás", "reloj", "perdón"], limit: 15, value: 1000, superValueWords: ["avión", "país", "balón"] },
    "Llanas": { words: ["árbol", "fácil", "azúcar", "álbum", "lápiz", "cárcel", "césped", "débil", "mártir", "tórax", "clímax", "dólar", "móvil", "trébol", "ángel", "cómic"], limit: 15, value: 2500, superValueWords: ["árbol", "fácil", "césped"] },
    "Esdrújulas": { words: ["médico", "pájaro", "música", "último", "teléfono", "brújula", "oxígeno", "antónimo", "ejército", "lágrima", "miércoles", "sílaba", "décimo", "fantástico"], limit: 15, value: 5000, superValueWords: ["médico", "pájaro", "música"] },
    "Sobreesdrújulas": { words: ["cuéntamelo", "dígamelo", "devuélveselo", "cómpratelo", "quítaselo", "recuérdamelo"], limit: 1, value: 10000000 }
};


/**
 * Niveles predefinidos de dificultad (no usados directamente, sino como referencia)
 * Integrado de deepseek_javascript_20251203_0ff230.js
 */
const DIFFICULTY_LEVELS = {
    FACIL: {
        multiplicadorPrecio: 0.8,
        tiempoPalabra: 4000,
        ingresoPasivoMultiplicador: 1.2,
        frecuenciaAtaques: 0.15,
        penalizacionFallos: 0.5,
        recompensaBoss: 1.5
    },
    NORMAL: {
        multiplicadorPrecio: 1.0,
        tiempoPalabra: 3000,
        ingresoPasivoMultiplicador: 1.0,
        frecuenciaAtaques: 0.20,
        penalizacionFallos: 1.0,
        recompensaBoss: 1.0
    },
    DIFICIL: {
        multiplicadorPrecio: 1.3,
        tiempoPalabra: 2500,
        ingresoPasivoMultiplicador: 0.8,
        frecuenciaAtaques: 0.30,
        penalizacionFallos: 1.5,
        recompensaBoss: 0.8
    },
    EXTREMO: {
        multiplicadorPrecio: 1.8,
        tiempoPalabra: 2000,
        ingresoPasivoMultiplicador: 0.6,
        frecuenciaAtaques: 0.40,
        penalizacionFallos: 2.0,
        recompensaBoss: 0.6,
        palabrasCorruptasFrecuencia: 0.25
    }
};

/**
 * Desafíos avanzados para futuras fases.
 * Integrado de deepseek_javascript_20251203_47b045.js
 */
const ADVANCED_CHALLENGES = {
    PUNTUACION: [
        {
            sentence: "No se que hacer dijo ella",
            options: ["No sé qué hacer, dijo ella.", "No se que hacer, dijo ella.", "No sé qué hacer dijo ella."],
            correct: 0
        }
    ],
    MAYUSCULAS: [
        {
            sentence: "el señor garcía vive en madrid",
            options: ["El señor García vive en Madrid.", "El Señor García vive en Madrid.", "el señor García vive en Madrid."],
            correct: 0
        }
    ],
    CONJUGACION: [
        {
            verb: "Haber",
            tense: "Presente subjuntivo",
            person: "Yo",
            options: ["Haya", "Habe", "Habo"],
            correct: 0
        }
    ]
};

/**
 * Items de la tienda para futuras fases.
 * Integrado de deepseek_javascript_20251203_6e1c53.js
 */
const SHOP_ITEMS = [
    {
        id: 'escudo_temporal',
        name: 'Escudo Gramatical',
        description: 'Protección contra palabras corruptas por 60 segundos',
        price: 50000,
        duration: 60000,
        effect: () => { /* activateShield(); */ }
    },
    {
        id: 'deteccion_avanzada',
        name: 'Detección Avanzada',
        description: 'Revela la categoría de palabras antes de comprar por 45 segundos',
        price: 35000,
        duration: 45000,
        effect: () => { /* activateAdvancedDetection(); */ }
    },
    {
        id: 'multiplicador_x3',
        name: 'Multiplicador x3',
        description: 'Triplica el ingreso pasivo por 30 segundos',
        price: 75000,
        duration: 30000,
        effect: () => { /* activateTripleIncome(); */ }
    },
    {
        id: 'revivir',
        name: 'Amuleto de Revivir',
        description: 'Te permite continuar tras un Game Over',
        price: 100000,
        singleUse: true,
        effect: () => { /* addReviveToken(); */ }
    }
];

/**
 * Desafíos diarios para futuras fases.
 * Integrado de deepseek_javascript_20251203_4e1245.js
 */
const DAILY_CHALLENGES = [
    {
        id: 'compra_rapida',
        title: 'Compra Rápida',
        description: 'Compra 10 palabras en menos de 2 minutos',
        reward: 25000,
        timeLimit: 120000
    },
    {
        id: 'sin_corrupcion',
        title: 'Puro',
        description: 'No compres palabras corruptas durante 5 minutos',
        reward: 30000,
        timeLimit: 300000
    },
    {
        id: 'categoria_maestra',
        title: 'Maestro de Categoría',
        description: 'Completa una categoría entera',
        reward: 50000,
        requires: 'category_completion'
    }
];

/**
 * Eventos especiales para futuras fases.
 * Integrado de deepseek_javascript_20251203_4dcd9b.js
 */
const SPECIAL_EVENTS = {
    TORMENTA_GRAMATICAL: {
        name: 'Tormenta Gramatical',
        description: '¡Las palabras aparecen al doble de velocidad por 30 segundos!',
        duration: 30000,
        effect: () => { /* activateWordStorm(); */ },
        rewardMultiplier: 2.0
    },
    INVASION_CORRUPTA: {
        name: 'Invasión Corrupta',
        description: 'Solo aparecen palabras corruptas por 20 segundos',
        duration: 20000,
        effect: () => { /* activateCorruptionInvasion(); */ },
        penalty: 'Pierdes 1 vida si compras alguna'
    },
    BONUS_CATEGORICO: {
        name: 'Bonus Categórico',
        description: 'Todas las palabras de una categoría valen 3x más',
        duration: 40000,
        effect: () => { 
            const categories = Object.keys(WORD_DATABASE).filter(c => c !== "Sobreesdrújulas");
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            /* activateCategoryBonus(randomCategory); */
        }
    }
};

/**
 * Penalizaciones permanentes para futuras fases (tras Game Over o derrotas de Jefe/fallos).
 * Integrado de deepseek_javascript_20251203_33a262.js
 */
const PERMANENT_PENALTIES = [
    {
        id: 'memoria_danada',
        name: 'Memoria Dañada',
        description: 'Olvidas 3 palabras aleatorias de tu colección',
        trigger: 'game_over',
        effect: () => { /* removeRandomWords(3); */ }
    },
    {
        id: 'confusion_gramatical',
        name: 'Confusión Gramatical',
        description: 'Las categorías de las palabras aparecen mezcladas',
        trigger: 'consecutive_failures_3',
        duration: 300000,
        effect: () => { /* activateCategoryConfusion(); */ }
    },
    {
        id: 'maldicion_ortografica',
        name: 'Maldición Ortográfica',
        description: 'Todas las palabras cuestan 25% más',
        trigger: 'boss_defeat',
        duration: 600000,
        effect: () => { /* activatePriceCurse(); */ }
    }
];

/**
 * Logros del jugador para futuras fases.
 * Integrado de deepseek_javascript_20251203_093d18.js
 */
const ACHIEVEMENTS = {
    'PRIMER_PASO': { 
        name: 'Primer Paso', 
        description: 'Compra tu primera palabra',
        reward: 1000,
        condition: (stats) => stats.palabrasCompradasTotal >= 1 
    },
    'COLECCIONISTA': { 
        name: 'Coleccionista', 
        description: 'Compra 50 palabras únicas',
        reward: 5000,
        condition: (stats) => stats.palabrasUnicasCompradas >= 50 
    },
    'GRAMATICO_EXPERTO': { 
        name: 'Gramático Experto', 
        description: 'Derrota a 3 jefes sin fallos',
        reward: 15000,
        condition: (stats) => stats.jefesDerrotadosSinFallos >= 3 
    },
    'RESISTENTE': { 
        name: 'Resistente', 
        description: 'Juega durante 30 minutos',
        reward: 10000,
        condition: (stats) => stats.tiempoJuego >= 1800000 
    },
    'INMUNE': { 
        name: 'Inmune', 
        description: 'Rechaza 5 tratos del ladrón',
        reward: 7500,
        condition: (stats) => stats.tratosRechazados >= 5 
    }
};

/**
 * Palabras problemáticas para desafíos avanzados de homófonas, diacríticas, etc.
 * Integrado de deepseek_javascript_20251203_212966.js
 */
const PROBLEMATIC_WORDS = {
    HOMOFONAS: [
        { word: "Valla", alternatives: ["Vaya", "Baya"], correct: "Valla", category: "Homófonas" },
        { word: "Hecho", alternatives: ["Echo"], correct: "Echo", category: "Homófonas" },
        { word: "Halla", alternatives: ["Haya", "Allá"], correct: "Halla", category: "Homófonas" }
    ],
    ACENTUACION_DIACRITICA: [
        { word: "si", context: "condicional", correct: "sí", category: "Diacrítica" },
        { word: "te", context: "pronombre", correct: "té", category: "Diacrítica" },
        { word: "de", context: "verbo", correct: "dé", category: "Diacrítica" }
    ],
    EXTRANJERISMOS: [
        { word: "Parking", correct: "Parking", category: "Extranjerismos", note: "No lleva tilde" },
        { word: "Whisky", correct: "Whisky", category: "Extranjerismos", note: "No lleva tilde" },
        { word: "Software", correct: "Software", category: "Extranjerismos", note: "No lleva tilde" }
    ]
};

/**
 * Sistema de eventos y sonidos contextuales.
 * Integrado de deepseek_javascript_20251203_0dce6c.js
 * Modificado el sonido LOW_HEALTH para usar Oscillator y evitar deprecación de PulseOscillator.
 */
const CONTEXTUAL_SOUNDS = {
    LOW_HEALTH: {
        trigger: () => consecutiveFailures >= 2,
        sound: () => {
            // Reemplazo de Tone.PulseOscillator por Tone.Oscillator y Tone.Tremolo para simular latido/tensión
            const osc = new Tone.Oscillator(120, "square").toDestination();
            const tremolo = new Tone.Tremolo(4, 0.9).toDestination().start(); // 4 Hz, profundidad 90%
            osc.connect(tremolo);
            osc.start().stop("+0.5"); // Latido corto
        },
        frequency: 5000, 
        lastPlayed: 0
    },
    
    HIGH_INCOME: {
        trigger: () => passiveIncome > 100000,
        sound: () => {
            const chime = new Tone.Synth({
                oscillator: { type: "sine" },
                envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.5 }
            }).toDestination();
            chime.triggerAttackRelease("C6", "8n");
        },
        frequency: 15000,
        lastPlayed: 0
    },
    
    STREAK: {
        trigger: () => playerStats.rachaMaxima >= 5, // Usando la racha de boss como ejemplo
        sound: () => {
            const notes = ["C5", "E5", "G5", "C6"];
            notes.forEach((note, i) => {
                setTimeout(() => {
                    const synth = new Tone.Synth().toDestination();
                    synth.triggerAttackRelease(note, "8n");
                }, i * 100);
            });
        },
        oneTime: true,
        played: false
    }
};

/**
 * Constantes para la reproducción de efectos de sonido sintetizados.
 * Integrado de deepseek_javascript_20251203_cd811d.js
 */
const SOUND_EFFECTS = {
    GUARDIAN: {
        APPEAR: {
            type: 'pad',
            notes: ['C4', 'E4', 'G4', 'C5'],
            duration: 2,
            envelope: { attack: 0.5, release: 2 }
        },
        GIFT: {
            type: 'bell',
            notes: ['C5', 'E5', 'G5'],
            duration: 1.5,
            envelope: { attack: 0.1, release: 1.5 }
        },
        HEAL: {
            type: 'choir',
            notes: ['A4', 'C5', 'E5'],
            duration: 1,
            envelope: { attack: 0.2, release: 1 }
        }
    },
    
    THIEF: {
        APPEAR: {
            type: 'darkPad',
            notes: ['C2', 'D#2', 'G2'],
            duration: 1.5,
            envelope: { attack: 0.1, release: 1.5 },
            distortion: 0.7
        },
        STEAL: {
            type: 'glitch',
            notes: ['C3', 'D#3'],
            duration: 0.5,
            envelope: { attack: 0.05, release: 0.3 }
        },
        TAUNT: {
            type: 'noise',
            volume: -5
        },
        CORRUPT: {
            type: 'distortion',
            notes: ['E2', 'G2', 'A#2'],
            duration: 0.8,
            envelope: { attack: 0.05, release: 0.5 }
        }
    },
    
    GAME: {
        WORD_PURCHASE: {
            type: 'sparkle',
            notes: ['C5', 'E5'],
            duration: 0.3
        },
        SUPER_VALUE: {
            type: 'shine',
            notes: ['C6', 'G6'],
            duration: 0.5
        },
        BOSS_VICTORY: {
            type: 'fanfare',
            notes: ['C4', 'E4', 'G4', 'C5', 'E5', 'G5'],
            duration: 2
        },
        GAME_OVER: {
            type: 'darkChord',
            notes: ['C2', 'D#2', 'F#2', 'A2'],
            duration: 3
        },
        LEVEL_UP: {
            type: 'ascending',
            notes: ['C4', 'E4', 'G4', 'C5', 'E5', 'G5', 'C6'],
            duration: 1.2
        }
    }
};

// =======================================================================
// CLASES Y SISTEMAS DE AUDIO
// =======================================================================

/**
 * Sistema de Audio Posicional para efectos de movimiento (ej. Ladrón moviéndose).
 * Integrado de deepseek_javascript_20251203_39a08b.js
 */
class PositionalAudio {
    constructor() {
        this.panner = new Tone.Panner3D({
            panningModel: "HRTF",
            distanceModel: "exponential",
            positionX: 0,
            positionY: 0,
            positionZ: 0,
            orientationX: 0,
            orientationY: 0,
            orientationZ: 0,
            refDistance: 1,
            maxDistance: 10000,
            rolloffFactor: 1,
            coneInnerAngle: 360,
            coneOuterAngle: 0,
            coneOuterGain: 0
        }).toDestination();
        
        this.listener = Tone.Listener;
        this.listener.positionX.value = 0;
        this.listener.positionY.value = 0;
        this.listener.positionZ.value = 1;
    }
    
    playPositionalSound(sound, position) {
        const { x, y, z } = position;
        this.panner.positionX.value = x;
        this.panner.positionY.value = y;
        this.panner.positionZ.value = z;
        
        sound.connect(this.panner);
        sound.start();
    }
    
    // Ejemplo: sonido del ladrón "moviéndose" por la pantalla
    playThiefMovement() {
        if (isMuted) return;
        const movementSound = new Tone.NoiseSynth({
            noise: { type: "pink" },
            envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.1 }
        });
        movementSound.volume.value = -10; 
        
        movementSound.connect(this.panner);
        movementSound.triggerAttackRelease(1);

        // Animar la posición (simulando movimiento de izquierda a derecha)
        let pos = -10;
        const interval = setInterval(() => {
            this.panner.positionX.value = pos;
            pos += 0.5;
            if (pos > 10) {
                clearInterval(interval);
                movementSound.dispose();
            }
        }, 50);
    }
}

/**
 * Clase para manejar la música dinámica y transiciones entre escenas.
 * Integrado de deepseek_javascript_20251203_6974d9.js
 * También incluye la creación de sintetizadores de deepseek_javascript_20251203_8c631c.js y deepseek_javascript_20251203_e5ba57.js
 */
class DynamicAudioSystem {
    constructor() {
        this.audioContext = Tone.context;
        // Global Volume Nodes
        this.masterVolume = new Tone.Volume(-3).toDestination();
        this.musicVolume = new Tone.Volume(-6).connect(this.masterVolume);
        this.sfxVolume = new Tone.Volume(-3).connect(this.masterVolume);
        
        this.currentMusic = null;
        this.musicScene = 'startup';
        
        // Setup Music components (Synths and Parts)
        this.musicComponents = this.setupMusicComponents();
    }
    
    setupMusicComponents() {
        // --- Componentes de Música Principal (Exploración) ---
        const mainReverb = new Tone.Reverb(1.5).connect(this.musicVolume);
        const chorus = new Tone.Chorus(4, 2.5, 0.7).connect(mainReverb);
        const mainSynth = new Tone.PolySynth(Tone.FMSynth, {
            harmonicity: 1, modulationIndex: 7,
            envelope: { attack: 0.01, decay: 0.4, sustain: 0.1, release: 1.4 },
            modulation: { type: "triangle" }
        }).connect(chorus);
        const mainNotes = [ { time: '0:0', notes: ['C4', 'E4', 'G4'] }, { time: '0:2', notes: ['A4'] }, { time: '1:0', notes: ['G3', 'B3', 'D4'] }, { time: '2:0', notes: ['F3', 'A3', 'C4'] }, { time: '2:2', notes: ['G3'] }, { time: '3:0', notes: ['E3', 'G3', 'B3'] }, { time: '4:0', notes: ['A3', 'C4', 'E4'] }, { time: '4:2', notes: ['B4'] }, { time: '5:0', notes: ['G3', 'B3', 'D4'] }, { time: '6:0', notes: ['C4', 'E4', 'A4'] }, { time: '6:2', notes: ['G4'] }, { time: '7:0', notes: ['F3', 'A3', 'C4'] } ];
        const mainMusicPart = new Tone.Part((time, value) => { mainSynth.triggerAttackRelease(value.notes, "2n", time); }, mainNotes);
        mainMusicPart.loop = true; mainMusicPart.loopEnd = '8m';
        mainSynth.volume.value = -Infinity;

        // --- Componentes de Música del Ladrón (Tensión/Jefe) --- (deepseek_javascript_20251203_e5ba57.js)
        const thiefReverb = new Tone.Reverb(8).connect(this.musicVolume);
        const thiefDistortion = new Tone.Distortion(0.8).connect(thiefReverb);
        const thiefMainSynth = new Tone.MonoSynth({
            oscillator: { type: "sawtooth" },
            envelope: { attack: 0.05, decay: 0.3, sustain: 0.4, release: 1.5 },
            filter: { type: "lowpass", frequency: 500, rolloff: -24, Q: 3 }
        }).connect(thiefDistortion);
        const thiefRhythm = [ { time: '0:0', note: 'C2', duration: '4n' }, { time: '0:2', note: 'D#2', duration: '8n' }, { time: '1:0', note: 'F2', duration: '4n' }, { time: '1:2', note: 'G#2', duration: '8n' }, { time: '2:0', note: 'A#2', duration: '2n' }, { time: '3:0', note: 'C2', duration: '4n' }, { time: '3:2', note: 'F2', duration: '8n' } ];
        const thiefMusicPart = new Tone.Part((time, value) => { thiefMainSynth.triggerAttackRelease(value.note, value.duration, time); }, thiefRhythm);
        thiefMusicPart.loop = true; thiefMusicPart.loopEnd = '4m';
        thiefMainSynth.volume.value = -Infinity;

        // --- Componentes de Música del Guardián (Limbo) --- (deepseek_javascript_20251203_8c631c.js)
        const guardianReverb = new Tone.Reverb(10).connect(this.musicVolume);
        const guardianChorus = new Tone.Chorus(2, 3.5, 0.7).connect(guardianReverb);
        const guardianSynth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: "sine", modulationType: "sine", modulationIndex: 3, harmonicity: 1.5 },
            envelope: { attack: 0.5, decay: 1.5, sustain: 0.4, release: 4 }
        }).connect(guardianChorus);
        const guardianMelody = [ { time: "0:0", note: "C4", duration: "2n" }, { time: "0:2", note: "E4", duration: "2n" }, { time: "1:0", note: "G4", duration: "1n" }, { time: "2:0", note: "A4", duration: "2n" }, { time: "2:2", note: "C5", duration: "2n" }, { time: "3:0", note: "E5", duration: "4n" }, { time: "3:2", note: "G4", duration: "4n" } ];
        const guardianMusicPart = new Tone.Part((time, value) => { guardianSynth.triggerAttackRelease(value.note, value.duration, time); }, guardianMelody);
        guardianMusicPart.loop = true; guardianMusicPart.loopEnd = '4m';
        guardianSynth.volume.value = -Infinity;

        return { mainSynth, mainMusicPart, thiefMainSynth, thiefMusicPart, guardianSynth, guardianMusicPart };
    }

    startAllParts() {
        this.musicComponents.mainMusicPart.start(0);
        this.musicComponents.thiefMusicPart.start(0);
        this.musicComponents.guardianMusicPart.start(0);
    }
    
    stopAllMusic(duration = 0.5) {
        // Detiene todas las partes con un fade
        this.musicComponents.mainSynth.volume.rampTo(-Infinity, duration);
        this.musicComponents.thiefMainSynth.volume.rampTo(-Infinity, duration);
        this.musicComponents.guardianSynth.volume.rampTo(-Infinity, duration);
        this.currentMusic = null;
    }

    playSceneMusic(scene, duration = 1.5) {
        // Solo reproducir si el audio ha sido inicializado y no está silenciado
        if (!audioInitialized || isMuted) return;
        if (this.musicScene === scene) return;
        this.musicScene = scene;
        
        this.stopAllMusic(duration); // Fade out all existing music

        switch(scene) {
            case 'startup':
            case 'playing':
                this.currentMusic = this.musicComponents.mainSynth;
                this.currentMusic.volume.rampTo(-6, duration);
                // Aquí se podría implementar lógica de capas de tensión si fuera necesario
                break;
            case 'thief':
            case 'boss':
                this.currentMusic = this.musicComponents.thiefMainSynth;
                this.currentMusic.volume.rampTo(-6, duration);
                break;
            case 'limbo':
            case 'guardian':
                this.currentMusic = this.musicComponents.guardianSynth;
                this.currentMusic.volume.rampTo(-8, duration);
                break;
        }
        
        // Inicia el rotador de reglas solo en estado 'playing'
        if (scene === 'playing') {
            startRulesRotator();
        } else {
            stopRulesRotator();
        }
    }
    
    addStinger(soundName) {
        // Lógica para efectos cortos. Se usa playSoundEffect.
        if (!isMuted) {
            const effectsMap = {
                'correct': SOUND_EFFECTS.GAME.WORD_PURCHASE,
                'error': SOUND_EFFECTS.THIEF.CORRUPT,
                'warning': SOUND_EFFECTS.THIEF.APPEAR, // Usar un sonido de advertencia
                'surprise': SOUND_EFFECTS.GUARDIAN.GIFT
            };
            if (effectsMap[soundName]) {
                playSoundEffect(effectsMap[soundName]);
            }
        }
    }

    transitionTo(scene, duration = 2) {
        this.playSceneMusic(scene, duration);
    }
}

/**
 * Función para reproducir un efecto de sonido sintetizado.
 * Extendido de deepseek_javascript_20251203_cd811d.js
 */
function playSoundEffect(soundConfig) {
    if (!audioInitialized || isMuted || !window.audioSystem) return;
    
    const output = window.audioSystem.sfxVolume;

    switch(soundConfig.type) {
        case 'pad':
        case 'darkPad':
            const synth = new Tone.PolySynth(Tone.Synth, {
                oscillator: { type: soundConfig.type === 'darkPad' ? "sawtooth" : "sine" },
                envelope: { attack: 0.2, decay: 0.3, sustain: 0.4, release: soundConfig.envelope.release }
            }).connect(output);
            synth.triggerAttackRelease(soundConfig.notes, soundConfig.duration);
            break;
            
        case 'bell':
            const bell = new Tone.MetalSynth({
                frequency: 800,
                envelope: { attack: 0.001, decay: 0.1, release: soundConfig.envelope.release },
                harmonicity: 8.5,
                modulationIndex: 40,
                resonance: 300
            }).connect(output);
            bell.triggerAttackRelease(soundConfig.notes[0], soundConfig.duration);
            break;
            
        case 'sparkle':
        case 'shine':
            const sparkle = new Tone.NoiseSynth({
                noise: { type: "white" },
                envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.1 }
            }).connect(output);
            sparkle.triggerAttackRelease(soundConfig.duration);
            
            // Añadir tono brillante
            const highTone = new Tone.Synth({
                oscillator: { type: soundConfig.type === 'shine' ? "square" : "triangle" },
                envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.1 }
            }).connect(output);
            highTone.triggerAttackRelease(soundConfig.notes[0], soundConfig.duration * 0.5);
            break;

        case 'noise':
            const noise = new Tone.NoiseSynth({
                noise: { type: "pink" },
                envelope: { attack: 0.01, decay: 0.3, sustain: 0, release: 0.5 }
            }).connect(output);
            noise.volume.value = soundConfig.volume || -10;
            noise.triggerAttackRelease(1);
            break;
        case 'glitch':
            const glitch = new Tone.MembraneSynth({
                pitchDecay: 0.008,
                octaves: 2,
                envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 0.01 }
            }).connect(output);
            glitch.triggerAttackRelease(soundConfig.notes[0], soundConfig.duration);
            break;
    }
}

/**
 * Función para chequear y reproducir sonidos contextuales.
 * Integrado de deepseek_javascript_20251203_0dce6c.js
 * LOW_HEALTH usa el nuevo Tone.Oscillator.
 */
function checkContextualSounds() {
    Object.values(CONTEXTUAL_SOUNDS).forEach(context => {
        // Actualizar la racha actual para el trigger de STREAK (simulación)
        if (context === CONTEXTUAL_SOUNDS.STREAK) {
            context.trigger = () => playerStats.jefesDerrotadosSeguidos >= 1; // Simplificado para probar
        }

        // Solo ejecutar si el audio está inicializado
        if (!audioInitialized) return;

        if (context.trigger() && gameState === 'PLAYING' && !isMuted) {
            if (context.oneTime && !context.played) {
                context.sound();
                context.played = true;
            } else if (!context.oneTime) {
                const now = Date.now();
                if (!context.lastPlayed || now - context.lastPlayed > context.frequency) {
                    context.sound();
                    context.lastPlayed = now;
                    // Advertencia de vida baja con stinger
                    if (context === CONTEXTUAL_SOUNDS.LOW_HEALTH) {
                        window.audioSystem.addStinger('warning');
                    }
                }
            }
        } else if (!context.trigger() && context.played) {
            // Reiniciar si la condición ya no se cumple
            context.played = false;
        }
    });
}


// =======================================================================
// CONFIGURACIÓN Y ESTADO DEL JUEGO
// =======================================================================
let gameState = 'STARTUP'; 
let playerName = "";

// --- Instancias de Audio ---
let audioInitialized = false; // Indica si las clases de audio fueron creadas
let positionalAudio = null;
let audioSystem = null;

let playerMoney = 500;
let playerWords = {};
let usedChallengeWords = {}; // Palabras usadas en desafíos
let currentWord = {}; // Palabra actual en pantalla
let passiveIncome = 0;
let initialCredits = 500; 
let consecutiveFailures = 0; // Contador de fallos (vidas)

/**
 * Estadísticas de juego detalladas.
 * Integrado y ampliado de deepseek_javascript_20251203_093d18.js
 */
let playerStats = {
    wordsBought: 0, // Palabras compradas en la partida actual
    challengesWon: 0,
    bossesDefeatedCount: 0,
    // Nuevas estadísticas (persisten entre partidas si se implementa guardado):
    palabrasCompradasTotal: 0,
    palabrasUnicasCompradas: 0,
    tiempoJuego: 0, // En milisegundos
    desafiosCompletados: 0,
    jefesDerrotadosSinFallos: 0,
    limboActivaciones: 0,
    palabrasCorruptasEvitadas: 0,
    rachaMaxima: 0,
    dineroGanadoTotal: 0,
    tratosRechazados: 0,
    jefesDerrotadosSeguidos: 0,
    rachaBossSinFallos: 0, // Para el logro Gramático Experto
};

/**
 * Variable que mide la corrupción del juego.
 * Integrado de deepseek_javascript_20251203_b06cf0.js
 */
let grammaticalContamination = 0; 
let contaminationIncreaseInterval = null; // Intervalo para el aumento de corrupción por tiempo

// =======================================================================
// VARIABLES DE BUCLE Y TIEMPO
// =======================================================================
let animationFrameId = null;
let lastUpdateTime = 0;
let timeSinceLastIncomeUpdate = 0;
let timeSinceLastContextCheck = 0; // Nuevo para sonidos contextuales
let wordDisplayTimeout;
let challengeTimerInterval;
let guardianBlessingTimeout = null; // Temporizador para el regalo de vida del Guardián
let randomEventInterval = null; // Intervalo para eventos aleatorios
let timeElapsedInGame = 0; // Tiempo total de juego en la partida actual

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
let priceCurseEndTime = 0; // Fin de la maldición de precio
let tripleIncomeEndTime = 0; // Fin del multiplicador x3

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
const CORRUPTION_MAX = 100; // Límite de la contaminación
const CORRUPTION_BASE_INCREASE_PER_SECOND = 0.5; // Aumento base por segundo

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
    "¿Sientes ese peso en el aire? Son las tildes que has ignorado. Vengo a reclamarlas.", "Tus avances no han pasado desapercibidos. Es hora de una pequeña corrección.",
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
    'speakerOn': `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17.5 10.5a5.5 5.5 0 000 7.78M21 7a9 9 0 010 12.72" /></svg>`,
    'speakerOff': `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd" /><path stroke-linecap="round" stroke-linejoin="round" d="M17 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2" /></svg>`
};

let WORD_DATABASE = {}; // La base de datos de palabras del juego (se copia de la grande al inicio) 

// Mapeo de estilos para la UI
const categoryColors = { "Monosílabos": "text-gray-800", "Agudas": "text-green-800", "Llanas": "text-yellow-800", "Esdrújulas": "text-blue-800", "Sobreesdrújulas": "text-purple-800" };
const categoryBackgrounds = { "Monosílabos": "bg-gray-200", "Agudas": "bg-green-200", "Llanas": "bg-yellow-200", "Esdrújulas": "bg-blue-200", "Sobreesdrújulas": "bg-purple-200" };

// =======================================================================
// LÓGICA DE DIFICULTAD Y CORRUPCIÓN
// =======================================================================

/**
 * Calcula un factor de dificultad dinámico basado en el progreso del jugador.
 * Integrado de deepseek_javascript_20251203_f57e6d.js
 * @returns {number} Factor de dificultad (1.0 = Normal)
 */
function calculateDynamicDifficulty() {
    const baseDifficulty = 1.0;
    // La dificultad aumenta ligeramente con las palabras compradas (progreso)
    const wordsBoughtMultiplier = 1 + (playerStats.wordsBought / 500); // 1% de aumento por cada 5 palabras
    // La dificultad aumenta con el dinero (riqueza)
    const moneyMultiplier = 1 + (playerMoney / 500000); // 100% de aumento a 500,000
    // La dificultad aumenta con los jefes derrotados (maestría)
    const bossesDefeatedMultiplier = 1 + (bossesDefeated.length * 0.2);
    
    // El factor de dificultad está limitado para evitar escaladas irrazonables
    const dynamicFactor = baseDifficulty * wordsBoughtMultiplier * moneyMultiplier * bossesDefeatedMultiplier;
    return Math.min(dynamicFactor, 5.0); // Límite arbitrario
}

/**
 * Actualiza la contaminación gramatical (corrupción del juego).
 * Integrado de deepseek_javascript_20251203_b06cf0.js
 */
function updateGrammaticalContamination() {
    if (gameState !== 'PLAYING') return;
    grammaticalContamination = Math.min(grammaticalContamination, CORRUPTION_MAX);
}


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

    // Penalización por Contaminación Gramatical (aumenta el efecto negativo)
    const contaminationPenaltyFactor = 1 - (grammaticalContamination / CORRUPTION_MAX) * 0.5; // Máximo 50% de reducción
    passiveIncome *= contaminationPenaltyFactor;
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
    priceCurseEndTime = 0;
    tripleIncomeEndTime = 0;
    grammaticalContamination = 0; // Resetear corrupción
    timeElapsedInGame = 0; // Resetear tiempo de partida
    if (guardianBlessingTimeout) clearTimeout(guardianBlessingTimeout); 
    guardianBlessingTimeout = null;
    
    // Resetear estadísticas de la partida, pero mantener las globales para logros
    const totalStats = { 
        palabrasCompradasTotal: playerStats.palabrasCompradasTotal,
        palabrasUnicasCompradas: playerStats.palabrasUnicasCompradas,
        tiempoJuego: playerStats.tiempoJuego,
        desafiosCompletados: playerStats.desafiosCompletados,
        jefesDerrotadosSinFallos: playerStats.jefesDerrotadosSinFallos,
        limboActivaciones: playerStats.limboActivaciones,
        palabrasCorruptasEvitadas: playerStats.palabrasCorruptasEvitadas,
        rachaMaxima: playerStats.rachaMaxima,
        dineroGanadoTotal: playerStats.dineroGanadoTotal,
        tratosRechazados: playerStats.tratosRechazados,
    };
    playerStats = { 
        wordsBought: 0, 
        challengesWon: 0, 
        bossesDefeatedCount: 0, 
        jefesDerrotadosSeguidos: 0,
        rachaBossSinFallos: 0,
        ...totalStats 
    };
    
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
    // Aumentar contaminación por el fallo
    grammaticalContamination = Math.min(grammaticalContamination + 15, CORRUPTION_MAX); 
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
     grammaticalContamination = 0; // Resetear corrupción
     priceCurseEndTime = 0;
     tripleIncomeEndTime = 0;
     timeElapsedInGame = 0;

     if (guardianBlessingTimeout) clearTimeout(guardianBlessingTimeout); 
     guardianBlessingTimeout = null;
     
     // Mantener estadísticas persistentes
     const totalStats = { 
        palabrasCompradasTotal: playerStats.palabrasCompradasTotal,
        palabrasUnicasCompradas: playerStats.palabrasUnicasCompradas,
        tiempoJuego: playerStats.tiempoJuego,
        desafiosCompletados: playerStats.desafiosCompletados,
        jefesDerrotadosSinFallos: playerStats.jefesDerrotadosSinFallos,
        limboActivaciones: playerStats.limboActivaciones,
        palabrasCorruptasEvitadas: playerStats.palabrasCorruptasEvitadas,
        rachaMaxima: playerStats.rachaMaxima,
        dineroGanadoTotal: playerStats.dineroGanadoTotal,
        tratosRechazados: playerStats.tratosRechazados,
    };
     playerStats = { 
         wordsBought: 0, 
         challengesWon: 0, 
         bossesDefeatedCount: 0, 
         jefesDerrotadosSeguidos: 0,
         rachaBossSinFallos: 0,
         ...totalStats 
     }; 

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
    
    // Transición de música basada en el nuevo estado
    // Solo si el audio ha sido inicializado (tras el primer clic)
    if (audioInitialized) {
        switch (newState) {
            case 'PLAYING':
                if (oldState !== 'CINEMATIC') {
                    hideAllModals(); 
                }
                startGameLoops();
                window.audioSystem.playSceneMusic('playing'); 
                if (oldState !== 'CINEMATIC') {
                    if (!currentWord || !currentWord.word) {
                         console.log("Generating initial word because currentWord is empty.");
                         generateNewWord(true); 
                    } else {
                        console.log("Resuming with current word:", currentWord.word);
                         updateTimerBarUI();
                         const baseDuration = currentWord.isBonus ? 1000 : 3000;
                         const difficultyFactor = calculateDynamicDifficulty();
                         const duration = Math.max(1000, baseDuration / difficultyFactor); 
                         const elapsedTime = Date.now() - (currentWord.startTime || Date.now());
                         const remainingTime = Math.max(0, duration - elapsedTime);
                         startWordDisplayTimer(remainingTime);
                    }
                } else {
                    if (currentWord && currentWord.startTime) {
                        const baseDuration = currentWord.isBonus ? 1000 : 3000;
                        const difficultyFactor = calculateDynamicDifficulty();
                        const duration = Math.max(1000, baseDuration / difficultyFactor); 
                        
                        const elapsedTime = Date.now() - currentWord.startTime;
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
                window.audioSystem.playSceneMusic('startup'); 
                break;
            case 'CINEMATIC':
                // La música de CINEMATIC se maneja específicamente en showModal/typeEffect
                break; 
            case 'CHALLENGE_MINI':
            case 'CHALLENGE_BOSS':
                window.audioSystem.playSceneMusic('boss');
                break; 
            case 'GAME_OVER':
                window.audioSystem.stopAllMusic(0.5);
                playSoundEffect(SOUND_EFFECTS.GAME.GAME_OVER);
                break;
            case 'GAME_WON':
                window.audioSystem.stopAllMusic(0.5);
                playSoundEffect(SOUND_EFFECTS.GAME.BOSS_VICTORY);
                break;
        }
    } else if (newState === 'STARTUP') {
        hideAllModals();
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
    
    const originalState = gameState;
    if (originalState === 'PLAYING') {
        setGameState('CINEMATIC');
    }

    if (duration !== null) {
        closeButton.classList.add('hidden');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            
            if (gameState === 'CINEMATIC' && originalState === 'PLAYING') {
                 setGameState('PLAYING');
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
             if (audioInitialized) window.audioSystem.addStinger('error'); // Sonido de fallo/expiración
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
    if (audioInitialized) {
        window.audioSystem.playSceneMusic('guardian'); // Música del Guardián
        playSoundEffect(SOUND_EFFECTS.GUARDIAN.APPEAR);
    }

    playerStats.limboActivaciones++; // Contador de logros

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

    // Dificultad Dinámica
    const difficultyFactor = calculateDynamicDifficulty();
    const baseWordDuration = 3000;
    const wordDuration = Math.max(1000, baseWordDuration / difficultyFactor); // La dificultad reduce el tiempo

    // 1. Palabra Corrupta (Susurro del Jefe o por Contaminación)
    const corruptionChance = 0.15 + (grammaticalContamination / CORRUPTION_MAX) * 0.15; // 15% base + hasta 15% por corrupción
    let isCorruptedWord = false;
    if (isWhispering || Math.random() < corruptionChance) { 
         console.log(`Generating corrupted word. Total corruption chance: ${(corruptionChance * 100).toFixed(2)}%`);
        const randomCorrupted = CORRUPTED_WORDS[Math.floor(Math.random() * CORRUPTED_WORDS.length)];
        const category = randomCorrupted.category;
        const inflationMultiplier = 1 + (passiveIncome / INFLATION_FACTOR); 
        const dynamicValue = Math.floor((HUGE_WORD_DATABASE[category].value + (randomCorrupted.wrong.length * PRICE_PER_LETTER)) * inflationMultiplier);
        currentWord = { word: randomCorrupted.wrong, category: category, value: dynamicValue, isCorrupted: true, rightVersion: randomCorrupted.right, startTime: Date.now() };
        isCorruptedWord = true;
        updateUI();
        startWordDisplayTimer(wordDuration);
        return;
    }
    
    // 2. Palabra Christopher (Bonus x2)
    const christopherChance = 0.03 / difficultyFactor; // La dificultad reduce la probabilidad de bonus

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
        let priceFactor = 1.0;
        if (Date.now() < priceCurseEndTime) priceFactor = 1.25; // Maldición de precio (25% más caro)

        dynamicValue = Math.floor((WORD_DATABASE[randomCategory].value + (randomWord.length * PRICE_PER_LETTER)) * inflationMultiplier * difficultyFactor * priceFactor);
        
        if (isSuperValue) {
            dynamicValue *= SUPER_VALUE_MULTIPLIER;
        }
    }
    
     console.log(`Generated word: ${randomWord} (Category: ${randomCategory}, Value: ${dynamicValue}, SuperValue: ${isSuperValue})`);
    currentWord = { word: randomWord, category: randomCategory, value: dynamicValue, isSuperValue, startTime: Date.now() };
    updateUI();
    startWordDisplayTimer(wordDuration); 
}

/**
 * Formatea un número con separadores de miles (punto) y decimales (coma), manteniendo un decimal.
 * @param {number} num - El número a formatear.
 * @returns {string} - El número formateado.
 */
function formatNumber(num) {
    let parts = num.toFixed(1).toString().split('.');
    // Reemplazar separador de miles por punto (para formato español/latino)
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    // Usar coma como separador decimal
    return parts.join(','); 
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
    if (Date.now() < tripleIncomeEndTime) finalPassiveIncome *= 3; // Multiplicador x3

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
        // Aumentar contaminación al comprar palabra corrupta
        grammaticalContamination = Math.min(grammaticalContamination + 10, CORRUPTION_MAX);
        playerStats.palabrasCorruptasEvitadas++; // Contar las compradas como evitadas/identificadas (esto puede ser confuso, se ajustará en el futuro)
        playerStats.rachaBossSinFallos = 0; // Rompe la racha si se compra corrupta
        
        if (audioInitialized) {
            window.audioSystem.playSceneMusic('thief');
            playSoundEffect(SOUND_EFFECTS.THIEF.CORRUPT); // Efecto de corrupción
        }
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
        if (audioInitialized) playSoundEffect(SOUND_EFFECTS.GAME.SUPER_VALUE); // Sonido de bonus
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
            playerStats.dineroGanadoTotal += currentWord.value;
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
            playerStats.dineroGanadoTotal += currentWord.value;
            categoryData.count++;
            categoryData.list.push(currentWord.word);
            wordBought = true;
            
            // Actualizar estadísticas de palabras únicas y totales
            playerStats.palabrasCompradasTotal++;
            playerStats.wordsBought++; // Palabras compradas en la partida
            
            if (currentWord.isSuperValue) {
                 console.log("Activating Super Value bonus.");
                const now = Date.now();
                const category = currentWord.category;
                const baseDuration = 10000; // 10 segundos
                const remainingTime = (superValueBoosts[category] > now) ? (superValueBoosts[category] - now) : 0;
                superValueBoosts[category] = now + remainingTime + baseDuration; 
                if (audioInitialized) playSoundEffect(SOUND_EFFECTS.GAME.SUPER_VALUE);
            } else {
                 if (audioInitialized) playSoundEffect(SOUND_EFFECTS.GAME.WORD_PURCHASE); // Sonido de compra normal
            }
        } else {
             console.log("Word is already owned or category is full.");
        }
    }

    if (wordBought) {
        if (!hasBoughtFirstWord) hasBoughtFirstWord = true;
        
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
                const baseDuration = currentWord.isBonus ? 1000 : 3000;
                const difficultyFactor = calculateDynamicDifficulty();
                const wordDuration = Math.max(1000, baseDuration / difficultyFactor);

                const newRemainingTime = Math.max(100, (wordDuration - elapsedTime) - 1000);
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
    if (audioInitialized) {
        window.audioSystem.playSceneMusic('boss'); 
        playSoundEffect(SOUND_EFFECTS.THIEF.APPEAR); // Sonido de aparición
    }

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

    const difficultyFactor = calculateDynamicDifficulty();
    let timeLeft;

    // Lógica específica para cada tipo de reto
    switch (type) {
        case 'accent':
            timeLeft = Math.max(5, Math.floor(20 / difficultyFactor)); // Tiempo base 20s
            descriptionEl.textContent = 'Escribe la palabra con la tilde correcta:';
            const accentChallenge = MINI_CHALLENGE_WORDS.accent[Math.floor(Math.random() * MINI_CHALLENGE_WORDS.accent.length)];
            currentChallengeData.answer = accentChallenge.right;
            questionEl.textContent = accentChallenge.wrong;
            inputContainer.classList.remove('hidden');
            buttonsContainer.classList.add('hidden');
            inputEl.focus();
            break;
        case 'trueFalse':
            timeLeft = Math.max(5, Math.floor(20 / difficultyFactor)); // Tiempo base 20s
            descriptionEl.textContent = '¿La clasificación es correcta?';
            const tfChallenge = MINI_CHALLENGE_WORDS.trueFalse[Math.floor(Math.random() * MINI_CHALLENGE_WORDS.trueFalse.length)];
            currentChallengeData.answer = tfChallenge.isCorrect;
            questionEl.textContent = `"${tfChallenge.word}" - ${tfChallenge.category}`;
            inputContainer.classList.add('hidden');
            buttonsContainer.classList.remove('hidden');
            buttonsContainer.classList.add('flex');
            break;
        case 'tonicSyllable': 
            timeLeft = Math.max(5, Math.floor(25 / difficultyFactor)); // Tiempo base 25s
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
    
    if (audioInitialized) {
        window.audioSystem.playSceneMusic('playing'); // Vuelve a la música principal
    }
    
    const modal = document.getElementById('thiefMiniChallengeModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    
    let isCorrect = false;
    let failureReason = "Respuesta incorrecta.";
    
    switch (currentChallengeData.type) {
        case 'accent':
        case 'tonicSyllable': 
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
            if (playerAnswer === currentChallengeData.answer) {
                isCorrect = true;
            }
            failureReason = `Incorrecto. La clasificación era ${currentChallengeData.answer ? 'Verdadera' : 'Falsa'}.`;
            break;
    }

    if(playerAnswer === null) failureReason = "Se acabó el tiempo.";

    if (isCorrect) {
        playerStats.challengesWon++; 
        playerStats.desafiosCompletados++; 
        const reward = CHALLENGE_REWARDS.base; 
        playerMoney += reward;
        playerStats.dineroGanadoTotal += reward;
        grammaticalContamination = Math.max(0, grammaticalContamination - 5); 
        
        if (audioInitialized) playSoundEffect(SOUND_EFFECTS.GAME.LEVEL_UP); // Sonido de acierto/recompensa
        showModal(`¡Correcto! Ganas ${reward.toLocaleString('es-ES', { useGrouping: true }).replace(/\./g, ',')}.`);
    } else {
        grammaticalContamination = Math.min(grammaticalContamination + 15, CORRUPTION_MAX); 
        if (audioInitialized) playSoundEffect(SOUND_EFFECTS.THIEF.STEAL); // Sonido de robo
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
    playerStats.jefesDerrotadosSeguidos = 0; 
    
    // Lógica de Bendición del Guardián (revivir)
    if (consecutiveFailures === 1 && guardianBlessingAvailable) {
        guardianBlessingAvailable = false; 
        if (guardianBlessingTimeout) clearTimeout(guardianBlessingTimeout); 
        guardianBlessingTimeout = setTimeout(() => {
            if (gameState !== 'GAME_OVER' && consecutiveFailures > 0) { 
                consecutiveFailures--;
                showGuardianGiftModal("El Guardián sintió tu tropiezo...", "¡Te devuelve 1 vida!");
                if (audioInitialized) playSoundEffect(SOUND_EFFECTS.GUARDIAN.HEAL);
                updateUI(); 
            }
            guardianBlessingTimeout = null; 
        }, 21000); 
    }

    checkForThiefDeal(() => {
        if (audioInitialized) {
            window.audioSystem.playSceneMusic('thief'); // Música de tensión
            playSoundEffect(SOUND_EFFECTS.THIEF.TAUNT);
        }
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
    if (audioInitialized) {
        window.audioSystem.playSceneMusic('boss');
        playSoundEffect(SOUND_EFFECTS.THIEF.APPEAR);
    }
    
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
        
        const difficultyFactor = calculateDynamicDifficulty();
        const baseTime = 60;
        const timeDebuffPerWord = 0.03; 
        const timeDebuff = baseTime * timeDebuffPerWord * corruptedWordsBought; 
        let totalTime = Math.max(15, Math.floor(baseTime - timeDebuff));
        
        totalTime = Math.max(15, Math.floor(totalTime / difficultyFactor)); 
        
        let timeLeft = totalTime;
        
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
    
    if (dealButtons) dealButtons.classList.add('hidden');
    if (giftButtons) giftButtons.classList.add('hidden');

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50); // Velocidad de escritura
        } else {
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
        playerStats.jefesDerrotadosSeguidos++; 
        
        if (playerStats.jefesDerrotadosSeguidos > playerStats.rachaBossSinFallos) {
            playerStats.rachaBossSinFallos = playerStats.jefesDerrotadosSeguidos;
        }

        const difficultyFactor = calculateDynamicDifficulty();
        const rewardFactor = 1 / Math.sqrt(difficultyFactor); 
        const baseRewardPercentage = { 1: 0.10, 2: 0.15, 3: 0.20, 4: 0.25, 5: 0.30, 6: 0.35, 7: 0.40, 8: 0.50 }[currentBossLevel] || 0.05; 
        const rewardPercentage = baseRewardPercentage * rewardFactor;
        
        const moneyReward = Math.floor(playerMoney * rewardPercentage);
        playerMoney += moneyReward;
        playerStats.dineroGanadoTotal += moneyReward;
        
        grammaticalContamination = Math.max(0, grammaticalContamination - 25);
        
        const finalDialogue = BOSS_VICTORY_DIALOGUES[Math.floor(Math.random() * BOSS_VICTORY_DIALOGUES.length)];
        const resultMessage = `¡VICTORIA! Ganas un ${Math.floor(rewardPercentage * 100)}% de tu dinero (+${moneyReward.toLocaleString('es-ES', { useGrouping: true }).replace(/\./g, ',')}).`;
        
        if (audioInitialized) {
            playSoundEffect(SOUND_EFFECTS.GAME.BOSS_VICTORY); // Sonido de victoria
        }
        
        typeEffect(dialogueEl, finalDialogue, () => hideBossModal(() => {
            if (audioInitialized) window.audioSystem.playSceneMusic('playing'); 
            showModal(resultMessage); 
        }));
    } else {
         console.log(`Boss level ${currentBossLevel} failed.`);
        consecutiveFailures++;
        playerStats.jefesDerrotadosSeguidos = 0; 
        
        grammaticalContamination = Math.min(grammaticalContamination + 30, CORRUPTION_MAX); 
        
        if (consecutiveFailures === 1 && guardianBlessingAvailable) {
             guardianBlessingAvailable = false;
             if (guardianBlessingTimeout) clearTimeout(guardianBlessingTimeout);
             guardianBlessingTimeout = setTimeout(() => {
                if (gameState !== 'GAME_OVER' && consecutiveFailures > 0) {
                    consecutiveFailures--;
                    showGuardianGiftModal("El Guardián sintió tu tropiezo...", "¡Te devuelve 1 vida!");
                    if (audioInitialized) playSoundEffect(SOUND_EFFECTS.GUARDIAN.HEAL);
                    updateUI();
                }
                guardianBlessingTimeout = null;
             }, 21000);
        }

        checkForThiefDeal(() => {
            const difficultyFactor = calculateDynamicDifficulty();
            const penaltyFactor = 1 * difficultyFactor; 
            
            let baseMoneyLost = playerMoney * ({ 1: 0.10, 2: 0.20, 3: 0.30, 4: 0.40, 5: 0.50, 6: 0.50, 7: 0.50, 8: 0.50 }[currentBossLevel] || 0.1); 
            let moneyLost = baseMoneyLost * penaltyFactor;
            
            playerMoney = Math.max(0, playerMoney - Math.floor(moneyLost));
            
            const finalDialogue = BOSS_DEFEAT_DIALOGUES[Math.floor(Math.random() * BOSS_DEFEAT_DIALOGUES.length)];
            const resultMessage = `¡DERROTA! El Ladrón te roba ${Math.floor(moneyLost).toLocaleString('es-ES', { useGrouping: true }).replace(/\./g, ',')}. Pierdes 1 vida.`;
            
            if (audioInitialized) {
                playSoundEffect(SOUND_EFFECTS.THIEF.STEAL); // Sonido de robo
            }
            
            typeEffect(dialogueEl, finalDialogue, () => hideBossModal(() => {
                if (audioInitialized) window.audioSystem.playSceneMusic('playing'); 
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
    const difficultyFactor = calculateDynamicDifficulty();
    const contaminationFactor = (1 + (grammaticalContamination / CORRUPTION_MAX));
    
    const baseMiniChallengeChance = 0.10;
    const baseThiefAttackChance = 0.10 * contaminationFactor; 
    const baseGuardianGiftChance = 0.20 / difficultyFactor; 

    // 1. Mini-Retos (Probabilidad 10% base)
    if (rand < baseMiniChallengeChance) { 
        const challengeRand = Math.random();
        if (challengeRand < 0.33) { console.log("Triggering mini-challenge: accent"); startThiefMiniChallenge('accent'); }         
        else if (challengeRand < 0.66) { console.log("Triggering mini-challenge: trueFalse"); startThiefMiniChallenge('trueFalse'); }  
        else { console.log("Triggering mini-challenge: tonicSyllable"); startThiefMiniChallenge('tonicSyllable'); } 
    }
    
    // 2. Ataque Aleatorio del Ladrón (Probabilidad 10% * Contaminación)
    else if (rand < baseMiniChallengeChance + baseThiefAttackChance) {
        console.log("Triggering random thief attack.");
        
        if (audioInitialized) {
            window.audioSystem.playSceneMusic('thief');
            playSoundEffect(SOUND_EFFECTS.THIEF.APPEAR);
        }

        let attackType;
        
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
                        grammaticalContamination = Math.min(grammaticalContamination + 10, CORRUPTION_MAX); 
                        return { title: 'Robo de Vidas', effectText: "¡Has perdido 1 vida!", onComplete: () => {
                            consecutiveFailures++;
                            playerStats.jefesDerrotadosSeguidos = 0; 
                            if (consecutiveFailures === 1 && guardianBlessingAvailable) {
                                 guardianBlessingAvailable = false;
                                 if (guardianBlessingTimeout) clearTimeout(guardianBlessingTimeout);
                                 guardianBlessingTimeout = setTimeout(() => {
                                    if (gameState !== 'GAME_OVER' && consecutiveFailures > 0) {
                                        consecutiveFailures--;
                                        showGuardianGiftModal("El Guardián sintió tu tropiezo...", "¡Te devuelve 1 vida!");
                                        if (audioInitialized) playSoundEffect(SOUND_EFFECTS.GUARDIAN.HEAL);
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
                        const stolenFactor = 0.15 * difficultyFactor * contaminationFactor; 
                        const moneyStolen = Math.floor(playerMoney * stolenFactor);
                        return { title: 'Robo de Ingresos', effectText: `¡Te ha robado el ${Math.floor(stolenFactor*100)}% de tu dinero! (-${moneyStolen.toLocaleString('es-ES', { useGrouping: true }).replace(/\./g, ',')})`, onComplete: () => {
                            playerMoney -= moneyStolen;
                            updateUI();
                            if (audioInitialized) playSoundEffect(SOUND_EFFECTS.THIEF.STEAL);
                            if (audioInitialized) window.audioSystem.playSceneMusic('playing', 0.5);
                        }};
                    case 'wordTheft':
                        const ownableCategories = Object.keys(playerWords).filter(cat => cat !== "Sobreesdrújulas" && playerWords[cat]?.count > 0);
                        if (ownableCategories.length > 0) {
                            const randomCategory = ownableCategories[Math.floor(Math.random() * ownableCategories.length)];
                            const wordsInCategory = playerWords[randomCategory].list;
                            const wordsToStealCount = Math.max(1, Math.floor(wordsInCategory.length * (0.10 * contaminationFactor)));
                            
                            return { title: 'Robo de Palabras', effectText: `¡Ha robado ${wordsToStealCount} palabra(s) de la categoría ${randomCategory}!`, onComplete: () => {
                                for(let i = 0; i < wordsToStealCount; i++) {
                                    if(wordsInCategory.length > 0) {
                                        const randomIndex = Math.floor(Math.random() * wordsInCategory.length);
                                        wordsInCategory.splice(randomIndex, 1);
                                    }
                                }
                                playerWords[randomCategory].count -= wordsToStealCount;
                                updateUI();
                                if (audioInitialized) playSoundEffect(SOUND_EFFECTS.THIEF.STEAL);
                                if (audioInitialized) window.audioSystem.playSceneMusic('playing', 0.5);
                            }};
                        } else { 
                             const stolenFactorFallback = 0.15 * difficultyFactor;
                             const moneyStolenFallback = Math.floor(playerMoney * stolenFactorFallback);
                             return { title: 'Robo de Ingresos', effectText: `Iba a robar palabras, pero no tienes. Me conformo con ${moneyStolenFallback.toLocaleString('es-ES', { useGrouping: true }).replace(/\./g, ',')}`, onComplete: () => {
                                playerMoney -= moneyStolenFallback;
                                updateUI();
                                if (audioInitialized) playSoundEffect(SOUND_EFFECTS.THIEF.STEAL);
                                if (audioInitialized) window.audioSystem.playSceneMusic('playing', 0.5);
                            }};
                        }
                }
            }
        );
    }
    // 3. Regalo del Guardián (Probabilidad 20% / Dificultad)
    else if (rand < baseMiniChallengeChance + baseThiefAttackChance + baseGuardianGiftChance) { 
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
    const difficultyFactor = calculateDynamicDifficulty();

    if (audioInitialized) {
        window.audioSystem.playSceneMusic('guardian'); // Música del Guardián
        playSoundEffect(SOUND_EFFECTS.GUARDIAN.GIFT);
    }

    if (giftRand < 0.85) { 
         console.log("Guardian gift: Wealth.");
        dialogue = "Veo tu esfuerzo, acepta esta ayuda.";
        const moneyPercent = (0.05 + Math.random() * 0.10) / difficultyFactor; 
        moneyGained = Math.floor(playerMoney * moneyPercent);
        effectText = `¡Don de Riqueza! (+${moneyGained.toLocaleString('es-ES', { useGrouping: true }).replace(/\./g, ',')})`;
        playerMoney += moneyGained;
        playerStats.dineroGanadoTotal += moneyGained;
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
        if (audioInitialized) window.audioSystem.playSceneMusic('playing', 0.5); // Vuelve a la música de juego tras el diálogo
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
    if (audioInitialized) window.audioSystem.playSceneMusic('thief'); 

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
                 if (audioInitialized) window.audioSystem.playSceneMusic('playing', 0.5);
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
    if (audioInitialized) window.audioSystem.playSceneMusic('thief'); 

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
        if (audioInitialized) window.audioSystem.playSceneMusic('thief'); 

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
                if (audioInitialized) window.audioSystem.playSceneMusic('playing'); 
                showModal("Trato aceptado. Has recuperado una vida, pero tus palabras han desaparecido.");
                 updateUI();
            };
            document.getElementById('rejectDealButton').onclick = () => {
                 console.log("Deal rejected.");
                dealRejectedForLimboBoost = true; 
                playerStats.tratosRechazados++; // Contador para logro
                modal.classList.add('hidden', 'opacity-0');
                modal.classList.remove('flex');
                
                if (audioInitialized) window.audioSystem.playSceneMusic('playing'); 
                if (callbackOnNoDeal) callbackOnNoDeal();
            };
        } else {
             console.log("No category eligible for deal.");
             if (audioInitialized) window.audioSystem.playSceneMusic('playing'); 
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
    
    if (!lastUpdateTime) lastUpdateTime = timestamp;
    const deltaTime = timestamp - lastUpdateTime;
    lastUpdateTime = timestamp;
    timeSinceLastIncomeUpdate += deltaTime;
    timeElapsedInGame += deltaTime; 
    playerStats.tiempoJuego += deltaTime; 
    timeSinceLastContextCheck += deltaTime;
    
    // 1. Lógica de Ingreso Pasivo y Contaminación (cada 1 segundo)
    if (timeSinceLastIncomeUpdate >= 1000) {
        let incomeThisSecond = passiveIncome;
        if (Date.now() < christopherBoostEndTime) incomeThisSecond *= 2;
        if(Date.now() < limboGramaticalEndTime) incomeThisSecond *= 1.21;
        if (Date.now() < tripleIncomeEndTime) incomeThisSecond *= 3;
        
        playerMoney += incomeThisSecond;
        
        grammaticalContamination = Math.min(grammaticalContamination + CORRUPTION_BASE_INCREASE_PER_SECOND, CORRUPTION_MAX);

        timeSinceLastIncomeUpdate = 0;
        
        updateUI();
    }

    // 2. Lógica de Sonidos Contextuales (cada segundo)
    if (timeSinceLastContextCheck >= 1000) {
        checkContextualSounds();
        timeSinceLastContextCheck = 0;
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
    
    const baseDuration = currentWord.isBonus ? 1000 : 3000;
    const difficultyFactor = calculateDynamicDifficulty();
    const duration = currentWord.isBonus ? 1000 : Math.max(1000, baseDuration / difficultyFactor);
    
    const now = Date.now();
    const elapsedTime = now - currentWord.startTime;
    const timeLeft = Math.max(0, duration - elapsedTime);
    const percentage = (timeLeft / duration) * 100;
    bar.style.width = `${percentage}%`;
    
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

// --- Funciones de Audio Simplificadas para usar DynamicAudioSystem ---

/**
 * Inicializa el contexto de audio y el sistema dinámico.
 * NOTA: Esto solo crea las clases y componentes, pero NO inicia el AudioContext (Tone.start)
 * para esperar un gesto del usuario.
 */
async function initializeAudio() {
    if (audioInitialized) return;
    
    try {
        // Inicializar sistemas de audio (sin iniciar Tone.context)
        window.audioSystem = new DynamicAudioSystem();
        window.positionalAudio = new PositionalAudio();
        window.audioSystem.startAllParts(); // Inicializa los loops silenciados
        
        // Añadir controles de audio
        addAudioControls();
        setupAudioEvents(); 
        
        audioInitialized = true;
        console.log("Audio systems initialized (Tone.context NOT started).");
    } catch (e) {
        console.error("Error initializing audio systems:", e);
    }
}

/**
 * Inicia el contexto de audio. Debe ser llamado por un gesto del usuario.
 */
async function startAudioContext() {
    if (Tone.context.state !== 'running') {
        try {
            await Tone.start();
            console.log("Audio context successfully started/resumed by user gesture.");
            // Una vez iniciado, reproducir la música de la escena actual
            if (gameState === 'STARTUP') {
                 window.audioSystem.playSceneMusic('startup');
            } else if (gameState === 'PLAYING') {
                 window.audioSystem.playSceneMusic('playing');
            }
        } catch(e) {
             console.error("Error starting/resuming audio context:", e);
        }
    }
}

/**
 * Configura eventos de audio para reaccionar a la lógica del juego.
 * Nota: El evento 'transitionend' requiere que la barra de tiempo exista en el HTML.
 */
function setupAudioEvents() {
    const bar = document.getElementById('wordTimerBar');
    if (bar) {
        bar.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'width') {
                const width = parseFloat(e.target.style.width);
                if (width < 30 && gameState === 'PLAYING' && audioInitialized) {
                    // Evita disparos constantes si el timer está atascado
                    if (!window.audioSystem.warningPlayed) {
                        window.audioSystem.addStinger('warning');
                        window.audioSystem.warningPlayed = true;
                    }
                } else if (width > 30) {
                    if (window.audioSystem) window.audioSystem.warningPlayed = false;
                }
            }
        });
    }
}

/**
 * Agrega controles de volumen dinámicos a la interfaz (simulado, asume que el HTML está listo).
 * Integrado de deepseek_javascript_20251203_51f800.js
 */
function addAudioControls() {
    const controlsContainer = document.getElementById('gameControls'); // Usamos el contenedor de controles existente

    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'flex flex-col gap-1 text-xs bg-gray-50 p-2 rounded-lg shadow-inner';
    controlsDiv.innerHTML = `
        <div class="flex items-center gap-2">
            <span class="text-xs font-semibold w-12 text-gray-700">Música:</span>
            <input type="range" min="0" max="100" value="70" 
                   class="w-16 accent-blue-600" id="musicVolume">
        </div>
        <div class="flex items-center gap-2">
            <span class="text-xs font-semibold w-12 text-gray-700">Efectos:</span>
            <input type="range" min="0" max="100" value="80" 
                   class="w-16 accent-blue-600" id="sfxVolume">
        </div>
    `;
    
    if (controlsContainer) {
        controlsContainer.appendChild(controlsDiv);
    }
    
    // Event listeners para controles
    document.getElementById('musicVolume')?.addEventListener('input', (e) => {
        if (window.audioSystem) {
            const volume = Tone.gainToDb(e.target.value / 100) - 6; // Ajuste para que 100 sea -6dB
            window.audioSystem.musicVolume.volume.value = volume;
        }
    });
    
    document.getElementById('sfxVolume')?.addEventListener('input', (e) => {
        if (window.audioSystem) {
            const volume = Tone.gainToDb(e.target.value / 100);
            window.audioSystem.sfxVolume.volume.value = volume;
        }
    });
}

/**
 * Inicia los bucles de juego (animación y eventos aleatorios).
 */
function startGameLoops() {
    if (animationFrameId || gameState !== 'PLAYING') return;
    
    stopGameLoops(); 
    
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
 * Lógica común de inicio de juego.
 */
async function startGameCommon(shouldLoad = true) {
     if (activeChallengeOnLoad) {
        handleChallengeFailure("Reto abandonado al recargar la página.");
        activeChallengeOnLoad = false;
     }
}

/**
 * Configura los listeners de eventos para la interacción del usuario.
 */
function setupEventListeners() {
    document.getElementById('playButton').addEventListener('click', async () => {
        // 1. Iniciar AudioContext (si no se ha hecho) con el gesto del usuario
        if (!audioInitialized) {
            await initializeAudio(); // Solo crea las clases
        }
        await startAudioContext(); // Inicia Tone.context
        
        // 2. Mostrar modal de nombre
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
            playerStats.dineroGanadoTotal += 300000;
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
        // 1. Asegurar que el contexto de audio esté inicializado y corriendo
        if (!audioInitialized) {
            await initializeAudio(); 
        }
        await startAudioContext(); // Necesario si es la primera interacción o si se pausó

        // 2. Toglear silencio y controlar la música
        isMuted = !isMuted;
        Tone.Destination.mute = isMuted;
        muteButton.innerHTML = isMuted ? ICON_LIBRARY.speakerOff : ICON_LIBRARY.speakerOn;
        
        if(!isMuted) {
            // Reanudar música de la escena actual
            if(gameState === 'PLAYING' || gameState === 'STARTUP') {
                window.audioSystem.playSceneMusic(gameState === 'PLAYING' ? 'playing' : 'startup');
            } else if (gameState === 'CHALLENGE_MINI' || gameState === 'CHALLENGE_BOSS' || isWhispering) {
                window.audioSystem.playSceneMusic('thief');
            }
        } else {
            window.audioSystem.stopAllMusic(0.5);
        }
    });
    
    window.addEventListener('beforeunload', () => {
    });
}

/**
 * Inicializa el juego al cargar la ventana.
 * Solo se configura el estado de la UI y los listeners, NO se inicia el audio.
 */
async function initGame() {
    changeView('startup'); 
    await initializeAudio(); // Solo crea las clases, no inicia el contexto.
    setupEventListeners();
}

window.onload = initGame;
