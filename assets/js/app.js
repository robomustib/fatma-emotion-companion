// AI Conversation Manager for Fatma Emotion Companion

// State Variables
let currentStep = 0;
let selectedEmoji = '';
let detectedVerbs = [];
let conversationHistory = [];
let detectedEmotions = [];
let emojiQuestionAsked = false;

// DOM Elements
let chatContainer, userInput, emojiSelection, progressBar;
let horoscopeResult, finalEmoji, horoscopeText, verbList, userInputSection;

// Language Text
const textContent = {
  de: {
    welcome: "Erzähl mir, was dich heute beschäftigt. Du kannst einfach drauflos schreiben.",
    emojiPrompt: "Welches Emoji beschreibt deinen aktuellen Zustand am besten?",
    thanks: "Danke, dass du das mit mir teilst.",
    horoscopeTitle: "Dein persönliches Emotions-Horoskop",
    newConversation: "Neues Gespräch beginnen",
    placeholder: "Schreibe deine Antwort hier...",
    send: "Senden",
    iHear: "Ich höre:",
    emotionsDetected: "Erkannte Emotionen:",
    exploreMore: "Möchtest du mehr darüber erkunden?",
    continuePrompt: "Erzähl mir mehr darüber..."
  },
  en: {
    welcome: "Tell me what's on your mind today. You can just write freely.",
    emojiPrompt: "Which emoji best describes your current state?",
    thanks: "Thank you for sharing that with me.",
    horoscopeTitle: "Your Personal Emotion Horoscope",
    newConversation: "Start New Conversation",
    placeholder: "Write your response here...",
    send: "Send",
    iHear: "I hear:",
    emotionsDetected: "Detected emotions:",
    exploreMore: "Would you like to explore more about this?",
    continuePrompt: "Tell me more about that..."
  },
  tr: {
    welcome: "Bugün seni nelerin meşgul ettiğini anlat. Serbestçe yazabilirsin.",
    emojiPrompt: "Hangi emoji şu anki durumunuzu en iyi şekilde tanımlıyor?",
    thanks: "Bunu benimle paylaştığın için teşekkür ederim.",
    horoscopeTitle: "Kişisel Duygu Burcunuz",
    newConversation: "Yeni Konuşma Başlat",
    placeholder: "Cevabınızı buraya yazın...",
    send: "Gönder",
    iHear: "Duyuyorum:",
    emotionsDetected: "Tespit edilen duygular:",
    exploreMore: "Bunun hakkında daha fazla keşfetmek ister misin?",
    continuePrompt: "Bana bundan daha fazla bahset..."
  }
};

// Initialize App
document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
  // Initialize DOM elements
  chatContainer = document.getElementById('chatContainer');
  userInput = document.getElementById('userInput');
  emojiSelection = document.getElementById('emojiSelection');
  progressBar = document.getElementById('progressBar');
  horoscopeResult = document.getElementById('horoscopeResult');
  finalEmoji = document.getElementById('finalEmoji');
  horoscopeText = document.getElementById('horoscopeText');
  verbList = document.getElementById('verbList');
  userInputSection = document.getElementById('userInputSection');

  setupLanguageText();
  setupEventListeners();

  setTimeout(() => {
    addBotMessage(getText('welcome'));
  }, 500);
}

// Language Functions
function getCurrentLanguage() {
  const lang = document.documentElement.lang?.toLowerCase().slice(0, 2) || 'de';
  const supported = ['de', 'en', 'tr'];
  return supported.includes(lang) ? lang : 'de';
}

function getText(key) {
  const lang = getCurrentLanguage();
  return textContent[lang][key] || textContent.de[key] || '';
}

function setupLanguageText() {
  if (userInput) userInput.placeholder = getText('placeholder');
  
  const sendButton = userInputSection?.querySelector('button');
  if (sendButton) sendButton.textContent = getText('send');
  
  const horoscopeTitle = document.querySelector('#horoscopeResult h2');
  if (horoscopeTitle) horoscopeTitle.textContent = getText('horoscopeTitle');
  
  const newConvButton = horoscopeResult?.querySelector('button');
  if (newConvButton) newConvButton.textContent = getText('newConversation');
}

// Event Listeners
function setupEventListeners() {
  if (userInput) {
    userInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') processUserInput();
    });
  }
}

// Chat Functions
function addBotMessage(text) {
  if (!chatContainer) return;
  const msg = document.createElement('div');
  msg.className = 'message bot-message';
  msg.textContent = text;
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addUserMessage(text) {
  if (!chatContainer) return;
  const msg = document.createElement('div');
  msg.className = 'message user-message';
  msg.textContent = text;
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Progress Bar
function updateProgress() {
  if (!progressBar) return;
  const progress = (currentStep / 5) * 100;
  progressBar.style.width = `${progress}%`;
}

// Main Input Processing
function processUserInput() {
  if (!userInput) return;
  const text = userInput.value.trim();
  if (!text) return;

  addUserMessage(text);
  userInput.value = '';
  conversationHistory.push(text);

  // Emotionen erkennen
  detectedEmotions = detectEmotions(text);

  // Emoji-Auswahl noch nicht gemacht?
  if (!emojiQuestionAsked) {
    currentStep++;
    updateProgress();
    
    setTimeout(() => {
      addBotMessage(getText('thanks') + " " + getText('emojiPrompt'));
      emojiSelection?.classList.remove('hidden');
    }, 500);
  } else {
    // Emoji wurde bereits ausgewählt - normalen Fluss fortsetzen
    currentStep++;
    updateProgress();
    
    handleConversationFlow(text);
  }
}

// Conversation Flow
function handleConversationFlow(text) {
  console.log('Conversation Flow - Step:', currentStep);
  
  // Nach 5 Schritten immer Horoskop anzeigen
  if (currentStep >= 5) {
    setTimeout(() => {
      generateHoroscope();
    }, 800);
    return;
  }
  
  // Schritt 2: Erste Frage nach Emoji
  if (currentStep === 2) {
    setTimeout(() => {
      const question = getContextualQuestion(selectedEmoji);
      addBotMessage(question);
    }, 800);
    return;
  }
  
  // Schritt 3: Emotionserkennung und Feedback
  if (currentStep === 3) {
    setTimeout(() => {
      processEmotionDetection(text);
      // SOFORT nächste Frage stellen (nicht auf bestimmte Antwort warten)
      setTimeout(() => {
        const followUp = getFollowUpQuestion(selectedEmoji, detectedEmotions);
        addBotMessage(followUp);
      }, 1000);
    }, 500);
    return;
  }
  
  // Schritt 4: Vertiefende Frage
  if (currentStep === 4) {
    setTimeout(() => {
      const deepQuestion = getDeepQuestion(selectedEmoji, text);
      addBotMessage(deepQuestion);
    }, 800);
    return;
  }
}

// Emoji Selection
function selectEmoji(emoji) {
  console.log('selectEmoji called with:', emoji);
  
  selectedEmoji = emoji;
  emojiSelection?.classList.add('hidden');
  addUserMessage(emoji);
  
  emojiQuestionAsked = true;
  currentStep = 2;
  updateProgress();
  
  // Starte Gesprächsfluss SOFORT nach Emoji-Auswahl
  setTimeout(() => {
    const question = getContextualQuestion(selectedEmoji);
    addBotMessage(question);
  }, 500);
}

// Contextual Questions
function getContextualQuestion(emoji) {
  const lang = getCurrentLanguage();
  
  const contextualQuestions = {
    de: {
      "😴": [
        "Was würde dir helfen, zur Ruhe zu kommen?",
        "Was hat deine Energie aufgebraucht?",
        "Wie fühlst du dich mit der Müdigkeit?",
        "Was braucht dein Körper jetzt am meisten?"
      ],
      "😊": [
        "Was genau macht dich glücklich?",
        "Wie kannst du diese Stimmung bewahren?",
        "Was hat dich heute zum Lächeln gebracht?",
        "Wie fühlst du dich in diesem Moment?"
      ],
      "😢": [
        "Was beschäftigt dein Herz?",
        "Wie fühlst du dich mit dieser Traurigkeit?",
        "Was würde dir jetzt guttun?",
        "Möchtest du darüber sprechen?"
      ],
      "😠": [
        "Was hat diese Reaktion ausgelöst?",
        "Wie fühlst du dich mit der Wut?",
        "Was brauchst du jetzt?",
        "Was möchte verändert werden?"
      ],
      "default": [
        "Wie fühlst du dich damit?",
        "Was beschäftigt dich dabei?",
        "Kannst du das näher beschreiben?",
        "Was brauchst du in dieser Situation?"
      ]
    },
    en: {
      "😴": [
        "What would help you find rest?",
        "What has drained your energy?",
        "How do you feel about the tiredness?",
        "What does your body need most right now?"
      ],
      "default": [
        "How do you feel about that?",
        "What's on your mind about this?",
        "Can you describe that more?",
        "What do you need in this situation?"
      ]
    }
  };
  
  const langSet = contextualQuestions[lang] || contextualQuestions.de;
  const questionSet = langSet[emoji] || langSet.default;
  return questionSet[Math.floor(Math.random() * questionSet.length)];
}

function getFollowUpQuestion(emoji, emotions) {
  const lang = getCurrentLanguage();
  
  const followUps = {
    de: {
      "😴": [
        "Wie wirkt sich die Müdigkeit auf deinen Tag aus?",
        "Was würde dir jetzt wirklich helfen?",
        "Kannst du für Erholung sorgen?",
        "Was brauchst du, um neue Energie zu tanken?"
      ],
      "default": [
        "Kannst du das näher beschreiben?",
        "Wie geht es dir damit?",
        "Was denkst du darüber?",
        "Möchtest du mehr dazu sagen?"
      ]
    },
    en: {
      "default": [
        "Can you tell me more about that?",
        "How does that make you feel?",
        "What are your thoughts about this?",
        "Would you like to share more?"
      ]
    }
  };
  
  const langSet = followUps[lang] || followUps.de;
  const questionSet = langSet[emoji] || langSet.default;
  return questionSet[Math.floor(Math.random() * questionSet.length)];
}

function getDeepQuestion(emoji, previousAnswer) {
  const lang = getCurrentLanguage();
  
  const deepQuestions = {
    de: {
      "😴": [
        "Was könnte dir helfen, langfristig mehr Energie zu haben?",
        "Wie könntest du für bessere Erholung sorgen?",
        "Was würdest du dir für deine Erholung wünschen?",
        "Welche kleinen Schritte könntest du heute gehen?"
      ],
      "default": [
        "Was hast du aus dieser Situation gelernt?",
        "Wie möchtest du damit umgehen?",
        "Was wäre ein nächster Schritt?",
        "Was wünschst du dir für die Zukunft?"
      ]
    },
    en: {
      "default": [
        "What have you learned from this situation?",
        "How would you like to handle this?",
        "What could be a next step?",
        "What do you wish for the future?"
      ]
    }
  };
  
  const langSet = deepQuestions[lang] || deepQuestions.de;
  const questionSet = langSet[emoji] || langSet.default;
  return questionSet[Math.floor(Math.random() * questionSet.length)];
}

// Emotion Detection & Processing
function processEmotionDetection(text) {
  const emotionData = getEmotionData();
  detectedVerbs = [];
  
  // Echte Verb-Erkennung aus emotions.js nutzen
  for (const [keyword, data] of Object.entries(emotionData.emotionKeywords)) {
    if (text.toLowerCase().includes(keyword)) {
      detectedVerbs.push(keyword);
    }
  }
  
  // Fallback für eine einfache Wortanalyse
  if (detectedVerbs.length === 0) {
    const words = text.toLowerCase().split(/\s+/);
    detectedVerbs = words.filter(word => word.length > 3).slice(0, 3);
  }
  
  // Feedbackfunktion (weiterentwicklung)
  let feedback = '';
  if (detectedVerbs.length > 0) {
    feedback = getText('iHear') + " " + detectedVerbs.join(', ');
  }
  
  if (detectedEmotions.length > 0) {
    const emotionNames = detectedEmotions.map(e => e.type).join(', ');
    feedback += (feedback ? "\n" : "") + getText('emotionsDetected') + " " + emotionNames;
  }
  
  if (feedback) {
    addBotMessage(feedback);
  }
}

//  Horoscope Generation
function generateHoroscope() {
  console.log('Generating horoscope at step:', currentStep);
  
  if (!horoscopeResult || !finalEmoji || !horoscopeText || !verbList) return;

  // Verstecke Eingabe-Elemente
  userInputSection?.classList.add('hidden');
  emojiSelection?.classList.add('hidden');

  // Zeige Horoskop
  horoscopeResult.classList.remove('hidden');
  finalEmoji.textContent = selectedEmoji || '😊';

  // Generiere Horoskop-Text
  const lang = getCurrentLanguage();
  const horoscopeMessages = {
    de: "Deine heutigen Emotionen zeigen eine tiefe Verbindung zu deinem inneren Selbst. Nimm dir Zeit, diese Gefühle zu erkunden und zu verstehen.",
    en: "Your emotions today show a deep connection to your inner self. Take time to explore and understand these feelings.", 
    tr: "Bugünkü duygularınız iç benliğinizle derin bir bağlantı gösteriyor. Bu duyguları keşfetmek ve anlamak için kendinize zaman ayırın."
  };
  
  horoscopeText.textContent = horoscopeMessages[lang] || horoscopeMessages.en;

  // Zeige erkannte Verben/Emotionen
  if (detectedVerbs.length > 0) {
    const verbTitle = {
      de: "Erkannte Ausdrücke:",
      en: "Detected expressions:",
      tr: "Tespit edilen ifadeler:"
    };
    
    verbList.innerHTML = `<h3>${verbTitle[lang] || verbTitle.en}</h3><ul>` +
      detectedVerbs.map(v => `<li>${v}</li>`).join('') + '</ul>';
  }

  // Scroll zum Horoskop
  horoscopeResult.scrollIntoView({ behavior: 'smooth' });
}

// Global Functions
window.processUserInput = processUserInput;
window.selectEmoji = selectEmoji;

// Debug helper
window.getAppState = function() {
  return {
    currentStep,
    selectedEmoji, 
    emojiQuestionAsked,
    detectedVerbs,
    detectedEmotions,
    conversationHistory
  };
};
