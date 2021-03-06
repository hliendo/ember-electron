function installExtensions() {
  try {
    window.requireNode('fs');
  } catch (e) {
    console.warn('ember-electron is unable to require node modules, possibly because nodeIntegration is not enabled.');
    console.warn('This prevents the installation of the Ember Inspector and Devtron extensions. Error:');
    console.warn(e);
    return;
  }

  /**
   * Install Devtron in the current window.
   */
  function installDevtron() {
    try {
      let devtron = window.requireNode('devtron');

      if (devtron) {
        devtron.install();
      }
    } catch(e) {
      console.error('Error installing devtron', e);
    }
  }

  /**
   * Install Ember-Inspector in the current window.
   */
  function installEmberInspector() {
    let path = window.requireNode('path');
    let fs = window.requireNode('fs');

    let location = path.dirname(window.requireNode.resolve('ember-inspector/dist/chrome/devtools.js'));
    if (!location) {
      console.warn('Unable to locate ember-inspector', err);
      return;
    }

    let { BrowserWindow } = window.requireNode('electron').remote;
    let added = BrowserWindow.getDevToolsExtensions
      && BrowserWindow.getDevToolsExtensions().hasOwnProperty('Ember Inspector');

    if (!added) {
      try {
        BrowserWindow.addDevToolsExtension(location);
      } catch(err) {
        console.warn('Error enabling Ember Inspector', err)
        return;
      }
    }
  }

  installDevtron();
  installEmberInspector();
}

document.addEventListener('DOMContentLoaded', installExtensions);