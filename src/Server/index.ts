import { createServer, Factory } from "miragejs";
import { ConfigureServer } from "./../Types/server";
import { AuthController, DiaryController, NoteController } from "./Controller";
import models, { AppSchema } from "./SchemaModels";
import factories from "./Factories";
export default function ({ environment }: ConfigureServer) {
  const authController = new AuthController();
  const diaryController = new DiaryController();
  const noteController = new NoteController();
  createServer({
    environment,
    models,
    factories: {
      note: Factory.extend({
        txt(i: number) {
          return `Note ${i}`;
        },
        createdAt() {
          return new Date().getTime();
        },
      }),
      diary: Factory.extend({
        txt(i: number) {
          return `Diary ${i}`;
        },
        createdAt() {
          return new Date().getTime();
        },

        afterCreate(diary: any, server: any) {
          // console.log(diary, "<- diary after create");
          // server.createList("diary", 5, { userId: "1" }); //also pass id
          server.createList("note", 3, {
            diary: diary,
            userId: diary.attrs.userId,
          });
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
          // findBy({ userId: "2", diaryId: "7" })
        ];

        return { arr };
      });
      // Check Authentication.
      this.post("/api/signup", authController.registerUser);
      this.post("/api/login", authController.loginUser);
      this.get("/api/logout", authController.logout);
      this.get("/api/authentication", authController.isAuthenticated);

      // DIARY CRUD
      this.get("/api/:userId/diaries/", diaryController.getAllUserDiaries);
      this.post("/api/:userId/diaries", diaryController.createDiary);
      this.delete(
        "/api/:userId/diaries/:diaryId",
        diaryController.deleteUserDiary
      );

      // Note CRUD
      this.get(
        "/api/notes/:userId/:diaryId",
        noteController.getAllUserDiaryNotes
      );
      this.post("/api/notes/:userId/:diaryId", noteController.createNote);
      this.delete(
        "/api/notes/:userId/:diaryId/:noteId",
        noteController.deleteDiaryNote
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
