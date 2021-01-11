import { Response, Request } from "miragejs";
import { AppSchema } from "./../SchemaModels";
import { handleErrorResponse } from "./../Common/ErrorResponse";
import { Diary, Note } from "../../Types/store";
import { SuccessResponse } from "../../Types/server";

class NoteController {
  // CRUD for Diary
  createNote = (schema: any, request: Request): Response | SuccessResponse => {
    const userId = request.params.userId;
    const diaryId = request.params.diaryId;
    let { txt }: { txt: string } = JSON.parse(request.requestBody);
    const user = schema.find("user", userId);
    if (user) {
      const data = { txt, createdAt: new Date().getTime(), userId, diaryId };
      schema.create("note", data);
      return { success: true, message: "Note created." };
    } else {
      return handleErrorResponse(
        new Error("You're not authorized."),
        "You're not authorized."
      );
    }
  };

  getAllUserDiaryNotes = (schema: any, request: Request): Response | any => {
    const userId = request.params.userId;
    const diaryId = request.params.diaryId;
    const notes = schema.notes.where({ userId, diaryId }).models;
    // --
    if (notes) {
      return { data: notes as Note[] };
    } else {
      return handleErrorResponse(
        new Error("You're not authorized"),
        "You're not authorized"
      );
    }
  };
  deleteDiaryNote = (schema: any, request: Request): Response | any => {
    const userId = request.params.userId;
    const diaryId = request.params.diaryId;
    const id = request.params.noteId;

    const docRef = schema.notes.findBy({ id, diaryId, userId });
    if (docRef) {
      docRef.destroy();
      return { message: "Note Deleted Successfully.", success: true };
    } else {
      return handleErrorResponse(
        new Error("You're not Authorized."),
        "You're not Authorized."
      );
    }
  };
}
export default NoteController;
