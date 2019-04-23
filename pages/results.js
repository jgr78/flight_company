
import Layout from '../components/layout'
import SearchContainer from '../components/searchcontainer'
import ResultsContainer from '../components/resultscontainer'
import {TEXT_HOME} from '../config/properties'
import {color} from '../config/theme'
import Link from 'next/link'

  export default class extends React.Component {
    render() {
      return (
        <>
          <Layout title={"Results page"}>
            <div className="App fullwidth">
              <Link href="/">
                <div className="link_to_home">{TEXT_HOME}</div>
              </Link>
              <SearchContainer />
              <ResultsContainer />
            </div>
          </Layout>
          <style jsx>{`
            .link_to_home {
              margin-left: 50px;
              background-color: ${color.blue};
              color: ${color.white};
              width: fit-content;
              padding: 10px 20px 5px 20px;
              border-radius: 10px 10px 0px 0px;
              cursor: pointer
            }
          `}</style>
        </>
      )
    }
  }


