const AWS = require('aws-sdk');
const BaseProvider = require('./BaseProvider');

class AWSSQSProvider extends BaseProvider {
    constructor(queueUrl) {
        super();
        this.sqs = new AWS.SQS();
        this.queueUrl = queueUrl;
    }

    publish(payload) {
        const params = {
            MessageBody: JSON.stringify(payload),
            QueueUrl: this.queueUrl,
        };
        this.sqs.sendMessage(params, (err, data) => {
            if (err) console.error("Error sending to SQS", err);
            else console.log("Message sent to SQS", data.MessageId);
        });
    }
}

module.exports = AWSSQSProvider;