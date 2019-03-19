import R, { init as rematchInit, createModel, RematchRootState } from '@rematch/core';

function formatModels(obj: R.Models): R.Models {
  const models: R.Models = {};
  Object.keys(obj).forEach((key: string) => {
    const { actions, ...rest } = obj[key];
    models[key] = {
      ...rest,
      effects: actions,
      reducers: {
        setState: (state, payload) => ({
          ...state,
          ...payload,
        }),
      },
    };
  });

  return models;
}

function init(initConfig: R.InitConfig = {}): R.RematchStore {
  const config = initConfig;
  let { models } = initConfig;
  if (models) {
    config.models = formatModels(models);
  }
  return rematchInit(config);
}

export {
  init,
  createModel,
  RematchRootState,
}
