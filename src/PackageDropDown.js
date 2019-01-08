import React, {Component} from 'react'
import {Scrollbars} from 'react-custom-scrollbars';

import {PackageDropDownDiv, PackageList} from './style'

class PackageDropDown extends Component {
  constructor(props) {
    super(props)
    this.arrowFunctions = this.arrowFunctions.bind(this)
    this.showIndex = this.showIndex.bind(this)

    this.counter = this.props.counter
  }

  componentDidMount() {
    document.addEventListener("keydown", this.arrowFunctions)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown")
  }

  showIndex(e) {
    var list = document.querySelector('.packageList'),
      item = list.childNodes;

    this.counter = e.target.dataset.index
    this.props.select(item[this.counter].innerText)
  }


  getElementOffset(elem) {
    var bounds = elem.getBoundingClientRect(), offset = {
      height: bounds.height,
      top: bounds.top,
      left: bounds.left
    }

    return offset
  }

  setCaretUpDown(elem){
    var cp = this.props.getcaretpos(), innerLength = elem.innerText.length;

    if(cp >= innerLength ){
      this.props.setcaret(elem, (elem.innerText.length))
    }else{
      this.props.setcaret(elem, this.props.getcaretpos()+1)
    }
  }

  arrowFunctions(e) {
    // console.log("called", this.counter)
    var state = this.props.display,
      list = document.querySelector('.packageList'),
      intelliDiv = document.querySelector('.intelliDiv'),
      packageContainer = document.querySelector('.packageContainer'),
      item = list.childNodes,
      itemLength = item.length;

    if (state && state != 'none') {
      switch(true){
        case e.which === 40 && this.counter < itemLength:
          console.log("down")
          e.preventDefault()
          this.setCaretUpDown(intelliDiv)

          this.counter++;
          if (this.counter > 0) {
            item[this.counter - 1].classList.remove("hover");
          }
          var off = this.getElementOffset(item[this.counter]);
          var bound = this.getElementOffset(packageContainer);
          var diff = parseInt(off.top - (bound.top + bound.height))

          if (diff > 0) {
            // console.log("Diff scroll", diff)
            packageContainer.scrollTop = diff
          }

          item[this.counter].classList.add("hover");
          break;

        case e.which === 38 && this.counter > 0:
          console.log("Up")
          e.preventDefault();
          //Set caret on Up and Down Arrow
          this.setCaretUpDown(intelliDiv)

          // intelliDiv.contentEditable = false;
          this.counter--;
          if (this.counter < itemLength) {
            item[this.counter + 1].classList.remove("hover");
          }
          item[this.counter].classList.add("hover");
          break;

        case e.which === 27:
          intelliDiv.contentEditable = true
          intelliDiv.focus()
          this.counter = 0;
          packageContainer.style.display = "none"
          break;

        case e.which === 13:
          e.preventDefault();
          if (this.counter >= 0) {
            this.props.select(item[this.counter].innerText)
            this.counter=0;
          } else {
            // console.log("text",item)
            this.props.select(item[0].innerText)
            this.counter=0;
          }
      }
    }
  }

  render() {

    return (
      <PackageDropDownDiv
        contentEditable="false"
        className="packageContainer"
        style={
        { 
          display: this.props.display,
          left: this.props.left,
          top: this.props.top
        }
      }>
        <Scrollbars style={{ height: 300 }}>
          <PackageList
            className="packageList">
            {
              this.props.packages.map((pack, i)=> {
                if (pack && pack != null) {
                  return (
                    <li data-index={i} onClick={this.showIndex}>
                      {
                        pack.name
                      }
                    </li>
                  )
                }
              })
            }
          </PackageList>
        </Scrollbars>
      </PackageDropDownDiv>
    )
  }
}

export default PackageDropDown