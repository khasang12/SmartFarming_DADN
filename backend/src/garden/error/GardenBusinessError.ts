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
};
