import { IContact } from "../app/common/interfaces/IContact";

class ContactRepository {

    // here must be saving to the database, if needed
    public async createContact(data: IContact): Promise<boolean> {
        return true;
    }
}

export default ContactRepository;