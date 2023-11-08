const Company = require("../models/company");

exports.createCompany = (req, res, next) => {

    const company = new Company({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        secteur: req.body.secteur,
        type: req.body.type,
        linkedin: req.body.linkedin,
        twitter: req.body.twitter,
        website: req.body.website,
        creationDate: req.body.creationDate,
        internationalPresence: req.body.internationalPresence,
        icon: req.body.icon,
    });
    company
        .save()
        .then(createdCompany => {
            res.status(201).json({
                message: "Company added successfully",
                company: {
                    ...createdCompany,
                    id: createdCompany._id
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Creating a company failed! " + error
            });
        });
};



exports.getCompanies = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const companyQuery = Company.find();
    let fetchedCompanies;
    if (pageSize && currentPage) {
        companyQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    companyQuery
        .then(documents => {
            fetchedCompanies = documents;
            return Company.count();
        })
        .then(count => {
            res.status(200).json({
                message: "Companies fetched successfully!",
                companies: fetchedCompanies,
                maxCompanies: count
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching Companies failed!"
            });
        });
};

exports.getCompany = (req, res, next) => {
    Company.findById(req.params.id)
        .then(company => {
            if (company) {
                res.status(200).json(company);
            } else {
                res.status(404).json({ message: "Company not found!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching company failed!"
            });
        });
};

exports.getAllCompanies = (req, res, next) => {

    Company.find()
        .then(documents => {
            res.status(200).json(
                documents
            );
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching companies failed!" + error
            });
        });
};

exports.deleteCompany = (req, res, next) => {
    Company.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({ message: "Deletion successful!" });

        })
        .catch(error => {
            res.status(500).json({
                message: "Deleting posts failed!"
            });
        });
};


exports.updateCompany = (req, res, next) => {

    const company = new Company({
        id: req.body._id,
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        secteur: req.body.secteur,
        type: req.body.type,
        linkedin: req.body.linkedin,
        twitter: req.body.twitter,
        website: req.body.website,
        creationDate: req.body.creationDate,
        internationalPresence: req.body.internationalPresence,
        icon: req.body.icon,
    });
    Company.updateOne({ _id: req.params.id }, company)
        .then(result => {
            res.status(200).json({ message: "Update successful!" });

        })
        .catch(error => {
            res.status(500).json({
                message: "Couldn't udpate post!"
            });
        });
};




exports.filtrerCompanies = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const companyQuery = Company.find();
    let companyQueryCount = Company.find();
    const keywords = req.query.keywords;
    const keywordArray = keywords.split(' ').map(keyword => new RegExp(keyword, 'i'));

    if (keywords) {
        companyQuery.and([
            {
                $or: [
                    { name: { $in: keywordArray } },
                    { description: { $in: keywordArray } },
                    { secteur: { $in: keywordArray } },
                    { location: { $in: keywordArray } }
                ]
            }
        ]);
        companyQueryCount.and([
            {
                $or: [
                    { name: { $in: keywordArray } },
                    { description: { $in: keywordArray } },
                    { secteur: { $in: keywordArray } },
                    { location: { $in: keywordArray } }

                ]
            }
        ]);
    }




    count = 0

    companyQueryCount
        .then(function (models) {
            count = models.length
        }).then(_ => {
            companyQuery.sort({ name: 'asc' })

            if (pageSize && currentPage) {
                companyQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
            }
            companyQuery
                .then(documents => {
                    res.status(200).json({
                        message: "Companies fetched successfully!",
                        companies: documents,
                        maxCompanies: count
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Fetching Companies failed!"
                    });
                });
        })

};
