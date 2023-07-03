const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const fromEmail = "burduzhad@meta.ua";


const sendEmail = async(data) => {
    const email = {...data, from: fromEmail};
    try {
        await sgMail.send(email)
        return true;
    } catch  {
        throw error;
    }
}

module.exports = sendEmail