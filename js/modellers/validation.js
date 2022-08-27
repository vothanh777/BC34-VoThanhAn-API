function Validation() {
  //Kiểm tra nhập hay chưa? hay kiểm tra rỗng
  this.kiemTraRong = function (value, errorId, message) {
    if (value === "") {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = message;
      return false;
    }
    getEle(errorId).style.display = "none";
    getEle(errorId).innerHTML = "";
    return true;
  };

  //Kiểm tra độ dài ký tự
  this.kiemTraDoDaiKyTu = function (value, errorId, message, min, max) {
    var length = value.length;
    if (length < min || length > max) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = message;
      return false;
    }
    getEle(errorId).style.display = "none";
    getEle(errorId).innerHTML = "";
    return true;
  };

  //Kiểm tra dữ liệu nhập vào là ký tự số từ 0-9
  this.kiemTraKyTuSo = function (value, errorId, message) {
    var letter = /^[0-9]+$/;
    if (value.match(letter)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = message;
    return false;
  };

  //Kiểm tra dữ liệu nhập vào là ký tự chuỗi tiếng Việt a á ấ --> y
  this.kiemTraKyTuChu = function (value, errorId, message) {
    // var letter = "^[A-Za-z]+$";
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = message;
    return false;
  };

  //Kiểm tra dữ liệu nhập vào đúng định dạng email
  this.kiemTraEmail = function (value, errorId, message) {
    // var letter = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
    // var letter =
    //   /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;
    var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(letter)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = message;
    return false;
  };

  //Kiểm tra mật khẩu nhập vào đúng cú pháp
  this.kiemTraMatKhau = function (value, errorId, message) {
    // var letter = /^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*s).{0,}$/;
    var letter =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (value.match(letter)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = message;
    return false;
  };

  //Kiểm tra selection
  this.kiemTraSelection = function (selectionId, errorId, message) {
    var selection = getEle(selectionId);
    if (selection.selectedIndex == 0) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = message;
      return false;
    }
    getEle(errorId).style.display = "none";
    getEle(errorId).innerHTML = "";
    return true;
  };

  this.kiemTraDuyNhat = function (value, errorId, message, list) {
    var isUnique = list.some(function (nv) {
      return nv.taiKhoan === value;
    });
    if (isUnique) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = message;
      return false;
    }
    getEle(errorId).style.display = "none";
    getEle(errorId).innerHTML = "";
    return true;
  };
}
