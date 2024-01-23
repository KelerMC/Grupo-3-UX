const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "IHC Proyecto_01",
      version: "1.0.0",
      description:
        "API de administración de datos personales, notas y reclamos del curso de IHC",
    },
  },
  apis: ["src/routes/*.js"],
  showCommonExtensions: false,
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
