var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind Event Listeners
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    onDeviceReady: function() {
        universalLinks.subscribe('ul_Traqq', app.didLaunchAppFromLink);
    },

    didLaunchAppFromLink: function(eventData) {
      console.log('launched from link');
    }
};

app.initialize();
