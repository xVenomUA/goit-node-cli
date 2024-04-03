
import { promises as fs } from "fs";
import { nanoid } from "nanoid";
import { stringify } from 'querystring';

const contactsPath = './db/contacts.json';


async  function listContacts() {

    try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
    } catch (error) {
      console.log("Something went wrong..." + error.message)
    }
}
async function getContactById(contactId) {
  try {
    const data = await listContacts(); 
    const contact = data.find((contact) => contact.id === contactId);
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.log("Something went wrong..." + error.message)
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const contact = await getContactById(contactId);
    if (!contact) {
      return null;
    }
    const newData = data.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newData)); 
    return contact; 
  } catch (error) {
    console.log("Something went wrong..." + error.message)
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  try {
    if (!name || !email || !phone) {
      return null;
    }
    const data = await listContacts();
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data));
    return newContact;
    
  } catch (error) {
    
  }


}

export { listContacts, getContactById, removeContact, addContact };