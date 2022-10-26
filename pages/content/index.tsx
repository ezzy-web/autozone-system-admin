import { NextPage } from 'next/types';
import Dashboard from '../../components/dashboard/dashboard.component';



const DashboardPage: NextPage = () => {

  return (
    <Dashboard children={<>Content Index</>} page={'Dashboard'}/>
  )
}


export default DashboardPage