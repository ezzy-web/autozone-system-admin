import Link from "next/link"
import { useRouter } from "next/router"

import User from "../../components/user"

// #Note Link is used only within the client side of the application

function Inventory({ users }) {

  const router = useRouter()
  return (
    <>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <User user={user} />
          </li>
        ))}
      </ul>
    </>

  )
}


export default Inventory

export async function getServerSideProps() {
  var data = []
  
  
  try {
    const response = await fetch('https://gorest.co.in/public/v2/users')
    data = await response.json()

    console.log(data)
  } catch (error) {
    console.log(error)
  }



  return { props: { users: data } }
}