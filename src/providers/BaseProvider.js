class BaseProvider {
    publish(payload) {
        throw new Error("Publish method not implemented in the provider.");
    }
}

module.exports = BaseProvider;