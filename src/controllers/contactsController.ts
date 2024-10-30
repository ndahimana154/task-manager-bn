import { Request, Response } from "express"
import httpStatus from "http-status"

import contactsRepositories from "../repositories/contactsRepositories"

const getAllUsersContacts = async (req: any, res: Response): Promise<any> => {
    try {
        const id = req.user._id.toString();
        const contacts = await contactsRepositories.findUsersContacts(id);
        if (!contacts || contacts.length === 0) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: "No contacts found"
            })
        }
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "Contacts retrieved successfully",
            data: { contacts }
        })
    } catch (error: any) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

const createNewContact = async (req: any, res: Response): Promise<any> => {
    try {
        req.body.userId = req.user._id;
        const contact = await contactsRepositories.saveNewContact(req.body);
        return res.status(httpStatus.CREATED).json({
            status: httpStatus.CREATED,
            message: "Contact created successfully",
            data: {
                contact
            }
        })
    } catch (error: any) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

const updateContact = async (req: any, res: Response): Promise<any> => {
    try {
        const updatedContact = await contactsRepositories.updateContact(req.params.id, req.body);
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "Contact updated successfully",
            data: {
                contact: updatedContact
            }
        })
    } catch (error: any) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

const deleteContact = async (req: any, res: Response): Promise<any> => {
    try {
        await contactsRepositories.deleteContact(req.params.id);
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "Contact deleted successfully"
        })
    } catch (error: any) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

export default {
    getAllUsersContacts,
    createNewContact,
    updateContact,
    deleteContact
}