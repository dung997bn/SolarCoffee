import axios from "axios";
import { IInvoice } from "@/types/Invoice";

export class InvoiceService {
    API_URL = process.env.VUE_APP_API_URL;

    public async makeNewInvoice(invoice: IInvoice): Promise<boolean> {
        const now = new Date();
        invoice.createdOn = now;
        invoice.updatedOn = now;
        const result: any = await axios.post(`${this.API_URL}/invoice/`, invoice);
        return result.data;
    }

}