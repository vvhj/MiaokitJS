import FindLease from 'findLease';

class DataService {

  public componentDidMount() {
    console.log(localStorage.getItem("token"));

    // this.setToken = this.setToken.bind(this);
  }

  // 点击地图点，获取回调
  public callback(a, pBack) {
    console.log("callback1", a);
    //$.ajax({
    //    url: '',
    //    data: { "a": a },
    //    success: function (data) {
    //        if (!data) {
    //            pBackajax(data);
    //        };
    //    }
    //})
    pBack("callback")
  }

  // 0.文件上传
  public upload(pBack, file) {
    console.log("fiffffffffffffffff", file)
    $.ajax({
      url: this.state.rooturl + '/api/upload?token=' + localStorage.getItem("token"),
      data: file,
      cache: false,         //阻止浏览器缓存
      dataType: "json",
      processData: false,   // jQuery不要去处理发送的数据
      contentType: false,   // jQuery不要去设置Content-Type请求头
      type: "post",
      success: function (data) {
        pBack(data)
      }
    })
  }

  //0.2上传图片
  public uploadImgOss(pBack, file) {
    console.log("uploadImgOss", file)
    $.ajax({
      url: this.state.rooturl + '/api/uploadImgOss',
      type: "post",
      data: JSON.stringify(file),
      success: function (data) {
        console.log(typeof data);
        let dataJ = JSON.parse(data);
        console.log("ajax", dataJ);
        if (dataJ.return_code == 100) {
          pBack(dataJ.response);
        }
      }
    })
  }

  // 2.(注册登录模块)用户登陆接口 ### email:test@test.com password:123456 
  public login() {
    $.ajax({
      url: this.state.rooturl + '/api/login',
      data: {
        "username": "admin",
        "password": "admin"
      },
      type: "post",    
      success: function (data) {
        localStorage.setItem("token", data.token);
        }
    })

    //返回数据存储
    let userName = "王铁柱"
    localStorage.setItem("userName", userName);

    let phone = "15296811111"
    localStorage.setItem("phone", phone);

    let userid = "1008112"
    localStorage.setItem("userid", userid);

    let enterprises = [
      {
        "id": "1009",
        "name": "力拓科技",
      },
      {
        "id": "1003",
        "name": "永拓拓科技",
      }
    ]
    localStorage.setItem("enterprises", JSON.stringify(enterprises));

     //获取：
   // var arr = JSON.parse(localStorage.getItem("arr"));
  }

  //  原有token过期，换取新 token
  public refreshToken(ytoken) {
    //  /api/refresh ?token=ytoken；
    //获取到ntoken，存localStorage.setItem("token", data.access_token);
    $.ajax({
      url: this.state.rooturl + '/api/refresh',
      data: {
        "token": ytoken,
      },
      type: "post",
      success: function (data) {
        // console.log("login",data);
        //pBackajax(data);
        console.log("login-getToken", data);
        //localStorage.setItem("token", data.token);
      }
    })
  }

  //3.(首页模块)获取园区列表
  public getParks(pBack) {
    let thetoken = localStorage.getItem("token");
    $.ajax({
      url: this.state.rooturl + '/api/getParks',
      type: "get",
      data: {
        "token": thetoken,
      },
      success: function (data) {
        if (data) {
          pBack(data.response);
        };
      }
    })
  }

  //4.(园区信息-3D显示)获取园区详细信息
  public getParkInfo(pBack, park_id) {
    let thetoken = localStorage.getItem("token");
    //$.ajax({
    //  url: this.state.rooturl + '/api/getParkInfo',
    //  data: {
    //    "park_id": 1,
    //    "token": thetoken,
    //  },
    //  type: "get",
    //  success: function (data) {
    //    console.log("getParkInfo", data);
    //    if (data.status == 113) {
    //      // 113 token到期，跳转登录页面
    //      // console.log(window.location.pathname);
    //      //  window.location.href = window.location.pathname+"#/"
    //    } else {
    //     // pBack(data);
    //      console.log("getParkInfo", data);
    //    }
    //  }
    // })


    var data = {
      //错误码
      "return_code": "100",
      "response": [
        {
          //id
          "id": "1009",
          //园区图像url
          "headimgurl": "http://xxx.jpg",
          //所在城市
          "province": "桂林",
          //经度
          "longitude": "10.55",
          //纬度
          "latitude": "66.666",
          //园区名字
          "name": "桂林国家高新",
          //地址
          "address": "桂林七星朝阳路D-11",
          //工程列表，列表内为园区使用的工程。
          "project": [
            {
              //id
              "id": "1009",
              //工程名。
              "name": "电子信息",
              //工程类型 1为普通模型 2为航拍实景图 3为sve工程 4为其它
              "type": 1,
              //使用类型 1为完整场景 2为单独内景
              "use_type": 0,
              //工程地址
              "project_url": "http://xxx.bin",
              //经度
              "longitude": "10.55",
              //纬度
              "latitude": "66.666",
              //偏移值
              "offset": "10,20,10",
              //旋转角度
              "rotate": "10",
            }
          ],
          //园区讲解列表
          "audio": [
            { name: "园区交通", url: "http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3" },
            { name: "园区配套", url: "http://downsc.chinaz.net/files/download/sound1/201206/1638.mp3" },
            { name: "园区建筑", url: "http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3" },
          ]
        }

      ],
      //错误代码信息
      "err_msg": ""
    }

    pBack(data);
  }

  // 5. (企业园区模块-搜索类型)获取园区下面企业类型列表
  public getCompanyType(pBack, park_id) {
    // id =1
    let thetoken = localStorage.getItem("token");
    $.ajax({
      url: this.state.rooturl + '/api/getCompanyType',
      data: {
        "park_id": park_id,
        "token":thetoken,
      },
      type: "get",    
      success: function (data) {
        console.log("5-企业类型列表",data);
        pBack(data);
        }
    })
  }

  //6 通过园区id，企业类型，关键词搜索园区下面企业列表
  public findCompany(pBack, park_id, company_type_id, companyName) {
    // id=1
    // console.log("findCompany", park_id, company_type_id, name);
    let thetoken = localStorage.getItem("token");
    $.ajax({
      url: this.state.rooturl + '/api/findCompany',
      data: {
        "park_id": 1,
        "company_type_id": company_type_id,
        "token": thetoken,
        "name": companyName
      },
      type: "get",
      success: function (data) {
        console.log("findCompany企业列表", data);
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
         // console.log(window.location.pathname);
         //  window.location.href = window.location.pathname+"#/"
        } else {
          pBack(data);
          console.log("fin企业列表", data);
        }
      }
    })
  }

  //7 通过企业id, 获企业详细信息
  public getCompanyInfo(pBack, id) {
    // id=2 模拟id
    let thetoken = localStorage.getItem("token");
    $.ajax({
      url: this.state.rooturl + '/api/getCompanyInfo',
      data: {
        "id": id,
        "token": thetoken,
      },
      type: "get",
      success: function (data) {
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
         // console.log(window.location.pathname);
         //  window.location.href = window.location.pathname+"#/"
        } else {
          pBack(data);
        }
      }
    })

  }

  //8 通过园区id, 获取面积分类
  public getRoomRentSquareType(pBack, park_id) {
    console.log("init-AllareaType", pBack, park_id);
    // console.log("findCompany", park_id, company_type_id, name, token);
    let thetoken = localStorage.getItem("token");
    $.ajax({
      url: this.state.rooturl + '/api/getRoomRentSquareType',
      data: {
        "park_id": 1,
        "token": thetoken,
      },
      type: "get",
      success: function (data) {
        //  console.log("getRoomRentSquareType", data);
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
          // console.log(window.location.pathname);
          //  window.location.href = window.location.pathname+"#/"
        } else {
          pBack(data);
          //console.log("getRoomRentSquareType", data);
        }
      }
     });

  }

  //9 通过园区id, 获取招租的场地列表接口(findRoomRent);
  public findRoomRentByparkid(pBack, park_id, square) {
    // id =1
    console.log("findRoomRentByparkid", pBack, park_id, square);
    let thetoken = localStorage.getItem("token");
    $.ajax({
      url: this.state.rooturl + '/api/findRoomRent',
      data: {
        "park_id": park_id,
        "token": thetoken,
        "square": square
      },
      type: "get",
      success: function (data) {
        console.log("getfindRoomRent", data);
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
          // console.log(window.location.pathname);
          //  window.location.href = window.location.pathname+"#/"
        } else {
          pBack(data);
          console.log("findRoomRentByparkid", data);
        }
      }
    })
 
  }

  //10 通过招租id,获取租房信息列表接口(getRoomRentInfo)
  public findRoomRentByroomid(pBack, id) {
    console.log("findRoomRentByroomid-jxxxxxxxxxxxx", id);
    let thetoken = localStorage.getItem("token");
    $.ajax({
      url: this.state.rooturl + '/api/getRoomRentInfo',
      data: {
        "id": id,
        "token": thetoken,
      },
      type: "get",
      success: function (data) {
        //console.log("getRoomRentSquareType", data);
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
          // console.log(window.location.pathname);
          //  window.location.href = window.location.pathname+"#/"
        } else {
          pBack(data);
          console.log("findRoomRentByroomid", data);
        }
      }
    })

  }

  //11.(随手拍模块-曝光类型) 通过园区id获取随手拍曝光类型 
  public getTakingPhotosType(pBack, park_id) {
    console.log("getTakingPhotosType", pBack, park_id);
    var data = {
      //错误码
      "return_code": "100",
      "response": [
        {
          //id
          "id": "1009",
          //名称。
          "name": "阻挡主要出入口",
        },
        {
          //id
          "id": "1009",
          //名称。
          "name": "非停车位侧停车",
        }
      ],
      //错误代码信息
      "err_msg": ""
    }
    pBack(data);
  }

  //12.(随手拍模块-列表)通过园区id获取随手拍列表 
  public getTakingPhotos(pBack, park_id, name) {
    console.log("随手拍list", park_id, name);
    let data = {
      //错误码
      "return_code": "100",
      "response": [
        {
          //id
          "id": "1009",
          //类型id
          "type": "非停车位侧停车",
          //车牌
          "car_license": "桂C123456",
          //申请时间
          "time": "2020-02-28 14:38:15",
          //位置
          "position": "A座厦门旁",
          //经度
          "longitude": "10.55",
          //纬度
          "latitude": "66.666",
          //照片
          "photo": "./park_m/image/i.png"
        }, {
          //id
          "id": "1009",
          //类型id
          "type": "非停车位侧停车",
          //车牌
          "car_license": "桂C120000",
          //申请时间
          "time": "2020-02-28 14:38:15",
          //位置
          "position": "A座厦门旁",
          //经度
          "longitude": "10.55",
          //纬度
          "latitude": "66.666",
          //照片
          "photo": "./park_m/image/i.png"
        }
      ],
      //错误代码信息
      "err_msg": ""
    }
    pBack(data);
  }

  //13.(随手拍模块-列表-详情) 通过随手拍id获取随手拍详细信息 
  public getTakingPhotoInfo(pBack, id) {
    console.log("随手拍list", id);
    let data = {
      //错误码
      "return_code": "100",
      "response": {
        //id
        "id": "1009",
        //类型名称
        "type_name": "非停车位侧停车",
        //车牌
        "car_license": "桂A5000",
        //申请时间
        "time": "2020-02-28 14:38:15",
        //位置
        "position": "A座厦门旁",
        //经度
        "longitude": "10.55",
        //纬度
        "latitude": "66.666",
        //描述
        "descript": "横跨在斑马线上",
        //违规照片
        "photo": "./park_m/image/i.png",
      },
      //错误代码信息
      "err_msg": ""
    }
    pBack(data);
  }

  // 14.(随手拍模块-提交)提交随手拍信息
  public postTakingPhotoInfo(pBack, data) {
    let theData = {
      "park_id": localStorage.getItem("park_id"),
      "type_id": data.type_id,
      "car_license": data.car_license,
      "time": data.time,
      "position": data.position,
      "longitude": data.longitude,
      "latitude": data.latitude,
      "descript": data.descript,
      "photo": data.files[0].url,
    }
    console.log("postTakingPhotoInfo", theData);
    pBack("随手拍提交完成");
  }

  // 15.2(摆点申请模块)提交摆点申请接口 
  public postAdvertisementPoint(pBack, data) {
    //console.log("postAdvertisementPoint", data);
    let datas = {
      'park_id': localStorage.getItem("park_id"),
      'staff_id': data.staff_id,
      "staff_name": data.applicant,
      "phone": data.phone,
      "company_id": data.company_id,
      "company": data.company,
      "content": data.content,
      "positions": data.applyList
    };
    let thedata = JSON.stringify(datas)
      $.ajax({
        url: this.state.rooturl2 + '/api/postAdvertisementPoint',
        data: thedata,
        type: "post",
        dataType: "json",
      success: function (data) {
         console.log("getRoomRentSquareType", data);
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
          // console.log(window.location.pathname);
          //  window.location.href = window.location.pathname+"#/"
        } else {
          //pBack("摆点申请提交完成");
          //console.log("getRoomRentSquareType", data);
        }
        if (data.return_code == 100) {
          pBack("摆点申请提交完成");
        }
      }
     });
  }

  //16.(场地预定模块-搜索)通过园区id获取园区内可以预定的场地列表接口
  public getRoomBook(pBack, park_id, name) {
    console.log("getRoomBook", pBack, park_id, name);
    let theurl
    if (name && name!=="搜索") {
       theurl = this.state.rooturl2 + '/api/getRoomBook/' + 1 + '/' + name
    } else {
       theurl= this.state.rooturl2 + '/api/getRoomBook/' + 1 
    }
    $.ajax({
      url: theurl,
      type: "get",
      success: function (data) {
        //console.log("getRoomBookajax", data);
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
          // console.log(window.location.pathname);
          //  window.location.href = window.location.pathname+"#/"
        } else {
          let dataJ = JSON.parse(data);
          //console.log("getRoomBookajax", dataJ);
          pBack(dataJ);
         
        }
      }
     });
  }

  //##17.(场地预单模块-详细信息)通过场地预定id,获取预定相关详情接口 ###
  public getRoomBookInfo(pBack, id) {
    //console.log("getRoomBookInfo", id);
    $.ajax({
      url: this.state.rooturl2 + '/api/getRoomBookInfo'+"/"+id,
      type: "get",
      success: function (data) {
        console.log("getRoomBookInfoajax", data);
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
          // console.log(window.location.pathname);
          //  window.location.href = window.location.pathname+"#/"
        } else {
          let dataJ = JSON.parse(data);
            //console.log("getRoomBookInfoajax", data);
          pBack(dataJ);
        }
      }
    });

  }

  //##18.(场地预定模块-提交信息)提交场地预定申请 ###
  public bookingRoom(pBack, data) {
  //  console.log("bookingRoom", data);
   // console.log("bookingRoom", data.room_id)
   // pBack("提交成功！");
    let datas = {
      'park_id': localStorage.getItem("park_id"),
      'staff_id': data.staff_id,
      "staff_name": data.applicant,
      "phone": data.phone,
      "company_id": data.company_id,
      "company": data.company,
      "room": data.room_name,
      "building_id": data.building_id,
      "floor_id": data.floor_id,
      "room_id": data.room_id,
      "start_date": data.start_date,
      "end_date": data.end_date,
      "theme": data.theme,
      "content": data.content,
    }

    let thedata = JSON.stringify(datas)
   // console.log("提交场地预定", thedata);
    $.ajax({
      url: this.state.rooturl2 + '/api/BookingRoom',
      data: thedata,
      type: "post",
      dataType: "json",
      success: function (data) {
        console.log("BookingRoom", data);
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
          // console.log(window.location.pathname);
          //  window.location.href = window.location.pathname+"#/"
        } else {
          //pBack("摆点申请提交完成");
          //console.log("BookingRoom", data);
        }
        if (data.return_code == 100) {
          pBack("场地预定申请完成");
        }
      }
    });
  }

  //19.(在线报修模块-报修类型)通过园区id获取在线报修类型
  public getRepairType(pBack) {
    $.ajax({
      url: this.state.rooturl2 + '/api/getRepairType',
      type: "get",
      success: function (data) {
        console.log("getRepairType", data);
        let dataJ = JSON.parse(data);
        console.log("getRepairType", dataJ);
        //if (data.status == 113) {
        //  // 113 token到期，跳转登录页面
        //  // console.log(window.location.pathname);
        //  //  window.location.href = window.location.pathname+"#/"
        //} else {
        //  //pBack("摆点申请提交完成");
        //  //console.log("getRoomRentSquareType", data);
        //}
        if (dataJ.return_code == 100) {
          pBack(dataJ);
        }
      }
    });

  }

  //20.(在线报修模块-提交)提交在线报修信息
  public saveRepairInfo(pBack, data) {
    let datas = {
      'park_id': localStorage.getItem("park_id"),
      "type_id": data.type_id,
      //"position": data.position,
      //"longitude": data.longitude,
      //"latitude": data.latitude,
      //"building_id": data.building_id,
      //"floor_id": data.floor_id,
      //"room_id": data.room_id,
      //"room": data.room,
      "position": "E座b区三楼",
      "longitude": "10.55",
      "latitude": "66.666",
      "building_id": "a座",
      "floor_id": "1F",
      "room_id": "202",
      "room": "201-2",

      "company_id": data.company_id,
      "company": data.company,
      'staff_id': data.staff_id,
      "staff_name": data.contact,
      "phone": data.phone,
      "descript": data.descript,
      "img_url": data.files[0].url
    }
    console.log("saveRepairInfo", datas);
    let thedata = JSON.stringify(datas)
    $.ajax({
      url: this.state.rooturl2 + '/api/saveRepairInfo',
      data: thedata,
      type: "post",
      dataType: "json",
      success: function (data) {
        console.log("saveRepairInfo", data);
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
          // console.log(window.location.pathname);
          //  window.location.href = window.location.pathname+"#/"
        } else {
          //pBack("摆点申请提交完成");
          //console.log("getRoomRentSquareType", data);
        }
        if (data.err_msg == "请求成功") {
          pBack("场地预定申请完成");
        }
      }
    });
  }

  //22.(停车业务模块-地下停车场列表)通过园区id获取停车场列表
  public getParkingList(pBack, park_id) {
    let data = {
      //错误码
      "return_code": "100",
      "response": [
        {
          //id
          "id": "100001",
          //名称。
          "name": "a座地下停车场",
          //经度
          "longitude": "10.55",
          //纬度
          "latitude": "66.666",
        },
        {
          //id
          "id": "100002",
          //名称。
          "name": "b座地下停车场",
          //经度
          "longitude": "10.55",
          //纬度
          "latitude": "66.666",
        }
      ],
      //错误代码信息
      "err_msg": ""
    }

    pBack(data);
  }

  //23.(停车业务模块-车辆类型)通过园区id获取车辆类型 
  public getCarType(pBack, park_id) {
    console.log("显示车辆类型列表");
    let data = {
      //错误码
      "return_code": "100",
      "response": [
        {
          //id
          "id": "1009",
          //名称。
          "name": "中小型车",
        },
        {
          //id
          "id": "1009",
          //名称。
          "name": "大型车",
        }
      ],
      //错误代码信息
      "err_msg": ""
    }
    pBack(data);
  }

  // 24.(停车业务模块-车位申请)提交车位申请信息
  public saveParkingApply(pBack, data) {
    let thedata = {
      'park_id': localStorage.getItem("park_id"),
      "car_license_color": data.car_license_color,
      "car_license": data.car_license,
      "applicant": data.applicant,
      "phone": data.phone,
      "company": data.company,
      "company_address": data.company_address,
      "car_owner": data.car_owner,
      "car_brand": data.car_brand,
      "car_model": data.car_model,
      "car_color": data.car_color,
      "car_type": data.car_type,
    }
    console.log("24提交车位申请信息", thedata);
   // pBack("车位，提交成功！");
  }

  // 25.(停车业务模块-地库车位预约)提交地库车位预约
  public saveParkingAppointment(pBack, data) {
    let thedata = {
      'park_id': localStorage.getItem("park_id"),
      "car_license_color": data.car_license_color,
      "car_license": data.car_license,
      "applicant": data.applicant,
      "phone": data.phone,
      "company": data.company,
      "company_address": data.company_address,
      "car_owner": data.car_owner,
      "car_brand": data.car_brand,
      "car_model": data.car_model,
      "car_color": data.car_color,
      "car_type": data.car_type,
      "underground_parking_id": data.underground_parking_id,
      "underground_parking_name": data.underground_parking_name,
    }
    console.log("25提交地库申请信息", thedata);
  //  pBack("地库，提交成功！");
  }

  // 26.(停车业务模块-车位变更)提交车位变更（目前：变更车辆，不变更车位） 
  public changeParkingCarInfo(pBack, data) {
    let thedata = {
      'park_id': localStorage.getItem("park_id"),
      "car_license_color": data.car_license_color,
      "car_license": data.car_license,
      "applicant": data.applicant,
      "phone": data.phone,
      "company": data.company,
      "company_address": data.company_address,
      "car_owner": data.car_owner,
      "car_brand": data.car_brand,
      "car_model": data.car_model,
      "car_color": data.car_color,
      "car_type": data.car_type,
      "orgin_car_license_color": data.orgin_car_license_color,
      "orgin_car_license": data.orgin_car_license,
      "orgin_car_owner": data.orgin_car_owner,
      "orgin_phone": data.orgin_phone,
    }
    console.log("26 提交车位变更", thedata);
    pBack("提交车位变更,成功！")
  }

  //27.(停车业务模块-来访车辆预约)提交来访车辆预约
  public saveVisitorParkingAppointment(pBack, data) {
    let thedata = {
      'park_id': localStorage.getItem("park_id"),
      "car_license_color": data.car_license_color,
      "car_license": data.car_license,
      "applicant": data.applicant,
      "phone": data.phone,
      "company": data.company,
      "underground_parking_id": data.underground_parking_id,
      "underground_parking_name": data.underground_parking_name,
      "start_time": data.start_time,
      "end_time": data.end_time,
    }
    console.log("27 提交来访车辆预约", thedata);
    pBack("提交来访车辆预约,成功！")
  }

  // 28.(微圈模块-类型列表)通过园区id,获取微圈类型列表
  public getMicroCircleType(pBack) {
    $.ajax({
      url: this.state.rooturl + '/api/getMicroCircleType',
      data: {
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 29.(微圈模块-微圈列表)获取微圈列表
  public getMicroCircleList(pBack, obj) {
    $.ajax({
      url: this.state.rooturl + '/api/getMicroCircleList',
      data: {
        park_id: obj.park_id,
        type_id: obj.type_id,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 30.(微圈模块-微圈详情)通过微圈id，获取微圈详情
  public getMicroCircleInfo(pBack, id) {
    $.ajax({
      url: this.state.rooturl + '/api/getMicroCircleInfo',
      data: {
        id: id,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 31.(微圈-我有话说)提交我有话说
  public saveMyMicroCircle(pBack, obj) {
    $.ajax({
      url: this.state.rooturl + '/api/saveMyMicroCircle',
      data: JSON.stringify({
        park_id: obj.park_id,
        user_id: obj.user_id,
        type_id: obj.type_id,
        name: obj.name,
        content: obj.content,
        token: localStorage.getItem("token")
      }),
      type: "post",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 32.(资讯模块-头条列表)通过园区id获取园区头条列表(内容使用优惠政策或者园区资讯的内容，后台逻辑可用最近的十条信息作为热点)
  public getHeadlines(pBack, park_id) {
    $.ajax({
      url: this.state.rooturl + '/api/getHeadlines',
      data: {
        park_id: park_id,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 33.(资讯模块-优惠政策类型)通过园区id 获取园区优惠政策类型列表
  public getPreferentialPolicyType(pBack, park_id) {
    $.ajax({
      url: this.state.rooturl + '/api/getPreferentialPolicyType',
      data: {
        park_id: park_id,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 34.(资讯模块-优惠政策)通过园区id，类型id，获取园区优惠政策列表
  public getPreferentialPolicies(pBack, obj) {
    $.ajax({
      url: this.state.rooturl + '/api/getPreferentialPolicies',
      data: {
        park_id: obj.park_id,
        type_id: obj.type_id,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 35.(资讯模块-园区资讯类型) 通过园区id 获取园区资讯类型列表
  public getParkInformationType(pBack, park_id) {
    $.ajax({
      url: this.state.rooturl + '/api/getParkInformationType',
      data: {
        park_id: park_id,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 36.(资讯模块-园区资讯)通过园区id，类型id，获取园区资讯列表
  public getParkInformationList(pBack, obj) {
    $.ajax({
      url: this.state.rooturl + '/api/getParkInformationList',
      data: {
        park_id: obj.park_id,
        type_id: obj.type_id,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 36.1(资讯模块--优惠政策+园区资讯)通过资讯id 获取资讯详情
  public getInformation(pBack, id) {
    $.ajax({
      url: this.state.rooturl + '/api/getInformation',
      data: {
        id: id,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 37.(资讯模块-活动类型列表)通过园区id 获取园区活动类型列表
  public getActivityType(pBack, park_id) {
    $.ajax({
      url: this.state.rooturl + '/api/getActivityType',
      data: {
        park_id: park_id,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 38.(资讯模块-园区活动)通过园区id，类型id，获取园区活动列表
  public getActivities(pBack, obj) {
    $.ajax({
      url: this.state.rooturl + '/api/getActivities',
      data: {
        park_id: obj.park_id,
        type_id: obj.type_id,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 39.(资讯模块-园区活动详情)通过活动id，获取园区活动详情
  public getActivitiyInfo(pBack, id) {
    $.ajax({
      url: this.state.rooturl + '/api/getActivitiyInfo',
      data: {
        id: id,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 39.2(资讯模块-园区活动-活动报名)提交园区活动报名
  public postActivitySign(pBack, obj) {
    $.ajax({
      url: this.state.rooturl + '/api/postActivitySign',
      data: {
        user_id: obj.user_id,
        activity_id: obj.activity_id,
        token: localStorage.getItem("token")
      },
      type: "post",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 40.(资讯模块-第三方服务类型列表)通过园区id 获取第三方服务类型列表
  public getThirdServiceType(pBack, park_id) {
    $.ajax({
      url: this.state.rooturl + '/api/getThirdServiceType',
      data: {
        park_id: park_id,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 41.(资讯模块-第三方服务类型列表)通过园区id 获取第三方服务类型列表
  public getThirdServices(pBack, obj) {
    $.ajax({
      url: this.state.rooturl + '/api/getThirdServices',
      data: {
        park_id: obj.park_id,
        type_id: obj.type_id,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 42.(我的个人中心模块-修改认证)用户修改用户名
  public modifyUserName(pBack, username) {
    $.ajax({
      url: this.state.rooturl + '/api/modifyUserName',
      data: {
        id: 3,
        username: username,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 43.(我的个人中心模块-身份认证类型)获取认证的角色类型列表
  public getRoleType(pBack) {
    $.ajax({
      url: this.state.rooturl + '/api/getRoleType',
      data: {
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  //44.(我的个人中心模块-身份认证)用户身份认证提交 
  public userAuthentication(pBack, obj) {
    console.log("用户身份认证提交 ", obj);
    $.ajax({
      url: this.state.rooturl + '/api/userAuthentication',
      data: obj,
      type: "post",
      success: function (data) {
        console.log(data.err_msg);
        if (data.err_msg == "提交成功") {
          pBack(data.err_msg)

        }
      }
    })
  }

  // 48.(我的个人中心模块-授权的工单类型)获取授权工单类型类型列表
  public getMyAuthorityWorkType(pBack, id) {
    $.ajax({
      url: this.state.rooturl + '/api/getMyAuthorityWorkType',
      data: {
        id: id,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 48.2.(我的个人中心模块-授权的工单状态) 获取授权授权的工单状态类型列表
  public getMyAuthorityStateType(pBack, id) {
    $.ajax({
      url: this.state.rooturl + '/api/getMyAuthorityStateType',
      data: {
        id: id,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 49.(我的个人中心模块-我的工单) 获取我的工单信息列表，全部工单类型的获取
  public getMyWork(pBack, obj) {
    $.ajax({
      url: this.state.rooturl + '/api/getMyWork',
      data: {
        id: obj.id,
        work_type: obj.work_type,
        state_type: obj.state_type,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 50.(我的个人中心模块-我的工单-场地预定详情) 通过工单id，获取场地预定详细信息接口
  public getBookingRoomInfo(pBack, id) {
    $.ajax({
      url: this.state.rooturl + '/api/getBookingRoomInfo',
      data: {
        id: id,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 54.(我的个人中心模块-我的工单-企业认证) 通过工单id，获取场地企业认证详细信息接口
  public getRoleAuthenticationInfo(pBack, id) {
    $.ajax({
      url: this.state.rooturl + '/api/getRoleAuthenticationInfo',
      data: {
        id: id,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 58.(我的个人中心模块-我的工单-摆点申请详情) 通过工单id，获取摆点申请详细信息接口
  public getAdvertisementPointInfo(pBack, id) {
    $.ajax({
      url: this.state.rooturl + '/api/getAdvertisementPointInfo',
      data: {
        id: id,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 62.(我的个人中心模块-我的工单-在线报修详情) 通过工单id，在线报修申请详细信息接口
  public getRepairInfo(pBack, id) {  
    $.ajax({
      url: this.state.rooturl + '/api/getRepairInfo',
      data: {
        id: id,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 91.(我的个人中心-我的消息-类型)通过园区id获取我的消息类型
  public getMyMsgType(pBack) {
    $.ajax({
      url: this.state.rooturl + '/api/getMyMsgType',
      data: {
        park_id: 1001,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 92.(我的个人中心-我的消息列表)通过我的id，类型id获取我的消息信息
  public getMyMsgInfo(pBack, typeId) {
    $.ajax({
      url: this.state.rooturl + '/api/getMyMsgInfo',
      data: {
        id: 1,
        type_id: typeId,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 93.(我的个人中心-统计报表)通过我的id，获取统计报表
  public getMyStatistic(pBack) {
    $.ajax({
      url: this.state.rooturl + '/api/getMyStatistic',
      data: {
        id: 1001,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 94.(我的个人中心-房间管理 - 楼宇楼层房间列表) 通过园区的id，获取园区大楼，及大楼下楼层，及楼层下房间列表
  public getParkBuildingInfo(pBack) {
    $.ajax({
      url: this.state.rooturl + '/api/getParkBuildingInfo',
      data: {
        id: 1001,
        park_id: 1001,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 95.(我的个人中心-房间管理-房间详细信息)通过园区的id，房间id获取房间详细信息
  public getRoomInfo(pBack, roomId) {
    $.ajax({
      url: this.state.rooturl + '/api/getRoomInfo',
      data: {
        id: 1001,
        park_id: 1001,
        room_id: roomId,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 96.(我的个人中心-房间管理-提交房间基础信息) 提交房间基础信息
  public saveRoomBaseInfo(pBack, obj) {
    $.ajax({
      url: this.state.rooturl + '/api/saveRoomBaseInfo?token=' + localStorage.getItem("token"),
      data: JSON.stringify({
        id: 1001,
        room_id: sessionStorage.getItem("roomId"),
        squre: obj.squre,
        price: obj.price,
        contact: obj.contact,
        phone: obj.phone,
        inspectionTime: obj.inspectionTime,
        require: obj.require,
        lift: obj.lift,
        square: obj.square,
        pic: obj.pic,
        video: obj.video
      }),
      type: "post",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 97.(我的个人中心-房间管理-提交房间租用信息) 提交房间租用信息
  public saveRoomRentInfo(pBack, obj) {
    $.ajax({
      url: this.state.rooturl + '/api/saveRoomRentInfo?token=' + localStorage.getItem("token"),
      data: JSON.stringify({
        id: 1001,
        room_id: sessionStorage.getItem("roomId"),
        state: obj.state,
        company_id: obj.companyId,
        company_name: obj.companyName,
        user: obj.user,
        phone: obj.phone,
        rent_date: obj.rentDate,
        rent_end_date: obj.rentEndDate,
        default_room: obj.defaultRoom
      }),
      type: "post",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 98.(我的个人中心-房间管理-提交房间格局信息) 提交房间格局基础信息
  public saveRoomPartBaseInfo(pBack, obj) {
    $.ajax({
      url: this.state.rooturl + '/api/saveRoomPartBaseInfo?token=' + localStorage.getItem("token"),
      data: JSON.stringify({
        id: 1,
        park_id: 1,
        room_id: sessionStorage.getItem("roomId"),
        part: [{
          id: obj[0].id,
          name: obj[0].name,
          position: obj[0].position,
          headimageurl: obj[0].headimageurl,
          panoramaurl: obj[0].panoramaurl
        },
        {
          id: obj[1].id,
          name: obj[1].name,
          position: obj[1].position,
          headimageurl: obj[1].headimageurl,
          panoramaurl: obj[1].panoramaurl
        }
        ]
      }),
      type: "post",
      success: function (data) {
        pBack(data)
      }
    })
  }

  // 99.(我的个人中心-客服电话修改) 提交园区客服电话修改信息
  public postParkPhone(pBack, phone) {
    $.ajax({
      url: this.state.rooturl + '/api/postParkPhone',
      data: {
        id: 1001,
        park_id: 1001,
        phone: phone,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }
  // 100.(我的个人中心-企业信息添加)添加或者更新企业详细信息 (同47号接口)
  public saveCompanyInfo(pBack, obj) {
    // console.log("tjjjj", obj);

    $.ajax({
      url: this.state.rooturl + '/api/saveCompanyInfo',
      dataType: "json",
      data: JSON.stringify(obj),
      //data: obj ,
      type: "post",
      success: function (data) {
        console.log(data);
        pBack(data)
      }
    })
  }


  public state = {
    rooturl: "http://parkadmin.yongtoc.com",
    //rooturl: "http://192.168.1.13:90",  //wl
    rooturl2: "http://192.168.1.30:8002", //qjf
    rooturl3: "http://192.168.1.27:89", //twl
    token: "",

  }
}

export default DataService;