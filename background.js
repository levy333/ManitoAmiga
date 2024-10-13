chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // Verifica que la pestaña se haya cargado completamente
    if (changeInfo.status === 'complete' && tab.url.startsWith('http')) {
        // No es necesario ejecutar scripts aquí porque el content script se inyecta automáticamente
    }
});
