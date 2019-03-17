const debug = require("debug")("app:searchControllers");
const { MongoClient, ObjectId } = require("mongodb");

const searchResults = [
  {
    _id: "Mohan",
    text: "Mohan",
    result: "Mohan"
  },
  {
    _id: "Mohan",
    text: "Mohan2",
    result: "Mohan2"
  }
];

function searchControllers(searchervice, nav) {
  function getIndex(req, res) {
    debug("Mongodb Connection would be established!");
    res.render("searchListView", {
      nav,
      searchResults,
      title: "Searchengine"
    });
  }

  function getById(req, res, next) {
    const { id } = req.params;
    const url = "mongodb://localhost:27017";
    const dbName = "libraryApp";
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const search = await db.collection("search");
        console.log("Mongodb Connected!");
        const search = await search.findOne({ _id: new ObjectId(id) });
        console.log("searchd retrieved!" + JSON.stringify(req.search));

        search.details = await searchervice.getsearchById(search.searchId);
        debug("Mongodb Connected!" + JSON.stringify(search.details));

        res.render("searchView", {
          nav,
          search,
          title: "My Library from variable"
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
      next();
    })();
  }

  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect("/");
    }
  }

  return { getIndex, getById, middleware };
}
module.exports = searchControllers;
