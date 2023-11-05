const Job = require("../models/job");

exports.createJob = (req, res, next) => {

    const job = new Job({
        title: req.body.title,
        contract: req.body.contract,
        location: req.body.location,
        date: new Date(),
        remote: req.body.remote,
        details: req.body.details,
        function: req.body.function,
        startingDate: req.body.startingDate,
        deadline: req.body.deadline,
        link: req.body.link,
        company: req.body.company,
        expired: req.body.expired
    });
    job
        .save()
        .then(createdJob => {
            res.status(201).json({
                message: "Job added successfully",
                job: {
                    ...createdJob,
                    id: createdJob._id
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Creating a job failed! " + error
            });
        });
};

exports.getJobs = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const jobQuery = Job.find();
    let fetchedJobs;
    if (pageSize && currentPage) {
        jobQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    jobQuery
        .populate('company')
        .find({ expired: false })
        .sort({ date: 'desc' })
        .then(documents => {
            fetchedJobs = documents;
            return Job.count();
        })
        .then(count => {
            res.status(200).json({
                message: "Jobs fetched successfully!",
                jobs: fetchedJobs,
                maxJobs: count
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching Jobs failed!"
            });
        });
};

exports.filtrerJobs = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const keywords = req.query.keywords;
    const location = req.query.location;
    const expired = req.query.expired;
    const range = req.query.range;
    const keywordArray = keywords.split(' ').map(keyword => new RegExp(keyword, 'i'));


    let jobQuery = Job.find();
    let jobQueryCount = Job.find();

    if (keywordArray.length) {
        jobQuery.and([
            {
                $or: [
                    { title: { $in: keywordArray } },
                    { details: { $in: keywordArray } },
                    { function: { $in: keywordArray } }
                ]
            }
        ]);
        jobQueryCount.and([
            {
                $or: [
                    { title: { $in: keywordArray } },
                    { details: { $in: keywordArray } },
                    { function: { $in: keywordArray } }
                ]
            }
        ]);
    }


    if (location) {
        jobQueryCount = jobQueryCount.where({ location: new RegExp(location, 'i') });
        jobQuery = jobQuery.where({ location: new RegExp(location, 'i') });
    }

    if (expired == 'false') {
        jobQuery = jobQuery.where({ expired: false })
        jobQueryCount = jobQueryCount.where({ expired: false })
    }
    count = 0



    if (range === '1') {
        const r = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
        jobQuery = jobQuery.where({ date: { $gte: r } });
        jobQueryCount = jobQueryCount.where({ date: { $gte: r } });

    }
    if (range === '7') {
        const r = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        jobQuery = jobQuery.where({ date: { $gte: r } });
        jobQueryCount = jobQueryCount.where({ date: { $gte: r } });

    }
    if (range === '30') {
        const r = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        jobQuery = jobQuery.where({ date: { $gte: r } });
        jobQueryCount = jobQueryCount.where({ date: { $gte: r } });

    }

    if (pageSize && currentPage) {
        jobQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);

    }

    jobQueryCount
        .then(function (models) {
            count = models.length
        }).then(_ => {
            jobQuery
                .populate('company')
                .sort({ date: 'desc' })
                .then(documents => {
                    res.status(200).json({
                        message: "Jobs fetched successfully!",
                        jobs: documents,
                        maxJobs: count
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Fetching Jobs failed! " + error
                    });
                });
        })

};



exports.getAllJobs = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const jobQuery = Job.find();
    let fetchedJobs;
    if (pageSize && currentPage) {
        jobQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    jobQuery
        .populate('company')
        .sort({ date: 'desc' })
        .then(documents => {
            fetchedJobs = documents;
            return Job.count();
        })
        .then(count => {
            res.status(200).json({
                message: "Jobs fetched successfully!",
                jobs: fetchedJobs,
                maxJobs: count
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching Jobs failed!"
            });
        });
};

exports.getJob = (req, res, next) => {
    Job.findById(req.params.id)
        .populate('company')
        .then(job => {
            if (job) {
                res.status(200).json(job);
            } else {
                res.status(404).json({ message: "Job not found!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching job failed!"
            });
        });
};

exports.deleteJob = (req, res, next) => {
    Job.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({ message: "Deletion successful!" });
        })
        .catch(error => {
            res.status(500).json({
                message: "Deleting job failed!"
            });
        });
};

exports.updateJob = (req, res, next) => {
    const job = new Job({
        _id: req.params.id,
        title: req.body.title,
        contract: req.body.contract,
        location: req.body.location,
        date: req.body.date,
        remote: req.body.remote,
        details: req.body.details,
        function: req.body.function,
        startingDate: req.body.startingDate,
        deadline: req.body.deadline,
        link: req.body.link,
        company: req.body.companyId,
        expired: req.body.expired

    });
    Job.updateOne({ _id: req.params.id }, job)
        .then(result => {
            res.status(200).json({ message: "Update successful!" });
        })
        .catch(error => {
            res.status(500).json({
                message: "Couldn't update job!"
            });
        });
};