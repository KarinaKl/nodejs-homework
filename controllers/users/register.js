const {Conflict} = require("http-errors");
const gravatar = require("gravatar");
const {nanoid} = require("nanoid");

const {sendEmail} = require("../../helpers");
const {User} = require("../../models");

const register = async(req, res) => {
    const {name, email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        throw new Conflict("Email in use")
    }
    const verificationToken = nanoid();
    const avatarURL = gravatar.url(email);
    const newUser = new User({name, email, avatarURL, verificationToken});
    await newUser.setPassword(password);
    await newUser.save();

    const mail = {
        to: email,
        subject: "Підтвердження email",
        html: `<a target="_blank" href="http://localhost:3000/api/usersInfo/verify/${verificationToken}">підтвервети email</a>`
    };
    
    await sendEmail(mail);

    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                email,
                name,
                avatarURL,
                verificationToken,
            }
        }
    })
};

module.exports = register;