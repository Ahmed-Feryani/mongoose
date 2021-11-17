require("dotenv").config();

let mongoose = require("mongoose");
let PersonModel = require("./person");

// connect

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
  });

// Create and Save a Record of a Model:

let person = new PersonModel({
  name: "ahmed",
  age: 29,
  favoriteFoods: ["tomato", "banana"],
});

person.save((err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

//Create Many Records with model.create()

const arrayOfPeople = [
  {
    name: "person",
    age: 24,
    favoriteFoods: ["tomato", "banana"],
  },
  {
    name: "person2",
    age: 18,
    favoriteFoods: ["tomato2", "banana2"],
  },
  {
    name: "person3",
    age: 45,
    favoriteFoods: ["tomato3", "banana3"],
  },
];

PersonModel.create(arrayOfPeople, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

//find all the people having a given name

PersonModel.find({ name: "ahmed" }, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("qsfqd", data);
  }
});

//Find just one person which has a certain food in the person's favorites

const food = "banana";

PersonModel.findOne({ favoriteFoods: { $all: [food] } }, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

// Find the (only!!) person having a given _id
const personId = "0000000000000000";

PersonModel.findById(personId);

//Perform Classic Updates by Running Find, Edit, then Save

PersonModel.findById(personId, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    result.favoriteFoods.push("hamburger");
    result.save((err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  }
});

//Perform New Updates on a Document

PersonModel.findByIdAndUpdate(
  { name: "ahmed" },
  { age: 20 },
  { new: true },
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  }
);

//Delete One Document Using model.findByIdAndRemove

const personIdToDelete = "000000000000000000";

PersonModel.findByIdAndRemove(personIdToDelete, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

// Delete Many Documents

PersonModel.remove({ name: "Mary" }, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});
// Chain Search Query Helpers to Narrow Search Results
PersonModel.find({ favoriteFoods: { $all: ["burritos"] } })
  .sort({ name: "asc" })
  .limit(2)
  .select("-age")
  .sort()
  .exec((err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
