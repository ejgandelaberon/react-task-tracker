import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'

const Pagination = ({ gotoPrevApiUrl,gotoNextApiUrl }) => {
  const disabledPrev = gotoPrevApiUrl === null ? true : false
  const disabledNext = gotoNextApiUrl === null ? true : false

  return (
    <div className="pagination">
        <button disabled={disabledPrev} onClick={gotoPrevApiUrl}><FaAngleDoubleLeft/></button>
        <button disabled={disabledNext} onClick={gotoNextApiUrl}><FaAngleDoubleRight/></button>
    </div>
  )
}

export default Pagination