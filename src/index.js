const Tracer = require('./Tracer');
const GoogleCloudPubSubProvider = require('./providers/GoogleCloudPubSubProvider');
const AWSSQSProvider = require('./providers/AWSSQSProvider');
const KafkaProvider = require('./providers/KafkaProvider');
const LoggingProvider = require('./providers/LoggingProvider');

const tracer = new Tracer();

if (process.env.ENABLE_PUBSUB === 'true') {
    tracer.addProvider(new GoogleCloudPubSubProvider('ENTITY_EVENT_TRACING'));
}
if (process.env.ENABLE_SQS === 'true') {
    tracer.addProvider(new AWSSQSProvider(process.env.SQS_QUEUE_URL));
}
if (process.env.ENABLE_KAFKA === 'true') {
    tracer.addProvider(new KafkaProvider('tracing-events'));
}

tracer.addProvider(new LoggingProvider());

module.exports = tracer;