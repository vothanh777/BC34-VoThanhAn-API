function Service() {
  this.getListData = function () {
    return axios({
      url: "https://62ff795f9350a1e548df78e0.mockapi.io/api/teachers",
      method: "GET",
    });
  };

  this.deleteDataApi = function (id) {
    return axios({
      url: `https://62ff795f9350a1e548df78e0.mockapi.io/api/teachers/${id}`,
      method: "DELETE",
    });
  };

  this.addDataApi = function (user) {
    return axios({
      url: "https://62ff795f9350a1e548df78e0.mockapi.io/api/teachers",
      method: "POST",
      data: user,
    });
  };

  this.getDataById = function (id) {
    return axios({
      url: `https://62ff795f9350a1e548df78e0.mockapi.io/api/teachers/${id}`,
      method: "GET",
    });
  };

  this.updateDataApi = function (user) {
    return axios({
      url: `https://62ff795f9350a1e548df78e0.mockapi.io/api/teachers/${user.id}`,
      method: "PUT",
      data: user,
    });
  };
}
