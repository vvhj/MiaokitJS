﻿import * as React from "react";
import * as RouterDOM from 'react-router-dom';
import DataService from "dataService";
import GlobalAction from "compat";
import "css!./styles/resetAntdMobile.css"
import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';

class RepairsOnline extends React.Component<{ history: any }>{
  public constructor(props) {
    super(props);

    this.setTypeUL = this.setTypeUL.bind(this);
    RepairsOnline.getReqairstpostion = this.getReqairstpostion.bind(this);
  }

  public componentDidMount() {
    // 19.(在线报修模块-报修类型)通过园区id获取在线报修类型
    this.dataService.getRepairType(this.setTypeUL);
    let enterprises = JSON.parse(localStorage.getItem("enterprises"));
    let contact = localStorage.getItem("userName");
    let phone = localStorage.getItem("phone");
    let staff_id = localStorage.getItem("userid");
    console.log("--------", contact, phone, staff_id)
    this.setState({
      contact: contact,
      phone: phone,
      staff_id: staff_id,
      companyUL: enterprises,
      company: enterprises[0].name,
      company_id: enterprises[0].id,
    })
  }

  public dataService: DataService = new DataService();
  public globalAction: GlobalAction = new GlobalAction();

  public setTypeUL(data) {
    console.log("getRepairType", data);
    this.setState({
      typeUL: data.response,
      type_id: data.response[0].id,
      type_name: data.response[0].name,
    })
  }

  public toggleFold() {
    console.log("reqairsOn");
    if (this.state.reqairscss == "reqairs-all") {
      this.setState({
        reqairscss: "reqairs-part",
        reqairscssul: "reqairsul-part reqairsul"
      })
      // 通知3d，继续加载模型  
      this.globalAction.web_call_webgl_continueloadModuler();
    } else {
      this.setState({
        reqairscss: "reqairs-all",
        reqairsul: "reqairsul-all reqairsul"
      })
      // 通知3d，暂停加载模型
      this.globalAction.web_call_webgl_pauseloadModuler();
    }
    if (this.state.iconfont == "iconfont iconfont-unturn") {
      this.setState({
        iconfont: "iconfont iconfont-turn",
      })
    } else {
      this.setState({
        iconfont: "iconfont iconfont-unturn",
      })
    }
  }

  public mapReturnpark() {
    //通知3d，返回园区视角
    this.globalAction.web_call_webgl_mapReturnpark();
  }

  static getReqairstpostion(data) { };
  public getReqairstpostion(data) {
    console.log("getReqairstpostion",data)

    this.setState({
      position: data.position,
      longitude: data.longitude,
      latitude: data.latitude,
      building_id: data.building_id,
      floor_id: data.floor_id,
      room_id: data.room_id,
      room: data.room,
    })
  }

  // input选择照片
  public reqairsImginput() {

  }

  // 显示图片
  public reqairsImgshow() {

  }

  //显示报修类型列表
  public showTypeUL() {
    this.setState({
      typeULBox: "typeULBox",
      type_id_in: this.state.typeUL[this.state.indexOf].id,
      type_name_in: this.state.typeUL[this.state.indexOf].name,
    })
  }

  //选中报修类型
  public reqairsType(i, id, name) {
    this.setState({
      type_id_in: id,
      type_name_in: name,
      indexOf: i,
    })
  }

  // 报修类型列表  -- “确认”
  public gettypeUL() {
    this.setState({
      typeULBox: "hide",
      type_id: this.state.type_id_in,
      type_name: this.state.type_name_in,
    })
  }

  // 报修类型列表  -- “取消”
  public hidetypeUL() {
    this.setState({
      typeULBox: "hide",
    })
  }

  //报修位置  
  public getPosition(event) {
    this.setState({
      position: event.target.value
    })
  }

  //报修企业
  public reqairsCompany(event) {
    this.setState({
      company: event.target.value,
    })
  }

  //报修联系人
  public reqairsContacts(event) {
    this.setState({
      contact: event.target.value,
    })
  }

  //报修联系人电话
  public reqairsPhone(event) {
    this.setState({
      phone: event.target.value,
    })
  }

  //报修问题描述   
  public changeDescript(event) {
    this.setState({
      descript: event.target.value,
    })
  }

  // 显示公司列表
  public showCompanyBox() {
    this.setState({
      companyBox: "rollSelectCauseBox",
      company_id_in: this.state.companyUL[this.state.companyIndexof].id,
      company_name_in: this.state.companyUL[this.state.companyIndexof].name,
    })
  }

  // 选中公司
  public inCompanyeList(i, id, name) {
    // console.log("选中的公司", i, id, name);
    this.setState({
      companyIndexof: i,
      company_id_in: id,
      company_name_in: name,
    })
  }

  // 隐藏公司列表框
  public hideCompanyBox() {
    this.setState({
      companyBox: "hide",
    })
  }

  //确认公司列表选择
  public getCompanyBox() {
    this.setState({
      companyBox: "hide",
      company_id: this.state.company_id_in,
      company: this.state.company_name_in,
    })
  }

  onChangeImg = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }

  //提交报修单
  public sumbitReqairs() {
    console.log("提交报修", this.state);
    if (this.state.files.length == 0) {
      alert("请提交报修照片")
    } else if (this.state.type_id == "") {
      alert("请选择报修类型")
    } else if (this.state.position == "") {
      alert("请填写报修位置")
    } else if (this.state.descript == "") {
      alert("请描述报修问题")
    } else {
      this.dataService.saveRepairInfo(this.sumbitReqairssucceed, this.state);
    }
  }

  //提交报修单 -- 成功
  public sumbitReqairssucceed(data) {
    alert(data);
   // window.history.back();
  }

  public render() {
    //<input type="text" value={this.state.company} placeholder="请填写报修企业" style={{ "margin-left": "4rem", "border": "0" }}
    //  onChange={this.reqairsCompany.bind(this)} />

    //<input type="file" accept="image/*" className="getillImg" value="" onClick={this.reqairsImginput.bind(this)} style={{ "opacity": "0", "position": "absolute", "right": "-16rem" }} />
    //  <img src={this.state.photo} onClick={this.reqairsImgshow.bind(this)} />
    return (
      <div className="repairsOnline">
        <p className="companyInfotit">
          <RouterDOM.Link to="/home" onClick={this.mapReturnpark.bind(this)}>
            <span className="iconfont companyInfoicon">&#xe83b;</span>
          </RouterDOM.Link>
          <span>在线报修</span>
        </p>

        <div className={this.state.reqairscss}>
          <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
            <i className={this.state.iconfont} style={{ "fontSize": "5rem" }}>&#xe849;</i>
          </div>
          <form >
            <ul className={this.state.reqairsul} >
              <li>
                <span className="redStar">*</span>报修照片
                  <div className="imgCom">
                  <WingBlank>
                    <ImagePicker
                      files={this.state.files}
                      onChange={this.onChangeImg}
                      onImageClick={(index, fs) => console.log(index, fs)}
                      selectable={this.state.files.length < 1}
                      multiple={this.state.multiple}
                    />
                  </WingBlank>
                </div>
              </li>
              <li>
                <span className="redStar" >*</span>报修类型
                 <input type="text" className="getillType" value={this.state.type_name} placeholder="请选择报修类型" />
                <span className="iconfont" onClick={this.showTypeUL.bind(this)} style={{ "fontSize": "3rem", "float": "right", " padding": " 0 0 0 3rem", "padding": " 0 0 0 4rem" }} >&#xe827;</span>
              </li>
              <li>
                <span className="redStar">*</span>报修位置
                  <input type="text" value={this.state.position} placeholder="请输入报修位置" style={{ "margin-left": "4rem", "border": "0" }}
                  onChange={this.getPosition.bind(this)} />
                <i className="iconfont" style={{ "fontSize": "3rem", "color": "#0B8BF0", "float": "right", "padding": " 0 0 0 4rem" }}>&#xe82c;</i>
              </li>
              <li>
                <span className="redStar">*</span>报修企业
                <span className="iconfont" onClick={this.showCompanyBox.bind(this)} style={{ "fontSize": "3rem", "float": "right", " padding": " 0 0 0 3rem", "padding": " 0 0 0 4rem" }} >&#xe827;</span>
                <p className={"applyRight"}
                  style={{ "font-size": "2.3rem", "padding-left": "1.5rem", "float":"right","width": "37rem" }}>{this.state.company}</p>
                
              </li>
              <li>
                <span className="redStar">*</span>联系人
                <input type="text" value={this.state.contact} placeholder="请填写联系人" style={{ "margin-left": "6rem", "border": "0" }}
                  onChange={this.reqairsContacts.bind(this)} readOnly/>
              </li>
              <li>
                <span className="redStar">*</span>电话号码
                <input type="text" value={this.state.phone} placeholder="请填写联系电话号码 " style={{ "margin-left": "4rem", "border": "0" }}
                  onChange={this.reqairsPhone.bind(this)} readOnly />
              </li>
              <li>
                <p><span className="redStar">*</span>报修描述：</p>
                <textarea className="bookContent" value={this.state.descript} placeholder="请将报修问题描述出来。（120字内）"
                  onChange={this.changeDescript.bind(this)}></textarea>
              </li>
            </ul>
            <div className="reqairsSumbit" onClick={this.sumbitReqairs.bind(this)}>提交</div>
          </form>
        </div>

        <div className={this.state.typeULBox}>
          <ul className="rollSelectCauseULcss">
            {this.state.typeUL.map((i, index) => {
              return (
                <li className={this.state.indexOf == index ? "rollSelectCauseli-active" : "rollSelectCauseli"}
                  onClick={this.reqairsType.bind(this, index, i.id, i.name)}>{i.name}</li>
              )
            })}
          </ul>
          <div className="rollSelectCuasedBtn">
            <span className="rollSelectCancel" onClick={this.hidetypeUL.bind(this)} >取消</span>
            <span className="rollSelectConfirm" onClick={this.gettypeUL.bind(this)}>确认</span>
          </div>
        </div>

        <div className={this.state.companyBox}>
          <ul className="rollSelectCauseULcss">
            {this.state.companyUL.map((i, index) => {
              return (
                <li className={this.state.companyIndexof == index ? "rollSelectCauseli-active" : "rollSelectCauseli"}
                  onClick={this.inCompanyeList.bind(this, index, i.id, i.name)}
                >{i.name}</li>
              )
            })}
          </ul>
          <div className="rollSelectCuasedBtn">
            <span className="rollSelectCancel" onClick={this.hideCompanyBox.bind(this)} >取消</span>
            <span className="rollSelectConfirm" onClick={this.getCompanyBox.bind(this)}>确认</span>
          </div>
        </div>

      </div>
    )
  }

  public state = {
    //照片
    files: [],
    multiple: false,
    reqairscss: "reqairs-part",
    iconfont: "iconfont iconfont-unturn",
    reqairsul: "reqairsul-part reqairsul",
    typeULBox: "hide",
    typeUL: [],
    type_id_in: "",
    type_name_in: "",
    indexOf: 0,
    // 公司选择
    companyBox: "show",
    companyUL: [],
    companyIndexof: 0,
    company_id_in: "",
    company_name_in: "",
    //园区id
    park_id: 1001,
    //类型id (水管报修等对应的id)
    type_id: "",
    type_name: "",
    //位置
    position: "",
    //经度
    longitude: "",
    //纬度
    latitude: "",
    //使用场地对应大楼id，模型编号(用于匹配对应3d大楼)
    building_id: "",
    //使用场地对应大楼id，模型编号(用于匹配对应3d大楼)
    floor_id: "",
    //使用场地id，模型编号(用于匹配对应3d房间)
    room_id: "",
    //使用场地名称，
    room:"",
    //报修企业
    company: "",
    //联系人
    contact: "",
    //联系人id
    staff_id: "",
    phone: "",
    //描述
    descript: "",
    //照片
    photo: "",
  }
}

export default RepairsOnline;