
import Layout from '../components/layout'
import SearchContainer from '../components/searchcontainer'
import Logo from '../components/logo'
import 'react-input-range/lib/css/index.css'
  export default class extends React.Component {
    render() {
      return (
        <>
        <Layout title={"Home page"}>
          <div className="App fullwidth">
            <SearchContainer />
            <Logo />
          </div>
        </Layout>
        </>
      )
    }
  }


