export interface IService {
  [key: string]: {
    payload: unknown;
    response: unknown;
  };
}

export type IServiceImplementation<Service> = {
  [Key in keyof Service]: {
    endpoint: string;
  };
};
