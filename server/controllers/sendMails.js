const nodemailer = require("nodemailer")
const express = require("express")
const sendMails = express.Router()
const Admin = require("../models/admin")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "tirumalarowthuv@gmail.com",
        pass: "dthqdtvsagsiuivp"
    }
})
///sending mail when applicant added .
sendMails.post("/add/send/:text", async (req, res) => {

    const { text } = req.params
    const data = await Admin.find({}, { email: 1, _id: 0 })
    const emails = await data.map(admin => {
        return admin.email
    })
    const mailOptions = {
        from: "ATS-App <tirumalarowthuv@gmail.com>",
        to: emails,
        subject: `New applicant ${text} added(Applicant-Tracking-System).`,
        text: `Hi, I hope this email finds you well.New Applicant ${text} added successfully.`
    }
    transporter.sendMail(mailOptions, async (err, info) => {
        if (err) {
            res.send(err.message)
        } else {
            res.send("Email sent successfully" + info.response)
        }
    })
})
//send mail when applicant status changed.
sendMails.post("/change/:changeby/:name/:text", async (req, res) => {
    const { name, text, changeby } = req.params
    const data = await Admin.findOne({ name: name })
    if (data) {
        const mailOptions = {
            from: "ATS-App <tirumalarowthuv@gmail.com>",
            to: data.email,
            subject: `Applicant ${text} status changed(Applicant-Tracking-System).`,
            text: `Hi,I am writing this mail to inform you that the status of ${text} has been changed by ${changeby} and also assigned you as the new owner of ${text}.So please reach out.`
        }
        transporter.sendMail(mailOptions, async (err, info) => {
            if (err) {
                res.send(err.message)
            } else {
                res.send("Email sent successfully " + info.response)
            }
        })
    } else {
        res.status(404).send("Email not found")
    }

})
//to: ['Technicalmanagerp2f@gmail.com', 'Hiringmanagerp2f@gmail.com', 'hrpfsemi5@gmail.com', 'akshata8178@gmail.com'],
module.exports = sendMails