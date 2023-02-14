
import Available from '../components/User/Available';
import 'antd/dist/antd.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <>
      {/* <Admin /> <br /> */}
      <h1>
      <FontAwesomeIcon icon={faBus} />
      Hello</h1>
      <Available />
    </>
  )
}
