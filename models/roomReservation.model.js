const { text } = require("body-parser");
const mongoose = require("mongoose");

const roomReservationSchema = mongoose.Schema({
  id: Number,
  roomType: String,
  noOfAdults: Number,
  checkIn: Date,
  checkOut: Date,
  firstName: String,
  lastName: String,
  email: String,
  country: String,
  address: String,
  city: String,
  postalCode: String,
  phone: Number,
  fax: Number,
  specialRequests: String,
  transactionId: Number,
});
const roomReservationModel = mongoose.model(
  "roomReservation",
  roomReservationSchema
);

exports.findRoomReservation = async (req) => {
  let data = await roomReservationModel.findOne({
    roomType: req.roomType,
    checkIn: req.checkIn,
    checkOut: req.checkOut,
  });
  if (!data) {
    return false;
  } else {
    return true;
  }
};

exports.addRoomReservation = async (req) => {
  let id = Object.keys(await roomReservationModel.find({})).length++;
  let db = {
    id: ++id,
    roomType: req.roomType,
    noOfAdults: +req.noOfAdults,
    checkIn: req.checkIn,
    checkOut: req.checkOut,
    firstName: req.firstName,
    lastName: req.lastName,
    email: req.email,
    country: req.country,
    address: req.address,
    city: req.city,
    postalCode: req.postalCode,
    phone: +req.phone,
    fax: +req.fax,
    specialRequests: req.specialRequests,
  };
  await roomReservationModel.create(db);
  console.log("success");
};

exports.getAllReservations = async () => {
  let data = await roomReservationModel.find({});
  return data;
};
