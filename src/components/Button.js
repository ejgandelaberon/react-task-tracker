import PropTypes from 'prop-types'

const Button = ({ type, color, text, className, redirect }) => {
  return (
    <button
      type={type}
      onClick={redirect}
      style={{backgroundColor: color}}
      className={className}
    >{text}
    </button>
  )
}

Button.defaultProps = {
  color: 'steelblue',
}

Button.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string.isRequired,
  redirect: PropTypes.func.isRequired,
}

export default Button