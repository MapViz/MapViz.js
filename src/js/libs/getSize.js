var getIndex = function(index, classArr, perSize, series){

  var arrRes = new Array();
  for(var j = 1; j <= series; j++){
    arrRes.push(j * perSize);
  };

  var flag = 0;
  for (var i = 0; i < series; i++) {
    if (classArr[i] <= index && index <= classArr[i+1]) {
      flag = i;
      break;
    };
  };
  // var i = 0;
  // for (; i < series; i++) {
  //   if(index <= classArr[i])
  //     break;
  // };
  return arrRes[flag];
};
module.exports = getIndex;
