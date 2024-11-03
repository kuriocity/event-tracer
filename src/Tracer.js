const { v4: uuidv4 } = require('uuid');

class Tracer {
    constructor() {
        this.providers = [];
    }

    addProvider(provider) {
        this.providers.push(provider);
    }

    traceEvent({ entityId, timeline, serviceName, data, traces, eventName }) {
        const tracePayload = {
            entityId,
            timeline,
            serviceNameKeyword: serviceName,
            serviceNameText: serviceName,
            data,
            traces,
            eventName,
            timeStamp: Date.now(),
            uuid: uuidv4(),
        };

        this.providers.forEach((provider) => provider.publish(tracePayload));
    }
}

module.exports = Tracer;
