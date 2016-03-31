//data is Array
/*
Data Classification Method:
  equal intervals: getEqInterval()
  quantiles: getQuantile()
  standard deviation: getStdDeviation()
  arithmetic progression: getArithmeticProgression()
  geometric progression： getGeometricProgression()
  jenks (natural breaks): getJenks()
  uniques values: getUniqueValues()
*/

/*
Key Words:
  eqinterval
  quantile
  stddeviation
  arithmetic
  geometric
  uniquevalues
  jenks
*/


var geostats = require("geostats");
var setClass = function(data, series, classificationMethod) {
  var classificationMethod = classificationMethod.toLowerCase();

  var ser = new geostats(data);
  ser.setPrecision(6);

  if (classificationMethod == "eqinterval") {
    var classfiedRes = ser.getEqInterval(series);
  } else if (classificationMethod == "quantile") {
    var classfiedRes = ser.getQuantile(series);
  } else if (classificationMethod == "stddeviation") {
    var classfiedRes = ser.getStdDeviation(series);
  } else if (classificationMethod == "arithmetic") {
    var classfiedRes = ser.getArithmeticProgression(series);
  } else if (classificationMethod == "geometric") {
    var classfiedRes = ser.getGeometricProgression(series);
  } else if (classificationMethod == "uniquevalues") {
    var classfiedRes = ser.getUniqueValues(series);
  } else if (classificationMethod == "jenks") {
    var classfiedRes = ser.getJenks(series);
  } else {
    throw new Error("Does not have " + classificationMethod + "; please check!");
    return;
  };
  
  // console.log("geostats object: ", ser);
  // console.log("classfiedRes ", classfiedRes);

  return classfiedRes;
  // var arrTemp = new Array();
  // var max = min = data[0];
  // data.map(function(item, index) {
  //   if (item >= max) {
  //     max = item;
  //   };
  //   if (item <= min) {
  //     min = item;
  //   }
  // });
  //
  // var ser = parseInt(series);
  // if (!ser) {
  //   throw new Error("Invalid series");
  //   return;
  // }
  // var interVal = (max - min) / ser;
  //
  // for (var i = 1; i < ser; i++) {
  //   var j = min + i * interVal;
  //   arrTemp.push(j);
  // };
  // arrTemp.push(max);
  //
  // console.log("max is", max, "min is ", min);

  // return arrTemp;
};

module.exports = setClass;
