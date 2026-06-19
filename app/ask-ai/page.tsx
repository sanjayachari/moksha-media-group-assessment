
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import ContactComp from '../../components/contact/ContactComp'
export default function Contact() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Navbar />
        <ContactComp />
      {/* <Footer /> */}
    </main>
  )
}
