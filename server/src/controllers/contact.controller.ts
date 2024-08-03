import { Request, Response, NextFunction } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import { BadRequestError } from "../error/BadRequestError";
import prisma from "../database/database";
import httpStatusCodes from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";

interface CreateRequest extends Request {
  body: {
    name: string;
    email: string;
    message: string;
    phone: string;
  };
}

const logger = loggerWithNameSpace("ContactLogger");

export const createContact = CatchAsync(
  async (req: CreateRequest, res: Response, next: NextFunction) => {
    const { name, email, message, phone } = req.body;

    console.log(req.body);

    if (!name || !email || !message || !phone) {
      return next(
        new BadRequestError("Name, Email , Phone and Message are required")
      );
    }

    const contact = await prisma.contact.create({
      data: { name, email, message, phone },
    });

    logger.info("Contact created successfully");
    res.status(httpStatusCodes.CREATED).json({
      status: 201,
      message: "Message Send successfully",
      data: contact,
    });
  }
);

export const getAllContacts = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const contacts = await prisma.contact.findMany();

    logger.info("Contacts fetched successfully");

    res.status(httpStatusCodes.OK).json({
      status: 200,
      results: contacts.length,
      message: "Contacts fetched successfully",
      data: contacts,
    });
  }
);

export const deleteContact = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { contactId } = req.params;

    const contact = await prisma.contact.delete({
      where: { id: Number(contactId) },
    });

    if (!contact) {
      return next(new BadRequestError("Contact not found"));
    }
    logger.info(`Contact deleted with id: ${contactId}`);
    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Contact deleted successfully",
    });
  }
);
