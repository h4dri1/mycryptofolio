const logMiddleware = (store) => (next) => (action) => {
  console.log(store.getState());
  console.log('Je laisse passer cette action: ', action);
  next(action);
};

export default logMiddleware;
