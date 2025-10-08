// Emotion detection data for all languages
const emotionData = {
  de: {
    emotionKeywords: {
      "zittern": {
        emotion: "Angst",
        questions: [
          "Was löst dieses Zittern in dir aus?",
          "Wo in deinem Körper spürst du das Zittern am meisten?",
          "Was würde dir helfen, dich stabiler zu fühlen?",
          "Kannst du beschreiben, wovor du dich fürchtest?"
        ]
      },
      "weinen": {
        emotion: "Traurigkeit", 
        questions: [
          "Was möchte durch deine Tränen fließen?",
          "Was hat diese Traurigkeit in dir ausgelöst?",
          "Wer oder was könnte dich jetzt trösten?",
          "Was braucht dein trauriges Ich gerade?"
        ]
      },
      "lachen": {
        emotion: "Freude",
        questions: [
          "Was hat dein Lachen ausgelöst?",
          "Wie fühlt sich diese Freude in dir an?",
          "Mit wem möchtest du diese gute Stimmung teilen?",
          "Was macht diesen Moment so besonders?"
        ]
      },
      "schreien": {
        emotion: "Wut",
        questions: [
          "Was möchte laut werden in dir?",
          "Was hat diese Wut in dir provoziert?",
          "Wie könntest du diese Energie konstruktiv nutzen?",
          "Welches Bedürfnis steht hinter deiner Wut?"
        ]
      },
      "zucken": {
        emotion: "Nervosität",
        questions: [
          "Was macht dich so nervös?",
          "Wo spürst du die Anspannung in deinem Körper?",
          "Was würde dir helfen, dich zu entspannen?",
          "Kannst du die Ursache für die Unruhe benennen?"
        ]
      },
      "stöhnen": {
        emotion: "Erschöpfung",
        questions: [
          "Was hat dich so erschöpft?",
          "Wo in deinem Körper spürst du die Müdigkeit?",
          "Was würde dir jetzt Erleichterung bringen?",
          "Wie könntest du für mehr Erholung sorgen?"
        ]
      },
      "seufzen": {
        emotion: "Resignation",
        questions: [
          "Was lastet so schwer auf dir?",
          "Was würdest du gerne loslassen?",
          "Was brauchst du, um neuen Mut zu fassen?",
          "Welche kleine Sache könnte die Situation verbessern?"
        ]
      },
      "beben": {
        emotion: "Angst",
        questions: [
          "Vor was bebst du?",
          "Was würde dir ein Gefühl von Sicherheit geben?",
          "Kannst du beschreiben, was diese intensive Angst auslöst?",
          "Wer könnte dich in dieser Angst unterstützen?"
        ]
      },
      "strahlen": {
        emotion: "Glück",
        questions: [
          "Was lässt dich strahlen?",
          "Wie kannst du diesen Glücksmoment verlängern?",
          "Mit wem möchtest du diese Freude teilen?",
          "Was macht dieses Gefühl so besonders?"
        ]
      },
      "zittern vor wut": {
        emotion: "Wut",
        questions: [
          "Was hat diese intensive Wut ausgelöst?",
          "Welches Bedürfnis wird hier verletzt?",
          "Wie könntest du dieser Wut Raum geben, ohne dich zu verlieren?",
          "Was brauchst du, um dich wieder sicher zu fühlen?"
        ]
      },
      "schluchzen": {
        emotion: "Tiefe Traurigkeit",
        questions: [
          "Was bricht gerade in dir zusammen?",
          "Wer oder was fehlt dir in diesem Moment?",
          "Was würde deinem schmerzenden Herzen helfen?",
          "Kannst du dir erlauben, diesen Schmerz ganz zu fühlen?"
        ]
      },
      "grübeln": {
        emotion: "Sorgen",
        questions: [
          "Worüber grübelst du genau?",
          "Was wäre das Schlimmste, das passieren könnte?",
          "Kannst du eine kleine Sache finden, die du kontrollieren kannst?",
          "Was würde dir helfen, aus dem Gedankenkarussell auszusteigen?"
        ]
      },
      "herumzappeln": {
        emotion: "Unruhe",
        questions: [
          "Was löst diese Unruhe in dir aus?",
          "Wo im Körper spürst du die Unruhe am meisten?",
          "Was würde dir helfen, zur Ruhe zu kommen?",
          "Brauchst du Bewegung oder eher Stille?"
        ]
      },
      "gähnen": {
        emotion: "Müdigkeit",
        questions: [
          "Was hat deine Energie aufgebraucht?",
          "Hast du in letzter Zeit genug geschlafen?",
          "Was würde dir jetzt wirklich Erholung bringen?",
          "Kannst du eine kleine Pause einlegen?"
        ]
      },
      "starr sein": {
        emotion: "Schock",
        questions: [
          "Was hat dich so sprachlos gemacht?",
          "Brauchst du einen Moment, um das zu verarbeiten?",
          "Was würde dir helfen, wieder ins Hier und Jetzt zu kommen?",
          "Möchtest du darüber sprechen oder erst einmal für dich sein?"
        ]
      }
    },
    emotionClusters: {
      angst: ["ängstlich", "panik", "sorge", "befürcht", "unsicher", "schüchtern", "bangen", "furcht", "herzrasen", "schweiß", "zittern", "beben", "verkrampft"],
      traurigkeit: ["traurig", "weinen", "einsam", "verloren", "leer", "hoffnungslos", "verlassen", "schmerz", "kummer", "tränen", "schluchzen", "herzschmerz"],
      wut: ["wütend", "frustriert", "genervt", "ärger", "zorn", "sauer", "aggressiv", "gereizt", "aufgebracht", "empört", "schreien", "wut", "zornig"],
      freude: ["fröhlich", "glücklich", "freude", "strahlend", "begeistert", "enthusiastisch", "zufrieden", "stolz", "lächeln", "lachen", "jubeln", "glückselig"],
      erschöpfung: ["müde", "erschöpft", "schlaf", "energielos", "antriebslos", "ausgebrannt", "kaputt", "ermattet", "schlapp", "kraftlos", "gähnen"],
      liebe: ["verliebt", "zärtlich", "verbunden", "zugewandt", "hingabe", "vertrauen", "wärme", "herzlich", "umarmung", "kuscheln", "nah"],
      überraschung: ["überrascht", "erstaunt", "verblüfft", "sprachlos", "fassungslos", "erstaunen", "verwundert", "stutzig"],
      ekel: ["ekel", "widerlich", "abgestoßen", "anstößig", "unappetitlich", "abscheu", "schaudern"]
    }
  },
  en: {
    emotionKeywords: {
      "tremble": {
        emotion: "Fear",
        questions: [
          "What triggers this trembling in you?",
          "Where in your body do you feel the trembling most?",
          "What would help you feel more stable?",
          "Can you describe what you're afraid of?"
        ]
      },
      "cry": {
        emotion: "Sadness", 
        questions: [
          "What wants to flow through your tears?",
          "What triggered this sadness in you?",
          "Who or what could comfort you right now?",
          "What does your sad self need right now?"
        ]
      },
      "laugh": {
        emotion: "Joy",
        questions: [
          "What triggered your laughter?",
          "How does this joy feel in your body?",
          "Who would you like to share this good mood with?",
          "What makes this moment so special?"
        ]
      },
      "scream": {
        emotion: "Anger",
        questions: [
          "What wants to become loud within you?",
          "What provoked this anger in you?",
          "How could you use this energy constructively?",
          "What need is behind your anger?"
        ]
      },
      "twitch": {
        emotion: "Nervousness",
        questions: [
          "What makes you so nervous?",
          "Where do you feel the tension in your body?",
          "What would help you relax?",
          "Can you name the cause of the restlessness?"
        ]
      },
      "groan": {
        emotion: "Exhaustion",
        questions: [
          "What has exhausted you so much?",
          "Where in your body do you feel the tiredness?",
          "What would bring you relief right now?",
          "How could you create more recovery time?"
        ]
      },
      "sigh": {
        emotion: "Resignation",
        questions: [
          "What weighs so heavily on you?",
          "What would you like to let go of?",
          "What do you need to find new courage?",
          "What small thing could improve the situation?"
        ]
      },
      "shake": {
        emotion: "Fear",
        questions: [
          "What are you shaking from?",
          "What would give you a sense of security?",
          "Can you describe what triggers this intense fear?",
          "Who could support you in this fear?"
        ]
      },
      "radiate": {
        emotion: "Happiness",
        questions: [
          "What makes you radiate?",
          "How can you extend this happy moment?",
          "Who would you like to share this joy with?",
          "What makes this feeling so special?"
        ]
      },
      "shake with anger": {
        emotion: "Rage",
        questions: [
          "What triggered this intense rage?",
          "Which need is being violated here?",
          "How could you give this rage space without losing yourself?",
          "What do you need to feel safe again?"
        ]
      },
      "sob": {
        emotion: "Deep Sadness",
        questions: [
          "What is collapsing inside you right now?",
          "Who or what are you missing in this moment?",
          "What would help your aching heart?",
          "Can you allow yourself to fully feel this pain?"
        ]
      },
      "ponder": {
        emotion: "Worry",
        questions: [
          "What exactly are you pondering about?",
          "What would be the worst that could happen?",
          "Can you find one small thing you can control?",
          "What would help you get out of the thought carousel?"
        ]
      },
      "fidget": {
        emotion: "Restlessness",
        questions: [
          "What triggers this restlessness in you?",
          "Where in your body do you feel the restlessness most?",
          "What would help you calm down?",
          "Do you need movement or rather stillness?"
        ]
      },
      "yawn": {
        emotion: "Tiredness",
        questions: [
          "What has used up your energy?",
          "Have you been sleeping enough lately?",
          "What would truly bring you rest right now?",
          "Can you take a short break?"
        ]
      },
      "freeze": {
        emotion: "Shock",
        questions: [
          "What made you so speechless?",
          "Do you need a moment to process this?",
          "What would help you come back to the here and now?",
          "Do you want to talk about it or be alone for a while?"
        ]
      }
    },
    emotionClusters: {
      fear: ["afraid", "panic", "worry", "fear", "insecure", "shy", "dread", "terror", "heart racing", "sweat", "tremble", "shake", "tense"],
      sadness: ["sad", "cry", "lonely", "lost", "empty", "hopeless", "abandoned", "pain", "grief", "tears", "sob", "heartache"],
      anger: ["angry", "frustrated", "annoyed", "anger", "rage", "mad", "aggressive", "irritated", "upset", "outraged", "scream", "fury", "furious"],
      joy: ["happy", "glad", "joy", "radiant", "enthusiastic", "excited", "content", "proud", "smile", "laugh", "cheer", "blissful"],
      exhaustion: ["tired", "exhausted", "sleep", "energyless", "lethargic", "burned out", "worn out", "fatigued", "weary", "powerless", "yawn"],
      love: ["in love", "tender", "connected", "attentive", "devotion", "trust", "warmth", "heartfelt", "hug", "cuddle", "close"],
      surprise: ["surprised", "amazed", "astonished", "speechless", "stunned", "amazement", "puzzled", "suspicious"],
      disgust: ["disgust", "disgusting", "repulsed", "offensive", "unappetizing", "revulsion", "shudder"]
    }
  },
  tr: {
    emotionKeywords: {
      "titreme": {
        emotion: "Korku",
        questions: [
          "Bu titremeyi senin içinde ne tetikliyor?",
          "Vücudunun neresinde titremeyi en çok hissediyorsun?",
          "Kendini daha stabil hissetmene ne yardımcı olur?",
          "Neyden korktuğunu tarif edebilir misin?"
        ]
      },
      "ağlama": {
        emotion: "Üzüntü", 
        questions: [
          "Gözyaşların aracılığıyla ne akmak istiyor?",
          "İçindeki bu üzüntüyü ne tetikledi?",
          "Kim veya ne şu anda seni rahatlatabilir?",
          "Üzgün benliğinin şu anda neye ihtiyacı var?"
        ]
      },
      "gülme": {
        emotion: "Neşe",
        questions: [
          "Gülmeni ne tetikledi?",
          "Bu neşe vücudunda nasıl hissediliyor?",
          "Bu iyi ruh halini kiminle paylaşmak istersin?",
          "Bu anı bu kadar özel yapan nedir?"
        ]
      },
      "bağırma": {
        emotion: "Öfke",
        questions: [
          "İçinde ne yüksek sesle olmak istiyor?",
          "İçindeki bu öfkeyi ne provoke etti?",
          "Bu enerjiyi yapıcı şekilde nasıl kullanabilirsin?",
          "Öfkenin arkasında hangi ihtiyaç var?"
        ]
      },
      "seğirme": {
        emotion: "Gerginlik",
        questions: [
          "Seni bu kadar gergin yapan nedir?",
          "Vücudunda gerginliği nerede hissediyorsun?",
          "Rahlamana ne yardımcı olur?",
          "Huzursuzluğun nedenini söyleyebilir misin?"
        ]
      },
      "inleme": {
        emotion: "Tükenmişlik",
        questions: [
          "Seni bu kadar tüketen nedir?",
          "Vücudunda yorgunluğu nerede hissediyorsun?",
          "Şu anda sana rahatlama getirecek nedir?",
          "Daha fazla iyileşme zamanı nasıl yaratabilirsin?"
        ]
      },
      "iç çekme": {
        emotion: "Çaresizlik",
        questions: [
          "Üzerinde bu kadar ağır basan nedir?",
          "Neyi bırakmak istersin?",
          "Yeni cesaret bulmak için neye ihtiyacın var?",
          "Durumu iyileştirebilecek küçük bir şey nedir?"
        ]
      },
      "sarsılma": {
        emotion: "Korku",
        questions: [
          "Neden sarsılıyorsun?",
          "Sana güvenlik hissini ne verebilir?",
          "Bu yoğun korkuyu ne tetikliyor tarif edebilir misin?",
          "Bu korkuda seni kim destekleyebilir?"
        ]
      },
      "parlama": {
        emotion: "Mutluluk",
        questions: [
          "Seni ne parlattı?",
          "Bu mutlu anı nasıl uzatabilirsin?",
          "Bu sevinci kiminle paylaşmak istersin?",
          "Bu hissi bu kadar özel yapan nedir?"
        ]
      },
      "öfkeden titreme": {
        emotion: "Öfke",
        questions: [
          "Bu yoğun öfkeyi ne tetikledi?",
          "Burada hangi ihtiyaç ihlal ediliyor?",
          "Kendini kaybetmeden bu öfkeye nasıl alan verebilirsin?",
          "Tekrar güvende hissetmek için neye ihtiyacın var?"
        ]
      },
      "hıçkırık": {
        emotion: "Derin Üzüntü",
        questions: [
          "İçinde şu anda ne çöküyor?",
          "Bu anda kimi veya neyi özlüyorsun?",
          "Ağrıyan kalbine ne yardımcı olur?",
          "Bu acıyı tamamen hissetmeye kendine izin verebilir misin?"
        ]
      },
      "düşünüp durma": {
        emotion: "Endişe",
        questions: [
          "Tam olarak ne hakkında düşünüp duruyorsun?",
          "Olabilecek en kötü şey ne olurdu?",
          "Kontrol edebileceğin küçük bir şey bulabilir misin?",
          "Düşünce kısır döngüsünden çıkmana ne yardımcı olur?"
        ]
      },
      "kıpırdanma": {
        emotion: "Huzursuzluk",
        questions: [
          "İçindeki bu huzursuzluğu ne tetikliyor?",
          "Huzursuzluğu vücudunda en çok nerede hissediyorsun?",
          "Sakinleşmene ne yardımcı olur?",
          "Hareket mi yoksa sakinlik mi ihtiyacın var?"
        ]
      },
      "esneme": {
        emotion: "Yorgunluk",
        questions: [
          "Enerjini ne tüketti?",
          "Son zamanlarda yeterince uyuyor musun?",
          "Şu anda sana gerçekten dinlenme getirecek nedir?",
          "Kısa bir mola verebilir misin?"
        ]
      },
      "donakalma": {
        emotion: "Şok",
        questions: [
          "Seni bu kadar dilsiz bırakan ne?",
          "Bunu işlemek için bir ana ihtiyacın var mı?",
          "Şimdi ve buraya geri gelmene ne yardımcı olur?",
          "Bunun hakkında konuşmak mı yoksa bir süre yalnız kalmak mı istersin?"
        ]
      }
    },
    emotionClusters: {
      korku: ["korkmuş", "panik", "endişe", "korku", "güvensiz", "utangaç", "dehşet", "terör", "kalp çarpıntısı", "ter", "titreme", "sarsılma", "gergin"],
      üzüntü: ["üzgün", "ağlamak", "yalnız", "kayıp", "boş", "umutsuz", "terkedilmiş", "acı", "keder", "gözyaşı", "hıçkırık", "kalp ağrısı"],
      öfke: ["kızgın", "hayal kırıklığı", "sinirli", "öfke", "hiddet", "küskün", "agresif", "rahatsız", "üzgün", "öfkeli", "bağırma", "gazap", "öfkeli"],
      neşe: ["mutlu", "sevinçli", "neşe", "parlayan", "hevesli", "heyecanlı", "memnun", "gururlu", "gülümseme", "gülme", "tezahürat", "mutluluk"],
      tükenmişlik: ["yorgun", "tükenmiş", "uyku", "enerjisiz", "uyuşuk", "tükenmiş", "yıpranmış", "bitkin", "yorgun", "güçsüz", "esneme"],
      aşk: ["aşık", "nazik", "bağlı", "dikkatli", "bağlılık", "güven", "sıcaklık", "samimi", "sarılış", "kucaklaşma", "yakın"],
      şaşkınlık: ["şaşkın", "hayret", "hayran", "dilsiz", "sersem", "hayranlık", "şaşkın", "şüpheli"],
      iğrenme: ["iğrenme", "iğrenç", "tiksinme", "saldırgan", "iştahsız", "nefret", "ürperti"]
    }
  }
};

// Get current language from HTML lang attribute
function getCurrentLanguage() {
  return document.documentElement.lang || 'de';
}

// Get emotion data for current language
function getEmotionData() {
  const lang = getCurrentLanguage();
  return emotionData[lang] || emotionData.de;
}

// Enhanced emotion detection with confidence scoring
function detectEmotions(text) {
  const lowerText = text.toLowerCase();
  const emotions = [];
  const currentEmotionData = getEmotionData();
  
  // Layer 1: Direct keyword matching (high confidence)
  for (const [keyword, data] of Object.entries(currentEmotionData.emotionKeywords)) {
    if (lowerText.includes(keyword)) {
      emotions.push({
        type: data.emotion,
        confidence: 0.9,
        trigger: keyword,
        source: 'direct_keyword'
      });
    }
  }
  
  // Layer 2: Semantic clustering (medium confidence)
  for (const [emotion, keywords] of Object.entries(currentEmotionData.emotionClusters)) {
    const matches = keywords.filter(keyword => lowerText.includes(keyword));
    if (matches.length > 0) {
      emotions.push({
        type: emotion,
        confidence: 0.7 * (matches.length / keywords.length),
        triggers: matches,
        source: 'semantic_cluster'
      });
    }
  }
  
  // Remove duplicates and sort by confidence
  const uniqueEmotions = [];
  emotions.forEach(emotion => {
    const existing = uniqueEmotions.find(e => e.type === emotion.type);
    if (!existing || emotion.confidence > existing.confidence) {
      uniqueEmotions.push(emotion);
    }
  });
  
  return uniqueEmotions.sort((a, b) => b.confidence - a.confidence);
}

// Get appropriate question based on detected emotions
function getEmotionBasedQuestion(detectedEmotions, selectedEmoji) {
  const currentEmotionData = getEmotionData();
  
  if (detectedEmotions.length > 0) {
    const primaryEmotion = detectedEmotions[0];
    
    // Try to find a direct keyword match first
    for (const [keyword, data] of Object.entries(currentEmotionData.emotionKeywords)) {
      if (data.emotion === primaryEmotion.type && primaryEmotion.source === 'direct_keyword') {
        const questions = data.questions;
        return questions[Math.floor(Math.random() * questions.length)];
      }
    }
    
    // Fallback to emotion cluster questions
    const clusterQuestions = {
      fear: [
        "What scares you the most right now?",
        "Where in your body do you feel the fear?",
        "What would help you feel safer?",
        "Can you identify what triggered this fear?"
      ],
      sadness: [
        "What's weighing on your heart?",
        "What does this sadness need from you?",
        "Who or what could bring you comfort?",
        "What would help your heart feel lighter?"
      ],
      anger: [
        "What needs to be expressed here?",
        "What boundary might have been crossed?",
        "How could you channel this energy productively?",
        "What's the real message behind this anger?"
      ],
      joy: [
        "What exactly is bringing you joy?",
        "How can you savor this moment fully?",
        "Who would appreciate sharing this happiness with you?",
        "What makes this feeling worth remembering?"
      ],
      exhaustion: [
        "What has been draining your energy?",
        "What would true rest look like for you?",
        "How can you be kinder to your tired self?",
        "What small step could you take toward renewal?"
      ]
    };
    
    // Translate questions based on language
    const lang = getCurrentLanguage();
    const translatedQuestions = translateQuestions(clusterQuestions, lang);
    return translatedQuestions[primaryEmotion.type]?.[Math.floor(Math.random() * translatedQuestions[primaryEmotion.type].length)] || getGeneralQuestion();
  }
  
  return getGeneralQuestion(selectedEmoji);
}

// Comprehensive question translation system
function translateQuestions(questions, targetLang) {
  if (!questions || typeof questions !== 'object') {
    console.warn('Invalid questions object provided for translation');
    return questions;
  }
  
  // If target language is English or translation not needed, return original
  if (targetLang === 'en') {
    return questions;
  }
  
  const translatedQuestions = {};
  
  // Define comprehensive translation mappings
  const translationMaps = {
    de: {
      // Fear-related questions
      "What scares you the most right now?": "Was macht dir im Moment am meisten Angst?",
      "Where in your body do you feel the fear?": "Wo in deinem Körper spürst du die Angst?",
      "What would help you feel safer?": "Was würde dir helfen, dich sicherer zu fühlen?",
      "Can you identify what triggered this fear?": "Kannst du identifizieren, was diese Angst ausgelöst hat?",
      
      // Sadness-related questions
      "What's weighing on your heart?": "Was lastet auf deinem Herzen?",
      "What does this sadness need from you?": "Was braucht diese Traurigkeit von dir?",
      "Who or what could bring you comfort?": "Wer oder was könnte dir Trost bringen?",
      "What would help your heart feel lighter?": "Was würde deinem Herzen helfen, sich leichter zu fühlen?",
      
      // Anger-related questions
      "What needs to be expressed here?": "Was muss hier ausgedrückt werden?",
      "What boundary might have been crossed?": "Welche Grenze könnte überschritten worden sein?",
      "How could you channel this energy productively?": "Wie könntest du diese Energie produktiv kanalisieren?",
      "What's the real message behind this anger?": "Was ist die wahre Botschaft hinter dieser Wut?",
      
      // Joy-related questions
      "What exactly is bringing you joy?": "Was genau bereitet dir Freude?",
      "How can you savor this moment fully?": "Wie kannst du diesen Moment vollständig genießen?",
      "Who would appreciate sharing this happiness with you?": "Wer würde es schätzen, dieses Glück mit dir zu teilen?",
      "What makes this feeling worth remembering?": "Was macht dieses Gefühl erinnerungswürdig?",
      
      // Exhaustion-related questions
      "What has been draining your energy?": "Was hat deine Energie aufgebraucht?",
      "What would true rest look like for you?": "Wie würde wahre Ruhe für dich aussehen?",
      "How can you be kinder to your tired self?": "Wie kannst du zu deinem müden Ich freundlicher sein?",
      "What small step could you take toward renewal?": "Welchen kleinen Schritt könntest du zur Erneuerung unternehmen?"
    },
    tr: {
      // Fear-related questions
      "What scares you the most right now?": "Şu anda seni en çok ne korkutuyor?",
      "Where in your body do you feel the fear?": "Korkuyu vücudunun neresinde hissediyorsun?",
      "What would help you feel safer?": "Kendini daha güvende hissetmene ne yardımcı olur?",
      "Can you identify what triggered this fear?": "Bu korkuyu neyin tetiklediğini tanımlayabilir misin?",
      
      // Sadness-related questions
      "What's weighing on your heart?": "Kalbine ne ağırlık yapıyor?",
      "What does this sadness need from you?": "Bu üzüntünün senden neye ihtiyacı var?",
      "Who or what could bring you comfort?": "Kim veya ne sana rahatlık getirebilir?",
      "What would help your heart feel lighter?": "Kalbini daha hafif hissetmesine ne yardımcı olur?",
      
      // Anger-related questions
      "What needs to be expressed here?": "Burada neyin ifade edilmesi gerekiyor?",
      "What boundary might have been crossed?": "Hangi sınır aşılmış olabilir?",
      "How could you channel this energy productively?": "Bu enerjiyi verimli bir şekilde nasıl yönlendirebilirsin?",
      "What's the real message behind this anger?": "Bu öfkenin arkasındaki gerçek mesaj nedir?",
      
      // Joy-related questions
      "What exactly is bringing you joy?": "Seni tam olarak ne mutlu ediyor?",
      "How can you savor this moment fully?": "Bu anı tam olarak nasıl tadını çıkarabilirsin?",
      "Who would appreciate sharing this happiness with you?": "Bu mutluluğu seninle paylaşmayı kim takdir eder?",
      "What makes this feeling worth remembering?": "Bu hissi hatırlamaya değer kılan nedir?",
      
      // Exhaustion-related questions
      "What has been draining your energy?": "Enerjini tüketen ne oldu?",
      "What would true rest look like for you?": "Senin için gerçek dinlenme nasıl görünürdü?",
      "How can you be kinder to your tired self?": "Yorgun benliğine karşı nasıl daha nazik olabilirsin?",
      "What small step could you take toward renewal?": "Yenilenmeye doğru hangi küçük adımı atabilirsin?"
    }
  };

  // Get the appropriate translation map for the target language
  const translationMap = translationMaps[targetLang];
  
  if (!translationMap) {
    console.warn(`No translation map found for language: ${targetLang}`);
    return questions;
  }

  // Translate each emotion category
  for (const [emotion, questionArray] of Object.entries(questions)) {
    if (Array.isArray(questionArray)) {
      translatedQuestions[emotion] = questionArray.map(question => {
        // Return translation if available, otherwise return original
        return translationMap[question] || question;
      });
    } else {
      translatedQuestions[emotion] = questionArray;
    }
  }

  return translatedQuestions;
} // ← DIESE Klammer fehlte!

// Multilingual general questions
function getGeneralQuestion(emoji = null) {
  const lang = getCurrentLanguage();
  const generalQuestions = {
    de: {
      "😊": "Was genau lässt dich gerade so gut fühlen?",
      "😢": "Was möchte dein Herz ausdrücken?",
      "😠": "Was stört dich wirklich unter der Oberfläche?",
      "😨": "Was fühlt sich unsicher oder ungewiss für dich an?",
      "😴": "Was braucht dein Körper gerade am meisten?",
      "🤔": "Was beschäftigt dich, das geklärt werden muss?",
      "default": "Was möchtest du weiter erkunden?"
    },
    en: {
      "😊": "What exactly makes you feel so good right now?",
      "😢": "What would your heart like to express?",
      "😠": "What's really bothering you underneath the surface?",
      "😨": "What feels unsafe or uncertain to you?",
      "😴": "What does your body need most right now?",
      "🤔": "What's on your mind that needs sorting out?",
      "default": "What would you like to explore further?"
    },
    tr: {
      "😊": "Seni şu anda tam olarak ne bu kadar iyi hissettiriyor?",
      "😢": "Kalbın ne ifade etmek istiyor?",
      "😠": "Yüzeyin altında seni gerçekten ne rahatsız ediyor?",
      "😨": "Sana ne güvensiz veya belirsiz geliyor?",
      "😴": "Vücudunun şu anda en çok neye ihtiyacı var?",
      "🤔": "Aklında ne var, çözülmesi gereken?",
      "default": "Daha fazla ne keşfetmek istersin?"
    }
  };
  
  const langQuestions = generalQuestions[lang] || generalQuestions.en;
  return langQuestions[emoji] || langQuestions.default;
}

// Make functions available globally for HTML usage
window.getEmotionData = getEmotionData;
window.detectEmotions = detectEmotions;
window.getEmotionBasedQuestion = getEmotionBasedQuestion;
window.getGeneralQuestion = getGeneralQuestion;
window.translateQuestions = translateQuestions;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    emotionData,
    getCurrentLanguage,
    getEmotionData,
    detectEmotions,
    getEmotionBasedQuestion,
    getGeneralQuestion,
    translateQuestions
  };
}
