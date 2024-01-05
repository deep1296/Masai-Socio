const asyncHandler = (requestHandler) => {
   return (req, res, next) => {
      try {
         Promise.resolve(requestHandler(req, res, next));
      } catch (error) {
         return next(error);
      }
   };
};

export default asyncHandler;
