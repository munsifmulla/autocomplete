import React, {Component} from 'react'

//Child Components
import PackageDropDown from './PackageDropDown'

//Styles
import {IntellicenseDiv, InputDiv} from './style'

//Queries

const fetchPackages = (data)=> {
  let packages = [];

  data.map((pack)=> {
    if (pack != null) {
      packages.push(pack.package)
    }
  })

  return packages;
}

class Intellicense extends Component {

  constructor(props) {
    super(props)

    this.state = {
      PackageDropDownState: false,
      left: 0, top: 0,
      packages: this.props.items,
      packagesClone: this.props.items
    }

    //variables

    this.PackageDropDownState = false
    this.counter = 0
    this.posG = 0
    this.intelliDiv = "";
    this.packageContainer = "";

    this.getCaretPos = this.getCaretPos.bind(this)
    this.initIntellicense = this.initIntellicense.bind(this)
    this.showPackageDropDownState = this.showPackageDropDownState.bind(this)
    this.hidePackageDropDownState = this.hidePackageDropDownState.bind(this)
    this.getOffset = this.getOffset.bind(this)
    this.keyMap = this.keyMap.bind(this)
    this.selectV = this.selectV.bind(this)
  }

  componentDidMount() {
    //Assign Element on DOM Render
    this.intelliDiv = document.querySelector('.intelliDiv');
    this.packageContainer = document.querySelector('.packageContainer');
  }

  //Data Fns
  selectV(value) {
    // console.log(value);
    //
    // console.log("this Elem", this.intelliDiv)

    this.intelliDiv.contentEditable = true

    this.hidePackageDropDownState()

    //place text
    this.placeText(value, this.posG)

    //Remove ghost text
    this.unsetPlaceholder(this.intelliDiv)

    //set Cursor to end
    // this.setCaretPos(this.intelliDiv, value.length);

    //reset counter
    this.counter = 0;
  }

  placeText(text, pos) {
    var innerval = this.intelliDiv.innerHTML,
      innerLength = innerval.length, period = '.', instan = '@',
    blueStart='<span class="blue" contenteditable="false">',
    blueEnd='</span>&nbsp;',
    redStart='<span class="red" contenteditable="false">',
    redEnd='</span>&nbsp;';

    switch (true) {
      case pos == 1 && innerLength < 10:
        console.log("1. String rect", innerval, text, pos)
        var et = innerval.substring(1, innerLength),
          iv = innerval.split(et);

        this.intelliDiv.innerHTML = iv[0] + text + period;
        this.setCaretPos(this.intelliDiv, (this.intelliDiv.innerText.length));
        break;
      case pos > 1 && pos < innerLength:
        console.log("2. String rect", innerval, text, pos)
        var et = innerval.substring(pos, innerLength),
          iv = innerval.split(et),
          text = iv[0] + text + period;
        this.intelliDiv.innerText = text + et;
        this.setCaretPos(this.intelliDiv, (text).length+1);
        break;
      case pos == innerLength:
        console.log("3. String rect", innerval, text, pos)
        this.intelliDiv.innerText = innerval + text + period
        this.setCaretPos(this.intelliDiv, (innerval+text).length+1);
        break;
      case pos == 1 && innerLength > 10:
        console.log("4. String rect", innerval, text, pos, innerval.substring(0,1))
        this.intelliDiv.innerText = instan + text + period + innerval;
        this.setCaretPos(this.intelliDiv, (instan+text).length+1);
        break;
    }
  }

  async searchList(e, list) {

    var val = this.intelliDiv.innerText,
      sVal = val.substring(this.posG, this.getCaretPos()+1),
      cloneList = this.state.packagesClone,
      tempList = [];

    console.log("sval",this.posG, this.getCaretPos(), sVal)
    try {
      if (sVal == null || sVal.length == 0) {
        console.log("here")
        this.setState({
          packages: cloneList
        })
      }

      cloneList.map((t)=> {
        // console.log("search ",t)
        if (t == null) {
          return
        }

        if (t.name.toLowerCase().includes(sVal)) {
          console.log("found")
          tempList.push(t)
        }
      })

      // if (tempList.length > 0 && val.length > 0) {
      //   this.showPackageDropDownState()
      // }

      await this.setState({
        packages: tempList
      })


    } catch (e) {
      console.log(e)
    }
  }

  //Widget Fns
  getCaretPos(e) {
    var caret = window.getSelection().getRangeAt(0),
      offset = this.getOffset(caret, 10);

    this.setState({
      left: offset.left,
      top: offset.top
    })

    return caret.startOffset - 1
  }

  setCaretPos(elem, carPos) {
    console.log("called", carPos)
    if(carPos > 0) {
      var range = document.createRange(), caret = window.getSelection();
      // range.selectNodeContents(elem);
      // range.collapse(false);
      caret.removeAllRanges();
      // caret.addRange(range);
      console.log("Elem fC",elem.childNodes)
      caret.collapse(elem.firstChild, carPos);
    }
  }

  getOffset(pos, buffer) {
    var range = pos,
      clonedRange = range.cloneRange(),
      rect = clonedRange.getClientRects(),
      offset = {};
    if (rect.length > 0) {
      offset = {
        height: rect[0].height,
        left: rect[0].left + rect[0].width,
        top: rect[0].top + rect[0].height + buffer
      };
    }
    return offset
  }

  recordPos(pos) {
    this.posG = pos
  }

  showPackageDropDownState(e) {
    this.PackageDropDownState = true;
    this.packageContainer.style.display = "block"
  }

  hidePackageDropDownState(e) {
    this.PackageDropDownState = false;
    this.packageContainer.style.display = "none"
  }

  keyMap(e, keyCheck, charC, textLen) {
    switch (keyCheck) {
      case 13:
        e.preventDefault();
        return
        break;
      case 16:
        return
        break;
      case 27:
        console.log("escape")
        this.hidePackageDropDownState()
        break;
      case 32:
        console.log("space")
        this.hidePackageDropDownState()
        break;
      case 38:
        console.log("Up")
        e.preventDefault();
        break;
      case 40:
        console.log("Down")
        return false
        break;
      case 8:
        console.log("BSpace")
        if (charC === 64 && textLen > 0) {
          this.showPackageDropDownState()
          return
        }
        this.hidePackageDropDownState()
        break;
      default:
        // console.log(keyCheck)
        if (charC === 64 || charC === 98) {
          this.showPackageDropDownState()
        }
    }
  }

  setPlaceholder(charC, left, _this) {
    if (charC === 64) {
      const style = "--tooltip-display: block; --tooltip-left: " + left + "px;"
      _this.setAttribute("style", style)
      this.recordPos(this.getCaretPos() + 1)
      console.log("Rec Pos", this.posG)
    } else {
      this.unsetPlaceholder(_this)
    }
  }

  unsetPlaceholder(_this) {
    const styles = "--tooltip-display: none; --tooltip-left: 0px;"
    _this.setAttribute("style", styles)
  }

  initIntellicense(e) {
    e.stopPropagation()
    var _this = e.target,
      text = _this.innerText,
      textLen = text.length,
      charC = text.charCodeAt(this.getCaretPos()),
      keyCheck = e.which,
      left = parseInt(this.state.left - _this.offsetLeft + 3);

    // console.log("Char C ", charC)
    // console.log(this.getCaretPos())
    if (keyCheck === 13 || keyCheck === 38 || keyCheck === 40) {
      return
    } else {
      this.setPlaceholder(charC, left, _this)
    }

    this.keyMap(e, keyCheck, charC, textLen)

    this.searchList(e, this.state.packages)
  }

  render() {
    return (
      <IntellicenseDiv>
        <InputDiv
          contentEditable="true"
          onKeyUp={this.initIntellicense}
          placeholder="Enter @ to trigger intellicense"
          className="intelliDiv"
        >
        </InputDiv>

        <PackageDropDown
          display={(this.PackageDropDownState)?'block':'none'}
          left={this.state.left}
          top={this.state.top}
          packages={this.state.packages}
          counter={this.counter}
          select={this.selectV}
          setcaret={this.setCaretPos}
          getcaretpos={this.getCaretPos}
        />

      </IntellicenseDiv>
    )
  }
}


export default Intellicense