import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options :swaggerJSDoc.Options = {
    swaggerDefinition : {
        openapi : "3.0.2",
        tags : [
            {
                name: "Products",
                description: "API operations related to products"
            }
        ],
        info: {
            title: "REST API Node.js / Express / TypeScript",
            version : "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis: ['./src/router.ts']
}
const swaggerSpec = swaggerJSDoc(options);
const swaggerUiOptions : SwaggerUiOptions = {
    customCss: `.topbar-wrapper .link {
        content:url("https://yt3.googleusercontent.com/3DrMl7lIB9Z5B3bopBraXKwpy5ETOTODmkEnt8a2Z0g02Lek-4vDOQK5yJWykxGo_eUJHsWxV4c=s160-c-k-c0x00ffffff-no-rj");
        height: 80px;
        width:auto;
    }
        .swagger-ui .topbar{
            background-color:#2b3b45
        }
    `
}
export default swaggerSpec;
export {
    swaggerUiOptions
}