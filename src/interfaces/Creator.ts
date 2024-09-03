export interface Creator {
  createdAt: string; // ou Date, se você preferir lidar com datas como objetos Date
  description: string;
  name: string;
  piadas: string[]; // Array de IDs das piadas
  updatedAt: string; // ou Date
  __v: number;
  _id: string;
}
