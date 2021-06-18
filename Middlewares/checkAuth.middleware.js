const express = require("express");
const jwt = require("jsonwebtoken");
const secret = process.env.secret;

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
