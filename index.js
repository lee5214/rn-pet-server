const express = require("express");const app = express();const allPetDataUploadToFirestore = require("./services/allPetDataUploadToFirestore");const orgsDataUploadToFirestore = require("./services/orgsDataUploadToFirestore");const orgsGeoPointsUploadToDatabase = require('./services/orgsGeoPointsUploadToDatabase')const test = require("./services/test");//const data = "./public/PetsData/KJquDhsf_newpets_1.json";//const data2 = require("./public/PetsData/KJquDhsf_pets_1");const PORT = 3000;const fs = require("fs");const readline = require("readline");const admin = require("firebase-admin");const serviceAccount = require("./config/credential");//const devKeys = require("./config/credential");// firestore setup// admin.initializeApp({//   credential: admin.credential.cert(serviceAccount.firestoreCredential),//   databaseURL: "https://rn-test-8a3b0.firebaseio.com"// });const firestore = admin.firestore();const realtimeDB = admin.database()app.get("/", (req, res) => {  res.send(    '<a href="/upload_pets_firestore" class="btn">upload pets data into firestore</a><br/><a' +    ' href="/upload_orgs_firestore" class="btn">upload orgs data into firestore</a><br/>><a' +    ' href="/upload_orgsGeo" class="btn" >upload orgs data into fireDB</a>'  )});// the entry point to execute firestore uploading methodapp.get("/upload_pets_firestore", (req, res) => {  allPetDataUploadToFirestore(firestore);});app.get("/upload_orgsGeo", (req, res) => {  orgsGeoPointsUploadToDatabase();});app.get("/upload_orgs_firestore", (req, res) => {  orgsDataUploadToFirestore(firestore);});app.get("/test", (req, res) => {  test();});app.use("/static", express.static(__dirname + "/public/PetsData"));app.listen(PORT);