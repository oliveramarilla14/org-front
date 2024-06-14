import type { AxiosError } from 'node_modules/axios/index.d.cts';

export interface CustomAxiosError {
  statusCode: number;
  message: string;
  _axiosData: {
    code: AxiosError['code'];
    message: AxiosError['message'];
    name: AxiosError['name'];
  };
}

// {
//   statusCode: error.response?.status,
//   message: error.response?.data.message,
//   _axiosData: {
//     code: error.code,
//     message: error.message,
//     name: error.name
//   }
// };
