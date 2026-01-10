import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TaskMaster Enterprise API',
            version: '1.0.0',
            description: 'API profesional construida con Clean Architecture, Node, TS y PostgreSQL',
            contact: {
                name: 'Rafael Gonzales', // Tu nombre
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor Local',
            },
            {
                url: 'https://taskmaster-enterprise-api.onrender.com', // 👈 ¡Pon tu URL de producción aquí!
                description: 'Servidor Producción',
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    // Aquí le decimos dónde buscar los comentarios (en tus rutas)
    apis: [
        `${path.join(__dirname, '../routers/*{.ts,.js}')}`,
    ],
};

export const swaggerSpec = swaggerJSDoc(options);