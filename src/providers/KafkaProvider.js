const { Kafka } = require('kafkajs');
const BaseProvider = require('./BaseProvider');

class KafkaProvider extends BaseProvider {
    constructor(topic) {
        super();
        this.kafka = new Kafka({
            clientId: 'tracing-library',
            brokers: process.env.KAFKA_BROKERS.split(','),
        });
        this.producer = this.kafka.producer();
        this.topic = topic;

        this.producer.connect()
            .then(() => console.log("Kafka producer connected"))
            .catch(console.error);
    }

    publish(payload) {
        this.producer.send({
            topic: this.topic,
            messages: [{ value: JSON.stringify(payload) }],
        })
        .then(() => console.log("Message sent to Kafka"))
        .catch(console.error);
    }
}

module.exports = KafkaProvider;