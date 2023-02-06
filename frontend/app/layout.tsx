import './globals.scss'
import styles from './layout.module.css'
import HeaderBar from './menu/headerbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      
      <body>
        <div className={styles.layout}>
        <HeaderBar admin={false}/>
            {children}
        </div>
        </body>
    </html>
  )
}
