function isExisted() {
  for (var i = 0; i < arguments.length; i++) {
    if(!arguments[i]){
      throw new Error("There is a " + arguments[i] + " in isExisted");
      return;
    }
  }
};
module.exports = isExisted;
