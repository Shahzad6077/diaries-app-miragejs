import { Response, Request } from "miragejs";
import { AppSchema } from "./../SchemaModels";
import { handleErrorResponse } from "./../Common/ErrorResponse";
import { Diary } from "../../Types/store";
import { SuccessResponse } from "../../Types/server";

class DiaryController {
  // CRUD for Diary
  createDiary = (schema: any, request: Request): Response | SuccessResponse => {
    const userId = request.params.userId;
    let { txt }: { txt: string } = JSON.parse(request.requestBody);
    const user = schema.find("user", userId);
    if (user) {
      const data = { txt, createdAt: new Date().getTime(), userId };
      schema.create("diary", data);
      return { success: true, message: "Diary created." };
    } else {
      return handleErrorResponse(
        new Error("You're not authorized."),
        "You're not authorized."
      );
    }
  };

  getAllUserDiaries = (schema: AppSchema, request: Request): Response | any => {
    const userId = request.params.userId;
    const user = schema.find("user", userId);
    console.log(user);
    if (user) {
      return { data: user.diary.models as Diary[] };
    } else {
      return handleErrorResponse(
        new Error("user not exist"),
        "Invalid User Id"
      );
    }
  };
  deleteUserDiary = (schema: any, request: Request): Response | any => {
    const userId = request.params.userId;
    const id = request.params.diaryId;

    const docRef = schema.diaries.findBy({ id, userId });
    if (docRef) {
      docRef.destroy();
      return { message: "Diary Deleted Successfully.", success: true };
    } else {
      return handleErrorResponse(
        new Error("You're not Authorized."),
        "You're not Authorized."
      );
    }
  };
}
export default DiaryController;
