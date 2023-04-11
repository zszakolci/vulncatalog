
import styles from './page.module.css'
import AdminForm from '../components/adminForm'
import Search from '../components/Search'

export default function Admin() {
  return (
    <main className={styles.main}>
       <Search/>
       <AdminForm/>
    </main>
  )
}
