import { createServer, Factory, Server } from "miragejs";
import { ConfigureServer } from "./../Types/server";
import MirageController from "./Controller";
import models, { AppSchema, UserModel } from "./SchemaModels";
import factories from "./Factories";
export default function ({ environment }: ConfigureServer) {
  const mirageController = new MirageController();
  createServer({
    environment,
    models,
    factories: {
      diary: Factory.extend({
        txt(i: number) {
          return `Diary ${i}`;
        },
        createdAt() {
          return new Date().getTime();
        },
      }),
      user: Factory.extend({
        /**
         * What if we wanted to make it even easier to create a List with
         * many reminders? We can use the afterCreate hook on our
         * List Factory, passing in our newly created list into any new
         * Reminders we create:
         */
        afterCreate(user: any, server: any) {
          // console.log(user, "<- user after create");
          // server.createList("diary", 5, { userId: "1" }); //also pass id
          server.createList("diary", 5, { user: user });
        },
      }),
    },
    routes() {
      this.get("/api/diaries", (schema: AppSchema, request) => {
        const arr = [
          schema.all("diary"),
          schema.all("note"),
          schema.all("user"),
        ];
        return { arr };
      });
      // Check Authentication.
      this.post("/api/signup", mirageController.registerUser);
      this.post("/api/login", mirageController.loginUser);
      this.get("/api/logout", mirageController.logout);
      this.get("/api/authentication", mirageController.isAuthenticated);

      // DIARY CRUD
      this.get("/api/diaries/:userId", mirageController.getAllUserDiaries);
      this.delete(
        "/api/diaries/:userId/:diaryId",
        mirageController.deleteUserDiary
      );
    },
    seeds(server: any) {
      server.create("user", {
        email: "ali@test.com",
        password: "asdasd",
        createdAt: 123124234,
      });
      server.create("user", {
        email: "ahmad@test.com",
        password: "asdasd",
        createdAt: 123124234,
      });
    },
  });
}
