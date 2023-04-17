export interface IContact {
    name: string,
    number: string,
    id: string
}

export type ContactWithoutId = Omit<IContact, 'id'>