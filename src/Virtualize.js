// type Props = PropsWithChildren<{
//   itemHeight:number//每个元素高
//   columnNumber:number//一行几个元素
//   insightNumber:number//可视范围里几个元素
//   startHeight:number//滚动到第一个元素的高度
//   scrollDom:HTMLDivElement|null //有滚动条的dom
//   scaleRow?:number//扩展行数
// }>

import {useState,useEffect} from 'react'

function  Virtualize(props){
  const [costomHeight,setCostomHeight]=useState()
  const [visbleHeight,setVisibleHeight]=useState()
  const [renderChildren,setRenderChildren]=useState()
  const [indexNumber,setIndexNumber]=useState({
      startIndex:0,
      endIndex:props.insightNumber,
      overScroll:0
  })
  const [scaleRow,setScaleRow]=useState(2)
  useEffect(()=>{
      if(props.children instanceof Array){
          let childrenLen = props.children.length
          if(childrenLen%props.columnNumber!=0){//说明最后一行没满
              let remain = childrenLen%props.columnNumber
              childrenLen=childrenLen+remain
          }
          let fullheight = childrenLen/props.columnNumber*props.itemHeight
          setCostomHeight(fullheight)
          let insightHeight
          if(childrenLen<props.insightNumber){
              insightHeight = fullheight
          }else{
              insightHeight = props.insightNumber/props.columnNumber*props.itemHeight
            }
            setVisibleHeight(insightHeight)
            setRenderChildren(props.children.slice(indexNumber.startIndex,indexNumber.endIndex))
        }
    },[props.children,indexNumber])
    const scrollFunc=(e)=>{
      let target= e.target
      let overScroll = target.scrollTop-props.startHeight//卷曲高度
      let timer = overScroll/props.itemHeight*props.columnNumber
      let startIndex =Math.floor(timer)//起始索引 从0开始
      startIndex = startIndex<0?0:startIndex;
      timer = timer%props.columnNumber/props.columnNumber//滚的每行百分比
      if(timer<0)timer=0;
      if(overScroll<0)overScroll=0
      if(startIndex%props.columnNumber!=0){//每行没补满
          startIndex=startIndex-startIndex%props.columnNumber
      }
      let endIndex = startIndex+props.insightNumber+scaleRow
      overScroll=overScroll-timer*props.itemHeight
      setTimeout(() => {
          setIndexNumber({
              startIndex,
              endIndex,
              overScroll
          })
      });
    }
    var throttle = function (fn, delay) {
        var timer = null;
    
        return function () {
            clearTimeout(timer);
            timer = setTimeout(function() {
                fn();
            }, delay);
        }
    };
    useEffect(()=>{
    //   props.scaleRow?setScaleRow(props.scaleRow):null;
      if(props.scrollDom)
      props.scrollDom.addEventListener('scroll',throttle(scrollFunc,50))
      return ()=>{
          if(props.scrollDom)
          props.scrollDom.removeEventListener('scroll',throttle(scrollFunc,50))
      }
  },[])
  return (
     <>
     <div style={{display:'flex'}}>
     <div style={{height:costomHeight?costomHeight:0,backgroundColor:'red',width:'20px'}} ></div>
     <div className='virtual-custom-item' 
     style={{
         height:visbleHeight?visbleHeight:0,
         position:"relative",
         transform:`translate3d(0px, ${indexNumber.overScroll}px, 0px)`
      }}>
     {renderChildren}
     </div>
     </div>
   
     </>
  )
}
export default Virtualize