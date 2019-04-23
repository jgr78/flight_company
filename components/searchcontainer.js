import {color, background} from '../config/theme'
import SearchBlock from './searchblock'
import Message from './message'

export default () => (
    <>
        <section id="section_search" className="full_width">
            <Message />
            <SearchBlock />
        </section>
        <style jsx >{`
            #section_search{
                background: ${color.white} url(${background.fly_url}) no-repeat right top;
                background-size: cover;
                min-height: 200px;
                padding-top: 50px;
                padding-bottom: 50px;
            }
          `}</style>
    </>   
)
