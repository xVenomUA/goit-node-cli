import { program } from "commander";
import { listContacts, getContactById, removeContact, addContact } from "./contacts.js";
import colors from "colors";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();
const options = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        const data = await listContacts();
        console.table(data);
      break;
    case "get":

        const contact = await getContactById(id);
        if(!contact){
          console.log(contact)
          break; 
        } 
        console.table(contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      if(!newContact){
        console.log(newContact)
        break;
      }
      console.log("You added new contact:".green);
      console.table(newContact);
      break;

    case "remove":
        const removeData = await removeContact(id);
        if(!removeData){
          console.log(removeData)
          break; 
        }
        console.log(`You removed contact with id: ${id}`.green);
        console.table(removeData);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
