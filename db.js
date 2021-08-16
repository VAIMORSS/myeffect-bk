const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
let pass = encodeURIComponent("bbms@atlas");
mongoose.connect(`mongodb://bbms:${pass}@cluster0-shard-00-00-enqlo.mongodb.net:27017,cluster0-shard-00-01-enqlo.mongodb.net:27017,cluster0-shard-00-02-enqlo.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`, { useNewUrlParser: true }).then(() => {
  console.log("db connected");
});
mongoose.Promise = global.Promise;

module.exports = {
  User: require('./models/User'),
};
