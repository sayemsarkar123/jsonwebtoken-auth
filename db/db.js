const mongoose = require('mongoose');

module.exports.intializeMongoDB = function () {
  const uri = process.env.URI;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  };

  mongoose.connect(uri, options, function (err) {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log('Successfully Connected to MongoDB!');
    }
  });
};
