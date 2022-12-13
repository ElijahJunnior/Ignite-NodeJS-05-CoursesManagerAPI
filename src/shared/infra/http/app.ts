import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import upload from "@config/upload";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { AppError } from "@shared/errors/AppError";
import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";
import { router } from "@shared/infra/http/routes";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";

import "@shared/container";

// Iniciando o express
const app = express();

// Abrindo a conexão com o banco de dados
createConnection();

// Criando arquivos de configuração do sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

// Chamando middleware para limitar so acessos por ip/intervalo
app.use(rateLimiter);

// Chamando middleware que convert os parâmetros em JSON
app.use(express.json());

// Chamando middlewares do Sentry para analisar erros e performance
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Rota de documentação
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Rota para acessar as imagens do sistema
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

// Middleware que limita o acesso para hosts especificados
app.use(cors());

// Demais rotas da aplicação
app.use(router);

// Tratamento para definir quais erros serão enviados para o Sentry
app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      if (error.status === 429 || error.status === 500) {
        return true;
      }
      return false;
    },
  })
);

// Tratamentos dos erros da aplicação
app.use((err: Error, req: Request, res: Response) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: `Internal server error - ${err.message}`,
  });
});

export { app };
