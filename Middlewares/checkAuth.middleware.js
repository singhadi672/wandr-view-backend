const express = require("express");
const jwt = require("jsonwebtoken");
const secret = 'cj2A4RjTiikf83QMpiOZ+qYvvAQNJMLtzjn90O8j6ApJtcdS18JCminhrjgTpCKEKRzbNSxqYln+0sPiM92gscVJymz6jjHtM9H+SrhVbPzi1tmtbhYxxY3tMnkrWk0vlxmW3kby04H/T7xhx7OtRH2aECV1iG9v6DeSjkfFJh05XVzdfThgcmT6BIq7l2XOUor8gtVmg+tcXWQmwvOK5vpifbWO/Sw8eO659wDVF4X5wpIKPgXqn96SBFFOwb3PWpFLRQTZSgBOP0hwEPKICFOPaCpcXVtu978uez/3YVWNc0Yir1BMSzEt8qs8gfimm339KIGs0p7D9zkWLiuUrg=='
const saltRounds = 10;

function checkAuth(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, secret);
    req.user = { userID: decoded.userID };
    next();
  } catch (error) {
    res.status(401).json({ status: false, error });
  }
}

module.exports = checkAuth;
