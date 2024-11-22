exports.main = (req, res) => {
 const Datastore = require('nedb')
 const db = new Datastore({ filename: 'lvivarc.json', autoload: true })
db.find({"table":"arctype"}, (err, docs) => {
res.render(path + '/index2', { types: docs })
})
} 

// Функція для відправки сторінки 404
exports.error404 = (req, res) => {
  res.sendFile(path + '404.html'); // Відправка 404.html
};

exports.arcObject = (req, res) => {
  objId = parseInt(req.params.id)
  const Datastore = require('nedb')
  const db = new Datastore({ filename: 'lvivarc.json', autoload: true })
  db.findOne({ table:"arcobj", id:objId }, (err, doc) => {
    if (err) {
      console.log(err)
    } else {
      res.render(path + '/object', { object: doc })
    }
  })
 }

exports.listObjects = (req, res) => {
  ptId = parseInt(req.params.id);
  Datastore = require("nedb");
  db = new Datastore({ filename: "lvivarc.json", autoload: true });
  db.find({ table: "arcobj", type_id: ptId }, (err, docs) => {
    if (docs.length === 0) {
      res.sendFile(path + "error404.html");
    } else {
      db.findOne({ table: "arctype", id: ptId }, (err, doc) => {
        res.render(path + "/objects", { type: doc, objects: docs });
      });
    }
  });
};