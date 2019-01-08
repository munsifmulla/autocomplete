import styled from 'styled-components'

const IntellicenseDiv = styled('div')([], props => ({
//   position: 'relative',
  border: '1px solid #eaeaea',
  width: '500px',
  height: '190px',
  background: 'white',
  margin: '25px auto',

  '&:focus':{
    outline: 'none'
  },

  '.blue':{
    color:'lightblue'
  },
  '.red':{
    color:'red'
  }
}))

const InputDiv = styled('div')([], props => ({
    position: 'relative',
    width: '100%',
    height: '190px',
    lineHeight: '2.2',
    color: '#2f2f2f',
  
    '&:focus':{
      outline: 'none'
    }
  }))

const PackageDropDownDiv = styled('div')([], props => ({
  border: '1px solid #eaeaea',
  width: '550px',
  background: 'white',
  color: '#2f2f2f',
  position: 'absolute',
  left: 0, top: '40px',
  boxShadow: '0px 0px 5px rgba(0,0,0,0.125)'
}))

const PackageList = styled('ul')([], props => ({
  background: 'white',
  listStyle: 'none',
  padding: 0, margin: 0,

  'li':{
    width: '100%',
    padding: '10px 15px',
    cursor: 'pointer',

    '&.hover':{
      background: '#eaeaea'
    },

    '&:hover':{
      background: '#eaeaea'
    }
  }
}))

//All Style Exports
export {
    IntellicenseDiv,
    PackageDropDownDiv,
    InputDiv,
    PackageList
}