module.exports = function(req, res, next) {
  const { session, method } = req;
  if (!session.user) {
    //CHECK IF REQ.SESSION HAS A USER PROPERTY
    session.user = {
      messages: []
    };
  }

  next();
};
