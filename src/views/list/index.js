import {useState,createRef,useEffect} from "react";
import './index.scss';
export default function ListPage(){
  const [list,setList] = useState([1,2,3,4,5,6,7,8]);
  const [limit,setLimit] = useState(15);
  const [rowHeight,setRowHeight] = useState(0);
  const [scrollerHeight,setScrollerHeight] = useState(0);
  const scroller = createRef();
  const [total,setTotal] = useState(list.length);

  let start = 9;
  useEffect(()=>{
    let children = scroller.current;
    let cellHeight = children.children[0].offsetHeight;
    setRowHeight(cellHeight);
    setScrollerHeight(children.offsetHeight)
    console.log();
  })
  function handleScroller(e){
    if (e.target === scroller.current) {
      const { scrollTop } = e.target;
      const { total, rowHeight, limit, originStartIdx, bufferSize } = this;
      const currIndex = Math.floor(scrollTop / rowHeight);

      if (originStartIdx !== currIndex) {
        this.originStartIdx = currIndex;
        this.startIndex = Math.max(currIndex - bufferSize, 0);
        this.endIndex = Math.min(currIndex + limit + bufferSize, total - 1);
        this.setState({ scrollTop: scrollTop });
      }
    }
    console.log('haha');
  }
  return (
    <div className="page-container">
      <div className="page-header">
        这里是页面的头部
      </div>
      <div className="page-center">
        这里是页面的中间内容
      </div>
      <div className="scroller" ref={scroller} onScroll={handleScroller}>
        {
          list.map((item,index)=>{
            return (
              <div key={index} className="scroller-item">
                这是列表项
              </div>
            )
          })
        }
        
      </div>
    </div>
  )
}