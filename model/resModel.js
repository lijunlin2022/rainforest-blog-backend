class BaseModel {
  constructor(code, data, message) {
    this.code = code;
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(code, data, message) {
    // 如果只有 data 和 message
    if (typeof code === "object") {
      super(200, code, data);
    }
    // 如果只有 message
    else if (typeof code === "string") {
      super(200, null, code);
    }
    // 如果什么都没有
    else if (typeof code === "undefined") {
      super(200, null, null);
    }
    else {
      super(code, data, message);
    }
  }
}

class ErrorModel extends BaseModel {
  constructor(code, data, message) {
    // 如果只有 data 和 message
    if (typeof code === "object") {
      super(500, code, data);
    }
    // 如果只有 message
    else if (typeof code === "string") {
      super(500, null, code);
    }
    // 如果什么都没有
    else if (typeof code === "undefined") {
      super(500, null, null);
    }
    else {
      super(code, data, message);
    }
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
};