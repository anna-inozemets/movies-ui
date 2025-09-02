export type MovieFormat = 'VHS' | 'DVD' | 'Blu-Ray';
export type MoviePayload = {
  title: string;
  year: number;
  format: MovieFormat;
  actors: string[];
};
export type ActorDetailed = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export type Movie = {
  id: number;
  title: string;
  year: number;
  format: MovieFormat;
  actors: ActorDetailed[]
};