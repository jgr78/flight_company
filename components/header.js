import {color, background} from '../config/theme'
import {WEB_TITLE} from '../config/properties'
import Link from 'next/link'

export default () => (
    <>
        <section id="section_header" className="container">      
            <Link href="/">    
              <img src={background.web} className="header-logo"/>
            </Link>
            <Link href="/">    
              <span className="header-text">{WEB_TITLE}</span>
            </Link>
        </section>
        <style jsx>{`
          #section_header {
            margin-top: 20px;
            margin-bottom: 20px;
            color: ${color.black};
            display: flex;
            align-items: center
          }
          .header-logo{
            width: 50px;
            cursor: pointer;
          }
          .header-text {
            color: ${color.blue};
            font-size: 1.8em;
            margin-left: 20px;
            font-style: italic;
            cursor: pointer;
          }
          `}</style>
    </>   
)