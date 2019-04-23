import { connect } from 'react-redux'
import {color, background} from '../config/theme'

const Message = props =>  (
    <>
        <div id="message_block">
            {
                (props.error) ? 
                    <div className="message_error">{props.error}</div>
                : '' 
            }
        </div>
        <style jsx >{`
            #message_block{
                margin: 0 auto;
                width: fit-content;
            }
            .message_error {
                background-color: ${color.red};
                color: ${color.white};
                font-size: 1.2em;
                border-radius: 5px;
                padding: 5px 20px 5px 20px;
            }
          `}</style>
    </>   
)

function mapStateToProps (state) {
  const {error} = state
  return { error }
}

export default connect(mapStateToProps)(Message)

