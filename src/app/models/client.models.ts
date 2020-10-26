export interface Client {
    apellido: string;
    edad: number;
    fecha_nac: string;
    nombre: string;
    error?: string;
}

export interface clients {
    clients: Client[];
}