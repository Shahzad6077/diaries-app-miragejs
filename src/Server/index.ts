import { createServer, Server } from "miragejs";
import { ConfigureServer } from "./../Types/server";
import MirageController from "./Controller";
import models, { AppSchema } from "./SchemaModels";

export default function ({ environment }: ConfigureServer) {
  const mirageController = new MirageController();
  createServer({
    environment,
    models,
    routes() {
      this.get("/api/diaries", (schema: AppSchema, request) => {
        return schema.all("user");
      });
      // Check Authentication.
      this.post("/api/signup", mirageController.registerUser);
      this.post("/api/login", mirageController.loginUser);
      this.get("/api/logout", mirageController.logout);
      this.get("/api/authentication", mirageController.isAuthenticated);
    },
    seeds(server: any) {
      server.create("user", {
        email: "ali@gmail.com",
        password: "qweqwe",
        createdAt: 123124234,
      });
    },
  });
}
