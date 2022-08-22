const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;
// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;

    // butInstall.hidden = false;
    // appinstalled();

    event.userChoice.then((result) => {
        console.log(result.outcome);
    }, handleError)
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    deferredPrompt.prompt();
    // butInstall.disabled = true;

    const {outcome} = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
        console.log('User accepted the install prompt.');
        // butInstall.hidden = true;
    } else if (outcome === 'dismissed') {
        console.log('User dismissed the install prompt.');
    }

    // butInstall.disabled = false;
    deferredPrompt = null;

});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('Thank you for installing our app!', event);
});
