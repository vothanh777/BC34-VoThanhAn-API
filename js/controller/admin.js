var service = new Service();
var validation = new Validation();
var listData = [];

function getEle(id) {
  return document.getElementById(id);
}

function renderHTML(data) {
  var content = "";
  data.forEach(function (obj, index) {
    content += `
        <tr>
          <td>${index + 1}</td>
          <td>${obj.taiKhoan}</td>
          <td>${obj.matKhau}</td>
          <td>${obj.hoTen}</td>
          <td>${obj.email}</td>
          <td>${obj.ngonNgu}</td>
          <td>${obj.loaiND}</td>
          <td>
            <button class="btn btn-secondary" data-toggle="modal"
            data-target="#myModal" onclick="editData(${obj.id})">Edit</button>
            <button class="btn btn-danger" onclick="deleteData(${
              obj.id
            })">Delete</button>
          </td>
        </tr>
      `;
  });
  getEle("tblDanhSachNguoiDung").innerHTML = content;
}

function fetchData() {
  // getEle("loading").style.display = "block";

  service
    .getListData()
    .then(function (result) {
      renderHTML(result.data);
      listData = result.data;
      // getEle("loading").style.display = "none";
    })
    .catch(function (error) {
      console.log(error);
      // getEle("loading").style.display = "none";
    });
}

fetchData();

//Delete
function deleteData(id) {
  service
    .deleteDataApi(id)
    .then(function () {
      fetchData();
    })
    .catch(function (error) {
      console.log(error);
    });
}

getEle("btnThemNguoiDung").addEventListener("click", function () {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm dữ liệu";

  var btnAdd = `<button class="btn btn-success" onclick="addData()">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
});

//Add
function addData() {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  var isValid = validateInputs(
    taiKhoan,
    hoTen,
    matKhau,
    email,
    hinhAnh,
    loaiND,
    ngonNgu,
    moTa
  );
  if (isValid) {
    var data = new Teacher(
      "",
      taiKhoan,
      hoTen,
      matKhau,
      email,
      loaiND,
      ngonNgu,
      moTa,
      hinhAnh
    );

    service
      .addDataApi(data)
      .then(function () {
        fetchData();

        //close modal
        document.getElementsByClassName("close")[0].click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

//Edit
function editData(id) {
  //Edit modal title
  document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa dữ liệu";

  //Create btn Update
  var btnUpdate = `<button class="btn btn-success" onclick="updateData(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

  service
    .getDataById(id)
    .then(function (result) {
      getEle("TaiKhoan").value = result.data.taiKhoan;
      getEle("TaiKhoan").disabled = true;
      getEle("HoTen").value = result.data.hoTen;
      getEle("MatKhau").value = result.data.matKhau;
      getEle("Email").value = result.data.email;
      getEle("HinhAnh").value = result.data.hinhAnh;
      getEle("loaiNguoiDung").value = result.data.loaiND;
      getEle("loaiNgonNgu").value = result.data.ngonNgu;
      getEle("MoTa").value = result.data.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
}

//Update
function updateData(id) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  var data = new Teacher(
    id,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );

  service
    .updateDataApi(data)
    .then(function () {
      fetchData();
      //close modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function validateInputs(
  taiKhoan,
  hoTen,
  matKhau,
  email,
  hinhAnh,
  loaiND,
  ngonNgu,
  moTa
) {
  var isValid = true;
  //check Tài Khoản
  isValid &=
    validation.kiemTraRong(taiKhoan, "tbTaiKhoan", "Vui lòng nhập tài khoản") &&
    validation.kiemTraDuyNhat(
      taiKhoan,
      "tbTaiKhoan",
      "Tài khoản đã tồn tại",
      listData
    );

  //check họ tên
  isValid &=
    validation.kiemTraRong(hoTen, "tbHoTen", "Vui lòng nhập họ tên") &&
    validation.kiemTraKyTuChu(hoTen, "tbHoTen", "Vui lòng nhập ký tự chữ");
  //check Mật khẩu
  isValid &=
    validation.kiemTraRong(matKhau, "tbMatKhau", "Vui lòng nhập mật khẩu") &&
    validation.kiemTraMatKhau(
      matKhau,
      "tbMatKhau",
      "Mật khẩu chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
    ) &&
    validation.kiemTraDoDaiKyTu(
      matKhau,
      "tbMatKhau",
      "Vui lòng nhập mật khẩu 6-8 ký tự",
      6,
      8
    );

  //check email
  isValid &=
    validation.kiemTraRong(email, "tbEmail", "Vui lòng nhập emailg") &&
    validation.kiemTraEmail(
      email,
      "tbEmail",
      "Vui lòng nhập email đúng định dạng"
    );

  //check hình ảnh
  isValid &= validation.kiemTraRong(
    hinhAnh,
    "tbHinhAnh",
    "vui lòng nhập hình ảnh"
  );

  //check người dùng
  isValid &= validation.kiemTraSelection(
    "loaiNguoiDung",
    "tbLoaiND",
    "Vui lòng chọn người dùng"
  );

  //check ngôn ngữ
  isValid &= validation.kiemTraSelection(
    "loaiNgonNgu",
    "tbNgonNgu",
    "Vui lòng chọn ngôn ngữ"
  );

  //check mô tả
  isValid &= validation.kiemTraRong(moTa, "tbMoTa", "vui lòng nhập mô tả");
  return isValid;
}
