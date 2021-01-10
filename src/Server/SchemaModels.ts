import {
  Factory,
  Model,
  RestSerializer,
  Registry,
  belongsTo,
  hasMany,
} from "miragejs";
import Schema from "miragejs/orm/schema";
import { ModelDefinition } from "miragejs/-types";
// TYPES
import { Diary, Note, User } from "./../Types/store";

export const UserModel = Model.extend({
  diary: hasMany(),
});
export const DiaryModel = Model.extend({
  note: hasMany(),
  user: belongsTo(),
});
export const NoteModel = Model.extend({
  diary: belongsTo(),
});

type AppRegistry = Registry<
  {
    user: typeof UserModel;
    diary: typeof DiaryModel;
    note: typeof NoteModel;
  },
  {}
>;
export type AppSchema = Schema<AppRegistry>;
export default {
  diary: DiaryModel,
  note: NoteModel,
  user: UserModel,
};
