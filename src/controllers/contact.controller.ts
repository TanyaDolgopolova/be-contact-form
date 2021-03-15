import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import IControllerBase from '../app/common/IControllerBase';
import { config } from '../config/config';
import ContactService from '../services/contact.service';

class ContactController implements IControllerBase {
  private readonly router: Router;
  private readonly contactService: ContactService;

  constructor() {
    this.router = express.Router();
    this.contactService = new ContactService();
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      `${config.baseRoute}/contact`,
      (req: Request, res: Response, next: NextFunction) =>
        this.contactService.createContact(req, res, next)
    );
  }
}

export default ContactController;
