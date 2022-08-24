const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
//Creates install prompt in browser window upon page load, shows install button if not yet installed
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    window.deferredPrompt = event;
    butInstall.style.display = 'inline-block';
});

//Click event to install app on desktop upon click of button. Hides button when activated
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    window.deferredPrompt = null;
    butInstall.style.display = 'none';
});

//No longer shows prompt or install button if the app has been installed
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
    butInstall.style.display = 'none';
});
