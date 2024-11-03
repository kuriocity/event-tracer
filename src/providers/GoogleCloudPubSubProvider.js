const { PubSub } = require('@google-cloud/pubsub');
const BaseProvider = require('./BaseProvider');

class GoogleCloudPubSubProvider extends BaseProvider {
    constructor(topicName) {
        super();
        this.pubsub = new PubSub();
        this.topic = this.pubsub.topic(topicName);
    }

    publish(payload) {
        this.topic.publishJSON(payload)
            .then((messageId) => console.log(`Message ${messageId} published.`))
            .catch(console.error);
    }
}

module.exports = GoogleCloudPubSubProvider;