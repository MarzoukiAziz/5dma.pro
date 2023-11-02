const App = require("../models/App");
const User = require("../models/user")

exports.createApp = (req, res, next) => {


    const app = new App({
        job: req.body.job,
        user: req.body.user,
    });
    app.date = new Date();
    app.status = 'sent';
    app.comment = '';
    app
        .save()
        .then(createdApp => {
            res.status(201).json({
                message: "App added successfully",
                App: {
                    ...createdApp,
                    id: createdApp._id
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Creating a App failed! " + error
            });
        });
};

exports.filtrerApps = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const uid = req.query.uid;
    const status = req.query.status;

    let appQuery = App.find();
    let appQueryCount = App.find();

    if (uid) {
        appQuery = appQuery.where({ user: uid });
        appQueryCount = appQueryCount.where({ user: uid });
    }

    if (status != "all") {
        appQuery = appQuery.where({ status: status });
        appQueryCount = appQueryCount.where({ status: status });
    }
    count = 0
    appQueryCount
        .then(function (models) {
            count = models.length
        })


    if (pageSize && currentPage) {
        appQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }

    appQuery
        .populate({
            path: 'job',
            populate: {
                path: 'company'
            }
        })
        .sort({ date: 'desc' })
        .then(documents => {
            res.status(200).json({
                message: "Apps fetched successfully!",
                apps: documents,
                maxApps: count
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching Apps failed! " + error
            });
        });
};

exports.getApp = (req, res, next) => {
    App.findById(req.params.id)
        .populate('job')
        .then(app => {
            if (app) {
                res.status(200).json(app);
            } else {
                res.status(404).json({ message: "App not found!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching App failed!"
            });
        });
};

exports.deleteApp = (req, res, next) => {
    App.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({ message: "Deletion successful!" });
        })
        .catch(error => {
            res.status(500).json({
                message: "Deleting App failed!"
            });
        });
};

exports.updateApp = (req, res, next) => {
    const app = new App({
        _id: req.params.id,
        job: req.body.job,
        user: req.body.user,
        date: req.body.date,

        status: req.body.status,
        comment: req.body.comment,


    });
    App.updateOne({ _id: req.params.id }, app)
        .then(result => {
            res.status(200).json({ message: "Update successful!" });
        })
        .catch(error => {
            res.status(500).json({
                message: "Couldn't update job!"
            });
        });
};


exports.countApps = async (req, res, next) => {
    try {
        const uid = req.query.uid;
        let appQuery = App.find();

        if (uid) {
            appQuery = appQuery.where({ user: uid });
        }

        const models = await appQuery.exec();
        let sent = 0;
        let interview = 0;
        let rejected = 0;

        models.forEach(m => {
            if (m.status === "sent") sent++;
            if (m.status === "interview") interview++;
            if (m.status === "rejected") rejected++;
        });

        res.status(200).json({
            message: "Apps fetched successfully!",
            sent: sent,
            interview: interview,
            rejected: rejected
        });
    } catch (error) {
        res.status(500).json({
            message: "Fetching Apps failed! " + error.message
        });
    }
};
exports.getAppsIds = (req, res, next) => {

    const uid = req.query.uid;

    let appQuery = App.find();

    if (uid) {
        appQuery = appQuery.where({ user: uid });
    }
    appQuery
        .populate({
            path: 'job',
        })
        .sort({ date: 'desc' })
        .then(documents => {
            ids = []
            documents.forEach(doc => {
                ids.push(doc.job._id)
            })
            res.status(200).json({
                message: "Apps fetched successfully!",
                ids: ids,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching Apps failed! " + error
            });
        });
};
