export interface IService {
    [key: string]: {
      payload: any;
      response: any;
    };
  }

export type IServiceImplementation<Service> = {
    [Key in keyof Service]: {
      endpoint: string;
    };
  };
  
