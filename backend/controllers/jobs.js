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

exports.filterJobs = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const keywords = +req.query.keywords;
    const location = +req.query.keywords;
    const jobQuery = Job.find();

    const keywordArray = keywords.split(' ').map(keyword => new RegExp(keyword, 'i'));

    let fetchedJobs;
    if (pageSize && currentPage) {
        jobQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    jobQuery
        .populate('company')
        .find({ expired: false })
    find({
        $and: [
            {
                $or: [
                    { title: keywordArray },
                    { details: keywordArray },
                    { function: keywordArray }
                ]
            },
            { location: location }
        ]
    })
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