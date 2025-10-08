/**
 * Language Switcher für Fatma Emotion Companion
 * 
 * Diese Datei verwaltet die Sprachumschaltung zwischen den Sprachen
 * Deutsch, Englisch und Türkisch
 */

// Sprachumschaltung mit Local Storage Persistenz
document.addEventListener('DOMContentLoaded', function() {
    // Setze Standardsprache basierend auf Browser-Sprache
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['de', 'en', 'tr'];
    
    if (!localStorage.getItem('preferredLanguage')) {
        if (supportedLangs.includes(browserLang)) {
            localStorage.setItem('preferredLanguage', browserLang);
        } else {
            localStorage.setItem('preferredLanguage', 'de');
        }
    }
    
    // Setze aktive Sprache im Language Switcher
    highlightCurrentLanguage();
});

function highlightCurrentLanguage() {
    const currentPath = window.location.pathname;
    const langLinks = document.querySelectorAll('.language-switcher a');
    
    langLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentPath.includes(linkHref) || 
            (currentPath === '/' && linkHref === 'index.html')) {
            link.style.color = '#5a7562';
            link.style.fontWeight = 'bold';
        } else {
            link.style.color = '';
            link.style.fontWeight = '';
        }
    });
}

// Sprachwechsel mit Smooth Transition
function switchLanguage(lang) {
    // Füge Übergangseffekt hinzu
    document.body.style.opacity = '0.7';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        window.location.href = getLanguageFile(lang);
    }, 300);
}

function getLanguageFile(lang) {
    const languageFiles = {
        'de': 'index.html',
        'en': 'en.html', 
        'tr': 'tr.html'
    };
    return languageFiles[lang] || 'index.html';
}

// Automatische Sprachweiterleitung basierend auf Browser-Einstellungen
function autoRedirectToPreferredLanguage() {
    const preferredLang = localStorage.getItem('preferredLanguage');
    const currentLang = getCurrentLanguageFromURL();
    
    if (preferredLang && preferredLang !== currentLang) {
        const targetFile = getLanguageFile(preferredLang);
        if (targetFile !== window.location.pathname.split('/').pop()) {
            window.location.href = targetFile;
        }
    }
}

function getCurrentLanguageFromURL() {
    const currentFile = window.location.pathname.split('/').pop();
    if (currentFile === 'en.html') return 'en';
    if (currentFile === 'tr.html') return 'tr';
    return 'de'; // index.html ist Deutsch
}

// Initialisiere Sprachumschaltung
autoRedirectToPreferredLanguage();
