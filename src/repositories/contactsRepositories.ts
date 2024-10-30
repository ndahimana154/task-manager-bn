import Contact from "../database/models/contact";

const findUsersContacts = async (userId: string) => {
    return await Contact.find({ userId: userId }).exec();
}

const saveNewContact = async (data: any) => {
    return await Contact.create(data);
}

const findContactByUserIdAndAttribute = async (userId: string, key: string, value: string) => {
    return await Contact.findOne({ userId: userId, [key]: value }).exec();
}

const updateContact = async (id: string, data: any) => {
    return await Contact.findByIdAndUpdate(id, data, { new: true }).exec();
}

const deleteContact = async (_id: string) => {
    return await Contact.findByIdAndDelete(_id).exec();
}

export default {
    findUsersContacts,
    saveNewContact,
    findContactByUserIdAndAttribute,
    updateContact,
    deleteContact
}