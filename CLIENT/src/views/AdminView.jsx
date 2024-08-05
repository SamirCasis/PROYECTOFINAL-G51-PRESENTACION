import { useState } from 'react'
import AdminProfile from '../components/AdminProfile'
import PropertyForm from '../components/PropertyForm'
import PropertyFilter from '../components/PropertyFilter'
import './AdminView.css'

const AdminView = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <main className="adminView">
      <AdminProfile onSelectProperty={setSelectedProperty} />
      <PropertyFilter />
      {selectedProperty && <PropertyForm property={selectedProperty} />}
    </main>
  )
}

export default AdminView
