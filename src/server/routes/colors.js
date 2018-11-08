const express = require("express");
const router = express.Router();

// sw-colors.json is a created from a python script that combines .abd files downloaded from sherwin-williams.com
const colors = require("./sw-colors.json");

const createColorObject = (x, data) => {
  return {
    name: x,
    number: data[x].number,
    locator: data[x].locator,
    color: `rgb(${data[x].r},${data[x].g},${data[x].b})`
  };
};

const getLocatorByNumber = (data, number) => {
  var colors = [];
  for (var x in data) {
    if (data[x].number.toString().startsWith(number)) {
      colors.push(createColorObject(x, data));
    }
  }
  return colors.sort((a, b) => {
    return parseFloat(a.number) - parseFloat(b.number);
  });
};

const getLocatorByName = (data, name) => {
  var colors = [];
  for (var x in data) {
    if (
      x
        .toString()
        .toLowerCase()
        .indexOf(name.toString().toLowerCase()) > -1
    ) {
      colors.push(createColorObject(x, data));
    }
  }

  return colors.sort((a, b) => {
    return (a.name > b.name) - (a.name < b.name);
  });
};

router.get("/:any", function(req, res) {
  var searchTerm = req.params.any;
  var data;
  if (searchTerm.match(/\d{2,4}/)) {
    data = getLocatorByNumber(colors, searchTerm);
  } else {
    data = getLocatorByName(colors, searchTerm);
  }
  res.send({ results: data });
});

module.exports = router;
