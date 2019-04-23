import {color, background, device} from '../config/theme'
import AirportField from './airportfield'
import AirportsSugestions from './airportssugestions'
export default (props) => (
    <>
        <div className="form-group">
            <AirportField  {...props}/>
            <AirportsSugestions {...props}/>
        </div>
        <style jsx >{`
        @media ${device.tablet} {
            .form-group{
                width: 50%;
            }
        }
    `}</style>
    </>   
)