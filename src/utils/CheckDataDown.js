import _ from "lodash";

function CheckDataDown(data) {
  if (_.isEmpty(data) || data.length < 1) {
    return { messages: "Data Available", status: false };
  } else {
    if (typeof data === "object") {
      for (let key in data) {
        if (data[key] === "") {
          return { key: `${key} Available`, status: false };
        }
      }
      return { messages: "Ok", status: true };
    }
  }
}

export default CheckDataDown;
