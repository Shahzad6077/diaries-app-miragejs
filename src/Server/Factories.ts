import { Factory } from "miragejs";
import { UserModel } from "./SchemaModels";

const factories = () => ({
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
    afterCreate(user: typeof UserModel, server: any) {
      console.log(user, "<- user after create");
      server.createList("diary", 5, { user });
    },
  }),
});
export default factories;
