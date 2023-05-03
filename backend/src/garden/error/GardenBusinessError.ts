export const GardenBusinessErrors = {
  NotFound: {
    apiErrorCode: 'E_0002_0002',
    errorMessage: 'Garden Not Found',
    reason: `Provided garden id not found`,
  },
  ExistedGarden: (id: number) => {
    return {
      apiErrorCode: 'E_0002_0003',
      errorMessage: 'Existed Garden',
      reason: `Provided garden is existed, id:${id}`,
    };
  },
  DuplicatedGarden: (name:string) => {
    return {
      apiErrorCode: 'E_0002_0004',
      errorMessage: 'Duplicated Garden',
      reason: `Provided garden is existed, ${name}`,
    };
  },
  InvalidPushToken: (name:string) => {
    return {
      apiErrorCode: 'E_0002_0005',
      errorMessage: 'Invalid Push Token',
      reason: `Your push token is Invalid, ${name}`,
    };
  },
};
