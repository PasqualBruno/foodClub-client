import '@ant-design/v5-patch-for-react-19';
import { useRestaurantStore } from './Entities/Restaurant/store/RestaurantStore';
import { useEmployeeStore } from './Entities/Employee/store/EmployeeStore';
import { useCompanyStore } from './Entities/Company/store/CompanyStore';

const App = () => {

  const { restaurant } = useRestaurantStore();
  const { employee } = useEmployeeStore();
  const { company } = useCompanyStore();


  console.log({ restaurant })
  console.log({ employee })
  console.log({ company })


  return (
    <div>App</div>
  )
}

export default App