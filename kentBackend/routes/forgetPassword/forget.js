var express = require('express');
var router = express.Router();
var conn = require('../../db');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const bcrypt = require('bcryptjs');
const saltRounds = 10;


const JWT_SECRET = 'kentWater';


/* GET users listing. */
router.post('/', function (req, res, next) {
    const { email } = req.body;
    conn.query("SELECT * FROM users WHERE email=?",
        [email],
        function (err, resp) {
            if (err) {
                console.error("An error occurred:", err.message);
                res.status(500).json({ status: 500, error: "An error occurred: " + err.message });
            }
            else {
                if (resp.length) {
                    //now create One Time Link to reset password
                    const secret = JWT_SECRET + resp[0].password
                    const payload = {
                        email: resp[0].email,
                        id: resp[0].id
                    }
                    const token = jwt.sign(payload, secret, { expiresIn: '15m' })
                    const link = `${process.env.CLIENT_URL}/forgetPassword/${resp[0].id}/${token}`
                    //send link to email
                    const sgMail = require('@sendgrid/mail')
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
                    const msg = {
                        to: email, // Change to your recipient
                        from: 'info@kentwater.ca', // Change to your verified sender
                        subject: 'Reset Password Kent Water',
                        html: `<p>Password Reset link valid for 15 Minutes<br/><a href="${link}">Click here for Genrate New Password</a></p>`,
                      }
                      sgMail
                        .send(msg)
                        .then(() => {
                            success = true;
                            res.send({ status: 200, success, response: "Password Reset link has been send to your Email ID" })
                        })
                        .catch((error) => {
                            res.send({ status: 200, success, error: error })
                        })


                } else {
                    //user not fond
                    success = false;
                    res.status(404).send({ status: 404, success, error: "User Not Found with this Email ID" });
                }
            }
        }


    )
});

router.post('/valid/:id/:token', function (req, res, next) {
    const { id, token } = req.params;
    //check user in database
    conn.query("SELECT * FROM users WHERE id=?",
        [id],
        function (err, resp) {
            if (err) {
                console.error("An error occurred:", err.message);
                res.status(500).json({ status: 500, error: "An error occurred: " + err.message });
            }
            else {
                if (resp.length) {
                    //now create One Time Link to reset password
                    const secret = JWT_SECRET + resp[0].password
                    try {
                        const payload = jwt.verify(token, secret)
                        res.status(200).json({ status: 200, response: "Link Verify" });

                    } catch (error) {
                        // console.log(error.message)
                        success = true;
                        res.status(200).json({ status: 200, success, response: "Invalid Link" });
                    }
                } else {
                    //user not fond
                    success = false;
                    res.status(404).send({ status: 404, success, error: "User Not Found" });
                }
            }
        }
    )
});

router.post('/:id/:token', function (req, res, next) {
    const { id, token } = req.params;
    const password = req.body.password;
    //check user in database
    conn.query("SELECT * FROM users WHERE id=?",
        [id],
        function (err, resp) {
            if (err) {
                console.error("An error occurred:", err.message);
                res.status(500).json({ status: 500, error: "An error occurred: " + err.message });
            }
            else {
                if (resp.length) {
                    //now create One Time Link to reset password
                    const secret = JWT_SECRET + resp[0].password
                    try {
                        const payload = jwt.verify(token, secret)

                        bcrypt.hash(password, saltRounds, (err, hash) => {

                            if (err) {
                                console.log(err);
                            }

                            let sql = "UPDATE users SET password='" + hash + "' WHERE id=" + id;
                            let query = conn.query(sql, (err, result) => {
                                if (err) {
                                    console.log(err)
                                }
                                success = true;
                                res.send(JSON.stringify({ status: 200, success, error: null, response: "Password updated SuccessFully" }));
                            });
                        })

                    } catch (error) {
                        // console.log(error.message)
                        res.status(500).json({ status: 500, error: "Invalid Link" });
                    }
                } else {
                    //user not fond
                    success = false;
                    res.status(404).send({ status: 404, success, error: "User Not Found" });
                }
            }
        }
    )
});
module.exports = router;

