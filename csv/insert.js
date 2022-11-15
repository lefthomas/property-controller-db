const Property = require("../models/Property");

const csv = require("csv-parser");
const fs = require("fs");
const results = [];

fs.createReadStream("Book3.csv")
  .pipe(csv({}))
  .on("data", (data) => results.push(data))
  .on("end", () => {
    for (const result of results) {
      Property.create(result);
    }
  });
