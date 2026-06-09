import { Outlet } from 'react-router-dom'
import AppSidebar from './AppSidebar.jsx'
import './app-shell.css'

export default function AppShell() {
  return (
    <div className="shell">
      <AppSidebar />
      <div className="shell-main">
        <Outlet />
      </div>
    </div>
  )
}
