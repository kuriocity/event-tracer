# Event Tracer Library

A generic, extensible tracing library for microservices that supports multiple message queues and tracing backends.

## Features
- Support for Google Cloud Pub/Sub, AWS SQS, and Kafka.
- Modular design for adding new providers.
- Vendor-agnostic, with lightweight logging provider for local testing.

## Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/event-tracer.git
    cd event-tracer
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure environment variables in `.env`:
    ```plaintext
    ENABLE_PUBSUB=true
    ENABLE_SQS=false
    ENABLE_KAFKA=false
    KAFKA_BROKERS=localhost:9092
    SQS_QUEUE_URL=https://sqs.region.amazonaws.com/123456789012/my-queue
    ```

4. Add the providers you need in `src/index.js`.

## Usage
```javascript
const tracer = require('./src');

tracer.traceEvent({
    entityId: '12345',
    timeline: Date.now(),
    serviceName: 'MyService',
    data: { key: 'value' },
    traces: ['event1', 'event2'],
    eventName: 'UserCreated'
});