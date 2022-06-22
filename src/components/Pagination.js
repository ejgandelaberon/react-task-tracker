import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'

const Pagination = ({ gotoPrevApiUrl,gotoNextApiUrl }) => {
  const disabledPrev = gotoPrevApiUrl === null ? true : false
  const disabledNext = gotoNextApiUrl === null ? true : false

  return (
    <div className="pagination">
        <button className='btn-fa' disabled={disabledPrev} onClick={gotoPrevApiUrl}><FaAngleDoubleLeft/></button>
        <button className='btn-fa' disabled={disabledNext} onClick={gotoNextApiUrl}><FaAngleDoubleRight/></button>
    </div>
  )
}

export default Pagination