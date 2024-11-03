const BaseProvider = require('./BaseProvider');

class LoggingProvider extends BaseProvider {
    publish(payload) {
        console.log("Logging event:", payload);
    }
}

module.exports = LoggingProvider;