import Head from "next/head";
import Footer from "./footer";
import Header from "./header";

class Layout extends React.Component {
  render(){
    return(
      <>
        <Head>
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />.
          <title>{this.props.title}</title>
        </Head>
        <Header />
        <div className="main_container">
            {this.props.children}
        </div>
        <Footer />
      </>
    )
  }
}
export default Layout;
