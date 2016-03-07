var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        $cordovaStatusbar.styleColor('black');
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
        alert('Did launch application from the link: ' + eventData);
    }
};

app.initialize();