import PropTypes from 'prop-types'

const Button = ({ text, className, redirect }) => {
  return (
    <button
      onClick={redirect}
      className={className}
    >{text}
    </button>
  )
}

Button.defaultProps = {
  text: 'Button',
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  redirect: PropTypes.func.isRequired,
}

export default Button