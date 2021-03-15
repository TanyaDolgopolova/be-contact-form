import { NextFunction, Request, Response } from 'express';
import HttpException from '../app/common/HttpException';
import { IContact } from '../app/common/interfaces/IContact';
import ContactRepository from '../repositories/contact.repository';

class ContactService {
  private readonly contactRepository: ContactRepository;

  constructor() {
    this.contactRepository = new ContactRepository();
  }

  public async createContact(req: Request, res: Response, next: NextFunction) {
    const body = req.body as IContact;

    if (!body || Object.getOwnPropertyNames(body).length === 0) {
      return next(new HttpException(400, 'No data provided.'));
    }

    if (!body.name || body.name.length === 0) {
      return next(new HttpException(400, 'Name cannot be empty.'));
    }
    if (!body.email || body.email.length === 0) {
      return next(new HttpException(400, 'Email cannot be empty.'));
    }
    if (!body.message || body.message.length === 0) {
      return next(new HttpException(400, 'Message cannot be empty.'));
    }

    const resp = await this.contactRepository.createContact(body);
    if (!resp) {
      return next(new HttpException(500, 'Internal server error.'));
    }

    return res.status(200).send({ status: 'OK', message: null });
  }
}

export default ContactService;
