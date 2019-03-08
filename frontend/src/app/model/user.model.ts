import {Speciality} from "./speciality.model";
import {Rdv} from "./rdv.model";

export class User{
    id: number;
    firstname: string;
    lastname: string;
    tel: string;
    email: string;
    address: string;
    born_at: Date;
    rdvs: Array<Rdv>;
    doctorRdvs: Array<Rdv>;
    specialities: Array<Speciality>;
    plainPassword: string;
    username: string;
    roles: Array<string>;
}
