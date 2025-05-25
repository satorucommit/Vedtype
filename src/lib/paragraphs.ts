
// New collections of abstract/nonsensical sentences
const easySentences = [
  "A gentle breeze whispered through the tall grass fields.",
  "The old clock tower chimed in the distant quiet town.",
  "Sunlight dappled through the leaves of ancient oak trees.",
  "A small boat drifted slowly across the calm blue lake.",
  "Stars began to appear in the darkening evening sky.",
  "Footprints faded on the soft and sandy ocean shore.",
  "The mountain peak was covered in a fresh layer of snow.",
  "Birds sang their cheerful songs from high tree branches.",
  "A hidden path wound its way deep into the forest.",
  "The river flowed steadily towards the vast open sea.",
  "Clouds drifted lazily, painting shapes against the blue.",
  "A curious squirrel scampered up a sturdy maple tree trunk.",
  "The old lighthouse stood guard over the rocky coastline.",
  "Wildflowers bloomed in a riot of color in the meadow.",
  "Mist hung low over the valley in the early morning light."
];

const mediumSentences = [
  "Ephemeral patterns shifted in the digital undercurrent.",
  "The cartographer meticulously charted constellations yet unknown.",
  "Silent monoliths hummed with an energy both ancient and arcane.",
  "Through crystalline structures, light refracted into a thousand hues.",
  "Whispers of forgotten algorithms echoed in the data streams.",
  "Celestial gardens bloomed with flora spun from cosmic dust.",
  "Explorers navigated nebulous pathways to shimmering new realities.",
  "The chrono-architect adjusted gears of a vast temporal mechanism.",
  "Resonant frequencies vibrated across the quantum foam of existence.",
  "Guardians of the threshold observed the flow of interdimensional traffic.",
  "A symphony of starlight played out in the silent cosmic theatre.",
  "Geodesic domes pulsed with the rhythm of synthesized thought.",
  "The alchemist sought to transmute base data into pure insight.",
  "Forgotten dialects were deciphered from the stellar background noise.",
  "Invisible currents guided the solar sails of interstellar vessels."
];

const hardSentences = [
  "Juxtaposing labyrinthine quantum entanglements, the observer pondered non-locality.",
  "Existential quandaries manifested as intricate chronospatial paradoxes.",
  "Phenomenological transfigurations illuminated the esoteric underpinnings of reality.",
  "The syzygy of celestial mechanics orchestrated profound gravitational resonances.",
  "Epistemological constructs dissolved under the scrutiny of hyperdimensional logic.",
  "Ontological inertia resisted the transmutation of fundamental particle states.",
  "Sophisticated cybernetic consciousness navigated the noosphere's complex strata.",
  "Ethereal algorithms sculpted nascent universes from primordial information fields.",
  "Philosophical treatises on emergent complexity were encoded in fractal geometries.",
  "Neocybernetic organisms assimilated vast datasets through neuro-photonic interfaces.",
  "Metaphysical inquiries into the quintessence of being echoed through simulated multiverses.",
  "Ubiquitous quantum fluctuations subtly perturbed the deterministic flow of causality.",
  "Xeno-linguistic analysis revealed syntactical structures beyond human comprehension.",
  "Cosmological inflation models were refined by observing trans-dimensional echoes.",
  "The intricate ballet of subatomic particles hinted at a deeper, unified field theory."
];

export type Difficulty = "easy" | "medium" | "hard";

const lastUsedFirstSentenceIndex: { [key in Difficulty]?: number } = {};
const lastUsedSentencesInBlock: { [key in Difficulty]?: number[] } = {};

const addSpaceBetweenLetters = (text: string): string => {
  return text; // Standard spacing
};

export const getParagraph = (difficulty: Difficulty): string => {
  let sentencePool: string[];
  let numSentencesToCombine: number;

  switch (difficulty) {
    case "easy":
      sentencePool = easySentences;
      numSentencesToCombine = 4; // Increased for longer easy paragraphs
      break;
    case "medium":
      sentencePool = mediumSentences;
      numSentencesToCombine = 3; // Medium sentences are longer
      break;
    case "hard":
      sentencePool = hardSentences;
      numSentencesToCombine = 2; // Hard sentences are very long
      break;
    default:
      sentencePool = easySentences;
      numSentencesToCombine = 4;
  }

  if (sentencePool.length === 0) {
    return "No sentences available for this difficulty.";
  }

  const blockSentences: string[] = [];
  let currentBlockIndices: number[] = [];

  // Ensure lastUsedSentencesInBlock is initialized for the difficulty
  if (!lastUsedSentencesInBlock[difficulty]) {
    lastUsedSentencesInBlock[difficulty] = [];
  }

  // Pick the first sentence for the block
  let firstPickIndex: number;
  if (sentencePool.length > 1 && lastUsedFirstSentenceIndex[difficulty] !== undefined) {
    do {
      firstPickIndex = Math.floor(Math.random() * sentencePool.length);
    } while (firstPickIndex === lastUsedFirstSentenceIndex[difficulty]);
  } else {
    firstPickIndex = Math.floor(Math.random() * sentencePool.length);
  }
  blockSentences.push(sentencePool[firstPickIndex]);
  currentBlockIndices.push(firstPickIndex);
  lastUsedFirstSentenceIndex[difficulty] = firstPickIndex;

  // Pick subsequent sentences for the block
  for (let i = 1; i < numSentencesToCombine; i++) {
    if (sentencePool.length <= 1) { // Not enough unique sentences
      blockSentences.push(sentencePool[0]); // Repeat if only one available
      continue;
    }
    let nextPickIndex: number;
    let attempts = 0;
    const maxAttempts = sentencePool.length * 2; // Prevent infinite loop

    do {
      nextPickIndex = Math.floor(Math.random() * sentencePool.length);
      attempts++;
    } while (
      currentBlockIndices.includes(nextPickIndex) && // Avoid repetition within the current block
      attempts < maxAttempts // Safety break
    );
    // If maxAttempts reached and still a repeat, it's okay if pool is small
    blockSentences.push(sentencePool[nextPickIndex]);
    currentBlockIndices.push(nextPickIndex);
  }
  
  // Update the list of sentences used in this block for this difficulty
  // To avoid immediate full block repetition, this could be expanded,
  // but for now, focusing on first sentence and intra-block is good.
  lastUsedSentencesInBlock[difficulty] = currentBlockIndices;

  const paragraph = blockSentences.join(' ');
  return addSpaceBetweenLetters(paragraph);
};

// Reset last used indices when initialParagraph is requested or difficulty changes often.
// This might be called from useTypingGame on reset.
export const resetParagraphMemory = () => {
  Object.keys(lastUsedFirstSentenceIndex).forEach(key => {
    delete lastUsedFirstSentenceIndex[key as Difficulty];
  });
  Object.keys(lastUsedSentencesInBlock).forEach(key => {
    delete lastUsedSentencesInBlock[key as Difficulty];
  });
};


export const initialParagraph = addSpaceBetweenLetters(getParagraph("easy"));
// Call reset on initial load if desired, or manage through useTypingGame's reset.
resetParagraphMemory();

