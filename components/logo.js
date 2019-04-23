import {color, background} from '../config/theme'
export default (props) => (
    <>
        <div className="logo_wrapper fullwidth">
            <img src={background.logo} id="img_logo"/>
        </div>
        <style jsx>{`
          #img_logo {
            width: 100%;
            padding: 50px 50px 50px 50px;
          }
          `}</style>
    </>   
)