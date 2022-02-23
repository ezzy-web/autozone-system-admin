

import { useRouter } from 'next/router';


export default function VehiclePage() {
  const router = useRouter()
  const { stockNo } = router.query
  return (
    <div>
      <h1>Vehicle {stockNo}</h1>
    </div>
  );
}
