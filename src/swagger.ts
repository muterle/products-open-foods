import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v1.0.0",
    title: "Integration with Products Open Facts",
    description: "Integration used to search for products on the Products Open Facts platform",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "API url",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./presentation/routes/default.routes.ts",
  "./presentation/routes/products.routes.ts",
];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
