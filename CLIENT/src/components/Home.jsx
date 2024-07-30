import Carousel from './Carousel'
import Gallery from './Gallery'
import './Home.css'

const Home = () => {
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

export default Home