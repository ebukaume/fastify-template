export default {
  routePrefix: "/documentation",
  exposeRoute: true,
  swagger: {
    info: {
      title: "Example Microservice",
      description: "Put a description of this microservice here",
      version: "1.0.0"
    },
    externalDocs: {
      url: "https://github.com/ebukaume/fastify-template",
      description: "Link to the respository"
    },
    host: "localhost:8080",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"]
  }
};
