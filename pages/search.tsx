import { Htag } from '../components'
import { withLayout } from '../layout/Layout'


function Search(): JSX.Element {
  return (
    <div>
      <Htag tag='h1'>search</Htag>
    </div>
  )
}
export default withLayout(Search)