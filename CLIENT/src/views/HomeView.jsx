import './Home.css'
import Carousel from '../components/Carousel'
import Gallery from '../components/Gallery'

const HomeView = () => {
    return (
        <>
            <main className='mainHome'>
                <Carousel />
                <section className='filter'></section>
                <section className='gallery'>
                    <Gallery />
                </section>
            </main>
        </>
    )
}

export default HomeView