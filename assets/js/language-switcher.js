/**
 * Language Switcher für Fatma Emotion Companion
 */

document.addEventListener('DOMContentLoaded', function() {
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['de', 'en', 'tr'];

    // Standardsprache setzen
    if (!localStorage.getItem('preferredLanguage')) {
        const langToSet = supportedLangs.includes(browserLang) ? browserLang : 'de';
        localStorage.setItem('preferredLanguage', langToSet);
    }

    // Aktuelle Sprache hervorheben
    highlightCurrentLanguage();

    // Automatische Weiterleitung zur bevorzugten Sprache
    autoRedirectToPreferredLanguage();
});

function highlightCurrentLanguage() {
    const currentFile = window.location.pathname.split('/').pop();
    const langLinks = document.querySelectorAll('.language-switcher a');

    langLinks.forEach(link => {
        const linkFile = getLanguageFile(link.dataset.lang || link.getAttribute('href'));
        if (linkFile === currentFile) {
            link.style.color = '#5a7562';
            link.style.fontWeight = 'bold';
        } else {
            link.style.color = '';
            link.style.fontWeight = '';
        }
    });
}

// Sprachwechsel
function switchLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang); 
    document.body.style.opacity = '0.7';
    document.body.style.transition = 'opacity 0.3s ease';

    setTimeout(() => {
        window.location.href = getLanguageFile(lang);
    }, 300);
}

function getLanguageFile(lang) {
    const files = { 'de': 'index.html', 'en': 'en.html', 'tr': 'tr.html' };
    return files[lang] || 'index.html';
}

function autoRedirectToPreferredLanguage() {
    const preferredLang = localStorage.getItem('preferredLanguage');
    const currentLang = getCurrentLanguageFromURL();

    if (preferredLang && preferredLang !== currentLang) {
        const targetFile = getLanguageFile(preferredLang);
        const currentFile = window.location.pathname.split('/').pop();
        if (targetFile !== currentFile) window.location.href = targetFile;
    }
}

function getCurrentLanguageFromURL() {
    const currentFile = window.location.pathname.split('/').pop();
    if (currentFile === 'en.html') return 'en';
    if (currentFile === 'tr.html') return 'tr';
    return 'de';
}
