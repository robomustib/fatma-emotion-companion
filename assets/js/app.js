/**
 * AI Conversation Manager for Fatma Emotion Companion
 * 
 * Main application logic with AI-powered emotion detection
 * and multilingual conversation management
 */

// State variables
let currentStep = 0;
let selectedEmoji = '';
let detectedVerbs = [];
let conversationHistory = [];
let detectedEmotions = [];

// DOM elements
let chatContainer, userInput, emojiSelection, progressBar;
let horoscopeResult, finalEmoji, horoscopeText, verbList, userInputSection;

// Language-specific text
const textContent = {
  de: {
    welcome: "Erzähl mir, was dich heute beschäftigt. Du kannst einfach drauflos schreiben.",
    emojiPrompt: "Welches Emoji beschreibt deinen aktuellen Zustand am besten?",
    verbPrompt: "Wie würdest du dieses Gefühl beschreiben? Benutze gern 'Tunwörter' (z.B. 'weinen', 'lachen', 'zittern').",
    thanks: "Danke, dass du das mit mir teilst.",
    horoscopeTitle: "Dein persönliches Emotions-Horoskop",
    newConversation: "Neues Gespräch beginnen",
    placeholder: "Schreibe deine Antwort hier...",
    send: "Senden",
    iHear: "Ich höre:",
    emotionsDetected: "Erkannte Emotionen:"
  },
  en: {
    welcome: "Tell me what's on your mind today. You can just write freely.",
    emojiPrompt: "Which emoji best describes your current state?",
    verbPrompt: "How would you describe this feeling? Feel free to use 'action words' (e.g., 'cry', 'laugh', 'tremble').",
    thanks: "Thank you for sharing that with me.",
    horoscopeTitle: "Your Personal Emotion Horoscope",
    newConversation: "Start New Conversation",
    placeholder: "Write your response here...",
    send: "Send",
    iHear: "I hear:",
    emotionsDetected: "Detected emotions:"
  },
  tr: {
    welcome: "Bugün seni nelerin meşgul ettiğini anlat. Serbestçe yazabilirsin.",
    emojiPrompt: "Hangi emoji şu anki durumunuzu en iyi şekilde tanımlıyor?",
    verbPrompt: "Bu hissi nasıl tanımlarsın? 'Eylem kelimeleri' kullanmaktan çekinme (örn. 'ağlamak', 'gülmek', 'titremek').",
    thanks: "Bunu benimle paylaştığın için teşekkür ederim.",
    horoscopeTitle: "Kişisel Duygu Burcunuz",
    newConversation: "Yeni Konuşma Başlat",
    placeholder: "Cevabınızı buraya yazın...",
    send: "Gönder",
    iHear: "Duyuyorum:",
    emotionsDetected: "Tespit edilen duygular:"
  }
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

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
  
  // Set up UI text based on language
  setupLanguageText();
  
  // Add welcome message
  setTimeout(() => {
    addBotMessage(getText('welcome'));
  }, 1000);
  
  // Set up event listeners
  setupEventListeners();
}

function setupLanguageText() {
  // Set placeholder and button text
  if (userInput) userInput.placeholder = getText('placeholder');
  
  const sendButton = userInputSection?.querySelector('button');
  if (sendButton) sendButton.textContent = getText('send');
  
  // Set horoscope title and button
  const horoscopeTitle = document.querySelector('#horoscopeResult h2');
  if (horoscopeTitle) horoscopeTitle.textContent = getText('horoscopeTitle');
  
  const newConvButton = horoscopeResult?.querySelector('button');
  if (newConvButton) newConvButton.textContent = getText('newConversation');
}

function setupEventListeners() {
  // Enter key support
  if (userInput) {
    userInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        processUserInput();
      }
    });
  }
}

// Get text for current language
function getCurrentLanguage() {
  const lang = document.documentElement.lang?.toLowerCase().slice(0, 2) || 'de';
  const supported = ['de', 'en', 'tr'];
  return supported.includes(lang) ? lang : 'de';
}

// Chat functions
function addBotMessage(text) {
  if (!chatContainer) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message bot-message';
  messageDiv.textContent = text;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addUserMessage(text) {
  if (!chatContainer) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message user-message';
  messageDiv.textContent = text;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Main input processing function
function processUserInput() {
  if (!userInput) return;
  
  const text = userInput.value.trim();
  if (!text) return;
  
  addUserMessage(text);
  userInput.value = '';
  conversationHistory.push(text);
  
  currentStep++;
  updateProgress();
  
  // AI Emotion Detection
  detectedEmotions = detectEmotions(text);
  
  switch(currentStep) {
    case 1:
      setTimeout(() => {
        addBotMessage(getText('thanks') + " " + getText('emojiPrompt'));
        if (emojiSelection) emojiSelection.classList.remove('hidden');
      }, 800);
      break;
      
    case 2:
      setTimeout(() => {
        addBotMessage(getText('verbPrompt'));
      }, 800);
      break;
      
    case 3:
      processEmotionDetection(text);
      break;
      
    default:
      if (currentStep >= 5) {
        generateHoroscope();
      } else {
        setTimeout(() => {
          const smartQuestion = getPreciseFollowUpQuestion(text);
          addBotMessage(smartQuestion);
        }, 800);
      }
  }
}

function processEmotionDetection(text) {
  const emotionData = getEmotionData();
  detectedVerbs = [];
  
  // Search for specific emotion keywords
  for (const [keyword, data] of Object.entries(emotionData.emotionKeywords)) {
    if (text.toLowerCase().includes(keyword)) {
      detectedVerbs.push(keyword);
    }
  }
  
  if (detectedVerbs.length > 0 || detectedEmotions.length > 0) {
    setTimeout(() => {
      // Show detected actions and emotions
      let feedbackMessage = '';
      
      if (detectedVerbs.length > 0) {
        const verbDisplay = detectedVerbs.map(verb => {
          const emotion = emotionData.emotionKeywords[verb]?.emotion || verb;
          return `${verb} (${emotion})`;
        }).join(', ');
        feedbackMessage += getText('iHear') + " " + verbDisplay;
      }
      
      if (detectedEmotions.length > 0) {
        const emotionDisplay = detectedEmotions.map(e => e.type).join(', ');
        if (feedbackMessage) feedbackMessage += "\n";
        feedbackMessage += getText('emotionsDetected') + " " + emotionDisplay;
      }
      
      if (feedbackMessage) {
        addBotMessage(feedbackMessage);
      }
      
      // Ask a precise question based on detection
      const preciseQuestion = getPreciseFollowUpQuestion(text);
      setTimeout(() => {
        addBotMessage(preciseQuestion);
      }, 1000);
      
    }, 800);
  } else {
    // Fallback: General emotion detection
    setTimeout(() => {
      const smartQuestion = getPreciseFollowUpQuestion(text);
      addBotMessage(smartQuestion);
    }, 800);
  }
}

function selectEmoji(emoji) {
  selectedEmoji = emoji;
  if (emojiSelection) emojiSelection.classList.add('hidden');
  addUserMessage(emoji);
  currentStep++;
  updateProgress();
  
  setTimeout(() => {
    addBotMessage(getText('verbPrompt'));
  }, 800);
}

function getPreciseFollowUpQuestion(userText) {
  const lowerText = userText.toLowerCase();
  const emotionData = getEmotionData();
  
  // 1. Direct verb-emotion mapping
  for (const [keyword, data] of Object.entries(emotionData.emotionKeywords)) {
    if (lowerText.includes(keyword)) {
      const questions = data.questions;
      return questions[Math.floor(Math.random() * questions.length)];
    }
  }
  
  // 2. Use AI-detected emotions
  if (detectedEmotions.length > 0) {
    const primaryEmotion = detectedEmotions[0];
    const emotionQuestions = {
      fear: [
        "Was macht dir am meisten Angst?",
        "Was würde dir ein Gefühl von Sicherheit geben?",
        "Kannst du die Quelle deiner Angst benennen?",
        "Wer könnte dich in dieser unsicheren Zeit unterstützen?"
      ],
      sadness: [
        "Was hat diese Traurigkeit in dir ausgelöst?",
        "Was würde dein trauriges Ich brauchen?",
        "Wer könnte dich jetzt trösten?",
        "Was würde dir helfen, Trost zu finden?"
      ],
      anger: [
        "Was hat deinen Zorn provoziert?",
        "Welches Bedürfnis wird nicht erfüllt?",
        "Wie könntest du diese Energie konstruktiv nutzen?",
        "Was möchte deine Wut verändern?"
      ],
      joy: [
        "Was genau macht dich glücklich?",
        "Wie könntest du diesen Moment noch bewusster genießen?",
        "Mit wem möchtest du diese Freude teilen?",
        "Was hat dieses gute Gefühl ausgelöst?"
      ],
      exhaustion: [
        "Was hat deine Energie aufgebraucht?",
        "Was würde deinem Körper jetzt guttun?",
        "Wie könntest du für mehr Erholung sorgen?",
        "Was sagt dir deine Erschöpfung?"
      ]
    };
    
    // Translate based on language
    const lang = getCurrentLanguage();
    const translatedQuestions = getTranslatedQuestions(emotionQuestions, lang);
    return translatedQuestions[primaryEmotion.type]?.[Math.floor(Math.random() * translatedQuestions[primaryEmotion.type].length)];
  }
  
  // 3. Emoji-based fallback questions
  const emojiQuestions = {
    "😊": "Was genau macht dich gerade so glücklich?",
    "😢": "Was würde deine Traurigkeit gerne sagen?",
    "😠": "Was hat deinen Zorn ausgelöst?",
    "😨": "Was macht dir am meisten Angst?",
    "😴": "Was würde deinem Körper jetzt Erholung bringen?"
  };
  
  // 4. General fallback questions
  const generalQuestions = [
    "Was beschäftigt dich daran am meisten?",
    "Wo in deinem Körper spürst du das?",
    "Was würde dir in diesem Moment helfen?",
    "Was brauchst du gerade?",
    "Kannst du beschreiben, wie sich das anfühlt?"
  ];
  
  return emojiQuestions[selectedEmoji] || generalQuestions[Math.floor(Math.random() * generalQuestions.length)];
}

function getTranslatedQuestions(questions, targetLang) {
  const translations = {
    de: questions, // Deutsch ist Original
    en: {
      fear: [
        "What scares you the most?",
        "What would give you a sense of security?",
        "Can you name the source of your fear?",
        "Who could support you in this uncertain time?"
      ],
      sadness: [
        "What triggered this sadness in you?",
        "What does your sad self need?",
        "Who could comfort you now?",
        "What would help you find comfort?"
      ],
      anger: [
        "What provoked your anger?",
        "Which need is not being met?",
        "How could you use this energy constructively?",
        "What does your anger want to change?"
      ],
      joy: [
        "What exactly makes you happy?",
        "How could you enjoy this moment more consciously?",
        "Who would you like to share this joy with?",
        "What triggered this good feeling?"
      ],
      exhaustion: [
        "What used up your energy?",
        "What would do your body good right now?",
        "How could you create more recovery time?",
        "What is your exhaustion telling you?"
      ]
    },
    tr: {
      fear: [
        "Seni en çok ne korkutuyor?",
        "Sana güvenlik hissini ne verebilir?",
        "Korkunun kaynağını söyleyebilir misin?",
        "Bu belirsiz zamanda seni kim destekleyebilir?"
      ],
      sadness: [
        "İçindeki bu üzüntüyü ne tetikledi?",
        "Üzgün benliğinin neye ihtiyacı var?",
        "Seni şimdi kim rahatlatabilir?",
        "Rahatlık bulmana ne yardımcı olur?"
      ],
      anger: [
        "Öfkeni ne provoke etti?",
        "Hangi ihtiyaç karşılanmıyor?",
        "Bu enerjiyi yapıcı şekilde nasıl kullanabilirsin?",
        "Öfken neyi değiştirmek istiyor?"
      ],
      joy: [
        "Seni tam olarak ne mutlu ediyor?",
        "Bu anı daha bilinçli nasıl keyfedebilirsin?",
        "Bu sevinci kiminle paylaşmak istersin?",
        "Bu iyi hissi ne tetikledi?"
      ],
      exhaustion: [
        "Enerjini ne tüketti?",
        "Vücuduna şu anda ne iyi gelir?",
        "Daha fazla iyileşme zamanı nasıl yaratabilirsin?",
        "Tükenmişliğin sana ne söylüyor?"
      ]
    }
  };

  // Fallback: Deutsch, falls Sprache unbekannt
  return translations[targetLang] || translations.de;
}


function updateProgress() {
  if (!progressBar) return;
  
  const progress = (currentStep / 5) * 100;
  progressBar.style.width = `${progress}%`;
}

function generateHoroscope() {
  if (!userInputSection || !horoscopeResult) return;
  
  userInputSection.classList.add('hidden');
  horoscopeResult.classList.remove('hidden');
  
  if (finalEmoji) finalEmoji.textContent = selectedEmoji;
  
  const horoscopes = {
    "😊": {
      de: "Deine positive Energie strahlt heute besonders hell! Nutze diesen Schwung für Dinge, die dir Freude bereiten.",
      en: "Your positive energy shines particularly bright today! Use this momentum for things that bring you joy.",
      tr: "Bugün pozitif enerjin özellikle parlak parlıyor! Seni neşelendiren şeyler için bu ivmeyi kullan."
    },
    "😢": {
      de: "Heute ist ein Tag zum Spüren und zur Selbstfürsorge. Gönn dir die Ruhe, die du brauchst.",
      en: "Today is a day for feeling and self-care. Give yourself the rest you need.",
      tr: "Bugün hissetme ve öz bakım günü. İhtiyacın olan huzuru kendine ver."
    },
    "😠": {
      de: "Deine Energie sucht nach einem Weg - vielleicht findest du heute eine konstruktive Möglichkeit, sie einzusetzen.",
      en: "Your energy is looking for a way - perhaps you'll find a constructive way to use it today.",
      tr: "Enerjin bir yol arıyor - belki bugün onu kullanmak için yapıcı bir yol bulursun."
    },
    "😨": {
      de: "Vertraue darauf, dass du die Ressourcen hast, mit dem umzugehen, was kommt. Kleine Schritte führen auch ans Ziel.",
      en: "Trust that you have the resources to deal with what comes. Small steps also lead to the goal.",
      tr: "Gelenlerle başa çıkmak için kaynaklara sahip olduğuna güven. Küçük adımlar da hedefe ulaştırır."
    },
    "😴": {
      de: "Dein Körper signalisiert dir, dass Ruhe wichtig ist. Höre auf diese Weisheit und gönn dir Pausen.",
      en: "Your body is telling you that rest is important. Listen to this wisdom and give yourself breaks.",
      tr: "Vücudun sana dinlenmenin önemli olduğunu söylüyor. Bu bilgeliği dinle ve kendine molalar ver."
    },
    "🤔": {
      de: "Deine reflektierte Art hilft dir heute, klare Einsichten zu gewinnen. Vertraue deiner inneren Stimme.",
      en: "Your reflective nature helps you gain clear insights today. Trust your inner voice.",
      tr: "Düşünceli doğan bugün net içgörüler kazanmana yardımcı oluyor. İç sesine güven."
    }
  };
  
  const lang = getCurrentLanguage();
  const defaultMessage = {
    de: "Deine Gefühle sind ein Kompass - sie zeigen dir, was wirklich wichtig ist.",
    en: "Your feelings are a compass - they show you what's really important.",
    tr: "Duyguların bir pusula - sana gerçekten önemli olanı gösteriyorlar."
  };
  
  if (horoscopeText) {
    horoscopeText.textContent = horoscopes[selectedEmoji]?.[lang] || defaultMessage[lang];
  }
  
  // Show detected verbs
  if (verbList && detectedVerbs.length > 0) {
    detectedVerbs.forEach(verb => {
      const verbElement = document.createElement('div');
      verbElement.className = 'verb-item';
      const emotionData = getEmotionData();
      const emotion = emotionData.emotionKeywords[verb]?.emotion || verb;
      verbElement.textContent = `${verb} (${emotion})`;
      verbList.appendChild(verbElement);
    });
  }
}

// General multilingual question handler
function getGeneralQuestion(emoji = null, lang = getCurrentLanguage()) {
  const generalQuestions = {
    en: {
      "😊": "What exactly makes you feel so good right now?",
      "😢": "What would your heart like to express?",
      "😠": "What's really bothering you underneath the surface?",
      "😨": "What feels unsafe or uncertain to you?",
      "😴": "What does your body need most right now?",
      "🤔": "What's on your mind that needs sorting out?",
      default: "What would you like to explore further?"
    },
    de: {
      "😊": "Was genau lässt dich dich gerade so gut fühlen?",
      "😢": "Was möchte dein Herz ausdrücken?",
      "😠": "Was beschäftigt dich wirklich unter der Oberfläche?",
      "😨": "Was fühlt sich für dich unsicher oder unklar an?",
      "😴": "Was braucht dein Körper im Moment am meisten?",
      "🤔": "Was geht dir im Kopf herum, das du sortieren möchtest?",
      default: "Was möchtest du weiter erforschen?"
    },
    tr: {
      "😊": "Şu anda seni bu kadar iyi hissettiren şey tam olarak ne?",
      "😢": "Kalbin ne ifade etmek istiyor?",
      "😠": "Görünüşün altında seni asıl rahatsız eden şey ne?",
      "😨": "Sana güvensiz veya belirsiz gelen şey ne?",
      "😴": "Vücudunun şu anda en çok neye ihtiyacı var?",
      "🤔": "Aklını karıştıran, çözülmesi gereken şey ne?",
      default: "Daha fazla keşfetmek istediğin şey ne?"
    }
  };

  const langSet = generalQuestions[lang] || generalQuestions.de;
  return langSet[emoji] || langSet.default;
}

// Make functions globally available for HTML onclick handlers
window.processUserInput = processUserInput;
window.selectEmoji = selectEmoji;
