(function() {
  window.onload = () => {
    if (navigator.serviceWorker.controller) {
      debug(
        navigator.serviceWorker.controller.scriptURL +
        ' (onload)', 'controller'
      );
      debug(
        'An active service worker controller was found, ' +
        'no need to register'
      );
    } else {
      navigator.serviceWorker.register('worker.js', {
        scope: './'
      }).then(function (reg) {
        debug(reg.scope, 'register');
        debug('Service worker change, registered the service worker');
      });
    }

    // document.querySelector('#refresh').search = Date.now();

    function debug(message, element, append) {
      var target = document.querySelector('#' + (element || 'log'));
      target.textContent = message + ((append) ? ('/n' + target.textContent) : '');
    }

    document.getElementById('clearAndReRegister').addEventListener('click',
      function () {
        navigator.serviceWorker.getRegistration().then(function (registration) {
          registration.unregister();
          window.location.reload();
        });
      }
    );

    console.log('weeeee')
  };
})()