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

// Initialize app
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

  setTimeout(() => {
    addBotMessage(getText('welcome'));
  }, 1000);
  
  setupEventListeners();
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

function setupEventListeners() {
  if (userInput) {
    userInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') processUserInput();
    });
  }
}

function getCurrentLanguage() {
  const lang = document.documentElement.lang?.toLowerCase().slice(0, 2) || 'de';
  const supported = ['de', 'en', 'tr'];
  return supported.includes(lang) ? lang : 'de';
}

// Text retrieval helper
function getText(key) {
  const lang = getCurrentLanguage();
  return textContent[lang][key] || textContent.de[key] || '';
}

// Chat functions
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

// Main input handling
function processUserInput() {
  if (!userInput) return;
  
  const text = userInput.value.trim();
  if (!text) return;
  
  addUserMessage(text);
  userInput.value = '';
  conversationHistory.push(text);
  
  currentStep++;
  updateProgress();
  
  detectedEmotions = detectEmotions(text);
  
  switch (currentStep) {
    case 1:
      setTimeout(() => {
        addBotMessage(getText('thanks') + " " + getText('emojiPrompt'));
        emojiSelection?.classList.remove('hidden');
      }, 800);
      break;

    case 2:
      setTimeout(() => addBotMessage(getText('verbPrompt')), 800);
      break;

    case 3:
      processEmotionDetection(text);
      break;

    default:
      if (currentStep >= 5) {
        generateHoroscope();
      } else {
        setTimeout(() => {
          // ✅ doppelte Variable entfernt & logische Kombination repariert
          const smartQuestion = 
            getEmotionBasedQuestion(detectedEmotions, getCurrentLanguage()) 
            || getPreciseFollowUpQuestion(text);
          addBotMessage(smartQuestion);
        }, 800);
      }
  }
}

function processEmotionDetection(text) {
  const emotionData = getEmotionData();
  detectedVerbs = [];

  for (const [keyword, data] of Object.entries(emotionData.emotionKeywords)) {
    if (text.toLowerCase().includes(keyword)) detectedVerbs.push(keyword);
  }

  if (detectedVerbs.length > 0 || detectedEmotions.length > 0) {
    setTimeout(() => {
      let feedback = '';

      if (detectedVerbs.length > 0) {
        const verbDisplay = detectedVerbs.map(v => {
          const emo = emotionData.emotionKeywords[v]?.emotion || v;
          return `${v} (${emo})`;
        }).join(', ');
        feedback += `${getText('iHear')} ${verbDisplay}`;
      }

      if (detectedEmotions.length > 0) {
        const emoDisplay = detectedEmotions.map(e => e.type).join(', ');
        feedback += (feedback ? "\n" : "") + `${getText('emotionsDetected')} ${emoDisplay}`;
      }

      if (feedback) addBotMessage(feedback);

      const preciseQuestion = getPreciseFollowUpQuestion(text);
      setTimeout(() => addBotMessage(preciseQuestion), 1000);
    }, 800);
  } else {
    setTimeout(() => {
      const smartQuestion = getPreciseFollowUpQuestion(text);
      addBotMessage(smartQuestion);
    }, 800);
  }
}

function selectEmoji(emoji) {
  selectedEmoji = emoji;
  emojiSelection?.classList.add('hidden');
  addUserMessage(emoji);
  currentStep++;
  updateProgress();

  setTimeout(() => addBotMessage(getText('verbPrompt')), 800);
}

// General multilingual fallback
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
      "😊": "Was genau lässt dich gerade so gut fühlen?",
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

window.processUserInput = processUserInput;
window.selectEmoji = selectEmoji;
