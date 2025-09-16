import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Home, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Camera, 
  Heart, 
  Settings, 
  User, 
  LogOut,
  ChevronDown,
  Plane,
  Hotel,
  Car
} from 'lucide-react'
import { AuthContext } from '../context/AuthContext'

const Sidebar = () => {
    const {user, logout} = useContext(AuthContext)
    const [activeItem, setActiveItem] = useState('Dashboard')
    const [isTripsOpen, setIsTripsOpen] = useState(false)

    const menuItems = [
        { name: 'Dashboard', icon: Home, path: '/' },
        { name: 'Travel', icon: Hotel, path: '/travel' },
    ]




    return (
        <div className="flex flex-col w-64 h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-2xl">
            <div className="p-6 border-b border-blue-700/50">
                <h1 className="text-3xl font-bold">Travel<span className="text-yellow-400">in.</span></h1>
                <p className="text-blue-200 text-sm mt-1">Dashboard Kita</p>
            </div>
            <nav className="flex-1 px-4 py-6">
                <ul className="space-y-2">
                {menuItems.map((item) => (
                    <li key={item.name}>
                    <div>
                        <Link to={item.path} className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${ activeItem === item.name ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 shadow-lg' : 'hover:bg-blue-700/50 hover:translate-x-1'}`}
                        onClick={() => {
                            setActiveItem(item.name)
                            if (item.hasSubmenu) {
                            setIsTripsOpen(!isTripsOpen)
                            }
                        }}
                        >
                        <div className="flex items-center space-x-3">
                            <item.icon size={20} className={`${ activeItem === item.name ? 'text-blue-900' : 'text-blue-200' } group-hover:text-white transition-colors`} />
                            <span className="font-medium">{item.name}</span>
                        </div>
                        {item.hasSubmenu && (
                            <ChevronDown  size={16} className={`transform transition-transform ${ isTripsOpen ? 'rotate-180' : '' }`} />
                        )}
                        </Link>
                        {item.hasSubmenu && isTripsOpen && (
                        <ul className="mt-2 ml-4 space-y-1">
                            {tripSubmenu.map((subItem) => (
                            <li key={subItem.name}>
                                <Link to={subItem.path} className="flex items-center space-x-3 px-4 py-2 rounded-lg text-blue-200 hover:text-white hover:bg-blue-700/30 transition-all duration-200" ><subItem.icon size={16} /><span className="text-sm">{subItem.name}</span></Link>
                            </li>
                            ))}
                        </ul>
                        )}
                    </div>
                    </li>
                ))}
                </ul>
            </nav>
            <div className="px-4 py-4 border-t border-blue-700/50">
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-blue-700/30 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                    <User size={18} className="text-blue-900" />
                </div>
                <div>
                    <p className="font-medium text-sm">{user.username}</p>
                </div>
                </div>
                <ul className="space-y-1">
                    <button onClick={logout} className="flex w-full items-center space-x-3 px-4 py-2 rounded-lg text-blue-200 hover:text-white hover:bg-blue-700/50 transition-all duration-200 group">
                        <span className="text-sm font-medium">Logout</span>
                    </button>   
                </ul>
            </div>
        </div>
    )
}

export default Sidebar