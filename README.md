# 📦 Event Tracer Library

> **A plug-and-play tracing library for microservices**  
> Easily track events across distributed systems with support for Google Cloud Pub/Sub, AWS SQS, Kafka, and simple logging.

## 🚀 Features

- **Multi-Provider Support**: Works with Google Cloud Pub/Sub, AWS SQS, Kafka, and a logging provider for local dev.
- **Vendor-Agnostic**: Use one interface to publish events, no matter the backend.
- **Easy Configuration**: Enable or disable providers using environment variables.
- **Extendable**: Easily add new providers with minimal code.

## 🏗️ Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/event-tracer.git
   cd event-tracer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure providers**  
   Copy `.env.example` to `.env`, then update the values for the providers you want to use:

   ```plaintext
   ENABLE_PUBSUB=true         # Set to true to enable Google Cloud Pub/Sub
   ENABLE_SQS=false           # Set to true to enable AWS SQS
   ENABLE_KAFKA=false         # Set to true to enable Kafka
   KAFKA_BROKERS=localhost:9092
   SQS_QUEUE_URL=https://sqs.region.amazonaws.com/123456789012/my-queue
   ```

   - **Enable only the providers you need**. For example, set `ENABLE_PUBSUB=true` to use Google Cloud Pub/Sub, or `ENABLE_KAFKA=true` for Kafka.
   - If you’re not using a provider, you can skip its configuration.

4. **Add providers in code**  
   Open `src/index.js` and uncomment the providers you’ve enabled in the `.env` file:

   ```javascript
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

   tracer.addProvider(new LoggingProvider());  // Always include logging for local testing
   ```

5. **You're all set!** 🎉  
   You’re now ready to start tracing events with a simple function call. 

## 🔧 Usage

Import the tracer and start sending trace events with the following example:

```javascript
const tracer = require('./src');

tracer.traceEvent({
    entityId: '12345',          // ID of the entity involved
    timeline: Date.now(),       // Event timestamp
    serviceName: 'UserService', // Service name triggering the event
    data: { key: 'value' },     // Additional data related to the event
    traces: ['init', 'save'],   // Steps in the trace
    eventName: 'UserCreated'    // Event name
});
```

### Sample Event Payload

Each `traceEvent()` call sends a payload like this:

```json
{
  "entityId": "12345",
  "timeline": 1698765432,
  "serviceNameKeyword": "UserService",
  "serviceNameText": "UserService",
  "data": { "key": "value" },
  "traces": ["init", "save"],
  "eventName": "UserCreated",
  "timeStamp": 1698765432,
  "uuid": "unique-uuid-v4"
}
```

### Local Testing with Logging Provider

For local testing, the `LoggingProvider` outputs events directly to the console. You can disable all other providers in `.env` to use just this provider.

## 📚 Adding a New Provider

Want to add support for a different messaging service? Follow these steps:

1. **Create a provider file**  
   Create a new file in `src/providers`, e.g., `MyCustomProvider.js`.

2. **Extend `BaseProvider` and implement `publish`**  
   ```javascript
   const BaseProvider = require('./BaseProvider');

   class MyCustomProvider extends BaseProvider {
       publish(payload) {
           // Implement the logic to send `payload` to your custom backend
           console.log("Publishing to MyCustomProvider", payload);
       }
   }

   module.exports = MyCustomProvider;
   ```

3. **Add the new provider in `index.js`**  
   Import and add the provider as you did with other providers:
   ```javascript
   const MyCustomProvider = require('./providers/MyCustomProvider');
   tracer.addProvider(new MyCustomProvider());
   ```

## 💻 Development Tips

- **Console Testing**: Use the `LoggingProvider` to output all events to your console during development.
- **Environment Isolation**: Configure different `.env` files for dev, staging, and production to easily switch providers.
- **Automatic Provider Detection**: Consider scanning `src/providers` to auto-load providers without modifying `index.js` (optional).

## 🌟 Contributing

Feel free to fork the project, submit issues, and create pull requests to help improve this library for the community!

## 📝 License

This project is licensed under the MIT License.
