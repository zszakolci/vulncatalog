//import './globals.scss'
import styles from './layout.module.css'
import HeaderBar from '../menu/headerbar'
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

        <div className={styles.layout}>
        <HeaderBar admin={true}/>
        {children}
        </div>
  )
}
