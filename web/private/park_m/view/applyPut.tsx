import * as React from "react";
import * as RouterDOM from 'react-router-dom';
import { DatePicker, List } from 'antd-mobile';
import DataService from "dataService";
import GlobalAction from "compat";  
import "css!./styles/antd-mobile.css";
import "css!./styles/resetAntdMobile.css"

class ApplyPut extends React.Component {
  public constructor(props) {
    super(props);
    ApplyPut.addapplyPut = this.addapplyPut.bind(this);
    this.delApply = this.delApply.bind(this);
  }

  public dataService: DataService = new DataService();
  public globalAction: GlobalAction = new GlobalAction();

  public componentDidMount() {
    //获取：
    let enterprises = JSON.parse(localStorage.getItem("enterprises"));
   // console.log("enterprises--------", enterprises)

    let applicant = localStorage.getItem("userName");
    let phone = localStorage.getItem("phone");
    let staff_id = localStorage.getItem("userid");
   // console.log("--------", applicant, phone, staff_id)
    this.setState({
      applicant: applicant,
      phone: phone,
      staff_id: staff_id,
      companyUL: enterprises,
      company: enterprises[0].name,
      company_id: enterprises[0].id,
    })

  }

  public toggleFold() {
    console.log("tftft")
    if (this.state.applyPutcss == "applyPut-all") {
      this.setState({
        applyPutcss: "applyPut-part",
        applyPutul: " applyPutul-part applyPutul",
      })
      //通知3d，继续加载模型  
      this.globalAction.web_call_webgl_continueloadModuler();
    } else {
      this.setState({
        applyPutcss: "applyPut-all",
        applyPutul:" applyPutul-all applyPutul",
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

  //  添加摆点信息;
  static addapplyPut(data) { };
  public addapplyPut(data) {
    let arr = this.state.applyList;
    arr.push({
      startTime: "开始日期", endTime: "结束日期", id: data.id, name: data.name,
    });
    this.setState({
      applyList: arr
    })
    console.log(this.state)
    
  }

  // 聚焦
  public foucus(event) {
    console.log("聚焦2", event.target.value);
    let index = event.target.getAttribute("data-index");
    console.log("address输入index", index);
  }

  // 失焦
  public blur(event) {
    //if (this.state.address == "") {
    //  this.setState({ address: "请输入申请摆放地点" })
    //}
  }

  // 申请内容输入
  public changeContent(event) {
   // console.log("content输入", event.target.value);
    this.setState({
      content: event.target.value,
    });
  }

  //修改摆点地址
  public changeAddress(event) {
   let index = event.target.getAttribute("data-index");
  // console.log("address输入index", index);
    let applyList = this.state.applyList // 给对象赋值出来
    applyList[index].address = event.target.value // 在新对象里面修改，然后赋值给需要改变的对象
    this.setState({
      applyList: applyList,
    });
  }

  // 删除条目
  public delApply(event) {
    let index = event.target.getAttribute("data-index");
     let applyList = this.state.applyList;
      applyList.splice(index, 1);
     this.setState({ applyList: applyList });
    console.log("删除条目2", this.state.applyList);

    //通知3d，删除定位点
   // let longitude = event.target.getAttribute("data-longitude");
   // let latitude = event.target.getAttribute("data-latitude");
    let id = event.target.getAttribute("data-id");
    let data = {
      id:id
    }
    this.globalAction.web_call_webgl_cancelApplyPut(data)
  }

  //修改开始时间
  public changeStart(event) {
    let index = event.target.getAttribute("data-index");
    // console.log("start输入index", value);
    let applyList = this.state.applyList 
    console.log("start输入index1", this.state.startDate);
    applyList[index].startTime = this.state.startDate 
    this.setState({
      applyList: applyList,
    });
    console.log("start输入index2", this.state.applyList);
  }

  //修改结束时间
  public changeEnd(event) {
    let index = event.target.getAttribute("data-index");
    let applyList = this.state.applyList 
    console.log("end输入index1", this.state.endDate);
    applyList[index].endTime = this.state.endDate 
    this.setState({
      applyList: applyList,
    });
    console.log("end输入index2", this.state.applyList);
  }

    // 组件获取开始时间
  public setStartDate(date) {
    var dateStr = JSON.stringify(date);
    var dateN = dateStr.slice(1, 11);
    var index = this.state.timeIndex;
    let applyList = this.state.applyList 
    console.log("start输入index1", dateN);
    applyList[index].startTime = dateN 
    this.setState({
      applyList: applyList,
      applyPutStartTimeBox: "hide"
    });
    console.log("start输入index2", this.state.applyList);
  }

  // 组件获取结束时间
  public setEndDate(date) {
    var dateStr = JSON.stringify(date);
    var dateN = dateStr.slice(1, 11);
    var index = this.state.timeIndex;
    let applyList = this.state.applyList // 给对象赋值出来
    console.log("end输入index1", dateN);
    applyList[index].endTime = dateN // 在新对象里面修改，然后赋值给需要改变的对象
    this.setState({
      applyList: applyList,
      applyPutEndTimeBox: "hide"
    });
    console.log("end输入index2", this.state.applyList);
  }

  // 点击开始时间
  public clickStart(event) {
    let index = event.target.getAttribute("data-index");
    console.log("clickStart输入index", index);
    this.setState({
      timeIndex: index,
      applyPutStartTimeBox:"show"
    });
  }

  // 点击结束时间
  public clickEnd(event) {
    let index = event.target.getAttribute("data-index");
    console.log("clickEnd输入index", index);
    this.setState({
      timeIndex: index,
      applyPutEndTimeBox: "show"
    });
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

  //提交
  public sumbitApplyput() {
   //console.log("提交摆点申请", this.state);
    if (this.state.content == "") {
      alert("请描述具体内容")
    } else {
      this.dataService.postAdvertisementPoint(this.sumbitApplyputsucceed, this.state);
    }
  }

  // 摆点申请提交 -- 成功
  public sumbitApplyputsucceed(data) {
    alert(data);
   // window.history.back();
  }

  public render() {
    return (
      <div>
        <p className="companyInfotit">
          <RouterDOM.Link to="/home" >
            <span className="iconfont companyInfoicon" onClick={this.mapReturnpark.bind(this)} >&#xe83b;</span>
          </RouterDOM.Link>
          <span>申请摆点</span>
        </p>

        <div className={this.state.applyPutcss}>
          <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
            <i className={this.state.iconfont} style={{ "fontSize": "5rem" }}>&#xe849;</i>
          </div>
          <form >
            <ul className={this.state.applyPutul}>
              <li>
                <span className={"applySpanleft"}><span className="redStar">*</span>申请人</span><p className={"applyRight"}>{this.state.applicant}</p>
              </li>
              <li>
                <span className="redStar">*</span>手机号码<p className={"applyRight"}>{this.state.phone}</p>
              </li>
              <li>
                <span className="redStar">*</span>申请单位
                <p className={"applyRight"} onClick={this.showCompanyBox.bind(this)}>{this.state.company}</p>
              </li>
              <li>
                <p><span className="redStar">*</span>具体内容：</p>
                <textarea className="getapplyPuttextarea" value={this.state.content} 
                  placeholder="请将具体内容描述出来。（200字内）"
                  onChange={this.changeContent.bind(this)}></textarea>
              </li>
              <div className={this.state.applyPutStartTimeBox}>
                <DatePicker
                  mode="date"
                  title="请选择日期"
                  extra="请选择"
                  value={this.state.startDate}
                  onChange={this.setStartDate.bind(this)}
                >
                  <List.Item arrow="horizontal">开始日期</List.Item>
                </DatePicker>
              </div>
              <div className={this.state.applyPutEndTimeBox}>
                <DatePicker
                  mode="date"
                  title="请选择日期"
                  extra="请选择"
                  value={this.state.endDate}
                  onChange={this.setEndDate.bind(this)}
                >
                  <List.Item arrow="horizontal">结束日期</List.Item>
                </DatePicker>
              </div>
            <div className="applyList">
              <p className="theapplyP">请在所需投放地点后设置投放开始及结束时间</p>
              <ul style={{ "margin": "0" }}>
                <li>
                  <div className="applyAddress">广告放置地点</div>
                  <div className="applytime">开始时间</div>
                  <div className="applytime">结束时间</div>
                  <div className="applyicom"> <i className="iconfont" style={{ "color": "#fff" }}>&#xe82d;</i></div>
                </li>
                {
                  this.state.applyList.map((i, index) => {
                    return (
                      <li key={index}>
                        <div className="applyAddress"><span className="applyIndexof">{index + 1}</span>
                          <input className="" type="text" placeholder="" style={{ " width": "18rem", "border": 0 }}
                            value={i.name} />
                        </div>
                        <div className="applytime" style={{ "color": "#158CE8" }} onClick={this.clickStart.bind(this)} data-index={index}>{i.startTime} </div>
                        <div className="applytime" style={{ "color": "#158CE8" }} onClick={this.clickEnd.bind(this)} data-index={index}>{i.endTime}</div>
                        <div className="applyicom" > <i className="iconfont" onClick={this.delApply}
                          data-longitude={i.longitude} data-latitude={i.latitude} data-id={i.id}
                          data-index={index} style={{ "color": "#158CE8" }} >&#xe81c;</i></div>
                      </li>
                    )
                  })
                }
              </ul>
              </div>

              <div className="applyPutSumbit" onClick={this.sumbitApplyput.bind(this)}>提交</div>
            </ul>
          </form>

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
      </div>
    )
  }

  public state = {
    applyPutStartTimeBox: "hide",
    applyPutEndTimeBox:"hide",
    timeIndex: "",
    // 公司选择
    companyBox: "hide",
    companyUL: [],
    companyIndexof: 0,
    company_id_in: "",
    company_name_in:"",
    //startTime:"",
    startDate: "",
    endDate:"",
    inval:"",
    // 申请人
    applicant: "",
    //phone
    phone: "",
    //申请企业
    company:  "请选择申请企业",
    applyPutcss: "applyPut-part ",
    // 折叠按钮状态
    iconfont: "iconfont iconfont-unturn",
    // 内容框状态
    applyPutul: "applyPutul-part applyPutul",
    // 摆点列表
    applyList: [ ],
    address: "",
    // 摆点内容
    content: "",
    inputValue: "",
    value: '2017-01-25',
  
  }
}

export default ApplyPut;
