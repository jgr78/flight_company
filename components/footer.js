import {color, background} from '../config/theme'

export default () => (
    <>
        <section id="section_footer" className="container">
        <div className="footer_label">
         © Flight Company
        </div>
        </section>
        <style jsx>{`
          #section_footer {
            min-height: 100px;
            background-color: ${color.blue};
            color: ${color.white};
            background-image: url(${background.footer});
            background-repeat: no-repeat;
            background-position: left bottom;

            margin-top: 380px;
          }
          .footer_label {
            position: relative;
            bottom: 0;
            left: 0;

          }
          `}</style>
    </>   
)