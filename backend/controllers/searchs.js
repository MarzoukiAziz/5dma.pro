const Search = require("../models/Search");
const User = require("../models/user")

exports.createSearch = (req, res, next) => {
    const search = new Search({
        keys: req.body.keys,
        place: req.body.place,
        user: req.body.user,
    });
    search.date = new Date();

    search
        .save()
        .then(createdSearch => {
            res.status(201).json({
                message: "Search added successfully",
                Search: {
                    ...createdSearch,
                    id: createdSearch._id
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Creating a Search failed! " + error
            });
        });
};

exports.filtrerSearchs = (req, res, next) => {

    const uid = req.query.uid;

    let searchQuery = Search.find();

    searchQuery = searchQuery.where({ user: uid });




    searchQuery.limit(6);


    searchQuery

        .sort({ date: 'desc' })
        .then(documents => {
            res.status(200).json({
                message: "Searchs fetched successfully!",
                searchs: documents,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching Searchs failed! " + error
            });
        });
};

exports.deleteSearch = (req, res, next) => {
    Search.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({ message: "Deletion successful!" });
        })
        .catch(error => {
            res.status(500).json({
                message: "Deleting Search failed!"
            });
        });
};


