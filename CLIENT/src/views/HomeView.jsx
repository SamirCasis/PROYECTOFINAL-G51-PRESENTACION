import './HomeView.css'
import Carousel from '../components/Carousel'
import Gallery from '../components/Gallery'
import PropertyFilter from '../components/PropertyFilter'

const HomeView = () => {
    return (
        <>
            <main className='mainHome'>
                <Carousel />
                <section className='filter'>
                    <PropertyFilter />
                </section>
                <section className='gallery'>
                    <Gallery />
                </section>
            </main>
        </>
    )
}

export default HomeView