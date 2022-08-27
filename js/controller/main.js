var service = new Service();

function getEle(id) {
  return document.getElementById(id);
}

function renderHTML_Teacher(data) {
  var content = "";
  data.forEach(function (teacher) {
    if (teacher.loaiND === "GV") {
      content += `
            <div class="teamCol col-12 col-md-6 col-lg-3">
                <div class="item">
                    <img src="./img/${teacher.hinhAnh}" alt="" />
                    <div class="itemInfo">
                        <h4>${teacher.ngonNgu}</h4>
                        <h3>${teacher.hoTen}</h3>
                        <p>${teacher.moTa}</p>
                    </div>
                </div>
            </div>
        `;
    }
  });
  getEle("teamContent").innerHTML = content;
}

function fetchData() {
  getEle("loading").style.display = "block";

  service
    .getListData()
    .then(function (result) {
      renderHTML_Teacher(result.data);
      getEle("loading").style.display = "none";
    })
    .catch(function (error) {
      console.log(error);
      getEle("loading").style.display = "none";
    });
}

fetchData();
