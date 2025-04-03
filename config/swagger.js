const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Definiciones de esquemas (mejor separadas para mejor organización)
const schemas = {
  User: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      email: { type: 'string', format: 'email' }, // Más específico
      createdAt: { type: 'string', format: 'date-time' } // Ejemplo de campo adicional
    },
    example: {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@example.com',
      createdAt: '2023-01-01T00:00:00Z'
    }
  },
  UserCreate: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: { type: 'string', minLength: 3 },
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 6 }
    }
  },
  LoginResponse: {
    type: 'object',
    properties: {
      token: { type: 'string' },
      user: { $ref: '#/components/schemas/User' }
    }
  }
};

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuarios - BACKEND-MASTER',
      version: '1.0.0',
      description: 'Documentación completa de la API de gestión de usuarios',
      contact: {
        name: 'Soporte Técnico',
        email: 'soporte@backendmaster.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000', // Prefijo de versión recomendado
        description: 'Servidor de Desarrollo'
      },
      {
        url: 'https://api.backendmaster.com/v1',
        description: 'Servidor de Producción'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Ingrese el token JWT en formato: Bearer <token>'
        }
      },
      schemas: schemas, // Incorporamos los esquemas definidos
      responses: {
        UnauthorizedError: {
          description: 'Token inválido o no proporcionado'
        },
        NotFoundError: {
          description: 'Recurso no encontrado'
        }
      }
    },
    security: [{ bearerAuth: [] }] // Seguridad global (opcional)
  },
  apis: [
    './routes/api/user/*.js',
    './routes/api/*.js' // Para incluir otras rutas
  ]
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  // Configuración adicional de la UI
  const swaggerOptions = {
    explorer: true,
    customSiteTitle: 'BACKEND-MASTER API Docs',
    customCss: '.swagger-ui .topbar { display: none }'
  };
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions));
};