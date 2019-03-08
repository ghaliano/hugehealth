import {User} from "./user.model";
import  {Status} from "./status.model";

export class Rdv{
    id: number;
    start_at: Date;
    type: string;
    status: Status;
    address: string;
    patient: User;
    doctor: User;
}
